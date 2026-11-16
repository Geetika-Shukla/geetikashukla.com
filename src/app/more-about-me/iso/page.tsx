// EXTERNAL DEPS ===============================================================
import React from "react";

// COMPONENTS ==================================================================
import { AboutDetails } from "../AboutDetails";

// STYLES ======================================================================
import "@/components/IsoFloor/iso-floor.css";
import "../page-more-about-me.css";
import "./page-about-iso.css";

// ASSETS ======================================================================
import MyPhoto from "@/assets/images/me.svg";
import NIDLogo from "@/assets/images/nid-logo.svg";
import FOALogo from "@/assets/images/foa-logo.svg";
import SetuLogo from "@/assets/images/setu-logo.svg";
import RBIHLogo from "@/assets/images/rbih-logo.svg";
import AtherLogo from "@/assets/images/ather-logo.svg";
import NSLogo from "@/assets/images/ns-logo.svg";

// TYPES =======================================================================
import type { CSSProperties } from "react";

/*
 * Draft: About me with its intro laid flat on the isometric floor, in the
 * middle of the grid. Positions are in grid cells (u across, v down the plane)
 * from the plane's centre (see IsoFloor/iso-floor.css).
 */
const at = (u: number, v: number, w?: number, d?: number) =>
    ({ "--u": u, "--v": v, "--w": w, "--d": d }) as CSSProperties;

// The places in the story, oldest first, as small tiles under the intro
const LOGOS = [
    { name: "Faculty of Architecture, Lucknow", Logo: FOALogo },
    { name: "National Institute of Design", Logo: NIDLogo },
    { name: "Nonesuch Studio", Logo: NSLogo },
    { name: "Ather Energy", Logo: AtherLogo },
    { name: "Setu by Pine Labs", Logo: SetuLogo },
    { name: "Reserve Bank Innovation Hub", Logo: RBIHLogo },
];

const AboutIsoPage = () => (
    <article id="page-more-about-me" className="about-iso">
        <section className="iso about-iso__scene" aria-label="Introduction">
            <div className="floor">
                <div className="floor__plane">
                    <div className="about-iso__intro" style={at(-26, -9, 24)}>
                        <h1 className="about-iso__title">The story so far</h1>
                        <p className="about-iso__text">
                            The story so far is made of detours, drafts, and dots that eventually connect.
                        </p>
                        <p className="about-iso__text">
                            Here’s a look at what’s shaped me, and how I now shape experiences in turn.
                        </p>
                    </div>

                    <div className="about-iso__photo" style={at(2, -9, 13, 13)}>
                        <MyPhoto role="img" aria-label="Geetika Shukla" />
                    </div>

                    <ul className="about-iso__logos" aria-label="Where I’ve studied and worked">
                        {LOGOS.map(({ name, Logo }, i) => (
                            <li key={name} className="about-iso__logo" style={at(-26 + i * 6, 8, 5, 5)} title={name}>
                                <Logo role="img" aria-label={name} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>

        <AboutDetails />
    </article>
);

export default AboutIsoPage;
