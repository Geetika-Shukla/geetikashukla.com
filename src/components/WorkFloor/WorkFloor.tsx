"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useRef, useState } from "react";

// COMPONENTS ==================================================================
import { IsoFloor } from "@/components/IsoFloor/IsoFloor";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./work-floor.css";

// TYPES =======================================================================
import type { IsoSize, IsoTile } from "@/components/IsoFloor/IsoFloor";
import type { Project } from "@/data/projects";

type Category = Project["category"];

// Filters listed under "Work"; the ids let the nav link straight to a filter (/#experiences)
const FILTERS: { id: string; label: string; category: Category }[] = [
    { id: "experiences", label: "Experiences", category: "Experience" },
    { id: "visual", label: "Visual", category: "Visual" },
    { id: "type", label: "Type", category: "Type" },
];

/*
 * Project cards on the floor's lattice (see IsoFloor), laid flat in three rows
 * beside the list. Positions are the top-left corner in cells from the plane's
 * centre; the arrangement spans u −32 to 32 and v −16 to 15. `art` scales a
 * thumbnail down inside its card where it reads too large.
 */
const BENTO: { href: string; size: IsoSize; u: number; v: number; art?: number }[] = [
    { href: "/experiences/revamping-reports", size: "2x1", u: -32, v: -16 },
    { href: "/visual/kannauj-perfumery", size: "2x1", u: -10, v: -16 },
    { href: "/visual/26-days-of-type", size: "2x1", u: 12, v: -16 },
    { href: "/experiences/hdfc-journeys", size: "1x1", u: -32, v: -5 },
    { href: "/experiences/assisted-product-discovery", size: "1x1", u: -21, v: -5 },
    { href: "/visual/people-experience", size: "2x1", u: -10, v: -5 },
    { href: "/experiences/path-to-partnerships", size: "2x1", u: 12, v: -5 },
    { href: "/type/47-days-of-devanagari-type", size: "2x1", u: -32, v: 6 },
    { href: "/type/inktober-2017", size: "2x1", u: -10, v: 6, art: 0.56 },
    { href: "/visual/icon-system-for-setu", size: "1x1", u: 12, v: 6 },
];

const BY_HREF = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));
const PROJECTS = BENTO.flatMap((spot) => {
    const project = BY_HREF.get(spot.href);
    return project ? [{ ...spot, project }] : [];
});

const filterFromHash = (hash: string): Category | null =>
    FILTERS.find(({ id }) => `#${id}` === hash)?.category ?? null;

/*
 * Snaps between the room above and the floor: when scrolling stops part-way
 * between them, the page glides on to the floor (scrolling down) or back to
 * the room (scrolling up). Below the floor's top, scrolling is free. Done in
 * script because CSS snapping pulls a short wheel scroll back to the room.
 * Marks the page (html.is-at-work) while it rests at the floor's top, so the
 * nav can drop its background there; scrolled on past it, the nav's glass
 * returns over the cards.
 */
const useSnapToFloor = (floorRef: React.RefObject<HTMLElement | null>) => {
    useEffect(() => {
        let lastY = window.scrollY;
        let direction = 0;
        let timer: number | undefined;
        const root = document.documentElement;
        const floorTop = () => {
            const floor = floorRef.current;
            return floor ? Math.round(floor.getBoundingClientRect().top + window.scrollY) : Infinity;
        };

        const settle = () => {
            const top = floorTop();
            const y = window.scrollY;
            if (y <= 0 || y >= top - 1) return;
            const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: direction > 0 ? top : 0, behavior: smooth ? "smooth" : "auto" });
        };

        const onScroll = () => {
            const y = window.scrollY;
            root.classList.toggle("is-at-work", Math.abs(y - floorTop()) <= 1);
            if (y !== lastY) direction = Math.sign(y - lastY);
            lastY = y;
            window.clearTimeout(timer);
            timer = window.setTimeout(settle, 140);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(timer);
            root.classList.remove("is-at-work");
        };
    }, [floorRef]);
};

export const WorkFloor = () => {
    const [filter, setFilter] = useState<Category | null>(null);
    const floorRef = useRef<HTMLDivElement>(null);
    useSnapToFloor(floorRef);

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

    const tiles: IsoTile[] = PROJECTS.map(({ href, size, u, v, art, project: { title, description, category, Thumbnail } }) => ({
        id     : href,
        href, size, u, v, art, title, description,
        dimmed : filter !== null && category !== filter,
        // Wide imagery is cropped to fill its card; square imagery shows whole
        face   : <Thumbnail aria-hidden="true" preserveAspectRatio={size === "2x1" ? "xMidYMid slice" : "xMidYMid meet"} />,
    }));

    return (
        <div className="work iso">
            <nav className="work__list" aria-label="Filter work">
                {/* The title clears the filter: every card back in colour */}
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

            <IsoFloor tiles={tiles} floorRef={floorRef} view="flat" />
        </div>
    );
};
