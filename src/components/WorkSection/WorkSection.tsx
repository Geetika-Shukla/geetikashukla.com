"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// DATA ========================================================================
import { timeline } from "@/data/projects";
import { AI_PROJECTS } from "@/data/ai-projects";

// INTERNAL DEPS ===============================================================
import { MotionThumb, playLength } from "./MotionThumb";
import Image from "next/image";

// STYLES ======================================================================
import "./work-section.css";

// ASSETS ======================================================================
// Screens from each Experience project, for its thumbnail in motion
import reportsPage from "@/assets/images/motion/reports-page.webp";
import reportsDownload from "@/assets/images/motion/reports-download.webp";
import partnershipsSignup from "@/assets/images/motion/partnerships-signup.webp";
import partnershipsDashboard from "@/assets/images/motion/partnerships-dashboard.webp";
import partnershipsTestimonials from "@/assets/images/motion/partnerships-testimonials.webp";
import hdfcKyc from "@/assets/images/motion/hdfc-kyc.webp";
import hdfcKycError from "@/assets/images/motion/hdfc-kyc-error.webp";
import hdfcVideoKyc from "@/assets/images/motion/hdfc-video-kyc.webp";
import hdfcFd from "@/assets/images/motion/hdfc-fd.webp";
import discoveryHome from "@/assets/images/motion/discovery-home.webp";
import discoveryMenu from "@/assets/images/motion/discovery-menu.webp";
import discoveryContact from "@/assets/images/motion/discovery-contact.webp";

// TYPES =======================================================================
import type { ComponentType, CSSProperties, SVGProps } from "react";
import type { StaticImageData } from "next/image";
import type { Motion } from "./MotionThumb";

type Group = "Experience" | "Visual" | "Type" | "AI";

// The filters, in scroll order; the ids let a link go straight to one (/#visual)
const FILTERS: { id: string; label: string; group: Group; note?: string }[] = [
    // A note scribbled beside it
    { id: "ai", label: "AI", group: "AI", note: "new!" },
    { id: "experiences", label: "Experiences", group: "Experience" },
    { id: "visual", label: "Visual", group: "Visual" },
    { id: "type", label: "Type", group: "Type" },
];

// The order the projects are shown in. Each thumbnail fills its panel, cropped
// from the middle; where cropping would cut into lettering, `whole` shows it all
// instead, enlarged by `art` (on its own background, `bg`, which fills the panel).
// `motion` plays real screens from the project in place of the thumbnail.
const ORDER: { href: string; bg: string; whole?: boolean; art?: number; motion?: Motion }[] = [
    { href: "/experiences/revamping-reports", bg: "#FFFFFF", motion: {
        kind: "browser", screens: [reportsPage, reportsDownload],
    } },
    { href: "/visual/icon-system-for-setu", bg: "#F2FDFD" },
    { href: "/experiences/path-to-partnerships", bg: "#56CFD2", motion: {
        kind: "browser", screens: [partnershipsSignup, partnershipsDashboard, partnershipsTestimonials],
    } },
    { href: "/visual/26-days-of-type", bg: "#FFFFFF" },
    { href: "/visual/people-experience", bg: "#CCF6F7" },
    { href: "/type/47-days-of-devanagari-type", bg: "#FFFFFF", whole: true, art: 1.5 },
    { href: "/experiences/hdfc-journeys", bg: "#E5F2FF", motion: {
        kind: "phone", screens: [hdfcKyc, hdfcKycError, hdfcVideoKyc, hdfcFd],
    } },
    { href: "/visual/kannauj-perfumery", bg: "#FFFFFF" },
    { href: "/experiences/assisted-product-discovery", bg: "#C7EFF0", motion: {
        kind: "browser", screens: [discoveryHome, discoveryMenu, discoveryContact],
    } },
    // The logo spans 340 of its 350-wide image: enlarged just enough to meet both sides
    { href: "/type/inktober-2017", bg: "#FFFFFF", whole: true, art: 1.02 },
];

interface Piece {
    key         : string;
    group       : Group;
    title       : string;
    description : string;
    tags        : string[];
    href?       : string;
    Thumbnail?  : ComponentType<SVGProps<SVGSVGElement>>;
    bg          : string;
    whole       : boolean;
    art         : number;
    motion?     : Motion;
    // A still image, filling the thumbnail
    image?      : StaticImageData;
    ai          : boolean;
    // What an empty thumbnail says
    note?       : string;
}

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));

const PIECES: Piece[] = [
    ...ORDER.flatMap(({ href, bg, whole = false, art = 1, motion }): Piece[] => {
        const project = BY_HREF.get(href);
        if (!project) return [];
        const { title, description, category, tags = [], Thumbnail } = project;
        return [{ key: href, group: category, title, description, tags, href, Thumbnail, bg, whole, art, motion, ai: false }];
    }),
    ...AI_PROJECTS.filter(({ archived }) => !archived).map(({ title, description, tools, href, note, screens, cover }, i): Piece => ({
        key: `ai-${i}`, group: "AI", title, description, tags: tools, href, bg: "#F4F1EA", whole: false, art: 1, ai: true, note,
        motion: screens && { kind: "browser", screens },
        image: cover,
    })),
];

