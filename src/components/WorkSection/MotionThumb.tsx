"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// STYLES ======================================================================
import "./motion-thumb.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";

// Screens filling the thumbnail one after another, phone screens gliding past,
// or a clip playing in place (an MP4 in public/, `length` long, its still
// shown until it plays)
export type Motion =
    | { kind: "browser" | "phone"; screens: StaticImageData[] }
    | { kind: "clip"; clip: string; poster: StaticImageData; length: number };

const HOLD = 4200;
// Phone screens glide on with no end; a turn of theirs lasts this long
const GLIDE_TURN = 10000;

// How long one play-through of a thumbnail lasts (ms)
export const playLength = (motion: Motion) =>
    motion.kind === "clip" ? motion.length : motion.kind === "browser" ? motion.screens.length * HOLD : GLIDE_TURN;

// A clip filling the thumbnail, playing from its start on its turn and holding
// still otherwise; with less motion asked for, just its still
const ClipThumb = ({ clip, poster, paused }: { clip: string; poster: StaticImageData; paused: boolean }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
        else video.play().catch(() => { /* not allowed to play: its still stays */ });
    }, [paused]);

    return (
        <span className="motion" aria-hidden="true">
            <video ref={ref} className="motion__clip" src={clip} poster={poster.src} muted playsInline preload="metadata" />
        </span>
    );
};

/*
 * A thumbnail in motion, like a screen recording. Each screen fills the
 * thumbnail and drifts (a long page scrolls, a wide one pans) before the next
 * slides in; phone screens glide past in a loop; a clip plays in place. It
 * holds still when paused, and for anyone who prefers less motion.
 */
export const MotionThumb = ({ motion, paused }: { motion: Motion; paused: boolean }) =>
    motion.kind === "clip"
        ? <ClipThumb clip={motion.clip} poster={motion.poster} paused={paused} />
        : <ScreensThumb kind={motion.kind} screens={motion.screens} paused={paused} />;

const ScreensThumb = ({ kind, screens, paused }: { kind: "browser" | "phone"; screens: StaticImageData[]; paused: boolean }) => {
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
