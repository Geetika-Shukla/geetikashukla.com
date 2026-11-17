"use client";

// EXTERNAL DEPS ===============================================================
import React, { useState } from "react";

// DATA ========================================================================
import { EDUCATION, PRACTICE, RESUME_URL, ROLES } from "@/data/about";

// INTERNAL DEPS ===============================================================
import { InkBottle, PixelHeart, Spool } from "@/components/Hero/Illustrations";

// STYLES ======================================================================
import "./journal.css";

// ASSETS ======================================================================
import FOALogo from "@/assets/images/foa-logo.svg";
import NIDLogo from "@/assets/images/nid-logo.svg";
import NSLogo from "@/assets/images/ns-logo.svg";
import AtherLogo from "@/assets/images/ather-logo.svg";
import SetuLogo from "@/assets/images/setu-logo.svg";
import RBIHLogo from "@/assets/images/rbih-logo.svg";

// TYPES =======================================================================
import type { ComponentType, SVGProps } from "react";
import type { Degree, Role } from "@/data/about";

interface Stop {
    years : string;
    title : string;
    place : string;
    Logo  : ComponentType<SVGProps<SVGSVGElement>>;
}

// "M.Des. (2017–19)" → the degree and its years
const fromDegree = ({ degree, school }: Degree, Logo: Stop["Logo"]): Stop => {
    const [, title = degree, years = ""] = degree.match(/^(.*?)\s*\((.*)\)$/) ?? [];
    return { years, title, place: school.split(",")[0], Logo };
};

const fromRole = ({ title, company, dates }: Role, Logo: Stop["Logo"]): Stop =>
    ({ years: dates, title, place: company, Logo });

const [nid, foa] = EDUCATION;
const [rbih, setu, ather, nonesuch] = ROLES;

// The route so far, oldest first
const STOPS: Stop[] = [
    fromDegree(foa, FOALogo),
    fromDegree(nid, NIDLogo),
    fromRole(nonesuch, NSLogo),
    fromRole(ather, AtherLogo),
    fromRole(setu, SetuLogo),
    fromRole(rbih, RBIHLogo),
];

// The round badge logos (51 × 51) lose their viewBox in the SVG build; giving it
// back lets them scale to their sticker. RBIH's wordmark keeps its own.
const logoProps = (Logo: Stop["Logo"]): SVGProps<SVGSVGElement> =>
    Logo === RBIHLogo ? {} : { viewBox: "0 0 51 51" };

/*
 * Journal: a closed notebook that opens into a scrapbook spread. The cover
 * swings open on its left edge; its inside becomes the left page, the route so
 * far (sticky notes taped down, each with its place's logo as a sticker, joined
 * by a hand-drawn line), and the right page underneath holds the ways of
 * working, as notes, and the résumé, as a ticket.
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
                    <h3 className="journal__label">In practice</h3>
                    <ul className="journal__notes">
                        {PRACTICE.map(({ title, text }) => (
                            <li key={title} className="journal__note">
                                <span className="journal__tape" aria-hidden="true" />
                                <strong>{title}</strong>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>

                    <a className="journal__ticket" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                        <span className="journal__tape" aria-hidden="true" />
                        Download résumé <span aria-hidden="true">↓</span>
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
                        <h3 className="journal__label">The route so far</h3>

                        <div className="journal__route">
                            {/* A hand-drawn line snaking through the stops, in order */}
                            <svg className="journal__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M24 16 C 42 8, 58 24, 76 16 C 96 22, 94 44, 76 50 C 58 56, 42 44, 24 50 C 4 56, 6 78, 24 84 C 42 90, 58 76, 74 84" />
                                <path className="journal__path-head" d="M70 80 L 76 84 L 70 88" />
                            </svg>

                            <ol className="journal__stops">
                                {STOPS.map(({ years, title, place, Logo }) => (
                                    <li key={place} className="journal__stop">
                                        <span className="journal__tape" aria-hidden="true" />
                                        <span className="journal__badge" aria-hidden="true"><Logo {...logoProps(Logo)} /></span>
                                        <span className="journal__years">{years}</span>
                                        <strong>{title}</strong>
                                        <span className="journal__place">{place}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

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
