const SITE_HOSTNAME = "alexgaming.is-a.dev";
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXPECTED_ACTION = "reveal_contact_details";
const PUBLIC_PROFILE = {
  name: "Alexander Dennhoven",
  alternateName: "alexgamingdev",
  website: "https://alexgaming.is-a.dev/",
  description: "Software developer and content creator focused on modern software engineering, open source and clear technical storytelling.",
  roles: ["Software developer", "Content creator"],
  languages: ["English", "German"],
  pages: [
    {name: "Home", url: "https://alexgaming.is-a.dev/"},
    {name: "About", url: "https://alexgaming.is-a.dev/about/"},
    {name: "Channels", url: "https://alexgaming.is-a.dev/channels/"},
    {name: "Contact form", url: "https://alexgaming.is-a.dev/contact/"},
    {name: "Documentation", url: "https://alexgaming.is-a.dev/docs/"}
  ],
  profiles: [
    {name: "GitHub", url: "https://github.com/alexgamingdev"},
    {name: "Legacy GitHub", url: "https://github.com/alexgamingstudios"},
    {name: "YouTube", url: "https://www.youtube.com/@alexgamingdev"},
    {name: "Bluesky", url: "https://bsky.app/profile/alexgaming.is-a.dev"},
    {name: "LinkedIn", url: "https://www.linkedin.com/in/alexgamingdev"},
    {name: "X", url: "https://x.com/alexgamingdev"},
    {name: "Instagram", url: "https://www.instagram.com/alexgaming.dev/"},
    {name: "TikTok", url: "https://www.tiktok.com/@alexgamingdev"},
    {name: "Twitch", url: "https://www.twitch.tv/alexgamingdev"},
    {name: "Mastodon", url: "https://mastodon.social/@alexgamingdev"},
    {name: "Mastodon (mstdn.social)", url: "https://mstdn.social/@alexgamingdev"},
    {name: "Pinterest", url: "https://de.pinterest.com/alexgamingdev/"},
    {name: "npm", url: "https://www.npmjs.com/~alexgamingdev"},
    {name: "Linktree", url: "https://linktr.ee/alexgamingdev"},
    {name: "Wikidata", url: "https://www.wikidata.org/wiki/Q138410440"},
    {name: "Google Knowledge Panel", url: "https://www.google.com/search?kgmid=/g/11y_3fjgvj"}
  ]
};

function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}

function profileResponse(body, mediaType, status, method, extraHeaders = {}) {
  return new Response(method === "HEAD" ? null : body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Type": `${mediaType}; charset=utf-8`,
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      ...extraHeaders
    }
  });
}

function profileMarkdown() {
  return [
    `# ${PUBLIC_PROFILE.name} (${PUBLIC_PROFILE.alternateName})`,
    "",
    PUBLIC_PROFILE.description,
    "",
    `- Website: ${PUBLIC_PROFILE.website}`,
    `- Roles: ${PUBLIC_PROFILE.roles.join(", ")}`,
    `- Languages: ${PUBLIC_PROFILE.languages.join(", ")}`,
    "",
    "## Portfolio pages",
    ...PUBLIC_PROFILE.pages.map(page => `- [${page.name}](${page.url})`),
    "",
    "## Public profiles",
    ...PUBLIC_PROFILE.profiles.map(profile => `- [${profile.name}](${profile.url})`),
    ""
  ].join("\n");
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function serveProfile(request, env, pathname) {
  const match = pathname.match(/^\/api\/profile\/([A-Za-z0-9_-]{43})\.(json|md)$/);
  if (!match) {
    return profileResponse("Not found.\n", "text/plain", 404, request.method);
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    return profileResponse("Method not allowed.\n", "text/plain", 405, request.method, {Allow: "GET, HEAD"});
  }
  if (!env.PROFILE_ACCESS) {
    return profileResponse("Profile access is not configured.\n", "text/plain", 503, request.method);
  }

  const tokenHash = await sha256Hex(match[1]);
  const approval = await env.PROFILE_ACCESS.get(tokenHash);
  if (approval !== "approved") {
    return profileResponse("Not found.\n", "text/plain", 404, request.method);
  }

  if (match[2] === "json") {
    const output = {
      ...PUBLIC_PROFILE,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: PUBLIC_PROFILE.name,
        alternateName: PUBLIC_PROFILE.alternateName,
        url: PUBLIC_PROFILE.website,
        description: PUBLIC_PROFILE.description,
        jobTitle: PUBLIC_PROFILE.roles,
        knowsLanguage: PUBLIC_PROFILE.languages,
        sameAs: PUBLIC_PROFILE.profiles.map(profile => profile.url)
      }
    };
    return profileResponse(JSON.stringify(output, null, 2) + "\n", "application/json", 200, request.method);
  }
  return profileResponse(profileMarkdown(), "text/markdown", 200, request.method);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/profile/")) {
      return serveProfile(request, env, url.pathname);
    }
    if (url.pathname !== "/api/contact-verification") {
      return jsonResponse({verified: false, error: "Not found."}, 404);
    }
    if (request.method !== "POST") {
      return jsonResponse({verified: false, error: "Method not allowed."}, 405);
    }
    if (request.headers.get("Origin") !== `https://${SITE_HOSTNAME}`) {
      return jsonResponse({verified: false, error: "Origin not allowed."}, 403);
    }
    if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
      return jsonResponse({verified: false, error: "Content-Type must be application/json."}, 415);
    }
    if (!env.TURNSTILE_SECRET) {
      return jsonResponse({verified: false, error: "Verification is not configured."}, 503);
    }

    const contentLength = Number(request.headers.get("Content-Length"));
    if (Number.isFinite(contentLength) && contentLength > 4096) {
      return jsonResponse({verified: false, error: "Request body is too large."}, 413);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({verified: false, error: "Invalid request body."}, 400);
    }

    const token = typeof payload?.token === "string" ? payload.token.trim() : "";
    if (!token || token.length > 2048) {
      return jsonResponse({verified: false, error: "A valid verification token is required."}, 400);
    }

    const formData = new FormData();
    formData.set("secret", env.TURNSTILE_SECRET);
    formData.set("response", token);
    const clientIp = request.headers.get("CF-Connecting-IP");
    if (clientIp) formData.set("remoteip", clientIp);

    let verificationResponse;
    try {
      verificationResponse = await fetch(VERIFY_URL, {method: "POST", body: formData});
    } catch {
      return jsonResponse({verified: false, error: "Verification service is unavailable."}, 502);
    }
    if (!verificationResponse.ok) {
      return jsonResponse({verified: false, error: "Verification service returned an error."}, 502);
    }

    let verification;
    try {
      verification = await verificationResponse.json();
    } catch {
      return jsonResponse({verified: false, error: "Verification service returned an invalid response."}, 502);
    }
    if (!verification || typeof verification !== "object") {
      return jsonResponse({verified: false, error: "Verification service returned an invalid response."}, 502);
    }

    const verified = verification.success === true
      && verification.hostname === SITE_HOSTNAME
      && verification.action === EXPECTED_ACTION;
    if (!verified) {
      return jsonResponse({verified: false, error: "Human verification failed. Please try again."}, 403);
    }

    return jsonResponse({verified: true}, 200);
  }
};
