/*
 * Glimpses: retake the pictures and clips the AI project pages show, so they
 * keep up with the work. For each project it opens the page in headless
 * Chrome and takes stills (written to src/assets/images/glimpses/<project>)
 * and clips (a deck playing slide by slide), recorded a frame at a time and
 * encoded as MP4 (public/glimpses/<project>), each with a still to show before
 * it plays.
 *
 *   npm run glimpses                         every project
 *   npm run glimpses -- keynote              one of them (just the keynote, for now)
 *   npm run glimpses -- keynote registry     just the clips named
 *
 * The keynote deck is read from this site (SITE, default http://localhost:3000),
 * so start the dev server first. Needs Google Chrome and ffmpeg; sharp comes
 * with Next.
 */

import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const SITE = process.env.SITE ?? "http://localhost:3000";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = new URL("../", import.meta.url).pathname;
const STILLS = join(ROOT, "src/assets/images/glimpses");
const CLIPS = join(ROOT, "public/glimpses");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const short = (file) => file.replace(ROOT, "");

// CHROME ======================================================================
// A page in headless Chrome, driven over its DevTools protocol
async function openPage(url, { width, height, scale = 1, scheme = "light" }) {
    const port = 9400 + Math.floor(Math.random() * 400);
    const profile = mkdtempSync(join(tmpdir(), "glimpses-"));
    const chrome = spawn(CHROME, [
        "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank",
    ], { stdio: "ignore" });

    let target;
    for (let i = 0; i < 100 && !target; i++) {
        try {
            target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
        } catch {
            // Not listening yet
        }
        if (!target) await sleep(200);
    }
    if (!target) throw new Error("Chrome didn't start");

    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve) => { socket.onopen = resolve; });
    let id = 0;
    const pending = new Map();
    socket.onmessage = ({ data }) => {
        const message = JSON.parse(data);
        if (message.id && pending.has(message.id)) {
            pending.get(message.id)(message.result);
            pending.delete(message.id);
        }
    };
    const send = (method, params = {}) => new Promise((resolve) => {
        pending.set(++id, resolve);
        socket.send(JSON.stringify({ id, method, params }));
    });

    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile: false });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: scheme }] });
    await send("Page.navigate", { url });
    await sleep(6000);

    const evaluate = async (expression) =>
        (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;
    const scrollTo = async (y, settle = 1500) => {
        await evaluate(`window.scrollTo({ top: ${y}, behavior: "instant" })`);
        await sleep(settle);
    };
    const capture = async (format = "png") =>
        Buffer.from((await send("Page.captureScreenshot", { format, ...(format === "jpeg" && { quality: 88 }) })).data, "base64");
    const click = async (x, y) => {
        for (const type of ["mousePressed", "mouseReleased"])
            await send("Input.dispatchMouseEvent", { type, x, y, button: "left", clickCount: 1 });
    };
    const press = async (key) => {
        for (const type of ["keyDown", "keyUp"])
            await send("Input.dispatchKeyEvent", { type, key, code: key, windowsVirtualKeyCode: key === "ArrowRight" ? 39 : 37 });
    };
    // Once Chrome has gone, its profile with it
    const close = async () => {
        socket.close();
        const exited = new Promise((resolve) => chrome.once("exit", resolve));
        chrome.kill();
        await exited;
        rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    };
    return { evaluate, scrollTo, capture, click, press, close };
}

// STILLS AND CLIPS ============================================================
const still = async (png, project, name, width = 1200) => {
    const file = join(STILLS, project, `${name}.webp`);
    mkdirSync(join(file, ".."), { recursive: true });
    await sharp(png).resize({ width }).webp({ quality: 82 }).toFile(file);
    console.log("  ", short(file));
};

