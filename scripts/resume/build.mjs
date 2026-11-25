/*
 * Print the résumé (resume.html, beside this) to public/Geetika-resume.pdf,
 * the file the site offers for download. Needs Google Chrome.
 *
 *   npm run resume
 */

import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const source = new URL("./resume.html", import.meta.url);
const out = new URL("../../public/Geetika-resume.pdf", import.meta.url).pathname;
const profile = mkdtempSync(join(tmpdir(), "resume-"));

const chrome = spawnSync(CHROME, [
    "--headless=new", "--disable-gpu", `--user-data-dir=${profile}`,
    "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=3000",
    `--print-to-pdf=${out}`, source.href,
], { stdio: ["ignore", "ignore", "pipe"] });
rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });

if (chrome.status !== 0) {
    console.error(chrome.stderr.toString());
    process.exit(1);
}
console.log("Printed", out.replace(new URL("../../", import.meta.url).pathname, ""));
