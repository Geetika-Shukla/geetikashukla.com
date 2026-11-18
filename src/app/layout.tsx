// EXTERNAL DEPS ===============================================================
import React from "react";
import Script from "next/script";
import { Caveat } from "next/font/google";

// COMPONENTS ==================================================================
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { ScrollMarker } from "@/components/SiteHeader/ScrollMarker";

// STYLES ======================================================================
import "@/styles/globals.css";

// ASSETS ======================================================================

// TYPES =======================================================================
import type { Metadata } from "next";

// Handwriting, for notes in the margins (the journal, a filter's "new!")
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand" });

const GA_ID = "G-1XKJ515C1T";

// Light or dark, set before the page paints so it never flashes the wrong one:
// the visitor's choice from the toggle, or else the device's setting
const THEME_SCRIPT = `try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = t;
} catch (e) {}`;

export const metadata: Metadata = {
    title: "Geetika Shukla",
    description: "Work",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // The theme script sets data-theme before React loads, so the server's html differs
        <html lang="en" className={`theme-light is-page-top ${hand.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
            </head>
            <body>
                <div className="site">
                    <SiteHeader />

                    {children}
                    <SiteFooter />
                </div>
                <ScrollMarker />

                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}');
                    `}
                </Script>
            </body>
        </html>
    );
}
