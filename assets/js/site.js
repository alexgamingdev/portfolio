(() => {
  const params = new URLSearchParams(window.location.search);
  const page = document.body.dataset.page || "home";
  const main = document.querySelector("main");
  const language = params.get("lang") === "en" ? "en" : "de";

  const translations = {
    de: {
      skip: "Zum Inhalt springen",
      home: "Startseite",
      about: "Über mich",
      channels: "Kanäle",
      contact: "Kontakt",
      navLabel: "Hauptnavigation",
      languageLabel: "Sprache auswählen",
      accessibilityLabel: "Barrierefreiheit umschalten",
      accessibility: "Barrierefrei",
      footer: "Mit Neugier entwickelt. Mit Begeisterung geteilt.",
      footerLinks: {home: "Über mich", about: "Kanäle", channels: "Kontakt", contact: "Startseite"},
      pages: {
        home: {
          title: "Alexander Dennhoven | Softwareentwickler & Creator | alexgamingdev",
          description: "Alexander Dennhoven, bekannt als alexgamingdev: Softwareentwickler und Content Creator mit Fokus auf moderne Softwareentwicklung, Open Source und verständliche Tech-Inhalte.",
          keywords: "Alexander Dennhoven, alexgamingdev, Softwareentwickler, Softwareentwicklung, Softwarearchitektur, Open Source, Content Creator, Tech Content"
        },
        about: {
          title: "Über mich | Alexander Dennhoven | Softwareentwickler & Creator",
          description: "Mehr über Alexander Dennhoven, bekannt als alexgamingdev: Softwareentwicklung, Architektur, Content Creation und der Blick auf gute digitale Produkte.",
          keywords: "Alexander Dennhoven, alexgamingdev, Über mich, Softwareentwickler, Softwarearchitektur, Content Creator, Softwareentwicklung"
        },
        channels: {
          title: "Kanäle & Profile | alexgamingdev | GitHub, YouTube & mehr",
          description: "Alle offiziellen Profile von Alexander Dennhoven: GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch und weitere soziale und technische Kanäle.",
          keywords: "alexgamingdev, Alexander Dennhoven, GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch, TikTok, Entwicklerprofil"
        },
        contact: {
          title: "Kontakt | Alexander Dennhoven | Softwareentwickler & Content Creator",
          description: "Kontakt zu Alexander Dennhoven, bekannt als alexgamingdev, für Zusammenarbeit, technische Ideen, Freelance und Vernetzung rund um Softwareentwicklung.",
          keywords: "Alexander Dennhoven kontaktieren, alexgamingdev, Zusammenarbeit, Freelance, Softwareentwicklung, Vernetzung, Technik"
        }
      },
      homeContent: {
        role: '<span class="status-dot"></span> Softwareentwickler <span class="eyebrow-divider">/</span> Content Creator',
        hero: "Gute Software bauen.<br>Wissen teilen.<br><span>Ideen weiterbringen.</span>",
        intro: 'Ich bin <strong>Alexander Dennhoven</strong> – online als <strong>alexgamingdev</strong> unterwegs. Ich entwickle Software, beschäftige mich mit durchdachter Architektur und mache komplexe technische Themen verständlich.',
        channelsCta: 'Meine Kanäle entdecken <span aria-hidden="true">↗</span>',
        aboutCta: 'Mehr über mich <span aria-hidden="true">→</span>',
        note: "Neugierig bleiben. Klar denken. Mit Sorgfalt entwickeln.",
        visualLabel: "Persönliches Entwicklerprofil",
        cardLabel: "DIGITALER HANDWERKER",
        orbitTop: "IDEEN → CODE",
        orbitBottom: "CODE → VERSTÄNDNIS",
        workflowLabel: "Arbeitsweise",
        workflow: ["Probleme verstehen", "Lösungen durchdenken", "Wissen weitergeben"],
        aboutEyebrow: "HINTER DEM HANDLE",
        aboutTitle: "Entwickler aus Überzeugung.<br><span>Creator aus Begeisterung.</span>",
        aboutLead: 'Hinter <strong>alexgamingdev</strong> stehe ich: Alexander Dennhoven. Mich motiviert die Herausforderung, aus komplexen Anforderungen klare und verlässliche Software zu machen.',
        aboutParagraphs: [
          "Gute Entwicklung heißt für mich, Zusammenhänge zu verstehen, sorgfältig zu gestalten und Lösungen so umzusetzen, dass sie nachvollziehbar und langfristig weiterentwickelbar bleiben. Sauberer Code und durchdachte Architektur helfen, Ideen in Software zu verwandeln, die Menschen wirklich nutzen können.",
          "Diese Begeisterung teile ich als Content Creator. In meinen Videos mache ich technische Themen zugänglich. Auf GitHub können Projekte und Entwicklungsarbeit offen entdeckt werden."
        ],
        aboutLink: 'Mehr über meine Arbeitsweise <span aria-hidden="true">↗</span>',
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
        allProfiles: 'Alle Social-Profile ansehen <span aria-hidden="true">↗</span>',
        contactEyebrow: "GUTE IDEEN SIND TEAMWORK",
        contactTitle: "Was können wir<br><span>gemeinsam bauen?</span>",
        contactIntro: "Du hast eine Idee, möchtest über Zusammenarbeit sprechen oder dich einfach vernetzen? Ich freue mich auf den Austausch.",
        contactCta: 'Kontakt aufnehmen <span aria-hidden="true">↗</span>',
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
          'Zum YouTube-Kanal <span aria-hidden="true">↗</span>',
          'Zu GitHub <span aria-hidden="true">↗</span>',
          'Kontaktmöglichkeiten ansehen <span aria-hidden="true">↗</span>'
        ]
      },
      channelsContent: {
        eyebrow: "KANÄLE & NETZWERKE",
        title: 'Finde mich<br><span style="color:var(--accent)">online.</span>',
        intro: "Code, Videos, kurze Gedanken und beruflicher Austausch: Hier findest du meine Profile und die Inhalte, die dich dort erwarten.",
        profilesLabel: "Social-Media- und Entwicklerprofile",
        items: [
          ["Code, Projekte & Open Source", "github.com/alexgamingdev"],
          ["Videos & technische Einblicke", "youtube.com/@alexgamingdev"],
          ["Gedanken & Community", "alexgamingdev.de"],
          ["Berufliche Einblicke & Vernetzung", "in/alexander-dennhoven"],
          ["Soziale Netzwerke", "@alexgamingdev"],
          ["Soziale Netzwerke", "@alexgamingdev"],
          ["Videos", "@alexgamingdev"],
          ["Livestreams", "twitch.tv/alexgamingdev"],
          ["Fediverse", "@alexgamingdev"],
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
        intro: "Du planst ein Projekt, suchst einen Sparringspartner für eine technische Idee oder möchtest dich vernetzen? Schreib mir über eines meiner Profile.",
        headings: ["Worüber wir sprechen können", "Vorher noch stöbern?"],
        paragraphs: [
          [
            "Zusammenarbeit an spannenden Softwareprojekten, technische Konzepte und Architektur, Freelance-Anfragen oder der Austausch rund um moderne Softwareentwicklung und Content Creation.",
            "Am besten erreichst du mich über LinkedIn oder BlueSky. Ich freue mich darauf, mehr über deine Idee zu erfahren."
          ],
          [
            "Auf meiner Kanäle-Seite findest du alle Social- und Entwicklerprofile. Mehr über mich und meine Arbeitsweise gibt es auf der Über-mich-Seite."
          ]
        ],
        linkedIn: 'Auf LinkedIn vernetzen <span aria-hidden="true">↗</span>',
        bluesky: 'Auf BlueSky schreiben <span aria-hidden="true">↗</span>'
      }
    },
    en: {
      skip: "Skip to content",
      home: "Home",
      about: "About",
      channels: "Channels",
      contact: "Contact",
      navLabel: "Main navigation",
      languageLabel: "Choose language",
      accessibilityLabel: "Toggle accessibility mode",
      accessibility: "Accessibility",
      footer: "Built with curiosity. Shared with enthusiasm.",
      footerLinks: {home: "About", about: "Channels", channels: "Contact", contact: "Home"},
      pages: {
        home: {
          title: "Alexander Dennhoven | Software Developer & Creator | alexgamingdev",
          description: "Alexander Dennhoven, known as alexgamingdev: software developer and creator focused on modern software engineering, open source and clear tech storytelling.",
          keywords: "Alexander Dennhoven, alexgamingdev, software developer, software engineering, software architecture, open source, content creator, tech content"
        },
        about: {
          title: "About | Alexander Dennhoven | Software Developer & Creator",
          description: "Learn more about Alexander Dennhoven, known as alexgamingdev, and his approach to software engineering, architecture and digital storytelling.",
          keywords: "Alexander Dennhoven, alexgamingdev, about, software developer, software architecture, content creator, software engineering"
        },
        channels: {
          title: "Channels & Profiles | alexgamingdev | GitHub, YouTube & more",
          description: "Official profiles of Alexander Dennhoven: GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch and other social and developer channels.",
          keywords: "alexgamingdev, Alexander Dennhoven, GitHub, YouTube, LinkedIn, BlueSky, Instagram, Twitch, TikTok, developer profile"
        },
        contact: {
          title: "Contact | Alexander Dennhoven | Software Developer & Content Creator",
          description: "Contact Alexander Dennhoven, known as alexgamingdev, for collaboration, technical ideas, freelance work and networking in software development.",
          keywords: "contact Alexander Dennhoven, alexgamingdev, collaboration, freelance, software development, networking, technology"
        }
      },
      homeContent: {
        role: '<span class="status-dot"></span> Software Developer <span class="eyebrow-divider">/</span> Content Creator',
        hero: "Build great software.<br>Share what you learn.<br><span>Move ideas forward.</span>",
        intro: 'I’m <strong>Alexander Dennhoven</strong> – known online as <strong>alexgamingdev</strong>. I build software, think about thoughtful architecture and make complex technical topics easier to understand.',
        channelsCta: 'Explore my channels <span aria-hidden="true">↗</span>',
        aboutCta: 'More about me <span aria-hidden="true">→</span>',
        note: "Stay curious. Think clearly. Build with care.",
        visualLabel: "Developer profile",
        cardLabel: "DIGITAL CRAFTSMAN",
        orbitTop: "IDEAS → CODE",
        orbitBottom: "CODE → UNDERSTANDING",
        workflowLabel: "How I work",
        workflow: ["Understand the problem", "Think through solutions", "Share what I learn"],
        aboutEyebrow: "BEHIND THE HANDLE",
        aboutTitle: "Developer by conviction.<br><span>Creator by enthusiasm.</span>",
        aboutLead: 'Behind <strong>alexgamingdev</strong> is me: Alexander Dennhoven. I’m motivated by turning complex requirements into clear, dependable software.',
        aboutParagraphs: [
          "Good development means understanding the context, making thoughtful decisions and building solutions that remain clear and maintainable over time. Clean code and considered architecture help turn ideas into software people can actually use.",
          "I share that enthusiasm as a creator. My videos make technical topics approachable, while GitHub offers an open look at my projects and development work."
        ],
        aboutLink: 'More about how I work <span aria-hidden="true">↗</span>',
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
        allProfiles: 'Explore all social profiles <span aria-hidden="true">↗</span>',
        contactEyebrow: "GREAT IDEAS ARE A TEAM EFFORT",
        contactTitle: "What could we<br><span>build together?</span>",
        contactIntro: "Have an idea, want to discuss working together or simply connect? I’d love to hear from you.",
        contactCta: 'Get in touch <span aria-hidden="true">↗</span>',
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
          'Visit my YouTube channel <span aria-hidden="true">↗</span>',
          'Visit GitHub <span aria-hidden="true">↗</span>',
          'See how to get in touch <span aria-hidden="true">↗</span>'
        ]
      },
      channelsContent: {
        eyebrow: "CHANNELS & NETWORKS",
        title: 'Find me<br><span style="color:var(--accent)">online.</span>',
        intro: "Code, videos, quick thoughts and professional conversations: explore my profiles and what you’ll find on each.",
        profilesLabel: "Social media and developer profiles",
        items: [
          ["Code, projects & open source", "github.com/alexgamingdev"],
          ["Videos & technical insights", "youtube.com/@alexgamingdev"],
          ["Thoughts & community", "alexgamingdev.de"],
          ["Professional updates & networking", "in/alexander-dennhoven"],
          ["Social network", "@alexgamingdev"],
          ["Social network", "@alexgamingdev"],
          ["Videos", "@alexgamingdev"],
          ["Livestreams", "twitch.tv/alexgamingdev"],
          ["Fediverse", "@alexgamingdev"],
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
        intro: "Planning a project, looking for a sounding board for a technical idea or simply want to connect? Reach out through one of my profiles.",
        headings: ["What we could talk about", "Want to explore first?"],
        paragraphs: [
          [
            "Collaborating on interesting software projects, technical concepts and architecture, freelance opportunities, or exchanging ideas about modern software development and content creation.",
            "LinkedIn or BlueSky are the best ways to reach me. I’d love to hear more about your idea."
          ],
          [
            "Visit my channels page for all my social and developer profiles. Learn more about me and my approach on the about page."
          ]
        ],
        linkedIn: 'Connect on LinkedIn <span aria-hidden="true">↗</span>',
        bluesky: 'Message me on BlueSky <span aria-hidden="true">↗</span>'
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
  let cursorAura;
  let cursorFrame = 0;
  let cursorPosition = {x: -500, y: -500};

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

  function renderCursorAura() {
    if (!cursorAura || !motionAllowed() || !window.matchMedia("(pointer: fine)").matches) return;
    cursorAura.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) translate(-50%, -50%)`;
    cursorAura.classList.add("is-active");
    cursorFrame = 0;
  }

  function setupCursorAura() {
    const enabled = motionAllowed() && window.matchMedia("(pointer: fine)").matches;
    if (!enabled) {
      cursorAura?.remove();
      cursorAura = null;
      return;
    }

    if (!cursorAura) {
      cursorAura = document.createElement("div");
      cursorAura.className = "cursor-aura";
      cursorAura.setAttribute("aria-hidden", "true");
      document.body.append(cursorAura);
    }
  }

  document.addEventListener("pointermove", event => {
    if (!cursorAura) return;
    cursorPosition = {x: event.clientX, y: event.clientY};
    cursorAura.classList.remove("is-active");
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(renderCursorAura);
  }, {passive: true});

  function setText(selector, value, html = false) {
    const element = document.querySelector(selector);
    if (!element) return;
    if (html) element.innerHTML = value;
    else element.textContent = value;
  }

  function applyCommonLanguage(copy) {
    document.documentElement.lang = language === "en" ? "en" : "de-DE";
    document.querySelector(".skip-link").textContent = copy.skip;
    const nav = document.querySelector(".main-nav");
    nav.setAttribute("aria-label", copy.navLabel);
    nav.querySelector('a[href*="about"]').textContent = copy.about;
    nav.querySelector('a[href*="channels"]').textContent = copy.channels;
    const contactLink = nav.querySelector(".nav-cta");
    contactLink.innerHTML = `${copy.contact} <span aria-hidden="true">↗</span>`;
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
    const footerLink = document.querySelector(".footer-inner .back-to-top");
    if (footerLink) footerLink.innerHTML = `${copy.footerLinks[page]} <span aria-hidden="true">↗</span>`;
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
    setText(".caption-top", copy.orbitTop);
    setText(".caption-bottom", copy.orbitBottom);
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
    document.querySelectorAll(".content-panel").forEach((panel, index) => {
      panel.querySelector("h2").textContent = copy.headings[index];
      panel.querySelectorAll("p").forEach((paragraph, paragraphIndex) => {
        if (copy.paragraphs[index][paragraphIndex]) paragraph.textContent = copy.paragraphs[index][paragraphIndex];
      });
    });
    const browseParagraph = document.querySelectorAll(".content-panel")[1]?.querySelector("p");
    if (browseParagraph) {
      browseParagraph.innerHTML = language === "en"
        ? 'Visit my <a href="../channels/">channels page</a> for all my social and developer profiles. Learn more about me and my approach on the <a href="../about/">about page</a>.'
        : 'Auf meiner <a href="../channels/">Kanäle-Seite</a> findest du alle Social- und Entwicklerprofile. Mehr über mich und meine Arbeitsweise gibt es auf der <a href="../about/">Über-mich-Seite</a>.';
    }
    const ctaLinks = document.querySelectorAll(".content-panel a");
    if (ctaLinks[0]) ctaLinks[0].innerHTML = copy.linkedIn;
    if (ctaLinks[1]) ctaLinks[1].innerHTML = copy.bluesky;
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
    document.querySelector('meta[name="twitter:title"]').content = pageCopy.title;
    document.querySelector('meta[name="twitter:description"]').content = pageCopy.description;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const canonicalUrl = new URL(canonical.href);
      canonicalUrl.search = language === "en" ? "?lang=en" : "";
      canonical.href = canonicalUrl.href;
    }
    document.querySelectorAll('link[hreflang][rel="alternate"]').forEach(link => {
      const alternate = new URL(link.href);
      alternate.search = link.hreflang === "en" ? "?lang=en" : "";
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
          item.description = pageCopy.description;
        }
        if (types.includes("WebSite")) item.inLanguage = document.documentElement.lang;
        if (item.inLanguage) item.inLanguage = document.documentElement.lang;
        Object.values(item).forEach(updateSchema);
      };
      updateSchema(schema);
      structuredData.textContent = JSON.stringify(schema);
    }

    if (page === "home") applyHomeLanguage(copy.homeContent);
    if (page === "about") applyAboutLanguage(copy.aboutContent);
    if (page === "channels") applyChannelsLanguage(copy.channelsContent);
    if (page === "contact") applyContactLanguage(copy.contactContent);
  }

  function inlineMarkdown(node) {
    return [...node.childNodes].map(child => {
      if (child.nodeType === Node.TEXT_NODE) return child.textContent.trim();
      if (child.nodeType !== Node.ELEMENT_NODE) return "";
      if (child.matches("br")) return "\n";
      if (child.matches("a")) return `[${text(child)}](${child.href})`;
      return inlineMarkdown(child);
    }).filter(Boolean).join(" ").replace(/\s+([,.;:!?])/g, "$1");
  }

  function markdownFromPage() {
    const lines = [];
    const title = document.querySelector("h1");
    if (title) lines.push(`# ${text(title)}`, "");

    for (const node of main.querySelectorAll("h2, h3, p, li, a.profile-link, a.channel-card")) {
      if (node.matches("h3, p, li") && node.closest(".profile-grid, .channel-grid")) continue;
      if (node.matches("h2, h3")) {
        lines.push(`${node.tagName === "H2" ? "##" : "###"} ${text(node)}`, "");
      } else if (node.matches("li")) {
        lines.push(`- ${inlineMarkdown(node)}`);
      } else if (node.matches("a.profile-link, a.channel-card")) {
        const label = text(node.querySelector("strong, h3")) || text(node);
        const description = node.matches(".profile-link")
          ? [...node.querySelectorAll("span")].slice(0, -1).map(text).join(" — ")
          : text(node.querySelector("div > p:last-child"));
        lines.push(`- [${label}](${node.href})${description ? ` — ${description}` : ""}`);
      } else if (node.matches("p") && text(node)) {
        lines.push(`${inlineMarkdown(node)}`, "");
      }
    }

    return lines.join("\n").trim() + "\n";
  }

  function jsonFromPage() {
    const pageTitle = document.title;
    const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
    const sections = [...main.querySelectorAll("section")].map(section => ({
      heading: text(section.querySelector("h1, h2") || section),
      text: text(section),
      links: [...section.querySelectorAll("a[href]")].map(link => ({
        label: text(link),
        url: link.href
      }))
    }));
    const profiles = [...document.querySelectorAll('a[href^="https://"]')]
      .filter(link => link.closest(".channel-grid, .profile-grid"))
      .map(link => ({name: text(link.querySelector("strong, h3") || link), url: link.href}));

    return JSON.stringify({
      name: "Alexander Dennhoven",
      alternateName: "alexgamingdev",
      title: pageTitle,
      description: document.querySelector('meta[name="description"]')?.content || "",
      url: canonical,
      page,
      language,
      sections,
      profiles
    }, null, 2) + "\n";
  }

  function renderText(content, type) {
    document.title = `${type.toUpperCase()} | ${document.title}`;
    document.body.classList.add("text-response");
    const pre = document.createElement("pre");
    pre.textContent = content;
    document.body.replaceChildren(pre);
  }

  function setAccessibility(enabled, updateUrl) {
    document.body.classList.toggle("a11y-mode", enabled);
    const accessibilityButton = document.querySelector(".a11y-toggle");
    accessibilityButton?.setAttribute("aria-pressed", String(enabled));
    if (accessibilityButton) accessibilityButton.title = enabled
      ? translations[language].accessibilityLabel
      : translations[language].accessibility;
    setupScrollReveals();
    setupCursorAura();
    if (updateUrl) {
      const updated = new URL(window.location.href);
      if (enabled) updated.searchParams.set("a11y", "true");
      else updated.searchParams.delete("a11y");
      window.history.replaceState({}, "", updated);
      preservePreferencesInInternalLinks();
    }
  }

  function preservePreferencesInInternalLinks() {
    const current = new URL(window.location.href);
    document.querySelectorAll("a[href]").forEach(link => {
      if (link.closest(".language-switch")) return;
      const target = new URL(link.href, current);
      if (target.origin !== current.origin || target.protocol !== current.protocol) return;
      current.searchParams.forEach((value, key) => target.searchParams.set(key, value));
      if (language === "en") target.searchParams.set("lang", "en");
      else target.searchParams.delete("lang");
      if (current.searchParams.get("a11y") === "true") target.searchParams.set("a11y", "true");
      else target.searchParams.delete("a11y");
      link.href = target.href;
    });
  }

  applyLanguage();
  setAccessibility(params.get("a11y") === "true", false);
  preservePreferencesInInternalLinks();
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
    setupScrollReveals();
    setupCursorAura();
  });
  window.matchMedia("(pointer: fine)").addEventListener("change", setupCursorAura);
  document.querySelector(".a11y-toggle")?.addEventListener("click", () => {
    const button = document.querySelector(".a11y-toggle");
    setAccessibility(button.getAttribute("aria-pressed") !== "true", true);
  });

  if (params.get("type") === "md") renderText(markdownFromPage(), "md");
  if (params.get("type") === "json") renderText(jsonFromPage(), "json");

  document.querySelector(".skip-link")?.addEventListener("click", () => {
    main?.focus();
  });
})();
