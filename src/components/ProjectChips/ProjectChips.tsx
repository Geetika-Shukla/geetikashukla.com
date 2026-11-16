// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./project-chips.css";

// Every project as a compact chip: square thumbnail, title, organisation · year.
// Ordered newest first, as on the timeline.
const PROJECTS = timeline.flatMap((period) => period.projects.map((project) => ({ ...project, org: period.org })));

export const ProjectChips = () => (
    <ul className="chips">
        {PROJECTS.map(({ title, org, year, href, Thumbnail }) => {
            const content = (
                <>
                    <span className="chip__thumb">
                        <Thumbnail aria-hidden="true" />
                    </span>
                    <span className="chip__text">
                        <span className="chip__title">{title}</span>
                        <span className="chip__meta">
                            {[org, year].filter(Boolean).join(" · ")}
                            {!href && <span className="chip__tag">Upcoming</span>}
                        </span>
                    </span>
                </>
            );
            return (
                <li key={title}>
                    {href
                        ? <Link href={href} className="chip chip--link">{content}</Link>
                        : <div className="chip">{content}</div>}
                </li>
            );
        })}
    </ul>
);
