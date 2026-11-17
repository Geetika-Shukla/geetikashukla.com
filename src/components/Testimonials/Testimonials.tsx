// EXTERNAL DEPS ===============================================================
import React from "react";

// DATA ========================================================================
import { TESTIMONIALS } from "@/data/about";

// STYLES ======================================================================
import "./testimonials.css";

// Kind words from people I've worked with, as quote cards
export const Testimonials = () => (
    <section id="kind-words" className="testimonials" aria-labelledby="testimonials-title">
        <h2 id="testimonials-title" className="testimonials__title">From those I’ve worked with</h2>

        <ul className="testimonials__cards">
            {TESTIMONIALS.map(({ quote, name, role, profile }) => (
                <li key={name} className="testimonials__card">
                    <blockquote className="testimonials__quote">
                        {quote.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    </blockquote>
                    <a className="testimonials__person" href={profile} target="_blank" rel="noopener noreferrer">
                        <span className="testimonials__initials" aria-hidden="true">
                            {name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                        </span>
                        <span>
                            <span className="testimonials__name">{name}</span>
                            <span className="testimonials__role">{role}</span>
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    </section>
);
