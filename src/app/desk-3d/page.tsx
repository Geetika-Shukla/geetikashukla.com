// COMPONENTS ==================================================================
import { Desk3DLoader } from "@/components/Desk3D/Desk3DLoader";
import { ProjectChips } from "@/components/ProjectChips/ProjectChips";

// TYPES =======================================================================
import type { Metadata } from "next";

// Experimental 3D version of the home page
export const metadata: Metadata = {
    title  : "Geetika Shukla — 3D desk",
    robots : { index: false },
};

export default function Desk3DPage() {
    return (
        <article className="d3-page">
            <Desk3DLoader />

            <section id="work" className="d3-work container" aria-labelledby="work-title">
                <h2 id="work-title" className="d3-work__title">Work</h2>
                <ProjectChips />
            </section>
        </article>
    );
}
