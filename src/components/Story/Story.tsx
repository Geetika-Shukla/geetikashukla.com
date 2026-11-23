// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from "next/image";

// DATA ========================================================================
import { EDUCATION, PATH, PRACTICE, RESUME_URL, ROLES } from "@/data/about";
import { CONTRIBUTIONS } from "@/data/github";

// STYLES ======================================================================
import "./story.css";

// INTERNAL DEPS ===============================================================
import { PixelHeart } from "@/components/Hero/Illustrations";
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
import type { Degree, Role } from "@/data/about";

// THE ROUTE ===================================================================
interface Stop {
    years : string;
    title : string;
    place : string;
    shift : string;
    Logo  : ComponentType<SVGProps<SVGSVGElement>>;
    // Where it sits (% across, % down), and whether its words sit above or below
    at    : [number, number];
    text  : "above" | "below";
}

// "M.Des. (2017–19)" → the degree and its years
const fromDegree = ({ degree, school }: Degree): Pick<Stop, "years" | "title" | "place"> => {
    const [, title = degree, years = ""] = degree.match(/^(.*?)\s*\((.*)\)$/) ?? [];
    return { years, title, place: school.split(",")[0] };
};

const fromRole = ({ title, company, dates }: Role): Pick<Stop, "years" | "title" | "place"> =>
    ({ years: dates, title, place: company });

const [nid, foa] = EDUCATION;
const [rbih, setu, ather, nonesuch] = ROLES;

// The route so far, oldest first, up a road of hairpin bends from bottom left
// to top right: two stops on each run (left to right, back, then left to right
// again), their words below them, with room before the next run up
const STOPS: Stop[] = [
    { ...fromDegree(foa), Logo: FOALogo, at: [14, 78], text: "below",
        shift: "Started with how spaces feel" },
    { ...fromDegree(nid), Logo: NIDLogo, at: [62, 78], text: "below",
        shift: "Switched to retail design" },
    { ...fromRole(nonesuch), Logo: NSLogo, at: [80, 45], text: "below",
        shift: "Freelanced into brand" },
    { ...fromRole(ather), Logo: AtherLogo, at: [38, 45], text: "below",
        shift: "Built an exhibition system" },
    { ...fromRole(setu), Logo: SetuLogo, at: [26, 12], text: "below",
        shift: "Moved into product and systems" },
    { ...fromRole(rbih), Logo: RBIHLogo, at: [84, 12], text: "below",
        shift: "Leading design, brand to product" },
];

// The round badge logos (51 × 51) lose their viewBox in the SVG build; giving it
// back lets them scale to their sticker. RBIH's wordmark keeps its own.
const logoProps = (Logo: Stop["Logo"]): SVGProps<SVGSVGElement> =>
    Logo === RBIHLogo ? {} : { viewBox: "0 0 51 51" };

// The road: three runs across, joined by hairpin bends
const LINE = "M3 78 H95 C100 78, 100 45, 95 45 H6 C1 45, 1 12, 6 12 H95";

// CONTRIBUTIONS ===============================================================
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Contributions = () => {
    const { total, period, days } = CONTRIBUTIONS;
    // Pad the first week so each column runs Sunday to Saturday
    const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const weeks = Math.ceil((offset + days.length) / 7);
    // A month's name over the first week that starts in it
    const labels = Array.from({ length: weeks }, (_, week) => {
        const day = days[Math.max(0, week * 7 - offset)];
        const date = new Date(`${day.date}T00:00:00Z`);
        return week > 0 && date.getUTCDate() <= 7 ? MONTHS[date.getUTCMonth()] : null;
    });

    return (
        <>
            <div className="story__card-head">
                <h3 className="story__label">On GitHub</h3>
                <span className="story__count">{total} contributions {period}</span>
            </div>
            <div className="story__months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }} aria-hidden="true">
                {labels.map((label, week) => label && (
                    <span key={week} style={{ gridColumn: `${week + 1} / span 4` }}>{label}</span>
                ))}
            </div>
            <div className="story__days" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }} aria-hidden="true">
                {Array.from({ length: offset }, (_, i) => <span key={`pad-${i}`} />)}
                {days.map(({ date, level }) => <span key={date} data-level={level} />)}
            </div>
        </>
    );
};

/*
 * The story so far, a little unserious, on a dot grid, in two columns: on the
 * left, staying in view, the heading, a photo taped on, the résumé and a year
 * on GitHub; on the right, scrolling past it, the path so far (each step with
 * the question it asked), the route (each place, and the switch it was) and
 * the ways of working, as sticky notes. A few stickers are stuck about. Things
 * sit straight on the dots, no boxes; blocks are still whole grid blocks.
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

                <figure className="story__card story__photo" data-snap>
                    <span className="story__tape story__tape--left" aria-hidden="true" />
                    <span className="story__tape story__tape--right" aria-hidden="true" />
                    <Image src={portrait} alt="Geetika, smiling, on a staircase with a carved wooden banister" sizes="360px" />
                    <span className="story__sticker story__sticker--heart" aria-hidden="true"><PixelHeart /></span>
                    <figcaption>
                        <span className="story__hand">currently</span>
                        Manager — Design, Reserve Bank Innovation Hub
                    </figcaption>
                </figure>

                <a className="story__card story__resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                    Download résumé <span aria-hidden="true">↓</span>
                </a>

                {/* A year on GitHub, small, in the corner */}
                <div className="story__card story__github" data-snap>
                    <Contributions />
                </div>
            </div>

            {/* RIGHT: scrolls past */}
            <div className="story__main">
                {/* Always a student: the path, each step with the question it asked */}
                <div className="story__card story__about" data-snap>
                    <span className="story__sticker story__sticker--claude" aria-hidden="true"><ClaudeSpark /></span>
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

                {/* The route */}
                <div className="story__card story__route-card" data-snap>
                    <h3 className="story__label">The route so far</h3>
                    <span className="story__sticker story__sticker--figma" aria-hidden="true"><FigmaMark /></span>
                    <div className="story__route">
                        <svg className="story__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <path d={LINE} />
                        </svg>
                        <ol className="story__stops">
                            {STOPS.map(({ years, title, place, shift, Logo, at: [x, y], text }, i) => (
                                <li
                                    key={place}
                                    className="story__stop"
                                    data-text={text}
                                    // The end stops' words run inwards, so they stay in the card
                                    data-align={i === 0 ? "start" : i === STOPS.length - 1 ? "end" : undefined}
                                    style={{ left: `${x}%`, top: `${y}%` }}
                                >
                                    <span className="story__badge" aria-hidden="true"><Logo {...logoProps(Logo)} /></span>
                                    <span className="story__stop-text">
                                        <span className="story__years story__hand">{years}</span>
                                        <strong>{title}</strong>
                                        <span className="story__place">{place}</span>
                                        <span className="story__shift story__hand">{shift}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* The ways of working, as sticky notes two by two */}
                {PRACTICE.map(({ title, text }, i) => (
                    <div key={title} className="story__card story__practice" data-snap>
                        <span className="story__tape" aria-hidden="true" />
                        <span className="story__number story__hand">{i + 1}</span>
                        <h3 className="story__practice-title">{title}</h3>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
