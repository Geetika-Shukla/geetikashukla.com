// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from "next/image";
// INTERNAL DEPS ===============================================================
import {
    Heading1,
    Portion,
    Row,
    Div,
    Text,
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "../visual-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import PeopleOpsHero from "@/assets/images/people-ops-hero.webp";
import Hiring1 from "@/assets/images/hiring-1.svg";
import Hiring2 from "@/assets/images/hiring-2.svg";
import Hiring3 from "@/assets/images/hiring-3.svg";
import Onboarding from "@/assets/images/id-cards.webp";
import Engagement1 from "@/assets/images/engagement-1.webp";
import Engagement2 from "@/assets/images/engagement-2.webp";



export default function PeopleExpPage() {

    return (

        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        People experience at Setu
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height={32} width={32} />
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
                <Image src={PeopleOpsHero} height={564} alt="People Ops illustration"/>
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
                        <Link href="https://setu.co/team/">See team page</Link>
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

            <Row horizontalPadding="huge">
            <Portion className="images-in-a-row" marginBottom="small" marginTop="nano">
                <Hiring1 width={330}  alt="hiring-poster"/>
                <Hiring2 width={330} alt="hiring-poster"/>
                <Hiring3 width={330} alt="hiring-poster"/>
            </Portion>
            </Row>


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
                <Image src={Onboarding} width={1000} className="people-images responsive-image" alt="onboarding-images"/>
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
                <Image src={Engagement1} width={1000} className="people-images responsive-image" alt="engagement-images"/>
                <Image src={Engagement2} width={1000} className="people-images responsive-image" alt="engagement-images"/>
            </Row>

        </article>

    );
};

