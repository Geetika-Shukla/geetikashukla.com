"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef, useState } from "react";

const BLOCK = 24;
// How many squares light up each time, and how often (ms)
const COUNT = 7;
const EVERY = 60000;

type Glint = { key: string; x: number; y: number; delay: number };

/*
 * Now and then (once soon after the section comes into view, then about every
 * minute while it's on screen), a few squares of the grid glow faintly purple,
 * one after another, and fade. Each fills exactly one grid square. Not for
 * anyone who prefers less motion.
 */
export const GridGlints = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [glints, setGlints] = useState<Glint[]>([]);

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
            setGlints(Array.from({ length: COUNT }, (_, i) => ({
                key   : `${round}-${i}`,
                x     : Math.floor(Math.random() * cols) * BLOCK,
                y     : Math.floor(Math.random() * rows) * BLOCK,
                delay : i * 300,
            })));
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
        <div ref={ref} className="story__glints" aria-hidden="true">
            {glints.map(({ key, x, y, delay }) => (
                <span key={key} style={{ left: x, top: y, animationDelay: `${delay}ms` }} />
            ))}
        </div>
    );
};
