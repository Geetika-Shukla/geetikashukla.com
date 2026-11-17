// The journal's spreads, each a left and a right page: hello (a polaroid, and
// the path so far), then the route (the places, as sticky notes) and the ways
// of working with the résumé

// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from "next/image";

// DATA ========================================================================
import { EDUCATION, PATH, PRACTICE, RESUME_URL, ROLES } from "@/data/about";

// INTERNAL DEPS ===============================================================
import { PixelHeart } from "@/components/Hero/Illustrations";

// ASSETS ======================================================================
import portrait from "@/assets/images/me-portrait.jpg";
import FOALogo from "@/assets/images/foa-logo.svg";
import NIDLogo from "@/assets/images/nid-logo.svg";
import NSLogo from "@/assets/images/ns-logo.svg";
import AtherLogo from "@/assets/images/ather-logo.svg";
import SetuLogo from "@/assets/images/setu-logo.svg";
import RBIHLogo from "@/assets/images/rbih-logo.svg";

// TYPES =======================================================================
import type { ComponentType, ReactNode, SVGProps } from "react";
import type { Degree, Role } from "@/data/about";

export interface Spread {
    name  : string;
    left  : ReactNode;
    right : ReactNode;
}

// HELLO =======================================================================
// A polaroid taped to the page, with a handwritten caption
const Hello = () => (
    <>
        <h3 className="journal__label">Hello</h3>
        <figure className="journal__polaroid">
            <span className="journal__tape" aria-hidden="true" />
            <Image src={portrait} alt="Geetika, smiling, on a staircase with a carved wooden banister" sizes="240px" />
            <figcaption>Nice to meet you!</figcaption>
            <span className="journal__polaroid-heart" aria-hidden="true"><PixelHeart /></span>
        </figure>
        <p className="journal__now">
            <span className="journal__hand">currently</span>
            Manager — Design, Reserve Bank Innovation Hub
        </p>
    </>
);

// Always a student: each step on the path, with the question it asked, joined
// by hand-drawn arrows
const Path = () => (
    <>
        <h3 className="journal__label">About me</h3>
        <p className="journal__big">
            Always a <span className="journal__circled">student<svg viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true"><path d="M8 24 C 6 8, 60 2, 104 10 C 122 14, 118 36, 70 40 C 30 43, 4 36, 12 18" /></svg></span>.
            <span className="journal__aside journal__hand">a philomath, technically</span>
        </p>
        <p className="journal__intro">Seven years of learning by doing. Each move started with a new question.</p>

        <ol className="journal__path-steps">
            {PATH.map(({ step, question }) => (
                <li key={step}>
                    <strong>{step}</strong>
                    {question && <span className="journal__hand">{question}</span>}
                </li>
            ))}
        </ol>

        <p className="journal__proof">
            Need proof? <a href="#work">See the work <span aria-hidden="true">↑</span></a>
        </p>
    </>
);

// THE ROUTE ===================================================================
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

// Sticky notes taped down, each with its place's logo as a sticker, joined by a hand-drawn line
const Route = () => (
    <>
        <h3 className="journal__label">The route so far</h3>

        <div className="journal__route">
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
    </>
);

// The ways of working as notes, and the résumé as a ticket
const Practice = () => (
    <>
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
    </>
);

export const SPREADS: Spread[] = [
    { name: "Hello", left: <Hello />, right: <Path /> },
    { name: "The route so far", left: <Route />, right: <Practice /> },
];
