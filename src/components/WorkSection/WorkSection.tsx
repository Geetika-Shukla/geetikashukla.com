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

// The order the projects are shown in; `art` scales a thumbnail down where it reads too large
const ORDER: { href: string; art?: number }[] = [
    { href: "/experiences/revamping-reports" },
    { href: "/visual/kannauj-perfumery" },
    { href: "/experiences/path-to-partnerships" },
    { href: "/visual/26-days-of-type" },
    { href: "/visual/people-experience" },
    { href: "/type/47-days-of-devanagari-type" },
    { href: "/experiences/hdfc-journeys" },
    { href: "/visual/icon-system-for-setu" },
    { href: "/experiences/assisted-product-discovery" },
    { href: "/type/inktober-2017", art: 0.6 },
];

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));
const PROJECTS = ORDER.flatMap(({ href, art = 1 }) => {
    const project = BY_HREF.get(href);
    return project ? [{ ...project, art }] : [];
});

// A type's name as the filters show it (Experiences, Visual, Type)
const LABELS = new Map(FILTERS.map(({ label, category }) => [category, label]));

const filterFromHash = (hash: string): Category | null =>
    FILTERS.find(({ id }) => `#${id}` === hash)?.category ?? null;

/*
 * Work: the title and filters on the left, staying in view, beside three
 * columns of project cards. A card is a tinted panel holding the thumbnail,
 * with an arrow set into its corner, then the title, a line of description and
 * tags. A filter shows only that type of work; clicking the title, or the
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
                {PROJECTS.filter(({ category }) => filter === null || category === filter).map(({ title, description, category, year, href, Thumbnail, shape, art }) => (
                    <li key={href} className={`wcard wcard--${category.toLowerCase()}`}>
                        <Link href={href!} className="wcard__link">
                            <span className="wcard__media" style={{ "--art": art } as CSSProperties}>
                                {/* Wide strips fill the panel; square artwork sits whole within it */}
                                <Thumbnail
                                    className={`wcard__art wcard__art--${shape === "wide" ? "fill" : "fit"}`}
                                    aria-hidden="true"
                                    preserveAspectRatio={shape === "wide" ? "xMidYMid slice" : "xMidYMid meet"}
                                />
                                <span className="wcard__arrow" aria-hidden="true">
                                    <svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8" /></svg>
                                </span>
                            </span>
                            <span className="wcard__title">{title}</span>
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
