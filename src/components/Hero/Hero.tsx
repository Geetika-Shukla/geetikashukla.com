"use client";

// EXTERNAL DEPS ===============================================================
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// INTERNAL DEPS ===============================================================
import { timeline } from "@/data/projects";
import { InkBottle, Mug, PixelHeart, Soap, Spool, StickyNote, Vinyl } from "./Illustrations";

// STYLES ======================================================================
import "./hero.css";

// ASSETS ======================================================================
import calliOne from "@/assets/images/calli-1.png";
import ghibli from "@/assets/images/ghibli-image.jpg";
import sleeve from "@/assets/images/laptop-sleeve.jpg";
import japanFic from "@/assets/images/japan-books.jpg";
import lego from "@/assets/images/japan-lego.jpg";
import plants from "@/assets/images/plants.webp";

// TYPES =======================================================================
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { StaticImageData } from "next/image";

const PROJECTS = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));

const photo = (image: StaticImageData, alt: string) => <Image src={image} alt={alt} sizes="16vw" draggable={false} />;
// Thumbnails fill their card, or sit whole where cropping would cut the artwork
const work = (href: string, whole = false) => {
    const project = PROJECTS.get(href);
    return project ? <project.Thumbnail aria-hidden="true" preserveAspectRatio={whole ? "xMidYMid meet" : "xMidYMid slice"} /> : null;
};

/*
 * Things on the board: photos, project thumbnails and illustrations. Each has
 * two places, as percentages of the board (its centre):
 *   scatter: [x, y, tilt] round the edges, leaving the middle for the intro
 *   grid:    [x, y] in a cell of a 7 × 4 grid. Columns are centred at 8, 22,
 *            36, 50, 64, 78 and 92%; rows at 14, 35, 56 and 77%. Phrases take
 *            some cells and two are left empty.
 * Scrolling through the hero moves everything from one to the other.
 */
interface Item {
    id      : string;
    kind    : "photo" | "work" | "art";
    content : ReactNode;
    label   : string;
    href?   : string;
    w       : string;
    scatter : [number, number, number];
    grid    : [number, number];
}

const ITEMS: Item[] = [
    { id: "calli", kind: "photo", content: photo(calliOne, "Calligraphy"), label: "Calligraphy", w: "clamp(90px, 8.5vw, 140px)", scatter: [8, 52, 4], grid: [8, 14] },
    { id: "type", kind: "work", content: work("/visual/26-days-of-type"), label: "26 days of Type", href: "/visual/26-days-of-type", w: "clamp(130px, 12vw, 190px)", scatter: [50, 11, -3], grid: [50, 14] },
    { id: "mug", kind: "art", content: <Mug />, label: "Tea", w: "clamp(60px, 5vw, 84px)", scatter: [70, 17, 5], grid: [64, 14] },
    { id: "heart", kind: "art", content: <PixelHeart />, label: "A pixel heart", w: "clamp(44px, 3.6vw, 60px)", scatter: [24, 43, -8], grid: [78, 14] },
    { id: "books", kind: "photo", content: photo(japanFic, "Japanese fiction"), label: "Japanese fiction", w: "clamp(90px, 8.5vw, 140px)", scatter: [86, 22, 6], grid: [92, 14] },

    { id: "ink", kind: "art", content: <InkBottle />, label: "Ink and nib", w: "clamp(64px, 5.5vw, 90px)", scatter: [30, 87, -4], grid: [8, 35] },
    { id: "ghibli", kind: "photo", content: photo(ghibli, "Studio Ghibli figurines"), label: "Studio Ghibli", w: "clamp(150px, 15vw, 240px)", scatter: [14, 20, -6], grid: [22, 35] },
    { id: "vinyl", kind: "art", content: <Vinyl />, label: "Vinyls", w: "clamp(84px, 7.5vw, 120px)", scatter: [31, 16, 7], grid: [78, 35] },
    { id: "spool", kind: "art", content: <Spool />, label: "Sewing", w: "clamp(54px, 4.5vw, 76px)", scatter: [93, 45, 10], grid: [92, 35] },

    { id: "lego", kind: "photo", content: photo(lego, "Japan in Lego"), label: "Lego", w: "clamp(120px, 12vw, 190px)", scatter: [16, 80, 5], grid: [8, 56] },
    { id: "plants", kind: "photo", content: photo(plants, "House plants"), label: "Gardening", w: "clamp(80px, 7.5vw, 120px)", scatter: [77, 50, -5], grid: [50, 56] },
    { id: "inktober", kind: "work", content: work("/type/inktober-2017", true), label: "Inktober", href: "/type/inktober-2017", w: "clamp(130px, 12vw, 190px)", scatter: [87, 76, 4], grid: [64, 56] },
    { id: "sleeve", kind: "photo", content: photo(sleeve, "A handmade laptop sleeve"), label: "Sewing", w: "clamp(80px, 7.5vw, 120px)", scatter: [72, 82, -7], grid: [92, 56] },

    { id: "note", kind: "art", content: <StickyNote />, label: "To-do", w: "clamp(80px, 7vw, 110px)", scatter: [39, 86, 3], grid: [8, 77] },
    { id: "icons", kind: "work", content: work("/visual/icon-system-for-setu"), label: "Icon system", href: "/visual/icon-system-for-setu", w: "clamp(84px, 7.5vw, 120px)", scatter: [59, 88, -5], grid: [22, 77] },
    { id: "soap", kind: "art", content: <Soap />, label: "Soaps", w: "clamp(60px, 5vw, 84px)", scatter: [93, 90, -6], grid: [92, 77] },
];

