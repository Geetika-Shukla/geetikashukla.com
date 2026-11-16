// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// COMPONENTS ==================================================================
import { Pixels, ellipse, leaf, line, raster, roundRect } from "@/components/Pixel/pixel";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Rect } from "@/components/Pixel/pixel";

// Front elevation of the desk, drawn from geometric shapes rasterised onto a
// 640 × 156 grid of small pixels: pixel texture without hard, blocky edges.
// The desk runs the full width; objects sit in the middle so narrow screens
// can crop the plain ends.
const WIDTH = 640;
const HEIGHT = 156;
const DESK_TOP = 140;

const C = {
    ink        : "#2B2D38",
    bambooHi   : "#EBD3A9",
    bamboo     : "#DEBF8E",
    bambooMid  : "#CDA873",
    bambooEdge : "#BB925E",
    bambooSeam : "#A98250",
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
    ...contact(216, 40),
    // Stand, centred under the screen
    ...roundRect(180, 132, 72, 8, 3, C.stand), rect(184, 132, 64, 1, C.standHi),
    rect(208, 116, 16, 16, C.stand), rect(208, 116, 2, 16, C.standHi), rect(220, 116, 4, 16, C.standDark),
    // Bezel and screen
    ...roundRect(136, 20, 160, 98, 2, C.bezel), rect(142, 20, 148, 1, C.bezelHi),
    ...roundRect(212, 112, 8, 2, 1, "#4A4F5C"),

    // Screen, left: a design tool — toolbar, layers, canvas with two frames, properties
    ...roundRect(142, 26, 102, 84, 1, "#2C2C2E"),
    rect(142, 26, 102, 6, "#1E1E20"),
    ...ellipse(147, 29, 1.2, 1.2, C.rust), ...ellipse(151, 29, 1.2, 1.2, C.mustard), ...ellipse(155, 29, 1.2, 1.2, C.mint),
    ...[166, 172, 178, 184].flatMap((x) => roundRect(x, 28, 4, 2, 1, "#5A5A60")),
    ...[38, 43, 48, 53, 58, 63].flatMap((y, i) => roundRect(145, y, i % 2 ? 10 : 13, 2, 1, i === 1 ? "#6C8CF5" : "#56565C")),
    rect(162, 32, 64, 78, "#E6E6E6"),
    ...roundRect(167, 38, 26, 34, 2, "#FFFFFF"), ...roundRect(169, 40, 22, 12, 1, C.mint),
    ...roundRect(169, 55, 16, 2, 1, "#C8C8C8"), ...roundRect(169, 59, 11, 2, 1, "#C8C8C8"), ...roundRect(169, 65, 10, 4, 1, C.rust),
    ...roundRect(197, 46, 25, 30, 2, "#FFFFFF"), ...roundRect(199, 48, 21, 10, 1, C.rustLight),
    ...roundRect(199, 61, 15, 2, 1, "#C8C8C8"), ...roundRect(199, 65, 10, 2, 1, "#C8C8C8"),
    // Selection outline and handles on the second frame
    rect(196, 45, 27, 1, "#4C7DF0"), rect(196, 76, 27, 1, "#4C7DF0"), rect(196, 45, 1, 32, "#4C7DF0"), rect(222, 45, 1, 32, "#4C7DF0"),
    ...[[195, 44], [221, 44], [195, 75], [221, 75]].map(([x, y]) => rect(x, y, 3, 3, "#FFFFFF")),
    ...roundRect(167, 84, 55, 20, 2, "#FFFFFF"), ...roundRect(170, 87, 49, 3, 1, "#D9D9D9"), ...roundRect(170, 93, 30, 3, 1, "#D9D9D9"),
    ...[38, 46, 54, 72, 78].flatMap((y) => roundRect(229, y, y > 60 ? 9 : 12, 2, 1, "#56565C")),
    ...roundRect(229, 62, 4, 4, 1, C.rust), ...roundRect(234, 62, 4, 4, 1, C.mint), ...roundRect(239, 62, 4, 4, 1, "#6C8CF5"),

    // Screen, right: an AI chat panel
    rect(244, 26, 2, 84, C.bezel),
    ...roundRect(246, 26, 44, 84, 1, "#F6F1E8"),
    ...line(253, 31, 253, 37, 1, "#D97757"), ...line(250, 34, 256, 34, 1, "#D97757"),
    ...line(251, 32, 255, 36, 1, "#D97757"), ...line(255, 32, 251, 36, 1, "#D97757"),
    ...roundRect(259, 33, 18, 2, 1, "#CFC5B4"),
    ...roundRect(262, 42, 24, 9, 3, "#E7DFD1"), ...roundRect(265, 45, 16, 2, 1, "#A89F90"),
    ...roundRect(250, 55, 32, 2, 1, "#8E8678"), ...roundRect(250, 59, 28, 2, 1, "#8E8678"), ...roundRect(250, 63, 20, 2, 1, "#8E8678"),
    ...roundRect(266, 70, 20, 8, 3, "#E7DFD1"), ...roundRect(269, 73, 12, 2, 1, "#A89F90"),
    ...roundRect(250, 82, 30, 2, 1, "#8E8678"), ...roundRect(250, 86, 24, 2, 1, "#8E8678"),
    ...roundRect(249, 97, 38, 10, 4, "#FFFFFF"), ...roundRect(252, 101, 16, 2, 1, "#CFC5B4"), ...roundRect(279, 99, 6, 6, 2, "#D97757"),

    // Diagonal glare
    ...raster(142, 26, 290, 110, (x, y) => {
        const band = x + y * 0.8;
        return (band > 250 && band < 262) || (band > 268 && band < 272);
    }, C.glare),
];

