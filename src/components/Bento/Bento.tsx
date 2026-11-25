"use client";

// EXTERNAL DEPS ===============================================================
import Image from "next/image";
import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

// STYLES ======================================================================
import "./bento.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";

/*
 * A glimpse: a still, or a clip (an MP4 in public/) with the still shown
 * until it plays. `span` is how many of the row's nine columns it takes;
 * `caption`, a line under it saying what it shows.
 */
export interface Glimpse {
    image    : StaticImageData;
    alt      : string;
    span     : number;
    clip?    : string;
    caption? : string;
    // Where the picture sits in its tile when the tile crops it (object-position)
    focus? : string;
}

// A row of glimpses, `ratio` its width over its height, so every tile in it is
// the same height and each picture fills its own
export interface BentoRow {
    ratio : number;
    items : Glimpse[];
}

// Whether the reader asks for less motion, kept current
const REDUCED = "(prefers-reduced-motion: reduce)";
const useReducedMotion = () => useSyncExternalStore(
    (onChange) => {
        const query = matchMedia(REDUCED);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    },
    () => matchMedia(REDUCED).matches,
    () => false,
);

// A clip that plays, muted and looping, only while it's on screen; with
// reduced motion it waits, with its controls, to be played. `controls` shows
// them always, for a clip worth scrubbing through.
export const Clip = ({ glimpse: { image, alt, clip, focus }, controls = false }: { glimpse: Omit<Glimpse, "span" | "caption">; controls?: boolean }) => {
    const ref = useRef<HTMLVideoElement>(null);
    const reduced = useReducedMotion();
    // The browser wouldn't play it on its own: let it be played by hand
    const [refused, setRefused] = useState(false);
    const still = reduced || refused;

    useEffect(() => {
        const video = ref.current;
        if (!video || reduced) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => setRefused(true));
            else video.pause();
        }, { threshold: 0.25 });
        observer.observe(video);
        return () => observer.disconnect();
    }, [reduced]);

    return (
        <video
            ref={ref}
            className="bento__media"
            src={clip}
            poster={image.src}
            aria-label={alt}
            style={focus ? { objectPosition: focus } : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            controls={still || controls}
        />
    );
};

/*
 * Bento: glimpses of a project in rows, after the Interests page's grid. Each
 * row is nine columns, its tiles cropping their pictures to the row's height,
 * each caption under its picture; on a phone they stack, each in its own shape.
 */
export const Bento = ({ rows }: { rows: BentoRow[] }) => (
    <div className="bento">
        {rows.map(({ ratio, items }, r) => (
            <div key={r} className="bento__row" style={{ "--ratio": ratio } as CSSProperties}>
                <div className="bento__grid">
                    {items.map((glimpse) => (
                        <figure
                            key={glimpse.alt}
                            className="bento__item"
                            style={{ "--span": glimpse.span, "--shape": glimpse.image.width / glimpse.image.height } as CSSProperties}
                        >
                            <div className="bento__tile">
                                {glimpse.clip
                                    ? <Clip glimpse={glimpse} />
                                    : (
                                        <Image
                                            className="bento__media"
                                            src={glimpse.image}
                                            alt={glimpse.alt}
                                            sizes={`(max-width: 640px) 100vw, ${Math.round((glimpse.span / 9) * 80)}vw`}
                                            style={glimpse.focus ? { objectPosition: glimpse.focus } : undefined}
                                        />
                                    )}
                            </div>
                            {glimpse.caption && <figcaption className="bento__caption">{glimpse.caption}</figcaption>}
                        </figure>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
