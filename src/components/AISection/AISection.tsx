// EXTERNAL DEPS ===============================================================
import React from "react";

// DATA ========================================================================
import { AI_PROJECTS } from "@/data/ai-projects";

// STYLES ======================================================================
import "./ai-section.css";

// Projects built entirely with AI (see data/ai-projects.ts; placeholders for now)
export const AISection = () => (
    <section id="ai" className="ai" aria-labelledby="ai-title">
        <div className="ai__inner">
            <h2 id="ai-title" className="ai__title">Built with AI</h2>
            <p className="ai__lede">Projects I built entirely using AI.</p>

            <ul className="ai__cards">
                {AI_PROJECTS.map(({ title, description, tools, href, placeholder }, i) => {
                    const body = (
                        <>
                            <span className="ai__media" aria-hidden="true">
                                <svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg>
                                {placeholder && <span className="ai__soon">Coming soon</span>}
                            </span>
                            <span className="ai__name">{title}</span>
                            <span className="ai__description">{description}</span>
                            <span className="ai__tools">
                                {tools.map((tool, t) => <span key={t} className="ai__tool">{tool}</span>)}
                            </span>
                        </>
                    );
                    return (
                        <li key={i} className="ai__card" data-placeholder={placeholder}>
                            {href ? <a href={href} className="ai__link">{body}</a> : <div className="ai__link">{body}</div>}
                        </li>
                    );
                })}
            </ul>
        </div>
    </section>
);
