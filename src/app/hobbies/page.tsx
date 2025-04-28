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
import GreenStar from "@/assets/images/green-star.svg";
import PurpleStar from "@/assets/images/purple-star.svg";
import calliOne from "@/assets/images/calli-1.png";
import calliTwo from "@/assets/images/calli-2.png";
import ghibli from "@/assets/images/ghibli-image.jpg";
import sleeve from "@/assets/images/laptop-sleeve.jpg";
import japanFic from "@/assets/images/japan-books.jpg";
import lego from "@/assets/images/japan-lego.jpg";
import plants from "@/assets/images/plants.gif";
import spirited from "@/assets/images/spirited-away.jpg";




const HobbiesPage = () => {
    return (
        <article id="page-hobbies">

            <Row layoutAsGrid className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" marginTop="large" className="overflow-left" hideOnMobile>
                    <GreenStar alt="star" height="56px" />
                </Portion>
                <Portion desktopSpan="20" >
                    <Heading1 className="hobby-heading">
                        My go-to sources of joy ✨
                    </Heading1>
                    <Div marginTop="small">
                        <Text align="center" marginBottom="tiny" >My interests and hobbies are as varied as they are fleeting, ranging from typography, stitching and home organising to an unexpected fascination with soaps.
                        </Text>
                        <Text align="center" marginBottom="tiny">I cherish the beauty of everyday moments—the quiet, unassuming ones—which explains my love for slice-of-life anime and Japanese fiction.</Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" marginTop="small" className="overflow-right" hideOnMobile>
                    <PurpleStar alt="star" height="56px" />
                </Portion>
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="medium">
                <Portion>
                    <div className="bento-grid">
                        <div className="bento-item item-1">
                            <Image src={calliOne} alt="Image 1" width={400} height={400} loading="lazy" />
                        </div>
                        <div className="bento-item item-2">
                            <Image src={ghibli} alt="Image 2" width={500} height={100} loading="lazy" />
                        </div>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item item-3">
                            <Image src={spirited} alt="Image 3" width={400} height={400} loading="lazy" />
                        </div>
                        <div className="bento-item item-4">
                            <Image src={japanFic} alt="Image 5" width={400} height={400} loading="lazy" />
                        </div>
                        <div className="bento-item item-5">
                            <Image src={calliTwo} alt="Image 4" width={400} height={400} loading="lazy" />
                        </div>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item item-6">
                            <Image src={plants} alt="Image 6" width={500} height={200} loading="lazy" />
                        </div>
                        <div className="bento-item item-7">
                            <Image src={lego} alt="Image 7" width={500} height={200} loading="lazy" />
                        </div>
                        <div className="bento-item item-8">
                            <Image src={sleeve} alt="Image 8" width="400" height="300" loading="lazy" />
                        </div>
                    </div>

                </Portion>
            </Row>

        </article >
    );
};

export default HobbiesPage;

