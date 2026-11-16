// EXTERNAL DEPS ===============================================================
import React from "react";
import Script from "next/script";

// INTERNAL DEPS ===============================================================
import { ThemeProvider } from "fictoan-react";

// COMPONENTS ==================================================================
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";

// STYLES ======================================================================
import "@/styles/globals.css";

// ASSETS ======================================================================

// TYPES =======================================================================
import type { Metadata } from "next";

const GA_ID = "G-1XKJ515C1T";

export const metadata: Metadata = {
    title: "Geetika Shukla",
    description: "Work",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const listOfThemes = ["theme-light"];

    return (
        <html lang="en">
            <body>
                <ThemeProvider themeList={listOfThemes} currentTheme="theme-light">
                    <SiteHeader />

                    {children}
                    <SiteFooter />
                </ThemeProvider>

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
