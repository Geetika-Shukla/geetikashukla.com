// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import { KeynotePreview } from "./KeynotePreview";

// STYLES ======================================================================
import "./page-keynote.css";

// TYPES =======================================================================
import type { Metadata } from "next";

export const metadata: Metadata = {
    title       : "The invisible future of finance — Geetika Shukla",
    description : "A keynote deck for Reserve Bank Innovation Hub at Global Fintech Fest 2026.",
};

const DECK = "/keynotes/gff-2026.html";

// PLACEHOLDERS: swap in the two photos from GFF (and what each shows)
const PHOTOS = ["Photo from GFF 2026", "Photo from GFF 2026"];

/*
 * The GFF 2026 keynote: a heading, then three columns: photos from the day
 * stacked in the first, the deck itself across the other two (playable here,
 * or fullscreen).
 */
export default function GffKeynotePage() {
    return (
        <article className="project-page keynote">
            <header className="keynote__header">
                <p className="keynote__eyebrow">Built using AI · Global Fintech Fest 2026</p>
                <h1 className="keynote__title">The invisible future of finance</h1>
                <p className="keynote__intro">
                    A keynote deck for Reserve Bank Innovation Hub at Global Fintech Fest 2026.
                </p>
            </header>

            <div className="keynote__layout">
                <div className="keynote__photos">
                    {PHOTOS.map((label, i) => (
                        <div key={i} className="keynote__photo" role="img" aria-label={label}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <circle cx="9" cy="10" r="1.6" />
                                <path d="m4 17 5-4 4 3 3-2 4 3" />
                            </svg>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>

                <KeynotePreview src={DECK} title="The invisible future of finance: the keynote deck" />
            </div>
        </article>
    );
}