/*
 * Where each piece sits on the board, by how many there are, all in grid
 * blocks (24px): the cut-out's left and top, the thumbnail's width and height,
 * and whether its words go under it or beside it. Each cut-out is the
 * thumbnail plus a block all round (and room for its words), so every edge
 * falls on a grid line. `rows` is the board's height.
 */
const WORDS_UNDER = 5;
const WORDS_BESIDE = 8;

type Spot = { x: number; y: number; w: number; h: number; words: "under" | "beside" };
// Thumbnails come in two sizes only: large (17 × 10) and standard (13 × 8)
const LARGE = { w: 17, h: 10 };
const STANDARD = { w: 13, h: 8 };

const COMPOSITIONS: Record<number, { rows: number; spots: Spot[] }> = {
    2: { rows: 25, spots: [
        { x: 2, y: 0, ...LARGE, words: "under" },
        { x: 24, y: 9, ...STANDARD, words: "under" },
    ] },
    3: { rows: 26, spots: [
        { x: 1, y: 0, ...STANDARD, words: "under" },
        { x: 18, y: 2, ...STANDARD, words: "beside" },
        { x: 18, y: 13, ...STANDARD, words: "beside" },
    ] },
    4: { rows: 26, spots: [
        { x: 1, y: 0, ...STANDARD, words: "under" },
        { x: 18, y: 0, ...STANDARD, words: "beside" },
        { x: 2, y: 16, ...STANDARD, words: "beside" },
        { x: 27, y: 11, ...STANDARD, words: "under" },
    ] },
};

// The cut-out's size, in blocks
const cut = ({ w, h, words }: Spot) => words === "under"
    ? { cw: w + 2, ch: h + 2 + WORDS_UNDER }
    : { cw: w + 2 + WORDS_BESIDE + 1, ch: h + 2 };

// A card's thumbnail panel: screens in motion, the thumbnail, or a placeholder
// until a project has its image
const Media = ({ piece: { Thumbnail, bg, whole, art, motion, image, ai, note }, paused, turn }: { piece: Piece; paused: boolean; turn: number }) => (
    <span className="wcard__media" style={{ "--art": art, "--bg": bg } as CSSProperties} data-empty={(!Thumbnail && !motion && !image) || undefined}>
        {motion
            // A fresh start (from its first screen) each turn it plays
            ? <MotionThumb key={turn} motion={motion} paused={paused} />
            : image
            ? <Image src={image} alt="" className="wcard__image" sizes="360px" />
            : Thumbnail
                ? <Thumbnail className="wcard__art" aria-hidden="true" preserveAspectRatio={`xMidYMid ${whole ? "meet" : "slice"}`} />
                : <span className="wcard__soon">{note ?? (ai ? "Coming soon" : "Image to come")}</span>}
    </span>
);

