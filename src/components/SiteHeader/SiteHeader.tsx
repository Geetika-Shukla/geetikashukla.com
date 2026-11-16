// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// COMPONENTS ==================================================================
import PersonalLogo from "@/assets/images/logo.svg";
import { Pixels, fromRows } from "@/components/Pixel/pixel";

// STYLES ======================================================================
import "./site-header.css";

const NAV_LINKS = [
    { href: "/#work", label: "Work" },
    { href: "/more-about-me", label: "About me" },
];

// Symmetric heart with a small highlight at top left and a shaded right edge.
// Drawn at exactly 2px per pixel so every pixel is the same size.
const HEART = fromRows([
    "..RRR...RRR..",
    ".RRRRR.RRRRR.",
    "RRHHRRRRRRRRD",
    "RRHRRRRRRRRRD",
    "RRRRRRRRRRRRD",
    ".RRRRRRRRRRD.",
    "..RRRRRRRRD..",
    "...RRRRRRD...",
    "....RRRRD....",
    ".....RRD.....",
    "......D......",
], { R: "#E04A3C", D: "#B23327", H: "#F58E80" });

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
                        <svg viewBox="0 0 13 11" shapeRendering="crispEdges" aria-hidden="true">
                            <Pixels rects={HEART} />
                        </svg>
                    </Link>
                </nav>
            </div>
        </header>
    );
};
