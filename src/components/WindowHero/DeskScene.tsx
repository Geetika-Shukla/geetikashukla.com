// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// COMPONENTS ==================================================================
import { Pixels, ellipse, leaf, line, raster, roundRect } from "@/components/Pixel/pixel";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Rect } from "@/components/Pixel/pixel";

// Front elevation of the desk, drawn from geometric shapes rasterised onto a
// 640 × 176 grid of small pixels: pixel texture without hard, blocky edges.
// The desk runs the full width; objects sit in the middle so narrow screens
// can crop the plain ends.
const WIDTH = 640;
const HEIGHT = 176;
const DESK_TOP = 140;

const C = {
    ink        : "#2B2D38",
    bambooHi   : "#EBD3A9",
    bamboo     : "#DEBF8E",
    bambooMid  : "#CDA873",
    bambooEdge : "#BB925E",
    bambooSeam : "#A98250",
    under      : "#8E8172",
    leg        : "#ECE7DF",
    legShade   : "#CEC5B8",
    bezel      : "#2B2E38",
    bezelHi    : "#3D414D",
    stand      : "#3B3F4A",
    standHi    : "#565C69",
    standDark  : "#2C2F38",
    screenTop  : "#22305F",
    screenLow  : "#2D4080",
    glare      : "rgba(255,255,255,0.07)",
    cream      : "#F5EEE1",
    line       : "#CFC5B4",
    mint       : "#9FD5C3",
    rust       : "#C9683E",
    rustLight  : "#E8A47A",
    mustard    : "#E3B94C",
    indigo     : "#34507F",
    indigoDark : "#273E66",
    echo       : "#3E424C",
    echoHi     : "#535967",
    echoDot    : "#343842",
    ring       : "#63CDF2",
    shelf      : "#FBFAF6",
    shelfShade : "#E6E0D5",
    shelfDark  : "#CEC5B6",
    glass      : "#DCEEF4",
    glassShade : "#BFDCE7",
    water      : "#86BEDC",
    wood       : "#8E6D4C",
    woodHi     : "#AA8762",
    ceramic    : "#FCFBF8",
    ceramicSh  : "#E3DED6",
    leafLight  : "#8DBF6A",
    leafMid    : "#65965A",
    leafDark   : "#46733F",
    pot        : "#C2E5D8",
    potHi      : "#DFF3EC",
    potShade   : "#A3CFC0",
    pink       : "#E9909F",
};

const rect = (x: number, y: number, w: number, h: number, colour: string): Rect => [x, y, w, h, colour];

// Soft shadow on the desk under an object
const contact = (cx: number, halfWidth: number): Rect[] => ellipse(cx, DESK_TOP + 1, halfWidth, 2.5, C.bambooMid);

// DESK ========================================================================
const desk = (): Rect[] => {
    const rects: Rect[] = [
        rect(0, DESK_TOP, WIDTH, 4, C.bambooHi),
        rect(0, DESK_TOP + 4, WIDTH, 4, C.bamboo),
        rect(0, DESK_TOP + 8, WIDTH, 8, C.bambooEdge),
        rect(0, DESK_TOP + 8, WIDTH, 1, C.bambooMid),
        rect(0, DESK_TOP + 16, WIDTH, 2, C.under),
        // Legs
        ...roundRect(44, DESK_TOP + 18, 10, HEIGHT - DESK_TOP - 18, 2, C.leg), rect(51, DESK_TOP + 18, 3, HEIGHT - DESK_TOP - 18, C.legShade),
        ...roundRect(586, DESK_TOP + 18, 10, HEIGHT - DESK_TOP - 18, 2, C.leg), rect(593, DESK_TOP + 18, 3, HEIGHT - DESK_TOP - 18, C.legShade),
    ];
    // Bamboo laminate strips on the front edge, and a little grain on top
    for (let x = 14; x < WIDTH; x += 22) rects.push(rect(x, DESK_TOP + 10, 1, 6, C.bambooSeam));
    [[28, 60], [150, 46], [262, 80], [400, 56], [520, 70]].forEach(([x, w]) => rects.push(rect(x, DESK_TOP + 5, w, 1, C.bambooMid)));
    return rects;
};

