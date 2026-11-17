"use client";

// EXTERNAL DEPS ===============================================================
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// INTERNAL DEPS ===============================================================
import { timeline } from "@/data/projects";
import { FilterCoffee, InkBottle, PixelHeart, Soap, Spool, StickyNote, Vinyl } from "./Illustrations";

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
 *            36, 50, 64, 78 and 92%; rows at 18, 38, 58 and 78%. Phrases take
 *            some cells and others are left empty.
 * The hero opens on the grid; scrolling through it scatters everything.
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
    { id: "calli", kind: "photo", content: photo(calliOne, "Calligraphy"), label: "Calligraphy", w: "clamp(90px, 8.5vw, 140px)", scatter: [8, 52, 4], grid: [8, 18] },
    { id: "type", kind: "work", content: work("/visual/26-days-of-type"), label: "26 days of Type", href: "/visual/26-days-of-type", w: "clamp(130px, 12vw, 190px)", scatter: [50, 11, -3], grid: [50, 18] },
    { id: "coffee", kind: "art", content: <FilterCoffee />, label: "Filter coffee", w: "clamp(64px, 5.5vw, 90px)", scatter: [70, 17, 5], grid: [64, 18] },
    { id: "heart", kind: "art", content: <PixelHeart />, label: "A pixel heart", w: "clamp(44px, 3.6vw, 60px)", scatter: [24, 43, -8], grid: [78, 18] },
    { id: "books", kind: "photo", content: photo(japanFic, "Japanese fiction"), label: "Japanese fiction", w: "clamp(90px, 8.5vw, 140px)", scatter: [86, 22, 6], grid: [92, 18] },

    { id: "ink", kind: "art", content: <InkBottle />, label: "Ink and nib", w: "clamp(64px, 5.5vw, 90px)", scatter: [30, 87, -4], grid: [8, 38] },
    { id: "ghibli", kind: "photo", content: photo(ghibli, "Studio Ghibli figurines"), label: "Studio Ghibli", w: "clamp(150px, 15vw, 240px)", scatter: [14, 20, -6], grid: [22, 38] },
    { id: "vinyl", kind: "art", content: <Vinyl />, label: "Vinyls", w: "clamp(84px, 7.5vw, 120px)", scatter: [31, 16, 7], grid: [78, 38] },
    { id: "spool", kind: "art", content: <Spool />, label: "Sewing", w: "clamp(54px, 4.5vw, 76px)", scatter: [93, 45, 10], grid: [92, 38] },

    { id: "lego", kind: "photo", content: photo(lego, "Japan in Lego"), label: "Lego", w: "clamp(120px, 12vw, 190px)", scatter: [16, 80, 5], grid: [8, 58] },
    { id: "plants", kind: "photo", content: photo(plants, "House plants"), label: "Gardening", w: "clamp(80px, 7.5vw, 120px)", scatter: [77, 50, -5], grid: [50, 58] },
    { id: "inktober", kind: "work", content: work("/type/inktober-2017", true), label: "Inktober", href: "/type/inktober-2017", w: "clamp(130px, 12vw, 190px)", scatter: [87, 76, 4], grid: [64, 58] },
    { id: "sleeve", kind: "photo", content: photo(sleeve, "A handmade laptop sleeve"), label: "Sewing", w: "clamp(80px, 7.5vw, 120px)", scatter: [72, 82, -7], grid: [92, 58] },

    { id: "note", kind: "art", content: <StickyNote />, label: "To-do", w: "clamp(80px, 7vw, 110px)", scatter: [39, 86, 3], grid: [8, 78] },
    { id: "icons", kind: "work", content: work("/visual/icon-system-for-setu"), label: "Icon system", href: "/visual/icon-system-for-setu", w: "clamp(84px, 7.5vw, 120px)", scatter: [59, 88, -5], grid: [22, 78] },
    { id: "soap", kind: "art", content: <Soap />, label: "Soaps", w: "clamp(60px, 5vw, 84px)", scatter: [93, 90, -6], grid: [92, 78] },
];

// A line set across the grid, a phrase to a pair of cells, read left to right,
// top to bottom
const PHRASES: { text: string; at: [number, number] }[] = [
    { text: "Always a student,", at: [29, 18] },
    { text: "from buildings to brands,", at: [57, 38] },
    { text: "exhibitions to products,", at: [29, 58] },
    { text: "and whatever comes next…", at: [71, 78] },
];

type Offsets = Record<string, { x: number; y: number }>;

type Size = { w: number; h: number };

// The board's grid: squares of BLOCK px, drawn from its top-left corner (hero.css).
// Phrases and things sit in cut-outs of whole squares, centred on their place.
// A phrase's is PHRASE_ROWS tall and about two of the board's cells (29% of
// its width) wide; a thing's is the thing plus about half a square all round.
const BLOCK = 24;
const PHRASE_ROWS = 3;

type Cut = { left: number; top: number; width: number; height: number };

