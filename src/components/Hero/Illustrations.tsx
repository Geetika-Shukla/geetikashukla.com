import Image from "next/image";

import spiritedAwayCover from "@/assets/images/vinyl-cover-spirited-away.jpg";

// Small illustrations for the hero board, drawn in the site's colours: things
// from the desk and from the interests (ink and nibs, sewing).

const INK = "#1C1C1E";
const RUST = "#C9683E";
const GOLD = "#E3B94C";
const PAPER = "#FBFAF6";

// The nav's heart, in pixels
export const PixelHeart = () => {
    const rows = [
        "..XX...XX..",
        ".XXXX.XXXX.",
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
        ".XXXXXXXXX.",
        "..XXXXXXX..",
        "...XXXXX...",
        "....XXX....",
        ".....X.....",
    ];
    return (
        <svg viewBox="0 0 11 10" shapeRendering="crispEdges" aria-hidden="true">
            {rows.flatMap((row, y) => row.split("").map((cell, x) => cell === "X" && (
                <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={x < 3 && y < 4 && y > 0 ? "#F28B8D" : "#E5484D"} />
            )))}
        </svg>
    );
};

// An ink bottle with a dip pen resting across it
export const InkBottle = () => (
    <svg viewBox="0 0 120 120" aria-hidden="true">
        <ellipse cx="58" cy="108" rx="40" ry="6" fill={INK} opacity="0.08" />
        <rect x="40" y="20" width="36" height="16" rx="3" fill={INK} />
        <rect x="44" y="34" width="28" height="8" fill="#3A3A3E" />
        <path d="M30 52 Q30 42 42 42 H74 Q86 42 86 52 V100 Q86 108 78 108 H38 Q30 108 30 100 Z" fill="#2F4A6B" />
        <path d="M30 70 H86 V100 Q86 108 78 108 H38 Q30 108 30 100 Z" fill="#1F3B5C" />
        <rect x="38" y="58" width="40" height="22" rx="2" fill={PAPER} />
        <text x="58" y="73" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="11" fill={INK}>Ink</text>
        <path d="M36 50 Q38 46 44 46" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g transform="rotate(-38 70 40)">
            <rect x="66" y="-12" width="8" height="60" rx="3" fill={RUST} />
            <rect x="66" y="40" width="8" height="8" fill={GOLD} />
            <path d="M66 48 H74 L70 64 Z" fill="#B9B9BE" />
            <line x1="70" y1="52" x2="70" y2="62" stroke={INK} strokeWidth="0.8" />
        </g>
    </svg>
);

// A fan of colour swatches, pinned at a rivet: five paint-chip strips in the
// site's colours, each with a label band at its foot
const SWATCHES = [
    { colour: "#3F8F8A", angle: -36 },
    { colour: "#7A5AD6", angle: -18 },
    { colour: "#E8B931", angle: 0 },
    { colour: "#F6CFC9", angle: 18 },
    { colour: RUST, angle: 36 },
];

export const SwatchFan = () => (
    <svg viewBox="0 0 120 120" aria-hidden="true">
        <ellipse cx="60" cy="110" rx="34" ry="4" fill={INK} opacity="0.08" />
        {SWATCHES.map(({ colour, angle }) => (
            <g key={colour} transform={`rotate(${angle} 60 100)`}>
                <rect x="49" y="14" width="22" height="94" rx="3" fill={PAPER} stroke={INK} strokeOpacity="0.15" />
                <rect x="51" y="16" width="18" height="62" rx="1.5" fill={colour} />
                <path d="M53 84 H67 M53 89 H63" stroke={INK} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
            </g>
        ))}
        {/* The rivet */}
        <circle cx="60" cy="100" r="4.5" fill={GOLD} stroke={INK} strokeOpacity="0.3" />
        <circle cx="59" cy="99" r="1.4" fill="#FFFFFF" opacity="0.7" />
    </svg>
);

