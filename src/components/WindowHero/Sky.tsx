// COMPONENTS ==================================================================
import { Pixels, checker, ellipse } from "@/components/Pixel/pixel";

// TYPES =======================================================================
import type { Rect } from "@/components/Pixel/pixel";

export type Phase = "night" | "dawn" | "day" | "dusk";

const WIDTH = 320;
const HEIGHT = 200;
const BAND_EDGES = [0, 44, 84, 116, 144, HEIGHT];

interface Palette {
    bands     : string[];  // five sky bands, top to bottom
    cloud?    : [string, string];
    far       : string;    // distant buildings
    near      : string;    // near buildings
    lights?   : string;    // lit windows
}

const PALETTES: Record<Phase, Palette> = {
    day: {
        bands : ["#3F7CC4", "#5A93D1", "#7AABDD", "#9EC4E8", "#C4DCF0"],
        cloud : ["#FFFFFF", "#DCE8F4"],
        far   : "#A6BCD3",
        near  : "#7E95AE",
    },
    dawn: {
        bands  : ["#3A4878", "#6B6896", "#B4839A", "#E6A08A", "#F6C894"],
        cloud  : ["#F8D6C4", "#D9A3A6"],
        far    : "#8C7A96",
        near   : "#5A4F6E",
        lights : "#F6D27A",
    },
    dusk: {
        bands  : ["#2A2558", "#4F3672", "#91466E", "#D2654E", "#EE9C4A"],
        cloud  : ["#E9937A", "#B65E6A"],
        far    : "#5B3D63",
        near   : "#2E2342",
        lights : "#FFD27A",
    },
    night: {
        bands  : ["#0A0F26", "#111939", "#18234C", "#202D5C", "#2A3A6C"],
        far    : "#1A2448",
        near   : "#0B1024",
        lights : "#F2C96A",
    },
};

// A cloud: a few overlapping puffs with a shaded underside
const cloud = (x: number, y: number, scale: number, light: string, shade: string): Rect[] => [
    ...ellipse(x + 14 * scale, y + 6 * scale, 16 * scale, 6 * scale, shade),
    ...ellipse(x + 8 * scale, y + 3 * scale, 9 * scale, 6 * scale, light),
    ...ellipse(x + 20 * scale, y, 11 * scale, 8 * scale, light),
    ...ellipse(x + 30 * scale, y + 4 * scale, 8 * scale, 5 * scale, light),
];

const STARS: [number, number][] = [
    [16, 12], [44, 28], [70, 8], [96, 40], [122, 18], [148, 52], [176, 10], [194, 34],
    [218, 60], [262, 16], [286, 38], [304, 8], [30, 62], [110, 70], [248, 76], [300, 66],
];

// Building columns: [x, width, height] — two layers for depth
const FAR_BUILDINGS: [number, number, number][] = [
    [0, 24, 44], [24, 16, 60], [40, 28, 36], [68, 20, 68], [88, 24, 48], [112, 16, 56], [128, 32, 40],
    [160, 20, 72], [180, 24, 44], [204, 16, 60], [220, 28, 36], [248, 20, 64], [268, 24, 48], [292, 28, 56],
];
const NEAR_BUILDINGS: [number, number, number][] = [
    [0, 32, 28], [32, 20, 40], [52, 36, 24], [88, 24, 44], [112, 32, 30], [144, 20, 48],
    [164, 36, 26], [200, 24, 38], [224, 32, 24], [256, 20, 42], [276, 44, 30],
];

const drawSky = (phase: Phase): Rect[] => {
    const p = PALETTES[phase];
    const rects: Rect[] = [];

    // Bands, with a dithered row where each band meets the next
    p.bands.forEach((colour, i) => {
        const top = BAND_EDGES[i];
        rects.push([0, top, WIDTH, BAND_EDGES[i + 1] - top, colour]);
        if (i > 0) rects.push(...checker(0, top, WIDTH, p.bands[i - 1]));
    });

    // Sun, moon and stars
    if (phase === "night") {
        STARS.forEach(([x, y], i) => rects.push([x, y, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1, i % 3 === 0 ? "#FFFFFF" : "#C9D2F0"]));
        rects.push(...ellipse(248, 40, 14, 14, "#EEF0F7"));
        rects.push(...ellipse(254, 36, 12, 12, p.bands[0]));
    } else if (phase === "day") {
        rects.push(...ellipse(244, 44, 17, 17, "#F8DC80"));
        rects.push(...ellipse(244, 44, 12, 12, "#FBE9A8"));
    } else {
        // Low sun sitting behind the skyline
        rects.push(...ellipse(220, 140, 21, 21, phase === "dawn" ? "#FBD38A" : "#F7B05B"));
        rects.push(...ellipse(220, 140, 13, 13, "#FDEBC0"));
    }

    // Clouds
    if (p.cloud) {
        const [light, shade] = p.cloud;
        rects.push(...cloud(36, 34, 1.2, light, shade));
        rects.push(...cloud(140, 70, 1, light, shade));
        rects.push(...cloud(262, 92, 0.7, light, shade));
    }

    // Skyline: far layer, then near layer with lit windows after dark
    FAR_BUILDINGS.forEach(([x, w, h]) => rects.push([x, HEIGHT - h, w, h, p.far]));
    NEAR_BUILDINGS.forEach(([x, w, h], i) => {
        rects.push([x, HEIGHT - h, w, h, p.near]);
        if (p.lights) {
            for (let wy = HEIGHT - h + 5; wy < HEIGHT - 4; wy += 7) {
                for (let wx = x + 4; wx < x + w - 4; wx += 7) {
                    if ((wx + wy + i) % 3 !== 0) rects.push([wx, wy, 3, 3, p.lights]);
                }
            }
        }
    });

    return rects;
};

export const Sky = ({ phase }: { phase: Phase }) => (
    <svg
        className="sky"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
    >
        <Pixels rects={drawSky(phase)} />
    </svg>
);
