// EXTERNAL DEPS ===============================================================
import React from "react";

// INTERNAL DEPS ===============================================================
import {
    Heading1,
    Portion,
    Row,
    Div,
    Text,
} from "fictoan-react";

// COMPONENTS ==================================================================
import { AboutDetails } from "./AboutDetails";

// STYLES ======================================================================
import "./page-more-about-me.css";

// ASSETS ======================================================================
import MyPhoto from "@/assets/images/me.svg";


const MoreAboutMePage = () => {
    return (
        <article id="page-more-about-me">

            <Row layoutAsGrid className="row-hide" horizontalPadding="huge" marginTop="medium" marginBottom="none">
                <Portion desktopSpan="2" showOnlyOnDesktop />
                <Portion desktopSpan="7">
                    <Heading1 className="hero-heading">
                        The story so far
                    </Heading1>
                </Portion>
                <Portion desktopSpan="2" hideOnMobile />
                <Portion desktopSpan="11" marginBottom="small">
                    <Div marginTop="small" className="intro-text">
                        <MyPhoto className="display-pic"/>
                        <Text marginBottom="nano">The story so far is made of detours, drafts, and dots that eventually connect.
                        </Text>
                        <Text>
                            Here’s a look at what’s shaped me, and how I now shape experiences in turn.
                        </Text>
                    </Div>
                </Portion>
                <Portion desktopSpan="2" showOnlyOnDesktop />
            </Row >


            <hr className="brown-hr"/>


            <AboutDetails />



        </article >
    );
};

export default MoreAboutMePage;

