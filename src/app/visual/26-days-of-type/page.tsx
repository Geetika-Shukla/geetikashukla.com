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
import process from "@/assets/images/i-m-pei.gif";
import A from "@/assets/images/26days/a.svg";
import B from "@/assets/images/26days/b.svg";
import C from "@/assets/images/26days/c.svg";
import D from "@/assets/images/26days/d.svg";
import E from "@/assets/images/26days/e.svg";
import F from "@/assets/images/26days/f.svg";
import G from "@/assets/images/26days/g.svg";
import H from "@/assets/images/26days/h.svg";
import I from "@/assets/images/26days/i.svg";
import J from "@/assets/images/26days/j.svg";
import K from "@/assets/images/26days/k.svg";
import L from "@/assets/images/26days/l.svg";
import M from "@/assets/images/26days/m.svg";
import N from "@/assets/images/26days/n.svg";
import O from "@/assets/images/26days/o.svg";
import P from "@/assets/images/26days/p.svg";
import Q from "@/assets/images/26days/q.svg";
import R from "@/assets/images/26days/r.svg";
import S from "@/assets/images/26days/s.svg";
import T from "@/assets/images/26days/t.svg";


    export default function TypeDaysPage() {

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

            <Row className="center-align-svg" marginBottom="tiny">
                <TypeGrid height="450px" className="hero-alignment" />
            </Row>

            <Row layoutAsFlexbox className="responsive-row" horizontalPadding="huge" marginTop="tiny" marginBottom="small" horizontallyCenterThis>
                <Portion desktopSpan="6" marginBottom="small">
                    <h5>The process</h5>
                </Portion>

                <Portion desktopSpan="16">
                    <Div>
                        <h6>01&nbsp;&nbsp;&nbsp;&nbsp;About the architect</h6>
                        <Text marginBottom="tiny" marginTop="nano">Chinese-American architect Ieoh Ming Pei’s designs represent an extension of and elaboration on
                            the rectangular forms and irregular silhouettes of the prevailing international style.
                        </Text>
                    </Div>
                    <Div>
                        <h6>02&nbsp;&nbsp;&nbsp;&nbsp;Architectural style and features</h6>
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
                        <h6>03&nbsp;&nbsp;&nbsp;&nbsp;Buildings by the architect</h6>
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
                <Image src={process} alt="concept" height={300} width={1800} />
            </Div>

            <Row layoutAsFlexbox horizontalPadding="large" marginTop="medium" marginBottom="medium" horizontallyCenterThis>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px', justifyContent: 'center', maxWidth: '960px' }}>
                        <A width={240} height={240} />
                        <B width={240} height={240} />
                        <C width={240} height={240} />
                        <D width={240} height={240} />
                        <E width={240} height={240} />
                        <F width={240} height={240} />
                        <G width={240} height={240} />
                        <H width={240} height={240} />
                        <I width={240} height={240} />
                        <J width={240} height={240} />
                        <K width={240} height={240} />
                        <L width={240} height={240} />
                        <M width={240} height={240} />
                        <N width={240} height={240} />
                        <O width={240} height={240} />
                        <P width={240} height={240} />
                        <Q width={240} height={240} />
                        <R width={240} height={240} />
                        <S width={240} height={240} />
                        <T width={240} height={240} />
                    </div>
                </div>
            </Row>

        </article >
    );
};
