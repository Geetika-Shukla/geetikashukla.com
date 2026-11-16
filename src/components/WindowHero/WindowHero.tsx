"use client";

// EXTERNAL DEPS ===============================================================
import React, { useCallback, useEffect, useRef, useState } from "react";

// COMPONENTS ==================================================================
import { DeskScene } from "./DeskScene";
import { Sky } from "./Sky";

// STYLES ======================================================================
import "./window-hero.css";

// TYPES =======================================================================
import type { DeskLink } from "./DeskScene";
import type { Phase } from "./Sky";

// "auto" follows scroll; "down" / "up" are set by the pull cord until the visitor scrolls
type BlindMode = "auto" | "down" | "up";

interface WindowHeroProps {
    deskLinks : DeskLink[];
}

const SLATS = 14;
const BLIND_SCROLL_DISTANCE = 0.6; // fraction of viewport height that fully raises the blind
const MODE_RESET_SCROLL = 120;     // px of scrolling that hands the blind back to scroll control

const phaseForHour = (hour: number): Phase => {
    if (hour >= 5 && hour < 8) return "dawn";
    if (hour >= 8 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "dusk";
    return "night";
};

export const WindowHero = ({ deskLinks }: WindowHeroProps) => {
    const blindRef = useRef<HTMLDivElement>(null);
    const modeRef = useRef<BlindMode>("auto");
    const toggleScrollY = useRef(0);

    const [blindDown, setBlindDown] = useState(true);
    const [phase, setPhase] = useState<Phase>("day");
    const [meowing, setMeowing] = useState(false);

    const updateBlind = useCallback(() => {
        const blind = blindRef.current;
        if (!blind) return;

        if (modeRef.current !== "auto" && Math.abs(window.scrollY - toggleScrollY.current) > MODE_RESET_SCROLL) {
            modeRef.current = "auto";
        }

        const scrolled = Math.min(Math.max(window.scrollY / (window.innerHeight * BLIND_SCROLL_DISTANCE), 0), 1);
        const up = modeRef.current === "down" ? 0 : modeRef.current === "up" ? 1 : scrolled;

        blind.style.setProperty("--blind-up", up.toFixed(3));
        setBlindDown(up <= 0.5);
    }, []);

    // Blind follows scroll
    useEffect(() => {
        let frame = 0;
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(() => { frame = 0; updateBlind(); });
        };
        updateBlind();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [updateBlind]);

    const setMode = useCallback((mode: BlindMode) => {
        modeRef.current = mode;
        toggleScrollY.current = window.scrollY;
        updateBlind();
    }, [updateBlind]);

    // Sky follows the visitor's local time. Starts as "day" on the server; the
    // blind covers most of the window on first paint, so the switch is barely visible.
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
        <section className="window-hero" aria-label="Window and desk">
            <div className="window-hero__stage pixel-grid">
                <div className="window">
                    <div className="window__pane">
                        <Sky phase={phase} />
                        <div className="window__mullions" aria-hidden="true" />

                        {/* Wooden venetian blind: slats stack up under the rail as it rises */}
                        <div className="blind" ref={blindRef} style={{ "--slats": SLATS } as React.CSSProperties}>
                            <span className="blind__ladder blind__ladder--left" aria-hidden="true" />
                            <span className="blind__ladder blind__ladder--right" aria-hidden="true" />
                            {Array.from({ length: SLATS }, (_, i) => (
                                <span key={i} className="blind__slat" style={{ "--i": i } as React.CSSProperties} aria-hidden="true" />
                            ))}
                            <span className="blind__rail" aria-hidden="true" />
                            <button
                                type="button"
                                className="blind__cord"
                                onClick={() => setMode(blindDown ? "up" : "down")}
                                aria-pressed={!blindDown}
                                aria-label={blindDown ? "Raise the blind" : "Lower the blind"}
                            >
                                <span className="blind__string" />
                                <span className="blind__pull" />
                            </button>
                        </div>
                    </div>
                </div>

                <DeskScene links={deskLinks} meowing={meowing} onMeow={meow} />
            </div>
        </section>
    );
};
