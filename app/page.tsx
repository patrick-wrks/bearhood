import { EventsExperience } from "@/components/events-experience";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-8 md:px-6">
      <EventsExperience />
      <AboutSection />
    </div>
  );
}
