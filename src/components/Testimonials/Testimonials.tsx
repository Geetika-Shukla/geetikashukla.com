// EXTERNAL DEPS ===============================================================
import React from "react";

// DATA ========================================================================
import { TESTIMONIALS } from "@/data/about";

// STYLES ======================================================================
import "./testimonials.css";

// A paragraph, with its highlight (if it's in this paragraph) marked
const Paragraph = ({ text, highlight }: { text: string; highlight: string }) => {
    const at = text.indexOf(highlight);
    if (at < 0) return <p>{text}</p>;
    return (
        <p>
            {text.slice(0, at)}
            <mark>{highlight}</mark>
            {text.slice(at + highlight.length)}
        </p>
    );
};

/*
 * Kind words from people I've worked with: the heading in the left third, the
 * cards as a bento in the rest (the first across the top, its words in two
 * columns; the others side by side below). Each card has a large quote mark,
 * the heart of the quote marked as if with a highlighter, and who said it.
 */
export const Testimonials = () => (
    <section id="kind-words" className="testimonials" aria-labelledby="testimonials-title">
        <div className="testimonials__intro">
            <h2 id="testimonials-title" className="testimonials__title">From those I’ve worked with</h2>
            <p className="testimonials__lede">Colleagues and clients, in their own words.</p>
        </div>

        <ul className="testimonials__cards">
            {TESTIMONIALS.map(({ quote, highlight, name, role, profile }) => (
                <li key={name} className="testimonials__card">
                    <span className="testimonials__mark" aria-hidden="true">“</span>
                    <blockquote className="testimonials__quote">
                        {quote.map((paragraph, i) => <Paragraph key={i} text={paragraph} highlight={highlight} />)}
                    </blockquote>
                    <a className="testimonials__person" href={profile} target="_blank" rel="noopener noreferrer">
                        <span className="testimonials__initials" aria-hidden="true">
                            {name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                        </span>
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
