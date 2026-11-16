"use client";

// EXTERNAL DEPS ===============================================================
import { useEffect } from "react";

// Marks the page (html.is-page-top) while it's scrolled to the top, so the nav
// can sit clear there and take its glass background once the page scrolls
export const ScrollMarker = () => {
    useEffect(() => {
        const root = document.documentElement;
        const onScroll = () => root.classList.toggle("is-page-top", window.scrollY <= 0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return null;
};
