"use client";

// EXTERNAL DEPS ===============================================================
import React, { useRef } from "react";

/*
 * The keynote itself, playing in a 16:9 frame: the deck's own arrow keys move
 * through the slides, and it can go fullscreen or open in a tab of its own.
 */
export const KeynotePreview = ({ src, title }: { src: string; title: string }) => {
    const frameRef = useRef<HTMLDivElement>(null);

    const fullscreen = () => {
        frameRef.current?.requestFullscreen?.().catch(() => {
            // Fullscreen refused (or unsupported): open the deck on its own instead
            window.open(src, "_blank", "noopener");
        });
    };

    return (
        <figure className="keynote__preview">
            <div ref={frameRef} className="keynote__frame">
                <iframe src={src} title={title} loading="lazy" allow="fullscreen" allowFullScreen />
            </div>
            <figcaption className="keynote__controls">
                <span className="keynote__hint">Click into the deck, then use ← → to move through the slides.</span>
                <button type="button" className="keynote__button" onClick={fullscreen}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
                    View fullscreen
                </button>
                <a className="keynote__link" href={src} target="_blank" rel="noopener noreferrer">
                    Open in a new tab <span aria-hidden="true">↗</span>
                </a>
            </figcaption>
        </figure>
    );
};
