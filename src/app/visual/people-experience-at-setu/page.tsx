// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from 'next/image';

// INTERNAL DEPS ===============================================================
import {
    Heading1,
    Portion,
    Row,
    Div,
    Text
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "../visual-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import PeopleOpsHero from "@/assets/images/people-ops-hero.svg";
import Onboarding from "@/assets/images/id-cards.svg";
import Engagement1 from "@/assets/images/engagement-1.svg";
import Engagement2 from "@/assets/images/engagement-2.svg";
import Hiring1 from "@/assets/images/hiring-1.svg";
import Hiring2 from "@/assets/images/hiring-2.svg";
import Hiring3 from "@/assets/images/hiring-3.svg";


export default function Home()
{
    return (
        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        People experience at Setu
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small" marginTop="nano">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            Caring with tough love is one of the core values at Setu.
                        </Text>
                        <Text>
                            Along with my favourite People Ops team, I worked on crafting a memorable employee experience  and creating some keepsakes for our dear Setuzens.
                        </Text>
                    </Div>
                </Portion>
            </Row >


            <Row layoutAsFlexbox className="people-hero">
                <PeopleOpsHero height="564px" />
            </Row>


            <Row horizontallyCenterThis>
                <Text className="credits" align="center"><em>A special thanks to Sujan for keeping the bar high, and to Madhuri for being an excellent sounding board.</em></Text>
            </Row>


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="nano">
                <Portion desktopSpan="5" marginBottom="nano">
                    <h5>Discovery</h5>
                </Portion>

                <Portion desktopSpan="19">
                    <Text marginBottom="tiny">
                        We began by designing a thoughtfully crafted team page for Setu to showcase its vibrant work culture. I, along with a few other designers from the team worked on the webpages design and the icons here.
                    </Text>

                    <Text marginBottom="tiny">
                        <Link href="https://setu.co/team/" target="_blank" rel="noopener noreferrer">See team page</Link>
                    </Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge">
                <Portion desktopSpan="whole">
                    <Text>
                        A few hiring posters from the templates I created for ad hoc requirements.
                    </Text>
                </Portion>
            </Row>

            <Portion layoutAsFlexbox className="images-in-a-row" marginBottom="small" marginTop="nano">
                <Hiring1 height="180px" />
                <Hiring2 height="180px" />
                <Hiring3 height="180px" />
            </Portion>


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="nano">
                <Portion desktopSpan="5" marginBottom="nano">
                    <h5>Onboarding</h5>
                </Portion>

                <Portion desktopSpan="19">
                    <Text marginBottom="tiny">
                        We created a range of essential assets, including company swag, ID cards, onboarding decks, wiki pages, emails, and an org chart.                        </Text>
                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginTop="none" marginBottom="small" horizontallyCenterThis>
                <Onboarding width="1000px" className="people-images responsive-image" />
            </Row>


            <Row horizontalPadding="huge" marginTop="medium" marginBottom="nano">
                <Portion desktopSpan="5" marginBottom="nano">
                    <h5>Engagement</h5>
                </Portion>

                <Portion desktopSpan="19">
                    <Text marginBottom="tiny">
                        In addition to the essentials, we experimented with adding to the existing company values, launching engaging referral campaigns, and company swag.
                    </Text>
                </Portion>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="tiny" marginBottom="tiny" horizontallyCenterThis>
                <Engagement1 width="1000px" className="people-images responsive-image" />
                <Engagement2 width="1000px" className="people-images responsive-image" />
            </Row>


        </article >
    );
};


