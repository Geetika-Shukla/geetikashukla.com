"use client";

// EXTERNAL DEPS ===============================================================
import React, { useCallback, useEffect, useRef, useState } from "react";

// COMPONENTS ==================================================================
import { PixelSprite } from "@/components/PixelSprite/PixelSprite";
import { DeskScene } from "./DeskScene";
import { sun, moon, skyline } from "./sprites";

// STYLES ======================================================================
import "./window-hero.css";

// TYPES =======================================================================
import type { Sprite } from "@/components/PixelSprite/PixelSprite";
import type { Hotspot } from "./DeskScene";

type Phase = "night" | "dawn" | "day" | "dusk";
// "auto" follows scroll; "down" / "up" are set by the pull cord until the visitor scrolls
type ShadeMode = "auto" | "down" | "up";

interface WindowHeroProps {
    hotspots : Hotspot[];
    children : React.ReactNode;
}

const SHADE_SCROLL_DISTANCE = 0.6; // fraction of viewport height to fully raise the shade
const MODE_RESET_SCROLL = 120;     // px of scrolling that hands the shade back to scroll control

const phaseForHour = (hour: number): Phase => {
    if (hour >= 5 && hour < 8) return "dawn";
    if (hour >= 8 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "dusk";
    return "night";
};

const Pixels = ({ sprite, className }: { sprite: Sprite; className?: string }) => (
    <PixelSprite
        sprite={sprite}
        className={className}
        style={{ "--rows": sprite.rows.length } as React.CSSProperties}
    />
);

export const WindowHero = ({ hotspots, children }: WindowHeroProps) => {
    const shadeRef = useRef<HTMLDivElement>(null);
    const fabricRef = useRef<HTMLDivElement>(null);
    const modeRef = useRef<ShadeMode>("auto");
    const toggleScrollY = useRef(0);

    const [shadeDown, setShadeDown] = useState(true);
    const [phase, setPhase] = useState<Phase>("day");
    const [meowing, setMeowing] = useState(false);

    const updateShade = useCallback(() => {
        const shade = shadeRef.current;
        if (!shade) return;

        if (modeRef.current !== "auto" && Math.abs(window.scrollY - toggleScrollY.current) > MODE_RESET_SCROLL) {
            modeRef.current = "auto";
        }

        const scrolled = Math.min(Math.max(window.scrollY / (window.innerHeight * SHADE_SCROLL_DISTANCE), 0), 1);
        const up = modeRef.current === "down" ? 0 : modeRef.current === "up" ? 1 : scrolled;

        shade.style.setProperty("--shade-up", up.toFixed(3));
        fabricRef.current?.toggleAttribute("inert", up > 0.5);
        setShadeDown(up <= 0.5);
    }, []);

    // Shade follows scroll
    useEffect(() => {
        let frame = 0;
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(() => { frame = 0; updateShade(); });
        };
        updateShade();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [updateShade]);

    const setMode = useCallback((mode: ShadeMode) => {
        modeRef.current = mode;
        toggleScrollY.current = window.scrollY;
        updateShade();
    }, [updateShade]);

    const toggleShade = () => setMode(shadeDown ? "up" : "down");

    // Escape raises the shade
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && shadeDown) setMode("up");
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [shadeDown, setMode]);

    // Sky follows the visitor's local time. Starts as "day" on the server; the
    // shade covers the window on first paint, so the switch is not visible.
    useEffect(() => {
        const update = () => setPhase(phaseForHour(new Date().getHours()));
        update();
        const interval = window.setInterval(update, 10 * 60 * 1000);
        return () => window.clearInterval(interval);
    }, []);

    const meow = useCallback(() => {
        setMeowing(true);
        window.setTimeout(() => setMeowing(false), 1600);
    }, []);

    // The cat meows now and then on its own
    useEffect(() => {
        const interval = window.setInterval(meow, 12000);
        return () => window.clearInterval(interval);
    }, [meow]);

    return (
        <>
            <section className="window-hero" data-phase={phase} aria-label="Window">
                <div className="window-hero__stage">
                    <div className="window">
                        <div className="window__view">
                            {phase === "night" && (
                                <div className="window__stars" aria-hidden="true">
                                    {Array.from({ length: 14 }, (_, i) => <span key={i} />)}
                                </div>
                            )}
                            <Pixels sprite={phase === "night" ? moon : sun} className="window__celestial" />
                            <Pixels sprite={skyline} className="window__skyline" />
                        </div>
                    </div>

                    <DeskScene hotspots={hotspots} meowing={meowing} onMeow={meow} />
                </div>
            </section>

            <div className="shade" ref={shadeRef} data-down={shadeDown}>
                <div className="shade__fabric" ref={fabricRef}>
                    <div className="shade__content">{children}</div>
                </div>
                <div className="shade__bar" />
                <button
                    type="button"
                    className="shade__cord"
                    onClick={toggleShade}
                    aria-expanded={shadeDown}
                    aria-label={shadeDown ? "Raise the shade" : "Pull down the shade to read the intro"}
                >
                    <span className="shade__string" />
                    <span className="shade__pull" />
                </button>
            </div>
        </>
    );
};
