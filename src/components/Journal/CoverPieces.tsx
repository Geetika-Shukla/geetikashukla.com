// The scrapbook pieces stuck on the journal's cover: a Claude sticker, a Figma
// sticker and a torn strip of GitHub contributions

// EXTERNAL DEPS ===============================================================
import React from "react";

// TYPES =======================================================================
import type { Contributions } from "@/data/github";

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

// CONTRIBUTIONS ===============================================================
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Torn top and bottom edges: a fixed wobble, so server and browser draw the same strip
const WOBBLE = [1.5, 0, 2.5, 1, 3, 0.5, 2, 0, 3.5, 1.5, 0.5, 2.5, 0, 2, 1, 3, 0.5, 1.5, 0, 2.5, 1, 3.5, 0.5, 2, 0, 1.5];
const TEAR = (() => {
    const step = 100 / (WOBBLE.length - 1);
    const top = WOBBLE.map((y, i) => `${(i * step).toFixed(1)}% ${y}px`);
    const bottom = [...WOBBLE].reverse().map((y, i) => `${(100 - i * step).toFixed(1)}% calc(100% - ${3.5 - y}px)`);
    return `polygon(${[...top, ...bottom].join(", ")})`;
})();

// A torn strip of paper with the last year of GitHub contributions, a column per week
export const ContributionStrip = ({ total, period, days }: Contributions) => {
    // Pad the first week so each column runs Sunday to Saturday
    const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const weeks = Math.ceil((offset + days.length) / 7);

    // A month's name over the first week that starts in it
    const labels = Array.from({ length: weeks }, (_, week) => {
        const day = days[Math.max(0, week * 7 - offset)];
        const date = new Date(`${day.date}T00:00:00Z`);
        return week > 0 && date.getUTCDate() <= 7 ? MONTHS[date.getUTCMonth()] : null;
    });

    return (
        <span className="contrib" style={{ clipPath: TEAR }}>
            <span className="contrib__head">
                <span>My contributions <em>[GitHub]</em></span>
                <span className="contrib__total">{total} {period}</span>
            </span>
            <span className="contrib__months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                {labels.map((label, week) => label && (
                    <span key={week} style={{ gridColumn: `${week + 1} / span 4` }}>{label}</span>
                ))}
            </span>
            <span className="contrib__grid" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                {Array.from({ length: offset }, (_, i) => <span key={`pad-${i}`} />)}
                {days.map(({ date, level }) => <span key={date} className="contrib__day" data-level={level} />)}
            </span>
        </span>
    );
};
