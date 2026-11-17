// COMPONENTS ==================================================================
import { Hero } from "@/components/Hero/Hero";
import { WorkSection } from "@/components/WorkSection/WorkSection";
import { AISection } from "@/components/AISection/AISection";
import { Journal } from "@/components/Journal/Journal";
import { Testimonials } from "@/components/Testimonials/Testimonials";

// DATA ========================================================================
import { getContributions } from "@/data/github";

// The home page: a board of things around the intro, then the work, projects
// built with AI, the journal (the story so far, and the résumé) and kind words
export default async function Home() {
    const contributions = await getContributions();

    return (
        <article className="home">
            <Hero />

            <section id="work" aria-labelledby="work-title">
                <WorkSection />
            </section>

            <AISection />
            <Journal contributions={contributions} />
            <Testimonials />
        </article>
    );
}
