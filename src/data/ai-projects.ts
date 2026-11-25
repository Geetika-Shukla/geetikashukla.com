/*
 * Projects built with AI, shown under Work's AI filter with a "Built using AI"
 * label; each has its own page under /ai. The stills and clips on those pages
 * are retaken with `npm run glimpses`, except the ones cut from screen
 * recordings (the originals are kept out of the repo, in media-sources/).
 */

// SCREENS =====================================================================
import gffKeynote from "@/assets/images/motion/gff-keynote-cover.webp";
import oneLakhThumbnail from "@/assets/images/glimpses/one-lakh/thumbnail.webp";

import type { StaticImageData } from "next/image";

export interface AIProject {
    title       : string;
    description : string;
    tools       : string[];
    href?       : string;
    placeholder : boolean;
    // What the thumbnail says until there's an image ("Coming soon" if left out)
    note?       : string;
    // Screens to play in the thumbnail, one after another
    screens?    : StaticImageData[];
    // Or a clip to play in it (an MP4 in public/, `length` ms long, its still shown first)
    clip?       : { clip: string; poster: StaticImageData; length: number };
    // Or a still cover
    cover?      : StaticImageData;
    // Kept here but left off Work for now
    archived?   : boolean;
}

export const AI_PROJECTS: AIProject[] = [
    {
        title       : "The invisible future of finance",
        description : "A keynote deck for the CEO of Reserve Bank Innovation Hub at Global Fintech Fest 2026.",
        tools       : ["Keynote", "Presentation"],
        href        : "/ai/gff-2026-keynote",
        placeholder : false,
        cover       : gffKeynote,
    },
    {
        title       : "What ₹1 lakh could buy",
        description : "A data story on the RBIH Indian Financial Data Atlas: one sum, carried from 2001 to 2026.",
        tools       : ["Data story", "Next.js"],
        href        : "/ai/what-one-lakh-could-buy",
        placeholder : false,
        // The story's opening (the notes pulling back from the title), cut from a screen recording of it
        clip        : { clip: "/glimpses/one-lakh/thumbnail.mp4", poster: oneLakhThumbnail, length: 6500 },
    },
    // PLACEHOLDER: the thumbnail and a line about it, once there's something to show.
    // ARCHIVED until then: its page is at /ai/rbih-website, unlinked
    {
        title       : "Reserve Bank Innovation Hub's website",
        description : "Revamping the website for Reserve Bank Innovation Hub.",
        tools       : ["Website"],
        href        : "/ai/rbih-website",
        placeholder : true,
        archived    : true,
    },
];
