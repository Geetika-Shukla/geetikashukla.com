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

/*
 * A thumbnail in motion, like a screen recording. Each screen fills the
 * thumbnail and drifts (a long page scrolls, a wide one pans) before the next
 * slides in; phone screens glide past in a loop. It holds still when paused,
 * and for anyone who prefers less motion. `offset` staggers the start, so a
 * set of them doesn't move in step.
 */
export const MotionThumb = ({ motion: { kind, screens }, paused, offset = 0 }: { motion: Motion; paused: boolean; offset?: number }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (kind !== "browser" || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let interval = 0;
        const start = window.setTimeout(() => {
            setActive((current) => (current + 1) % screens.length);
            interval = window.setInterval(() => setActive((current) => (current + 1) % screens.length), HOLD);
        }, HOLD + offset);
        return () => {
            window.clearTimeout(start);
            window.clearInterval(interval);
        };
    }, [kind, paused, offset, screens.length]);

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
