// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import {
    Button,
    Header,
    Card,
    Element,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text,
    Footer,
    CodeBlock
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "@/styles/home.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import VDCover from "@/assets/images/vd-cover.svg";
import TypeCover from "@/assets/images/type-cover.svg";
import ExpCover from "@/assets/images/exp-cover.svg";


export default function Home() {

    return (
        <article id="page-home">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" hideOnMobile>
                    <GreenStar alt="stars" height="56px" />
                </Portion>
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        Hello there!
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small">
                        <Text>I’m Geetika, a multidisciplinary designer. I’m an eager learner and a pre-crastinator.</Text>
                        <br />

                        <Text>Previously, I’ve worked as an architect. I’ve also dabbled in exhibition design, brand design, user
                            interface and
                            experience design, web design, and a little bit of illustrations and coding too.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" hideOnMobile>
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row className="category-row" layoutAsFlexbox horizontalPadding="huge" marginTop="none" horizontallyCenterThis>

                <Link href="/visual">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <VDCover />
                        <Heading6 className="category-thumbnail-text" >Visual</Heading6>
                    </Card>
                </Link>

                <Link href="/type">
                    <Card href="@/" className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <TypeCover />
                        <Heading6 className="category-thumbnail-text" >Type</Heading6>
                    </Card>
                </Link>

                <Link href="/experiences">
                    <Card className="category-thumbnail" shape="rounded" horizontalMargin="micro">
                        <ExpCover />
                        <Heading6 className="category-thumbnail-text" >Experiences</Heading6>
                    </Card>
                </Link>
            </Row>


            <Row horizontalPadding="huge" marginBottom="tiny">
                <Portion desktopSpan="12" marginTop="medium">
                    <h5>From those I've worked with &nbsp; 👩🏻‍💻
                    </h5>
                </Portion>
            </Row>

            <Row className="platform-scroll-section" horizontalMargin="large" marginBottom="medium">
                <Div className="scroll-container">

                    <Card className="testimonial-card" bgColor="green-light10-opacity5" borderColor="green-light50-opacity10">
                        <Text marginBottom="tiny">
                            Geetika is one of my favourite people to collaborate with at Setu! Her work is filled with so much creativity, thought, and an incredible attention to not just detail, but craft. There’s a certain magic in everything she creates and every single time, she amazes me with the kind of work she puts out—I go to her with just a basic outline, and she transforms it into a masterpiece that never fails to leave me in awe. Couldn’t be more grateful for the outstanding people experience pieces she’s helped bring to life for our team.                        </Text>
                        <Text marginBottom="small">
                            Beyond work, she's also an amazing person at heart and a joy to be around—kind, thoughtful, and someone you can always count on to keep things real. Always rooting for you, Geetika ❤️</Text>
                        <Link href="https://www.linkedin.com/in/ruby-jane/" target="_blank" rel="noopener noreferrer">
                            <h6>
                                — Ruby Jane Antony<br />
                                Director, People Ops, Setu
                            </h6>
                        </Link>
                    </Card>

                    <Card className="testimonial-card" bgColor="violet-light10-opacity5" borderColor="violet-light50-opacity10">
                        <Text marginBottom="tiny">
                            I had the pleasure of working with Geetika to design the brand identity for my business, and I couldn't be more thrilled with the results! From the start, she took the time to understand my vision, values, and the essence of my brand.
                        </Text>
                        <Text marginBottom="tiny">
                            The attention to detail, creativity, and expertise she brought to the table was evident in every aspect of the design. The logo, colour palette, typography, and overall style feel perfectly aligned with the identity I wanted to create.
                        </Text>
                        <Text marginBottom="small">
                            What truly stood out was Geetika’s professionalism and communication throughout the process. She was very responsive, open to feedback, and delivered on time.
                        </Text>
                        <Link href="https://www.linkedin.com/in/sandeep-atmaram-234100217/" target="_blank" rel="noopener noreferrer">
                            <h6>
                                — Sandeep Atmaram<br />
                                Co-founder, Heads Up for Tails
                            </h6>
                        </Link>
                    </Card>

                    <Card className="testimonial-card" bgColor="green-light10-opacity5" borderColor="green-light50-opacity10">
                        <Text marginBottom="tiny">
                            I had the privilege of working with Geetika while in the People Ops team at Setu, where she was our go-to designer for all things visual. From custom letterheads and posters to mailers and swag, her work was always exceptional. She has a knack for turning half-baked ideas into designs that far exceed expectations—both visually striking and versatile.
                        </Text>
                        <Text  marginBottom="small">
                            For anyone looking for a designer with creativity, clarity, and attention to detail, Geetika is an outstanding choice!
                        </Text>
                        <Link href="https://www.linkedin.com/in/asveenkaur/" target="_blank" rel="noopener noreferrer">
                            <h6>
                                — Asveen Kaur <br />
                                Manager, People Ops, Setu
                            </h6>
                        </Link>
                    </Card>

                </Div>
            </Row>

        </article >
    );
}