// LEFT: coffee cup and smart speaker ==========================================
const cup = (): Rect[] => [
    ...contact(74, 16),
    ...ellipse(74, 139, 16, 3, C.ceramicSh), ...ellipse(74, 138, 15, 2.5, C.ceramic),
    ...raster(84, 124, 94, 136, (x, y) => {
        const d = Math.hypot(x - 84, y - 130);
        return d <= 6 && d >= 3;
    }, C.ceramic),
    ...roundRect(62, 120, 24, 18, 5, C.ceramic), rect(80, 122, 4, 14, C.ceramicSh),
    ...ellipse(74, 121, 11, 2, "#7A5238"),
    // Steam
    ...line(70, 106, 72, 114, 2, C.ceramicSh), ...line(72, 98, 70, 106, 2, C.ceramicSh),
    ...line(79, 104, 81, 112, 2, C.ceramicSh),
];

const echoDot = (): Rect[] => {
    const rects: Rect[] = [
        ...contact(122, 16),
        ...ellipse(122, 126, 15, 14, C.echo),
        ...raster(107, 112, 137, 140, (x, y) => ((x - 122) / 15) ** 2 + ((y - 126) / 14) ** 2 <= 1 && x < 116 && y < 124, C.echoHi),
    ];
    // Fabric texture
    for (let y = 116; y < 134; y += 3) {
        for (let x = 112 + (y % 2); x < 134; x += 3) {
            if (((x - 122) / 13) ** 2 + ((y - 126) / 12) ** 2 <= 1) rects.push(rect(x, y, 1, 1, C.echoDot));
        }
    }
    rects.push(...roundRect(110, 134, 24, 2, 1, C.ring), ...roundRect(114, 136, 16, 1, 0.5, "#B5E9FA"));
    return rects;
};

// MONITOR =====================================================================
const monitor = (): Rect[] => [
    ...contact(256, 40),
    // Stand
    ...roundRect(220, 132, 72, 8, 3, C.stand), rect(224, 132, 64, 1, C.standHi),
    rect(248, 116, 16, 16, C.stand), rect(248, 116, 2, 16, C.standHi), rect(260, 116, 4, 16, C.standDark),
    // Bezel and screen
    ...roundRect(136, 20, 160, 98, 6, C.bezel), rect(142, 20, 148, 1, C.bezelHi),
    ...roundRect(142, 26, 148, 84, 2, C.screenTop),
    ...raster(142, 26, 290, 110, (x, y) => y > 60 + (x - 142) * 0.05, C.screenLow),
    ...roundRect(252, 112, 8, 2, 1, "#4A4F5C"),
    // Window chrome on screen
    ...roundRect(142, 26, 148, 7, 2, "#1A2550"),
    ...ellipse(148, 29.5, 1.5, 1.5, C.rust), ...ellipse(153, 29.5, 1.5, 1.5, C.mustard), ...ellipse(158, 29.5, 1.5, 1.5, C.mint),
    // A tiny version of the timeline
    rect(215, 38, 2, 66, "#7586BE"),
    ...roundRect(211, 42, 10, 8, 2, C.rust), ...roundRect(211, 76, 10, 8, 2, C.rust),
    ...roundRect(160, 46, 42, 34, 3, C.cream), ...roundRect(164, 50, 34, 18, 2, C.mint),
    ...roundRect(164, 71, 26, 2, 1, C.line), ...roundRect(164, 75, 18, 2, 1, C.line),
    ...roundRect(230, 66, 42, 34, 3, C.cream), ...roundRect(234, 70, 34, 18, 2, C.rustLight),
    ...roundRect(234, 91, 26, 2, 1, C.line), ...roundRect(234, 95, 18, 2, 1, C.line),
    ...ellipse(181, 59, 5, 5, "#BFE7DA"), ...ellipse(251, 79, 5, 5, "#F2C3A4"),
    // Diagonal glare
    ...raster(142, 26, 290, 110, (x, y) => {
        const band = x + y * 0.8;
        return (band > 250 && band < 262) || (band > 268 && band < 272);
    }, C.glare),
];

