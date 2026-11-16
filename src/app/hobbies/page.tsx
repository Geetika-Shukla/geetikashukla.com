// EXTERNAL DEPS ===============================================================
import React from "react";
import Image from "next/image";

// COMPONENTS ==================================================================
import { IsoFloor } from "@/components/IsoFloor/IsoFloor";

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
import type { IsoSize, IsoTile } from "@/components/IsoFloor/IsoFloor";

/*
 * Photos laid on the floor's lattice (see IsoFloor) in a flat band that runs
 * off the right of the screen, beside the intro. Wide imagery takes a 2×1
 * card; `focus` picks which part of a cropped photo stays in view.
 */
const PHOTOS: { title: string; alt: string; image: StaticImageData; size: IsoSize; u: number; v: number; focus?: string }[] = [
    { title: "Studio Ghibli", alt: "Studio Ghibli-inspired artwork", image: ghibli, size: "2x1", u: 0, v: 0 },
        { title: "Calligraphy", alt: "Calligraphy piece", image: calliOne, size: "1x1", u: -11, v: 11 },
    { title: "Japanese fiction", alt: "Japanese fiction books", image: japanFic, size: "1x1", u: 0, v: 11 },
    { title: "Sewing", alt: "Handmade laptop sleeve", image: sleeve, size: "1x1", u: 11, v: 11 },
    { title: "Calligraphy", alt: "Calligraphy piece", image: calliTwo, size: "1x1", u: 22, v: 11 },
    { title: "Vinyls", alt: "Spirited Away-inspired artwork", image: spirited, size: "1x1", u: -11, v: 22 },
    { title: "Gardening", alt: "Animation of house plants", image: plants, size: "1x1", u: 0, v: 22, focus: "50% 100%" },
    { title: "Lego", alt: "Japan-themed Lego build", image: lego, size: "2x1", u: 11, v: 22, focus: "50% 70%" },
];

const TILES: IsoTile[] = PHOTOS.map(({ title, alt, image, size, u, v, focus }) => ({
    id   : image.src,
    title, size, u, v, focus,
    face : <Image src={image} alt={alt} sizes="(min-width: 900px) 30vw, 50vw" />,
}));

const HobbiesPage = () => {
    return (
        <article className="interests iso-page">
            <div className="interests__scene iso">
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

                <IsoFloor tiles={TILES} captions="overlay" />
            </div>
        </article>
    );
};

export default HobbiesPage;
