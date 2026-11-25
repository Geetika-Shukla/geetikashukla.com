"use client";

// EXTERNAL DEPS ===============================================================
import React, { useRef } from "react";

/*
 * The keynote itself, playing in a 16:9 frame: the deck's own arrow keys move
 * through the slides, and it can go fullscreen. `credit`, who it was made
 * with, sits beside the fullscreen button.
 */
export const DeckPlayer = ({ src, title, credit }: { src: string; title: string; credit?: string }) => {
    const frameRef = useRef<HTMLDivElement>(null);

    const fullscreen = () => {
        frameRef.current?.requestFullscreen?.().catch(() => {
            // Fullscreen refused (or unsupported): open the deck on its own instead
            window.open(src, "_blank", "noopener");
        });
    };

    return (
        <figure className="deck-player">
            <div ref={frameRef} className="deck-player__frame">
                <iframe src={src} title={title} loading="lazy" allow="fullscreen" allowFullScreen />
            </div>
            <figcaption className="deck-player__controls">
                {credit && <span className="ai-credit">{credit}</span>}
                <button type="button" className="deck-player__button" onClick={fullscreen}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
                    View fullscreen
                </button>
            </figcaption>
        </figure>
    );
};
