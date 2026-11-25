"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef } from "react";

// STYLES ======================================================================
import "./grid-canvas.css";

const BLOCK = 24;
// The liquify: how far it reaches from the cursor, and how far it pushes lines
const RADIUS = 150;
const PUSH = 16;
// Line opacity (of the text colour), as the grid's CSS had it
const LINE = 0.052;

/*
 * The home page's grid, drawn on one canvas fixed behind the page, so that it
 * can liquify: near the cursor the lines swell outwards, as under a liquify
 * brush, and ease back when it moves on. It keeps each section's grid where
 * its CSS had it: the hero's board and Work's stage carry their grid with
 * them (pinned under the nav while they're pinned), the story and testimonials
 * hold theirs still to the screen, and anything else scrolls with the page.
 * Cut-outs (cards, boxes) still hide the lines with their own paper. Without
 * a mouse, or for anyone who prefers less motion, it's simply the grid.
 */
export const GridCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        const liquify = window.matchMedia("(hover: hover) and (pointer: fine)").matches
            && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // The cursor, and the liquify's strength (eased towards 1 near the cursor, 0 away)
        const pointer = { x: -1e4, y: -1e4, strength: 0, target: 0 };
        let frame = 0;
        let width = 0;
        let height = 0;

        const resize = () => {
            const ratio = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        // Where a point on the grid shows, after the liquify (pushed out from the cursor)
        const warp = (x: number, y: number): [number, number] => {
            if (!pointer.strength) return [x, y];
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d >= RADIUS || d === 0) return [x, y];
            const falloff = 1 - d / RADIUS;
            const push = PUSH * falloff * falloff * pointer.strength;
            return [x + (dx / d) * push, y + (dy / d) * push];
        };

        // Each band of the screen with where its grid's rows start (in screen px)
        const bands = () => {
            const home = document.querySelector<HTMLElement>(".home");
            const homeTop = home ? home.getBoundingClientRect().top : 0;
            const pieces: { top: number; bottom: number; origin: number }[] = [];
            const add = (selector: string, still: boolean) => {
                const box = document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
                if (box && box.bottom > 0 && box.top < height) pieces.push({ top: box.top, bottom: box.bottom, origin: still ? 0 : box.top });
            };
            add(".hero__board", false);
            add(".work__stage", false);
            add(".story", true);
            add(".testimonials", true);
            pieces.sort((a, b) => a.top - b.top);
            // Anything between them scrolls with the page
            const all: typeof pieces = [];
            let y = 0;
            for (const piece of pieces) {
                if (piece.top > y) all.push({ top: y, bottom: piece.top, origin: homeTop });
                all.push(piece);
                y = Math.max(y, piece.bottom);
            }
            if (y < height) all.push({ top: y, bottom: height, origin: homeTop });
            return all;
        };

        const draw = () => {
            frame = 0;
            // Ease the liquify in and out
            pointer.strength += (pointer.target - pointer.strength) * 0.18;
            if (Math.abs(pointer.target - pointer.strength) < 0.01) pointer.strength = pointer.target;

            const ink = getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim() || "#1C1C1E";
            context.clearRect(0, 0, width, height);
            context.strokeStyle = ink;
            context.globalAlpha = LINE;
            context.lineWidth = 1;
            context.beginPath();

            const near = (a: number, b: number) => pointer.strength > 0 && Math.abs(a - b) < RADIUS;

            // Rows, band by band
            for (const { top, bottom, origin } of bands()) {
                const from = Math.max(top, 0);
                const to = Math.min(bottom, height);
                let y = origin + Math.ceil((from - origin) / BLOCK) * BLOCK;
                for (; y < to; y += BLOCK) {
                    const line = y + 0.5;
                    if (!near(line, pointer.y)) {
                        context.moveTo(0, line);
                        context.lineTo(width, line);
                        continue;
                    }
                    // Straight up to the cursor's reach, warped through it, straight after
                    const start = Math.max(0, pointer.x - RADIUS);
                    const end = Math.min(width, pointer.x + RADIUS);
                    context.moveTo(0, line);
                    for (let x = start; x <= end; x += 4) {
                        const [wx, wy] = warp(x, line);
                        context.lineTo(wx, Math.min(Math.max(wy, from), to));
                    }
                    context.lineTo(width, line);
                }
            }

            // Columns, the whole height (every grid starts its columns at the page's left edge)
            for (let x = 0; x < width; x += BLOCK) {
                const line = x + 0.5;
                if (!near(line, pointer.x)) {
                    context.moveTo(line, 0);
                    context.lineTo(line, height);
                    continue;
                }
                const start = Math.max(0, pointer.y - RADIUS);
                const end = Math.min(height, pointer.y + RADIUS);
                context.moveTo(line, 0);
                for (let y = start; y <= end; y += 4) context.lineTo(...warp(line, y));
                context.lineTo(line, height);
            }

            context.stroke();
            context.globalAlpha = 1;

            // Keep going while the liquify is easing
            if (pointer.strength !== pointer.target) request();
        };

        const request = () => {
            if (!frame) frame = requestAnimationFrame(draw);
        };

        const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.target = 1;
            request();
        };
        const onLeave = () => {
            pointer.target = 0;
            request();
        };
        const onResize = () => {
            resize();
            request();
        };

        resize();
        request();
        window.addEventListener("scroll", request, { passive: true });
        window.addEventListener("resize", onResize);
        if (liquify) {
            window.addEventListener("pointermove", onMove, { passive: true });
            document.addEventListener("pointerleave", onLeave);
            window.addEventListener("blur", onLeave);
        }
        // Redraw when the theme changes (the lines take the text colour)
        const themes = new MutationObserver(request);
        themes.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", request);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("blur", onLeave);
            themes.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="grid-canvas" aria-hidden="true" />;
};
