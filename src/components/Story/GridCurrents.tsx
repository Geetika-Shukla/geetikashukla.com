"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef, useState } from "react";

// TYPES =======================================================================
import type { CSSProperties } from "react";

const BLOCK = 24;
// How many highlights each time, and how often (ms)
const COUNT = 4;
const EVERY = 60000;

type Current = { key: string; along: "across" | "down"; x: number; y: number; length: number; delay: number };

/*
 * Now and then (once soon after the section comes into view, then about every
 * minute while it's on screen), a few stretches of the grid's lines light up
 * faint purple, one after another: each appears, stays a while, and fades
 * slowly, without moving. Each runs along a line, from one crossing to
 * another, 3 to 6 blocks long. Not for anyone who prefers less motion.
 */
export const GridCurrents = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [currents, setCurrents] = useState<Current[]>([]);

    useEffect(() => {
        const layer = ref.current;
        const section = layer?.parentElement;
        if (!layer || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let first = 0;
        let every = 0;

        const play = () => {
            const cols = Math.floor(section.clientWidth / BLOCK);
            const rows = Math.floor(section.clientHeight / BLOCK);
            const round = Date.now();
            setCurrents(Array.from({ length: COUNT }, (_, i): Current => {
                const along = Math.random() < 0.6 ? "across" : "down";
                const blocks = 3 + Math.floor(Math.random() * 4);
                // Start at a crossing, far enough from the edges for its whole length
                const x = (1 + Math.floor(Math.random() * (cols - (along === "across" ? blocks : 0) - 2))) * BLOCK;
                const y = (1 + Math.floor(Math.random() * (rows - (along === "down" ? blocks : 0) - 2))) * BLOCK;
                return { key: `${round}-${i}`, along, x, y, length: blocks * BLOCK, delay: i * 900 };
            }));
        };

        const stop = () => {
            window.clearTimeout(first);
            window.clearInterval(every);
            first = 0;
            every = 0;
        };

        // Only while the section is on screen
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !every) {
                first = window.setTimeout(play, 1500);
                every = window.setInterval(play, EVERY);
            } else if (!entry.isIntersecting) {
                stop();
            }
        }, { threshold: 0.2 });

        observer.observe(section);
        return () => {
            observer.disconnect();
            stop();
        };
    }, []);

    return (
        <div ref={ref} className="story__currents" aria-hidden="true">
            {currents.map(({ key, along, x, y, length, delay }) => (
                <span
                    key={key}
                    data-along={along}
                    style={{ left: x, top: y, "--length": `${length}px`, animationDelay: `${delay}ms` } as CSSProperties}
                />
            ))}
        </div>
    );
};
