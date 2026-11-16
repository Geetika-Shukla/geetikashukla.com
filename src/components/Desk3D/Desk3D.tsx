"use client";

// EXTERNAL DEPS ===============================================================
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

// COMPONENTS ==================================================================
import { DeskScene3D } from "./DeskScene3D";

// STYLES ======================================================================
import "./desk-3d.css";

// TYPES =======================================================================
import type { PillAnchor } from "./DeskScene3D";
import type { DeskObjectId, ObjectHandlers } from "./objects";

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";
const LINKEDIN_URL = "https://www.linkedin.com/in/geetikashukla/";

// Clickable objects: label and where it sits in the scene
const OBJECTS: (PillAnchor & { label: string })[] = [
    { id: "monitor", label: "Work", position: [-1.8, 3.55, -0.75] },
    { id: "echo", label: "About me", position: [-4.3, 1.25, -0.3] },
    { id: "shelf", label: "Hobbies", position: [4.6, 3.05, -0.85] },
    { id: "journals", label: "Résumé", position: [1.6, 0.45, 0.9] },
    { id: "phone", label: "LinkedIn", position: [3.1, 1.75, -0.3] },
];

// One screen: the desk scene. Scrolling past it raises the blind; hovering an
// object leans the camera towards it; clicking opens it.
export default function Desk3D() {
    const router = useRouter();
    const progressRef = useRef(0);
    const hoveredRef = useRef<DeskObjectId | null>(null);
    const pillRefs = useRef<Record<string, HTMLElement | null>>({});
    const [meowing, setMeowing] = useState(false);

    // 0 at the top of the page, 1 once the visitor has scrolled 60% of a screen
    useEffect(() => {
        const onScroll = () => { progressRef.current = Math.min(window.scrollY / (window.innerHeight * 0.6), 1); };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const select = useCallback((id: DeskObjectId) => {
        if (id === "monitor") document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        else if (id === "echo") router.push("/more-about-me");
        else if (id === "shelf") router.push("/hobbies");
        else window.open(id === "journals" ? RESUME_URL : LINKEDIN_URL, "_blank", "noopener,noreferrer");
    }, [router]);

    const handlers: ObjectHandlers = useMemo(() => ({
        onHover  : (id) => { hoveredRef.current = id; },
        onSelect : select,
    }), [select]);

    const meow = useCallback(() => {
        setMeowing(true);
        window.setTimeout(() => setMeowing(false), 1600);
    }, []);

    return (
        <section className="d3__stage" aria-label="Desk">
            <Canvas className="d3__canvas" shadows orthographic dpr={[1, 2]} camera={{ position: [12, 11.6, 14], zoom: 60, near: -100, far: 200 }}>
                <DeskScene3D
                    progressRef={progressRef}
                    hoveredRef={hoveredRef}
                    handlers={handlers}
                    pills={OBJECTS}
                    pillRefs={pillRefs}
                    onMeow={meow}
                />
            </Canvas>

            {OBJECTS.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    ref={(element) => { pillRefs.current[id] = element; }}
                    className="d3-pill"
                    onClick={() => select(id)}
                    onMouseEnter={() => { hoveredRef.current = id; }}
                    onMouseLeave={() => { hoveredRef.current = null; }}
                    onFocus={() => { hoveredRef.current = id; }}
                    onBlur={() => { hoveredRef.current = null; }}
                >
                    {label}
                </button>
            ))}

            <header className="d3__intro">
                <p className="d3__eyebrow">Multi-disciplinary designer</p>
                <h1 className="d3__title">Geetika <span>Shukla</span></h1>
                <p className="d3__bio">
                    I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning brand,
                    exhibition, web, and product design.
                </p>
            </header>
            <p className="d3__hint">Hover the desk to look closer</p>

            {meowing && <p className="d3__meow" aria-live="polite">Meow!</p>}
        </section>
    );
}
