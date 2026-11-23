// Stickers stuck about the story section: Claude, Figma (and, from the hero,
// the pixel heart). Each gets a smooth white die-cut edge from StickerEdge.

// EXTERNAL DEPS ===============================================================
import React from "react";

// CLAUDE ======================================================================
// Claude's spark: tapered rays of slightly different lengths around a centre
const RAYS: [number, number][] = [
    [0, 44], [31, 38], [62, 45], [93, 36], [122, 43], [151, 39],
    [182, 45], [213, 37], [242, 44], [271, 40], [301, 45], [331, 37],
];

const ray = ([angle, length]: [number, number]) => {
    const a = (angle * Math.PI) / 180;
    const at = (r: number, side: number) => {
        const x = 50 + r * Math.cos(a) - side * Math.sin(a);
        const y = 50 + r * Math.sin(a) + side * Math.cos(a);
        return `${x.toFixed(2)} ${y.toFixed(2)}`;
    };
    return `M${at(4, -3.4)} L${at(length, -1.6)} Q${at(length + 2.4, 0)} ${at(length, 1.6)} L${at(4, 3.4)} Z`;
};

export const ClaudeSpark = () => (
    <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="8" fill="#D97757" />
        {RAYS.map((r) => <path key={r[0]} d={ray(r)} fill="#D97757" />)}
    </svg>
);

// FIGMA =======================================================================
export const FigmaMark = () => (
    <svg viewBox="0 0 38 57" aria-hidden="true">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
);

// A smooth white die-cut edge for the stickers: blur the shape's outline, then
// sharpen it back (used as `filter: url(#story-sticker-edge)`)
export const StickerEdge = () => (
    <svg className="story__defs" aria-hidden="true">
        <filter id="story-sticker-edge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" />
            <feComponentTransfer result="edge">
                <feFuncA type="linear" slope="12" intercept="-0.6" />
            </feComponentTransfer>
            <feFlood floodColor="#FFFFFF" />
            <feComposite in2="edge" operator="in" />
            <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </svg>
);
