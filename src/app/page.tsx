// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// COMPONENTS ==================================================================
import { TimelineRow } from "@/components/TimelineRow/TimelineRow";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "@/styles/home.css";

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";
const LINKEDIN_URL = "https://www.linkedin.com/in/geetikashukla/";

export default function Home() {
    return (
        <article className="home container">
            <aside className="home__intro">
                <h1 className="home__name">Geetika Shukla</h1>
                <p className="home__role">Multi-disciplinary designer</p>

                <p className="home__bio">
                    I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning
                    brand, exhibition, web, and product design.
                </p>
                <p className="home__bio">
                    I’ve spent the last 5 years designing 0-1 fintech B2B SaaS products—applying systems
                    thinking with purposeful visual design to turn complex ideas into intuitive user journeys.
                </p>

                <div className="home__links">
                    <Link href="/more-about-me" className="home__link">More about me</Link>
                    <a href={RESUME_URL} className="home__link" target="_blank" rel="noopener noreferrer">Résumé</a>
                    <a href={LINKEDIN_URL} className="home__link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </aside>

            <ol className="timeline" aria-label="Work timeline">
                {timeline.map((period) => (
                    <li key={period.org} className="timeline__period">
                        <div className="timeline__header">
                            <span className="timeline__dates">{period.dates}</span>
                            <h2 className="timeline__org">{period.org}</h2>
                            <p className="timeline__role">{period.role}</p>
                            {period.summary && <p className="timeline__summary">{period.summary}</p>}
                        </div>

                        {period.projects.length > 0 && (
                            <ul className="timeline__projects">
                                {period.projects.map((project) => (
                                    <TimelineRow key={project.title} {...project} />
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ol>
        </article>
    );
}
