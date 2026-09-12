import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, PackageOpen, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ContentPage.css';
import './Portfolio.css';

type ProjectLink = {
  label: string;
  url: string;
  kind: 'demo' | 'code' | 'package' | 'video';
};

type Project = {
  title: string;
  timeline: string;
  description: string;
  note?: string;
  tags: string[];
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    title: 'LANIS for Schulportal Hessen',
    timeline: 'Building and maintaining it since 2025',
    description:
      'An unofficial, faster way to use Schulportal Hessen. I build and maintain the Python client, cached REST API, and responsive PWA for messages, courses, homework, files, calendars, substitution plans, and timetables.',
    note: 'The public API and visual interface are both running live.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PWA'],
    links: [
      { label: 'Open app', url: 'https://lanis.arg-server.de', kind: 'demo' },
      { label: 'API docs', url: 'https://lanis-backend.joancode.dev/documentation', kind: 'demo' },
      { label: 'API code', url: 'https://github.com/joan-code6/lanis_api', kind: 'code' },
      { label: 'UI code', url: 'https://github.com/joan-code6/lanis_ui', kind: 'code' },
    ],
  },
  {
    title: 'Zen AI',
    timeline: 'Built from 2025 to 2026',
    description:
      'A cross-platform personal AI assistant whose trigger-word memory retrieves only relevant notes instead of flooding the model with every saved detail. I built the backend, web, desktop, mobile, CLI, email, calendar, MCP, and e-ink integrations.',
    note: '1st place regionally, then 2nd place in Mathematics/Computer Science and the University of Kassel Informatics special prize at Jugend forscht junior Hessen 2026.',
    tags: ['AI', 'Python', 'React', 'Electron', 'Firebase'],
    links: [
      { label: 'Live web app', url: 'https://zen.arg-server.de', kind: 'demo' },
      { label: 'Project site', url: 'https://joan-code6.github.io/zen_ai/', kind: 'demo' },
      { label: 'Public code', url: 'https://github.com/joan-code6/zen_ai_public', kind: 'code' },
    ],
  },
  {
    title: 'OC Forms',
    timeline: 'In production since 2026',
    description:
      'The application and review system for OutCraft Minecraft events. Players apply through Discord OAuth; moderators claim and score applications; admins resolve conflicts, manage roles, inspect audit logs, and export the final whitelist.',
    note: 'Built for a community of 11,000 members, OC Forms has handled more than 2,500 individual applications. It runs on Appwrite with 23 server functions, autosave, invite links, and analytics.',
    tags: ['React', 'TypeScript', 'Appwrite', 'Discord OAuth', 'PostHog'],
    links: [
      { label: 'Live site', url: 'https://apply.outcraft.net', kind: 'demo' },
      { label: 'Source code', url: 'https://github.com/joan-code6/oc-forms', kind: 'code' },
    ],
  },
  {
    title: 'Brettspielgeister.de',
    timeline: 'Client project · 2026',
    description:
      'A responsive website for Brettspielgeister GbR, a Heusenstamm-based team bringing board games into education. I shaped their brand into a clear web presence for schools, libraries, kindergartens, courses, and events, with contact and legal pages included.',
    note: 'A client website built from a real brief and delivered as a live site.',
    tags: ['React', 'JavaScript', 'CSS', 'Responsive design', 'SEO'],
    links: [
      { label: 'Visit website', url: 'https://brettspielgeister.de', kind: 'demo' },
      { label: 'Source code', url: 'https://github.com/joan-code6/spiele-geister-website', kind: 'code' },
    ],
  },
  {
    title: 'Broccoli',
    timeline: 'Built at Horizons Europa in Berlin · 2026',
    description:
      'A competitive multiplayer virtual-pet game built with my team at Hack Club’s Horizons Europa hackathon in Berlin. Physical NFC chips feed and care for two on-screen broccoli pets while the game tracks their growth.',
    note: 'The prototype connects a Pico NFC reader over serial to a Flask game loop, React display, and Flutter companion app.',
    tags: ['NFC', 'MicroPython', 'Flask', 'React', 'Flutter'],
    links: [
      {
        label: 'Watch demo',
        url: 'https://user-cdn.hackclub-assets.com/019f9dc0-2213-7ab4-9a04-f0c7d4e0ba9f/broccoli.mp4',
        kind: 'video',
      },
      { label: 'Source code', url: 'https://github.com/joan-code6/broccoli', kind: 'code' },
    ],
  },
  {
    title: 'Smart Garden Irrigation',
    timeline: 'Running at home since 2026',
    description:
      'The system that waters my garden for real: an ESP32-C3 controls five valves through a Raspberry Pi and MQTT, while a FastAPI dashboard handles schedules, history, and manual control.',
    note: 'It checks weather before watering, can skip rain or frost, and also supports Discord commands and Google Home. Public visitors can view the dashboard; physical controls stay protected.',
    tags: ['ESP32', 'Raspberry Pi', 'MQTT', 'FastAPI', 'IoT'],
    links: [
      { label: 'Live dashboard', url: 'https://garten-bewaesserung.joancode.dev', kind: 'demo' },
      { label: 'Source code', url: 'https://github.com/joan-code6/garten-bewaesserung', kind: 'code' },
    ],
  },
  {
    title: 'qssh',
    timeline: 'Stable release',
    description:
      'A small Python CLI I still rely on: save an SSH session once, then connect by name with a single command. It supports password and key-based authentication and is published on PyPI.',
    tags: ['Python', 'CLI', 'PyPI', 'SSH'],
    links: [
      { label: 'Install from PyPI', url: 'https://pypi.org/project/qssh/', kind: 'package' },
      { label: 'Source code', url: 'https://github.com/joan-code6/qssh', kind: 'code' },
    ],
  },
];

