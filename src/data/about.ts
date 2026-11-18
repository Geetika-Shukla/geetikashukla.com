/*
 * The story behind the work: roles, education, ways of working, résumé and
 * testimonials. Used on the home page (journal, testimonials).
 */

export const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";

export interface Role {
    title   : string;
    company : string;
    dates   : string;
    notes   : string[];
}

export const ROLES: Role[] = [
    {
        title   : "Manager — Design",
        company : "Reserve Bank Innovation Hub",
        dates   : "Sep 2025 – present",
        notes   : [
            "Currently working on rebranding initiatives and building a scalable design system that connects visual identity with product experience.",
        ],
    },
    {
        title   : "Lead Growth Designer",
        company : "Setu by Pine Labs",
        dates   : "Feb 2020 – May 2025",
        notes   : [
            "Led visual and UI design for Setu's core and service-based products.",
            "Built scalable UI frameworks and design systems for in-house products and services used by HDFC, ICICI, and Axis Bank.",
            "Defined brand identity for Setu AA, and maintained visual consistency across web, dashboard, digital products, blog, and social media.",
        ],
    },
    {
        title   : "Retail Experience Designer",
        company : "Ather Energy",
        dates   : "Jun 2019 – Dec 2019",
        notes   : ["Created an exhibition design system and guidelines for pop-up and delivery events."],
    },
    {
        title   : "Freelance Graphic Designer",
        company : "Nonesuch Studio",
        dates   : "Oct 2018 – Nov 2019",
        notes   : ["Worked on brand identity, editorial and social media for a pet hospital."],
    },
];

export interface Degree {
    degree : string;
    field  : string;
    school : string;
}

export const EDUCATION: Degree[] = [
    { degree: "M.Des. (2017–19)", field: "Design for Retail Experience", school: "National Institute of Design, Bengaluru, Karnataka" },
    { degree: "B.Arch. (2011–16)", field: "Architecture", school: "Faculty of Architecture, Lucknow, Uttar Pradesh" },
];

export const PRACTICE: { title: string; text: string }[] = [
    {
        title : "Collaborative by nature",
        text  : "I thrive in open, async environments with clear communication—it gives me the space to focus deeply while staying aligned with the team.",
    },
    {
        title : "Systems thinker",
        text  : "I enjoy building frameworks that bring clarity and cohesion to complex problems. Structure helps teams move faster and design more consistently.",
    },
    {
        title : "Rooted in function, refined in form",
        text  : "I care deeply about aesthetics, but never at the cost of usability. I believe good design begins with purpose—and looks better because of it.",
    },
    {
        title : "Process-driven, not process-bound",
        text  : "I believe in a flexible but clear process—enough to keep things moving with intent, but not so rigid that it stifles exploration.",
    },
];

// Always learning: the path so far, each step with the question it asked
export const PATH: { step: string; question?: string }[] = [
    { step: "Architecture", question: "How do spaces feel?" },
    { step: "Retail design", question: "How do people move through a story?" },
    { step: "Brand", question: "How does an idea look and sound?" },
    { step: "Product", question: "How does it work at scale?" },
    { step: "And next?" },
];

export interface Testimonial {
    quote   : string[];
    name    : string;
    role    : string;
    profile : string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        quote   : [
            "Geetika is one of my favourite people to collaborate with at Setu! Her work is filled with so much creativity, thought, and an incredible attention to not just detail, but craft. There’s a certain magic in everything she creates and every single time, she amazes me with the kind of work she puts out—I go to her with just a basic outline, and she transforms it into a masterpiece that never fails to leave me in awe. Couldn’t be more grateful for the outstanding people experience pieces she’s helped bring to life for our team.",
            "Beyond work, she’s also an amazing person at heart and a joy to be around—kind, thoughtful, and someone you can always count on to keep things real. Always rooting for you, Geetika ❤️",
        ],
        name    : "Ruby Jane Antony",
        role    : "Director, People Ops, Setu",
        profile : "https://www.linkedin.com/in/ruby-jane/",
    },
    {
        quote   : [
            "I had the pleasure of working with Geetika to design the brand identity for my business, and I couldn't be more thrilled with the results! From the start, she took the time to understand my vision, values, and the essence of my brand.",
            "The attention to detail, creativity, and expertise she brought to the table was evident in every aspect of the design. The logo, colour palette, typography, and overall style feel perfectly aligned with the identity I wanted to create.",
            "What truly stood out was Geetika’s professionalism and communication throughout the process. She was very responsive, open to feedback, and delivered on time.",
        ],
        name    : "Sandeep Atmaram",
        role    : "Co-founder, Heads Up for Tails",
        profile : "https://www.linkedin.com/in/sandeep-atmaram-234100217/",
    },
    {
        quote   : [
            "I had the privilege of working with Geetika while in the People Ops team at Setu, where she was our go-to designer for all things visual. From custom letterheads and posters to mailers and swag, her work was always exceptional. She has a knack for turning half-baked ideas into designs that far exceed expectations—both visually striking and versatile.",
            "For anyone looking for a designer with creativity, clarity, and attention to detail, Geetika is an outstanding choice!",
        ],
        name    : "Asveen Kaur",
        role    : "Former Manager, People Ops, Setu",
        profile : "https://www.linkedin.com/in/asveenkaur/",
    },
];
