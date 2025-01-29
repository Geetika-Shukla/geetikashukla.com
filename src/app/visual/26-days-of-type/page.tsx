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
import "../visual-projects.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import Steel from "@/assets/images/steel.svg";
import Glass from "@/assets/images/glass.svg";
import Brick from "@/assets/images/brick.svg";
import Chapel from "@/assets/images/luce-memorial-chapel.svg";
import Louvre from "@/assets/images/le-grand-louvre.svg";
import Museum from "@/assets/images/everson-museum.svg";
import Tower from "@/assets/images/bank-of-china-tower.svg";
import TypeGrid from "@/assets/images/type-grid.svg";


const TypeDaysPage = () => {
    const images = [
        "/26days/a.svg",
        "/26days/b.svg",
        "/26days/c.svg",
        "/26days/d.svg",
        "/26days/e.svg",
        "/26days/f.svg",
        "/26days/g.svg",
        "/26days/h.svg",
        "/26days/i.svg",
        "/26days/j.svg",
        "/26days/k.svg",
        "/26days/l.svg",
        "/26days/m.svg",
        "/26days/n.svg",
        "/26days/o.svg",
        "/26days/p.svg",
        "/26days/q.svg",
        "/26days/r.svg",
        "/26days/s.svg",
        "/26days/t.svg",
    ];

    return (
        <article className="project-page">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion desktopSpan="10" horizontalMargin="small">
                    <Heading1 className="hero-heading">
                        26 Days of Type
                    </Heading1>
                </Portion>

                <Portion desktopSpan="2" marginTop="small" hideOnMobile>
                    <YellowStar alt="star" height="32px" />
                </Portion>

                <Portion desktopSpan="12" mobileSpan="whole" marginLeft="small">
                    <Div marginTop="small">
                        <Text marginBottom="tiny">
                            36 Days of Type is a project that invites designers, illustrators, and graphic artists to express their particular interpretation of the letters and numbers of our alphabet.
                        </Text>
                        <Text>
                            For this project, I derived inspiration from works of famous architects around the world. The idea was to reflect their design sensibilities through type.
                        </Text>
                    </Div>
                </Portion>

            </Row >

            <Row marginBottom="small">
                <TypeGrid height="400px" />
            </Row>

            <Row layoutAsFlexbox horizontalPadding="huge" marginTop="medium" marginBottom="small" horizontallyCenterThis>
                <Portion desktopSpan="6" marginBottom="small">
                    <h5>The process</h5>
                </Portion>

                <Portion desktopSpan="16">
                    <Div>
                        <h7>01&nbsp;&nbsp;&nbsp;&nbsp;About the architect</h7>
                        <Text marginBottom="tiny" marginTop="nano">Chinese-American architect Ieoh Ming Pei’s designs represent an extension of and elaboration on
                            the rectangular forms and irregular silhouettes of the prevailing international style.
                        </Text>
                    </Div>
                    <Div>
                        <h7>02&nbsp;&nbsp;&nbsp;&nbsp;Architectural style and features</h7>
                        <Div padding="tiny" horizontallyCenterThis style={{ display: "flex", gap: "48px" }}>
                            <Steel alt="steel" height="80px" />
                            <Glass alt="glass" height="80px" />
                            <Brick alt="brick" height="80px" />
                        </Div>
                        <Text marginBottom="tiny" marginTop="nano">He was noted for his bold and skillful arrangements of groups of geometric shapes and for his
                            dramatic use of richly contrasted materials, spaces, and surfaces.
                        </Text>

                    </Div>
                    <Div layoutAsFlexbox>
                        <h7>03&nbsp;&nbsp;&nbsp;&nbsp;Buildings by the architect</h7>
                        <Div padding="tiny" style={{ display: "flex", gap: "48px" }}>
                            <Div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <Louvre alt="Louvre" height="80px" />
                                <Text align="center" marginTop="nano">Le Grand Louvre</Text>
                            </Div>

                            <Div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <Tower alt="BOC Tower" height="80px" />
                                <Text align="center" marginTop="nano">BOC Tower</Text>
                            </Div>

                            <Div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <Chapel alt="Luce Memorial Chapel" height="80px" />
                                <Text align="center" marginTop="nano">Luce Memorial Chapel</Text>
                            </Div>

                            <Div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <Museum alt="Everson Museum" height="80px" />
                                <Text align="center" marginTop="nano">Everson Museum</Text>
                            </Div>
                        </Div>
                    </Div>
                    <Div>
                        <Text marginBottom="tiny" marginTop="nano">He is internationally celebrated for his iconic designs. His famous works include the Le Grand Louvre
                            in Paris and the Bank of China Tower in Hong Kong.
                        </Text>
                    </Div>
                </Portion>
            </Row >

            <Div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image src="/i-m-pei.gif" height={300} width={1800} />
            </Div>

            <Row horizontalPadding="huge" marginTop="medium" marginBottom="medium" horizontallyCenterThis>
                <ImageGrid images={images} />
            </Row>

        </article >
    );
};

export default TypeDaysPage;

