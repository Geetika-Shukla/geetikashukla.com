// The journal's spreads, each a left and a right page: hello (a polaroid, and
// the path so far), the route across both pages (each place, and the switch it
// was), then the ways of working across both pages, with a link to the résumé

// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from "next/image";

// DATA ========================================================================
import { EDUCATION, PATH, PRACTICE, RESUME_URL, ROLES } from "@/data/about";


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
    </>
);

// THE ROUTE ===================================================================
interface Stop {
    years : string;
    title : string;
    place : string;
    shift : string;
    Logo  : ComponentType<SVGProps<SVGSVGElement>>;
    // Where it sits on the spread (% across both pages, % down), and whether its words sit above or below
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

// The route so far, oldest first, zigzagging up from bottom left to top right
// (words below the low stops, above the high ones, so the line never crosses
// them), each with a line on the switch it was
const STOPS: Stop[] = [
    { ...fromDegree(foa), Logo: FOALogo, at: [11, 68], text: "below",
        shift: "Started with how spaces feel" },
    { ...fromDegree(nid), Logo: NIDLogo, at: [25, 44], text: "above",
        shift: "Switched to retail design" },
    { ...fromRole(nonesuch), Logo: NSLogo, at: [41, 64], text: "below",
        shift: "Freelanced into brand" },
    { ...fromRole(ather), Logo: AtherLogo, at: [56, 40], text: "above",
        shift: "Built an exhibition system" },
    { ...fromRole(setu), Logo: SetuLogo, at: [75, 60], text: "below",
        shift: "Moved into product and systems" },
    { ...fromRole(rbih), Logo: RBIHLogo, at: [88, 38], text: "above",
        shift: "Leading design, brand to product" },
];

// The round badge logos (51 × 51) lose their viewBox in the SVG build; giving it
// back lets them scale to their sticker. RBIH's wordmark keeps its own.
const logoProps = (Logo: Stop["Logo"]): SVGProps<SVGSVGElement> =>
    Logo === RBIHLogo ? {} : { viewBox: "0 0 51 51" };

// The line through the stops, with detours: a smooth curve (Catmull-Rom)
// through each stop, gently arched between them, and a loop-the-loop on two of
// the stretches. The drawing is 1.6 times wider than tall, so a loop's
// horizontal radius is squashed to match and it comes out round.
const LOOPS = new Set([2, 4]);
const LOOP: [number, number] = [2.8, 4.5];

const LINE = (() => {
    const points: [number, number][] = [[1, 80]];
    STOPS.forEach(({ at }, i) => {
        if (i > 0) {
            const [px, py] = STOPS[i - 1].at;
            const [mx, my] = [(px + at[0]) / 2, (py + at[1]) / 2];
            if (LOOPS.has(i)) {
                // Round a loop above the line, then on
                const [rx, ry] = LOOP;
                points.push([mx - rx, my], [mx + rx, my - ry], [mx, my - ry * 2], [mx - rx, my - ry], [mx + rx * 0.6, my + 0.5]);
            } else {
                // A gentle arch
                points.push([mx, my + (at[1] < py ? 4 : -4)]);
            }
        }
        points.push(at);
    });
    points.push([99, 26]);

    const f = (n: number) => n.toFixed(2);
    let d = `M${f(points[0][0])} ${f(points[0][1])}`;
    for (let i = 0; i < points.length - 1; i++) {
        const [x0, y0] = points[Math.max(0, i - 1)];
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        const [x3, y3] = points[Math.min(points.length - 1, i + 2)];
        d += ` C${f(x1 + (x2 - x0) / 6)} ${f(y1 + (y2 - y0) / 6)}, ${f(x2 - (x3 - x1) / 6)} ${f(y2 - (y3 - y1) / 6)}, ${f(x2)} ${f(y2)}`;
    }
    return d;
})();

// The route across the whole spread: drawn once, wider than a page, and shown
// in each page's half (the right half is a copy, so hidden from screen readers)
const Route = ({ half }: { half: "left" | "right" }) => (
    <div className="journal__wide" data-half={half} aria-hidden={half === "right" || undefined}>
        <h3 className="journal__label">The route so far</h3>

        <svg className="journal__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={LINE} />
        </svg>

        <ol className="journal__stops">
            {STOPS.map(({ years, title, place, shift, Logo, at: [x, y], text }, i) => (
                <li
                    key={place}
                    className="journal__stop"
                    data-text={text}
                    // The end stops' words run inwards, so they stay on the page
                    data-align={i === 0 ? "start" : i === STOPS.length - 1 ? "end" : undefined}
                    style={{ left: `${x}%`, top: `${y}%` }}
                >
                    <span className="journal__badge" aria-hidden="true"><Logo {...logoProps(Logo)} /></span>
                    <span className="journal__stop-text">
                        <span className="journal__years journal__hand">{years}</span>
                        <strong>{title}</strong>
                        <span className="journal__place">{place}</span>
                        <span className="journal__shift journal__hand">{shift}</span>
                    </span>
                </li>
            ))}
        </ol>
    </div>
);

// The ways of working as sticky notes across the spread, two to a page, all
// the same size; the right page also holds the link to the résumé
const Practice = ({ half }: { half: "left" | "right" }) => {
    const shown = half === "left" ? PRACTICE.slice(0, 2) : PRACTICE.slice(2);

    return (
        <>
            {/* The right page keeps the heading's room (unseen), so the notes line up across */}
            <h3 className="journal__label" aria-hidden={half === "right" || undefined} data-spacer={half === "right" || undefined}>In practice</h3>
            <ul className="journal__notes">
                {shown.map(({ title, text }) => (
                    <li key={title} className="journal__note">
                        <span className="journal__tape" aria-hidden="true" />
                        <strong>{title}</strong>
                        <span>{text}</span>
                    </li>
                ))}
            </ul>
            {half === "right" && (
                <a className="journal__download" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                    Download résumé <span aria-hidden="true">↓</span>
                </a>
            )}
        </>
    );
};

export const SPREADS: Spread[] = [
    { name: "Hello", left: <Hello />, right: <Path /> },
    { name: "The route so far", left: <Route half="left" />, right: <Route half="right" /> },
    { name: "In practice", left: <Practice half="left" />, right: <Practice half="right" /> },
];
