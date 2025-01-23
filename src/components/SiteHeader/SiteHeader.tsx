"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import { Element, Button, Text, Header, Div, Row, Portion } from "fictoan-react";
import { useTheme } from "fictoan-react";

// COMPONENTS ==================================================================
import PersonalLogo from "@/assets/images/logo.svg";
import Heart from "@/assets/images/heart.svg";

// STYLES ======================================================================
import "./site-header.css";

export const SiteHeader = () => {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        if (theme === "theme-light") {
            setTheme("theme-dark");
        } else {
            setTheme("theme-light");
        }
    };

    return (
        <Header id="site-header">
            <Row horizontalPadding="large">
                <Portion>
                    <Div verticallyCenterItems pushItemsToEnds>
                        <Link href="/">
                            <PersonalLogo width="40px" height="40px" />
                        </Link>

                        <Div className="links-container">
                            <Text>Visual</Text>
                            <Text>Type</Text>
                            <Heart width="24px" height="24px" />
                        </Div>
                    </Div>
                </Portion>
            </Row>
        </Header>
    );
};