// BOOKS AND PHONE =============================================================
const journals = (): Rect[] => [
    ...contact(334, 22),
    ...roundRect(312, 130, 42, 10, 2, C.indigo), rect(314, 134, 38, 2, C.cream), rect(312, 138, 42, 2, C.indigoDark),
    rect(342, 130, 2, 8, C.mustard),
    ...roundRect(316, 122, 34, 8, 2, C.rust), rect(318, 125, 30, 2, C.cream),
    ...line(320, 119, 344, 119, 3, C.ink), ...line(344, 119, 348, 119, 2, C.mustard),
];

const phone = (): Rect[] => [
    ...contact(377, 16),
    ...roundRect(362, 132, 30, 8, 3, "#D8D1C5"), rect(364, 132, 26, 1, "#ECE7DE"),
    ...roundRect(368, 98, 20, 36, 4, C.ink),
    ...roundRect(370, 102, 16, 28, 2, "#3F72B8"),
    ...ellipse(378, 110, 3.5, 3.5, C.cream),
    ...roundRect(373, 116, 10, 2, 1, C.cream), ...roundRect(373, 120, 10, 2, 1, "#9DB8E0"), ...roundRect(373, 124, 7, 2, 1, "#9DB8E0"),
];

// SHELF =======================================================================
const shelf = (): Rect[] => [
    ...contact(459, 64),
    // Posts
    ...roundRect(404, 42, 6, 98, 2, C.shelfShade), rect(404, 44, 2, 96, C.shelf),
    ...roundRect(508, 42, 6, 98, 2, C.shelfShade), rect(512, 44, 2, 96, C.shelfDark),
    // Tiers with a curved front lip and handle slots
    ...roundRect(398, 80, 122, 9, 4, C.shelf), rect(402, 86, 114, 2, C.shelfDark),
    ...roundRect(410, 82, 12, 2, 1, C.shelfShade), ...roundRect(496, 82, 12, 2, 1, C.shelfShade),
    ...roundRect(398, 112, 122, 9, 4, C.shelf), rect(402, 118, 114, 2, C.shelfDark),
    ...roundRect(410, 114, 12, 2, 1, C.shelfShade), ...roundRect(496, 114, 12, 2, 1, C.shelfShade),

    // Top tier: snow globe, bottle diorama, tall green box, figure on a stand
    ...roundRect(412, 70, 22, 10, 3, C.wood), rect(414, 70, 18, 2, C.woodHi), ...roundRect(416, 74, 14, 2, 1, "#D9C3A4"),
    ...ellipse(423, 60, 10, 10, C.glass),
    ...raster(413, 60, 433, 70, (x, y) => (x - 423) ** 2 + (y - 60) ** 2 <= 100 && y > 61, C.water),
    ...roundRect(418, 60, 9, 4, 2, C.rust), rect(421, 55, 2, 5, C.cream),
    ...ellipse(418, 55, 2, 3, "#FFFFFF"), ...ellipse(423, 49, 1.5, 1.5, C.mustard),

    ...roundRect(438, 64, 30, 16, 7, C.glass), ...roundRect(440, 75, 26, 3, 1, C.glassShade),
    ...ellipse(450, 74, 10, 3, "#80A85D"), ...roundRect(450, 66, 4, 7, 2, "#D2483C"), ...ellipse(452, 65, 2, 2, C.ink),
    ...roundRect(442, 67, 3, 4, 1, "#FFFFFF"),
    ...roundRect(468, 66, 6, 12, 2, "#C79C6D"),

    ...roundRect(476, 46, 18, 34, 3, "#8ECF6D"), rect(490, 48, 3, 30, "#6EAE50"),
    ...ellipse(481, 52, 1, 1, C.cream), ...ellipse(487, 58, 1, 1, C.cream), ...ellipse(481, 64, 1, 1, C.cream),
    ...roundRect(479, 68, 10, 8, 3, "#E86A8E"), ...ellipse(482, 71, 1, 1, C.ink), ...ellipse(486, 71, 1, 1, C.ink),
    ...roundRect(481, 41, 6, 5, 2, "#B9BEC6"),

    ...ellipse(497, 77, 9, 3, "#C9CED6"),
    ...roundRect(490, 58, 14, 18, 5, "#5D4F9C"),
    ...ellipse(497, 52, 7, 6, "#9ACD6B"), ...ellipse(494, 52, 1, 1, C.ink), ...ellipse(500, 52, 1, 1, C.ink),
    ...roundRect(491, 44, 12, 4, 2, "#F3F3F3"),

    // Bottom tier: lying ceramic dog, block-built scene, pen jar
    ...ellipse(430, 106, 15, 6, C.ceramic), ...raster(415, 106, 445, 112, (x, y) => ((x - 430) / 15) ** 2 + ((y - 106) / 6) ** 2 <= 1 && y > 109, C.ceramicSh),
    ...ellipse(416, 101, 7, 6, C.ceramic), ...ellipse(419, 96, 2.5, 3, C.ceramicSh),
    ...ellipse(413, 100, 1, 1, C.ink), ...ellipse(410, 103, 1, 1, C.ink),
    ...ellipse(447, 105, 3, 1.5, C.ceramic), ...ellipse(419, 111, 2, 1, C.ink), ...ellipse(426, 111, 2, 1, C.ink),

    ...roundRect(448, 106, 28, 6, 1, "#3F8A4A"), ...[451, 457, 463, 469].map((x) => roundRect(x, 104, 4, 2, 1, "#58A565")).flat(),
    ...roundRect(451, 94, 8, 10, 1, "#9EA4AC"), rect(451, 97, 8, 1, "#868C95"), rect(451, 100, 8, 1, "#868C95"),
    ...roundRect(461, 90, 14, 3, 1, "#C8402F"), rect(463, 93, 2, 11, "#C8402F"), rect(471, 93, 2, 11, "#C8402F"),
    ...ellipse(452, 89, 5, 4, "#F2A7C3"), ...ellipse(456, 86, 3, 3, "#F7C3D6"),

    ...roundRect(494, 92, 14, 20, 3, C.glass), rect(496, 95, 2, 14, "#FFFFFF"),
    ...line(498, 84, 498, 94, 2, "#5AA9E6"), ...line(502, 82, 502, 94, 2, C.mustard), ...line(505, 86, 505, 94, 2, "#E06A8C"),
];

