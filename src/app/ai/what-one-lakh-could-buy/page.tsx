// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import { Heading1, Portion, Row, Div, Text } from "fictoan-react";

// COMPONENTS ==================================================================
import { Clip } from "@/components/Bento/Bento";

// STYLES ======================================================================
import "../../experiences/experiences-projects.css";
import "../../experiences/page-experiences.css";
import "../ai-pages.css";

// ASSETS ======================================================================
// The walkthrough's still, from a screen recording of the story (the original
// is kept out of the repo, in media-sources/)
import walkthrough from "@/assets/images/glimpses/one-lakh/walkthrough.webp";

// TYPES =======================================================================
import type { Metadata } from "next";

export const metadata: Metadata = {
    title       : "What ₹1 lakh could buy — Geetika Shukla",
    description : "A data story on the RBIH Indian Financial Data Atlas: one sum, carried from 2001 to 2026.",
};

const STORY = "https://dbie.rbihub.in/stories/what-one-lakh-bought";
const CLIPS = "/glimpses/one-lakh";

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;

export default function OneLakhPage() {

    return (

        <article className="project-page ai-page">


            {/* HERO SECTION */}

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                {/* A little wider than usual, so the title sits on two lines, the sum kept whole on the first */}
                <Portion desktopSpan="12" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        What ₹1&nbsp;lakh<br />could buy
                    </Heading1>
                </Portion>

                <Portion desktopSpan="1" hideOnMobile />

                <Portion desktopSpan="11" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            A data story on the RBIH Indian Financial Data Atlas.
                        </Text>
                        <Text marginBottom="tiny">
                            This story takes one sum through 25 years and shows what it bought each year in gold,
                            silver, a mason’s days, dollars and wheat, and what it is worth today.
                        </Text>
                        <a className="ai-link" href={STORY} target="_blank" rel="noopener noreferrer">
                            Read the story <Arrow />
                        </a>
                    </Div>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="small">
                <Portion>
                    <figure className="ai-feature" style={{ aspectRatio: `${walkthrough.width} / ${walkthrough.height}` }}>
                        <Clip glimpse={{ image: walkthrough, clip: `${CLIPS}/walkthrough.mp4`, alt: "The story, scrolled through from the title to the data" }} controls />
                    </figure>
                    <Text className="ai-credit ai-team">
                        Atlas by Sujan Sundareswaran · Other stories by Naresh Singaravelu, Vishes Jena and Swati Mishra
                    </Text>
                </Portion>
            </Row>

        </article>
    );
}
