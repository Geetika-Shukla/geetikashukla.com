"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
 * pitch is 11 grid cells (a 9-cell tile + a 2-cell gutter), so tiles in the same
 * row share a top edge and columns line up. Positions are the top-left corner
 * in cells (u across, v down the plane) from the floor's centre, chosen to spread
 * the tiles over the viewport and keep the list's column clear.
 * Sizes: 1×1 is 9 × 9 cells, 2×1 is 20 × 9.
 * `art` scales a thumbnail down inside its card where it reads too large.
 */
type Size = "1x1" | "2x1";
const BENTO: { href: string; size: Size; u: number; v: number; art?: number }[] = [
    { href: "/visual/26-days-of-type", size: "2x1", u: 0, v: -31 },
    { href: "/visual/kannauj-perfumery", size: "2x1", u: -11, v: -20 },
    { href: "/experiences/path-to-partnerships", size: "2x1", u: 11, v: -20 },
    { href: "/experiences/revamping-reports", size: "2x1", u: -22, v: -9 },
    { href: "/visual/people-experience", size: "2x1", u: 0, v: -9 },
    { href: "/visual/icon-system-for-setu", size: "1x1", u: 22, v: -9 },
    { href: "/experiences/hdfc-journeys", size: "1x1", u: -11, v: 2 },
    { href: "/experiences/assisted-product-discovery", size: "1x1", u: 0, v: 2 },
    { href: "/type/inktober-2017", size: "2x1", u: 11, v: 2, art: 0.7 },
    { href: "/type/47-days-of-devanagari-type", size: "2x1", u: 0, v: 13 },
];

const WIDTH: Record<Size, number> = { "1x1": 9, "2x1": 20 };
// How far same-row neighbours ease aside while a card is open (cells)
const NUDGE = 1;
// Space kept between an open card's new bottom edge and the card below it (px)
const CLEARANCE = 16;

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));
const TILES = BENTO.flatMap(({ href, size, u, v, art = 1 }) => {
    const project = BY_HREF.get(href);
    return project ? [{ ...project, size, u, v, art }] : [];
});

type Tile = (typeof TILES)[number];

/*
 * Where a tile moves while another is open: tiles below it in overlapping
 * columns slide down (by the px the open card grew) to clear it; tiles in the
 * same row ease a step away to either side. Returns [cells across, px down].
 */
const offsetFor = (tile: Tile, open: { tile: Tile; grow: number } | null): [number, number] => {
    if (!open || open.tile === tile) return [0, 0];
    const { tile: o, grow } = open;
    const overlaps = tile.u < o.u + WIDTH[o.size] && o.u < tile.u + WIDTH[tile.size];
    if (overlaps && tile.v > o.v) return [0, grow + CLEARANCE];
    if (tile.v === o.v) return [tile.u > o.u ? NUDGE : -NUDGE, 0];
    return [0, 0];
};

const filterFromHash = (hash: string): Category | null =>
    FILTERS.find(({ id }) => `#${id}` === hash)?.category ?? null;

/*
 * Snaps between the room above and the floor: when scrolling stops part-way
 * between them, the page glides on to the floor (scrolling down) or back to
 * the room (scrolling up). Below the floor's top, scrolling is free. Done in
 * script because CSS snapping pulls a short wheel scroll back to the room.
 */
const useSnapToFloor = (floorRef: React.RefObject<HTMLElement | null>) => {
    useEffect(() => {
        let lastY = window.scrollY;
        let direction = 0;
        let timer: number | undefined;

        const settle = () => {
            const floor = floorRef.current;
            if (!floor) return;
            const floorTop = Math.round(floor.getBoundingClientRect().top + window.scrollY);
            const y = window.scrollY;
            if (y <= 0 || y >= floorTop - 1) return;
            const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: direction > 0 ? floorTop : 0, behavior: smooth ? "smooth" : "auto" });
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (y !== lastY) direction = Math.sign(y - lastY);
            lastY = y;
            window.clearTimeout(timer);
            timer = window.setTimeout(settle, 140);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(timer);
        };
    }, [floorRef]);
};

export const WorkFloor = () => {
    const [filter, setFilter] = useState<Category | null>(null);
    const floorRef = useRef<HTMLDivElement>(null);
    useSnapToFloor(floorRef);
    // The open card, and how far it grows: the measured height of its title and description
    const [open, setOpen] = useState<{ tile: Tile; grow: number } | null>(null);
    const openTile = (tile: Tile, element: HTMLElement) => {
        const info = element.querySelector<HTMLElement>(".tile3d__info");
        setOpen({ tile, grow: info?.scrollHeight ?? 0 });
    };

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
                    {/* Clears the filter: every card back in colour */}
                    <li>
                        <button
                            type="button"
                            className="work__filter"
                            aria-pressed={filter === null}
                            onClick={() => setFilter(null)}
                        >
                            All
                        </button>
                    </li>
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

            <div className="floor" ref={floorRef}>
                <div className="floor__plane">
                    <ul className="floor__tiles">
                        {TILES.map((tile) => {
                            const { title, description, href, Thumbnail, size, category, u, v, art } = tile;
                            const [du, dy] = offsetFor(tile, open);
                            const isOpen = open?.tile === tile;
                            return (
                                <li
                                    key={title}
                                    className={`tile3d tile3d--${size}`}
                                    style={{ "--u": u, "--v": v, "--art": art, "--du": du, "--dy": `${dy}px`, "--grow": `${isOpen ? open.grow : 0}px` } as React.CSSProperties}
                                    data-open={isOpen}
                                    data-dimmed={filter !== null && category !== filter}
                                    onMouseEnter={(event) => openTile(tile, event.currentTarget)}
                                    onMouseLeave={() => setOpen(null)}
                                    onFocus={(event) => openTile(tile, event.currentTarget)}
                                    onBlur={() => setOpen(null)}
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