// A line set across the grid, a phrase to a pair of cells, read left to right,
// top to bottom; and the disciplines, as a label
const PHRASES: { text: string; at: [number, number]; label?: boolean }[] = [
    { text: "Always a student,", at: [29, 14] },
    { text: "from buildings to brands,", at: [57, 35] },
    { text: "exhibitions to products,", at: [29, 56] },
    { text: "brand · exhibition · web · product", at: [43, 77], label: true },
    { text: "and whatever comes next.", at: [71, 77] },
];

type Offsets = Record<string, { x: number; y: number }>;

/*
 * Hero: a board of things round the intro. The section is taller than the
 * screen and its board stays put while it scrolls past; the scroll (0 → 1,
 * as --p) moves everything from the scatter into the grid, the intro giving
 * way to the line across the grid. Things can also be dragged about.
 */
export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    // How far each thing has been dragged from its place (px)
    const [offsets, setOffsets] = useState<Offsets>({});
    const drag = useRef<{ id: string; x: number; y: number; from: { x: number; y: number }; moved: boolean } | null>(null);

    // Scroll progress through the hero, as --p (0 at the top, 1 once fully arranged)
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const travel = section.offsetHeight - window.innerHeight;
            const scrolled = -section.getBoundingClientRect().top;
            const progress = travel > 0 ? Math.min(Math.max(scrolled / travel, 0), 1) : 0;
            section.style.setProperty("--p", progress.toFixed(3));
        };
        const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            window.cancelAnimationFrame(frame);
        };
    }, []);

    const onPointerDown = (id: string) => (event: PointerEvent<HTMLElement>) => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { id, x: event.clientX, y: event.clientY, from: offsets[id] ?? { x: 0, y: 0 }, moved: false };
    };

    const onPointerMove = (event: PointerEvent<HTMLElement>) => {
        const current = drag.current;
        if (!current) return;
        const dx = event.clientX - current.x;
        const dy = event.clientY - current.y;
        if (Math.hypot(dx, dy) > 4) current.moved = true;
        if (current.moved) setOffsets((previous) => ({ ...previous, [current.id]: { x: current.from.x + dx, y: current.from.y + dy } }));
    };

    const onPointerUp = () => {
        // Leave the flag until the click that follows a drag has been ignored
        window.setTimeout(() => { drag.current = null; }, 0);
    };

    // A drag shouldn't also follow the link it started on
    const onClick = (event: React.MouseEvent) => {
        if (drag.current?.moved) event.preventDefault();
    };

    return (
        <section ref={sectionRef} className="hero" aria-label="Introduction">
            <div className="hero__board">
                <header className="hero__intro">
                    <h1 className="hero__title">Hello there!</h1>
                    <p className="hero__role">
                        Manager — Design @ Reserve Bank Innovation Hub <span aria-hidden="true">·</span> Ex-Setu
                    </p>
                    <p className="hero__line">
                        Seven years of learning by doing — from buildings and exhibitions to brands and products.
                    </p>
                </header>

                <ul className="hero__phrases" aria-hidden="true">
                    {PHRASES.map(({ text, at: [x, y], label }) => (
                        <li
                            key={text}
                            className={`hero__phrase${label ? " hero__phrase--label" : ""}`}
                            style={{ "--x": `${x}%`, "--y": `${y}%` } as CSSProperties}
                        >
                            {text}
                        </li>
                    ))}
                </ul>

                <ul className="hero__items">
                    {ITEMS.map(({ id, kind, content, label, href, w, scatter: [sx, sy, tilt], grid: [gx, gy] }) => {
                        const offset = offsets[id] ?? { x: 0, y: 0 };
                        const style = {
                            "--sx": `${sx}%`, "--sy": `${sy}%`, "--gx": `${gx}%`, "--gy": `${gy}%`,
                            "--tilt": `${tilt}deg`, "--w": w,
                            "--dx": `${offset.x}px`, "--dy": `${offset.y}px`,
                        } as CSSProperties;
                        const handlers = { onPointerDown: onPointerDown(id), onPointerMove, onPointerUp, onClick };
                        return (
                            <li key={id} className={`hero__item hero__item--${kind}`} style={style} title={label}>
                                {href
                                    ? <Link href={href} className="hero__thing" draggable={false} aria-label={label} {...handlers}>{content}</Link>
                                    : <span className="hero__thing" {...handlers}>{content}</span>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
