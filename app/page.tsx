import { AboutSection } from "@/components/about-section";
import { EventsExperience } from "@/components/events-experience";
import { FaqSection } from "@/components/faq-section";

export default function Home() {
  return (
    <div className="flex flex-col pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6 md:pt-10">
        <EventsExperience />
      </div>
      <AboutSection />
      <FaqSection />
    </div>
  );
}
