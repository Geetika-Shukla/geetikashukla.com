"use client";

// EXTERNAL DEPS ===============================================================
import React, { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Set before the page paints (see THEME_SCRIPT in layout.tsx); read it back here
const current = (): Theme =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// Re-read whenever it changes
const subscribe = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
};

// Pixel drawings, a row of text each: # is a pixel, anything else is empty
const SUN = [
    "....#....",
    ".#.....#.",
    "...###...",
    "..#####..",
    "#.#####.#",
    "..#####..",
    "...###...",
    ".#.....#.",
    "....#....",
];

const MOON = [
    "...###...",
    ".###.....",
    ".##......",
    "##.......",
    "##.......",
    "##......#",
    ".##....##",
    ".#######.",
    "...###...",
];

const Pixels = ({ rows, className }: { rows: string[]; className: string }) => (
    <g className={className}>
        {rows.flatMap((row, y) => row.split("").map((cell, x) => (
            cell === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null
        )))}
    </g>
);

/*
 * Light or dark, in pixels: a sun by day, a crescent moon by night. The choice
 * is kept for next time; until one is made, the page follows the device's
 * setting.
 */
export const ThemeToggle = () => {
    // Unknown on the server; the page's own once it loads
    const theme = useSyncExternalStore(subscribe, current, () => null);

    const toggle = () => {
        const next: Theme = current() === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // Storage blocked: the choice lasts for this page only
        }
    };

    const dark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            title={dark ? "Light theme" : "Dark theme"}
        >
            <svg viewBox="0 0 9 9" shapeRendering="crispEdges" aria-hidden="true">
                <Pixels rows={SUN} className="theme-toggle__sun" />
                <Pixels rows={MOON} className="theme-toggle__moon" />
            </svg>
        </button>
    );
};
