// EXTERNAL DEPS ===============================================================
import React from "react";
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import {
    Card,
    Heading1,
    Heading6,
    Portion,
    Row,
    Div,
    Text
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "./page-type.css";

// ASSETS ======================================================================
import InktoberThumbnail from "@/assets/images/thumbnail-for-inktober.svg";
import DevanagariThumbnail from "@/assets/images/thumbnail-for-47-days-of-devanagari-type.svg";


const TypePage = () => {
    return (
        <article id="page-type">

            <Row layoutAsGrid  className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" hideOnMobile />
                <Portion desktopSpan="8">
                    <Heading1 className="hero-heading">
                        All things type
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" hideOnMobile />
                <Portion desktopSpan="10" marginBottom="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">I love experimenting with typography, especially with pen and ink. Calligraphy holds a special place in my heart.</Text>

                        <Text>P.S. My superpower is being able to spend hours selecting the perfect font for any project.

                        </Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" hideOnMobile />
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="small">
                <Portion className="center-flexbox" layoutAsFlexbox verticallyCenterItems>

                    <Link href="/type/47-days-of-devanagari-type">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <DevanagariThumbnail alt="47 days of Devanagari Type" />
                            <Heading6 className="project-thumbnail-text" >47 days of Devanagari Type</Heading6>
                        </Card>
                    </Link>

                    <Link href="/type/inktober-2017">
                        <Card className="project-thumbnail" horizontalMargin="tiny" marginBottom="micro">
                            <InktoberThumbnail alt="inktober" />
                            <Heading6 className="project-thumbnail-text" >Inktober 2017</Heading6>
                        </Card>
                    </Link>

                </Portion>
            </Row>

        </article >
    );
};

export default TypePage;

