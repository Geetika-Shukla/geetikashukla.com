"use client";

// EXTERNAL DEPS ===============================================================
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

// INTERNAL DEPS ===============================================================
import { timeline } from "@/data/projects";
import { InkBottle, Mug, PixelHeart, Soap, Spool, StickyNote } from "./Illustrations";

// STYLES ======================================================================
import "./hero.css";

// ASSETS ======================================================================
import calliOne from "@/assets/images/calli-1.png";
import ghibli from "@/assets/images/ghibli-image.jpg";
import sleeve from "@/assets/images/laptop-sleeve.jpg";
import japanFic from "@/assets/images/japan-books.jpg";
import lego from "@/assets/images/japan-lego.jpg";
import plants from "@/assets/images/plants.webp";
import spirited from "@/assets/images/spirited-away.jpg";

// TYPES =======================================================================
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { StaticImageData } from "next/image";

type Layout = "scatter" | "board";

const PROJECTS = new Map(timeline.flatMap((period) => period.projects).map((project) => [project.href, project]));

const photo = (image: StaticImageData, alt: string) => <Image src={image} alt={alt} sizes="16vw" draggable={false} />;
// Thumbnails fill their card, or sit whole where cropping would cut the artwork
const work = (href: string, whole = false) => {
    const project = PROJECTS.get(href);
    return project ? <project.Thumbnail aria-hidden="true" preserveAspectRatio={whole ? "xMidYMid meet" : "xMidYMid slice"} /> : null;
};

/*
 * Things on the board: photos from the interests, project thumbnails and small
 * illustrations. Each has two places, as percentages of the board (its
 * centre), with a tilt:
 *   scatter: around the edges, leaving the middle for the intro
 *   board:   in the cells of a 6 × 4 grid (rows at 14, 35, 56 and 77%, clear
 *            of the layout switch below), around phrases from the intro
 * w is its width.
 */
interface Item {
    id      : string;
    kind    : "photo" | "work" | "art";
    content : ReactNode;
    label   : string;
    href?   : string;
    w       : string;
    scatter : [number, number, number];
    board   : [number, number];
}

const ITEMS: Item[] = [
    { id: "ghibli", kind: "photo", content: photo(ghibli, "Studio Ghibli figurines"), label: "Studio Ghibli", href: "/hobbies", w: "clamp(150px, 15vw, 240px)", scatter: [14, 20, -6], board: [26, 35] },
    { id: "calli", kind: "photo", content: photo(calliOne, "Calligraphy"), label: "Calligraphy", href: "/hobbies", w: "clamp(90px, 8.5vw, 140px)", scatter: [8, 52, 4], board: [10, 14] },
    { id: "heart", kind: "art", content: <PixelHeart />, label: "Interests", href: "/hobbies", w: "clamp(44px, 3.6vw, 60px)", scatter: [24, 43, -8], board: [10, 35] },
    { id: "lego", kind: "photo", content: photo(lego, "Japan in Lego"), label: "Lego", href: "/hobbies", w: "clamp(120px, 12vw, 190px)", scatter: [16, 80, 5], board: [10, 56] },
    { id: "ink", kind: "art", content: <InkBottle />, label: "Ink and nib", w: "clamp(64px, 5.5vw, 90px)", scatter: [30, 87, -4], board: [10, 77] },
    { id: "vinyl", kind: "photo", content: photo(spirited, "A Spirited Away vinyl"), label: "Vinyls", href: "/hobbies", w: "clamp(80px, 7.5vw, 120px)", scatter: [31, 15, 7], board: [42, 35] },
    { id: "type", kind: "work", content: work("/visual/26-days-of-type"), label: "26 days of Type", href: "/visual/26-days-of-type", w: "clamp(130px, 12vw, 190px)", scatter: [50, 11, -3], board: [58, 14] },
    { id: "note", kind: "art", content: <StickyNote />, label: "To-do", w: "clamp(80px, 7vw, 110px)", scatter: [39, 86, 3], board: [26, 77] },
    { id: "icons", kind: "work", content: work("/visual/icon-system-for-setu"), label: "Icon system", href: "/visual/icon-system-for-setu", w: "clamp(84px, 7.5vw, 120px)", scatter: [59, 88, -5], board: [42, 77] },
    { id: "mug", kind: "art", content: <Mug />, label: "Tea", w: "clamp(60px, 5vw, 84px)", scatter: [70, 17, 5], board: [74, 14] },
    { id: "books", kind: "photo", content: photo(japanFic, "Japanese fiction"), label: "Japanese fiction", href: "/hobbies", w: "clamp(90px, 8.5vw, 140px)", scatter: [86, 22, 6], board: [90, 14] },
    { id: "plants", kind: "photo", content: photo(plants, "House plants"), label: "Gardening", href: "/hobbies", w: "clamp(80px, 7.5vw, 120px)", scatter: [77, 50, -5], board: [58, 56] },
    { id: "spool", kind: "art", content: <Spool />, label: "Sewing", w: "clamp(54px, 4.5vw, 76px)", scatter: [93, 45, 10], board: [90, 35] },
    { id: "inktober", kind: "work", content: work("/type/inktober-2017", true), label: "Inktober", href: "/type/inktober-2017", w: "clamp(130px, 12vw, 190px)", scatter: [87, 76, 4], board: [74, 56] },
    { id: "sleeve", kind: "photo", content: photo(sleeve, "A handmade laptop sleeve"), label: "Sewing", href: "/hobbies", w: "clamp(80px, 7.5vw, 120px)", scatter: [72, 82, -7], board: [90, 56] },
    { id: "soap", kind: "art", content: <Soap />, label: "Soaps", w: "clamp(60px, 5vw, 84px)", scatter: [93, 90, -6], board: [90, 77] },
];

