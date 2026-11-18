/*
 * Projects built entirely with AI, shown under Work's AI filter with a
 * "Built using AI" label.
 * PLACEHOLDERS: replace each with the real project (title, a line about it,
 * the tools used and a link) when it's ready. `href` can be left out until
 * there's a page or a live link to point to.
 */

// SCREENS =====================================================================
// This website, for its own thumbnail
import siteHero from "@/assets/images/motion/site-hero.webp";
import siteWork from "@/assets/images/motion/site-work.webp";
import siteJournal from "@/assets/images/motion/site-journal.webp";
import siteKindWords from "@/assets/images/motion/site-kind-words.webp";

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
}

export const AI_PROJECTS: AIProject[] = [
    {
        title       : "Project one",
        description : "A line about what it is, and what AI did to build it.",
        tools       : ["Tool", "Tool"],
        placeholder : true,
    },
    {
        title       : "Project two",
        description : "A line about what it is, and what AI did to build it.",
        tools       : ["Tool", "Tool"],
        placeholder : true,
    },
    {
        title       : "Well, this website 😄",
        description : "I manually coded v1 of the website. For v2, I designed and prompted; Claude Code built it.",
        tools       : ["Claude Code", "Next.js"],
        placeholder : false,
        screens     : [siteHero, siteWork, siteJournal, siteKindWords],
    },
];
