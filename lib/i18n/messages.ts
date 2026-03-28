import type { Locale } from "./locales";

export const MESSAGES = {
  en: {
    "language.english": "English",
    "language.german": "Deutsch",

    "navbar.events": "Events",
    "navbar.about": "About",
    "navbar.contact": "Contact",
    "navbar.signIn": "Log in",
    "navbar.signOut": "Log out",
    "navbar.account": "Account",
    "navbar.mobileMenu": "Menu",
    "navbar.mobileMenuTitle": "Navigation",

    "hero.featuredEvent": "Featured Event",
    "hero.exploreEvent": "Explore Event",
    "hero.goToSlide": "Go to slide",

    "events.upcomingParties": "Upcoming Parties",
    "events.upcomingPartiesDescription":
      "Discover the next wave of Bearhood experiences. Tap any event card to view details, lineups, and attendance info.",

    "uiFoundation.title": "UI Foundation",
    "uiFoundation.description":
      "Core component playground for Bearhood. This page is your base for building consistent product screens fast.",

    "breadcrumb.home": "Home",
    "breadcrumb.uiFoundation": "UI Foundation",

    "about.title": "About Bearhood",
    "about.body":
      "Bearhood is a social-first event brand blending music, storytelling, and community into immersive nights. We design playful yet sleek experiences that people remember.",

    "footer.tagline": "Built for unforgettable event experiences.",
    "footer.copyright": "All rights reserved.",

    "eventModal.readMore": "Read more",
    "eventModal.showLess": "Show less",
    "eventModal.getTickets": "Get Tickets",
    "eventModal.learnMore": "Learn More",
    "eventModal.free": "Free",
    "eventModal.capacity": "Capacity",

    "auth.title": "Sign in to Bearhood",
    "auth.description": "Save your interested and attending choices across devices.",
    "auth.tabLogin": "Log in",
    "auth.tabSignup": "Sign up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.submitLogin": "Log in",
    "auth.submitSignup": "Create account",
    "auth.supabaseMissing": "Sign-in is unavailable: Supabase is not configured for this build.",
    "auth.checkEmail": "Check your email to confirm your account before logging in.",

    "response.interested": "Interested",
    "response.attending": "Going",
    "response.statInterested": "interested",
    "response.statGoing": "going",
    "response.loginToRespond": "Log in to mark your interest or attendance.",
    "response.updating": "Saving…",
    "response.error": "Could not save. Try again.",

    "events.loading": "Loading events…",
    "events.empty": "No upcoming events right now. Check back soon.",
  },
  de: {
    "language.english": "Englisch",
    "language.german": "Deutsch",

    "navbar.events": "Events",
    "navbar.about": "Über uns",
    "navbar.contact": "Kontakt",
    "navbar.signIn": "Anmelden",
    "navbar.signOut": "Abmelden",
    "navbar.account": "Konto",
    "navbar.mobileMenu": "Menü",
    "navbar.mobileMenuTitle": "Navigation",

    "hero.featuredEvent": "Hervorgehobenes Event",
    "hero.exploreEvent": "Event ansehen",
    "hero.goToSlide": "Zu Folie",

    "events.upcomingParties": "Bevorstehende Partys",
    "events.upcomingPartiesDescription":
      "Entdecke die nächste Welle von Bearhood-Erlebnissen. Tippe auf eine Event-Karte, um Details, Line-Ups und Infos zur Teilnahme zu sehen.",

    "uiFoundation.title": "UI Foundation",
    "uiFoundation.description":
      "Core-Component-Playground für Bearhood. Diese Seite ist dein Ausgangspunkt, um konsistente Produktscreens schnell zu bauen.",

    "breadcrumb.home": "Startseite",
    "breadcrumb.uiFoundation": "UI Foundation",

    "about.title": "Über Bearhood",
    "about.body":
      "Bearhood ist eine Social-First-Eventmarke, die Musik, Storytelling und Community zu eindrucksvollen Abenden verbindet. Wir gestalten verspielte, aber cleane Erlebnisse, die man nicht vergisst.",

    "footer.tagline": "Für unvergessliche Event-Erlebnisse gebaut.",
    "footer.copyright": "Alle Rechte vorbehalten.",

    "eventModal.readMore": "Weiterlesen",
    "eventModal.showLess": "Weniger anzeigen",
    "eventModal.getTickets": "Tickets holen",
    "eventModal.learnMore": "Mehr erfahren",
    "eventModal.free": "Kostenlos",
    "eventModal.capacity": "Kapazität",

    "auth.title": "Bei Bearhood anmelden",
    "auth.description": "Speichere „Interessiert“ und „Teilnahme“ geräteübergreifend.",
    "auth.tabLogin": "Anmelden",
    "auth.tabSignup": "Registrieren",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.submitLogin": "Anmelden",
    "auth.submitSignup": "Konto erstellen",
    "auth.supabaseMissing": "Anmeldung nicht verfügbar: Supabase ist für diesen Build nicht konfiguriert.",
    "auth.checkEmail": "Bitte bestätige dein Konto über den Link in der E-Mail, bevor du dich anmeldest.",

    "response.interested": "Interessiert",
    "response.attending": "Dabei",
    "response.statInterested": "interessiert",
    "response.statGoing": "dabei",
    "response.loginToRespond": "Melde dich an, um Interesse oder Teilnahme zu markieren.",
    "response.updating": "Speichern…",
    "response.error": "Speichern fehlgeschlagen. Bitte erneut versuchen.",

    "events.loading": "Events werden geladen…",
    "events.empty": "Derzeit keine anstehenden Events. Schau bald wieder vorbei.",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof MESSAGES.en;

export function t(locale: Locale, key: MessageKey): string {
  return MESSAGES[locale][key] ?? MESSAGES.en[key] ?? String(key);
}

