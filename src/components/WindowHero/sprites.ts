// Pixel sprites for the view through the window

// TYPES =======================================================================
import type { Sprite } from "@/components/PixelSprite/PixelSprite";








export const sun: Sprite = {
    rows: [
        "..AAAA..",
        ".AAAAAA.",
        "AAAAAAAA",
        "AAAAAAAA",
        "AAAAAAAA",
        "AAAAAAAA",
        ".AAAAAA.",
        "..AAAA..",
    ],
    palette: { A: "#F6D36B" },
};

export const moon: Sprite = {
    rows: [
        "..AAA...",
        ".AAA....",
        "AAA.....",
        "AAA.....",
        "AAA.....",
        "AAAA....",
        ".AAAAAA.",
        "..AAAA..",
    ],
    palette: { A: "#EDEFF5" },
};

export const skyline: Sprite = {
    rows: [
        "................................................................................................",
        ".............................................SSS................................................",
        "..................SSS........................SSS................................................",
        "..................SSS.........SSS............SSS........................SSS.....................",
        ".........SSS......SSS.........SSS............SSS............SSS.........SSS.....................",
        ".........SSS......SSS...SSS...SSS............SSS......SSS...SSS.........SSS......SSS............",
        "...SSS...SSS......SSS...SSS...SSS......SSS...SSS......SSS...SSS...SSS...SSS......SSS......SSS...",
        "...SSS...SSS...SSSSSS...SSS...SSSSSS...SSS...SSSSSS...SSS...SSS...SSS...SSS...SSSSSS......SSS...",
        "...SSSSSSSSS...SSSSSSSSSSSS...SSSSSS...SSSSSSSSSSSS...SSSSSSSSS...SSSSSSSSS...SSSSSS...SSSSSS...",
        "SSSSSSSSSSSS...SSSSSSSSSSSSSSSSSSSSS...SSSSSSSSSSSSSSSSSSSSSSSS...SSSSSSSSSSSSSSSSSS...SSSSSSSSS",
        "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
        "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
        "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
        "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ],
    palette: { S: "currentColor" },
};
