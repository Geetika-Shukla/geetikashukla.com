"use client";

// EXTERNAL DEPS ===============================================================
import { useEffect } from "react";

// The page's grid, in px
export const BLOCK = 24;

/*
 * Boxes on the grid sit on its lines: anything marked `data-snap` has its
 * height rounded up to a whole number of blocks, and kept so as its content
 * (or the screen) changes. Widths and positions are set in blocks in CSS.
 */
export const GridSnap = () => {
    useEffect(() => {
        const snap = (box: HTMLElement) => {
            // Its own height first, then up to the next grid line
            box.style.minHeight = "";
            const height = box.getBoundingClientRect().height;
            box.style.minHeight = `${Math.ceil(Math.round(height) / BLOCK) * BLOCK}px`;
        };

        const observer = new ResizeObserver((entries) => {
            entries.forEach(({ target }) => snap(target as HTMLElement));
        });
        document.querySelectorAll<HTMLElement>("[data-snap]").forEach((box) => observer.observe(box));
        return () => observer.disconnect();
    }, []);

    return null;
};