// A wooden spool of thread with a needle through it
export const Spool = () => (
    <svg viewBox="0 0 120 120" aria-hidden="true">
        <ellipse cx="60" cy="108" rx="32" ry="5" fill={INK} opacity="0.08" />
        <rect x="30" y="20" width="60" height="12" rx="4" fill="#D9B98C" />
        <rect x="30" y="92" width="60" height="12" rx="4" fill="#D9B98C" />
        <rect x="38" y="32" width="44" height="60" fill={RUST} />
        {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1="38" y1={38 + i * 6.5} x2="82" y2={36 + i * 6.5} stroke="#A9512E" strokeWidth="1.2" />
        ))}
        <path d="M82 58 Q100 62 96 80 Q92 96 104 104" stroke={RUST} strokeWidth="2" fill="none" />
        <g transform="rotate(30 60 62)">
            <rect x="58" y="10" width="3" height="96" rx="1.5" fill="#B9B9BE" />
            <ellipse cx="59.5" cy="16" rx="1" ry="4" fill={PAPER} />
        </g>
    </svg>
);

// A sticky note with a to-do
export const StickyNote = () => (
    <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M14 14 H106 V92 L84 108 H14 Z" fill="#F6D76B" />
        <path d="M84 108 V92 H106 Z" fill="#E0BC4C" />
        <rect x="44" y="6" width="32" height="14" fill="#FFFFFF" opacity="0.55" transform="rotate(-4 60 13)" />
        <text x="24" y="40" fontFamily="serif" fontStyle="italic" fontSize="11" fill={INK}>to-do</text>
        <text x="24" y="58" fontFamily="serif" fontSize="9.5" fill={INK}>☑ kern it</text>
        <text x="24" y="74" fontFamily="serif" fontSize="9.5" fill={INK}>☐ ship it</text>
        <text x="24" y="90" fontFamily="serif" fontSize="9.5" fill={INK}>☐ dosa run</text>
    </svg>
);

// A record in its sleeve; on hover the record slides out and spins (see hero.css)
export const Vinyl = () => (
    <span className="vinyl" aria-hidden="true">
        <span className="vinyl__disc">
            <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="58" fill="#1C1C1E" />
                {[52, 46, 40, 34, 28].map((r) => (
                    <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="#2E2E33" strokeWidth="1.2" />
                ))}
                <path d="M24 34 A44 44 0 0 1 52 18" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="60" cy="60" r="18" fill={RUST} />
                <circle cx="60" cy="60" r="12" fill="none" stroke={GOLD} strokeWidth="1.2" />
                <circle cx="60" cy="60" r="2.5" fill={PAPER} />
            </svg>
        </span>
        {/* The sleeve: a photo of the Spirited Away soundtrack */}
        <Image className="vinyl__sleeve" src={spiritedAwayCover} alt="" sizes="120px" draggable={false} />
    </span>
);

// A retro game cartridge, no console's in particular: grey plastic with a
// ridged grip at the top, a pixel-art label (a sun setting over hills) and its
// gold contacts showing at the foot
const CART_LABEL = [
    "LLLLLLLLLLLLLLLLLL",
    "LLLLLLLLLLLSSSLLLL",
    "LLLLLLLLLLSSSSSLLL",
    "LLLLLLLLLLSSSSSLLL",
    "LLLLLLLLLLSSSSSLLL",
    "LLLLLLLLLLLSSSLLLL",
    "LLLTTLLLLLLLLLLLLL",
    "LLTTTTLLLLLLLTTLLL",
    "LTTTTTTLLLLLTTTTLL",
    "TTTTTTTTLLLTTTTTTL",
    "TTTTTTTTTTTTTTTTTT",
    "GGGGGGGGGGGGGGGGGG",
    "GGGGGGGGGGGGGGGGGG",
];
const CART_COLOURS: Record<string, string> = { L: "#DCCBEC", S: "#E8B931", T: "#3F8F8A", G: "#6E8B5B" };

