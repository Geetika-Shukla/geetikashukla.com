// ASSETS ======================================================================
import HDFCThumbnail from "@/assets/images/thumbnail-for-hdfc.svg";
import ProductDiscoveryThumbnail from "@/assets/images/thumbnail-for-product-discovery.svg";
import ReportsThumbnail from "@/assets/images/thumbnail-for-reports.svg";
import PartnershipsThumbnail from "@/assets/images/thumbnail-for-partner-onboarding.svg";
import BillPayThumbnail from "@/assets/images/thumbnail-for-cou.svg";
import AtherThumbnail from "@/assets/images/thumbnail-for-ather.svg";
import PeopleExperienceThumbnail from "@/assets/images/thumbnail-for-people-experience.svg";
import IconSystemThumbnail from "@/assets/images/thumbnail-for-icon-system.svg";
import DaysOfTypeThumbnail from "@/assets/images/thumbnail-for-26-days-of-type.svg";
import KannaujThumbnail from "@/assets/images/thumbnail-for-kannauj-perfumery.svg";
import DevanagariThumbnail from "@/assets/images/thumbnail-for-47-days-of-devanagari-type.svg";
import InktoberThumbnail from "@/assets/images/thumbnail-for-inktober.svg";

// TYPES =======================================================================
import type { ComponentType, SVGProps } from "react";

export interface Project {
    title     : string;
    category  : "Experience" | "Visual" | "Type";
    Thumbnail : ComponentType<SVGProps<SVGSVGElement>>;
    year?     : string;
    // Projects without a page yet are shown as "Upcoming"
    href?     : string;
}

export interface TimelinePeriod {
    dates    : string;
    org      : string;
    role     : string;
    summary? : string;
    projects : Project[];
}

// Newest first
export const timeline: TimelinePeriod[] = [
    {
        dates    : "2025 – now",
        org      : "Reserve Bank Innovation Hub",
        role     : "Manager — Design",
        summary  : "Rebranding initiatives and a scalable design system that connects visual identity with product experience.",
        projects : [],
    },
    {
        dates    : "2020 – 2025",
        org      : "Setu by Pine Labs",
        role     : "Lead Growth Designer",
        projects : [
            { title: "Path to partnerships", category: "Experience", year: "2024", href: "/experiences/path-to-partnerships", Thumbnail: PartnershipsThumbnail },
            { title: "Assisted product discovery", category: "Experience", year: "2024", href: "/experiences/assisted-product-discovery", Thumbnail: ProductDiscoveryThumbnail },
            { title: "Digital journeys for HDFC Bank", category: "Experience", year: "2023", href: "/experiences/hdfc-journeys", Thumbnail: HDFCThumbnail },
            { title: "Revamping reports on Bridge", category: "Experience", year: "2020 – 23", href: "/experiences/revamping-reports", Thumbnail: ReportsThumbnail },
            { title: "Icon system", category: "Visual", href: "/visual/icon-system-for-setu", Thumbnail: IconSystemThumbnail },
            { title: "People experience", category: "Visual", href: "/visual/people-experience", Thumbnail: PeopleExperienceThumbnail },
            { title: "Bill Pay — payment experience", category: "Experience", Thumbnail: BillPayThumbnail },
        ],
    },
    {
        dates    : "2019",
        org      : "Ather Energy",
        role     : "Retail Experience Designer",
        projects : [
            { title: "Ather Go — exhibition design system", category: "Visual", year: "2019", Thumbnail: AtherThumbnail },
        ],
    },
    {
        dates    : "2018 – 2019",
        org      : "Nonesuch Studio",
        role     : "Freelance Graphic Designer",
        summary  : "Brand identity, editorial and social media for a pet hospital.",
        projects : [],
    },
    {
        dates    : "2017 – 2019",
        org      : "National Institute of Design",
        role     : "M.Des. — Design for Retail Experience",
        projects : [
            { title: "Kannauj Perfumery", category: "Visual", href: "/visual/kannauj-perfumery", Thumbnail: KannaujThumbnail },
        ],
    },
    {
        dates    : "Ongoing",
        org      : "Personal",
        role     : "Type and lettering practice",
        projects : [
            { title: "47 days of Devanagari Type", category: "Type", href: "/type/47-days-of-devanagari-type", Thumbnail: DevanagariThumbnail },
            { title: "26 days of Type", category: "Visual", href: "/visual/26-days-of-type", Thumbnail: DaysOfTypeThumbnail },
            { title: "Inktober", category: "Type", year: "2017", href: "/type/inktober-2017", Thumbnail: InktoberThumbnail },
        ],
    },
];
