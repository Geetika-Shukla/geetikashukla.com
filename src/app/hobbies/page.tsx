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
import "./page-hobbies.css";

// ASSETS ======================================================================
import YellowStar from "@/assets/images/yellow-star.svg";
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";


const HobbiesPage = () => {
    return (
        <article id="page-hobbies">

            <Row layoutAsGrid horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left">
                    <GreenStar alt="star" height="56px" />
                </Portion>
                <Portion desktopSpan="20" >
                    <Heading1 className="hobby-heading">
                        My go-to sources of joy ✨
                    </Heading1>
                    <Div marginTop="small">
                        <Text align="center" marginBottom="tiny" >My interests and hobbies are as varied as they are fleeting, ranging from typography, stitching and home organising to an unexpected fascination with soaps.
                        </Text>
                        <Text align="center">I cherish the beauty of everyday moments—the quiet, unassuming ones—which explains my love for slice-of-life anime and Japanese fiction.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right">
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="medium">
                <Portion>
                    <div className="bento-grid">
                        <div className="bento-item item-1">
                            <Image src="/interests/calli-1.png" alt="Image 1" width={400} height={400} />
                        </div>
                        <div className="bento-item item-2">
                            <Image src="/interests/ghibli-image.jpg" alt="Image 2" width={500} height={100} />
                        </div>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item item-3">
                            <Image src="/interests/spirited-away.jpg" alt="Image 3" width={400} height={400} />
                        </div>
                        <div className="bento-item item-4">
                            <Image src="/interests/japan-fiction.jpg" alt="Image 5" width={400} height={400} />
                        </div>
                        <div className="bento-item item-5">
                            <Image src="/interests/calli-2.png" alt="Image 4" width={400} height={400} />
                        </div>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item item-6">
                            <Image src="/interests/plants.gif" width={500} height={200} />
                        </div>
                        <div className="bento-item item-7">
                            <Image src="/interests/japan-lego.jpg" width={500} height={200} />
                        </div>
                        <div className="bento-item item-8">
                            <Image src="/interests/laptop-sleeve.jpg" width="400" height="300" />
                        </div>
                    </div>

                </Portion>
            </Row>

        </article >
    );
};

export default HobbiesPage;

