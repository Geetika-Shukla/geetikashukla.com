// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// STYLES ======================================================================
import "./timeline-row.css";

// TYPES =======================================================================
import type { Project } from "@/data/projects";

export const TimelineRow = ({ title, category, year, href, Thumbnail }: Project) => {
    const content = (
        <>
            <span className="timeline-row__year">{year}</span>

            <span className="timeline-row__preview" aria-hidden="true">
                <Thumbnail />
            </span>

            <span className="timeline-row__main">
                <span className="timeline-row__title">{title}</span>
                <span className="timeline-row__meta">
                    {category}
                    {!href && <span className="timeline-row__tag">Upcoming</span>}
                </span>
            </span>

            {href && <span className="timeline-row__arrow" aria-hidden="true">→</span>}
        </>
    );

    return (
        <li>
            {href
                ? <Link href={href} className="timeline-row timeline-row--link">{content}</Link>
                : <div className="timeline-row">{content}</div>}
        </li>
    );
};
