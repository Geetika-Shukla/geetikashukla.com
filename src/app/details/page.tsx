// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";
import Image from 'next/image';

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
import "./page-details.css";

// ASSETS ======================================================================
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import YellowStar from "@/assets/images/yellow-star.svg";
import MyPhoto from "@/assets/images/me.svg";
import NIDLogo from "@/assets/images/nid-logo.svg";
import FOALogo from "@/assets/images/foa-logo.svg";
import SetuLogo from "@/assets/images/setu-logo.svg";
import AtherLogo from "@/assets/images/ather-logo.svg";
import NSLogo from "@/assets/images/ns-logo.svg";




const DetailsPage = () => {
    return (
        <article id="page-details">

            <Row layoutAsGrid className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" showOnlyOnDesktop>
                    <GreenStar className="star" alt="stars" height="56px" />
                </Portion>
                <Portion desktopSpan="7">
                    <Heading1 className="hero-heading">
                        The story so far
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar className="star"  alt="star" height="32px" />
                </Portion>
                <Portion desktopSpan="11" marginBottom="small">
                    <Div marginTop="small" className="intro-text">
                        <MyPhoto className="display-pic"/>
                        <Text marginBottom="nano">The story so far is made of detours, drafts, and dots that eventually connect.
                        </Text>
                        <Text>
                            Here’s a look at what’s shaped me, and how I now shape experiences in turn.
                        </Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" showOnlyOnDesktop>
                    <PurpleStar className="star" alt="star" height="56px" />
                </Portion>
            </Row >

            <hr className="brown-hr"/>

            {/* EDUCATION AND WORK */}

            <Row horizontalPadding="huge" marginBottom="small" marginTop="small">
                <Portion desktopSpan="7">

                    <div>
                    <h5>Education</h5>
                    </div>

                    <br/><br/>

                    <div>
                        <NIDLogo className="college-logo"/>

                        <Text><strong>
                            M.Des. (2017–19)
                        </strong>
                        </Text>
                        <Text marginBottom="nano">
                            Design for Retail Experience
                        </Text>
                        <Text><strong>
                            National Institute of Design,
                            <br/>
                            Bengaluru, Karnataka
                        </strong>
                        </Text>
                    </div>

                    <br/><br/>

                    <div>
                    <FOALogo className="college-logo"/>
                    <Text><strong>
                        B.Arch. (2011–16)
                    </strong>
                    </Text>
                    <Text marginBottom="nano">
                        Architecture
                    </Text>
                    <Text><strong>
                        Faculty of Architecture,
                        <br/>
                        Lucknow, Uttar Pradesh
                    </strong>
                    </Text>
                    </div>
                </Portion>

                <Portion desktopSpan="1"/>

                <Portion desktopSpan="16">
                    <div>
                        <h5>Work Experience</h5>
                    </div>

                    <br/><br/>

                    <div>
                        <SetuLogo className="college-logo"/>
                        <Text marginTop="nano"><strong>
                            Lead Growth Designer
                        </strong>
                        </Text>
                        <Text marginBottom="tiny" marginTop="nano">
                            Setu by Pine Labs · Feb 2020 – May 2025
                        </Text>
                        <Text marginBottom="nano">
                            Led visual and UI design for Setu's core and service-based products.
                        </Text>
                        <Text marginBottom="nano">
                            Built scalable UI frameworks and design systems for in-house products and services used by HDFC, ICICI, and Axis Bank.
                        </Text>
                        <Text>
                            Defined brand identity for Setu AA, and maintained visual consistency across web, dashboard, digital products, blog, and social media.
                        </Text>
                    </div>

                    <br/><br/>

                    <div>
                        <AtherLogo className="college-logo"/>
                        <Text marginTop="nano"><strong>
                            Retail Experience Designer
                        </strong>
                        </Text>
                        <Text marginBottom="nano">

                        </Text>
                        <Text marginBottom="tiny" marginTop="nano">
                            Ather Energy · Jun 2019 – Dec 2019
                        </Text>
                        <Text>
                            Created an exhibition design system and guidelines for pop-up and delivery events.
                        </Text>
                    </div>

                    <br/><br/>

                    <div>
                        <NSLogo className="college-logo"/>
                        <Text marginTop="nano"><strong>
                            Freelance Graphic Designer
                        </strong>
                        </Text>
                        <Text marginBottom="nano">
                        </Text>
                        <Text marginBottom="tiny" marginTop="nano">
                            Nonesuch Studio · Oct 2018 – Nov 2019

                        </Text>
                        <Text>
                            Worked on brand identity, editorial and social media for a pet hospital.
                        </Text>
                    </div>
                </Portion>

            </Row>



            <hr className="brown-hr"/>


            {/* TESTIMONIALS */}

            <Row horizontalPadding="huge" marginBottom="tiny" marginTop="tiny">
                <Portion desktopSpan="12" marginTop="tiny">
                    <h5>From those I've worked with &nbsp; 👩🏻‍💻
                    </h5>
                </Portion>
            </Row>

            <Row horizontalMargin="large" marginBottom="medium">
                <Portion className="testimonial-grid" desktopSpan="whole">
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
                                Former Manager, People Ops, Setu
                            </h6>
                        </Link>
                    </Card>

            </Portion>
            </Row>



        </article >
    );
};

export default DetailsPage;

