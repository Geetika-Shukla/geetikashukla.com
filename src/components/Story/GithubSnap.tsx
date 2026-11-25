// EXTERNAL DEPS ===============================================================
import React from "react";

// DATA ========================================================================
import { CONTRIBUTIONS } from "@/data/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Torn top and bottom edges: a fixed wobble, so server and browser draw the same strip
const WOBBLE = [1.5, 0, 2.5, 1, 3, 0.5, 2, 0, 3.5, 1.5, 0.5, 2.5, 0, 2, 1, 3, 0.5, 1.5, 0, 2.5, 1, 3.5, 0.5, 2, 0, 1.5];
const TEAR = (() => {
    const step = 100 / (WOBBLE.length - 1);
    const top = WOBBLE.map((y, i) => `${(i * step).toFixed(1)}% ${y}px`);
    const bottom = [...WOBBLE].reverse().map((y, i) => `${(100 - i * step).toFixed(1)}% calc(100% - ${3.5 - y}px)`);
    return `polygon(${[...top, ...bottom].join(", ")})`;
})();

/*
 * A snapshot of a year on GitHub, on a torn strip of paper taped on with washi
 * tape at two corners: a column per week, a square per day, darker for more.
 */
export const GithubSnap = () => {
    const { total, period, days } = CONTRIBUTIONS;
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
        <figure className="snap" aria-label={`${total} GitHub contributions ${period}`}>
            <span className="snap__tape snap__tape--left" aria-hidden="true" />
            <span className="snap__paper" style={{ clipPath: TEAR }} aria-hidden="true">
                <span className="snap__head">
                    <span>My contributions <em>[GitHub]</em></span>
                    <span className="snap__total">{total} {period}</span>
                </span>
                <span className="snap__months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                    {labels.map((label, week) => label && (
                        <span key={week} style={{ gridColumn: `${week + 1} / span 4` }}>{label}</span>
                    ))}
                </span>
                <span className="snap__days" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                    {Array.from({ length: offset }, (_, i) => <span key={`pad-${i}`} />)}
                    {days.map(({ date, level }) => <span key={date} data-level={level} />)}
                </span>
            </span>
            <span className="snap__tape snap__tape--right" aria-hidden="true" />
        </figure>
    );
};
