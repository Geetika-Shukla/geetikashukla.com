// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import { Heading1, Portion, Row, Div, Text } from "fictoan-react";

// COMPONENTS ==================================================================
import { Bento } from "@/components/Bento/Bento";
import { DeckPlayer } from "./DeckPlayer";

// STYLES ======================================================================
import "../../experiences/experiences-projects.css";
import "../../experiences/page-experiences.css";
import "../ai-pages.css";

// ASSETS ======================================================================
// Stills of each glimpse before it plays (npm run glimpses retakes onboarding
// and collections; the registry and screening are screen recordings)
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

// Glimpses of the deck, playing as they do on stage: onboarding across the
// grid, collections beside the smart registry coming together (slide 40), then
// a transfer screened against it (slide 42), across the grid. The registry and
// the screening are screen recordings (originals in media-sources/).
const GLIMPSES: BentoRow[] = [
    { ratio: 16 / 9, items: [
        { image: onboarding, clip: `${CLIPS}/onboarding.mp4`, span: 9, alt: "The onboarding chapter, slide by slide",
            caption: "Onboarding: Sunita Devi opens a current account for her shop: her papers, read and checked, then an identity built from what she already has." },
    ] },
    { ratio: 3.2, items: [
        { image: collections, clip: `${CLIPS}/collections.mp4`, span: 5, alt: "Collections: a missed payment that isn't a default",
            caption: "Collections: a bounce read as a timing failure, not a default, and the borrower reached before she misses again." },
        { image: registry, clip: `${CLIPS}/registry.mp4`, span: 4, alt: "The DPIP smart registry, with banks, LEAs and the DoT joining it, and a record coming in",
            caption: "DPIP, a smart registry: banks, law enforcement and telecom feed it what they know about fraud." },
    ] },
    { ratio: screening.width / screening.height, items: [
        { image: screening, clip: `${CLIPS}/screening.mp4`, span: 9, alt: "Security: Rukmini's bank screens a transfer against the smart registry, and stops it",
            caption: "Security: Rukmini sends money to an account opened yesterday, and her bank checks it against the registry before it goes." },
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


            {/* GLIMPSES */}

            <Row horizontalPadding="huge" className="ai-section">
                <Portion>
                    <h2 className="ai-section__title">Glimpses</h2>
                    <Bento rows={GLIMPSES} />
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