export const GameCartridge = () => (
    <svg viewBox="0 0 120 132" aria-hidden="true">
        <ellipse cx="60" cy="126" rx="44" ry="4" fill={INK} opacity="0.08" />
        {/* Contacts, peeking out under the shell */}
        <rect x="28" y="112" width="64" height="10" rx="1" fill="#3A3A3E" />
        {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={31 + i * 5} y="114" width="3" height="8" fill="#D4AF37" />
        ))}
        {/* The shell */}
        <path d="M14 14 Q14 8 20 8 H100 Q106 8 106 14 V110 Q106 116 100 116 H20 Q14 116 14 110 Z" fill="#B9B9BE" />
        <path d="M14 14 Q14 8 20 8 H100 Q106 8 106 14 V30 H14 Z" fill="#C8C8CD" />
        {[14, 19, 24].map((y) => (
            <path key={y} d={`M26 ${y} H94`} stroke="#9C9CA2" strokeWidth="1.6" strokeLinecap="round" />
        ))}
        <path d="M18 12 H60" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
        {/* The label, set into a recess */}
        <rect x="21" y="36" width="78" height="72" rx="3" fill="#A6A6AC" />
        <rect x="24" y="39" width="72" height="66" rx="1.5" fill={PAPER} />
        <g shapeRendering="crispEdges">
            {CART_LABEL.flatMap((row, y) => row.split("").map((cell, x) => (
                <rect key={`${x}-${y}`} x={24 + x * 4} y={39 + y * 4} width={4} height={4} fill={CART_COLOURS[cell]} />
            )))}
        </g>
        {/* A title band at the label's foot, its words as pixel dashes */}
        <rect x="24" y="91" width="72" height="14" fill={INK} />
        <path d="M30 98 H46 M50 98 H58 M62 98 H80" stroke={PAPER} strokeWidth="3" />
        <circle cx="88" cy="98" r="2.5" fill="#E5484D" />
    </svg>
);

