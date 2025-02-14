// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from 'next/image';

// INTERNAL DEPS ===============================================================
import {
    Card,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text, Heading3
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "./page-experiences.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import HDFCThumbnail from "@/assets/images/thumbnail-for-hdfc.svg";
import FaveThumbnail from "@/assets/images/thumbnail-for-fave.svg";
import Guideline1 from "@/assets/images/guidelines-1.svg";
import Guideline2 from "@/assets/images/guidelines-2.svg";
import Guideline3 from "@/assets/images/guidelines-3.svg";
import Guideline4 from "@/assets/images/guidelines-4.svg";
import Guideline5 from "@/assets/images/guidelines-5.svg";
import Guideline6 from "@/assets/images/guidelines-6.svg";
import {cyan} from "next/dist/lib/picocolors";


const ExperiencePage = () => {
    return (
        <article id="page-experiences">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" hideOnMobile>
                    <GreenStar alt="star" height="56px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        All things interface
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            While designing experiences at Setu, I have focused on the bigger picture, striving to enhance the entire user journey—from discovery to onboarding and engagement.
                            </Text>
                        <Text>
                            My work spans multiple platforms, from web design to native mobile applications.
                        </Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" hideOnMobile>
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion className="center-flexbox" layoutAsFlexbox verticallyCenterItems>

                    <Link href="/">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <FaveThumbnail alt="Product discovery at Setu" />
                            <Heading6 className="project-thumbnail-text" >Product discovery at Setu</Heading6>
                        </Card>
                    </Link>


                    <Link href="/">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <HDFCThumbnail alt="hdfc" />
                            <Heading6 className="project-thumbnail-text" >Digital journeys for HDFC Bank</Heading6>
                        </Card>
                    </Link>

                    <Link href="/">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <FaveThumbnail alt="Partnerships at Setu" />
                            <Heading6 className="project-thumbnail-text" >Path to partnerships at Setu</Heading6>
                        </Card>
                    </Link>

                    <Link href="/">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <FaveThumbnail alt="Fave" />
                            <Heading6 className="project-thumbnail-text" >Save — Personal Finance App</Heading6>
                        </Card>
                    </Link>

                </Portion>
            </Row>

            <Row horizontalPadding="huge" marginBottom="tiny">
                <Portion desktopSpan="12" marginTop="small">
                <h5>From those I've worked with &nbsp; 👩🏻‍💻
                    </h5>
                </Portion>
            </Row>
            <Row className="platform-scroll-section" horizontalMargin="large" marginBottom="medium">
                <Div className="scroll-container">

                    <Card className="testimonial-card" bgColor="green-light10-opacity5" borderColor="green-light50-opacity10">
                        <Text marginBottom="tiny">
                            I had the privilege of working with Geetika while I was in the People Ops team at Setu, where she was our go-to designer for all visual communications. From custom letterheads for performance letters to posters, mailers, and employee swag, her work has always been exceptional.
                        </Text>
                        <Text marginBottom="tiny">
                            Geetika has a unique ability to take basic, half-baked ideas and transform them into designs that far exceed expectations. Her work is not only visually striking but also highly versatile and reusable across different contexts, making our processes more efficient.
                        </Text>
                        <Text marginBottom="tiny">
                            A standout example is when we asked her to design ID cards for the team—she created a design that was custom for each team and individual, turning what could have been a simple formality into a cherished keepsake for every team member. Her work truly elevated the People Ops team’s outputs.
                        </Text>
                        <Text marginBottom="small">
                            For anyone seeking a designer who combines creativity, clarity, and a keen understanding of purpose, Geetika is an outstanding choice.
                        </Text>
                        <Link href="https://www.linkedin.com/in/asveenkaur/" target="_blank" rel="noopener noreferrer">
                            <h6 align="right">
                                —Asveen Kaur <br />
                                Manager, People Ops, Setu
                            </h6>
                        </Link>
                        </Card>

                    <Card className="testimonial-card" bgColor="violet-light10-opacity5" borderColor="violet-light50-opacity10">
                        <Text marginBottom="tiny">
                            I had the privilege of working with Geetika while I was in the People Ops team at Setu, where she was our go-to designer for all visual communications. From custom letterheads for performance letters to posters, mailers, and employee swag, her work has always been exceptional.
                        </Text>
                        <Text marginBottom="tiny">
                            Geetika has a unique ability to take basic, half-baked ideas and transform them into designs that far exceed expectations. Her work is not only visually striking but also highly versatile and reusable across different contexts, making our processes more efficient.
                        </Text>
                        <Text marginBottom="small">
                            A standout example is when we asked her to design ID cards for the team—she created a design that was custom for each team and individual, turning what could have been a simple formality into a cherished keepsake for every team member. Her work truly elevated the People Ops team’s outputs.
                        </Text>
                        <Link href="https://www.linkedin.com/in/asveenkaur/" target="_blank" rel="noopener noreferrer">
                            <h6 align="right">
                                —Asveen Kaur <br />
                                Manager, People Ops, Setu
                            </h6>
                        </Link>
                    </Card>

                    <Card className="testimonial-card" bgColor="green-light10-opacity5" borderColor="green-light50-opacity10">
                        <Text marginBottom="tiny">
                            I had the privilege of working with Geetika while I was in the People Ops team at Setu, where she was our go-to designer for all visual communications. From custom letterheads for performance letters to posters, mailers, and employee swag, her work has always been exceptional.
                        </Text>
                        <Text marginBottom="tiny">
                            Geetika has a unique ability to take basic, half-baked ideas and transform them into designs that far exceed expectations. Her work is not only visually striking but also highly versatile and reusable across different contexts, making our processes more efficient.
                        </Text>
                        <Text marginBottom="small">
                            A standout example is when we asked her to design ID cards for the team—she created a design that was custom for each team and individual, turning what could have been a simple formality into a cherished keepsake for every team member. Her work truly elevated the People Ops team’s outputs.
                        </Text>
                        <Link href="https://www.linkedin.com/in/asveenkaur/" target="_blank" rel="noopener noreferrer">
                            <h6 align="right">
                                —Asveen Kaur <br />
                                Manager, People Ops, Setu
                            </h6>
                        </Link>
                    </Card>

                    </Div>
            </Row>
        </article >
    );
};

export default ExperiencePage;