const linkIcons = {
  demo: ArrowUpRight,
  code: Github,
  package: PackageOpen,
  video: Play,
};

const Portfolio = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Projects | Bennet Joan Wegener</title>
        <meta
          name="description"
          content="Selected projects by Bennet Joan Wegener: Brettspielgeister.de, LANIS for Schulportal Hessen, award-winning Zen AI, OC Forms, Broccoli, smart garden irrigation, and qssh."
        />
        <link rel="canonical" href="https://joancode.dev/portfolio" />
        <meta property="og:title" content="Projects | Bennet Joan Wegener" />
        <meta
          property="og:description"
          content="Commissioned websites, full-stack platforms, AI research, event infrastructure, hardware, and useful developer tools built by Bennet Joan Wegener."
        />
        <meta property="og:url" content="https://joancode.dev/portfolio" />
        <meta name="twitter:title" content="Projects | Bennet Joan Wegener" />
        <meta
          name="twitter:description"
          content="Brettspielgeister.de, LANIS, Zen AI, OC Forms, Broccoli, smart garden irrigation, and qssh."
        />
      </Helmet>

      <main className="content-page">
        <div className="content-page-bg" aria-hidden="true" />
        <div className="content-shell">
          <nav className="content-nav" aria-label="Page navigation">
            <button className="content-back-link" type="button" onClick={() => navigate('/')}>
              Home
            </button>
          </nav>
          <motion.header
            className="content-header"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="content-title">My Portfolio</h1>
            <div className="content-lead">
              <p className="content-intro">
                I selected these projects for their depth, usefulness, and real-world use,
                regardless of when I built them.
              </p>
            </div>
          </motion.header>

          <section className="projects-grid" aria-label="Selected projects">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="project-card"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.045, duration: 0.35 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                {project.note && <p className="project-note">{project.note}</p>}

                <div className="project-card-footer">
                  <p className="project-timeline">{project.timeline}</p>
                  <div className="project-tags" aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.links.map((link) => {
                      const Icon = linkIcons[link.kind];
                      return (
                        <a
                          key={link.url}
                          className="project-link"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon size={15} aria-hidden="true" />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

          <motion.a
            className="github-strip"
            href="https://github.com/joan-code6"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { y: -2 }}
          >
            <span>
              <strong>More projects</strong>
              <small>Experiments, tools, and contributions live on GitHub.</small>
            </span>
            <span className="github-strip-action">
              Visit GitHub <Github size={17} aria-hidden="true" />
            </span>
          </motion.a>
        </div>
      </main>
    </>
  );
};

export default Portfolio;
