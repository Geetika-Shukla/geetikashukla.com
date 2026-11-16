// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// COMPONENTS ==================================================================
import PersonalLogo from "@/assets/images/logo.svg";
import { Pixels, fromRows } from "@/components/Pixel/pixel";

// STYLES ======================================================================
import "./site-header.css";

const NAV_LINKS = [
    { href: "/", label: "Work" },
    { href: "/more-about-me", label: "About me" },
];

const HEART = fromRows([
    ".OO...OO.",
    "OHHO.ORRO",
    "OHRROORRO",
    "ORRRRRRRO",
    ".ORRRRRO.",
    "..ORRRO..",
    "...ORO...",
    "....O....",
], { O: "#7A2320", R: "#D2483C", H: "#F08A7E" });

export const SiteHeader = () => {
    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <Link href="/" className="site-header__logo" aria-label="Geetika Shukla — home">
                    <PersonalLogo width="36" height="36" aria-hidden="true" />
                </Link>

                <nav className="site-header__nav" aria-label="Main">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link key={href} href={href} className="site-header__link">{label}</Link>
                    ))}
                    <Link href="/hobbies" className="site-header__heart" aria-label="Hobbies" title="Hobbies">
                        <svg viewBox="0 0 9 8" shapeRendering="crispEdges" aria-hidden="true">
                            <Pixels rects={HEART} />
                        </svg>
                    </Link>
                </nav>
            </div>
        </header>
    );
};
