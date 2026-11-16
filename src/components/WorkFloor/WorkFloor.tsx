// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./work-floor.css";

// TYPES =======================================================================
import type { Project } from "@/data/projects";

// Projects grouped by type, each group a zone on an isometric floor
const GROUPS: { title: string; category: Project["category"] }[] = [
    { title: "Experiences", category: "Experience" },
    { title: "Visual", category: "Visual" },
    { title: "Type", category: "Type" },
];

const ALL_PROJECTS = timeline.flatMap((period) => period.projects);

const Tile = ({ title, year, href, Thumbnail, shape }: Project) => {
    const content = (
        <>
            <span className="tile3d__face">
                {/* Wide imagery is cropped to fill the 2×1 tile; square imagery shows whole */}
                <Thumbnail aria-hidden="true" preserveAspectRatio={shape === "wide" ? "xMidYMid slice" : "xMidYMid meet"} />
                {!href && <span className="tile3d__tag">Upcoming</span>}
            </span>
            <span className="tile3d__caption">
                <span className="tile3d__title">{title}</span>
                {year && <span className="tile3d__year">{year}</span>}
            </span>
        </>
    );
    return (
        <li className={shape === "wide" ? "tile3d tile3d--wide" : "tile3d"}>
            {href
                ? <Link href={href} className="tile3d__link">{content}</Link>
                : <div className="tile3d__link">{content}</div>}
        </li>
    );
};

export const WorkFloor = () => (
    <div className="floor">
        <div className="floor__plane">
            {GROUPS.map(({ title, category }) => (
                <section key={category} className="floor__zone" aria-label={title}>
                    <h3 className="floor__zone-title">{title}</h3>
                    <ul className="floor__tiles">
                        {ALL_PROJECTS.filter((project) => project.category === category).map((project) => (
                            <Tile key={project.title} {...project} />
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    </div>
);