// The cat figurine is the one that meows
const cat = (): Rect[] => [
    ...line(492, 108, 496, 100, 3, "#26262B"),
    ...ellipse(484, 104, 8, 8, "#26262B"),
    ...ellipse(484, 106, 4.5, 6, "#F6F4EF"),
    ...raster(476, 84, 480, 92, (x, y) => y > 84 + (x - 476) * 0 && x - 476 < (y - 84) * 0.6, "#26262B"),
    ...raster(488, 84, 492, 92, (x, y) => 492 - x < (y - 84) * 0.6, "#26262B"),
    ...ellipse(484, 93, 7.5, 6, "#26262B"),
    ...ellipse(484, 96, 3.5, 2.5, "#F6F4EF"),
    ...ellipse(481, 92, 1.2, 1.2, C.mustard), ...ellipse(487, 92, 1.2, 1.2, C.mustard),
    ...ellipse(484, 95, 1, 0.8, C.pink),
];

// PLANT =======================================================================
const plant = (): Rect[] => {
    const base = { x: 532, y: 118 };
    const leaves: [number, number, number, string][] = [
        [496, 74, 14, C.leafMid], [520, 56, 13, C.leafLight], [546, 54, 13, C.leafMid],
        [572, 72, 14, C.leafLight], [500, 98, 12, C.leafLight], [566, 98, 12, C.leafMid], [536, 72, 11, C.leafDark],
    ];
    const rects: Rect[] = [...contact(532, 22)];
    leaves.forEach(([tx, ty, width, colour]) => {
        rects.push(...leaf(base.x, base.y, tx, ty, width, colour));
        rects.push(...line(base.x + (tx - base.x) * 0.15, base.y + (ty - base.y) * 0.15, base.x + (tx - base.x) * 0.85, base.y + (ty - base.y) * 0.85, 1, C.leafDark));
    });
    // Mint pot with a cat face
    rects.push(
        ...raster(512, 114, 552, 140, (x, y) => {
            const inset = (y - 114) * 0.12;
            return x >= 512 + inset && x <= 552 - inset;
        }, C.pot),
        ...raster(512, 114, 552, 140, (x, y) => {
            const inset = (y - 114) * 0.12;
            return x >= 552 - inset - 4 && x <= 552 - inset;
        }, C.potShade),
        rect(515, 118, 3, 16, C.potHi),
        ...raster(512, 108, 520, 115, (x, y) => x - 512 < (y - 108) * 1.1 && x >= 512, C.pot),
        ...raster(544, 108, 552, 115, (x, y) => 552 - x < (y - 108) * 1.1 && x <= 552, C.pot),
        ...ellipse(526, 125, 1.3, 1.3, C.ink), ...ellipse(538, 125, 1.3, 1.3, C.ink),
        ...ellipse(532, 128, 1.6, 1.1, C.pink),
        ...line(518, 129, 524, 128, 1, C.ink), ...line(540, 128, 546, 129, 1, C.ink),
        rect(512, 112, 40, 3, C.potShade),
    );
    return rects;
};

