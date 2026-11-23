// COMPONENTS ==================================================================
import { Hero } from "@/components/Hero/Hero";
import { WorkSection } from "@/components/WorkSection/WorkSection";
import { Story } from "@/components/Story/Story";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { GridSnap } from "@/components/GridSnap/GridSnap";
import { GridCanvas } from "@/components/GridCanvas/GridCanvas";
import { KeySteps } from "@/components/KeySteps/KeySteps";


// The home page: a board of things around the intro, then the work (on the
// same grid, AI projects among it), the story so far (with the résumé) and
// kind words
export default function Home() {
    return (
        <article className="home">
            <GridCanvas />
            {/* The keyboard moves through the page a stop at a time */}
            <KeySteps />
            <Hero />

            <section id="work" aria-labelledby="work-title">
                <WorkSection />
            </section>

            <Story />
            <Testimonials />
            <GridSnap />
        </article>
    );
}
