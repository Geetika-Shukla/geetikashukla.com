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

// A pixel window, 13 pixels square plus a sill. Each [x, y] is one pixel.
type Pixel = [number, number];

// The frame: the outline, a cross through the middle, and the sill under it
const FRAME: Pixel[] = [
    ...Array.from({ length: 13 }, (_, i): Pixel[] => [[i, 0], [i, 12], [0, i], [12, i], [i, 6], [6, i]]).flat(),
    ...Array.from({ length: 15 }, (_, i): Pixel => [i - 1, 13]),
];

// The four panes' glass
const PANES: Pixel[] = Array.from({ length: 11 * 11 }, (_, i): Pixel => [1 + (i % 11), 1 + Math.floor(i / 11)])
    .filter(([x, y]) => x !== 6 && y !== 6);

// The view by day: a sun top right, a cloud bottom left
const SUN: Pixel[] = [[9, 2], [10, 2], [9, 3], [10, 3], [8, 1], [11, 1], [8, 4], [11, 4]];
const CLOUD: Pixel[] = [[3, 8], [2, 9], [3, 9], [4, 9], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10]];

// And by night: a crescent moon top right, a scatter of stars
const MOON: Pixel[] = [[9, 1], [10, 1], [8, 2], [8, 3], [9, 4], [10, 4]];
const STARS: Pixel[] = [[2, 2], [4, 4], [3, 9], [10, 9], [8, 11], [5, 1]];

const Pixels = ({ at, className }: { at: Pixel[]; className: string }) => (
    <g className={className}>
        {at.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)}
    </g>
);

/*
 * Light or dark, as a pixel window: a day sky with a sun and a cloud, or a
 * night sky with the moon and stars. The choice is kept for next time; until
 * one is made, the page follows the device's setting.
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
            <svg viewBox="-1 0 15 14" shapeRendering="crispEdges" aria-hidden="true">
                <g className="theme-toggle__day">
                    <Pixels at={PANES} className="theme-toggle__sky" />
                    <Pixels at={CLOUD} className="theme-toggle__cloud" />
                    <Pixels at={SUN} className="theme-toggle__sun" />
                </g>
                <g className="theme-toggle__night">
                    <Pixels at={PANES} className="theme-toggle__sky" />
                    <Pixels at={STARS} className="theme-toggle__star" />
                    <Pixels at={MOON} className="theme-toggle__moon" />
                </g>
                <Pixels at={FRAME} className="theme-toggle__frame" />
            </svg>
        </button>
    );
};
