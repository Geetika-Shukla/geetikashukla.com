// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from 'next/image';

// INTERNAL DEPS ===============================================================
import {
    Heading1,
    Portion,
    Row,
    Div,
    Text,
} from "fictoan-react";

// COMPONENTS ==================================================================

// STYLES ======================================================================
import "./page-hobbies.css";

// ASSETS ======================================================================
import calliOne from "@/assets/images/calli-1.png";
import calliTwo from "@/assets/images/calli-2.png";
import ghibli from "@/assets/images/ghibli-image.jpg";
import sleeve from "@/assets/images/laptop-sleeve.jpg";
import japanFic from "@/assets/images/japan-books.jpg";
import lego from "@/assets/images/japan-lego.jpg";
import plants from "@/assets/images/plants.webp";
import spirited from "@/assets/images/spirited-away.jpg";




const HobbiesPage = () => {
    return (
        <article id="page-hobbies">

            <Row layoutAsGrid className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" hideOnMobile />
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
                <Portion desktopSpan="2" hideOnMobile />
            </Row >

            <Row layoutAsGrid horizontalPadding="huge" marginTop="none" marginBottom="medium">
                <Portion>
                    <div className="bento-grid">
                        <div className="bento-item item-1">
                            <Image src={calliOne} alt="Calligraphy piece" width={400} height={400} loading="lazy" />
                        </div>
                        <div className="bento-item item-2">
                            <Image src={ghibli} alt="Studio Ghibli-inspired artwork" width={500} height={100} loading="lazy" />
                        </div>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item item-3">
                            <Image src={spirited} alt="Spirited Away-inspired artwork" width={400} height={400} loading="lazy" />
                        </div>
                        <div className="bento-item item-4">
                            <Image src={japanFic} alt="Japanese fiction books" width={400} height={400} loading="lazy" />
                        </div>
                        <div className="bento-item item-5">
                            <Image src={calliTwo} alt="Calligraphy piece" width={400} height={400} loading="lazy" />
                        </div>
                    </div>

                    <div className="bento-grid">
                        <div className="bento-item item-6">
                            <Image src={plants} alt="Animation of house plants" width={500} height={200} loading="lazy" />
                        </div>
                        <div className="bento-item item-7">
                            <Image src={lego} alt="Japan-themed Lego build" width={500} height={200} loading="lazy" />
                        </div>
                        <div className="bento-item item-8">
                            <Image src={sleeve} alt="Handmade laptop sleeve" width="400" height="300" loading="lazy" />
                        </div>
                    </div>

                </Portion>
            </Row>

        </article >
    );
};

export default HobbiesPage;

