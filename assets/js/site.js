(() => {
  const stateStorageKey = "alexgamingdev:url-state";
  const obsoleteFormatParams = ["format", "type", "output"];
  const currentUrl = new URL(window.location.href);
  let params = new URLSearchParams(currentUrl.search);
  try {
    const savedState = localStorage.getItem(stateStorageKey);
    if (savedState) {
      const savedParams = new URLSearchParams(savedState);
      savedParams.delete("probe");
      obsoleteFormatParams.forEach(key => savedParams.delete(key));
      savedParams.forEach((value, key) => {
        if (!params.has(key)) params.set(key, value);
      });
    }
  } catch (error) {
    console.warn("Could not restore saved URL preferences.", error);
  }
  params.delete("probe");
  obsoleteFormatParams.forEach(key => params.delete(key));
  currentUrl.search = params.toString();
  if (currentUrl.href !== window.location.href) window.history.replaceState({}, "", currentUrl);
  try {
    localStorage.setItem(stateStorageKey, params.toString());
  } catch (error) {
    console.warn("Could not save URL preferences.", error);
  }
  const page = document.body.dataset.page || "home";
  const main = document.querySelector("main");
  const iconSpriteUrl = new URL("../icons.svg", document.currentScript.src).href;
  const contactVerificationConfig = window.ALEXGAMING_CONTACT_VERIFICATION;
  const language = params.get("lang") === "de" ? "de" : "en";
  const iconSvg = name => `<svg class="ui-icon" aria-hidden="true" focusable="false"><use href="${iconSpriteUrl}#${name}"></use></svg>`;

  const translations = {
    de: {
      skip: "Zum Inhalt springen",
      home: "Startseite",
      about: "Über mich",
      channels: "Kanäle",
      contact: "Kontakt",
      privacy: "Datenschutz",
      imprint: "Impressum",
      docs: "Dokumentation",
      docsNav: "Auf dieser Seite",
      navLabel: "Hauptnavigation",
      languageLabel: "Sprache auswählen",
      accessibilityLabel: "Barrierefreiheit umschalten",
      accessibility: "Barrierefrei",
      footer: "© 2026 alexgamingdev",
      footerLinks: {home: "Über mich", about: "Kanäle", channels: "Kontakt", contact: "Startseite", privacy: "Startseite", imprint: "Startseite", docs: "Startseite"},
      footerDocs: "Dokumentation",
      contactVerification: {
        prompt: "Bestätige kurz, dass du ein Mensch bist, um die Kontaktdaten lesbar anzuzeigen.",
        loading: "Barrierefreie Prüfung wird geladen …",
        unavailable: "Die menschliche Prüfung ist noch nicht eingerichtet. Bitte nutze bis dahin das Kontaktformular.",
        failed: "Die Prüfung war nicht erfolgreich. Bitte versuche es erneut oder nutze das Kontaktformular.",
        form: "Kontaktformular öffnen",
        verified: "Bestätigt. Kontaktdaten werden jetzt lesbar angezeigt."
      },
      pages: {
        home: {
          title: "Alexander Dennhoven | Softwareentwickler & Creator | alexgamingdev",
          description: "Alexander Dennhoven, bekannt als alexgamingdev: Softwareentwickler und Content Creator mit Fokus auf moderne Softwareentwicklung, Open Source und verständliche Tech-Inhalte.",
          keywords: "Alexander Dennhoven, alexgamingdev, Softwareentwickler, Softwareentwicklung, Softwarearchitektur, Open Source, Content Creator, Tech Content"
        },
        about: {
          title: "Über mich | Alexander Dennhoven | alexgamingdev",
          description: "Mehr über Alexander Dennhoven, bekannt als alexgamingdev: Softwareentwicklung, Architektur, Content Creation und der Blick auf gute digitale Produkte.",
          keywords: "Alexander Dennhoven, alexgamingdev, Über mich, Softwareentwickler, Softwarearchitektur, Content Creator, Softwareentwicklung"
        },
        channels: {
          title: "Profile | Alexander Dennhoven | alexgamingdev",
          description: "Alle offiziellen Profile von Alexander Dennhoven: GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch und weitere soziale und technische Kanäle.",
          keywords: "alexgamingdev, Alexander Dennhoven, GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch, TikTok, Entwicklerprofil"
        },
        contact: {
          title: "Kontakt | Alexander Dennhoven | alexgamingdev",
          description: "Kontakt zu Alexander Dennhoven, bekannt als alexgamingdev, für Zusammenarbeit, technische Ideen, Freelance und Vernetzung rund um Softwareentwicklung.",
          keywords: "Alexander Dennhoven kontaktieren, alexgamingdev, Zusammenarbeit, Freelance, Softwareentwicklung, Vernetzung, Technik"
        },
        privacy: {
          title: "Datenschutz | Alexander Dennhoven | alexgamingdev",
          description: "Informationen zur Verarbeitung personenbezogener Daten auf der Website von Alexander Dennhoven, bekannt als alexgamingdev.",
          keywords: "Datenschutz, Privatsphäre, alexgamingdev, Cloudflare, GitHub Pages, Formspree"
        },
        imprint: {
          title: "Impressum | Alexander Dennhoven | alexgamingdev",
          description: "Anbieterkennzeichnung und Kontaktangaben von Alexander Dennhoven, online bekannt als alexgamingdev.",
          keywords: "Impressum, Anbieterkennzeichnung, Alexander Dennhoven, alexgamingdev"
        },
        docs: {
          title: "Dokumentation | Alexander Dennhoven | alexgamingdev",
          description: "Ein Wegweiser durch das Portfolio von alexgamingdev: Seiten, Barrierefreiheit, Spracheinstellungen, Datenschutz und ein verstecktes Arcade-Easter-Egg.",
          keywords: "alexgamingdev Portfolio Dokumentation, Website Wegweiser, Barrierefreiheit, Sprache, Easter Egg"
        }
      },
      homeContent: {
        role: '<span class="status-dot"></span> Softwareentwickler <span class="eyebrow-divider">/</span> Content Creator',
        hero: "Gute Software bauen.<br>Wissen teilen.<br><span>Ideen weiterbringen.</span>",
        intro: 'Ich bin <strong>Alexander Dennhoven</strong> – online als <strong>alexgamingdev</strong> unterwegs. Ich entwickle Software, beschäftige mich mit durchdachter Architektur und mache komplexe technische Themen verständlich.',
        channelsCta: `Meine Kanäle entdecken ${iconSvg("arrow-up-right")}`,
        aboutCta: `Mehr über mich ${iconSvg("arrow-right")}`,
        note: "Neugierig bleiben. Klar denken. Mit Sorgfalt entwickeln.",
        visualLabel: "Persönliches Entwicklerprofil",
        cardLabel: "DIGITALER HANDWERKER",
        orbitTop: `IDEEN ${iconSvg("arrow-right")} CODE`,
        orbitBottom: `CODE ${iconSvg("arrow-right")} VERSTÄNDNIS`,
        workflowLabel: "Arbeitsweise",
        workflow: ["Probleme verstehen", "Lösungen durchdenken", "Wissen weitergeben"],
        aboutEyebrow: "HINTER DEM HANDLE",
        aboutTitle: "Entwickler aus Überzeugung.<br><span>Creator aus Begeisterung.</span>",
        aboutLead: 'Hinter <strong>alexgamingdev</strong> stehe ich: Alexander Dennhoven. Mich motiviert die Herausforderung, aus komplexen Anforderungen klare und verlässliche Software zu machen.',
        aboutParagraphs: [
          "Gute Entwicklung heißt für mich, Zusammenhänge zu verstehen, sorgfältig zu gestalten und Lösungen so umzusetzen, dass sie nachvollziehbar und langfristig weiterentwickelbar bleiben. Sauberer Code und durchdachte Architektur helfen, Ideen in Software zu verwandeln, die Menschen wirklich nutzen können.",
          "Diese Begeisterung teile ich als Content Creator. In meinen Videos mache ich technische Themen zugänglich. Auf GitHub können Projekte und Entwicklungsarbeit offen entdeckt werden."
        ],
        aboutLink: `Mehr über meine Arbeitsweise ${iconSvg("arrow-up-right")}`,
        channelsEyebrow: "FINDE MICH ONLINE",
        channelsTitle: "Ideen, Einblicke<br><span>und Austausch.</span>",
        channelsSummary: "Code, Videos und Gespräche aus der Entwickler-Community – alle meine Kanäle an einem Ort.",
        socialEyebrows: ["CODE & OPEN SOURCE", "VIDEOS & TECHNIK", "GEDANKEN & COMMUNITY", "BERUF & VERNETZUNG"],
        socialDescriptions: [
          "Projekte, Code und Einblicke in meine Arbeit.",
          "Technische Themen verständlich erklärt.",
          "Neuigkeiten und Austausch mit der Community.",
          "Berufliche Einblicke und Gespräche über Zusammenarbeit."
        ],
        allProfiles: `Alle Social-Profile ansehen ${iconSvg("arrow-up-right")}`,
        contactEyebrow: "GUTE IDEEN SIND TEAMWORK",
        contactTitle: "Was können wir<br><span>gemeinsam bauen?</span>",
        contactIntro: "Du hast eine Idee, möchtest über Zusammenarbeit sprechen oder dich einfach vernetzen? Ich freue mich auf den Austausch.",
        contactDetails: "E-Mail: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev · Telefon: +49 [eins sieben sechs] [sechs sechs drei acht eins eins neun drei]",
        contactCta: `Kontakt aufnehmen ${iconSvg("arrow-up-right")}`,
        linkedIn: "LinkedIn-Profil ansehen"
      },
      aboutContent: {
        eyebrow: "ÜBER MICH",
        title: 'Entwickler aus Überzeugung.<br><span style="color:var(--accent)">Creator aus Begeisterung.</span>',
        intro: "Ich bin Alexander Dennhoven – in der Entwickler-Community als alexgamingdev bekannt. Ich verbinde praktische Softwareentwicklung mit der Freude, Wissen verständlich zu teilen.",
        headings: ["Mit Neugier an gute Lösungen", "Technik verständlich machen", "Worauf ich Wert lege", "Lass uns in Kontakt kommen"],
        paragraphs: [
          [
            "Mich interessieren die Fragen hinter einer technischen Aufgabe: Welches Problem steckt dahinter? Was brauchen die Menschen, die mit der Lösung arbeiten? Und wie lässt sich daraus Software entwickeln, die verständlich, zuverlässig und langfristig weiterentwickelbar bleibt?",
            "Ich mag klare Konzepte, sauberen Code und Softwarearchitektur, die den Zweck unterstützt statt unnötige Komplexität zu schaffen. Für mich entsteht gute Software durch sorgfältiges Problemlösen, kontinuierliches Lernen und den Austausch unterschiedlicher Perspektiven."
          ],
          [
            "Als Creator veröffentliche ich technische Inhalte unter dem Namen alexgamingdev. Auf YouTube teile ich Einblicke in Softwareentwicklung und bereite komplexe Themen so auf, dass sie nachvollziehbar werden. Auf GitHub finden sich meine Projekte und Beiträge zur Open-Source-Community.",
            "Entwickeln und Erklären ergänzen sich: Beim Vermitteln wird Wissen klarer, und der Austausch bringt neue Ideen in die eigene Arbeit zurück."
          ],
          [
            "Probleme gründlich verstehen, bevor Lösungen gebaut werden.",
            "Code und Architektur klar, nachvollziehbar und wartbar gestalten.",
            "Technische Entscheidungen verständlich kommunizieren.",
            "Offen lernen, Wissen teilen und gemeinsam bessere Ergebnisse erzielen."
          ],
          [
            "Du möchtest über ein Projekt, eine mögliche Zusammenarbeit oder moderne Softwareentwicklung sprechen? Ich freue mich auf deine Nachricht."
          ]
        ],
        links: [
          `Zum YouTube-Kanal ${iconSvg("arrow-up-right")}`,
          `Zu GitHub ${iconSvg("arrow-up-right")}`,
          `Kontaktmöglichkeiten ansehen ${iconSvg("arrow-up-right")}`
        ]
      },
      channelsContent: {
        eyebrow: "KANÄLE & NETZWERKE",
        title: 'Finde mich<br><span style="color:var(--accent)">online.</span>',
        intro: "Code, Videos, kurze Gedanken und beruflicher Austausch: Hier findest du meine Profile und die Inhalte, die dich dort erwarten.",
        profilesLabel: "Social-Media- und Entwicklerprofile",
        items: [
          ["Code, Projekte & Open Source", "github.com/alexgamingdev"],
          ["Älteres Konto", "github.com/alexgamingstudios", "GitHub (alt)"],
          ["Videos & technische Einblicke", "youtube.com/@alexgamingdev"],
          ["Gedanken & Community", "alexgaming.is-a.dev"],
          ["Berufliche Einblicke & Vernetzung", "linkedin.com/in/alexgamingdev"],
          ["Soziale Netzwerke", "@alexgamingdev"],
          ["Soziale Netzwerke", "@alexgaming.dev"],
          ["Videos", "@alexgamingdev"],
          ["Livestreams", "twitch.tv/alexgamingdev"],
          ["Fediverse", "mastodon.social/@alexgamingdev"],
          ["Fediverse", "mstdn.social/@alexgamingdev", "Mastodon (mstdn.social)"],
          ["Profil", "pinterest.com/alexgamingdev"],
          ["Pakete", "npmjs.com/~alexgamingdev"],
          ["Alle Links auf einen Blick", "linktr.ee/alexgamingdev"],
          ["Eintrag", "Q138410440"],
          ["Personen-Suchergebnis", "Google"]
        ]
      },
      contactContent: {
        eyebrow: "KONTAKT & ZUSAMMENARBEIT",
        title: 'Eine gute Idee<br><span style="color:var(--accent)">fängt mit einem Gespräch an.</span>',
        intro: "Du planst ein Projekt, suchst einen Sparringspartner für eine technische Idee oder möchtest dich vernetzen? Schreib mir über das Formular oder eines meiner Profile.",
        details: "E-Mail: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev · Telefon: +49 [eins sieben sechs] [sechs sechs drei acht eins eins neun drei]",
        headings: ["Worüber wir sprechen können", "Vorher noch stöbern?"],
        description: "Zusammenarbeit an spannenden Softwareprojekten, technische Konzepte und Architektur, Freelance-Anfragen oder der Austausch rund um moderne Softwareentwicklung und Content Creation.",
        form: {
          heading: "Nachricht senden",
          name: "Dein Name",
          email: "E-Mail-Adresse",
          subject: "Betreff (optional)",
          message: "Nachricht",
          submit: "Nachricht senden"
        },
        linkedIn: `Auf LinkedIn vernetzen ${iconSvg("arrow-up-right")}`,
        bluesky: `Auf BlueSky schreiben ${iconSvg("arrow-up-right")}`
      },
      privacyContent: {
        eyebrow: "DATENSCHUTZ",
        title: "Deine Daten.<br><span style=\"color:var(--accent)\">Transparent erklärt.</span>",
        intro: "Diese Hinweise erklären, welche Daten beim Besuch dieser Website verarbeitet werden und welche Rechte du hast.",
        headings: ["Verantwortlicher", "Hosting, DNS und Server-Protokolle", "Kontaktformular und externe Links", "Lokale Einstellungen und Schriftarten", "Deine Rechte"],
        paragraphs: [
          "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist Alexander Dennhoven, online bekannt als alexgamingdev. Kontakt: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev. Die Telefonnummer wird zum Schutz vor automatisierter Erfassung ausgeschrieben: +49 [eins sieben sechs] [sechs sechs drei acht eins eins neun drei].",
          "Die Website wird als statische Website über GitHub Pages bereitgestellt. Die Domain wird über das is-a.dev-Projekt verwaltet; DNS wird über Cloudflare bereitgestellt. GitHub Pages verarbeitet die Website-Aufrufe und kann technische Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte URL, Referrer, Browserkennung und Statuscode in Server- und Sicherheitsprotokollen verarbeiten. Cloudflare kann DNS-Anfragedaten verarbeiten; falls ein Proxy aktiviert ist, können auch Website-Aufrufdaten verarbeitet werden. Das is-a.dev-Projekt verwaltet die Domain-Registrierung. Es gelten zusätzlich die Datenschutzhinweise der jeweiligen Anbieter.",
          "Wenn du das Kontaktformular nutzt, werden die eingegebenen Angaben zur Bearbeitung deiner Nachricht an Formspree übermittelt. Bitte sende keine sensiblen oder besonders geschützten Informationen. Für die Verarbeitung durch Formspree gelten deren Datenschutzbestimmungen. Links zu sozialen Netzwerken und anderen externen Diensten führen erst nach deinem Klick zu deren Anbietern; dort gelten deren jeweilige Datenschutzbestimmungen. Wenn der Verifizierungsdienst eingerichtet ist und du im Barrierefreiheitsmodus lesbare Kontaktdaten anforderst, wird Cloudflare Turnstile zur menschlichen Prüfung geladen. Dabei verarbeitet Cloudflare technische Verbindungsdaten, einschließlich deiner IP-Adresse. Für individuell freigegebene Profil-Exporte verarbeitet der Cloudflare Worker die Anfrage einschließlich der persönlichen Zugangs-URL sowie technische Verbindungsdaten wie die IP-Adresse. Der Zugang schaltet ausschließlich kuratierte öffentliche Profildaten frei und kann widerrufen werden. In Cloudflare KV wird nur ein SHA-256-Hash des Zugangstokens mit einem Freigabestatus abgelegt. Die Antworten sind als nicht-cachebar markiert; Cloudflare kann dennoch notwendige Sicherheits- und Betriebsdaten verarbeiten.",
          "Diese Website setzt keine Analyse- oder Werbe-Cookies. Eine Spracheinstellung, der Barrierefreiheitsmodus und weitere URL-Parameter können in deinem Browser im localStorage gespeichert werden, damit die gewählten Einstellungen bei der Navigation erhalten bleiben. Die Website lädt Schriftarten von Google Fonts; beim Laden wird eine Verbindung zu Google hergestellt, wobei technische Verbindungsdaten übertragen werden können. Du kannst externe Schriftarten durch Browser-Einstellungen oder Erweiterungen blockieren. Einzelheiten stehen in den Datenschutzhinweisen von Google.",
          "Du hast im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Anfragen nutze bitte das Kontaktformular oder die oben angegebene, gegen automatische Erfassung geschützte E-Mail-Adresse."
        ],
        links: ["Kontaktformular öffnen"],
        providerLinks: {
          github: "GitHub-Datenschutzhinweise",
          cloudflare: "Cloudflare-Datenschutzerklärung",
          isadev: "is-a.dev-Projekt",
          formspree: "Datenschutzhinweise von Formspree",
          google: "Google-Datenschutzerklärung"
        }
      },
      imprintContent: {
        eyebrow: "IMPRESSUM",
        title: 'Anbieterinformationen.<br><span style="color:var(--accent)">Klar und erreichbar.</span>',
        intro: "Angaben zum Anbieter dieser Website.",
        headings: ["Anbieter", "Kontakt", "Datenschutz"],
        contact: "E-Mail: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev<br>Telefon: +49 [eins sieben sechs] [sechs sechs drei acht eins eins neun drei]",
        contactForm: "Kontaktformular",
        privacyText: 'Informationen zur Verarbeitung personenbezogener Daten stehen in der <a href="../privacy/">Datenschutzerklärung</a>.'
      }
    },
    en: {
      skip: "Skip to content",
      home: "Home",
      about: "About",
      channels: "Channels",
      contact: "Contact",
      privacy: "Privacy",
      imprint: "Imprint",
      docs: "Documentation",
      docsNav: "On this page",
      navLabel: "Main navigation",
      languageLabel: "Choose language",
      accessibilityLabel: "Toggle accessibility mode",
      accessibility: "Accessibility",
      footer: "© 2026 alexgamingdev",
      footerLinks: {home: "About", about: "Channels", channels: "Contact", contact: "Home", privacy: "Home", imprint: "Home", docs: "Home"},
      footerDocs: "Documentation",
      contactVerification: {
        prompt: "Complete a quick human check to view readable contact details.",
        loading: "Loading the accessible verification …",
        unavailable: "Human verification is not configured yet. Please use the contact form in the meantime.",
        failed: "Verification was not successful. Please try again or use the contact form.",
        form: "Open the contact form",
        verified: "Verified. Contact details are now readable."
      },
      pages: {
        home: {
          title: "Alexander Dennhoven | Software Developer & Creator | alexgamingdev",
          description: "Alexander Dennhoven, known as alexgamingdev: software developer and creator focused on modern software engineering, open source and clear tech storytelling.",
          keywords: "Alexander Dennhoven, alexgamingdev, software developer, software engineering, software architecture, open source, content creator, tech content"
        },
        about: {
          title: "About | Alexander Dennhoven | alexgamingdev",
          description: "Learn more about Alexander Dennhoven, known as alexgamingdev, and his approach to software engineering, architecture and digital storytelling.",
          keywords: "Alexander Dennhoven, alexgamingdev, about, software developer, software architecture, content creator, software engineering"
        },
        channels: {
          title: "Profiles | Alexander Dennhoven | alexgamingdev",
          description: "Official profiles of Alexander Dennhoven: GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch and other social and developer channels.",
          keywords: "alexgamingdev, Alexander Dennhoven, GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch, TikTok, developer profile"
        },
        contact: {
          title: "Contact | Alexander Dennhoven | alexgamingdev",
          description: "Contact Alexander Dennhoven, known as alexgamingdev, for collaboration, technical ideas, freelance work and networking in software development.",
          keywords: "contact Alexander Dennhoven, alexgamingdev, collaboration, freelance, software development, networking, technology"
        },
        privacy: {
          title: "Privacy | Alexander Dennhoven | alexgamingdev",
          description: "How the website of Alexander Dennhoven, known as alexgamingdev, processes personal data.",
          keywords: "privacy, data protection, alexgamingdev, Cloudflare, GitHub Pages, Formspree"
        },
        imprint: {
          title: "Imprint | Alexander Dennhoven | alexgamingdev",
          description: "Provider information and contact details for Alexander Dennhoven, known online as alexgamingdev.",
          keywords: "imprint, legal notice, Alexander Dennhoven, alexgamingdev"
        },
        docs: {
          title: "Website guide | Alexander Dennhoven | alexgamingdev",
          description: "A friendly guide to the alexgamingdev portfolio: its pages, accessibility, language settings, privacy, and a hidden arcade Easter egg.",
          keywords: "alexgamingdev portfolio documentation, website guide, accessibility, language, Easter egg"
        }
      },
      homeContent: {
        role: '<span class="status-dot"></span> Software Developer <span class="eyebrow-divider">/</span> Content Creator',
        hero: "Build great software.<br>Share what you learn.<br><span>Move ideas forward.</span>",
        intro: 'I’m <strong>Alexander Dennhoven</strong> – known online as <strong>alexgamingdev</strong>. I build software, think about thoughtful architecture and make complex technical topics easier to understand.',
        channelsCta: `Explore my channels ${iconSvg("arrow-up-right")}`,
        aboutCta: `More about me ${iconSvg("arrow-right")}`,
        note: "Stay curious. Think clearly. Build with care.",
        visualLabel: "Developer profile",
        cardLabel: "DIGITAL CRAFTSMAN",
        orbitTop: `IDEAS ${iconSvg("arrow-right")} CODE`,
        orbitBottom: `CODE ${iconSvg("arrow-right")} UNDERSTANDING`,
        workflowLabel: "How I work",
        workflow: ["Understand the problem", "Think through solutions", "Share what I learn"],
        aboutEyebrow: "BEHIND THE HANDLE",
        aboutTitle: "Developer by conviction.<br><span>Creator by enthusiasm.</span>",
        aboutLead: 'Behind <strong>alexgamingdev</strong> is me: Alexander Dennhoven. I’m motivated by turning complex requirements into clear, dependable software.',
        aboutParagraphs: [
          "Good development means understanding the context, making thoughtful decisions and building solutions that remain clear and maintainable over time. Clean code and considered architecture help turn ideas into software people can actually use.",
          "I share that enthusiasm as a creator. My videos make technical topics approachable, while GitHub offers an open look at my projects and development work."
        ],
        aboutLink: `More about how I work ${iconSvg("arrow-up-right")}`,
        channelsEyebrow: "FIND ME ONLINE",
        channelsTitle: "Ideas, insights<br><span>and conversations.</span>",
        channelsSummary: "Code, videos and conversations with the developer community – all my channels in one place.",
        socialEyebrows: ["CODE & OPEN SOURCE", "VIDEOS & TECHNOLOGY", "THOUGHTS & COMMUNITY", "CAREER & NETWORKING"],
        socialDescriptions: [
          "Projects, code and a look at how I build software.",
          "Technical topics explained in an approachable way.",
          "Updates and conversations with the community.",
          "Professional updates and conversations about working together."
        ],
        allProfiles: `Explore all social profiles ${iconSvg("arrow-up-right")}`,
        contactEyebrow: "GREAT IDEAS ARE A TEAM EFFORT",
        contactTitle: "What could we<br><span>build together?</span>",
        contactIntro: "Have an idea, want to discuss working together or simply connect? I’d love to hear from you.",
        contactDetails: "Email: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev · Phone: +49 [one seven six] [six six three eight one one nine three]",
        contactCta: `Get in touch ${iconSvg("arrow-up-right")}`,
        linkedIn: "View my LinkedIn profile"
      },
      aboutContent: {
        eyebrow: "ABOUT ME",
        title: 'Developer by conviction.<br><span style="color:var(--accent)">Creator by enthusiasm.</span>',
        intro: "I’m Alexander Dennhoven, known in the developer community as alexgamingdev. I combine hands-on software development with a passion for making knowledge easy to understand.",
        headings: ["Curiosity leads to better solutions", "Making technology approachable", "What matters to me", "Let’s connect"],
        paragraphs: [
          [
            "I’m interested in the questions behind a technical challenge: What problem are we solving? What do the people using the solution need? And how can we build software that is clear, dependable and maintainable over time?",
            "I value clear concepts, clean code and software architecture that serves its purpose instead of adding needless complexity. Good software comes from careful problem-solving, continuous learning and exchanging different perspectives."
          ],
          [
            "As a creator, I publish technical content as alexgamingdev. On YouTube, I share software development insights and make complex topics easier to follow. GitHub is where you can explore my projects and open-source contributions.",
            "Building and explaining complement each other: teaching makes ideas clearer, and conversation brings fresh perspectives back into the work."
          ],
          [
            "Understand the problem before building a solution.",
            "Keep code and architecture clear, understandable and maintainable.",
            "Communicate technical decisions in a way people can follow.",
            "Keep learning, share knowledge and create better outcomes together."
          ],
          [
            "Want to talk about a project, a potential collaboration or modern software development? I’d be happy to hear from you."
          ]
        ],
        links: [
          `Visit my YouTube channel ${iconSvg("arrow-up-right")}`,
          `Visit GitHub ${iconSvg("arrow-up-right")}`,
          `See how to get in touch ${iconSvg("arrow-up-right")}`
        ]
      },
      channelsContent: {
        eyebrow: "CHANNELS & NETWORKS",
        title: 'Find me<br><span style="color:var(--accent)">online.</span>',
        intro: "Code, videos, quick thoughts and professional conversations: explore my profiles and what you’ll find on each.",
        profilesLabel: "Social media and developer profiles",
        items: [
          ["Code, projects & open source", "github.com/alexgamingdev"],
          ["Previous account", "github.com/alexgamingstudios", "GitHub (legacy)"],
          ["Videos & technical insights", "youtube.com/@alexgamingdev"],
          ["Thoughts & community", "alexgaming.is-a.dev"],
          ["Professional updates & networking", "linkedin.com/in/alexgamingdev"],
          ["Social network", "@alexgamingdev"],
          ["Social network", "@alexgaming.dev"],
          ["Videos", "@alexgamingdev"],
          ["Livestreams", "twitch.tv/alexgamingdev"],
          ["Fediverse", "mastodon.social/@alexgamingdev"],
          ["Fediverse", "mstdn.social/@alexgamingdev", "Mastodon (mstdn.social)"],
          ["Profile", "pinterest.com/alexgamingdev"],
          ["Packages", "npmjs.com/~alexgamingdev"],
          ["All my links in one place", "linktr.ee/alexgamingdev"],
          ["Entry", "Q138410440"],
          ["Knowledge Panel", "Google"]
        ]
      },
      contactContent: {
        eyebrow: "CONTACT & COLLABORATION",
        title: 'Every good idea<br><span>starts with a conversation.</span>',
        intro: "Planning a project, looking for a sounding board for a technical idea, or simply want to connect? Send me a message using the form or reach out through one of my profiles.",
        details: "Email: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev · Phone: +49 [one seven six] [six six three eight one one nine three]",
        headings: ["What we could talk about", "Want to explore first?"],
        description: "Collaborating on interesting software projects, technical concepts and architecture, freelance opportunities, or exchanging ideas about modern software development and content creation.",
        form: {
          heading: "Send me a message",
          name: "Your name",
          email: "Email address",
          subject: "Subject (optional)",
          message: "Message",
          submit: "Send message"
        },
        linkedIn: `Connect on LinkedIn ${iconSvg("arrow-up-right")}`,
        bluesky: `Message me on BlueSky ${iconSvg("arrow-up-right")}`
      },
      privacyContent: {
        eyebrow: "PRIVACY",
        title: "Your data.<br><span style=\"color:var(--accent)\">Clearly explained.</span>",
        intro: "This notice explains what data is processed when you visit this website and what rights you have.",
        headings: ["Controller", "Hosting, DNS and server logs", "Contact form and external links", "Local settings and fonts", "Your rights"],
        paragraphs: [
          "The controller responsible for processing personal data on this website is Alexander Dennhoven, known online as alexgamingdev. Contact: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev. To reduce automated collection, the telephone number is written out: +49 [one seven six] [six six three eight one one nine three].",
          "This static website is served through GitHub Pages. The domain is managed through the is-a.dev project and DNS is provided through Cloudflare. GitHub Pages handles website requests and may process technical connection data such as your IP address, timestamp, requested URL, referrer, browser user agent and response status in server or security logs. Cloudflare may process DNS lookup data; if proxying is enabled, its services may also process website request data. The is-a.dev project manages domain registration. The providers’ privacy notices also apply.",
          "If you use the contact form, the information you enter is sent to Formspree so your message can be handled. Please do not submit sensitive or special-category personal data. Formspree’s privacy notice applies to its processing. Social network and other external links connect to those providers only after you click; their own privacy notices then apply. If the verification service is configured and you request readable contact details in accessibility mode, Cloudflare Turnstile is loaded for human verification. Cloudflare processes technical connection data, including your IP address, for this check. For individually approved profile exports, the Cloudflare Worker processes the request, including its personal access URL, and technical connection data such as the IP address. Access reveals only curated public profile information and can be revoked. Cloudflare KV stores only a SHA-256 hash of the access token and an approval status. Responses are marked as non-cacheable; Cloudflare may still process necessary security and operational data.",
          "This website does not use analytics or advertising cookies. Your language choice, accessibility mode and other URL parameters may be stored in your browser’s localStorage so your settings continue as you navigate. The site loads fonts from Google Fonts; this establishes a connection to Google and may transmit technical connection data. You can block externally hosted fonts through browser settings or extensions. See Google’s privacy notice for details.",
          "Where applicable, you have rights to access, correct, erase, restrict or object to processing, and to data portability. You may also lodge a complaint with a data protection supervisory authority. For requests, please use the contact form or the email address above, which is intentionally obfuscated against automated collection."
        ],
        links: ["Open the contact form"],
        providerLinks: {
          github: "GitHub privacy statement",
          cloudflare: "Cloudflare privacy policy",
          isadev: "is-a.dev project",
          formspree: "Formspree privacy policy",
          google: "Google privacy policy"
        }
      },
      imprintContent: {
        eyebrow: "IMPRINT",
        title: 'Provider information.<br><span style="color:var(--accent)">Clearly stated.</span>',
        intro: "Information about the provider of this website.",
        headings: ["Service provider", "Contact", "Privacy"],
        contact: "Email: legacy [at] mail [dot] alexgaming [dot] is-a [dot] dev<br>Phone: +49 [one seven six] [six six three eight one one nine three]",
        contactForm: "Contact form",
        privacyText: 'Information about the processing of personal data is available in the <a href="../privacy/">privacy notice</a>.'
      }
    }
  };

  if (window.location.protocol === "file:") {
    document.querySelectorAll('a[href]').forEach(link => {
      const target = new URL(link.getAttribute("href"), window.location.href);
      if (target.protocol === "file:" && target.pathname.endsWith("/")) {
        target.pathname += "index.html";
        link.href = target.href;
      }
    });
  }

  function text(element) {
    return element.innerText.replace(/\s+/g, " ").trim();
  }

  let revealObserver;

  function motionAllowed() {
    return !document.body.classList.contains("a11y-mode")
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function setupScrollReveals() {
    revealObserver?.disconnect();
    document.body.classList.remove("motion-enabled");
    const targets = document.querySelectorAll(".section-heading, .channels-heading, .content-panel, .profile-link, .channel-card, .contact-content, .intro-strip");
    targets.forEach(target => {
      target.classList.remove("scroll-reveal", "is-visible");
    });

    if (!motionAllowed() || !("IntersectionObserver" in window)) return;

    document.body.classList.add("motion-enabled");
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {threshold: 0.12, rootMargin: "0px 0px -35px 0px"});

    targets.forEach(target => {
      target.classList.add("scroll-reveal");
      revealObserver.observe(target);
    });
  }

  function setText(selector, value, html = false) {
    const element = document.querySelector(selector);
    if (!element) return;
    if (html) element.innerHTML = value;
    else element.textContent = value;
  }

  let turnstileScriptPromise;
  let turnstileWidgetId;
  let verificationInProgress = false;
  const decodedContactText = new Map();

  function setVerificationStatus(message, isError = false) {
    const status = document.querySelector(".contact-verification-status");
    if (!status) return;
    status.textContent = message;
    status.setAttribute("role", isError ? "alert" : "status");
  }

  function restoreObfuscatedContactDetails() {
    decodedContactText.forEach((value, node) => {
      if (node.isConnected) node.textContent = value;
    });
    decodedContactText.clear();
  }

  function revealObfuscatedContactDetails() {
    const contactPattern = /legacy\s+\[at\]\s+mail\s+\[dot\]\s+alexgaming\s+\[dot\]\s+is-a\s+\[dot\]\s+dev/gi;
    const phonePattern = /\+49\s+\[(?:one seven six|eins sieben sechs)\]\s+\[(?:six six three eight one one nine three|sechs sechs drei acht eins eins neun drei)\]/gi;
    const emailParts = ["legacy", "mail", "alexgaming", "is-a", "dev"];
    const emailAddress = emailParts.reduce((address, part, index) =>
      `${address}${index === 0 ? "" : String.fromCharCode(index === 1 ? 64 : 46)}${part}`, "");
    const phoneNumber = [43, 52, 57, 32, 49, 55, 54, 32, 54, 54, 51, 56, 49, 49, 57, 51]
      .map(code => String.fromCharCode(code))
      .join("");
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (!node.parentElement?.closest("script, style, pre, code")) {
        const readable = node.textContent
          .replace(contactPattern, emailAddress)
          .replace(phonePattern, phoneNumber);
        if (readable !== node.textContent) {
          decodedContactText.set(node, node.textContent);
          node.textContent = readable;
        }
      }
      node = walker.nextNode();
    }
  }

  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (turnstileScriptPromise) return turnstileScriptPromise;

    turnstileScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error("Cloudflare Turnstile loaded without its API."));
      };
      script.onerror = () => reject(new Error("Could not load Cloudflare Turnstile."));
      document.head.append(script);
    });

    return turnstileScriptPromise;
  }

  async function verifyContactToken(token) {
    if (verificationInProgress) return;
    verificationInProgress = true;
    const copy = translations[language].contactVerification;
    setVerificationStatus(copy.loading);

    try {
      const endpoint = new URL(contactVerificationConfig.endpoint, window.location.origin);
      if (endpoint.origin !== window.location.origin) {
        throw new Error("The verification endpoint must use this website's origin.");
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token})
      });
      const result = await response.json();
      if (!response.ok || result.verified !== true) {
        throw new Error(typeof result.error === "string" ? result.error : copy.failed);
      }
      if (!document.body.classList.contains("a11y-mode")) return;
      revealObfuscatedContactDetails();
      setVerificationStatus(copy.verified);
    } catch (error) {
      console.error("Contact-detail verification failed.", error);
      setVerificationStatus(error.message || copy.failed, true);
      if (turnstileWidgetId !== undefined && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
    } finally {
      verificationInProgress = false;
    }
  }

  function setupContactVerification(enabled) {
    let panel = document.querySelector(".contact-verification");
    if (!panel) {
      const details = document.querySelector(".contact-details, [data-contact-details], .imprint-contact-details, .privacy-controller-contact");
      if (!details) return;

      panel = document.createElement("div");
      panel.className = "contact-verification";
      panel.hidden = true;

      const status = document.createElement("p");
      status.className = "contact-verification-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.textContent = translations[language].contactVerification.prompt;
      panel.append(status);

      const challenge = document.createElement("div");
      challenge.className = "contact-verification-widget";
      panel.append(challenge);

      const formLink = document.createElement("a");
      formLink.className = "contact-verification-form";
      formLink.href = new URL("/contact/", window.location.origin).href;
      formLink.textContent = translations[language].contactVerification.form;
      panel.append(formLink);
      details.insertAdjacentElement("afterend", panel);
    }

    panel.hidden = !enabled;
    if (!enabled) {
      restoreObfuscatedContactDetails();
      if (turnstileWidgetId !== undefined && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
      return;
    }

    const copy = translations[language].contactVerification;
    const widget = panel.querySelector(".contact-verification-widget");
    const formLink = panel.querySelector(".contact-verification-form");
    formLink.textContent = copy.form;

    if (!contactVerificationConfig?.siteKey) {
      setVerificationStatus(copy.unavailable, true);
      return;
    }

    if (turnstileWidgetId !== undefined) return;
    setVerificationStatus(copy.prompt);
    loadTurnstile().then(turnstile => {
      if (!document.body.classList.contains("a11y-mode") || !widget.isConnected) return;
      turnstileWidgetId = turnstile.render(widget, {
        sitekey: contactVerificationConfig.siteKey,
        action: "reveal_contact_details",
        callback: verifyContactToken,
        "error-callback": () => setVerificationStatus(copy.failed, true),
        "expired-callback": () => setVerificationStatus(copy.prompt)
      });
    }).catch(error => {
      console.error("Could not initialize contact verification.", error);
      setVerificationStatus(copy.failed, true);
    });
  }

  function applyCommonLanguage(copy) {
    document.documentElement.lang = language === "en" ? "en" : "de-DE";
    document.querySelector(".skip-link").textContent = copy.skip;
    const nav = document.querySelector(".main-nav");
    nav.setAttribute("aria-label", copy.navLabel);
    const navLinks = nav.querySelectorAll(":scope > a");
    navLinks[0].textContent = copy.about;
    navLinks[1].textContent = copy.channels;
    const contactLink = nav.querySelector(".nav-cta");
    contactLink.innerHTML = `${copy.contact} ${iconSvg("arrow-up-right")}`;
    document.querySelector(".brand").setAttribute("aria-label", `alexgamingdev – ${copy.home}`);
    document.querySelector(".language-switch").setAttribute("aria-label", copy.languageLabel);
    document.querySelectorAll(".language-switch a").forEach(link => {
      const targetLanguage = link.hreflang;
      const target = new URL(window.location.href);
      target.searchParams.set("lang", targetLanguage);
      link.href = target.href;
      if (targetLanguage === language) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    const accessibilityButton = document.querySelector(".a11y-toggle");
    accessibilityButton.textContent = copy.accessibility;
    accessibilityButton.setAttribute("aria-label", copy.accessibilityLabel);
    document.querySelector(".footer-inner > p").textContent = copy.footer;
    const privacyLink = document.querySelector(".footer-privacy");
    if (privacyLink) privacyLink.textContent = copy.privacy;
    const imprintLink = document.querySelector(".footer-imprint");
    if (imprintLink) imprintLink.textContent = copy.imprint;
    const docsLink = document.querySelector(".footer-docs");
    if (docsLink) docsLink.textContent = copy.footerDocs;
    const footerLink = document.querySelector(".footer-inner .back-to-top");
    if (footerLink) footerLink.innerHTML = `${copy.footerLinks[page]} ${iconSvg("arrow-up-right")}`;
  }

  function applyHomeLanguage(copy) {
    setText(".hero-copy .eyebrow", copy.role, true);
    setText(".hero-copy h1", copy.hero, true);
    setText(".hero-intro", copy.intro, true);
    setText(".hero-actions .button-primary", copy.channelsCta, true);
    setText(".hero-actions .text-link", copy.aboutCta, true);
    setText(".hero-note p", copy.note);
    document.querySelector(".hero-visual").setAttribute("aria-label", copy.visualLabel);
    setText(".card-label", copy.cardLabel);
    setText(".caption-top", copy.orbitTop, true);
    setText(".caption-bottom", copy.orbitBottom, true);
    const workflow = document.querySelector(".intro-strip");
    workflow.setAttribute("aria-label", copy.workflowLabel);
    workflow.querySelectorAll(".strip-inner p").forEach((item, index) => {
      item.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span> ${copy.workflow[index]}`;
    });
    setText(".about .section-heading .eyebrow", copy.aboutEyebrow);
    setText(".about .section-heading h2", copy.aboutTitle, true);
    setText(".about-lead", copy.aboutLead, true);
    document.querySelectorAll(".about-content > p:not(.about-lead)").forEach((item, index) => {
      item.textContent = copy.aboutParagraphs[index];
    });
    setText(".about-content .inline-link", copy.aboutLink, true);
    setText(".channels-heading .eyebrow", copy.channelsEyebrow);
    setText(".channels-heading h2", copy.channelsTitle, true);
    setText(".channels-summary", copy.channelsSummary);
    document.querySelectorAll(".channel-card").forEach((card, index) => {
      setText(`.channel-card:nth-child(${index + 1}) .channel-type`, copy.socialEyebrows[index]);
      setText(`.channel-card:nth-child(${index + 1}) div > p:last-child`, copy.socialDescriptions[index]);
    });
    setText(".channels-section .inline-link", copy.allProfiles, true);
    setText(".contact-content .eyebrow", copy.contactEyebrow);
    setText(".contact-content h2", copy.contactTitle, true);
    setText(".contact-content > p:not(.eyebrow)", copy.contactIntro);
    setText(".contact-details", copy.contactDetails);
    setText(".contact-content .button", copy.contactCta, true);
    setText(".contact-secondary", copy.linkedIn);
  }

  function applyAboutLanguage(copy) {
    setText(".subpage-hero .eyebrow", copy.eyebrow);
    setText(".subpage-hero h1", copy.title, true);
    setText(".subpage-hero > p:last-child", copy.intro);
    document.querySelectorAll(".content-panel").forEach((panel, index) => {
      panel.querySelector("h2").textContent = copy.headings[index];
      const paragraphs = panel.querySelectorAll("p");
      paragraphs.forEach((paragraph, paragraphIndex) => {
        if (copy.paragraphs[index][paragraphIndex]) paragraph.textContent = copy.paragraphs[index][paragraphIndex];
      });
      const listItems = panel.querySelectorAll("li");
      listItems.forEach((item, itemIndex) => {
        if (copy.paragraphs[index][itemIndex]) item.textContent = copy.paragraphs[index][itemIndex];
      });
    });
    document.querySelectorAll(".content-panel a.inline-link").forEach((link, index) => {
      if (copy.links[index]) link.innerHTML = copy.links[index];
    });
    const cta = document.querySelector(".content-panel .button");
    if (cta) cta.innerHTML = copy.links[2];
  }

  function applyChannelsLanguage(copy) {
    setText(".subpage-hero .eyebrow", copy.eyebrow);
    setText(".subpage-hero h1", copy.title, true);
    setText(".subpage-hero > p:last-child", copy.intro);
    document.querySelector(".profile-grid").setAttribute("aria-label", copy.profilesLabel);
    document.querySelectorAll(".profile-link").forEach((card, index) => {
      const [description, label, translatedName] = copy.items[index];
      if (translatedName) card.querySelector("strong").textContent = translatedName;
      const descriptionElement = card.querySelector(".profile-description");
      const urlElement = card.querySelector(".profile-url");
      if (descriptionElement) descriptionElement.textContent = description;
      if (urlElement) urlElement.textContent = label;
    });
  }

  function applyContactLanguage(copy) {
    setText(".subpage-hero .eyebrow", copy.eyebrow);
    setText(".subpage-hero h1", copy.title, true);
    setText(".subpage-hero > p:last-child", copy.intro);
    document.querySelectorAll(".content-panel h2").forEach((heading, index) => {
      heading.textContent = copy.headings[index];
    });
    const description = document.querySelector("[data-contact-description]");
    if (description) description.textContent = copy.description;
    const contactDetails = document.querySelector("[data-contact-details]");
    if (contactDetails) contactDetails.textContent = copy.details;
    const formHeading = document.querySelector("[data-form-heading]");
    if (formHeading) formHeading.textContent = copy.form.heading;
    document.querySelectorAll("[data-form-label]").forEach(element => {
      const label = element.dataset.formLabel;
      if (label && copy.form[label]) element.textContent = copy.form[label];
    });
    const browseParagraph = document.querySelector("[data-browse-paragraph]");
    if (browseParagraph) {
      browseParagraph.innerHTML = language === "en"
        ? 'Visit my <a href="../channels/">channels page</a> for all my social and developer profiles. Learn more about me and my approach on the <a href="../about/">about page</a>.'
        : 'Auf meiner <a href="../channels/">Kanäle-Seite</a> findest du alle Social- und Entwicklerprofile. Mehr über mich und meine Arbeitsweise gibt es auf der <a href="../about/">Über-mich-Seite</a>.';
    }
    const linkedIn = document.querySelector('[data-contact-link="linkedin"]');
    const bluesky = document.querySelector('[data-contact-link="bluesky"]');
    if (linkedIn) linkedIn.innerHTML = copy.linkedIn;
    if (bluesky) bluesky.innerHTML = copy.bluesky;
  }

  function applyPrivacyLanguage(copy) {
    setText(".subpage-hero .eyebrow", copy.eyebrow);
    setText(".subpage-hero h1", copy.title, true);
    setText(".subpage-hero > p:last-child", copy.intro);
    document.querySelectorAll(".content-panel").forEach((panel, index) => {
      const heading = panel.querySelector("h2");
      if (heading) heading.textContent = copy.headings[index];
      if (copy.paragraphs[index]) {
        const paragraph = panel.querySelector("p");
        if (paragraph) paragraph.textContent = copy.paragraphs[index];
      }
    });
    const contactLink = document.querySelector("[data-privacy-contact]");
    if (contactLink) contactLink.textContent = copy.links[0];
    document.querySelectorAll("[data-privacy-link]").forEach(link => {
      const provider = link.dataset.privacyLink;
      if (provider && copy.providerLinks[provider]) link.textContent = copy.providerLinks[provider];
    });
  }

  function applyImprintLanguage(copy) {
    setText(".subpage-hero .eyebrow", copy.eyebrow);
    setText(".subpage-hero h1", copy.title, true);
    setText(".subpage-hero > p:last-child", copy.intro);
    document.querySelectorAll("[data-imprint-heading]").forEach((heading, index) => {
      if (copy.headings[index]) heading.textContent = copy.headings[index];
    });
    setText(".imprint-contact-details", copy.contact, true);
    setText("[data-imprint-form]", copy.contactForm);
    setText("[data-imprint-privacy]", copy.privacyText, true);
  }

  function applyLanguage() {
    const copy = translations[language];
    applyCommonLanguage(copy);
    const pageCopy = copy.pages[page];
    document.title = pageCopy.title;
    document.querySelector('meta[name="description"]').content = pageCopy.description;
    document.querySelector('meta[name="keywords"]').content = pageCopy.keywords;
    document.querySelector('meta[property="og:title"]').content = pageCopy.title;
    document.querySelector('meta[property="og:description"]').content = pageCopy.description;
    document.querySelector('meta[property="og:locale"]').content = language === "en" ? "en_US" : "de_DE";
    const alternateLocale = document.querySelector('meta[property="og:locale:alternate"]');
    if (alternateLocale) alternateLocale.content = language === "en" ? "de_DE" : "en_US";
    const openGraphUrl = document.querySelector('meta[property="og:url"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const canonicalUrl = new URL(canonical.href);
      canonicalUrl.search = language === "de" ? "?lang=de" : "";
      canonical.href = canonicalUrl.href;
      if (openGraphUrl) openGraphUrl.content = canonicalUrl.href;
    }
    document.querySelector('meta[name="twitter:title"]').content = pageCopy.title;
    document.querySelector('meta[name="twitter:description"]').content = pageCopy.description;
    document.querySelectorAll('link[hreflang][rel="alternate"]').forEach(link => {
      const alternate = new URL(link.href);
      alternate.search = link.hreflang === "de" ? "?lang=de" : "";
      link.href = alternate.href;
    });
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      const schema = JSON.parse(structuredData.textContent);
      const pageUrl = canonical?.href || window.location.href;
      const updateSchema = item => {
        if (!item || typeof item !== "object") return;
        if (Array.isArray(item)) {
          item.forEach(updateSchema);
          return;
        }
        const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
        if (types.some(type => ["WebPage", "ProfilePage", "AboutPage", "ContactPage"].includes(type))) {
          item.name = pageCopy.title;
          item.description = pageCopy.description;
          item.url = pageUrl;
        }
        if (types.includes("Person")) {
          item.jobTitle = language === "en" ? "Software Developer and Content Creator" : "Softwareentwickler und Content Creator";
          item.description = copy.pages.home.description;
        }
        if (item.inLanguage && !types.includes("WebSite")) item.inLanguage = document.documentElement.lang;
        Object.values(item).forEach(updateSchema);
      };
      updateSchema(schema);
      structuredData.textContent = JSON.stringify(schema);
    }

    if (page === "home") applyHomeLanguage(copy.homeContent);
    if (page === "about") applyAboutLanguage(copy.aboutContent);
    if (page === "channels") applyChannelsLanguage(copy.channelsContent);
    if (page === "contact") applyContactLanguage(copy.contactContent);
    if (page === "privacy") applyPrivacyLanguage(copy.privacyContent);
    if (page === "imprint") applyImprintLanguage(copy.imprintContent);
    if (page === "docs") {
      document.querySelectorAll("[data-doc-language]").forEach(section => {
        section.hidden = section.dataset.docLanguage !== language;
      });
      document.querySelector(".docs-toc")?.setAttribute("aria-label", copy.docsNav);
    }
  }

  function setAccessibility(enabled, updateUrl) {
    document.body.classList.toggle("a11y-mode", enabled);
    setupContactVerification(enabled);
    window.dispatchEvent(new CustomEvent("accessibilitymodechange", { detail: { enabled } }));
    const accessibilityButton = document.querySelector(".a11y-toggle");
    accessibilityButton?.setAttribute("aria-pressed", String(enabled));
    if (accessibilityButton) accessibilityButton.title = enabled
      ? translations[language].accessibilityLabel
      : translations[language].accessibility;
    setupScrollReveals();
    if (updateUrl) {
      const updated = new URL(window.location.href);
      if (enabled) updated.searchParams.set("a11y", "true");
      else updated.searchParams.delete("a11y");
      window.history.replaceState({}, "", updated);
      params = new URLSearchParams(updated.search);
      try {
        localStorage.setItem(stateStorageKey, params.toString());
      } catch (error) {
        console.warn("Could not save URL preferences.", error);
      }
    }
  }

  const arcadeSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let arcadeSequenceProgress = 0;
  document.body.classList.toggle("arcade-mode", params.get("easter") === "arcade");
  document.addEventListener("keydown", event => {
    if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    const expectedKey = arcadeSequence[arcadeSequenceProgress];
    if (event.key.toLowerCase() !== expectedKey.toLowerCase()) {
      arcadeSequenceProgress = event.key === arcadeSequence[0] ? 1 : 0;
      return;
    }

    arcadeSequenceProgress += 1;
    if (arcadeSequenceProgress !== arcadeSequence.length) return;

    arcadeSequenceProgress = 0;
    const enabled = !document.body.classList.contains("arcade-mode");
    document.body.classList.toggle("arcade-mode", enabled);
    const updated = new URL(window.location.href);
    if (enabled) updated.searchParams.set("easter", "arcade");
    else updated.searchParams.delete("easter");
    window.history.replaceState({}, "", updated);
    params = new URLSearchParams(updated.search);
    try {
      localStorage.setItem(stateStorageKey, params.toString());
    } catch (error) {
      console.warn("Could not save URL preferences.", error);
    }
  });

  document.addEventListener("click", event => {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link || link.target === "_blank") return;
    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin) return;
    params.forEach((value, key) => {
      if (!target.searchParams.has(key)) target.searchParams.set(key, value);
    });
    link.href = target.href;
    try {
      localStorage.setItem(stateStorageKey, target.searchParams.toString());
    } catch (error) {
      console.warn("Could not save URL preferences.", error);
    }
  });

  applyLanguage();
  setAccessibility(params.get("a11y") === "true", false);
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
    setupScrollReveals();
  });
  document.querySelector(".a11y-toggle")?.addEventListener("click", () => {
    const button = document.querySelector(".a11y-toggle");
    setAccessibility(button.getAttribute("aria-pressed") !== "true", true);
  });

  document.querySelector(".skip-link")?.addEventListener("click", () => {
    main?.focus();
  });
})();
