"use client";

// EXTERNAL DEPS ===============================================================
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

// COMPONENTS ==================================================================
import { DeskScene3D } from "./DeskScene3D";

// DATA ========================================================================
import { timeline } from "@/data/projects";

// STYLES ======================================================================
import "./desk-3d.css";

// TYPES =======================================================================
import type { Focus, PillAnchor } from "./DeskScene3D";
import type { TimelinePeriod } from "@/data/projects";

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";
const LINKEDIN_URL = "https://www.linkedin.com/in/geetikashukla/";

const LINKS = { about: "/more-about-me", hobbies: "/hobbies" };

// Pill labels pinned to objects in the scene (3D anchor points)
const PILLS: (PillAnchor & { label: string; href: string; external?: boolean })[] = [
    { id: "work", label: "Work", href: "/", position: [-1.8, 3.5, -0.75] },
    { id: "about", label: "About me", href: "/more-about-me", position: [-4.3, 1.2, -0.3] },
    { id: "hobbies", label: "Hobbies", href: "/hobbies", position: [4.6, 2.9, -0.85] },
    { id: "resume", label: "Résumé", href: RESUME_URL, position: [1.7, 0.8, 0.3], external: true },
    { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL, position: [3, 1.3, -0.2], external: true },
];

// Where the camera looks for each period of the timeline
const PERIOD_FOCUS: Record<string, Focus> = {
    "Reserve Bank Innovation Hub" : { target: [-1.8, 1.9, -0.5], zoom: 1.7 },
    "Setu"                        : { target: [-1.8, 1.2, 0.2], zoom: 1.5 },
    "Ather Energy"                : { target: [-4.7, 0.6, 0], zoom: 1.9 },
    "Nonesuch Studio"             : { target: [3, 0.7, -0.2], zoom: 2 },
    "National Institute of Design": { target: [1.7, 0.4, 0.3], zoom: 2 },
    "Personal"                    : { target: [4.6, 1.8, -0.8], zoom: 1.7 },
};

type Step =
    | { kind: "intro"; focus: Focus }
    | { kind: "window"; focus: Focus }
    | { kind: "period"; focus: Focus; period: TimelinePeriod }
    | { kind: "outro"; focus: Focus };

const ROOM: Focus = { target: [0.5, 1.6, 0], zoom: 1 };
// Intro: pulled back and looking higher, so the desk sits below the headline
const INTRO: Focus = { target: [0.5, 3.4, 0], zoom: 0.78 };

const STEPS: Step[] = [
    { kind: "intro", focus: INTRO },
    { kind: "window", focus: { target: [0, 3.2, -1.5], zoom: 1.3 } },
    ...timeline.map((period): Step => ({ kind: "period", period, focus: PERIOD_FOCUS[period.org] ?? ROOM })),
    { kind: "outro", focus: ROOM },
];

const Caption = ({ step }: { step: Step }) => {
    if (step.kind === "window") {
        return (
            <>
                <p className="d3-card__eyebrow">The desk</p>
                <p className="d3-card__text">Everything here is a door — the monitor opens my work, the shelf my hobbies.</p>
            </>
        );
    }
    if (step.kind === "outro") {
        return (
            <>
                <p className="d3-card__eyebrow">Say hello</p>
                <div className="d3-card__links">
                    <Link href={LINKS.about}>About me</Link>
                    <Link href={LINKS.hobbies}>Hobbies</Link>
                    <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Résumé</a>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </>
        );
    }
    if (step.kind === "period") {
        const { period } = step;
        return (
            <>
                <p className="d3-card__eyebrow">{period.dates}</p>
                <h2 className="d3-card__title">{period.org}</h2>
                {period.projects.length > 0 && (
                    <ul className="d3-card__projects">
                        {period.projects.map((project) => (
                            <li key={project.title}>
                                {project.href
                                    ? <Link href={project.href}>{project.title}</Link>
                                    : <span>{project.title} <em>· upcoming</em></span>}
                            </li>
                        ))}
                    </ul>
                )}
            </>
        );
    }
    return null;
};

export default function Desk3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);
    const pillRefs = useRef<Record<string, HTMLElement | null>>({});
    const [step, setStep] = useState(0);
    const [meowing, setMeowing] = useState(false);

    // Scroll position → story progress (one step per viewport height)
    useEffect(() => {
        const onScroll = () => {
            const top = containerRef.current?.offsetTop ?? 0;
            const progress = Math.min(Math.max((window.scrollY - top) / window.innerHeight, 0), STEPS.length - 1);
            progressRef.current = progress;
            setStep(Math.round(progress));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const meow = useCallback(() => {
        setMeowing(true);
        window.setTimeout(() => setMeowing(false), 1600);
    }, []);

    const current = STEPS[step];

    return (
        <div className="d3" ref={containerRef} style={{ height: `${STEPS.length * 100}svh` }}>
            <div className="d3__stage">
                <Canvas className="d3__canvas" shadows orthographic dpr={[1, 2]} camera={{ position: [12, 11.6, 14], zoom: 60, near: -100, far: 200 }}>
                    <DeskScene3D progressRef={progressRef} focuses={STEPS.map((s) => s.focus)} pills={PILLS} pillRefs={pillRefs} onMeow={meow} />
                </Canvas>

                {PILLS.map(({ id, label, href, external }) => {
                    const ref = (element: HTMLElement | null) => { pillRefs.current[id] = element; };
                    return external
                        ? <a key={id} ref={ref} className="d3-pill" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                        : <Link key={id} ref={ref} className="d3-pill" href={href}>{label}</Link>;
                })}

                <header className="d3__intro" data-visible={step === 0}>
                    <p className="d3__eyebrow">Multi-disciplinary designer</p>
                    <h1 className="d3__title">Geetika <span>Shukla</span></h1>
                    <p className="d3__bio">
                        I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning brand,
                        exhibition, web, and product design.
                    </p>
                </header>
                <p className="d3__hint" data-visible={step === 0}>Scroll to open the window</p>

                {current.kind !== "intro" && (
                    <div className="d3-card" key={step} aria-live="polite">
                        <Caption step={current} />
                    </div>
                )}

                {meowing && <p className="d3__meow" aria-live="polite">Meow!</p>}
            </div>
        </div>
    );
}
