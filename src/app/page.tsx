// COMPONENTS ==================================================================
import { Desk3DLoader } from "@/components/Desk3D/Desk3DLoader";
import { WorkFloor } from "@/components/WorkFloor/WorkFloor";

// STYLES ======================================================================
// The page renders the stage, headline and arrow itself, so it owns the styles
import "@/components/Desk3D/desk-3d.css";

export default function Home() {
    return (
        <article className="d3-page">
            <section className="d3__stage" aria-label="Desk">
                {/* Snap point for the room: one screen, though the stage runs taller */}
            <span className="d3__snap" aria-hidden="true" />
            <Desk3DLoader />

                {/* Server-rendered so it shows before the 3D loads */}
                <header className="d3__intro">
                    <h1 className="d3__title">Geetika Shukla</h1>
                    <p className="d3__bio">
                        I’m Geetika, a multi-disciplinary designer with around 7 years of experience spanning brand,
                        exhibition, web, and product design.
                    </p>
                </header>

            </section>

            <section id="work" className="d3-work" aria-labelledby="work-title">
                <WorkFloor />
            </section>
        </article>
    );
}
