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
    "navbar.appearance": "Appearance",
    "navbar.themeToggle": "Toggle light or dark mode",

    "hero.carouselLabel": "Featured events",
    "hero.slidePickerLabel": "Choose featured event slide",
    "hero.featuredEvent": "Featured Event",
    "hero.exploreEvent": "Explore Event",
    "hero.addToCalendar": "Add to Calendar",
    "hero.goToSlide": "Go to slide",

    "events.heroSectionLabel": "Featured events",
    "events.partners": "Partners",
    "events.partnersSectionLabel": "Partner logos",
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
    "about.followCta": "Follow on Instagram",
    "about.followHint": "Drops, lineups, and behind-the-scenes.",
    "about.illustrationAlt": "Bearhood bear mascot with logo",

    "footer.tagline": "Built for unforgettable event experiences.",
    "footer.copyright": "All rights reserved.",
    "footer.socialInstagram": "Bearhood on Instagram",
    "footer.socialFacebook": "Bearhood on Facebook",
    "footer.socialEventbrite": "Bearhood on Eventbrite",
    "footer.socialResidentAdvisor": "Bearhood on Resident Advisor",

    "eventModal.close": "Close",
    "eventModal.readMore": "Read more",
    "eventModal.showLess": "Show less",
    "eventModal.getTickets": "Get Tickets",
    "eventModal.addToCalendar": "Add to Calendar",
    "eventModal.free": "Free",
    "eventModal.capacity": "Capacity",

    "auth.title": "Sign in to Bearhood",
    "auth.description": "Like, comment, and save events across devices.",
    "auth.tabLogin": "Log in",
    "auth.tabSignup": "Sign up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.newPassword": "New password",
    "auth.confirmPassword": "Confirm password",
    "auth.submitLogin": "Log in",
    "auth.submitSignup": "Create account",
    "auth.submitMagicLink": "Send magic link",
    "auth.submitResetLink": "Send reset link",
    "auth.submitNewPassword": "Save new password",
    "auth.supabaseMissing": "Sign-in is unavailable: Supabase is not configured for this build.",
    "auth.checkEmail": "Check your email to confirm your account.",
    "auth.magicLinkSent": "Magic link sent — check your email and click the link to sign in.",
    "auth.resetLinkSent": "Reset link sent — check your email and click the link.",
    "auth.passwordUpdated": "Password updated! You are now signed in.",
    "auth.passwordsNoMatch": "Passwords do not match.",
    "auth.forgotPassword": "Forgot password?",
    "auth.forgotPasswordTitle": "Reset your password",
    "auth.forgotPasswordDescription": "Enter your email and we will send you a reset link.",
    "auth.backToLogin": "Back to log in",
    "auth.orMagicLink": "Or sign in without a password",
    "auth.useMagicLink": "Send me a magic link",
    "auth.usePassword": "Sign in with password",
    "auth.resetPasswordTitle": "Set a new password",
    "auth.resetPasswordDescription": "Choose a strong password to secure your account.",
    "auth.showPassword": "Show password",
    "auth.hidePassword": "Hide password",

    "social.like": "Like",
    "social.comment": "Comment",
    "social.interested": "Count me in",
    "social.interestedCount": "{count} Interested",
    "social.comments": "Comments",
    "social.noComments": "No comments yet. Be the first!",
    "social.loadingComments": "Loading comments…",
    "social.commentPlaceholder": "Write a comment…",
    "social.sendComment": "Send comment",
    "social.commentError": "Could not post comment. Try again.",
    "social.anonymousUser": "User",

    "events.loading": "Loading events…",
    "events.empty": "No upcoming events right now. Check back soon.",

    "account.title": "Account",
    "account.description": "Manage your profile details.",
    "account.displayName": "Display name",
    "account.displayNamePlaceholder": "Your name",
    "account.profilePicture": "Profile picture",
    "account.uploadPhoto": "Upload photo",
    "account.removePhoto": "Remove",
    "account.save": "Save changes",
    "account.saving": "Saving…",
    "account.saved": "Profile updated!",
    "account.error": "Could not save. Try again.",
    "account.notSignedIn": "Sign in to manage your account.",
    "account.avatarHint": "JPG, PNG or WebP. Max 2 MB.",

    "a11y.skipToContent": "Skip to content",

    "brand.title": "More than just another bear group",
    "brand.subtitle":
      "We provide platforms and a community for bears and like-minded individuals — celebrations, connections, and shared experiences.",

    "features.sectionLabel": "What we offer",
    "features.title": "Your community, your platform",
    "features.description":
      "Bearhood brings people together through events, conversation, and exclusive perks for the bear community.",

    "features.celebrations.title": "Celebrations & excursions",
    "features.celebrations.body":
      "Unforgettable parties and exciting trips with the Bear Community — moments that build lasting connections.",
    "features.celebrations.badge": "Events",

    "features.hub.title": "Bear Social Hub",
    "features.hub.body":
      "Forge new contacts, exchange ideas, and become part of a vibrant, welcoming community.",
    "features.hub.badge": "Connect",

    "features.experiences.title": "Share experiences & tips",
    "features.experiences.body":
      "Tell your stories, get helpful advice, and discover what inspires others in the community.",
    "features.experiences.badge": "Learn",

    "features.friendships.title": "Build friendships",
    "features.friendships.body":
      "Find like-minded people, build real connections, and grow with a supportive circle.",
    "features.friendships.badge": "Community",

    "features.deals.title": "Get the best deals",
    "features.deals.body":
      "Exclusive offers for the Bear Community — save on events, products, and more.",
    "features.deals.badge": "Perks",

    "features.calendar.title": "Bear Calendar",
    "features.calendar.body":
      "Stay on top of meetups, parties, and special highlights — never miss what matters.",
    "features.calendar.badge": "Plan",

    "stats.sectionLabel": "By the numbers",
    "stats.title": "A growing community",
    "stats.description": "Real gatherings, real people, real connections across Berlin and beyond.",
    "stats.events": "Events hosted",
    "stats.members": "Community members",
    "stats.cities": "Cities & regions",
    "stats.partners": "Partner venues",
    "stats.tooltip": "Representative milestones — we keep growing with you.",

    "testimonials.sectionLabel": "Community voices",
    "testimonials.title": "What people say",
    "testimonials.description": "Stories from people who show up, sing along, and stay connected.",
    "testimonials.q1":
      "I found my crew at Bearaoke — warm, messy, and genuinely fun. It feels like home every time.",
    "testimonials.a1": "Alex",
    "testimonials.q2":
      "The parties are curated with care. I always know I will meet friendly faces and good music.",
    "testimonials.a2": "Jordan",
    "testimonials.q3":
      "Between events and the group chat energy, Bearhood is where I actually plan my social life.",
    "testimonials.a3": "Sam",

    "newsletter.sectionLabel": "Stay in the loop",
    "newsletter.title": "Join the Bear Community",
    "newsletter.description":
      "Get calendar drops, deal alerts, and party news. No spam — just the good stuff.",
    "newsletter.placeholder": "Your email",
    "newsletter.submit": "Notify me",
    "newsletter.success": "You are on the list — watch your inbox!",
    "newsletter.invalid": "Please enter a valid email address.",

    "faq.sectionLabel": "FAQ",
    "faq.title": "Questions, answered",
    "faq.description": "Everything you need to know before you dive in.",
    "faq.q1": "What is Bearhood?",
    "faq.a1":
      "Bearhood is a social-first community and event platform for bears and like-minded people. We host parties, trips, and socials — and we give you tools to connect before and after the night.",
    "faq.q2": "Who can join?",
    "faq.a2":
      "Everyone who respects our values of consent, kindness, and inclusion is welcome. Many events are 18+; check each listing for details.",
    "faq.q3": "How do events work?",
    "faq.a3":
      "Browse upcoming parties on this site, save the ones you love, and grab tickets via the linked providers. Sign in to like, comment, and bookmark events across devices.",
    "faq.q4": "Are events free?",
    "faq.a4":
      "Some gatherings are free; others are ticketed. Pricing is always shown on the event card and ticket link. Members sometimes get exclusive deals — stay subscribed to hear first.",
    "faq.q5": "How can I stay updated?",
    "faq.a5":
      "Follow us on Instagram and Facebook, join the newsletter, and bookmark this page. We post lineups, ticket drops, and behind-the-scenes content regularly.",
    "faq.q6": "Where are events held?",
    "faq.a6":
      "We partner with trusted venues — mostly in Berlin — and occasionally organize trips and special editions elsewhere. Each event lists the full address and map context.",

    "about.teamTitle": "The people behind Bearhood",
    "about.valuesTitle": "What we stand for",
    "about.valuesBody":
      "Consent, warmth, and bold self-expression. We build nights where you can show up as you are — and leave with new friends.",

    "footer.navCommunity": "Community",
    "footer.navLegal": "Legal",
    "footer.linkEvents": "Events",
    "footer.linkAbout": "About",
    "footer.linkFaq": "FAQ",
    "footer.linkPrivacy": "Privacy",
    "footer.linkImprint": "Imprint",
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
    "navbar.appearance": "Darstellung",
    "navbar.themeToggle": "Hell- oder Dunkelmodus umschalten",

    "hero.carouselLabel": "Hervorgehobene Events",
    "hero.slidePickerLabel": "Folie des Featured-Events wählen",
    "hero.featuredEvent": "Hervorgehobenes Event",
    "hero.exploreEvent": "Event ansehen",
    "hero.addToCalendar": "Zum Kalender hinzufügen",
    "hero.goToSlide": "Zu Folie",

    "events.heroSectionLabel": "Hervorgehobene Events",
    "events.partners": "Partner",
    "events.partnersSectionLabel": "Partner-Logos",
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
    "about.followCta": "Auf Instagram folgen",
    "about.followHint": "Drops, Line-ups und Einblicke hinter die Kulissen.",
    "about.illustrationAlt": "Bearhood-Bär mit Logo",

    "footer.tagline": "Für unvergessliche Event-Erlebnisse gebaut.",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.socialInstagram": "Bearhood auf Instagram",
    "footer.socialFacebook": "Bearhood auf Facebook",
    "footer.socialEventbrite": "Bearhood auf Eventbrite",
    "footer.socialResidentAdvisor": "Bearhood auf Resident Advisor",

    "eventModal.close": "Schließen",
    "eventModal.readMore": "Weiterlesen",
    "eventModal.showLess": "Weniger anzeigen",
    "eventModal.getTickets": "Tickets holen",
    "eventModal.addToCalendar": "Zum Kalender hinzufügen",
    "eventModal.free": "Kostenlos",
    "eventModal.capacity": "Kapazität",

    "auth.title": "Bei Bearhood anmelden",
    "auth.description": "Liken, kommentieren und Events speichern — geräteübergreifend.",
    "auth.tabLogin": "Anmelden",
    "auth.tabSignup": "Registrieren",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.submitLogin": "Anmelden",
    "auth.submitSignup": "Konto erstellen",
    "auth.submitMagicLink": "Magic Link senden",
    "auth.submitResetLink": "Reset-Link senden",
    "auth.submitNewPassword": "Neues Passwort speichern",
    "auth.supabaseMissing": "Anmeldung nicht verfügbar: Supabase ist für diesen Build nicht konfiguriert.",
    "auth.checkEmail": "Bitte bestätige dein Konto über den Link in der E-Mail.",
    "auth.magicLinkSent": "Magic Link gesendet – prüfe deine E-Mail und klicke den Link zum Anmelden.",
    "auth.resetLinkSent": "Reset-Link gesendet – prüfe deine E-Mail und klicke den Link.",
    "auth.passwordUpdated": "Passwort aktualisiert! Du bist jetzt angemeldet.",
    "auth.passwordsNoMatch": "Passwörter stimmen nicht überein.",
    "auth.forgotPassword": "Passwort vergessen?",
    "auth.forgotPasswordTitle": "Passwort zurücksetzen",
    "auth.forgotPasswordDescription": "Gib deine E-Mail ein und wir schicken dir einen Reset-Link.",
    "auth.backToLogin": "Zurück zur Anmeldung",
    "auth.orMagicLink": "Oder ohne Passwort anmelden",
    "auth.useMagicLink": "Magic Link senden",
    "auth.usePassword": "Mit Passwort anmelden",
    "auth.resetPasswordTitle": "Neues Passwort setzen",
    "auth.resetPasswordDescription": "Wähle ein sicheres Passwort für dein Konto.",
    "auth.newPassword": "Neues Passwort",
    "auth.confirmPassword": "Passwort bestätigen",
    "auth.showPassword": "Passwort anzeigen",
    "auth.hidePassword": "Passwort verbergen",

    "social.like": "Gefällt mir",
    "social.comment": "Kommentar",
    "social.interested": "Ich bin dabei",
    "social.interestedCount": "{count} Interessiert",
    "social.comments": "Kommentare",
    "social.noComments": "Noch keine Kommentare. Sei der Erste!",
    "social.loadingComments": "Kommentare laden…",
    "social.commentPlaceholder": "Kommentar schreiben…",
    "social.sendComment": "Kommentar senden",
    "social.commentError": "Kommentar konnte nicht gepostet werden. Bitte erneut versuchen.",
    "social.anonymousUser": "Nutzer",

    "events.loading": "Events werden geladen…",
    "events.empty": "Derzeit keine anstehenden Events. Schau bald wieder vorbei.",

    "account.title": "Konto",
    "account.description": "Verwalte deine Profildaten.",
    "account.displayName": "Anzeigename",
    "account.displayNamePlaceholder": "Dein Name",
    "account.profilePicture": "Profilbild",
    "account.uploadPhoto": "Foto hochladen",
    "account.removePhoto": "Entfernen",
    "account.save": "Änderungen speichern",
    "account.saving": "Speichern…",
    "account.saved": "Profil aktualisiert!",
    "account.error": "Speichern fehlgeschlagen. Bitte erneut versuchen.",
    "account.notSignedIn": "Melde dich an, um dein Konto zu verwalten.",
    "account.avatarHint": "JPG, PNG oder WebP. Max. 2 MB.",

    "a11y.skipToContent": "Zum Inhalt springen",

    "brand.title": "Mehr als nur eine weitere Bear-Gruppe",
    "brand.subtitle":
      "Wir bieten Plattformen und eine Community für Bears und Gleichgesinnte — Feiern, Austausch und gemeinsame Erlebnisse.",

    "features.sectionLabel": "Was wir bieten",
    "features.title": "Deine Community, deine Plattform",
    "features.description":
      "Bearhood bringt Menschen durch Events, Gespräch und exklusive Vorteile für die Bear-Community zusammen.",

    "features.celebrations.title": "Feiern & Ausflüge",
    "features.celebrations.body":
      "Unvergessliche Partys und spannende Trips mit der Bear Community — Momente, die bleibende Verbindungen schaffen.",
    "features.celebrations.badge": "Events",

    "features.hub.title": "Bear Social Hub",
    "features.hub.body":
      "Neue Kontakte knüpfen, Ideen austauschen und Teil einer lebendigen, einladenden Community werden.",
    "features.hub.badge": "Connect",

    "features.experiences.title": "Erfahrungen & Tipps teilen",
    "features.experiences.body":
      "Erzähle deine Geschichten, erhalte hilfreiche Ratschläge und entdecke, was andere in der Community inspiriert.",
    "features.experiences.badge": "Lernen",

    "features.friendships.title": "Freundschaften aufbauen",
    "features.friendships.body":
      "Gleichgesinnte finden, echte Verbindungen knüpfen und mit einem unterstützenden Kreis wachsen.",
    "features.friendships.badge": "Community",

    "features.deals.title": "Die besten Deals",
    "features.deals.body":
      "Exklusive Angebote für die Bear Community — spare bei Events, Produkten und mehr.",
    "features.deals.badge": "Perks",

    "features.calendar.title": "Bear-Kalender",
    "features.calendar.body":
      "Behalte Meetups, Partys und Highlights im Blick — verpasse nichts Wichtiges.",
    "features.calendar.badge": "Planen",

    "stats.sectionLabel": "In Zahlen",
    "stats.title": "Eine wachsende Community",
    "stats.description": "Echte Treffen, echte Menschen, echte Verbindungen — in Berlin und darüber hinaus.",
    "stats.events": "Events veranstaltet",
    "stats.members": "Community-Mitglieder",
    "stats.cities": "Städte & Regionen",
    "stats.partners": "Partner-Locations",
    "stats.tooltip": "Orientierungswerte — wir wachsen weiter mit euch.",

    "testimonials.sectionLabel": "Stimmen aus der Community",
    "testimonials.title": "Was die Leute sagen",
    "testimonials.description": "Geschichten von Menschen, die dabei sind, mitsingen und in Kontakt bleiben.",
    "testimonials.q1":
      "Bei Bearaoke habe ich meine Crew gefunden — warm, chaotisch und echt lustig. Jedes Mal wie Zuhause.",
    "testimonials.a1": "Alex",
    "testimonials.q2":
      "Die Partys sind mit Liebe kuratiert. Ich weiß, dass ich freundliche Gesichter und gute Musik treffe.",
    "testimonials.a2": "Jordan",
    "testimonials.q3":
      "Zwischen Events und der Gruppen-Dynamik ist Bearhood der Ort, an dem ich mein Sozialleben wirklich plane.",
    "testimonials.a3": "Sam",

    "newsletter.sectionLabel": "Bleib informiert",
    "newsletter.title": "Werde Teil der Bear Community",
    "newsletter.description":
      "Kalender-Drops, Deal-Alerts und Party-News. Kein Spam — nur das Wichtigste.",
    "newsletter.placeholder": "Deine E-Mail",
    "newsletter.submit": "Benachrichtigen",
    "newsletter.success": "Du bist auf der Liste — schau in dein Postfach!",
    "newsletter.invalid": "Bitte gib eine gültige E-Mail-Adresse ein.",

    "faq.sectionLabel": "FAQ",
    "faq.title": "Fragen, beantwortet",
    "faq.description": "Alles, was du vor dem Eintauchen wissen willst.",
    "faq.q1": "Was ist Bearhood?",
    "faq.a1":
      "Bearhood ist eine social-first Community und Event-Plattform für Bears und Gleichgesinnte. Wir hosten Partys, Trips und Socials — und geben dir Werkzeuge, um dich vor und nach der Nacht zu vernetzen.",
    "faq.q2": "Wer kann mitmachen?",
    "faq.a2":
      "Alle, die unsere Werte von Zustimmung, Freundlichkeit und Inklusion respektieren, sind willkommen. Viele Events sind 18+; Details stehen jeweils beim Listing.",
    "faq.q3": "Wie laufen Events ab?",
    "faq.a3":
      "Stöbere hier nach anstehenden Partys, speichere Favoriten und hol dir Tickets über die verlinkten Anbieter. Melde dich an, um Events zu liken, zu kommentieren und geräteübergreifend zu merken.",
    "faq.q4": "Sind Events kostenlos?",
    "faq.a4":
      "Manche Treffen sind kostenlos, andere ticketpflichtig. Preise stehen immer auf der Event-Karte und dem Ticket-Link. Mitglieder bekommen manchmal exklusive Deals — Newsletter nicht verpassen.",
    "faq.q5": "Wie bleibe ich auf dem Laufenden?",
    "faq.a5":
      "Folge uns auf Instagram und Facebook, trage dich in den Newsletter ein und merke dir diese Seite. Wir posten Line-ups, Ticket-Drops und Einblicke hinter die Kulissen.",
    "faq.q6": "Wo finden Events statt?",
    "faq.a6":
      "Wir arbeiten mit vertrauenswürdigen Locations — meist in Berlin — und organisieren gelegentlich Trips und Specials woanders. Jedes Event nennt die volle Adresse und den Kontext.",

    "about.teamTitle": "Die Menschen hinter Bearhood",
    "about.valuesTitle": "Wofür wir stehen",
    "about.valuesBody":
      "Zustimmung, Wärme und mutiger Ausdruck. Wir bauen Nächte, in denen du du selbst sein kannst — und mit neuen Freunden nach Hause gehst.",

    "footer.navCommunity": "Community",
    "footer.navLegal": "Rechtliches",
    "footer.linkEvents": "Events",
    "footer.linkAbout": "Über uns",
    "footer.linkFaq": "FAQ",
    "footer.linkPrivacy": "Datenschutz",
    "footer.linkImprint": "Impressum",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof MESSAGES.en;

export function t(locale: Locale, key: MessageKey): string {
  return MESSAGES[locale][key] ?? MESSAGES.en[key] ?? String(key);
}