// Record the page while `act` runs, a frame at a time as fast as Chrome gives
// them, each held as long as it was on screen; then encode them as an MP4
// (cropped to `crop`, { x, y, w, h } in the page's pixels, if given), holding
// the last frame a moment, and keep a still of it to show first
const record = async (page, project, name, act, { width = 1280, hold = 1200, poster = 0, crop } = {}) => {
    const frames = [];
    let recording = true;
    const loop = (async () => {
        while (recording) frames.push({ jpeg: await page.capture("jpeg"), at: Date.now() });
    })();
    await act();
    recording = false;
    await loop;

    const dir = mkdtempSync(join(tmpdir(), "glimpse-frames-"));
    const name5 = (i) => join(dir, `${String(i).padStart(5, "0")}.jpg`);
    const list = frames.map(({ jpeg, at }, i) => {
        writeFileSync(name5(i), jpeg);
        const next = frames[i + 1]?.at ?? at + hold;
        return `file '${name5(i)}'\nduration ${((next - at) / 1000).toFixed(3)}`;
    });
    // The concat demuxer only keeps the last file's duration if it's listed again
    list.push(`file '${name5(frames.length - 1)}'`);
    writeFileSync(join(dir, "frames.txt"), list.join("\n"));

    const file = join(CLIPS, project, `${name}.mp4`);
    mkdirSync(join(file, ".."), { recursive: true });
    const ffmpeg = spawnSync("ffmpeg", [
        "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", join(dir, "frames.txt"),
        "-vf", `${crop ? `crop=${crop.w}:${crop.h}:${crop.x}:${crop.y},` : ""}fps=30,scale=${width}:-2:flags=lanczos,format=yuv420p`,
        "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-movflags", "+faststart", "-an", file,
    ], { stdio: "inherit" });
    if (ffmpeg.status !== 0) throw new Error(`ffmpeg failed on ${name}`);
    const first = frames[Math.min(poster, frames.length - 1)].jpeg;
    const shown = crop ? await sharp(first).extract({ left: crop.x, top: crop.y, width: crop.w, height: crop.h }).toBuffer() : first;
    await still(shown, project, name, width);
    rmSync(dir, { recursive: true, force: true });
    console.log("  ", short(file), `(${frames.length} frames)`);
};

// PROJECTS ====================================================================
// The keynote for GFF 2026: its chapters, each played slide by slide with
// their animations
async function keynote(only) {
    const project = "keynote";
    const deck = await openPage(`${SITE}/keynotes/gff-2026.html`, { width: 1280, height: 720 });
    await deck.click(640, 360);
    await sleep(1000);

    // Each clip by its slides, counted from the title (0; the deck's own
    // counter shows one more), in the order they come; the deck is stepped to
    // the slide before, then played through. A single slide plays longer, so
    // its animation finishes; `crop` keeps just part of it (at 1280 × 720).
    const CLIPS = [
        { name: "onboarding",   first: 16, last: 24 },
        { name: "collections",  first: 33, last: 36 },
        // Slide 40: the smart registry, the sources joining it and a record coming in
        { name: "registry",     first: 39, last: 39, crop: { x: 350, y: 80, w: 560, h: 600 }, width: 640 },
        // Slide 42: a transfer screened against the registry; the slide counter, shown for
        // its first moments, cropped off its foot
        { name: "screening",    first: 41, last: 41, crop: { x: 71, y: 0, w: 1138, h: 640 } },
    ];
    const DWELL = 2800;
    const SINGLE = 6500;
    let at = 0;
    for (const { name, first, last, crop, width } of CLIPS) {
        if (only.length && !only.includes(name)) continue;
        // To the slide before, forwards or back (chapters can overlap)
        while (at !== first - 1) {
            await deck.press(at < first - 1 ? "ArrowRight" : "ArrowLeft");
            at += at < first - 1 ? 1 : -1;
            await sleep(250);
        }
        await sleep(1500);
        await record(deck, project, name, async () => {
            for (; at < last; at++) {
                await deck.press("ArrowRight");
                await sleep(first === last ? SINGLE : DWELL);
            }
        }, { poster: first === last ? 40 : 12, crop, width });
    }
    await deck.close();
}

// =============================================================================
const PROJECTS = { "keynote": keynote };
// Projects named, and clips named (any other words), to take just those
const words = process.argv.slice(2);
const chosen = words.filter((word) => word in PROJECTS);
const only = words.filter((word) => !(word in PROJECTS));
for (const [name, take] of Object.entries(PROJECTS)) {
    if (chosen.length && !chosen.includes(name)) continue;
    console.log(name);
    await take(only);
}
