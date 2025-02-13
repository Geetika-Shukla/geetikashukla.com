"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// INTERNAL DEPS ===============================================================
import { Text, Div, Footer, Row, Portion } from "fictoan-react";
import { useTheme } from "fictoan-react";

// COMPONENTS ==================================================================
import GitHub from "@/assets/images/github.svg";
import LinkedIn from "@/assets/images/linkedin.svg";
import Instagram from "@/assets/images/instagram.svg";
import Fable from "@/assets/images/fable.svg";


// STYLES ======================================================================
import "./site-footer.css";

export const SiteFooter = () => {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        if (theme === "theme-light") {
            setTheme("theme-dark");
        } else {
            setTheme("theme-light");
        }
    };

    return (
        <Footer id="site-footer">
            <Row horizontalPadding="large">
                <Portion>
                    <Div verticallyCenterItems pushItemsToEnds>
                        <Text className="footer-text" hideOnMobile>👩🏻‍💻 &nbsp; Thanks for stopping by! I'm learning to code, and this website has been built by me.</Text>
                        <Div className="links-container">
                            <Link href="https://github.com/Geetika-Shukla/geetikashukla.com"  target="_blank" rel="noopener noreferrer">
                                <GitHub alt="github" height="30px" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/geetikashukla/"  target="_blank" rel="noopener noreferrer">
                                <LinkedIn alt="Linkedin" height="30px" />
                            </Link>
                            <Link href="https://www.instagram.com/all.things.type/" target="_blank" rel="noopener noreferrer">
                                <Instagram alt="Instagram" height="30px" />
                            </Link>
                            <Link href="https://fable.co/geetika-shukla-384202712049"  target="_blank" rel="noopener noreferrer">
                                <Fable alt="Fable" height="30px" />
                            </Link>
                        </Div>
                    </Div>
                </Portion>
            </Row>
        </Footer>
    );
};
