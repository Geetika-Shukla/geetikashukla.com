// COMPONENTS ==================================================================
import { Hero } from "@/components/Hero/Hero";
import { WorkSection } from "@/components/WorkSection/WorkSection";
import { Journal } from "@/components/Journal/Journal";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { GridSnap } from "@/components/GridSnap/GridSnap";


// The home page: a board of things around the intro, then the work (on the
// same grid, AI projects among it), the journal (the story so far, and the
// résumé) and kind words
export default function Home() {
    return (
        <article className="home">
            <Hero />

            <section id="work" aria-labelledby="work-title">
                <WorkSection />
            </section>

            <Journal />
            <Testimonials />
            <GridSnap />
        </article>
    );
}
