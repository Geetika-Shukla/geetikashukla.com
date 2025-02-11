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
import ImageGrid from "@/components/ImageGrid";

// STYLES ======================================================================
import "../type-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import Deep from "@/assets/images/inktober/deep.svg";
import Cloud from "@/assets/images/inktober/cloud.svg";
import Fall from "@/assets/images/inktober/fall.svg";
import Found from "@/assets/images/inktober/found.svg";
import Juicy from "@/assets/images/inktober/juicy.svg";
import Long from "@/assets/images/inktober/long.svg";
import Mask from "@/assets/images/inktober/mask.svg";
import Swift from "@/assets/images/inktober/swift.svg";
import Teeming from "@/assets/images/inktober/teeming.svg";
import Trail from "@/assets/images/inktober/trail.svg";
import Underwater from "@/assets/images/inktober/underwater.svg";
import United from "@/assets/images/inktober/united.svg";

export default function InktoberPage() {

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

            <Row layoutAsFlexbox horizontalPadding="large" marginTop="tiny" marginBottom="medium" horizontallyCenterThis>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: '960px' }}>
                <Deep width={300} height={300}/>
                <Cloud width={300} height={300}/>
                <Fall width={300} height={300}/>
                <Found width={300} height={300}/>
                <Juicy width={300} height={300}/>
                <Long width={300} height={300}/>
                <Mask width={300} height={300}/>
                <Swift width={300} height={300}/>
                <Teeming width={300} height={300}/>
                <Trail width={300} height={300}/>
                <Underwater width={300} height={300}/>
                <United width={300} height={300}/>
                    </div>
                </div>
            </Row>

        </article >
    );
};


