// COMPONENTS ==================================================================
import GitHub from "@/assets/images/github.svg";
import LinkedIn from "@/assets/images/linkedin.svg";
import Instagram from "@/assets/images/instagram.svg";
import Fable from "@/assets/images/fable.svg";

// STYLES ======================================================================
import "./site-footer.css";

const SOCIAL_LINKS = [
    { href: "https://github.com/Geetika-Shukla/geetikashukla.com", label: "GitHub", Icon: GitHub },
    { href: "https://www.linkedin.com/in/geetikashukla/", label: "LinkedIn", Icon: LinkedIn },
    { href: "https://www.instagram.com/all.things.type/", label: "Instagram", Icon: Instagram },
    { href: "https://fable.co/geetika-shukla-384202712049", label: "Fable", Icon: Fable },
];

export const SiteFooter = () => {
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a key={href} href={href} className="site-footer__link" target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <Icon height="28" width="28" aria-hidden="true" />
                    </a>
                ))}
            </div>
        </footer>
    );
};