const SCENE: Rect[] = [
    ...desk(), ...cup(), ...echoDot(), ...monitor(), ...journals(), ...phone(), ...shelf(), ...cat(), ...plant(),
];

// Clickable areas, in canvas pixels
const HOTSPOT_BOXES = {
    monitor  : [134, 18, 164, 122],
    echo     : [104, 108, 36, 32],
    shelf    : [396, 40, 128, 100],
    journals : [308, 114, 50, 26],
    phone    : [360, 96, 34, 44],
} as const;

const CAT_BOX = [474, 82, 26, 32] as const;

export type DeskObject = keyof typeof HOTSPOT_BOXES;

export interface DeskLink {
    object    : DeskObject;
    label     : string;
    href      : string;
    external? : boolean;
}

interface DeskSceneProps {
    links   : DeskLink[];
    meowing : boolean;
    onMeow  : () => void;
}

// Positions an HTML element over the drawing, in canvas pixel coordinates
const boxStyle = ([x, y, w, h]: readonly number[]) => ({
    left   : `${(x / WIDTH) * 100}%`,
    top    : `${(y / HEIGHT) * 100}%`,
    width  : `${(w / WIDTH) * 100}%`,
    height : `${(h / HEIGHT) * 100}%`,
}) as CSSProperties;

export const DeskScene = ({ links, meowing, onMeow }: DeskSceneProps) => (
    <div className="desk">
        <div className="desk__canvas">
            <svg className="desk__drawing" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} shapeRendering="crispEdges" aria-hidden="true">
                <Pixels rects={SCENE} />
            </svg>

            {links.map(({ object, label, href, external }) => {
                const content = <span className="desk__label">{label}</span>;
                const style = boxStyle(HOTSPOT_BOXES[object]);
                return external
                    ? <a key={object} href={href} className="desk__hotspot" style={style} target="_blank" rel="noopener noreferrer">{content}</a>
                    : <Link key={object} href={href} className="desk__hotspot" style={style}>{content}</Link>;
            })}

            <button type="button" className="desk__hotspot desk__cat" style={boxStyle(CAT_BOX)} onClick={onMeow} onMouseEnter={onMeow} aria-label="Say hello to the cat">
                <span className="desk__meow" data-visible={meowing} aria-live="polite">{meowing ? "Meow!" : ""}</span>
            </button>
        </div>
    </div>
);
