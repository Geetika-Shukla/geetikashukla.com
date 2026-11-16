// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// COMPONENTS ==================================================================
import { WindowHero } from "@/components/WindowHero/WindowHero";
import { TimelineTile } from "@/components/TimelineTile/TimelineTile";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "@/styles/home.css";

// TYPES =======================================================================
import type { CSSProperties } from "react";
import type { Hotspot } from "@/components/WindowHero/DeskScene";

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";
const LINKEDIN_URL = "https://www.linkedin.com/in/geetikashukla/";

// Clickable objects on the desk, in desk-scene pixel coordinates
const DESK_HOTSPOTS: Hotspot[] = [
    { label: "Work", href: "#work", box: [22, 10, 70, 42] },
    { label: "About me", href: "/more-about-me", box: [6, 35, 14, 17] },
    { label: "Hobbies", href: "/hobbies", box: [140, 11, 48, 32] },
    { label: "Résumé", href: RESUME_URL, box: [99, 45, 14, 7], external: true },
    { label: "LinkedIn", href: LINKEDIN_URL, box: [114, 46, 14, 6], external: true },
];

export default function Home() {
    return (
        <article className="home">
            <WindowHero hotspots={DESK_HOTSPOTS}>
                <h1 className="intro__name">Geetika Shukla</h1>
                <p className="intro__role">Multi-disciplinary designer</p>
                <p className="intro__bio">
                    I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning
                    brand, exhibition, web, and product design.
                </p>
                <div className="intro__links">
                    <Link href="/more-about-me" className="intro__link">More about me</Link>
                    <a href={RESUME_URL} className="intro__link" target="_blank" rel="noopener noreferrer">Résumé</a>
                    <a href={LINKEDIN_URL} className="intro__link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                <p className="intro__hint">Scroll to open the window</p>
            </WindowHero>

            <ol id="work" className="timeline" aria-label="Work timeline">
                {timeline.map((period) => (
                    <li
                        key={period.org}
                        className="timeline__period"
                        style={{ "--count": period.projects.length } as CSSProperties}
                    >
                        <div className="timeline__label">
                            <span className="timeline__dates">{period.dates}</span>
                            <h2 className="timeline__org">{period.org}</h2>
                        </div>

                        {period.projects.length > 0 && (
                            <ul className="timeline__tiles">
                                {period.projects.map((project, index) => (
                                    <TimelineTile key={project.title} index={index} {...project} />
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ol>
        </article>
    );
}