// A wooden letterpress block with अ cut into it in reverse, inked in rust, and
// the print it leaves on a slip of paper, the right way round
export const LetterpressBlock = () => (
    <svg viewBox="0 0 192 120" aria-hidden="true">
        <ellipse cx="96" cy="112" rx="82" ry="5" fill={INK} opacity="0.08" />
        {/* The print */}
        <g transform="rotate(5 142 60)">
            <rect x="108" y="18" width="68" height="84" fill={PAPER} stroke={INK} strokeOpacity="0.15" />
            <text x="142" y="78" textAnchor="middle" fontFamily="'Kohinoor Devanagari', 'Noto Sans Devanagari', sans-serif" fontWeight="600" fontSize="50" fill={RUST} fillOpacity="0.88">अ</text>
        </g>
        {/* The block: its face, inked, and the wood's edge below */}
        <rect x="16" y="94" width="80" height="12" rx="2" fill="#BE9B74" />
        <rect x="16" y="20" width="80" height="80" rx="3" fill="#D9B98C" />
        <path d="M22 34 Q50 30 90 36 M22 84 Q58 80 90 88" stroke="#C9A27A" strokeWidth="1" fill="none" />
        <rect x="24" y="28" width="64" height="64" rx="2" fill="#C9A27A" />
        <text
            x="56" y="78" textAnchor="middle" transform="translate(112 0) scale(-1 1)"
            fontFamily="'Kohinoor Devanagari', 'Noto Sans Devanagari', sans-serif" fontWeight="600" fontSize="50" fill={RUST}
        >अ</text>
        <path d="M22 26 H60" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// Brahmakamal, queen of the night (an epiphyllum), in a terracotta pot: a bud in the day,
// opening into its white flower once the page turns dark or it's hovered
// (see hero.css)
const QOTN_PETALS = Array.from({ length: 12 }, (_, i) => i * 30);
const QOTN_SEPALS = Array.from({ length: 10 }, (_, i) => i * 36 + 18);

export const QueenOfTheNight = () => (
    <svg className="qotn" viewBox="0 0 120 214" aria-hidden="true">
        <ellipse cx="60" cy="208" rx="30" ry="4" fill={INK} opacity="0.08" />
        {/* Flat, wavy-edged stems for leaves */}
        <path d="M60 172 Q52 160 50 150 Q42 146 46 138 Q50 132 44 124 Q36 118 42 110 Q46 102 40 94 Q34 86 42 78 Q46 70 48 64 Q54 72 54 80 Q62 88 56 96 Q52 104 60 112 Q66 120 58 128 Q56 136 62 144 Q68 154 64 172 Z" fill="#6E8B5B" />
        <path d="M62 170 Q50 120 48 66" stroke="#55704A" strokeWidth="1.2" fill="none" />
        <path d="M66 172 Q70 160 78 156 Q78 146 86 144 Q86 134 94 130 Q96 122 102 118 Q100 130 96 136 Q96 146 88 150 Q86 160 78 164 Q74 170 70 174 Z" fill="#7E9C69" />
        {/* The flower's long tube, from a notch in the leaf */}
        <path d="M58 112 C82 104 84 70 62 50" stroke="#C98A7A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* Day: a closed bud */}
        <g className="qotn__bud">
            <path d="M62 52 Q48 46 52 28 Q56 16 64 12 Q70 22 70 34 Q70 48 62 52 Z" fill="#C98A7A" />
            <path d="M62 50 Q56 40 60 26 Q62 18 64 14" stroke="#E8C4B4" strokeWidth="1.2" fill="none" />
            <path d="M63 50 Q68 40 66 26" stroke="#A9675A" strokeWidth="1" fill="none" />
        </g>
        {/* Night: the open flower */}
        <g className="qotn__bloom">
            {QOTN_SEPALS.map((angle) => (
                <ellipse key={angle} cx="60" cy="16" rx="3" ry="22" transform={`rotate(${angle} 60 40)`} fill="#E9C9B8" />
            ))}
            {QOTN_PETALS.map((angle) => (
                <ellipse key={angle} cx="60" cy="22" rx="7" ry="18" transform={`rotate(${angle} 60 40)`} fill="#FFFFFF" stroke="#E6E2DA" strokeWidth="0.6" />
            ))}
            <circle cx="60" cy="40" r="8" fill="#F6EFD8" />
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
                <path key={angle} d="M60 40 V31" transform={`rotate(${angle} 60 40)`} stroke="#E3B94C" strokeWidth="0.9" strokeLinecap="round" />
            ))}
            <circle cx="60" cy="40" r="1.8" fill="#C9D98C" />
        </g>
        {/* The pot */}
        <path d="M38 176 H82 L77 206 H43 Z" fill={RUST} />
        <rect x="34" y="168" width="52" height="10" rx="2" fill="#D97A50" />
        <path d="M40 182 H80" stroke="#A9512E" strokeWidth="1" />
    </svg>
);

// Fabric swatches, one laid over the other: ikat, its diamonds blurred where
// the dyed threads shift, and sheer chanderi with gold butis and a zari border,
// the ikat showing through it; each cut with pinking shears
const pinked = (x: number, y: number, w: number, h: number, tooth = 4) => {
    const along = (from: number, length: number) =>
        Array.from({ length: Math.round(length / tooth) + 1 }, (_, i) => from + (i * length) / Math.round(length / tooth));
    const xs = along(x, w);
    const ys = along(y, h);
    const top = xs.map((px, i) => `${px} ${i % 2 ? y - 1.5 : y}`);
    const right = ys.map((py, i) => `${i % 2 ? x + w + 1.5 : x + w} ${py}`);
    const bottom = [...xs].reverse().map((px, i) => `${px} ${i % 2 ? y + h + 1.5 : y + h}`);
    const left = [...ys].reverse().map((py, i) => `${i % 2 ? x - 1.5 : x} ${py}`);
    return `M${[...top, ...right, ...bottom, ...left].join(" L")} Z`;
};

const IKAT = { x: 8, y: 10, w: 70, h: 66 };
const CHANDERI = { x: 58, y: 30, w: 70, h: 66 };
const IKAT_DIAMONDS = [0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => [IKAT.x + 8 + col * 22 + (row % 2) * 11, IKAT.y + 12 + row * 20]));

