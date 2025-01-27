// EXTERNAL DEPS ===============================================================
import React from "react";

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

export const metadata: Metadata = {
    title: "Geetika Shukla",
    description: "Work",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const listOfThemes = ["theme-light", "theme-dark"];

    return (
        <html lang="en">
            <body>
                <ThemeProvider themeList={listOfThemes} currentTheme="theme-light">
                    <SiteHeader />

                    {children}
                    <SiteFooter />
                </ThemeProvider>
            </body>
        </html>
    );
}
