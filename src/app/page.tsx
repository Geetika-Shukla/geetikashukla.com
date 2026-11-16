// COMPONENTS ==================================================================
import { Desk3DLoader } from "@/components/Desk3D/Desk3DLoader";
import { ProjectChips } from "@/components/ProjectChips/ProjectChips";

export default function Home() {
    return (
        <article className="d3-page">
            {/* The headline is server-rendered over the scene, so it shows before the 3D loads */}
            <section className="d3__stage" aria-label="Desk">
                <Desk3DLoader />

                <header className="d3__intro">
                    <p className="d3__eyebrow">Multi-disciplinary designer</p>
                    <h1 className="d3__title">Geetika <span>Shukla</span></h1>
                    <p className="d3__bio">
                        I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning brand,
                        exhibition, web, and product design.
                    </p>
                </header>
                <p className="d3__hint">Hover the desk to look closer</p>
            </section>

            <section id="work" className="d3-work container" aria-labelledby="work-title">
                <h2 id="work-title" className="d3-work__title">Work</h2>
                <ProjectChips />
            </section>
        </article>
    );
}