export const FabricSwatches = () => (
    <svg viewBox="0 0 136 104" aria-hidden="true" style={{ overflow: "visible" }}>
        <defs>
            <clipPath id="swatch-ikat"><path d={pinked(IKAT.x, IKAT.y, IKAT.w, IKAT.h)} /></clipPath>
            <clipPath id="swatch-chanderi"><path d={pinked(CHANDERI.x, CHANDERI.y, CHANDERI.w, CHANDERI.h)} /></clipPath>
        </defs>
        {/* Ikat, underneath: indigo diamonds with feathered edges, and rust bands */}
        <g transform="rotate(-6 43 43)">
            <g clipPath="url(#swatch-ikat)">
                <rect x={IKAT.x - 4} y={IKAT.y - 4} width={IKAT.w + 8} height={IKAT.h + 8} fill="#F3EAD8" />
                {[2, 22, 42, 62].map((dy) => <rect key={dy} x={IKAT.x - 4} y={IKAT.y + dy - 1.5} width={IKAT.w + 8} height="3" fill={RUST} opacity="0.8" />)}
                {IKAT_DIAMONDS.map(([cx, cy]) => (
                    <g key={`${cx}-${cy}`}>
                        {[-2.5, 2.5].map((shift) => (
                            <path key={shift} d={`M${cx + shift} ${cy - 9} L${cx + 8 + shift} ${cy} L${cx + shift} ${cy + 9} L${cx - 8 + shift} ${cy} Z`} fill="#2F4A6B" opacity="0.35" />
                        ))}
                        <path d={`M${cx} ${cy - 8} L${cx + 7} ${cy} L${cx} ${cy + 8} L${cx - 7} ${cy} Z`} fill="#1F3B5C" />
                        <path d={`M${cx} ${cy - 3} L${cx + 2.5} ${cy} L${cx} ${cy + 3} L${cx - 2.5} ${cy} Z`} fill="#F3EAD8" />
                    </g>
                ))}
            </g>
        </g>
        {/* Chanderi, over it and sheer: peachy gold, gold butis, a zari border */}
        <g transform="rotate(5 93 63)">
            <g clipPath="url(#swatch-chanderi)">
                <rect x={CHANDERI.x - 4} y={CHANDERI.y - 4} width={CHANDERI.w + 8} height={CHANDERI.h + 8} fill="#F6DCC4" opacity="0.82" />
                {[0, 1, 2, 3].flatMap((row) => [0, 1, 2, 3].map((col) => {
                    const cx = CHANDERI.x + 10 + col * 16 + (row % 2) * 8;
                    const cy = CHANDERI.y + 10 + row * 12;
                    return (
                        <g key={`${row}-${col}`} fill="#D4AF37">
                            <circle cx={cx} cy={cy - 2} r="1.3" />
                            <circle cx={cx} cy={cy + 2} r="1.3" />
                            <circle cx={cx - 2} cy={cy} r="1.3" />
                            <circle cx={cx + 2} cy={cy} r="1.3" />
                        </g>
                    );
                }))}
                <rect x={CHANDERI.x - 4} y={CHANDERI.y + 54} width={CHANDERI.w + 8} height="14" fill="#D4AF37" opacity="0.85" />
                <path d={`M${CHANDERI.x - 4} ${CHANDERI.y + 57} h${CHANDERI.w + 8} M${CHANDERI.x - 4} ${CHANDERI.y + 65} h${CHANDERI.w + 8}`} stroke="#B8902A" strokeWidth="0.8" />
                {Array.from({ length: 12 }, (_, i) => (
                    <path key={i} d={`M${CHANDERI.x + 1 + i * 6} ${CHANDERI.y + 61} l3 -2.5 l3 2.5 l-3 2.5 Z`} fill="#F6DCC4" />
                ))}
            </g>
        </g>
    </svg>
);
