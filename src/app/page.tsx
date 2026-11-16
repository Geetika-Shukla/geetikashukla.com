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
import type { DeskLink } from "@/components/WindowHero/DeskScene";

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";
const LINKEDIN_URL = "https://www.linkedin.com/in/geetikashukla/";

// Objects on the desk that link to parts of the site
const DESK_LINKS: DeskLink[] = [
    { object: "monitor", label: "Work", href: "#work" },
    { object: "echo", label: "About me", href: "/more-about-me" },
    { object: "shelf", label: "Hobbies", href: "/hobbies" },
    { object: "journals", label: "Résumé", href: RESUME_URL, external: true },
    { object: "phone", label: "LinkedIn", href: LINKEDIN_URL, external: true },
];

export default function Home() {
    return (
        <article className="home">
            <WindowHero deskLinks={DESK_LINKS}>
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
            </WindowHero>

            <ol id="work" className="timeline pixel-grid" aria-label="Work timeline">
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
