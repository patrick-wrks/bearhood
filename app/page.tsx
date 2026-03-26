import { EventsExperience } from "@/components/events-experience";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-8 md:px-6">
      <EventsExperience />

      <section id="about" className="space-y-3 rounded-2xl border border-border/80 bg-card/50 p-6">
        <h3 className="text-xl font-semibold">About Bearhood</h3>
        <p className="text-sm leading-7 text-muted-foreground">
          Bearhood is a social-first event brand blending music, storytelling, and community into
          immersive nights. We design playful yet sleek experiences that people remember.
        </p>
      </section>
    </div>
  );
}
