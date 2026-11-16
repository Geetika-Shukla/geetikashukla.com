// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// STYLES ======================================================================
import "./timeline-tile.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

interface TimelineTileProps extends Project {
    // Position within its period: decides side of the line and scatter offset
    index : number;
}

// Small fixed offsets (in grid units) so tiles look scattered but render the same every time
const JITTER_X = [0, 2, 1, 3, 1];
const JITTER_Y = [0, 1, 0, 1, 1];

export const TimelineTile = ({ index, title, description, category, year, href, Thumbnail }: TimelineTileProps) => {
    const position = {
        "--i"    : index,
        "--side" : index % 2 === 0 ? -1 : 1,
        "--jx"   : JITTER_X[index % JITTER_X.length],
        "--jy"   : JITTER_Y[index % JITTER_Y.length],
    } as CSSProperties;

    const card = (
        <>
            <span className="tile__image">
                <Thumbnail aria-hidden="true" />
                {!href && <span className="tile__tag">Upcoming</span>}
            </span>
            <span className="tile__caption">
                <span className="tile__title">{title}</span>
                <span className="tile__meta">{[year, category].filter(Boolean).join(" · ")}</span>
                <span className="tile__description">{description}</span>
            </span>
        </>
    );

    return (
        <li className="tile" style={position}>
            {href
                ? <Link href={href} className="tile__card">{card}</Link>
                : <div className="tile__card" tabIndex={0}>{card}</div>}
        </li>
    );
};
