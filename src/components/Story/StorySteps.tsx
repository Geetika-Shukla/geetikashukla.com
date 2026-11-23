"use client";

// EXTERNAL DEPS ===============================================================
import { useEffect } from "react";

// How long one step takes, and how long a gesture's momentum is swallowed after
const STEP = 650;
const GESTURE_GAP = 140;

/*
 * The story section's right column moves in locked steps: the About box, then
 * the work line. A wheel or trackpad gesture near or between them is taken
 * over and moves exactly one step (its momentum swallowed, so it can't run on
 * past); scrolling up from the box, or down from the work line, lets go into
 * the page's normal scrolling. (The keyboard steps through them with the rest
 * of the page's stops, in KeySteps.) Anything else that comes to rest between the
 * two (a scrollbar drag, say) is finished to the nearer stop. Not on
 * narrow screens, where it's one long column, nor for anyone who prefers less
 * motion.
 */
export const StorySteps = () => {
    useEffect(() => {
        const about = document.querySelector<HTMLElement>(".story__about");
        const work = document.querySelector<HTMLElement>(".story__work");
        if (!about || !work) return;
        if (window.matchMedia("(max-width: 899px), (prefers-reduced-motion: reduce)").matches) return;

        // Where the page sits at each stop (each lands its scroll-margin under the top)
        const stop = (box: HTMLElement) =>
            Math.round(box.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(box).scrollMarginTop));

        let moving = false;
        let lastWheel = 0;
        let gestureUsed = false;
        let settleTimer = 0;

        const go = (target: number) => {
            moving = true;
            window.scrollTo({ top: target, behavior: "smooth" });
            window.setTimeout(() => {
                moving = false;
            }, STEP);
        };

        // Where a step down (or up) from here goes; null to let the page scroll
        const next = (down: boolean): number | null => {
            const [first, second] = [stop(about), stop(work)];
            const y = Math.round(window.scrollY);
            const reach = window.innerHeight * 0.6;
            if (down && y >= first - reach && y < first - 2) return first;            // arriving from above
            if (down && y >= first - 2 && y < second - 2) return second;              // the box → the work line
            if (!down && y > second + 2 && y <= second + reach) return second;        // arriving from below
            if (!down && y > first + 2 && y <= second + 2) return first;              // the work line → the box
            return null;
        };

        // Within reach of the stops (where a step in progress holds the page still)
        const inZone = () => {
            const y = window.scrollY;
            const reach = window.innerHeight * 0.6;
            return y > stop(about) - reach && y < stop(work) + reach;
        };

        const onWheel = (event: WheelEvent) => {
            const now = event.timeStamp;
            const continuing = now - lastWheel < GESTURE_GAP;
            lastWheel = now;
            if (!continuing) gestureUsed = false;

            // Mid-step, or the rest of a gesture that already moved a step: hold still
            if (moving || gestureUsed) {
                if (inZone()) event.preventDefault();
                return;
            }

            const target = next(event.deltaY > 0);
            if (target === null) return;
            event.preventDefault();
            gestureUsed = true;
            go(target);
        };

        // Anything that comes to rest between the stops otherwise: on to the nearer one
        const onScroll = () => {
            window.clearTimeout(settleTimer);
            settleTimer = window.setTimeout(() => {
                if (moving) return;
                const [first, second] = [stop(about), stop(work)];
                const y = window.scrollY;
                if (y > first + 2 && y < second - 2) go(y - first < second - y ? first : second);
            }, 200);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(settleTimer);
        };
    }, []);

    return null;
};
