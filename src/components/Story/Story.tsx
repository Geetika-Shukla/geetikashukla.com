// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from "next/image";

// DATA ========================================================================
import { EDUCATION, PATH, RESUME_URL, ROLES } from "@/data/about";

// STYLES ======================================================================
import "./story.css";

// INTERNAL DEPS ===============================================================
import { ClaudeSpark, FigmaMark, StickerEdge } from "./Stickers";

// ASSETS ======================================================================
import portrait from "@/assets/images/me-portrait.jpg";
import FOALogo from "@/assets/images/foa-logo.svg";
import NIDLogo from "@/assets/images/nid-logo.svg";
import NSLogo from "@/assets/images/ns-logo.svg";
import AtherLogo from "@/assets/images/ather-logo.svg";
import SetuLogo from "@/assets/images/setu-logo.svg";
import RBIHLogo from "@/assets/images/rbih-logo.svg";

// TYPES =======================================================================
import type { ComponentType, SVGProps } from "react";

// LOGOS =======================================================================
// The round badge logos (51 × 51) lose their viewBox in the SVG build; giving it
// back lets them scale. RBIH's wordmark keeps its own.
type Logo = ComponentType<SVGProps<SVGSVGElement>>;
const logoProps = (Logo: Logo): SVGProps<SVGSVGElement> =>
    Logo === RBIHLogo ? {} : { viewBox: "0 0 51 51" };

// In the order they're listed in about.ts
const COLLEGE_LOGOS: Logo[] = [NIDLogo, FOALogo];
const WORK_LOGOS: Logo[] = [RBIHLogo, SetuLogo, AtherLogo, NSLogo];

/*
 * The story so far, a little unserious, on a dot grid, in two columns, after
 * the original About page: on the left, staying in view, the heading, a small
 * photo taped on, education and the résumé; on the right, scrolling past it,
 * the path so far (each step with the question it asked) and work experience
 * as a line from now back. A few stickers are stuck about. Blocks are whole grid blocks.
 */
export const Story = () => (
    <section id="journal" className="story" aria-labelledby="story-title" data-snap>
        <StickerEdge />
        <div className="story__grid">
            {/* LEFT: stays in view */}
            <div className="story__side">
                <header className="story__header">
                    <h2 id="story-title" className="story__title">The story so far</h2>
                    <p className="story__lede">Detours, drafts, and dots that eventually connect.</p>
                </header>

                <figure className="story__photo">
                    <span className="story__tape story__tape--left" aria-hidden="true" />
                    <Image src={portrait} alt="Geetika, smiling, on a staircase with a carved wooden banister" sizes="200px" />
                </figure>

                <div className="story__education">
                    <h3 className="story__label">Education</h3>
                    <ul className="story__colleges">
                        {EDUCATION.map(({ degree, field, school }, i) => {
                            const Logo = COLLEGE_LOGOS[i];
                            return (
                                <li key={degree}>
                                    {Logo && <span className="story__logo" aria-hidden="true"><Logo {...logoProps(Logo)} /></span>}
                                    <span>
                                        <strong>{degree}</strong>
                                        <span>{field}</span>
                                        <span className="story__muted">{school}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <a className="story__resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                    Download résumé
                </a>
            </div>

            {/* RIGHT: scrolls past */}
            <div className="story__main">
                {/* Always a student: the path, each step with the question it asked, in a box with stickers on its edge */}
                <div className="story__about" data-snap>
                    <span className="story__sticker story__sticker--claude" aria-hidden="true"><ClaudeSpark /></span>
                    <span className="story__sticker story__sticker--figma" aria-hidden="true"><FigmaMark /></span>
                    <h3 className="story__label">About me</h3>
                    <p className="story__big">
                        Always a <span className="story__circled">student<svg viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true"><path d="M8 24 C 6 8, 60 2, 104 10 C 122 14, 118 36, 70 40 C 30 43, 4 36, 12 18" /></svg></span>.
                        <span className="story__aside story__hand">a philomath, technically</span>
                    </p>
                    <p className="story__intro">Seven years of learning by doing. Each move started with a new question.</p>
                    <ol className="story__path">
                        {PATH.map(({ step, question }) => (
                            <li key={step}>
                                <strong>{step}</strong>
                                {question && <span className="story__hand">{question}</span>}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Work experience: a line from now back, a logo on it for each role */}
                <div className="story__work" data-snap>
                    <h3 className="story__label">Work experience</h3>
                    <ol className="story__timeline">
                        {ROLES.map(({ title, company, dates, notes }, i) => {
                            const Logo = WORK_LOGOS[i];
                            return (
                                <li key={company}>
                                    {Logo && <span className="story__logo" aria-hidden="true"><Logo {...logoProps(Logo)} /></span>}
                                    <strong>{title}</strong>
                                    <span className="story__muted">{company} · {dates}</span>
                                    {/* The main line about it */}
                                    <p>{notes[0]}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    </section>
);
