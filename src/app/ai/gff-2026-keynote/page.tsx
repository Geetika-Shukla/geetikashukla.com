// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import { Heading1, Portion, Row, Div, Text } from "fictoan-react";

// COMPONENTS ==================================================================
import { KeynotePreview } from "./KeynotePreview";

// STYLES ======================================================================
import "../../experiences/experiences-projects.css";
import "../../experiences/page-experiences.css";
import "./page-keynote.css";

// TYPES =======================================================================
import type { Metadata } from "next";

export const metadata: Metadata = {
    title       : "The invisible future of finance — Geetika Shukla",
    description : "A keynote deck for the CEO of Reserve Bank Innovation Hub at Global Fintech Fest 2026.",
};

const DECK = "/keynotes/gff-2026.html";

// PLACEHOLDERS: swap in the two photos from GFF (and what each shows)
const PHOTOS = ["Photo from GFF 2026", "Photo from GFF 2026"];

export default function GffKeynotePage() {

    return (

        <article className="project-page">


            {/* HERO SECTION */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                {/* A wider column than usual, so the title sits on two lines */}
                <Portion desktopSpan="15" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        The invisible future of finance
                    </Heading1>
                </Portion>

                <Portion desktopSpan="1" hideOnMobile />

                <Portion desktopSpan="8" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            A keynote deck for the CEO of Reserve Bank Innovation Hub at Global Fintech Fest
                            2026, built using AI.
                        </Text>
                    </Div>
                </Portion>
            </Row>


            {/* THE KEYNOTE: photos from the day, and the deck itself */}

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion desktopSpan="whole">
                    <h5>The keynote</h5>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginBottom="medium">
                <Portion desktopSpan="8" mobileSpan="whole">
                    <div className="keynote__photos">
                        {PHOTOS.map((label, i) => (
                            <div key={i} className="keynote__photo" role="img" aria-label={label}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <circle cx="9" cy="10" r="1.6" />
                                    <path d="m4 17 5-4 4 3 3-2 4 3" />
                                </svg>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </Portion>

                <Portion desktopSpan="16" mobileSpan="whole">
                    <KeynotePreview src={DECK} title="The invisible future of finance: the keynote deck" />
                </Portion>
            </Row>

        </article>
    );
}
