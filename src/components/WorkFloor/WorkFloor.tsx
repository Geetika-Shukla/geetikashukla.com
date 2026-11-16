// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./work-floor.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

/*
 * Projects grouped by type. Each group sits on one isometric floor plane at a
 * diagonal offset (in grid cells, see work-floor.css), so the groups stack down
 * the page. Offsets leave room for each group's rows (Experiences 2, Visual 2,
 * Type 1); update them, and the plane size in the CSS, if the groups change.
 */
const GROUPS: { title: string; category: Project["category"]; offset: number }[] = [
    { title: "Experiences", category: "Experience", offset: 6 },
    { title: "Visual", category: "Visual", offset: 40 },
    { title: "Type", category: "Type", offset: 74 },
];

// Only projects with a page to open
const PROJECTS = timeline.flatMap((period) => period.projects).filter((project) => project.href);

const Tile = ({ title, year, href, Thumbnail, shape }: Project) => (
    <li className={shape === "wide" ? "tile3d tile3d--wide" : "tile3d"}>
        <Link href={href!} className="tile3d__link">
            <span className="tile3d__face">
                {/* Wide imagery is cropped to fill the 2×1 tile; square imagery shows whole */}
                <Thumbnail aria-hidden="true" preserveAspectRatio={shape === "wide" ? "xMidYMid slice" : "xMidYMid meet"} />
            </span>
            <span className="tile3d__caption">
                <span className="tile3d__title">{title}</span>
                {year && <span className="tile3d__year">{year}</span>}
            </span>
        </Link>
    </li>
);

export const WorkFloor = () => (
    <div className="floor">
        <div className="floor__plane">
            {GROUPS.map(({ title, category, offset }) => (
                <section key={category} className="floor__zone" style={{ "--offset": offset } as CSSProperties} aria-label={title}>
                    <h3 className="floor__zone-title">{title}</h3>
                    <ul className="floor__tiles">
                        {PROJECTS.filter((project) => project.category === category).map((project) => (
                            <Tile key={project.title} {...project} />
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    </div>
);
