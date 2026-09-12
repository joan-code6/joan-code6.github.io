import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const indexHtml = readFileSync(join(dist, 'index.html'), 'utf-8');

const pages = {
  '/': {
    title: 'Bennet Joan Wegener | Developer & Portfolio',
    description:
      'Bennet Joan Wegener (joan-code) is a German student developer building LANIS for Schulportal Hessen, Zen AI, web platforms, developer tools, and hardware projects.',
    canonical: 'https://joancode.dev/',
    content: `      <main class="home-container">
        <article class="portfolio-card">
          <div class="card-content">
            <section class="left-column">
              <div class="profile-pic">
                <img src="https://avatars.githubusercontent.com/u/172996447" alt="Bennet Joan Wegener" class="profile-img" />
              </div>
              <div class="name-section">
                <h1 class="name">Bennet Joan Wegener</h1>
                <p class="handle">joan-code · he/him</p>
              </div>
              <div class="info-section">
                <div class="info-item"><span class="info-label">Location: </span><span class="info-value">Germany</span></div>
                <div class="info-item"><span class="info-label">Timezone: </span><span class="info-value">Europe/Berlin</span></div>
                <div class="info-item"><span class="info-label">School: </span><span class="info-value">Adolf-Reichwein-Gymnasium Heusenstamm</span></div>
              </div>
            </section>
            <section class="right-column">
              <div class="skills-section">
                <h2 class="section-title">Programming languages</h2>
                <div class="skills-grid">
                  <span class="skill-tag">Python</span><span class="skill-tag">Dart / Flutter</span>
                  <span class="skill-tag">React</span><span class="skill-tag">Java</span>
                  <span class="skill-tag">HTML & CSS</span>
                </div>
              </div>
              <nav class="home-actions" aria-label="Explore">
                <a class="portfolio-btn" href="/portfolio">View Portfolio</a>
                <div class="home-secondary-actions">
                  <a class="press-link" href="/blog/">Blog</a>
                  <a class="press-link" href="/media">Press</a>
                </div>
              </nav>
              <div class="social-links">
                <a href="https://github.com/joan-code6" class="social-button">GitHub</a>
                <a href="https://discord.gg/HADC4eBJHR" class="social-button">Discord</a>
                <a href="mailto:bennet-wegener@web.de" class="social-button">Email</a>
                <a href="https://en.wikipedia.org/wiki/Joke" class="social-button">Wikipedia</a>
              </div>
            </section>
          </div>
        </article>
      </main>`,
  },
  '/portfolio': {
    title: 'Projects | Bennet Joan Wegener',
    description:
      'Selected projects by Bennet Joan Wegener: LANIS for Schulportal Hessen, award-winning Zen AI, OC Forms, Broccoli, smart garden irrigation, and qssh.',
    canonical: 'https://joancode.dev/portfolio',
    content: `      <main class="content-page"><div class="content-shell">
        <nav class="content-nav" aria-label="Page navigation"><a class="content-back-link" href="/">Home</a></nav>
        <header class="content-header">
          <h1 class="content-title">My Portfolio</h1>
          <div class="content-lead"><p class="content-intro">I selected these projects for their depth, usefulness, and real-world use, regardless of when I built them.</p></div>
        </header>
        <section class="projects-grid" aria-label="Selected projects">
          <article class="project-card">
            <h2 class="project-title">LANIS for Schulportal Hessen</h2>
            <p class="project-description">An unofficial, faster way to use Schulportal Hessen. I build and maintain the Python client, cached REST API, and responsive PWA for messages, courses, homework, files, calendars, substitution plans, and timetables.</p>
            <p class="project-note">The public API and visual interface are both running live.</p>
            <div class="project-card-footer"><p class="project-timeline">Building and maintaining it since 2025</p><div class="project-links"><a class="project-link" href="https://lanis.arg-server.de">Open app</a><a class="project-link" href="https://lanis-backend.joancode.dev/documentation">API docs</a><a class="project-link" href="https://github.com/joan-code6/lanis_api">API code</a><a class="project-link" href="https://github.com/joan-code6/lanis_ui">UI code</a></div></div>
          </article>
          <article class="project-card">
            <h2 class="project-title">Zen AI</h2>
            <p class="project-description">A cross-platform personal AI assistant whose trigger-word memory retrieves only relevant notes instead of flooding the model with every saved detail.</p>
            <p class="project-note">1st place regionally, then 2nd place in Mathematics/Computer Science and the University of Kassel Informatics special prize at Jugend forscht junior Hessen 2026.</p>
            <div class="project-card-footer"><p class="project-timeline">Built from 2025 to 2026</p><div class="project-links"><a class="project-link" href="https://zen.arg-server.de">Live web app</a><a class="project-link" href="https://joancode.dev/zen_ai/">Project site</a><a class="project-link" href="https://github.com/joan-code6/zen_ai_public">Public code</a></div></div>
          </article>
          <article class="project-card">
            <h2 class="project-title">OC Forms</h2>
            <p class="project-description">The application and review system for OutCraft Minecraft events, with Discord OAuth, moderation, audit logs, roles, analytics, and whitelist export.</p>
            <p class="project-note">Built for a community of 11,000 members, OC Forms has handled more than 2,500 individual applications.</p>
            <div class="project-card-footer"><p class="project-timeline">In production since 2026</p><div class="project-links"><a class="project-link" href="https://apply.outcraft.net">Live site</a><a class="project-link" href="https://github.com/joan-code6/oc-forms">Source code</a></div></div>
          </article>
          <article class="project-card">
            <h2 class="project-title">Broccoli</h2>
            <p class="project-description">A competitive multiplayer virtual-pet game built with my team at Hack Club’s Horizons Europa hackathon. Physical NFC chips feed and care for two on-screen broccoli pets.</p>
            <p class="project-note">The prototype connects a Pico NFC reader to a Flask game loop, React display, and Flutter companion app.</p>
            <div class="project-card-footer"><p class="project-timeline">Built at Horizons Europa in Berlin · 2026</p><div class="project-links"><a class="project-link" href="https://user-cdn.hackclub-assets.com/019f9dc0-2213-7ab4-9a04-f0c7d4e0ba9f/broccoli.mp4">Watch demo</a><a class="project-link" href="https://github.com/joan-code6/broccoli">Source code</a></div></div>
          </article>
          <article class="project-card">
            <h2 class="project-title">Smart Garden Irrigation</h2>
            <p class="project-description">A real five-zone garden watering system using an ESP32-C3, Raspberry Pi, MQTT, FastAPI, weather-aware schedules, history, Discord commands, and Google Home.</p>
            <div class="project-card-footer"><p class="project-timeline">Running at home since 2026</p><div class="project-links"><a class="project-link" href="https://garten-bewaesserung.joancode.dev">Live dashboard</a><a class="project-link" href="https://github.com/joan-code6/garten-bewaesserung">Source code</a></div></div>
          </article>
          <article class="project-card">
            <h2 class="project-title">qssh</h2>
            <p class="project-description">A small Python CLI I still rely on: save an SSH session once, then connect by name with a single command. It supports password and key-based authentication and is published on PyPI.</p>
            <div class="project-card-footer"><p class="project-timeline">Stable release</p><div class="project-links"><a class="project-link" href="https://pypi.org/project/qssh/">Install from PyPI</a><a class="project-link" href="https://github.com/joan-code6/qssh">Source code</a></div></div>
          </article>
        </section>
        <a class="github-strip" href="https://github.com/joan-code6"><span><strong>More projects</strong><small>Experiments, tools, and contributions live on GitHub.</small></span><span class="github-strip-action">Visit GitHub</span></a>
      </div></main>`,
  },
  '/media': {
    title: 'Press | Bennet Joan Wegener',
    description:
      'Press coverage, official records, and civic engagement connected to Bennet Joan Wegener, Zen AI, Jugend forscht, and KiJuPa Heusenstamm.',
    canonical: 'https://joancode.dev/media',
    content: `      <main class="content-page"><div class="content-shell">
        <nav class="content-nav" aria-label="Page navigation"><a class="content-back-link" href="/">Home</a></nav>
        <header class="content-header media-header">
          <h1 class="content-title">Press</h1>
          <div class="content-lead"><p class="content-intro">Independent reporting, school coverage, and official competition records about my Jugend forscht projects and awards.</p></div>
          <div class="recognition-lines"><p><span class="recognition-year">2026</span><strong>Zen AI</strong><span class="recognition-detail">Regional winner · 2nd place Hessen · Informatics special prize</span></p><p><span class="recognition-year">2025</span><strong>Bloom Assist</strong><span class="recognition-detail">3rd place Hessen · two special prizes</span></p><p><span class="recognition-year">2024–26</span><strong>KiJuPa</strong><span class="recognition-detail">Elected to Heusenstamm’s first Kinder- und Jugendparlament</span></p></div>
        </header>
        <a class="media-featured" href="https://www.fr.de/frankfurt/junge-forschende-in-rhein-main-schlauer-als-trump-erlaubt-94169199.html">
          <div class="media-featured-heading"><p class="media-meta"><span>Frankfurter Rundschau</span><time>13 February 2026</time></p><h2>Junge Forschende in Rhein-Main: Schlauer, als Trump erlaubt</h2></div>
          <div class="media-featured-copy"><p>The FR reports from Jugend forscht at the Senckenberg Museum, photographs Bennet presenting Zen AI, and explains its selective memory.</p><span>Read original article</span></div>
        </a>
        <section class="media-archive" aria-label="Press articles and official records">
          <div class="media-section-heading"><h2>Articles &amp; official records</h2></div>
          <div class="media-grid">
            <a class="media-card" href="https://www.heusenstamm.de/de/buerger-und-stadt/pressecenter/aktuelle-meldungen/detail/item/9635/ein-blick-hinter-die-kulissen-kijupa-heusenstamm-besucht-polizeipraesidium-suedosthessen"><p class="media-meta"><span>City of Heusenstamm</span><time>6 May 2026</time></p><h3>KiJuPa visits Police Headquarters Southeast Hesse</h3><p class="media-card-summary">The member group visited Police Headquarters Southeast Hesse, discussed how young people experience public safety, and contributed ideas for future prevention work.</p><div class="media-card-footer"><strong>Read article</strong></div></a>
            <a class="media-card" href="https://www.uni-kassel.de/uni/files/Aktuelles/Jugend_forscht_junior/2026/Broschuere_jugend-forscht_2026-1.pdf#page=41"><p class="media-meta"><span>University of Kassel</span><time>March 2026</time></p><h3>Zen AI in the Jugend forscht junior Hessen 2026 program</h3><p class="media-card-summary">The official state program lists Bennet Joan Wegener and publishes the Zen AI project abstract.</p><div class="media-card-footer"><strong>Open document</strong></div></a>
            <a class="media-card" href="https://arg-heusenstamm.de/news/entry/107-rekordteilnahme-bei-jugend-forscht/"><p class="media-meta"><span>Adolf-Reichwein-Gymnasium</span><time>23 February 2026</time></p><h3>Rekordteilnahme bei Jugend forscht</h3><p class="media-card-summary">The school describes Zen AI and Bennet’s regional first-place finish in Mathematics/Computer Science.</p><div class="media-card-footer"><strong>Read article</strong></div></a>
            <a class="media-card" href="https://www.heusenstamm.de/de/buerger-und-stadt/pressecenter/aktuelle-meldungen/detail/item/8380/kijupa-politik-live-erleben-ein-spannender-tag-im-hessischen-landtag"><p class="media-meta"><span>City of Heusenstamm</span><time>1 July 2025</time></p><h3>KiJuPa experiences politics at the Hessian Parliament</h3><p class="media-card-summary">The member group attended a plenary session at the Hessian Parliament and discussed state politics with representative Christoph Mikuschek.</p><div class="media-card-footer"><strong>Read article</strong></div></a>
            <a class="media-card" href="https://arg-heusenstamm.de/news/entry/79-landesentscheid-bei-jugend-forscht/"><p class="media-meta"><span>Adolf-Reichwein-Gymnasium</span><time>2 April 2025</time></p><h3>Landesentscheid bei Jugend forscht</h3><p class="media-card-summary">The school reports third place in Mathematics/Computer Science for Bloom Assist and two additional special prizes.</p><div class="media-card-footer"><strong>Read article</strong></div></a>
            <a class="media-card" href="https://arg-heusenstamm.de/news/entry/78-erfolgreich-bei-jugend-forscht/"><p class="media-meta"><span>Adolf-Reichwein-Gymnasium</span><time>9 March 2025</time></p><h3>Erfolgreich bei „jugend forscht“</h3><p class="media-card-summary">The regional report introduces Bloom Assist and its award as the best interdisciplinary project.</p><div class="media-card-footer"><strong>Read article</strong></div></a>
          </div>
        </section>
      </div></main>`,
  },
};

for (const [route, page] of Object.entries(pages)) {
  const html = indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${page.canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${page.canonical}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${page.description}" />`)
    .replace('<div id="root"></div>', `<div id="root">${page.content}</div>`);

  if (route === '/') {
    writeFileSync(join(dist, 'index.html'), html);
  } else {
    const dir = join(dist, route);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }

  console.log(`✓ Prerendered ${route}`);
}
