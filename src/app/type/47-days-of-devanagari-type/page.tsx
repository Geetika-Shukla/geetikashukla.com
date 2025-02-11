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
import process from "@/assets/images/47days.gif";


const DevanagariPage = () => {

    const images = [
        "/devanagari/1.svg",
        "/devanagari/2.svg",
        "/devanagari/3.svg",
        "/devanagari/4.svg",
        "/devanagari/5.svg",
        "/devanagari/6.svg",
        "/devanagari/7.svg",
        "/devanagari/8.svg",
        "/devanagari/9.svg",
        "/devanagari/10.svg",
        "/devanagari/11.svg",
        "/devanagari/12.svg",
        "/devanagari/13.svg",
        "/devanagari/14.svg",
        "/devanagari/15.svg",
        "/devanagari/16.svg",
        "/devanagari/17.svg",
        "/devanagari/18.svg",
        "/devanagari/19.svg",
        "/devanagari/20.svg",
        "/devanagari/21.svg",
        "/devanagari/22.svg",
        "/devanagari/23.svg",
        "/devanagari/24.svg",
        "/devanagari/25.svg",
        "/devanagari/26.svg",
        "/devanagari/27.svg",
        "/devanagari/28.svg",
        "/devanagari/29.svg",
        "/devanagari/30.svg",
        "/devanagari/31.svg",
        "/devanagari/32.svg",
        "/devanagari/33.svg",
        "/devanagari/34.svg",
        "/devanagari/35.svg",
        "/devanagari/36.svg",
        "/devanagari/37.svg",
        "/devanagari/38.svg",
        "/devanagari/39.svg",
        "/devanagari/40.svg",
        "/devanagari/41.svg",
        "/devanagari/42.svg",
        "/devanagari/43.svg",
        "/devanagari/44.svg",
        "/devanagari/45.svg",
        "/devanagari/46.svg",
        "/devanagari/47.svg",
    ];

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

            <Row marginTop="medium" horizontalPadding="small" marginBottom="medium" horizontallyCenterThis>
                <ImageGrid images={images} />
            </Row>

        </article >
    );
};

export default DevanagariPage;

