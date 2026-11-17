import Image from "next/image";

import spiritedAwayCover from "@/assets/images/vinyl-cover-spirited-away.jpg";

// Small illustrations for the hero board, drawn in the site's colours: things
// from the desk and from the interests (ink and nibs, sewing, soaps).

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

// South Indian filter coffee: a steel tumbler, frothed, in its dabarah
export const FilterCoffee = () => (
    <svg viewBox="0 0 120 120" aria-hidden="true">
        <ellipse cx="60" cy="110" rx="44" ry="5" fill={INK} opacity="0.08" />
        {/* Steam */}
        <path d="M52 12 Q46 20 52 28 Q58 36 52 44" stroke="#C9C4BA" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M66 8 Q60 17 66 25 Q72 33 66 41" stroke="#C9C4BA" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* The dabarah: a wide steel bowl with a rolled rim */}
        <path d="M16 82 H104 L96 104 Q94 108 88 108 H32 Q26 108 24 104 Z" fill="#B9BCC2" />
        <path d="M16 82 H104 L101 90 H19 Z" fill="#D4D6DB" />
        <ellipse cx="60" cy="82" rx="44" ry="5" fill="#E4E6EA" />
        <path d="M30 96 Q60 102 90 96" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" fill="none" />
        {/* The tumbler, set in the bowl */}
        <path d="M38 48 H82 L78 84 Q77 88 72 88 H48 Q43 88 42 84 Z" fill="#C7CAD0" />
        <rect x="38" y="44" width="44" height="7" rx="3.5" fill="#E4E6EA" />
        <path d="M40 60 H80" stroke="#A9ACB3" strokeWidth="1.5" />
        <path d="M41 72 H79" stroke="#A9ACB3" strokeWidth="1.5" />
        <path d="M47 52 L46 84" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
        {/* Froth */}
        <ellipse cx="60" cy="46" rx="20" ry="3.5" fill="#C9A27A" />
        <ellipse cx="57" cy="45.5" rx="9" ry="1.6" fill="#E6CFAE" />
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

// A bar of handmade soap with a few bubbles
export const Soap = () => (
    <svg viewBox="0 0 120 120" aria-hidden="true">
        <ellipse cx="60" cy="100" rx="42" ry="6" fill={INK} opacity="0.08" />
        <rect x="18" y="50" width="84" height="46" rx="12" fill="#E8D3E2" />
        <rect x="18" y="50" width="84" height="34" rx="12" fill="#F3E3EE" />
        <rect x="34" y="60" width="52" height="14" rx="7" fill="none" stroke="#D6B9CC" strokeWidth="2" />
        <text x="60" y="71" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="9" fill="#B48AA6">lavender</text>
        <circle cx="34" cy="36" r="9" fill="none" stroke="#9FC4D8" strokeWidth="2" />
        <circle cx="52" cy="24" r="6" fill="none" stroke="#9FC4D8" strokeWidth="2" />
        <circle cx="86" cy="34" r="11" fill="none" stroke="#9FC4D8" strokeWidth="2" />
        <circle cx="31" cy="33" r="2" fill="#FFFFFF" />
        <circle cx="82" cy="30" r="2.5" fill="#FFFFFF" />
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
        <text x="24" y="90" fontFamily="serif" fontSize="9.5" fill={INK}>☐ dosa</text>
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
