import type { LocalizedLegalContent } from "@/lib/legal/types";

export const privacyContent: LocalizedLegalContent = {
  en: {
    title: "Privacy Policy",
    intro:
      "This policy explains how Bearhood (“we”, “us”) handles personal data when you use our website and related features. It reflects the technologies and data flows implemented in our current product.",
    sections: [
      {
        heading: "Controller",
        paragraphs: [
          "The controller responsible for processing personal data in connection with this website is:",
          "Kayoso Events\nKay A. Schink\nEmail: info@bearhood.de",
        ],
      },
      {
        heading: "Website and hosting",
        paragraphs: [
          "This site is built with Next.js and published as static files (static export). When you open pages, your browser requests those files from a hosting provider. The provider may process technical data such as IP address, date and time of the request, and user agent, typically in server logs, based on its own terms and for security and operations.",
          "Which hosting provider applies depends on how Bearhood is deployed (for example static hosting on a platform such as GitHub Pages). We do not operate separate first-party web analytics in the shipped application code.",
        ],
      },
      {
        heading: "Third-party infrastructure",
        paragraphs: [
          "When sign-in and community features are enabled, we use Supabase (Supabase Inc. and its infrastructure providers) as a service for authentication, database storage, and optional file storage.",
          "Depending on your use of the site, Supabase may process in particular: account and authentication data (e.g. email address, password or magic-link flows, session tokens); profile information you provide (e.g. display name, avatar); and data related to event interactions supported by the app (e.g. likes, comments, saved/interested markers tied to your user id). Profile images may be stored in Supabase Storage and served via public URLs.",
          "Processing is performed to provide the features you request (e.g. account, profile, and community interactions) and to secure the service. Further details on how Supabase processes data, subprocessors, and international transfers are described in Supabase’s own documentation and data processing agreements. We encourage you to review: https://supabase.com/privacy and related policies.",
          "If Supabase is not configured for a given deployment, those features are unavailable and no such processing occurs through our integration.",
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "Supabase authentication typically uses browser storage or similar mechanisms to keep you signed in. We also use the next-themes library, which commonly stores your light/dark theme preference locally in your browser.",
          "You can delete site data through your browser settings; this may sign you out or reset UI preferences.",
        ],
      },
      {
        heading: "Newsletter form on the website",
        paragraphs: [
          "The newsletter signup area on the site currently validates your input in the browser and shows a confirmation message. It does not send your email address to Bearhood-operated servers as part of that flow in the present implementation. If we connect it to a mailing or marketing tool later, we will update this policy and, where required, obtain consent or another legal basis.",
        ],
      },
      {
        heading: "Links to third-party sites",
        paragraphs: [
          "We link to external services (e.g. social networks, ticket platforms). Those sites have their own privacy policies. We are not responsible for their processing once you leave our site.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "We retain personal data only as long as needed for the purposes described, including legal obligations. Account-related data in Supabase is subject to Supabase’s retention and your account actions (e.g. deletion requests via the service where available).",
        ],
      },
      {
        heading: "Your rights (EEA/UK-style)",
        paragraphs: [
          "Where the GDPR or similar law applies, you may have the right to access, rectify, erase, restrict processing, object, and data portability, and to withdraw consent where processing is consent-based. You may also lodge a complaint with a supervisory authority.",
          "To exercise rights against us, contact info@bearhood.de. Some requests (e.g. account deletion) may need to be carried out through the authentication provider’s tools where they hold the primary account record.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update this policy when our product or legal requirements change. The current version is always published on this page with an updated effective date (see below).",
          "Last updated: March 29, 2026.",
        ],
      },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    intro:
      "Diese Erklärung beschreibt, wie Bearhood („wir“) personenbezogene Daten verarbeitet, wenn Sie unsere Website und die angebotenen Funktionen nutzen. Sie orientiert sich an der aktuell im Produkt eingesetzten Technik und an den tatsächlichen Datenflüssen.",
    sections: [
      {
        heading: "Verantwortliche Stelle",
        paragraphs: [
          "Verantwortlich für die Datenverarbeitung im Zusammenhang mit dieser Website ist:",
          "Kayoso Events\nKay A. Schink\nE-Mail: info@bearhood.de",
        ],
      },
      {
        heading: "Website und Hosting",
        paragraphs: [
          "Die Website wird mit Next.js erstellt und als statische Dateien bereitgestellt (Static Export). Beim Aufruf fordert Ihr Browser diese Dateien von einem Hosting-Anbieter an. Der Anbieter kann technische Daten wie IP-Adresse, Zeitpunkt der Anfrage und User-Agent verarbeiten, üblicherweise in Server-Logdateien, auf Grundlage eigener Bedingungen sowie zu Sicherheits- und Betriebszwecken.",
          "Welcher Hosting-Anbieter gilt, hängt von der konkreten Bereitstellung ab (z. B. statisches Hosting auf einer Plattform wie GitHub Pages). Im ausgelieferten Anwendungscode setzen wir keine eigene erstparteiische Webanalyse ein.",
        ],
      },
      {
        heading: "Infrastruktur von Drittanbietern",
        paragraphs: [
          "Sind Anmeldung und Community-Funktionen aktiviert, nutzen wir Supabase (Supabase Inc. und zugehörige Infrastruktur-Anbieter) für Authentifizierung, Datenbank und optionalen Dateispeicher.",
          "Je nach Nutzung kann Supabase insbesondere verarbeiten: Konto- und Authentifizierungsdaten (z. B. E-Mail-Adresse, Passwort oder Magic-Link, Sitzungs-Token); von Ihnen angegebene Profildaten (z. B. Anzeigename, Avatar); sowie Daten zu Event-Interaktionen, die die App unterstützt (z. B. Likes, Kommentare, Merker/„interessiert“-Markierungen verknüpft mit Ihrer Nutzer-ID). Profilbilder können in Supabase Storage gespeichert und über öffentliche URLs ausgeliefert werden.",
          "Die Verarbeitung dient der Bereitstellung der von Ihnen genutzten Funktionen (Konto, Profil, Community) sowie der Absicherung des Dienstes. Einzelheiten zu Verarbeitung, Unterauftragsverarbeitern und Drittlandübermittlungen finden Sie in den Unterlagen von Supabase; siehe u. a. https://supabase.com/privacy und die dort verlinkten Informationen.",
          "Ist Supabase in einer konkreten Bereitstellung nicht konfiguriert, stehen diese Funktionen nicht zur Verfügung und erfolgt über unsere Anbindung keine entsprechende Verarbeitung.",
        ],
      },
      {
        heading: "Cookies und lokale Speicherung",
        paragraphs: [
          "Die Supabase-Authentifizierung nutzt üblicherweise Browser-Speicher oder vergleichbare Mechanismen, um Ihre Anmeldung aufrechtzuerhalten. Über die Bibliothek next-themes wird Ihre Einstellung zum hellen/dunklen Erscheinungsbild typischerweise lokal im Browser gespeichert.",
          "Sie können Websitedaten in Ihren Browsereinstellungen löschen; dies kann zur Abmeldung oder zum Zurücksetzen von Oberflächeneinstellungen führen.",
        ],
      },
      {
        heading: "Newsletter-Bereich auf der Website",
        paragraphs: [
          "Der Newsletter-Bereich prüft Ihre Eingabe derzeit im Browser und zeigt eine Bestätigung an. In der vorliegenden Implementierung wird Ihre E-Mail-Adresse dabei nicht an von Bearhood betriebene Server übermittelt. Schließen wir später ein E-Mail- oder Marketing-Tool an, aktualisieren wir diese Erklärung und holen wir – soweit erforderlich – eine Einwilligung oder stützen uns auf eine andere Rechtsgrundlage.",
        ],
      },
      {
        heading: "Links zu Websites Dritter",
        paragraphs: [
          "Wir verlinken auf externe Angebote (z. B. soziale Netzwerke, Ticketplattformen). Diese haben eigene Datenschutzregelungen. Für deren Verarbeitung, sobald Sie unsere Website verlassen, sind wir nicht verantwortlich.",
        ],
      },
      {
        heading: "Speicherdauer",
        paragraphs: [
          "Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist, einschließlich gesetzlicher Aufbewahrungspflichten. Kontobezogene Daten bei Supabase unterliegen den Aufbewahrungsregeln von Supabase sowie Ihren Handlungen im Dienst (z. B. Löschanfragen über die verfügbaren Funktionen).",
        ],
      },
      {
        heading: "Ihre Rechte",
        paragraphs: [
          "Soweit die DSGVO oder vergleichbares Recht gilt, können Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit haben sowie eine erteilte Einwilligung widerrufen. Außerdem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.",
          "Zur Ausübung Ihrer Rechte gegenüber uns wenden Sie sich an info@bearhood.de. Einzelne Anliegen (z. B. Kontolöschung) können über die Werkzeuge des Authentifizierungs-Anbieters erfolgen, sofern dort das Hauptkonto geführt wird.",
        ],
      },
      {
        heading: "Änderungen",
        paragraphs: [
          "Wir können diese Erklärung anpassen, wenn sich Produkt oder Rechtslage ändert. Die jeweils gültige Fassung finden Sie auf dieser Seite mit aktualisiertem Stand (unten).",
          "Stand: 29. März 2026.",
        ],
      },
    ],
  },
};
