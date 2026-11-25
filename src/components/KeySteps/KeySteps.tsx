"use client";

// EXTERNAL DEPS ===============================================================
import { useEffect } from "react";

// How long a step takes; keys pressed meanwhile are held
const STEP = 650;

/*
 * The keyboard moves through the home page a stop at a time: the top, the
 * hero once its grid has formed, each of Work's kinds, the story's two stops,
 * the testimonials and the end. Down (↓, Page Down, the space bar) goes to the
 * next stop, up (↑, Page Up, Shift and space) to the one before; where the
 * next is well over a screen away, it goes a screen at a time, so long
 * stretches can still be read. Keys are left alone while typing, with Cmd, Ctrl
 * or Alt held, and the space bar on a focused button or link (which presses it).
 */
export const KeySteps = () => {
    useEffect(() => {
        let moving = 0;
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Where the page sits at each stop, top to bottom
        const stops = () => {
            const at = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector))
                .filter((box) => box.offsetParent !== null || getComputedStyle(box).position === "fixed")
                .map((box) => box.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(box).scrollMarginTop) || 0));
            const hero = document.querySelector<HTMLElement>(".hero");
            const end = document.documentElement.scrollHeight - window.innerHeight;
            const all = [
                0,
                // The hero's grid has formed a screen's scroll in
                ...(hero ? [hero.getBoundingClientRect().top + window.scrollY + window.innerHeight] : []),
                ...at(".work__step"),
                ...at(".story__about"),
                ...at(".story__work"),
                ...at(".testimonials"),
                end,
            ];
            return Array.from(new Set(all.map((y) => Math.round(Math.min(Math.max(y, 0), end))))).sort((a, b) => a - b);
        };

        const onKey = (event: KeyboardEvent) => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
            const field = event.target as HTMLElement | null;
            if (field?.closest("input, textarea, select, dialog, [contenteditable='true']")) return;
            if (event.key === " " && field?.closest("button, a, summary")) return;

            const down = event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey);
            const up = event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey);
            if (!down && !up) return;

            event.preventDefault();
            if (moving) return;

            const y = Math.round(window.scrollY);
            const list = stops();
            let target = down
                ? list.find((stop) => stop > y + 2) ?? y
                : list.slice().reverse().find((stop) => stop < y - 2) ?? y;
            // Well over a screen away (a long stretch to read): a screen at a time
            if (Math.abs(target - y) > window.innerHeight * 1.5) {
                const screen = Math.round(window.innerHeight * 0.85);
                target = down ? y + screen : y - screen;
            }
            if (target === y) return;

            window.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });
            moving = window.setTimeout(() => {
                moving = 0;
            }, smooth ? STEP : 0);
        };

        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.clearTimeout(moving);
        };
    }, []);

    return null;
};
