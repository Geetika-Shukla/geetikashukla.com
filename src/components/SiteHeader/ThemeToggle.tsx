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

/*
 * Light or dark: a sun that sets into a moon. The choice is kept for next
 * time; until one is made, the page follows the device's setting.
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
                <mask id="theme-toggle-moon">
                    <rect width="24" height="24" fill="#FFFFFF" />
                    {/* The bite that turns the sun into a moon */}
                    <circle className="theme-toggle__bite" cx="24" cy="4" r="7" fill="#000000" />
                </mask>
                <circle className="theme-toggle__body" cx="12" cy="12" r="5" mask="url(#theme-toggle-moon)" />
                <g className="theme-toggle__rays">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <line key={angle} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${angle} 12 12)`} />
                    ))}
                </g>
            </svg>
        </button>
    );
};
