"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef, useState } from "react";

// TYPES =======================================================================
import type { CSSProperties } from "react";

const BLOCK = 24;
// How many currents run each time, and how often (ms)
const COUNT = 4;
const EVERY = 60000;

type Current = { key: string; along: "across" | "down"; at: number; run: number; delay: number };

/*
 * Now and then (once soon after the section comes into view, then about every
 * minute while it's on screen), a faint purple current runs along a few of the
 * grid's lines, one after another: across a horizontal line, or down a
 * vertical one, exactly on the line. Not for anyone who prefers less motion.
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
            const width = section.clientWidth;
            const height = section.clientHeight;
            const round = Date.now();
            setCurrents(Array.from({ length: COUNT }, (_, i): Current => {
                const along = Math.random() < 0.6 ? "across" : "down";
                // A grid line to run along (not the very edges)
                const lines = Math.floor((along === "across" ? height : width) / BLOCK);
                const at = (1 + Math.floor(Math.random() * (lines - 2))) * BLOCK;
                return { key: `${round}-${i}`, along, at, run: along === "across" ? width : height, delay: i * 700 };
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
            {currents.map(({ key, along, at, run, delay }) => (
                <span
                    key={key}
                    data-along={along}
                    style={{ [along === "across" ? "top" : "left"]: at, "--run": `${run}px`, animationDelay: `${delay}ms` } as CSSProperties}
                />
            ))}
        </div>
    );
};
