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


const InktoberPage = () => {

    const images = [
        "/inktober/deep.svg",
        "/inktober/cloud.svg",
        "/inktober/fall.svg",
        "/inktober/found.svg",
        "/inktober/juicy.svg",
        "/inktober/long.svg",
        "/inktober/mask.svg",
        "/inktober/swift.svg",
        "/inktober/teeming.svg",
        "/inktober/trail.svg",
        "/inktober/underwater.svg",
        "/inktober/united.svg",
    ];

    return (

        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        Inktober 2017
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            I started the Inktober 2017 project in an effort to become better at typography and illustration and, to develop a positive drawing habit. Showcasing a few here—
                        </Text>
                    </Div>
                </Portion>
            </Row>

            <Row horizontalPadding="small" marginTop="tiny" marginBottom="medium" horizontallyCenterThis>
                <ImageGrid images={images} />
            </Row>

        </article >
    );
};

export default InktoberPage;

