/*
 * Projects built entirely with AI, shown under Work's AI filter with a
 * "Built using AI" label.
 * PLACEHOLDERS: replace each with the real project (title, a line about it,
 * the tools used and a link) when it's ready. `href` can be left out until
 * there's a page or a live link to point to.
 */

export interface AIProject {
    title       : string;
    description : string;
    tools       : string[];
    href?       : string;
    placeholder : boolean;
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
        title       : "Project three",
        description : "A line about what it is, and what AI did to build it.",
        tools       : ["Tool", "Tool"],
        placeholder : true,
    },
];