// The intro, set in the board's cells (centre x, y; each spans two cells)
const PHRASES: { text: string; at: [number, number] }[] = [
    { text: "Hello, I’m Geetika", at: [34, 14] },
    { text: "a multi-disciplinary designer", at: [66, 35] },
    { text: "brand · exhibition · web · product", at: [34, 56] },
    { text: "around 7 years in", at: [66, 77] },
];

type Offsets = Record<string, { x: number; y: number }>;

export const Hero = () => {
    const [layout, setLayout] = useState<Layout>("scatter");
    // How far each thing has been dragged from its place (px)
    const [offsets, setOffsets] = useState<Offsets>({});
    const drag = useRef<{ id: string; x: number; y: number; from: { x: number; y: number }; moved: boolean } | null>(null);

    const arrange = (next: Layout) => {
        setLayout(next);
        setOffsets({});
    };

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
        <section className="hero" data-layout={layout} aria-label="Introduction">
            <header className="hero__intro">
                <h1 className="hero__title">Hello there!</h1>
                <p className="hero__bio">
                    I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning brand,
                    exhibition, web, and product design.
                </p>
            </header>

            {/* The intro again, as phrases in the board's cells (shown in the board layout) */}
            <ul className="hero__phrases" aria-hidden="true">
                {PHRASES.map(({ text, at: [x, y] }) => (
                    <li key={text} className="hero__phrase" style={{ "--x": `${x}%`, "--y": `${y}%` } as CSSProperties}>{text}</li>
                ))}
            </ul>

            <ul className="hero__items">
                {ITEMS.map(({ id, kind, content, label, href, w, scatter, board }) => {
                    const [x, y, tilt] = layout === "scatter" ? scatter : [...board, 0];
                    const offset = offsets[id] ?? { x: 0, y: 0 };
                    const style = {
                        "--x": `${x}%`, "--y": `${y}%`, "--tilt": `${tilt}deg`, "--w": w,
                        "--dx": `${offset.x}px`, "--dy": `${offset.y}px`,
                    } as CSSProperties;
                    const handlers = {
                        onPointerDown : onPointerDown(id),
                        onPointerMove,
                        onPointerUp,
                        onClick,
                    };
                    return (
                        <li key={id} className={`hero__item hero__item--${kind}`} style={style} title={label}>
                            {href
                                ? <Link href={href} className="hero__thing" draggable={false} aria-label={label} {...handlers}>{content}</Link>
                                : <span className="hero__thing" {...handlers}>{content}</span>}
                        </li>
                    );
                })}
            </ul>

            <div className="hero__layouts" role="group" aria-label="Arrange the board">
                <button type="button" className="hero__layout" aria-pressed={layout === "board"} aria-label="Tidy into a grid" onClick={() => arrange("board")}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>
                </button>
                <button type="button" className="hero__layout" aria-pressed={layout === "scatter"} aria-label="Scatter around the intro" onClick={() => arrange("scatter")}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg>
                </button>
            </div>
        </section>
    );
};
