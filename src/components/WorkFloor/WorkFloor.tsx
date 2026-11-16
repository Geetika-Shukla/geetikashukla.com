"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useEffect, useState } from "react";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./work-floor.css";

// TYPES =======================================================================
import type { Project } from "@/data/projects";

type Category = Project["category"];

// Filters listed under "Work"; the ids let the nav link straight to a filter (/#experiences)
const FILTERS: { id: string; label: string; category: Category }[] = [
    { id: "experiences", label: "Experiences", category: "Experience" },
    { id: "visual", label: "Visual", category: "Visual" },
    { id: "type", label: "Type", category: "Type" },
];

/*
 * Bento tiles scattered over the visible floor. Positions are in grid cells
 * (u across, v down the plane) from the floor's centre, computed to spread the
 * tiles evenly over the viewport while leaving the list's column clear.
 * Sizes: 1×1 is 7 × 7 cells, 2×1 is 15 × 7, 2×2 is 15 × 15.
 */
const BENTO: { href: string; size: "1x1" | "2x1" | "2x2"; u: number; v: number }[] = [
    { href: "/visual/icon-system-for-setu", size: "2x2", u: 0, v: -12 },
    { href: "/experiences/path-to-partnerships", size: "2x1", u: -11, v: -26 },
    { href: "/experiences/revamping-reports", size: "2x1", u: 17, v: 2 },
    { href: "/type/47-days-of-devanagari-type", size: "2x1", u: -22, v: -14 },
    { href: "/visual/people-experience", size: "2x1", u: 6, v: 14 },
    { href: "/visual/kannauj-perfumery", size: "2x1", u: 10, v: -24 },
    { href: "/visual/26-days-of-type", size: "2x1", u: 24, v: -10 },
    { href: "/type/inktober-2017", size: "2x1", u: -17, v: -1 },
    { href: "/experiences/hdfc-journeys", size: "1x1", u: 4, v: -38 },
    { href: "/experiences/assisted-product-discovery", size: "1x1", u: -3, v: 11 },
];

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));
const TILES = BENTO.flatMap(({ href, size, u, v }) => {
    const project = BY_HREF.get(href);
    return project ? [{ ...project, size, u, v }] : [];
});

const filterFromHash = (hash: string): Category | null =>
    FILTERS.find(({ id }) => `#${id}` === hash)?.category ?? null;

export const WorkFloor = () => {
    const [filter, setFilter] = useState<Category | null>(null);

    // Nav links point at /#experiences etc.: pick up the filter from the address
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
                <h2 id="work-title" className="work__title">Work</h2>
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

            <div className="floor">
                <div className="floor__plane">
                    <ul className="floor__tiles">
                        {TILES.map(({ title, year, href, Thumbnail, size, category, u, v }) => (
                            <li
                                key={title}
                                className={`tile3d tile3d--${size}`}
                                style={{ "--u": u, "--v": v } as React.CSSProperties}
                                data-dimmed={filter !== null && category !== filter}
                            >
                                <Link href={href!} className="tile3d__link">
                                    <span className="tile3d__face">
                                        {/* Wide imagery is cropped to fill its tile; square imagery shows whole */}
                                        <Thumbnail aria-hidden="true" preserveAspectRatio={size === "2x1" ? "xMidYMid slice" : "xMidYMid meet"} />
                                    </span>
                                    <span className="tile3d__caption">
                                        <span className="tile3d__title">{title}</span>
                                        {year && <span className="tile3d__year">{year}</span>}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
