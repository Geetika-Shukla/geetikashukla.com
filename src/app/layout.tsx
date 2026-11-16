// EXTERNAL DEPS ===============================================================
import React from "react";
import Script from "next/script";

// COMPONENTS ==================================================================
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { ScrollMarker } from "@/components/SiteHeader/ScrollMarker";

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
    return (
        <html lang="en" className="theme-light is-page-top">
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
