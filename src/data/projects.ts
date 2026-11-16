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
    title       : string;
    description : string;
    category    : "Experience" | "Visual" | "Type";
    Thumbnail   : ComponentType<SVGProps<SVGSVGElement>>;
    year?       : string;
    // Projects without a page yet are shown as "Upcoming"
    href?       : string;
}

export interface TimelinePeriod {
    dates    : string;
    org      : string;
    projects : Project[];
}

// Newest first
export const timeline: TimelinePeriod[] = [
    {
        dates    : "2025 – now",
        org      : "Reserve Bank Innovation Hub",
        projects : [],
    },
    {
        dates    : "2020 – 2025",
        org      : "Setu",
        projects : [
            {
                title       : "Path to partnerships",
                description : "Building trust across discovery and onboarding touchpoints.",
                category    : "Experience",
                year        : "2024",
                href        : "/experiences/path-to-partnerships",
                Thumbnail   : PartnershipsThumbnail,
            },
            {
                title       : "Assisted product discovery",
                description : "Helping potential customers find the most relevant solutions.",
                category    : "Experience",
                year        : "2024",
                href        : "/experiences/assisted-product-discovery",
                Thumbnail   : ProductDiscoveryThumbnail,
            },
            {
                title       : "Digital journeys for HDFC Bank",
                description : "Simplified account opening for customers and bank agents.",
                category    : "Experience",
                year        : "2023",
                href        : "/experiences/hdfc-journeys",
                Thumbnail   : HDFCThumbnail,
            },
            {
                title       : "Revamping reports on Bridge",
                description : "Scheduling, smarter filters and more flexible reports.",
                category    : "Experience",
                year        : "2020 – 23",
                href        : "/experiences/revamping-reports",
                Thumbnail   : ReportsThumbnail,
            },
            {
                title       : "Icon system",
                description : "~150 icons across products, decks, print and Slack.",
                category    : "Visual",
                href        : "/visual/icon-system-for-setu",
                Thumbnail   : IconSystemThumbnail,
            },
            {
                title       : "People experience",
                description : "Hiring, onboarding and engagement design.",
                category    : "Visual",
                href        : "/visual/people-experience",
                Thumbnail   : PeopleExperienceThumbnail,
            },
            {
                title       : "Bill Pay",
                description : "Payment experience. Case study coming soon.",
                category    : "Experience",
                Thumbnail   : BillPayThumbnail,
            },
        ],
    },
    {
        dates    : "2019",
        org      : "Ather Energy",
        projects : [
            {
                title       : "Ather Go",
                description : "Exhibition design system for pop-up and delivery events.",
                category    : "Visual",
                year        : "2019",
                Thumbnail   : AtherThumbnail,
            },
        ],
    },
    {
        dates    : "2018 – 2019",
        org      : "Nonesuch Studio",
        projects : [],
    },
    {
        dates    : "2017 – 2019",
        org      : "National Institute of Design",
        projects : [
            {
                title       : "Kannauj Perfumery",
                description : "Retail communication, brand imagery and print.",
                category    : "Visual",
                href        : "/visual/kannauj-perfumery",
                Thumbnail   : KannaujThumbnail,
            },
        ],
    },
    {
        dates    : "Ongoing",
        org      : "Personal",
        projects : [
            {
                title       : "47 days of Devanagari Type",
                description : "A Devanagari letterform a day, from different perspectives.",
                category    : "Type",
                href        : "/type/47-days-of-devanagari-type",
                Thumbnail   : DevanagariThumbnail,
            },
            {
                title       : "26 days of Type",
                description : "A personal take on the alphabet, one letter a day.",
                category    : "Visual",
                href        : "/visual/26-days-of-type",
                Thumbnail   : DaysOfTypeThumbnail,
            },
            {
                title       : "Inktober",
                description : "A daily pen-and-ink practice in type and illustration.",
                category    : "Type",
                year        : "2017",
                href        : "/type/inktober-2017",
                Thumbnail   : InktoberThumbnail,
            },
        ],
    },
];
