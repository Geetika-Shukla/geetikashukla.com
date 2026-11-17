"use client";

// EXTERNAL DEPS ===============================================================
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";

// COMPONENTS ==================================================================
import { DeskScene3D } from "./DeskScene3D";

// TYPES =======================================================================
import type { LabelAnchor } from "./DeskScene3D";
import type { DeskObjectId, ObjectHandlers } from "./objects";

const RESUME_URL = "https://drive.google.com/uc?export=download&id=1UXkFA6hBj2m-KuHozLz3eFtyUJKckFoY";
const LINKEDIN_URL = "https://www.linkedin.com/in/geetikashukla/";

// Hover titles, pinned to the top-left edge of each object's front face
const LABELS: (LabelAnchor & { label: string })[] = [
    { id: "monitor", label: "Work", position: [-3.9, 3.3, -0.69] },
    { id: "echo", label: "About me", position: [-4.45, 0.85, 0.15] },
    { id: "shelf", label: "Interests", position: [2.6, 3, -0.37] },
    { id: "journals", label: "Résumé", position: [-0.05, 0.4, -0.15] },
    { id: "phone", label: "LinkedIn", position: [2.15, 1.15, 0] },
];

// The room is rendered at a fraction of the screen's resolution and scaled up
// without smoothing (see .d3__canvas), so it reads as pixel art: each rendered
// pixel covers about 1 / PIXEL_SCALE CSS pixels
const PIXEL_SCALE = 0.33;

// The desk scene, rendered inside the page's .d3__stage. Hovering an object
// shows its title; clicking opens it.
export default function Desk3D() {
    const router = useRouter();
    const progressRef = useRef(0);
    const hoveredRef = useRef<DeskObjectId | null>(null);
    const labelRefs = useRef<Record<string, HTMLElement | null>>({});

    // Scrolling raises the blind
    useEffect(() => {
        const onScroll = () => {
            progressRef.current = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
        };
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

    // Leaving an object waits a moment before releasing the hover, so the camera
    // doesn't jolt back when the pointer crosses a gap between an object's parts
    const releaseTimer = useRef<number | undefined>(undefined);
    const setHovered = useCallback((id: DeskObjectId | null) => {
        window.clearTimeout(releaseTimer.current);
        if (id) hoveredRef.current = id;
        else releaseTimer.current = window.setTimeout(() => { hoveredRef.current = null; }, 180);
    }, []);

    const handlers: ObjectHandlers = useMemo(() => ({
        onHover  : setHovered,
        onSelect : select,
    }), [setHovered, select]);

    return (
        <>
            <Canvas className="d3__canvas" shadows orthographic dpr={PIXEL_SCALE} gl={{ antialias: false }} camera={{ position: [12, 11.6, 14], zoom: 60, near: -100, far: 200 }}>
                <DeskScene3D
                    progressRef={progressRef}
                    hoveredRef={hoveredRef}
                    handlers={handlers}
                    labels={LABELS}
                    labelRefs={labelRefs}
                />
            </Canvas>

            {/* Titles show when their object is hovered. They ignore the mouse (so they
                never steal the hover from the object) but stay keyboard-focusable. */}
            {LABELS.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    ref={(element) => { labelRefs.current[id] = element; }}
                    className="d3-tag"
                    data-visible="false"
                    onClick={() => select(id)}
                    onFocus={() => setHovered(id)}
                    onBlur={() => setHovered(null)}
                >
                    {label}
                </button>
            ))}

        </>
    );
}
