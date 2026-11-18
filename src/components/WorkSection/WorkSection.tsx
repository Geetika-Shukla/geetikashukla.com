"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// DATA ========================================================================
import { timeline } from "@/data/projects";
import { AI_PROJECTS } from "@/data/ai-projects";

// STYLES ======================================================================
import "./work-section.css";

// TYPES =======================================================================
import type { ComponentType, CSSProperties, SVGProps } from "react";

type Group = "Experience" | "Visual" | "Type" | "AI";

// The filters, in scroll order; the ids let a link go straight to one (/#visual)
const FILTERS: { id: string; label: string; group: Group }[] = [
    { id: "experiences", label: "Experiences", group: "Experience" },
    { id: "visual", label: "Visual", group: "Visual" },
    { id: "type", label: "Type", group: "Type" },
    { id: "ai", label: "AI", group: "AI" },
];

// The order the projects are shown in. Each thumbnail fills its panel, cropped
// from the middle; where cropping would cut into lettering, `whole` shows it all
// instead, enlarged by `art` (on its own background, `bg`, which fills the panel).
const ORDER: { href: string; bg: string; whole?: boolean; art?: number }[] = [
    { href: "/experiences/revamping-reports", bg: "#FFFFFF" },
    { href: "/visual/kannauj-perfumery", bg: "#FFFFFF" },
    { href: "/experiences/path-to-partnerships", bg: "#56CFD2" },
    { href: "/visual/26-days-of-type", bg: "#FFFFFF", whole: true, art: 1.5 },
    { href: "/visual/people-experience", bg: "#CCF6F7" },
    { href: "/type/47-days-of-devanagari-type", bg: "#FFFFFF", whole: true, art: 1.5 },
    { href: "/experiences/hdfc-journeys", bg: "#E5F2FF" },
    { href: "/visual/icon-system-for-setu", bg: "#F2FDFD" },
    { href: "/experiences/assisted-product-discovery", bg: "#C7EFF0" },
    { href: "/type/inktober-2017", bg: "#FFFFFF", whole: true, art: 0.85 },
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
    ai          : boolean;
}

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));

const PIECES: Piece[] = [
    ...ORDER.flatMap(({ href, bg, whole = false, art = 1 }): Piece[] => {
        const project = BY_HREF.get(href);
        if (!project) return [];
        const { title, description, category, tags = [], Thumbnail } = project;
        return [{ key: href, group: category, title, description, tags, href, Thumbnail, bg, whole, art, ai: false }];
    }),
    ...AI_PROJECTS.map(({ title, description, tools, href }, i): Piece => ({
        key: `ai-${i}`, group: "AI", title, description, tags: tools, href, bg: "#F4F1EA", whole: false, art: 1, ai: true,
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
const COMPOSITIONS: Record<number, { rows: number; spots: Spot[] }> = {
    2: { rows: 21, spots: [
        { x: 3, y: 0, w: 14, h: 8, words: "under" },
        { x: 22, y: 7, w: 12, h: 7, words: "under" },
    ] },
    3: { rows: 23, spots: [
        { x: 1, y: 0, w: 12, h: 7, words: "under" },
        { x: 18, y: 2, w: 10, h: 6, words: "beside" },
        { x: 12, y: 15, w: 10, h: 6, words: "beside" },
    ] },
    4: { rows: 23, spots: [
        { x: 0, y: 0, w: 12, h: 7, words: "under" },
        { x: 17, y: 0, w: 10, h: 6, words: "beside" },
        { x: 2, y: 15, w: 10, h: 6, words: "beside" },
        { x: 25, y: 9, w: 12, h: 7, words: "under" },
    ] },
};

// The cut-out's size, in blocks
const cut = ({ w, h, words }: Spot) => words === "under"
    ? { cw: w + 2, ch: h + 2 + WORDS_UNDER }
    : { cw: w + 2 + WORDS_BESIDE + 1, ch: h + 2 };

// A card's thumbnail panel; a placeholder until a project has its image
const Media = ({ piece: { Thumbnail, bg, whole, art, ai } }: { piece: Piece }) => (
    <span className="wcard__media" style={{ "--art": art, "--bg": bg } as CSSProperties} data-empty={!Thumbnail || undefined}>
        {Thumbnail
            ? <Thumbnail className="wcard__art" aria-hidden="true" preserveAspectRatio={`xMidYMid ${whole ? "meet" : "slice"}`} />
            : <span className="wcard__soon">{ai ? "Coming soon" : "Image to come"}</span>}
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
            {ai && <span className="wcard__tag wcard__tag--ai">Built using AI</span>}
            {tags.map((tag, t) => <span key={`${tag}-${t}`} className="wcard__tag">{tag}</span>)}
        </span>
    </span>
);

/*
 * Work: a stage that stays put while the section scrolls past, stepping from
 * Experiences through Visual and Type to AI, a screen's scroll each (with a
 * snap point at every step). The heading and filters sit centred on top; below,
 * the kind of work in view is laid out on the grid, each thumbnail in its own
 * cut-out with its title and a line about it. Projects built with AI carry a
 * label saying so. On narrower screens it's an ordinary section, and the
 * filters simply switch.
 */
export const WorkSection = () => {
    const [group, setGroup] = useState<Group>("Experience");
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
                <h2 id="work-title" className="work__title">Work</h2>
                <nav className="work__filters" aria-label="Kinds of work">
                    {FILTERS.map(({ id, label, group: g }, i) => (
                        <button key={id} type="button" className="work__filter" aria-pressed={group === g} onClick={() => choose(i)}>
                            {label}
                        </button>
                    ))}
                </nav>

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
                                {piece.href ? (
                                    <Link href={piece.href} className="wcard__link">
                                        <Media piece={piece} />
                                        <Words piece={piece} />
                                    </Link>
                                ) : (
                                    <div className="wcard__link">
                                        <Media piece={piece} />
                                        <Words piece={piece} />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
