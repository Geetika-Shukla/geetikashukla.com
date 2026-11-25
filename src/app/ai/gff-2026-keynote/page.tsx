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
import questions from "@/assets/images/glimpses/keynote/questions.webp";
import people from "@/assets/images/glimpses/keynote/people.webp";
import onboarding from "@/assets/images/glimpses/keynote/onboarding.webp";
import underwriting from "@/assets/images/glimpses/keynote/underwriting.webp";
import collections from "@/assets/images/glimpses/keynote/collections.webp";
import security from "@/assets/images/glimpses/keynote/security.webp";

// TYPES =======================================================================
import type { Metadata } from "next";
import type { BentoRow } from "@/components/Bento/Bento";

export const metadata: Metadata = {
    title       : "The invisible future of finance — Geetika Shukla",
    description : "A keynote deck for the CEO of Reserve Bank Innovation Hub at Global Fintech Fest 2026.",
};

const DECK = "/keynotes/gff-2026.html";
const CLIPS = "/glimpses/keynote";

// The deck's other chapters, playing as they do on stage
const CHAPTERS: BentoRow[] = [
    { ratio: 2.67, items: [
        { image: questions, clip: `${CLIPS}/questions.mp4`, span: 6, alt: "Access, usage and quality: the three questions, building one by one" },
        { image: people, clip: `${CLIPS}/people.mp4`, span: 3, alt: "The people the talk follows, gathering on the slide" },
    ] },
    { ratio: 5.33, items: [
        { image: underwriting, clip: `${CLIPS}/underwriting.mp4`, span: 3, alt: "Underwriting: a charge on paper, then on the Unified Lending Interface" },
        { image: collections, clip: `${CLIPS}/collections.mp4`, span: 3, alt: "Collections: a missed payment that isn't a default" },
        { image: security, clip: `${CLIPS}/security.mp4`, span: 3, alt: "Security: catching a fraud before the money moves" },
    ] },
];

export default function GffKeynotePage() {

    return (

        <article className="project-page ai-page">


            {/* HERO SECTION */}

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                {/* A little wider than usual, so the title sits on two or three lines */}
                <Portion desktopSpan="12" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        The invisible future of finance
                    </Heading1>
                </Portion>

                <Portion desktopSpan="1" hideOnMobile />

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

            {/* THE DECK, AND WHO IT WAS MADE WITH */}

            <Row horizontalPadding="huge" marginTop="small">
                <Portion>
                    <DeckPlayer src={DECK} title="The invisible future of finance: the keynote deck" />
                    <Text className="ai-credit ai-team">
                        For Sahil Kini, with Naresh Singaravelu, Rhea Sinha and Rajat Mittal
                    </Text>
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

        </article>
    );
}
