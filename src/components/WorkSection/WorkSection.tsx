"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useEffect, useState } from "react";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./work-section.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

type Category = Project["category"];

// Filters listed under "Work"; the ids let a link go straight to a filter (/#visual)
const FILTERS: { id: string; label: string; category: Category }[] = [
    { id: "experiences", label: "Experiences", category: "Experience" },
    { id: "visual", label: "Visual", category: "Visual" },
    { id: "type", label: "Type", category: "Type" },
];

// The order the projects are shown in. `bg` is the thumbnail's own background,
// which fills its panel so the artwork sits in it seamlessly; `art` scales a
// thumbnail down where it reads too large.
const ORDER: { href: string; bg: string; art?: number }[] = [
    { href: "/experiences/revamping-reports", bg: "#FFFFFF" },
    { href: "/visual/kannauj-perfumery", bg: "#FFFFFF" },
    { href: "/experiences/path-to-partnerships", bg: "#56CFD2" },
    { href: "/visual/26-days-of-type", bg: "#FFFFFF" },
    { href: "/visual/people-experience", bg: "#CCF6F7" },
    { href: "/type/47-days-of-devanagari-type", bg: "#FFFFFF" },
    { href: "/experiences/hdfc-journeys", bg: "#E5F2FF" },
    { href: "/visual/icon-system-for-setu", bg: "#F2FDFD" },
    { href: "/experiences/assisted-product-discovery", bg: "#C7EFF0" },
    { href: "/type/inktober-2017", bg: "#FFFFFF", art: 0.7 },
];

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));
const PROJECTS = ORDER.flatMap(({ href, bg, art = 1 }) => {
    const project = BY_HREF.get(href);
    return project ? [{ ...project, bg, art }] : [];
});

// A type's name as the filters show it (Experiences, Visual, Type)
const LABELS = new Map(FILTERS.map(({ label, category }) => [category, label]));

const filterFromHash = (hash: string): Category | null =>
    FILTERS.find(({ id }) => `#${id}` === hash)?.category ?? null;

/*
 * Work: the title and filters on the left, staying in view, beside three
 * columns of project cards. A card is a tinted panel holding the thumbnail,
 * then the title (an arrow slides in after it on hover), a line of description
 * and tags. A filter shows only that type of work; clicking the title, or the
 * filter again, shows everything.
 */
export const WorkSection = () => {
    const [filter, setFilter] = useState<Category | null>(null);

    // Links point at /#experiences etc.: pick up the filter from the address
    useEffect(() => {
        const sync = () => {
            const fromHash = filterFromHash(window.location.hash);
            if (fromHash) setFilter(fromHash);
        };
        sync();
        window.addEventListener("hashchange", sync);
        return () => window.removeEventListener("hashchange", sync);
    }, []);

    return (
        <div className="work">
            <nav className="work__list" aria-label="Filter work">
                <h2 id="work-title" className="work__title">
                    <button type="button" className="work__reset" onClick={() => setFilter(null)} disabled={filter === null}>
                        Work
                    </button>
                </h2>
                <ul>
                    {FILTERS.map(({ id, label, category }) => (
                        <li key={id}>
                            <button
                                id={id}
                                type="button"
                                className="work__filter"
                                aria-pressed={filter === category}
                                onClick={() => setFilter(filter === category ? null : category)}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <ul className="work__cards">
                {PROJECTS.filter(({ category }) => filter === null || category === filter).map(({ title, description, category, year, href, Thumbnail, shape, bg, art }) => (
                    <li key={href} className={`wcard wcard--${category.toLowerCase()}`}>
                        <Link href={href!} className="wcard__link">
                            <span className="wcard__media" style={{ "--art": art, "--bg": bg } as CSSProperties}>
                                {/* Strips span the panel's width; squares sit whole in its middle */}
                                <Thumbnail
                                    className={`wcard__art wcard__art--${shape === "wide" ? "wide" : "square"}`}
                                    aria-hidden="true"
                                    preserveAspectRatio="xMidYMid meet"
                                />
                            </span>
                            <span className="wcard__title">
                                {title.slice(0, title.lastIndexOf(" ") + 1)}
                                {/* The last word and the arrow (which slides in on hover) stay together */}
                                <span className="wcard__last">
                                    {title.slice(title.lastIndexOf(" ") + 1)}
                                    <svg className="wcard__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
                                </span>
                            </span>
                            <span className="wcard__description">{description}</span>
                            <span className="wcard__tags">
                                <span className="wcard__tag">{LABELS.get(category)}</span>
                                {year && <span className="wcard__tag">{year}</span>}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