// KEYBOARD AND MOUSE ==========================================================
// Keychron-style: aluminium frame, dark keycaps, grey modifiers, an orange Esc
const keyboard = (): Rect[] => {
    const rects: Rect[] = [
        ...contact(216, 52),
        ...roundRect(164, 129, 104, 11, 3, "#9A9EA6"), rect(166, 129, 100, 1, "#B9BCC3"), rect(164, 137, 104, 3, "#7E828B"),
    ];
    // Two visible rows of keycaps
    for (let row = 0; row < 2; row++) {
        const y = 130 + row * 3;
        for (let x = 168 + row * 2, i = 0; x < 262; x += 6, i++) {
            const isEsc = row === 0 && i === 0;
            const isModifier = (row === 1 && (i === 0 || i > 13)) || (row === 0 && i > 14);
            rects.push(...roundRect(x, y, 5, 3, 1, isEsc ? "#E07A3F" : isModifier ? "#7C8089" : "#3A3D46"));
        }
    }
    return rects;
};

const mouse = (): Rect[] => [
    ...contact(285, 10),
    ...ellipse(285, 137, 9, 4, "#3A3D46"), ...ellipse(285, 135.5, 7, 2.5, "#50545E"),
    rect(285, 133, 1, 3, "#2A2D34"),
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

    // Top tier: snow globe, bottle diorama, green box
    ...roundRect(411, 69, 30, 11, 3, "#D8C4A2"), rect(413, 69, 26, 2, "#E8D9BE"), rect(411, 75, 30, 2, "#C2AB86"),
    ...roundRect(419, 72, 14, 2, 1, "#8E7552"),
    ...ellipse(426, 56, 13, 13, C.glass),
    ...raster(413, 56, 439, 69, (x, y) => (x - 426) ** 2 + (y - 56) ** 2 <= 169 && y > 59, C.water),
    ...raster(413, 56, 439, 69, (x, y) => (x - 426) ** 2 + (y - 56) ** 2 <= 169 && y > 65, "#6AA8CC"),
    ...raster(418, 58, 434, 63, (x, y) => y > 58 && x > 418 + (y - 58) * 0.6 && x < 434 - (y - 58) * 0.6, "#F2C64B"),
    ...roundRect(424, 52, 4, 6, 1, "#D2483C"), ...ellipse(430, 54, 2.5, 3, "#FFFFFF"),
    ...raster(413, 43, 439, 69, (x, y) => {
        const d = Math.hypot(x - 426, y - 56);
        return d > 9.5 && d < 11.5 && x < 423 && y < 54;
    }, "#FFFFFF"),

    ...roundRect(446, 74, 34, 6, 2, C.wood), rect(448, 74, 30, 1, C.woodHi),
    ...roundRect(448, 59, 27, 15, 7, C.glass), ...roundRect(473, 62, 7, 9, 2, C.glass), ...roundRect(479, 62, 4, 9, 1, "#C79C6D"),
    ...ellipse(460, 71, 11, 3, "#7FA65A"), ...ellipse(455, 69, 3, 2, "#5E8C47"),
    ...roundRect(462, 63, 4, 7, 2, "#D2483C"), ...ellipse(464, 62, 2, 2, C.ink),
    ...roundRect(451, 61, 10, 2, 1, "#FFFFFF"),

    ...roundRect(486, 45, 19, 35, 3, "#8ECF6D"), ...roundRect(486, 45, 19, 4, 2, "#B3E297"), rect(500, 49, 5, 29, "#6EAE50"),
    ...[[490, 52], [496, 57], [490, 61], [497, 50]].flatMap(([x, y]) => ellipse(x, y, 1.2, 1.2, C.cream)),
    ...ellipse(493, 70, 5.5, 5, "#E8708F"), ...ellipse(491, 69, 1, 1, C.ink), ...ellipse(495, 69, 1, 1, C.ink),
    ...line(491, 72, 495, 72, 1, "#9C3550"),
    ...line(495, 45, 497, 38, 1, "#9AA0A8"), ...raster(494, 32, 502, 40, (x, y) => {
        const d = Math.hypot(x - 498, y - 36);
        return d > 2 && d < 3.5;
    }, "#9AA0A8"),

    // Bottom tier: lying ceramic dog, pen jar (the cat is drawn separately)
    ...ellipse(436, 105, 18, 7, C.ceramic),
    ...raster(418, 105, 454, 112, (x, y) => ((x - 436) / 18) ** 2 + ((y - 105) / 7) ** 2 <= 1 && y > 108, C.ceramicSh),
    ...line(452, 104, 457, 99, 3, C.ceramic),
    ...ellipse(419, 98, 8, 7, C.ceramic), ...ellipse(412, 101, 5, 3.5, C.ceramic),
    ...ellipse(423, 93, 3, 4.5, C.ceramicSh),
    ...ellipse(417, 96, 1.2, 1.2, C.ink), ...ellipse(408, 100, 1.4, 1.2, C.ink),
    ...line(409, 103, 414, 103, 1.5, "#E9909F"),
    ...ellipse(413, 110, 4, 2, C.ceramic), ...ellipse(423, 110, 4, 2, C.ceramic),
    ...ellipse(411, 111, 1, 0.8, C.ceramicSh), ...ellipse(421, 111, 1, 0.8, C.ceramicSh),

    ...line(493, 93, 493, 106, 2.5, "#5AA9E6"), ...line(497, 91, 497, 106, 2.5, C.mustard),
    ...line(500, 94, 500, 106, 2.5, "#E06A8C"), ...line(495, 95, 495, 106, 2, "#6DBE8C"),
    ...roundRect(489, 98, 15, 14, 4, C.glass), rect(491, 100, 2, 9, "#FFFFFF"), rect(489, 108, 15, 2, C.glassShade),
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

const shift = (rects: Rect[], dx: number): Rect[] => rects.map(([x, y, w, h, c]) => [x + dx, y, w, h, c]);

const SCENE: Rect[] = [
    ...desk(), ...cup(), ...echoDot(), ...monitor(), ...keyboard(), ...mouse(), ...journals(), ...phone(), ...shelf(), ...shift(cat(), -10),
    // Sits just right of the shelf, as on the real desk
    ...shift(plant(), 30),
];

// Clickable areas, in canvas pixels
const HOTSPOT_BOXES = {
    monitor  : [134, 18, 164, 122],
    echo     : [104, 108, 36, 32],
    shelf    : [396, 40, 128, 100],
    journals : [308, 114, 50, 26],
    phone    : [360, 96, 34, 44],
} as const;

const CAT_BOX = [464, 82, 26, 32] as const;

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
