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
 * Bento tiles on a regular lattice spread over the visible floor. The lattice
 * pitch is 11 grid cells (a 7-cell tile + a 4-cell gutter), so tiles in the same
 * row share a top edge and columns line up. Positions are the top-left corner
 * in cells (u across, v down the plane) from the floor's centre, chosen to spread
 * the tiles over the viewport and keep the list's column clear.
 * Sizes: 1×1 is 7 × 7 cells, 2×1 is 18 × 7.
 */
type Size = "1x1" | "2x1";
const BENTO: { href: string; size: Size; u: number; v: number }[] = [
    { href: "/visual/26-days-of-type", size: "2x1", u: 0, v: -31 },
    { href: "/visual/kannauj-perfumery", size: "2x1", u: -11, v: -20 },
    { href: "/experiences/path-to-partnerships", size: "2x1", u: 11, v: -20 },
    { href: "/experiences/revamping-reports", size: "2x1", u: -22, v: -9 },
    { href: "/visual/people-experience", size: "2x1", u: 0, v: -9 },
    { href: "/visual/icon-system-for-setu", size: "1x1", u: 33, v: -9 },
    { href: "/experiences/hdfc-journeys", size: "1x1", u: -11, v: 2 },
    { href: "/experiences/assisted-product-discovery", size: "1x1", u: 0, v: 2 },
    { href: "/type/inktober-2017", size: "2x1", u: 11, v: 2 },
    { href: "/type/47-days-of-devanagari-type", size: "2x1", u: 0, v: 13 },
];

const WIDTH: Record<Size, number> = { "1x1": 7, "2x1": 18 };
// How far a card grows at the bottom when open, and how far same-row neighbours ease aside (cells)
const EXPAND = 5;
const NUDGE = 1;

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));
const TILES = BENTO.flatMap(({ href, size, u, v }) => {
    const project = BY_HREF.get(href);
    return project ? [{ ...project, size, u, v }] : [];
});

type Tile = (typeof TILES)[number];

/*
 * Where a tile moves while another is open: tiles below it in overlapping
 * columns slide down to clear the expanded card; tiles in the same row ease a
 * step away to either side.
 */
const offsetFor = (tile: Tile, open: Tile | undefined): [number, number] => {
    if (!open || open === tile) return [0, 0];
    const overlaps = tile.u < open.u + WIDTH[open.size] && open.u < tile.u + WIDTH[tile.size];
    if (overlaps && tile.v > open.v) return [0, EXPAND];
    if (tile.v === open.v) return [tile.u > open.u ? NUDGE : -NUDGE, 0];
    return [0, 0];
};

const filterFromHash = (hash: string): Category | null =>
    FILTERS.find(({ id }) => `#${id}` === hash)?.category ?? null;

export const WorkFloor = () => {
    const [filter, setFilter] = useState<Category | null>(null);
    const [openHref, setOpenHref] = useState<string | null>(null);
    const open = TILES.find((tile) => tile.href === openHref);

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
                        {TILES.map((tile) => {
                            const { title, description, href, Thumbnail, size, category, u, v } = tile;
                            const [du, dv] = offsetFor(tile, open);
                            return (
                                <li
                                    key={title}
                                    className={`tile3d tile3d--${size}`}
                                    style={{ "--u": u, "--v": v, "--du": du, "--dv": dv } as React.CSSProperties}
                                    data-open={open === tile}
                                    data-dimmed={filter !== null && category !== filter}
                                    onMouseEnter={() => setOpenHref(href!)}
                                    onMouseLeave={() => setOpenHref(null)}
                                    onFocus={() => setOpenHref(href!)}
                                    onBlur={() => setOpenHref(null)}
                                >
                                    <Link href={href!} className="tile3d__card">
                                        <span className="tile3d__face">
                                            {/* Wide imagery is cropped to fill its tile; square imagery shows whole */}
                                            <Thumbnail aria-hidden="true" preserveAspectRatio={size === "2x1" ? "xMidYMid slice" : "xMidYMid meet"} />
                                        </span>
                                        {/* Revealed when the card expands */}
                                        <span className="tile3d__info">
                                            <span className="tile3d__title">{title}</span>
                                            <span className="tile3d__description">{description}</span>
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
