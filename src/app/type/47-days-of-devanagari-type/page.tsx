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
    Portion,
    Row,
    Div,
    Text,
    Footer,
    CodeBlock
} from "fictoan-react";

// COMPONENTS ==================================================================
import ImageGrid from "@/components/ImageGrid";

// STYLES ======================================================================
import "../type-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import process from "@/assets/images/devanagari/47days.gif";
import One from "@/assets/images/devanagari/1.svg";
import Two from "@/assets/images/devanagari/2.svg";
import Three from "@/assets/images/devanagari/3.svg";
import Four from "@/assets/images/devanagari/4.svg";
import Five from "@/assets/images/devanagari/5.svg";
import Six from "@/assets/images/devanagari/6.svg";
import Seven from "@/assets/images/devanagari/7.svg";
import Eight from "@/assets/images/devanagari/8.svg";
import Nine from "@/assets/images/devanagari/9.svg";
import Ten from "@/assets/images/devanagari/10.svg";
import Eleven from "@/assets/images/devanagari/11.svg";
import Twelve from "@/assets/images/devanagari/12.svg";
import Thirteen from "@/assets/images/devanagari/13.svg";
import Fourteen from "@/assets/images/devanagari/14.svg";
import Fifteen from "@/assets/images/devanagari/15.svg";
import Sixteen from "@/assets/images/devanagari/16.svg";
import Seventeen from "@/assets/images/devanagari/17.svg";
import Eighteen from "@/assets/images/devanagari/18.svg";
import Nineteen from "@/assets/images/devanagari/19.svg";
import Twenty from "@/assets/images/devanagari/20.svg";
import TwentyOne from "@/assets/images/devanagari/21.svg";
import TwentyTwo from "@/assets/images/devanagari/22.svg";
import TwentyThree from "@/assets/images/devanagari/23.svg";
import TwentyFour from "@/assets/images/devanagari/24.svg";
import TwentyFive from "@/assets/images/devanagari/25.svg";
import TwentySix from "@/assets/images/devanagari/26.svg";
import TwentySeven from "@/assets/images/devanagari/27.svg";
import TwentyEight from "@/assets/images/devanagari/28.svg";
import TwentyNine from "@/assets/images/devanagari/29.svg";
import Thirty from "@/assets/images/devanagari/30.svg";
import ThirtyOne from "@/assets/images/devanagari/31.svg";
import ThirtyTwo from "@/assets/images/devanagari/32.svg";
import ThirtyThree from "@/assets/images/devanagari/33.svg";
import ThirtyFour from "@/assets/images/devanagari/34.svg";
import ThirtyFive from "@/assets/images/devanagari/35.svg";
import ThirtySix from "@/assets/images/devanagari/36.svg";
import ThirtySeven from "@/assets/images/devanagari/37.svg";
import ThirtyEight from "@/assets/images/devanagari/38.svg";
import ThirtyNine from "@/assets/images/devanagari/39.svg";
import Forty from "@/assets/images/devanagari/40.svg";
import FortyOne from "@/assets/images/devanagari/41.svg";
import FortyTwo from "@/assets/images/devanagari/42.svg";
import FortyThree from "@/assets/images/devanagari/43.svg";
import FortyFour from "@/assets/images/devanagari/44.svg";
import FortyFive from "@/assets/images/devanagari/45.svg";
import FortySix from "@/assets/images/devanagari/46.svg";
import FortySeven from "@/assets/images/devanagari/47.svg";


export default function DevanagariPage() {

    return (

        <article className="project-page">

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        47 Days of Devanagari Type
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            47daysofdevanagari is a challenge to express a Devanagari script letter form each day from different creative perspectives.
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Div style={{ maxWidth: "1050px", width: "100%" }}>
                    <Image src={process} alt="cover" height={200} width={1000} />
                </Div>
            </Row>

            <Row layoutAsFlexbox horizontalPadding="large" marginTop="medium" marginBottom="medium" horizontallyCenterThis>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', justifyContent: 'center', maxWidth: '960px' }}>
                        <One width={300} height={300} />
                        <Two width={300} height={300} />
                        <Three width={300} height={300} />
                        <Four width={300} height={300} />
                        <Five width={300} height={300} />
                        <Six width={300} height={300} />
                        <Seven width={300} height={300} />
                        <Eight width={300} height={300} />
                        <Nine width={300} height={300} />
                        <Ten width={300} height={300} />
                        <Eleven width={300} height={300} />
                        <Twelve width={300} height={300} />
                        <Thirteen width={300} height={300} />
                        <Fourteen width={300} height={300} />
                        <Fifteen width={300} height={300} />
                        <Sixteen width={300} height={300} />
                        <Seventeen width={300} height={300} />
                        <Eighteen width={300} height={300} />
                        <Nineteen width={300} height={300} />
                        <Twenty width={300} height={300} />
                        <TwentyOne width={300} height={300} />
                        <TwentyTwo width={300} height={300} />
                        <TwentyThree width={300} height={300} />
                        <TwentyFour width={300} height={300} />
                        <TwentyFive width={300} height={300} />
                        <TwentySix width={300} height={300} />
                        <TwentySeven width={300} height={300} />
                        <TwentyEight width={300} height={300} />
                        <TwentyNine width={300} height={300} />
                        <Thirty width={300} height={300} />
                        <ThirtyOne width={300} height={300} />
                        <ThirtyTwo width={300} height={300} />
                        <ThirtyThree width={300} height={300} />
                        <ThirtyFour width={300} height={300} />
                        <ThirtyFive width={300} height={300} />
                        <ThirtySix width={300} height={300} />
                        <ThirtySeven width={300} height={300} />
                        <ThirtyEight width={300} height={300} />
                        <ThirtyNine width={300} height={300} />
                        <Forty width={300} height={300} />
                        <FortyOne width={300} height={300} />
                        <FortyTwo width={300} height={300} />
                        <FortyThree width={300} height={300} />
                        <FortyFour width={300} height={300} />
                        <FortyFive width={300} height={300} />
                        <FortySix width={300} height={300} />
                        <FortySeven width={300} height={300} />
                    </div>
                </div>
            </Row>

        </article >
    );
};


