"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Sparkles, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import { useLocale } from "@/lib/i18n/use-locale";
import { t } from "@/lib/i18n/messages";
import { socialLinks } from "@/lib/social-links";
import { cn } from "@/lib/utils";

import bearWithLogo from "@BearhoodAssets/Bearhood-Bear-withlogo.webp";
import patrickPhoto from "@BearhoodAssets/patrick.webp";
import haraldPhoto from "@BearhoodAssets/harald.webp";
import kayPhoto from "@BearhoodAssets/kay.webp";
import thomasPhoto from "@BearhoodAssets/thomas.webp";

function imgSrc(asset: string | { src: string }): string {
  return typeof asset === "string" ? asset : asset.src;
}

const TEAM = [
  { name: "Patrick", initials: "PK", photo: patrickPhoto },
  { name: "Harald", initials: "HA", photo: haraldPhoto },
  { name: "Kay", initials: "KA", photo: kayPhoto },
  { name: "Thomas", initials: "TH", photo: thomasPhoto },
] as const;

export function AboutSection() {
  const locale = useLocale();

  return (
    <section
      id="about"
      className="relative left-1/2 mt-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden border-y border-border/60 bg-muted/40 py-16 md:mt-20 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:gap-12 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-xl space-y-4">
            <div className="flex justify-center md:justify-start">
              <Image
                src={bearWithLogo}
                alt={t(locale, "about.illustrationAlt")}
                width={1200}
                height={1280}
                className="h-auto w-full max-w-36 sm:max-w-40 md:max-w-36"
                sizes="(max-width: 767px) 100vw, 9rem"
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t(locale, "about.title")}</h2>
            <p className="text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
              {t(locale, "about.body")}
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-4 md:max-w-sm">
            <Card className="border-border/80 bg-card/90 shadow-sm">
              <CardContent className="flex flex-col gap-5 p-6">
                <AvatarGroup className="-space-x-3">
                  {TEAM.map((member) => (
                    <Avatar
                      key={member.initials}
                      size="lg"
                      className="size-12 ring-[3px] ring-card"
                    >
                      <AvatarImage
                        src={imgSrc(member.photo)}
                        alt={member.name}
                      />
                      <AvatarFallback className="text-xs font-bold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0" aria-hidden />
                  <h3 className="text-sm font-semibold">{t(locale, "about.teamTitle")}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/80 bg-card/90 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5 shrink-0" aria-hidden />
                  <h3 className="text-base font-semibold">{t(locale, "about.valuesTitle")}</h3>
                </div>
                <Separator />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(locale, "about.valuesBody")}
                </p>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">{t(locale, "about.followHint")}</p>
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2 sm:w-auto",
                )}
              >
                <Camera className="h-5 w-5 shrink-0" aria-hidden />
                {t(locale, "about.followCta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
