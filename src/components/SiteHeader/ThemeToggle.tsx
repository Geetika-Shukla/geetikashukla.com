"use client";

// EXTERNAL DEPS ===============================================================
import React, { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Set before the page paints (see THEME_SCRIPT in layout.tsx); read it back here
const current = (): Theme =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// Re-read whenever it changes
const subscribe = (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
};

// The birds' faces: a red-whiskered bulbul by day, crest up and facing left,
// and a spotted owlet by night, looking straight out
const Bulbul = () => (
    <g className="theme-toggle__day">
        <path d="M9 9 Q11 1.5 16 0.5 Q15 5 17 9 Z" fill="#1C1C1E" />
        <circle cx="13" cy="14" r="7" fill="#1C1C1E" />
        <ellipse cx="12.5" cy="18.6" rx="3.8" ry="2.3" fill="#FFFFFF" />
        <ellipse cx="15.4" cy="14.6" rx="1.9" ry="1.6" fill="#E5484D" />
        <circle cx="10" cy="12.4" r="1.3" fill="#FFFFFF" />
        <circle cx="9.7" cy="12.4" r="0.7" fill="#1C1C1E" />
        <path d="M6.4 12.8 L2.4 14.2 L6.4 15.6 Z" fill="#1C1C1E" />
    </g>
);

const Owlet = () => (
    <g className="theme-toggle__night">
        <ellipse cx="12" cy="13" rx="10" ry="9" fill="#8A7A68" />
        {[[7, 6.5], [12, 5], [17, 6.5], [4.5, 10], [19.5, 10]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.7" fill="#F4EFE6" />
        ))}
        <path d="M4 11 Q7.5 7.6 11.4 11 M12.6 11 Q16.5 7.6 20 11" stroke="#F4EFE6" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="8" cy="13.6" r="3.3" fill="#F4EFE6" />
        <circle cx="16" cy="13.6" r="3.3" fill="#F4EFE6" />
        <circle cx="8" cy="13.6" r="2.5" fill="#E8B931" />
        <circle cx="16" cy="13.6" r="2.5" fill="#E8B931" />
        <circle cx="8" cy="13.6" r="1.3" fill="#1C1C1E" />
        <circle cx="16" cy="13.6" r="1.3" fill="#1C1C1E" />
        <path d="M11 16.6 L12 19.2 L13 16.6 Z" fill="#C9B38A" />
    </g>
);

/*
 * Light or dark, as birds: a bulbul by day, an owlet by night. The choice
 * is kept for next time; until one is made, the page follows the device's
 * setting.
 */
export const ThemeToggle = () => {
    // Unknown on the server; the page's own once it loads
    const theme = useSyncExternalStore(subscribe, current, () => null);

    const toggle = () => {
        const next: Theme = current() === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // Storage blocked: the choice lasts for this page only
        }
    };

    const dark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            title={dark ? "Light theme" : "Dark theme"}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <Bulbul />
                <Owlet />
            </svg>
        </button>
    );
};
