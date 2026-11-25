// EXTERNAL DEPS ===============================================================
import React from "react";

// DATA ========================================================================
import { TESTIMONIALS } from "@/data/about";

// STYLES ======================================================================
import "./testimonials.css";

/*
 * Kind words from people I've worked with: the heading in the left third, the
 * cards as a bento in the rest (the first across the top, its words in two
 * columns; the others side by side below). Each card has a large quote mark,
 * the words, and who said them.
 */
export const Testimonials = () => (
    <section id="kind-words" className="testimonials" aria-labelledby="testimonials-title" data-snap>
        <div className="testimonials__intro">
            <h2 id="testimonials-title" className="testimonials__title">From those I’ve worked with</h2>
        </div>

        <ul className="testimonials__cards">
            {TESTIMONIALS.map(({ quote, name, role, profile }) => (
                <li key={name} className="testimonials__card" data-snap>
                    <span className="testimonials__mark" aria-hidden="true">“</span>
                    <blockquote className="testimonials__quote">
                        {quote.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    </blockquote>
                    <a className="testimonials__person" href={profile} target="_blank" rel="noopener noreferrer">
                        <span>
                            <span className="testimonials__name">{name}</span>
                            <span className="testimonials__role">{role}</span>
                        </span>
                        <svg className="testimonials__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                    </a>
                </li>
            ))}
        </ul>
    </section>
);