const cutOut = ([x, y]: [number, number], columns: number, rows: number, board: Size): Cut => ({
    left   : Math.round(((x / 100) * board.w - (columns * BLOCK) / 2) / BLOCK) * BLOCK,
    top    : Math.round(((y / 100) * board.h - (rows * BLOCK) / 2) / BLOCK) * BLOCK,
    width  : columns * BLOCK,
    height : rows * BLOCK,
});

// Drawn just inside the grid lines that bound it, so those lines stay as its edge
const cutStyle = ({ left, top, width, height }: Cut): CSSProperties =>
    ({ left: left + 1, top: top + 1, width: width - 1, height: height - 1 });

const phraseCut = (at: [number, number], board: Size) => cutOut(at, Math.floor((board.w * 0.29) / BLOCK), PHRASE_ROWS, board);
const thingCut = (at: [number, number], size: Size, board: Size) =>
    cutOut(at, Math.ceil((size.w + BLOCK) / BLOCK), Math.ceil((size.h + BLOCK) / BLOCK), board);

/*
 * Hero: a board of things, opening as a tidy grid with a line set in its
 * cells. The section is taller than the screen and its board stays put while
 * it scrolls past; the scroll (0 → 1, as --p) scatters everything to the
 * edges and brings in the intro. Things can also be dragged about.
 */
export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const boardRef = useRef<HTMLDivElement>(null);
    // The board's and the things' sizes, to fit their cut-outs to the grid
    const [board, setBoard] = useState<Size | null>(null);
    const [sizes, setSizes] = useState<Record<string, Size>>({});
    const thingRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const element = boardRef.current;
        if (!element) return;
        const measure = () => {
            setBoard({ w: element.clientWidth, h: element.clientHeight });
            setSizes(Object.fromEntries(Object.entries(thingRefs.current).flatMap(([id, thing]) =>
                thing ? [[id, { w: thing.offsetWidth, h: thing.offsetHeight }]] : [])));
        };
        // Photos change size as they load, so watch the things as well as the board
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        Object.values(thingRefs.current).forEach((thing) => thing && observer.observe(thing));
        return () => observer.disconnect();
    }, []);
    // How far each thing has been dragged from its place (px)
    const [offsets, setOffsets] = useState<Offsets>({});
    const drag = useRef<{ id: string; x: number; y: number; from: { x: number; y: number }; moved: boolean } | null>(null);

    // Scroll progress through the hero, as --p (0 at the top, 1 once fully scattered)
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            // The scatter takes the first 100svh of the hero's scroll; the rest is a pause
            const travel = Math.min(window.innerHeight, section.offsetHeight - window.innerHeight);
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
            <div className="hero__board" ref={boardRef}>
                <header className="hero__intro">
                    <h1 className="hero__title">Geetika Shukla</h1>
                    <p className="hero__role">
                        Manager — Design @ Reserve Bank Innovation Hub <span aria-hidden="true">·</span> Ex-Setu
                    </p>
                </header>

                <ul className="hero__phrases" aria-hidden="true">
                    {board && PHRASES.map(({ text, at }) => (
                        <li key={text} className="hero__phrase" style={cutStyle(phraseCut(at, board))}>
                            {text}
                        </li>
                    ))}
                </ul>

                {/* Each thing's cut-out, where it sits in the grid */}
                <ul className="hero__cuts" aria-hidden="true">
                    {board && ITEMS.map(({ id, grid }) => sizes[id] && (
                        <li key={id} className="hero__cut" style={cutStyle(thingCut(grid, sizes[id], board))} />
                    ))}
                </ul>

                <ul className="hero__items">
                    {ITEMS.map(({ id, kind, content, label, href, w, scatter: [sx, sy, tilt], grid: [gx, gy] }) => {
                        const offset = offsets[id] ?? { x: 0, y: 0 };
                        // In the grid, centred in its cut-out once measured
                        const cut = board && sizes[id] ? thingCut([gx, gy], sizes[id], board) : null;
                        const style = {
                            "--sx": `${sx}%`, "--sy": `${sy}%`,
                            "--gx": cut ? `${cut.left + cut.width / 2}px` : `${gx}%`,
                            "--gy": cut ? `${cut.top + cut.height / 2}px` : `${gy}%`,
                            "--tilt": `${tilt}deg`, "--w": w,
                            "--dx": `${offset.x}px`, "--dy": `${offset.y}px`,
                        } as CSSProperties;
                        const handlers = { onPointerDown: onPointerDown(id), onPointerMove, onPointerUp, onClick };
                        return (
                            <li key={id} className={`hero__item hero__item--${kind}`} style={style} title={label}>
                                {href
                                    ? <Link href={href} ref={(node) => { thingRefs.current[id] = node; }} className="hero__thing" draggable={false} aria-label={label} {...handlers}>{content}</Link>
                                    : <span ref={(node) => { thingRefs.current[id] = node; }} className="hero__thing" {...handlers}>{content}</span>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
