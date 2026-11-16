"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useState } from "react";

// STYLES ======================================================================
import "./iso-floor.css";

// TYPES =======================================================================
import type { ReactNode, RefObject } from "react";

/*
 * Cards on an isometric floor (see iso-floor.css). Positions are the top-left
 * corner in grid cells (u across, v down the plane) from the floor's centre,
 * on a lattice with a pitch of 11 cells (a 9-cell card + a 2-cell gutter), so
 * cards in a row share a top edge and columns line up.
 * Sizes: 1×1 is 9 × 9 cells, 2×1 is 20 × 9, 1×2 is 9 × 18 (two rows, a little
 * short of the lattice so tall imagery isn't stretched too far).
 */
export type IsoSize = "1x1" | "2x1" | "1x2";

export interface IsoTile {
    id           : string;
    size         : IsoSize;
    u            : number;
    v            : number;
    title        : string;
    description? : string;
    href?        : string;      // cards link here when given
    dimmed?      : boolean;     // greyed out, e.g. by a filter
    art?         : number;      // scales the artwork down inside its card
    focus?       : string;      // which part of cropped imagery stays in view (object-position)
    face         : ReactNode;   // the card's imagery
}

const WIDTH: Record<IsoSize, number> = { "1x1": 9, "2x1": 20, "1x2": 9 };
const DEPTH: Record<IsoSize, number> = { "1x1": 9, "2x1": 9, "1x2": 18 };
// The gap kept between cards, and how far same-row neighbours ease aside while a card is open (cells)
const GAP = 2;
const NUDGE = 1;

type Open = { tile: IsoTile; grow: number };   // grow: how far the open card grows (cells)

/*
 * Where every card moves while one is open, as [cells across, cells down].
 * Same-row neighbours ease a step aside. Then, row by row from the top, each
 * card moves down just enough to keep the gap below every card above it in
 * overlapping columns, counting the open card's growth and any card already
 * pushed down, so nothing ends up overlapping.
 */
const layoutFor = (tiles: IsoTile[], open: Open | null): Map<IsoTile, [number, number]> => {
    const offsets = new Map<IsoTile, [number, number]>(tiles.map((tile) => [tile, [0, 0]]));
    if (!open) return offsets;
    const { tile: o, grow } = open;

    tiles.forEach((tile) => {
        if (tile !== o && tile.v === o.v) offsets.set(tile, [tile.u > o.u ? NUDGE : -NUDGE, 0]);
    });

    const left = (t: IsoTile) => t.u + offsets.get(t)![0];
    const top = (t: IsoTile) => t.v + offsets.get(t)![1];
    const bottom = (t: IsoTile) => top(t) + DEPTH[t.size] + (t === o ? grow : 0);
    const sharesColumns = (a: IsoTile, b: IsoTile) => left(a) < left(b) + WIDTH[b.size] && left(b) < left(a) + WIDTH[a.size];

    [...tiles].sort((a, b) => a.v - b.v).forEach((tile) => {
        const above = tiles.filter((other) => other.v + DEPTH[other.size] <= tile.v && sharesColumns(other, tile));
        const clear = Math.max(tile.v, ...above.map((other) => bottom(other) + GAP));
        offsets.set(tile, [offsets.get(tile)![0], clear - tile.v]);
    });
    return offsets;
};

interface IsoFloorProps {
    tiles     : IsoTile[];
    floorRef? : RefObject<HTMLDivElement>;
    /* "reveal": hovering or focusing a card opens it, growing at the bottom to
       show its title (and description) while the cards around it make room.
       "overlay": titles always show over the imagery, and cards stay still.
       "none": imagery only, and cards stay still. */
    captions? : "reveal" | "overlay" | "none";
}

export const IsoFloor = ({ tiles, floorRef, captions = "reveal" }: IsoFloorProps) => {
    const reveal = captions === "reveal";
    const [open, setOpen] = useState<Open | null>(null);
    const openTile = (tile: IsoTile, element: HTMLElement) => {
        const info = element.querySelector<HTMLElement>(".tile3d__info");
        const cell = element.offsetWidth / WIDTH[tile.size];
        setOpen({ tile, grow: (info?.scrollHeight ?? 0) / cell });
    };
    const offsets = layoutFor(tiles, open);

    return (
        <div className={`floor floor--${captions}`} ref={floorRef}>
            <div className="floor__plane">
                <ul className="floor__tiles">
                    {tiles.map((tile) => {
                        const { id, size, u, v, title, description, href, dimmed = false, art = 1, focus = "50% 50%", face } = tile;
                        const [du, dv] = offsets.get(tile)!;
                        const isOpen = open?.tile === tile;
                        const content = (
                            <>
                                <span className="tile3d__face">{face}</span>
                                {captions !== "none" && (
                                    <span className="tile3d__info">
                                        <span className="tile3d__title">{title}</span>
                                        {description && <span className="tile3d__description">{description}</span>}
                                    </span>
                                )}
                            </>
                        );
                        return (
                            <li
                                key={id}
                                className={`tile3d tile3d--${size}`}
                                style={{ "--u": u, "--v": v, "--art": art, "--focus": focus, "--du": du, "--dv": dv, "--grow": isOpen ? open.grow : 0 } as React.CSSProperties}
                                data-open={isOpen}
                                data-dimmed={dimmed}
                                onMouseEnter={reveal ? (event) => openTile(tile, event.currentTarget) : undefined}
                                onMouseLeave={reveal ? () => setOpen(null) : undefined}
                                onFocus={reveal ? (event) => openTile(tile, event.currentTarget) : undefined}
                                onBlur={reveal ? () => setOpen(null) : undefined}
                            >
                                {href
                                    ? <Link href={href} className="tile3d__card">{content}</Link>
                                    : <div className="tile3d__card" tabIndex={reveal ? 0 : undefined}>{content}</div>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
