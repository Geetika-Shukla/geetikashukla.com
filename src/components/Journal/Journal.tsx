"use client";

// EXTERNAL DEPS ===============================================================
import React, { useState } from "react";
import { Caveat } from "next/font/google";

// INTERNAL DEPS ===============================================================
import { InkBottle, PixelHeart, Spool } from "@/components/Hero/Illustrations";
import { ClaudeSpark, ContributionStrip, FigmaMark } from "./CoverPieces";
import { SPREADS } from "./Spreads";

// STYLES ======================================================================
import "./journal.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Contributions } from "@/data/github";

// Handwriting, for the notes in the margins
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand" });

// The cover, then each spread
const CLOSED = -1;

/*
 * Journal: a closed notebook, its title in white on the cover, stuck with
 * stickers and a torn strip of GitHub contributions.
 * The cover swings open on its left edge; its inside becomes the left page of
 * each spread, and the right page sits underneath. Arrows and dots turn from
 * the cover through the spreads.
 */
export const Journal = ({ contributions }: { contributions: Contributions | null }) => {
    const [page, setPage] = useState(CLOSED);
    const open = page !== CLOSED;
    const last = SPREADS.length - 1;

    return (
        <section id="journal" className={`journal ${hand.variable}`} aria-labelledby="journal-title">
            <h2 id="journal-title" className="journal__heading">The story so far</h2>
            <p className="journal__lede">{open ? "Detours, drafts, and dots that eventually connect." : "Open the journal."}</p>

            <div className="journal__stage">
                {open && (
                    <button type="button" className="journal__turn journal__turn--back" onClick={() => setPage(page - 1)} aria-label={page === 0 ? "Close the journal" : "Previous page"}>
                        <svg viewBox="0 0 48 24" aria-hidden="true"><path d="M46 13 C 34 10, 18 14, 3 12 M11 4 C 8 7, 5 10, 3 12 C 6 14, 9 17, 12 20" /></svg>
                    </button>
                )}

                <div className="journal__book" data-open={open}>
                    {/* Right pages, under the cover */}
                    <div className="journal__page journal__page--right">
                        {SPREADS.map(({ name, right }, i) => (
                            <div key={name} className="journal__leaf" data-active={i === page} style={{ "--order": i * 2 + 1 } as CSSProperties}>
                                {right}
                            </div>
                        ))}
                    </div>

                    {/* The cover: its front is the notebook; its back, once open, is the left page */}
                    <div className="journal__cover">
                        <button
                            type="button"
                            className="journal__face journal__face--front"
                            onClick={() => setPage(0)}
                            aria-expanded={open}
                            aria-label="Open the journal"
                            tabIndex={open ? -1 : 0}
                        >
                            <span className="journal__strap" aria-hidden="true" />
                            <span className="journal__engraved">
                                <span className="journal__engraved-title">The journey<br />so far</span>
                                <span className="journal__engraved-name">Geetika Shukla</span>
                            </span>
                            <span className="journal__stickers" aria-hidden="true">
                                <span className="journal__sticker journal__sticker--claude"><ClaudeSpark /></span>
                                <span className="journal__sticker journal__sticker--figma"><FigmaMark /></span>
                                <span className="journal__sticker journal__sticker--heart"><PixelHeart /></span>
                                <span className="journal__sticker journal__sticker--ink"><InkBottle /></span>
                                <span className="journal__sticker journal__sticker--spool"><Spool /></span>
                            </span>
                            {contributions && contributions.days.length > 0 && (
                                <span className="journal__contrib" aria-hidden="true">
                                    <span className="journal__tape journal__tape--left" />
                                    <ContributionStrip {...contributions} />
                                    <span className="journal__tape journal__tape--right" />
                                </span>
                            )}
                            <span className="journal__hint">Open</span>
                        </button>

                        <div className="journal__face journal__face--back journal__page">
                            {SPREADS.map(({ name, left }, i) => (
                                <div key={name} className="journal__leaf" data-active={i === page} style={{ "--order": i * 2 } as CSSProperties}>
                                    {left}
                                </div>
                            ))}
                        </div>
                    </div>

                    <span className="journal__ribbon" aria-hidden="true" />
                </div>

                {page < last && (
                    <button type="button" className="journal__turn journal__turn--next" onClick={() => setPage(page + 1)} aria-label={open ? "Next page" : "Open the journal"}>
                        <svg viewBox="0 0 48 24" aria-hidden="true"><path d="M2 13 C 14 10, 30 14, 45 12 M37 4 C 40 7, 43 10, 45 12 C 42 14, 39 17, 36 20" /></svg>
                    </button>
                )}
            </div>

            {/* Where you are: the cover, then each spread */}
            <ol className="journal__dots">
                {[{ name: "Cover" }, ...SPREADS].map(({ name }, i) => (
                    <li key={name}>
                        <button type="button" aria-label={name} aria-current={i - 1 === page ? "page" : undefined} onClick={() => setPage(i - 1)} />
                    </li>
                ))}
            </ol>
        </section>
    );
};
