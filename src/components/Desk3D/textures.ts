// Canvas-drawn textures for the 3D desk: the monitor screen and the sky.

// EXTERNAL DEPS ===============================================================
import * as THREE from "three";

export type Phase = "night" | "dawn" | "day" | "dusk";

export const phaseForHour = (hour: number): Phase => {
    if (hour >= 5 && hour < 8) return "dawn";
    if (hour >= 8 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "dusk";
    return "night";
};

const SKY_BANDS: Record<Phase, string[]> = {
    day   : ["#3F7CC4", "#5A93D1", "#7AABDD", "#9EC4E8", "#C4DCF0"],
    dawn  : ["#3A4878", "#6B6896", "#B4839A", "#E6A08A", "#F6C894"],
    dusk  : ["#2A2558", "#4F3672", "#91466E", "#D2654E", "#EE9C4A"],
    night : ["#0A0F26", "#111939", "#18234C", "#202D5C", "#2A3A6C"],
};

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
};

const toTexture = (canvas: HTMLCanvasElement, pixelated = false) => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    if (pixelated) {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
    }
    return texture;
};

// Sky in stepped bands with the sun or moon, and a simple skyline
export const skyTexture = (phase: Phase) => {
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 200;
    const ctx = canvas.getContext("2d")!;
    const bands = SKY_BANDS[phase];
    const edges = [0, 44, 84, 116, 144, 200];
    bands.forEach((colour, i) => {
        ctx.fillStyle = colour;
        ctx.fillRect(0, edges[i], 320, edges[i + 1] - edges[i]);
    });

    if (phase === "night") {
        ctx.fillStyle = "#EEF0F7";
        ctx.beginPath(); ctx.arc(248, 40, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = bands[0];
        ctx.beginPath(); ctx.arc(254, 36, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#DDE3F7";
        [[16, 12], [44, 28], [70, 8], [96, 40], [122, 18], [176, 10], [194, 34], [286, 16], [304, 38]].forEach(([x, y]) => ctx.fillRect(x, y, 2, 2));
    } else {
        const low = phase !== "day";
        ctx.fillStyle = low ? "#F7B05B" : "#F8DC80";
        ctx.beginPath(); ctx.arc(low ? 220 : 244, low ? 140 : 44, low ? 21 : 17, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        [[60, 40, 1.2], [160, 76, 1], [276, 96, 0.7]].forEach(([x, y, s]) => {
            ctx.beginPath();
            ctx.ellipse(x, y, 18 * s, 7 * s, 0, 0, Math.PI * 2);
            ctx.ellipse(x - 8 * s, y - 4 * s, 10 * s, 7 * s, 0, 0, Math.PI * 2);
            ctx.ellipse(x + 6 * s, y - 6 * s, 11 * s, 8 * s, 0, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Skyline
    const near = phase === "night" ? "#0B1024" : phase === "day" ? "#7E95AE" : "#3A2D4E";
    const far = phase === "night" ? "#1A2448" : phase === "day" ? "#A6BCD3" : "#6B5577";
    [[0, 24, 44], [24, 16, 60], [40, 28, 36], [68, 20, 68], [88, 24, 48], [128, 32, 40], [160, 20, 72], [204, 16, 60], [248, 20, 64], [292, 28, 56]]
        .forEach(([x, w, h]) => { ctx.fillStyle = far; ctx.fillRect(x, 200 - h, w, h); });
    [[0, 32, 28], [32, 20, 40], [88, 24, 44], [144, 20, 48], [200, 24, 38], [256, 20, 42], [276, 44, 30]]
        .forEach(([x, w, h]) => { ctx.fillStyle = near; ctx.fillRect(x, 200 - h, w, h); });

    return toTexture(canvas, true);
};

// Monitor screen: a design tool on the left, an AI chat panel on the right
export const screenTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext("2d")!;

    // Design tool
    ctx.fillStyle = "#2C2C2E"; ctx.fillRect(0, 0, 440, 360);
    ctx.fillStyle = "#1E1E20"; ctx.fillRect(0, 0, 440, 26);
    ["#C9683E", "#E3B94C", "#9FD5C3"].forEach((c, i) => {
        ctx.fillStyle = c; ctx.beginPath(); ctx.arc(14 + i * 14, 13, 4, 0, Math.PI * 2); ctx.fill();
    });
    [0, 1, 2, 3, 4, 5].forEach((i) => roundRect(ctx, 12, 44 + i * 22, i % 2 ? 44 : 56, 8, 4, i === 1 ? "#6C8CF5" : "#56565C"));
    ctx.fillStyle = "#E6E6E6"; ctx.fillRect(84, 26, 276, 334);
    roundRect(ctx, 104, 50, 112, 146, 8, "#FFFFFF"); roundRect(ctx, 114, 60, 92, 52, 6, "#9FD5C3");
    roundRect(ctx, 114, 124, 70, 8, 4, "#C8C8C8"); roundRect(ctx, 114, 140, 48, 8, 4, "#C8C8C8"); roundRect(ctx, 114, 164, 44, 18, 6, "#C9683E");
    roundRect(ctx, 236, 84, 108, 130, 8, "#FFFFFF"); roundRect(ctx, 246, 94, 88, 44, 6, "#E8A47A");
    roundRect(ctx, 246, 150, 64, 8, 4, "#C8C8C8"); roundRect(ctx, 246, 166, 44, 8, 4, "#C8C8C8");
    ctx.strokeStyle = "#4C7DF0"; ctx.lineWidth = 3; ctx.strokeRect(232, 80, 116, 138);
    roundRect(ctx, 104, 236, 240, 90, 8, "#FFFFFF"); roundRect(ctx, 118, 252, 210, 12, 6, "#D9D9D9"); roundRect(ctx, 118, 276, 130, 12, 6, "#D9D9D9");
    [0, 1, 2].forEach((i) => roundRect(ctx, 374, 44 + i * 28, 52, 8, 4, "#56565C"));
    ["#C9683E", "#9FD5C3", "#6C8CF5"].forEach((c, i) => roundRect(ctx, 374 + i * 20, 140, 16, 16, 4, c));

    // AI chat panel
    ctx.fillStyle = "#F6F1E8"; ctx.fillRect(448, 0, 192, 360);
    ctx.strokeStyle = "#D97757"; ctx.lineWidth = 4;
    for (let a = 0; a < 4; a++) {
        const angle = (a * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(474 - Math.cos(angle) * 10, 26 - Math.sin(angle) * 10);
        ctx.lineTo(474 + Math.cos(angle) * 10, 26 + Math.sin(angle) * 10);
        ctx.stroke();
    }
    roundRect(ctx, 496, 22, 80, 8, 4, "#CFC5B4");
    roundRect(ctx, 530, 56, 98, 34, 12, "#E7DFD1"); roundRect(ctx, 544, 69, 70, 8, 4, "#A89F90");
    [0, 1, 2].forEach((i) => roundRect(ctx, 462, 112 + i * 18, [140, 124, 90][i], 8, 4, "#8E8678"));
    roundRect(ctx, 548, 180, 80, 30, 12, "#E7DFD1"); roundRect(ctx, 560, 192, 54, 8, 4, "#A89F90");
    [0, 1].forEach((i) => roundRect(ctx, 462, 234 + i * 18, [132, 104][i], 8, 4, "#8E8678"));
    roundRect(ctx, 460, 300, 168, 42, 14, "#FFFFFF"); roundRect(ctx, 476, 318, 70, 8, 4, "#CFC5B4"); roundRect(ctx, 596, 308, 24, 24, 8, "#D97757");

    return toTexture(canvas);
};
