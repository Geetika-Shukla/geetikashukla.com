"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef } from "react";

// STYLES ======================================================================
import "./deck-dialog.css";

/*
 * A deck, playing in a window over the page: its own arrow keys move through
 * the slides, it can go fullscreen, and Esc, the close button or a click
 * outside it closes it. `deck` is the deck's address (null when closed).
 */
export const DeckDialog = ({ deck, title, onClose }: { deck: string | null; title: string; onClose: () => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    // Open it as a modal when there's a deck to show; close it when not
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (deck && !dialog.open) dialog.showModal();
        if (!deck && dialog.open) dialog.close();
    }, [deck]);

    const fullscreen = () => {
        frameRef.current?.requestFullscreen?.().catch(() => {
            // Fullscreen refused (or unsupported): open the deck on its own instead
            if (deck) window.open(deck, "_blank", "noopener");
        });
    };

    return (
        <dialog
            ref={dialogRef}
            className="deck"
            aria-label={title}
            onClose={onClose}
            // A click on the backdrop (the dialog itself, outside its contents) closes it
            onClick={(event) => {
                if (event.target === dialogRef.current) onClose();
            }}
        >
            <div className="deck__bar">
                <span className="deck__title">{title}</span>
                <button type="button" className="deck__button" onClick={fullscreen}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
                    Fullscreen
                </button>
                <button type="button" className="deck__close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
            </div>
            <div ref={frameRef} className="deck__frame">
                {deck && <iframe src={deck} title={title} allow="fullscreen" allowFullScreen />}
            </div>
        </dialog>
    );
};