// A card's title, line about it and tags
const Words = ({ piece: { title, description, tags, href, ai } }: { piece: Piece }) => (
    <span className="wcard__words">
        <span className="wcard__title">
            {title.slice(0, title.lastIndexOf(" ") + 1)}
            {/* The last word and the arrow (which slides in on hover) stay together */}
            <span className="wcard__last">
                {title.slice(title.lastIndexOf(" ") + 1)}
                {href && <svg className="wcard__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>}
            </span>
        </span>
        <span className="wcard__description">{description}</span>
        <span className="wcard__tags">
            {ai && <span className="wcard__tag">Built using AI</span>}
            {tags.map((tag, t) => <span key={`${tag}-${t}`} className="wcard__tag">{tag}</span>)}
        </span>
    </span>
);

/*
 * Work: a stage that stays put while the section scrolls past, stepping from
 * AI through Experiences and Visual to Type, a screen's scroll each (with a
 * snap point at every step). The heading, filters and a pause for the moving
 * thumbnails sit in a column on the left; beside them, the kind of work in view
 * is laid out on the grid, each thumbnail in its own cut-out with its title
 * and a line about it. Projects built with AI carry a label saying so. On narrower screens it's an ordinary section, and the
 * filters simply switch.
 */
export const WorkSection = () => {
    const [group, setGroup] = useState<Group>(FILTERS[0].group);
    // The thumbnails in motion can all be paused
    const [paused, setPaused] = useState(false);
    // They play one at a time: which (of this kind's moving ones) has its turn, and
    // a count of turns, so each starts afresh
    const [turns, setTurns] = useState({ group: FILTERS[0].group as Group, index: 0, turn: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // The step in view, from how far the section has scrolled
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const section = sectionRef.current;
            const stage = section?.querySelector<HTMLElement>(".work__stage");
            // No stepping on narrower screens (the snap points are hidden)
            if (!section || !stage || stepRefs.current[0]?.offsetParent === null) return;
            // How far past the point where the stage pins (under the nav), in stage heights
            const pinned = parseFloat(getComputedStyle(stage).top) - section.getBoundingClientRect().top;
            const index = Math.min(FILTERS.length - 1, Math.max(0, Math.round(pinned / stage.offsetHeight)));
            setGroup(FILTERS[index].group);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // A filter scrolls to its step (or, without the stepping, just switches)
    const choose = (index: number) => {
        const step = stepRefs.current[index];
        if (step && step.offsetParent !== null) step.scrollIntoView({ behavior: "smooth" });
        else setGroup(FILTERS[index].group);
    };

    const shown = PIECES.filter((piece) => piece.group === group);
    const { rows, spots } = COMPOSITIONS[shown.length] ?? COMPOSITIONS[4];
    const moving = shown.some((piece) => piece.motion);

    // Whose turn it is (back to the first when the kind of work changes)
    const players = shown.filter((piece) => piece.motion);
    const current = turns.group === group ? turns.index % Math.max(players.length, 1) : 0;
    const turn = turns.group === group ? turns.turn : 0;
    const playing = players[current];

    // When a turn's play-through ends, the next one's begins
    useEffect(() => {
        if (paused || !playing?.motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setTimeout(() => {
            setTurns({ group, index: (current + 1) % players.length, turn: turn + 1 });
        }, playLength(playing.motion));
        return () => window.clearTimeout(timer);
    }, [paused, playing, group, current, turn, players.length]);

    // Pausing holds the turn; playing again starts it afresh
    const togglePaused = () => {
        if (paused) setTurns({ group, index: current, turn: turn + 1 });
        setPaused(!paused);
    };

    return (
        <div ref={sectionRef} className="work" style={{ "--steps": FILTERS.length } as CSSProperties}>
            {/* A snap point (and link target) for each step */}
            {FILTERS.map(({ id }, i) => (
                <span
                    key={id}
                    id={id}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    className="work__step"
                    style={{ "--step": i } as CSSProperties}
                    aria-hidden="true"
                />
            ))}

            <div className="work__stage">
                <div className="work__layout">
                    {/* The heading, filters and the pause, in a column on the left */}
                    <div className="work__side">
                        <h2 id="work-title" className="work__title">Work</h2>
                        <nav className="work__filters" aria-label="Kinds of work">
                            {FILTERS.map(({ id, label, group: g, note }, i) => (
                                <button key={id} type="button" className="work__filter" aria-pressed={group === g} onClick={() => choose(i)}>
                                    {label}
                                    {note && <span className="work__note">{note}</span>}
                                    {group === g && (
                                        <svg className="work__circle" viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true">
                                            <path d="M8 24 C 6 8, 60 2, 104 10 C 122 14, 118 36, 70 40 C 30 43, 4 36, 12 18" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </nav>

                        {moving && (
                            <button type="button" className="work__pause" aria-pressed={paused} onClick={togglePaused}>
                                <svg viewBox="0 0 16 16" aria-hidden="true">
                                    {paused ? <path d="M5 3.5v9l7-4.5z" /> : <path d="M5 3.5v9M11 3.5v9" />}
                                </svg>
                                {paused ? "Play previews" : "Pause previews"}
                            </button>
                        )}
                    </div>

                    {/* Keyed by the kind of work, so each set settles in afresh */}
                    <ul key={group} className="work__board" style={{ "--rows": rows } as CSSProperties}>
                        {shown.map((piece, i) => {
                            const spot = spots[i % spots.length];
                            const { cw, ch } = cut(spot);
                            const style = {
                                "--x": spot.x, "--y": spot.y, "--cw": cw, "--ch": ch, "--mw": spot.w, "--mh": spot.h, "--i": i,
                            } as CSSProperties;

                            return (
                                <li key={piece.key} className={`wcard wcard--${piece.group.toLowerCase()}`} data-words={spot.words} style={style}>
                                    {/* Its turn: a line drawing itself round the outline as it plays */}
                                    {piece === playing && piece.motion && (
                                        <svg
                                            key={turn}
                                            className="wcard__progress"
                                            data-paused={paused || undefined}
                                            style={{ "--play": `${playLength(piece.motion)}ms` } as CSSProperties}
                                            aria-hidden="true"
                                        >
                                            <rect pathLength="100" />
                                        </svg>
                                    )}
                                    {piece.href ? (
                                        <Link href={piece.href} className="wcard__link">
                                            <Media piece={piece} paused={paused || piece !== playing} turn={piece === playing ? turn : -1} />
                                            <Words piece={piece} />
                                        </Link>
                                    ) : (
                                        <div className="wcard__link">
                                            <Media piece={piece} paused={paused || piece !== playing} turn={piece === playing ? turn : -1} />
                                            <Words piece={piece} />
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

        </div>
    );
};
