// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import { Heading1, Portion, Row, Div, Text } from "fictoan-react";

// COMPONENTS ==================================================================
import { Bento, Clip } from "@/components/Bento/Bento";
import { DeckPlayer } from "./DeckPlayer";

// STYLES ======================================================================
import "../../experiences/experiences-projects.css";
import "../../experiences/page-experiences.css";
import "../ai-pages.css";

// ASSETS ======================================================================
// Stills of each chapter's clip before it plays (npm run glimpses retakes them)
import onboarding from "@/assets/images/glimpses/keynote/onboarding.webp";
import collections from "@/assets/images/glimpses/keynote/collections.webp";
import registry from "@/assets/images/glimpses/keynote/registry.webp";
import screening from "@/assets/images/glimpses/keynote/screening.webp";

// TYPES =======================================================================
import type { Metadata } from "next";
import type { BentoRow } from "@/components/Bento/Bento";

export const metadata: Metadata = {
    title       : "The invisible future of finance — Geetika Shukla",
    description : "A keynote deck for the CEO of Reserve Bank Innovation Hub at Global Fintech Fest 2026.",
};

const DECK = "/keynotes/gff-2026.html";
const CLIPS = "/glimpses/keynote";

// The deck's other chapters, playing as they do on stage: collections beside
// the smart registry coming together (slide 40, just its animation), then a
// transfer screened against it (slide 42) across the grid
const CHAPTERS: BentoRow[] = [
    { ratio: 2.67, items: [
        { image: collections, clip: `${CLIPS}/collections.mp4`, span: 6, alt: "Collections: a missed payment that isn't a default" },
        { image: registry, clip: `${CLIPS}/registry.mp4`, span: 3, alt: "The DPIP smart registry, with banks, LEAs and the DoT joining it, and a record coming in" },
    ] },
    { ratio: 1138 / 640, items: [
        { image: screening, clip: `${CLIPS}/screening.mp4`, span: 9, alt: "Security: Rukmini's bank screens a transfer against data from the smart registry" },
    ] },
];

export default function GffKeynotePage() {

    return (

        <article className="project-page ai-page">


            {/* HERO SECTION */}

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                {/* Wider than usual, so the title sits on two lines, "future of finance" whole on the second */}
                <Portion desktopSpan="13" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        The invisible<br />future&nbsp;of&nbsp;finance
                    </Heading1>
                </Portion>

                <Portion desktopSpan="11" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            A keynote deck for the CEO of Reserve Bank Innovation Hub at Global Fintech Fest 2026, built
                            using AI.
                        </Text>
                        <Text marginBottom="tiny">
                            It follows people the financial system still leaves out, through four parts of lending:
                            onboarding, underwriting, collections and security.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            {/* ONBOARDING: A SLIDESHOW OF ITS OWN */}

            <Row horizontalPadding="huge" className="ai-section">
                <Portion>
                    <h2 className="ai-section__title">Onboarding</h2>
                    <p className="ai-section__lead">
                        Sunita Devi opens a current account for her shop: her papers, read and checked, then an identity
                        built from what she already has.
                    </p>
                    <figure className="ai-feature">
                        <Clip glimpse={{ image: onboarding, clip: `${CLIPS}/onboarding.mp4`, alt: "The onboarding chapter, slide by slide" }} controls />
                    </figure>
                </Portion>
            </Row>


            {/* THE OTHER CHAPTERS */}

            <Row horizontalPadding="huge" className="ai-section">
                <Portion>
                    <h2 className="ai-section__title">The other chapters</h2>
                    <Bento rows={CHAPTERS} />
                </Portion>
            </Row>



            {/* THE WHOLE DECK, AND WHO IT WAS MADE WITH */}

            <Row horizontalPadding="huge" className="ai-section">
                <Portion>
                    <h2 className="ai-section__title">The deck</h2>
                    <DeckPlayer
                        src={DECK}
                        title="The invisible future of finance: the keynote deck"
                        credit="For Sahil Kini, with Naresh Singaravelu, Rhea Sinha and Rajat Mittal"
                    />
                </Portion>
            </Row>

        </article>
    );
}
