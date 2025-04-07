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
            <Row className="nav-mobile" horizontalPadding="large">
                <Portion>
                    <Div verticallyCenterItems pushItemsToEnds>
                        <Link href="/">
                            <PersonalLogo width="40px" height="40px" />
                        </Link>

                        <Div className="links-container">

                            <Link href="/visual"><Text className="nav-links" hideOnMobile>Visual</Text></Link>

                            <Link href="/type"><Text className="nav-links" hideOnMobile>Type</Text></Link>

                            <Link href="/experiences"><Text className="nav-links" hideOnMobile>Experiences</Text></Link>

                            <Link href="/hobbies"><Heart className="nav-icon" width="24px" height="24px" /></Link>
                        </Div>
                    </Div>
                </Portion>
            </Row>
        </Header >
    );
};
