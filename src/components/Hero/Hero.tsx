"use client";

// EXTERNAL DEPS ===============================================================
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// INTERNAL DEPS ===============================================================
import { FilterCoffee, InkBottle, PixelHeart, Soap, Spool, StickyNote, Vinyl } from "./Illustrations";

// STYLES ======================================================================
import "./hero.css";

// ASSETS ======================================================================
import calliOne from "@/assets/images/calli-1.png";

// TYPES =======================================================================
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import type { StaticImageData } from "next/image";

// A photo, optionally zoomed in within its frame
const photo = (image: StaticImageData, alt: string, zoom = 1) => (
    <Image src={image} alt={alt} sizes="16vw" draggable={false} style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined} />
);

// A space for an image still to come, in the shape it will take (width / height)
const placeholder = (ratio: number) => (
    <span className="hero__placeholder" style={{ aspectRatio: ratio }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a1.5 1.5 0 1 0 0-.01" /></svg>
    </span>
);

/*
 * Things on the board: photos, illustrations and placeholders for images still
 * to come (kept in the shape they'll take, so the layout holds). Each has
 * two places, as percentages of the board (its centre):
 *   scatter: [x, y, tilt] round the edges, leaving the middle for the intro
 *   grid:    [x, y] in a cell of a 7 × 4 grid. Columns are centred at 8, 22,
 *            36, 50, 64, 78 and 92%; rows at 18, 38, 58 and 78%. Phrases take
 *            some cells and others are left empty.
 * The hero opens on the grid; scrolling through it scatters everything.
 */
interface Item {
    id      : string;
    kind    : "photo" | "art" | "placeholder";
    content : ReactNode;
    label   : string;
    w       : string;
    scatter : [number, number, number];
    grid    : [number, number];
}

const ITEMS: Item[] = [
    { id: "calli", kind: "photo", content: photo(calliOne, "Calligraphy", 1.25), label: "Calligraphy", w: "clamp(90px, 8.5vw, 140px)", scatter: [8, 52, 4], grid: [8, 18] },
    { id: "image-1", kind: "placeholder", content: placeholder(16 / 10), label: "Image to come", w: "clamp(130px, 12vw, 190px)", scatter: [50, 11, -3], grid: [50, 18] },
    { id: "coffee", kind: "art", content: <FilterCoffee />, label: "Filter coffee", w: "clamp(64px, 5.5vw, 90px)", scatter: [70, 17, 5], grid: [64, 18] },
    { id: "heart", kind: "art", content: <PixelHeart />, label: "A pixel heart", w: "clamp(44px, 3.6vw, 60px)", scatter: [24, 43, -8], grid: [78, 18] },
    { id: "image-2", kind: "placeholder", content: placeholder(0.72), label: "Image to come", w: "clamp(90px, 8.5vw, 140px)", scatter: [86, 22, 6], grid: [92, 18] },

    { id: "ink", kind: "art", content: <InkBottle />, label: "Ink and nib", w: "clamp(64px, 5.5vw, 90px)", scatter: [30, 87, -4], grid: [8, 38] },
    { id: "image-3", kind: "placeholder", content: placeholder(2), label: "Image to come", w: "clamp(150px, 15vw, 240px)", scatter: [14, 20, -6], grid: [22, 38] },
    { id: "vinyl", kind: "art", content: <Vinyl />, label: "Vinyls", w: "clamp(84px, 7.5vw, 120px)", scatter: [31, 16, 7], grid: [78, 38] },
    { id: "spool", kind: "art", content: <Spool />, label: "Sewing", w: "clamp(54px, 4.5vw, 76px)", scatter: [93, 45, 10], grid: [92, 38] },

    { id: "image-4", kind: "placeholder", content: placeholder(1.43), label: "Image to come", w: "clamp(120px, 12vw, 190px)", scatter: [16, 80, 5], grid: [8, 58] },
    { id: "image-5", kind: "placeholder", content: placeholder(0.56), label: "Image to come", w: "clamp(80px, 7.5vw, 120px)", scatter: [77, 50, -5], grid: [50, 58] },
    { id: "image-6", kind: "placeholder", content: placeholder(16 / 10), label: "Image to come", w: "clamp(130px, 12vw, 190px)", scatter: [87, 76, 4], grid: [64, 58] },
    { id: "image-7", kind: "placeholder", content: placeholder(0.71), label: "Image to come", w: "clamp(80px, 7.5vw, 120px)", scatter: [72, 82, -7], grid: [92, 58] },

    { id: "note", kind: "art", content: <StickyNote />, label: "To-do", w: "clamp(80px, 7vw, 110px)", scatter: [39, 86, 3], grid: [8, 78] },
    { id: "image-8", kind: "placeholder", content: placeholder(16 / 10), label: "Image to come", w: "clamp(84px, 7.5vw, 120px)", scatter: [59, 88, -5], grid: [22, 78] },
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

// A tiny heart floating up from the pixel heart when it's clicked
type Particle = { id: number; x: number; y: number; dx: number; rise: number; spin: number; delay: number; size: number };
const BURST = 10;

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

    // Clicking the pixel heart (without dragging it) sends up a burst of tiny hearts
    const [particles, setParticles] = useState<Particle[]>([]);
    const nextParticle = useRef(0);

    const burst = (from: HTMLElement) => {
        const board = boardRef.current;
        if (!board) return;
        const origin = board.getBoundingClientRect();
        const heart = from.getBoundingClientRect();
        const x = heart.left + heart.width / 2 - origin.left;
        const y = heart.top + heart.height / 2 - origin.top;
        const fresh = Array.from({ length: BURST }, (): Particle => ({
            id    : nextParticle.current++,
            x, y,
            dx    : (Math.random() - 0.5) * 140,
            rise  : 90 + Math.random() * 90,
            spin  : (Math.random() - 0.5) * 60,
            delay : Math.random() * 120,
            size  : 12 + Math.random() * 12,
        }));
        setParticles((current) => [...current, ...fresh]);
        const ids = new Set(fresh.map(({ id }) => id));
        window.setTimeout(() => setParticles((current) => current.filter(({ id }) => !ids.has(id))), 1400);
    };

    const onPointerUp = (event: PointerEvent<HTMLElement>) => {
        if (drag.current?.id === "heart" && !drag.current.moved) burst(event.currentTarget);
        drag.current = null;
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

                {/* Tiny hearts from a click on the pixel heart */}
                <div className="hero__burst" aria-hidden="true">
                    {particles.map(({ id, x, y, dx, rise, spin, delay, size }) => (
                        <span
                            key={id}
                            className="hero__spark"
                            style={{
                                left: x, top: y, width: size,
                                "--dx": `${dx}px`, "--rise": `${-rise}px`, "--spin": `${spin}deg`,
                                animationDelay: `${delay}ms`,
                            } as CSSProperties}
                        >
                            <PixelHeart />
                        </span>
                    ))}
                </div>

                <ul className="hero__items">
                    {ITEMS.map(({ id, kind, content, label, w, scatter: [sx, sy, tilt], grid: [gx, gy] }) => {
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
                        const handlers = { onPointerDown: onPointerDown(id), onPointerMove, onPointerUp };
                        return (
                            <li key={id} className={`hero__item hero__item--${kind}`} style={style} title={label}>
                                <span ref={(node) => { thingRefs.current[id] = node; }} className="hero__thing" {...handlers}>{content}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
