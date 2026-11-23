"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useState } from "react";
import Image from "next/image";

// STYLES ======================================================================
import "./motion-thumb.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";

export interface Motion {
    // Screens filling the thumbnail one after another, or phone screens gliding past
    kind    : "browser" | "phone";
    screens : StaticImageData[];
}

const HOLD = 4200;
// Phone screens glide on with no end; a turn of theirs lasts this long
const GLIDE_TURN = 10000;

// How long one play-through of a thumbnail lasts (ms)
export const playLength = ({ kind, screens }: Motion) => (kind === "browser" ? screens.length * HOLD : GLIDE_TURN);

/*
 * A thumbnail in motion, like a screen recording. Each screen fills the
 * thumbnail and drifts (a long page scrolls, a wide one pans) before the next
 * slides in; phone screens glide past in a loop. It holds still when paused,
 * and for anyone who prefers less motion.
 */
export const MotionThumb = ({ motion: { kind, screens }, paused }: { motion: Motion; paused: boolean }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (kind !== "browser" || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let interval = 0;
        const start = window.setTimeout(() => {
            setActive((current) => (current + 1) % screens.length);
            interval = window.setInterval(() => setActive((current) => (current + 1) % screens.length), HOLD);
        }, HOLD);
        return () => {
            window.clearTimeout(start);
            window.clearInterval(interval);
        };
    }, [kind, paused, screens.length]);

    const style = { "--hold": `${HOLD}ms` } as CSSProperties;

    if (kind === "phone") {
        return (
            <span className="motion motion--phone" style={style} data-paused={paused || undefined} aria-hidden="true">
                {/* The screens twice over, so the loop never shows a gap */}
                <span className="motion__track">
                    {[...screens, ...screens].map((screen, i) => (
                        <Image key={i} src={screen} alt="" className="motion__phone" sizes="90px" />
                    ))}
                </span>
            </span>
        );
    }

    return (
        <span className="motion motion--screens" style={style} data-paused={paused || undefined} aria-hidden="true">
            {screens.map((screen, i) => (
                <Image key={i} src={screen} alt="" className="motion__screen" data-active={i === active} sizes="360px" />
            ))}
        </span>
    );
};
