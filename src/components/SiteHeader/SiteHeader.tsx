// EXTERNAL DEPS ===============================================================
import Link from "next/link";

// COMPONENTS ==================================================================
import PersonalLogo from "@/assets/images/logo.svg";

// STYLES ======================================================================
import "./site-header.css";

const NAV_LINKS = [
    { href: "/#work", label: "Work" },
    { href: "/#journal", label: "About me" },
];

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
                </nav>
            </div>
        </header>
    );
};
