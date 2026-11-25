// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from "next/image";

// STYLES ======================================================================
import "./page-hobbies.css";

// ASSETS ======================================================================
import calliOne from "@/assets/images/calli-1.png";
import calliTwo from "@/assets/images/calli-2.png";
import ghibli from "@/assets/images/ghibli-image.jpg";
import sleeve from "@/assets/images/laptop-sleeve.jpg";
import japanFic from "@/assets/images/japan-books.jpg";
import lego from "@/assets/images/japan-lego.jpg";
import plants from "@/assets/images/plants.webp";
import spirited from "@/assets/images/spirited-away.jpg";

// TYPES =======================================================================
import type { StaticImageData } from "next/image";

/*
 * Photos in a flat grid, five columns by two rows, beside the intro. Wide
 * imagery spans two columns; the cells are taller than wide, which suits the
 * mostly portrait photos.
 */
const PHOTOS: { alt: string; image: StaticImageData; wide?: boolean }[] = [
    { alt: "Calligraphy piece", image: calliOne },
    { alt: "Studio Ghibli-inspired artwork", image: ghibli, wide: true },
    { alt: "Japanese fiction books", image: japanFic },
    { alt: "Spirited Away-inspired artwork", image: spirited },
    { alt: "Animation of house plants", image: plants },
    { alt: "Handmade laptop sleeve", image: sleeve },
    { alt: "Japan-themed Lego build", image: lego, wide: true },
    { alt: "Calligraphy piece", image: calliTwo },
];

const HobbiesPage = () => {
    return (
        <article className="interests">
            <div className="interests__layout">
                <header className="interests__intro">
                    <h1 className="interests__title">My go-to sources of joy</h1>
                    <p className="interests__text">
                        My interests and hobbies are as varied as they are fleeting, ranging from typography,
                        stitching and home organising to an unexpected fascination with soaps.
                    </p>
                    <p className="interests__text">
                        I cherish the beauty of everyday moments—the quiet, unassuming ones—which explains my love
                        for slice-of-life anime and Japanese fiction.
                    </p>
                </header>

                <ul className="interests__grid">
                    {PHOTOS.map(({ alt, image, wide }) => (
                        <li key={image.src} className={`interests__photo${wide ? " interests__photo--wide" : ""}`}>
                            <Image src={image} alt={alt} sizes="(min-width: 900px) 20vw, 50vw" />
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

export default HobbiesPage;
