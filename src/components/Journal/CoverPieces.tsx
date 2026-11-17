// The scrapbook pieces stuck on the journal's cover: a hanko (name seal), a
// Claude sticker, a Figma sticker and a torn strip of GitHub contributions

// EXTERNAL DEPS ===============================================================
import React from "react";

// TYPES =======================================================================
import type { Contributions } from "@/data/github";

// HANKO =======================================================================
// An oval name seal in vermilion: ギーティカ (Geetika), read top to bottom, the
// ink a little uneven like a real stamp
export const Hanko = () => (
    <svg viewBox="0 0 64 112" aria-hidden="true">
        <defs>
            <filter id="hanko-ink" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" result="rough" />
                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.9" result="speckle" />
                <feComposite in="rough" in2="speckle" operator="in" />
            </filter>
        </defs>
        <g filter="url(#hanko-ink)" fill="#D0312B" stroke="#D0312B">
            <ellipse cx="32" cy="56" rx="28" ry="52" fill="none" strokeWidth="4" />
            <g className="hanko__name" strokeWidth="1.2" strokeLinejoin="round" fontSize="18" fontWeight="700" textAnchor="middle">
                <text x="32" y="28">ギ</text>
                <rect x="30" y="34" width="4" height="15" rx="1" stroke="none" />
                <text x="32" y="69">テ</text>
                <text x="34" y="84" fontSize="12">ィ</text>
                <text x="32" y="102">カ</text>
            </g>
        </g>
    </svg>
);

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
export const ContributionStrip = ({ total, days }: Contributions) => {
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
                <span className="contrib__total">{total} in the last year</span>
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
