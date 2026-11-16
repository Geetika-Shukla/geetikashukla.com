// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// TYPES =======================================================================
import type { CSSProperties } from "react";

// Front elevation of the desk, drawn on a 200 × 64 pixel canvas.
// Each entry is [x, y, width, height, colour].
type Rect = [number, number, number, number, string];

const SCENE_WIDTH = 200;
const SCENE_HEIGHT = 64;

const C = {
    outline : "#2B2B2E",
    bamboo  : "#D9B98C",
    grain   : "#C9A676",
    edge    : "#B8925F",
    leg     : "#CFC9BE",
    shadow  : "#E6E2DA",
    white   : "#F6F4F0",
    whiteSh : "#C9C2B6",
    screen  : "#2E3C72",
    screenA : "#F7F6F3",
    accent  : "#1F3B5C",
    rust    : "#B4532A",
    mint    : "#BFE6DA",
    mintSh  : "#9FCFC1",
    leaf    : "#4F7A4A",
    leafDk  : "#2F5130",
    alexa   : "#3A3D42",
    alexaDt : "#4A4E55",
    ring    : "#4FC3F7",
};

const DESK: Rect[] = [
    // Top, front edge and grain
    [0, 52, 200, 4, C.bamboo],
    [0, 56, 200, 1, C.edge],
    [12, 53, 30, 1, C.grain], [60, 54, 40, 1, C.grain], [120, 53, 26, 1, C.grain], [160, 54, 30, 1, C.grain],
    // Legs
    [4, 57, 4, 7, C.leg], [192, 57, 4, 7, C.leg],
];

const MONITOR: Rect[] = [
    [46, 50, 22, 2, C.outline],          // base
    [54, 46, 6, 4, C.outline],           // neck
    [22, 10, 70, 37, C.outline],         // bezel
    [24, 12, 66, 32, C.screen],          // screen
    // A tiny timeline on screen
    [56, 14, 2, 28, C.screenA],
    [52, 16, 10, 2, C.rust], [30, 20, 18, 12, C.screenA], [66, 26, 18, 12, C.screenA],
    [32, 22, 14, 8, C.mint], [68, 28, 14, 8, C.rust],
    [52, 34, 10, 2, C.rust],
];

const ALEXA: Rect[] = [
    [8, 38, 10, 14, C.alexa],
    [8, 37, 10, 1, C.ring],
    [9, 40, 1, 1, C.alexaDt], [12, 40, 1, 1, C.alexaDt], [15, 40, 1, 1, C.alexaDt],
    [10, 43, 1, 1, C.alexaDt], [13, 43, 1, 1, C.alexaDt], [16, 43, 1, 1, C.alexaDt],
    [9, 46, 1, 1, C.alexaDt], [12, 46, 1, 1, C.alexaDt], [15, 46, 1, 1, C.alexaDt],
];

const NOTEPAD: Rect[] = [
    [100, 48, 12, 4, C.outline],
    [101, 48, 10, 3, "#F2D46B"],
    [102, 49, 7, 1, "#C9A84A"],
];

const PHONE: Rect[] = [
    [116, 50, 10, 2, C.outline],
    [117, 50, 8, 1, C.accent],
];

const SHELF: Rect[] = [
    // Posts
    [140, 12, 2, 40, C.whiteSh], [186, 12, 2, 40, C.whiteSh],
    // Top tier with front lip
    [140, 24, 48, 3, C.white], [140, 27, 48, 1, C.whiteSh], [140, 22, 1, 2, C.white], [187, 22, 1, 2, C.white],
    // Bottom tier
    [140, 40, 48, 3, C.white], [140, 43, 48, 1, C.whiteSh], [140, 38, 1, 2, C.white], [187, 38, 1, 2, C.white],

    // Top tier: snow globe, bottle diorama, green box, figure on a stand, small round figure
    [144, 22, 8, 2, "#8A6A4A"], [145, 16, 6, 6, "#CFE6F2"], [146, 19, 3, 2, C.rust], [148, 18, 1, 1, C.white],
    [154, 21, 12, 3, "#8A6A4A"], [155, 18, 10, 3, "#DDEFF5"], [158, 18, 2, 3, C.rust],
    [168, 12, 6, 12, "#8BD36B"], [169, 14, 1, 1, C.white], [172, 17, 1, 1, C.white], [170, 20, 2, 2, "#E06A8C"],
    [176, 21, 7, 3, "#B9BEC6"], [177, 15, 5, 6, "#6B5BA8"], [178, 13, 3, 2, "#EDEFF5"], [178, 17, 3, 2, "#7DBF5A"],
    [183, 20, 3, 4, "#F29BA8"], [183, 19, 3, 1, "#E8743B"],

    // Bottom tier: lying ceramic dog, block-built scene, pen jar
    [143, 36, 12, 4, "#FBFBF9"], [143, 35, 3, 2, "#FBFBF9"], [143, 36, 1, 1, C.outline], [154, 37, 2, 1, "#FBFBF9"],
    [158, 36, 12, 4, "#2F2F33"], [159, 33, 3, 3, "#F2A7C3"], [163, 34, 3, 2, "#C8402F"], [166, 32, 3, 4, "#9AA0A8"],
    [179, 31, 6, 9, "#E3EEF2"], [180, 28, 1, 4, "#5AA9E6"], [182, 27, 1, 5, "#F2C94C"], [183, 29, 1, 3, "#E06A8C"],
];

