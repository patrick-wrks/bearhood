import { Camera, Music2, Play } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-16 border-t border-border/80 bg-card/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Built for unforgettable event experiences.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground">
              <Camera className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-foreground">
              <Play className="h-5 w-5" />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-foreground">
              <Music2 className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bearhood. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
