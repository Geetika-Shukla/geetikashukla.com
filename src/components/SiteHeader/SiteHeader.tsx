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

// Two-tone heart: darker right edge, with a small shine at top left
const HEART = fromRows([
    "..RR...DD..",
    ".RRRR.RRDD.",
    "RRDRRRRRRDD",
    "RRDRRRRRRDD",
    "RRRDRRRRRDD",
    ".RRRRRRRD..",
    "..RRRRRD...",
    "...RRRD....",
    "....RD.....",
    ".....D.....",
], { R: "#DB4535", D: "#A62E22" });

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
                        <svg viewBox="0 0 11 10" shapeRendering="crispEdges" aria-hidden="true">
                            <Pixels rects={HEART} />
                        </svg>
                    </Link>
                </nav>
            </div>
        </header>
    );
};