// The cat figurine is drawn separately so it can be its own button
const CAT: Rect[] = [
    [171, 34, 6, 6, C.outline],
    [172, 36, 4, 4, C.white],
    [171, 33, 1, 1, C.outline], [176, 33, 1, 1, C.outline],
    [172, 35, 1, 1, "#E8C547"], [175, 35, 1, 1, "#E8C547"],
    [177, 37, 2, 1, C.outline], [178, 36, 1, 1, C.outline],
];

const PLANT: Rect[] = [
    // Leaves
    [186, 32, 3, 6, C.leaf], [190, 30, 4, 7, C.leaf], [194, 33, 4, 5, C.leaf], [182, 35, 4, 4, C.leaf],
    [188, 36, 2, 6, C.leafDk], [192, 35, 2, 7, C.leafDk], [195, 37, 1, 5, C.leafDk],
    // Mint pot with a cat face
    [182, 42, 18, 10, C.mint], [182, 51, 18, 1, C.mintSh],
    [182, 40, 3, 2, C.mint], [197, 40, 3, 2, C.mint],
    [187, 45, 1, 1, C.outline], [194, 45, 1, 1, C.outline], [190, 47, 2, 1, "#E06A8C"],
    [184, 47, 3, 1, C.outline], [195, 47, 3, 1, C.outline],
];

const LAYERS = [DESK, ALEXA, MONITOR, NOTEPAD, PHONE, SHELF, CAT, PLANT];

interface Hotspot {
    label     : string;
    href      : string;
    box       : [number, number, number, number]; // x, y, width, height in scene pixels
    external? : boolean;
}

interface DeskSceneProps {
    hotspots : Hotspot[];
    meowing  : boolean;
    onMeow   : () => void;
}

const CAT_BOX: Hotspot["box"] = [170, 32, 9, 8];

// Positions an HTML element over the drawing, in scene pixel coordinates
const boxStyle = ([x, y, w, h]: Hotspot["box"]) => ({
    left   : `${(x / SCENE_WIDTH) * 100}%`,
    top    : `${(y / SCENE_HEIGHT) * 100}%`,
    width  : `${(w / SCENE_WIDTH) * 100}%`,
    height : `${(h / SCENE_HEIGHT) * 100}%`,
}) as CSSProperties;

export const DeskScene = ({ hotspots, meowing, onMeow }: DeskSceneProps) => (
    <div className="desk">
        <svg
            className="desk__drawing"
            viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
            shapeRendering="crispEdges"
            aria-hidden="true"
        >
            {LAYERS.flat().map(([x, y, w, h, fill], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
            ))}
        </svg>

        {hotspots.map(({ label, href, box, external }) => {
            const content = <span className="desk__label">{label}</span>;
            return external
                ? <a key={label} href={href} className="desk__hotspot" style={boxStyle(box)} target="_blank" rel="noopener noreferrer">{content}</a>
                : <Link key={label} href={href} className="desk__hotspot" style={boxStyle(box)}>{content}</Link>;
        })}

        <button type="button" className="desk__hotspot desk__cat" style={boxStyle(CAT_BOX)} onClick={onMeow} onMouseEnter={onMeow} aria-label="Say hello to the cat">
            <span className="desk__meow" data-visible={meowing} aria-live="polite">{meowing ? "Meow!" : ""}</span>
        </button>
    </div>
);

export type { Hotspot };
