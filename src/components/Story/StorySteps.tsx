"use client";

// EXTERNAL DEPS ===============================================================
import { useEffect } from "react";

/*
 * Two stops in the story section, the About box and then the work line, so it
 * scrolls in two steps. The page snaps to them on its own when a scroll ends
 * close to one; this finishes the step when a scroll comes to rest between
 * them: on from the box to the work line going down, back to the box going up
 * (or, arriving from above or below, to the nearer of the two). Not on narrow
 * screens, where it's one long column, nor for anyone who prefers less motion.
 */
export const StorySteps = () => {
    useEffect(() => {
        const about = document.querySelector<HTMLElement>(".story__about");
        const work = document.querySelector<HTMLElement>(".story__work");
        if (!about || !work) return;
        if (window.matchMedia("(max-width: 899px), (prefers-reduced-motion: reduce)").matches) return;

        // Where the page sits at each stop (each lands its scroll-margin under the top)
        const stop = (box: HTMLElement) =>
            box.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(box).scrollMarginTop);

        let last = window.scrollY;
        let rest = window.scrollY;
        let direction = 0;
        let stepping = false;
        let timer = 0;

        const settle = () => {
            // Our own step has just finished
            if (stepping) {
                stepping = false;
                rest = window.scrollY;
                return;
            }
            const [first, second] = [stop(about), stop(work)];
            const y = window.scrollY;
            if (y > first + 2 && y < second - 2) {
                const target = direction > 0
                    ? (rest < first - 2 ? first : second)
                    : (rest > second + 2 ? second : first);
                stepping = true;
                window.scrollTo({ top: target, behavior: "smooth" });
                return;
            }
            rest = y;
        };

        const onScroll = () => {
            const y = window.scrollY;
            if (y !== last) direction = Math.sign(y - last);
            last = y;
            window.clearTimeout(timer);
            timer = window.setTimeout(settle, 140);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(timer);
        };
    }, []);

    return null;
};
