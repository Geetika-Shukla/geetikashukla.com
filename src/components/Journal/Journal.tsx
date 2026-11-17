"use client";

// EXTERNAL DEPS ===============================================================
import React, { useState } from "react";

// DATA ========================================================================
import { EDUCATION, PRACTICE, RESUME_URL, ROLES } from "@/data/about";

// INTERNAL DEPS ===============================================================
import { InkBottle, PixelHeart, Spool } from "@/components/Hero/Illustrations";

// STYLES ======================================================================
import "./journal.css";

/*
 * Journal: a closed notebook that opens into a spread. The cover swings open
 * on its left edge; its inside becomes the left page (the work so far), and
 * the right page underneath holds education, ways of working and the résumé.
 */
export const Journal = () => {
    const [open, setOpen] = useState(false);

    return (
        <section id="journal" className="journal" aria-labelledby="journal-title">
            <h2 id="journal-title" className="journal__heading">The story so far</h2>
            <p className="journal__lede">{open ? "Detours, drafts, and dots that eventually connect." : "Open the journal."}</p>

            <div className="journal__book" data-open={open}>
                {/* Right page, under the cover */}
                <div className="journal__page journal__page--right">
                    <h3 className="journal__label">Education</h3>
                    <ul className="journal__list">
                        {EDUCATION.map(({ degree, field, school }) => (
                            <li key={degree}>
                                <strong>{degree}</strong> {field}
                                <span className="journal__muted">{school}</span>
                            </li>
                        ))}
                    </ul>

                    <h3 className="journal__label">In practice</h3>
                    <ul className="journal__list">
                        {PRACTICE.map(({ title, text }) => (
                            <li key={title}>
                                <strong>{title}.</strong> <span className="journal__muted journal__muted--inline">{text}</span>
                            </li>
                        ))}
                    </ul>

                    <a className="journal__resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                        Download résumé
                    </a>
                </div>

                {/* The cover: its front is the notebook; its back, once open, is the left page */}
                <div className="journal__cover">
                    <button
                        type="button"
                        className="journal__face journal__face--front"
                        onClick={() => setOpen(true)}
                        aria-expanded={open}
                        aria-label="Open the journal"
                        tabIndex={open ? -1 : 0}
                    >
                        <span className="journal__strap" aria-hidden="true" />
                        <span className="journal__plate">
                            <span className="journal__plate-title">Notes on a practice</span>
                            <span className="journal__plate-name">Geetika Shukla</span>
                        </span>
                        <span className="journal__stickers" aria-hidden="true">
                            <span className="journal__sticker journal__sticker--heart"><PixelHeart /></span>
                            <span className="journal__sticker journal__sticker--ink"><InkBottle /></span>
                            <span className="journal__sticker journal__sticker--spool"><Spool /></span>
                        </span>
                        <span className="journal__hint">Open</span>
                    </button>

                    <div className="journal__face journal__face--back journal__page" aria-hidden={!open}>
                        <h3 className="journal__label">Work</h3>
                        <ol className="journal__timeline">
                            {ROLES.map(({ title, company, dates, notes }) => (
                                <li key={company}>
                                    <span className="journal__dates">{dates}</span>
                                    <strong>{title}</strong>, {company}
                                    <span className="journal__muted">{notes[0]}</span>
                                </li>
                            ))}
                        </ol>
                        <button type="button" className="journal__close" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                            Close the journal
                        </button>
                    </div>
                </div>

                <span className="journal__ribbon" aria-hidden="true" />
            </div>
        </section>
    );
};
