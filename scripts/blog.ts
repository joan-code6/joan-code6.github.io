import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
// markdown-it-footnote ships runtime ESM without TypeScript declarations.
// @ts-expect-error — the package has no declaration file.
import footnote from 'markdown-it-footnote';
import type { Plugin } from 'vite';

const origin = 'https://joancode.dev';
const intro = 'A few Thoughts I wrote down';
const markdown = new MarkdownIt({ html: false, linkify: true }).use(footnote);
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const dateLabel = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));

type Post = { slug: string; title: string; description: string; date: string; lang: string; body: string; minutes: number };

export function readPosts(root: string): Post[] {
  return readdirSync(resolve(root, 'content/blog')).filter(file => file.endsWith('.md')).map(file => {
    const { data, content } = matter(readFileSync(resolve(root, 'content/blog', file), 'utf8'));
    // Accept the typographic superscript references people commonly type (¹, ²…)
    // alongside Markdown's explicit [^1] definitions.
    const source = content.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/gu, character => `[^${'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(character)}]`);
    const fail = (message: string): never => { throw new Error(`content/blog/${file}: ${message}`); };
    const slug = file.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('use a lowercase, hyphen-separated filename');
    const tokens = markdown.parse(source, {});
    const headingIndex = tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1');
    const plainText = (index: number) => (tokens[index]?.children ?? []).map(token => token.type === 'softbreak' || token.type === 'hardbreak' ? ' ' : token.content).join('');
    const heading = headingIndex >= 0 ? plainText(headingIndex + 1) : '';
    const title = data.title ?? (heading || slug.replaceAll('-', ' '));
    const paragraphIndex = tokens.findIndex(token => token.type === 'paragraph_open');
    const description = data.description ?? (paragraphIndex >= 0 ? plainText(paragraphIndex + 1).slice(0, 200) : '');
    if (typeof title !== 'string' || !title.trim()) fail('title must be text');
    if (typeof description !== 'string') fail('description must be text');
    const date = data.date === undefined ? '' : data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) fail('date must be YYYY-MM-DD');
    const lang = data.lang ?? 'en';
    if (typeof lang !== 'string' || !/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(lang)) fail('lang must be a language code such as en or de');
    if (!source.trim()) fail('post body is empty');
    // The page renders the title, so omit the matching Markdown heading.
    if (headingIndex >= 0 && title === heading) tokens.splice(headingIndex, 3);
    return { slug, title, description, date, lang, body: markdown.renderer.render(tokens, markdown.options, {}), minutes: Math.max(1, Math.ceil(source.trim().split(/\s+/u).length / 220)) };
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

const postMeta = (post: Post) => `<div class="post-meta">${post.date ? `<time datetime="${post.date}">${dateLabel(post.date)}</time>` : ''}<span>${post.minutes} min read</span></div>`;

function document(title: string, description: string, path: string, content: string, post?: Post) {
  return `<!doctype html>
<html lang="${escape(post?.lang ?? 'en')}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${origin}${path}"><link rel="icon" href="/favicon.jpg">
<link rel="stylesheet" href="/blog/style.css"><link rel="alternate" type="application/rss+xml" title="Blog" href="/blog/feed.xml">
<meta property="og:type" content="${post ? 'article' : 'website'}"><meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${origin}${path}">
<meta property="og:site_name" content="joancode.dev"><meta name="twitter:card" content="summary">
${post?.date ? `<meta property="article:published_time" content="${post.date}">` : ''}

</head><body><a class="skip-link" href="#main">Skip to content</a>
<div class="blog-shell"><nav class="blog-nav" aria-label="Main navigation"><a class="wordmark" href="/">joancode.dev</a><div><a href="/portfolio">Projects</a><a href="/blog/" ${!post ? 'aria-current="page"' : ''}>Blog</a></div></nav>
<main id="main">${content}</main>
</div>
</body></html>`;
}

export function blogPages(root: string) {
  const posts = readPosts(root);
  const files = new Map<string, string>();
  files.set('/blog/style.css', readFileSync(resolve(root, 'src/pages/Blog.css'), 'utf8'));
  files.set('/blog/', document('Blog', intro, '/blog/', `<header class="blog-header"><h1>Blog<span class="title-dot">.</span></h1><p class="intro">${intro}</p></header>
${posts.length ? `<ol class="post-list">${posts.map(post => `<li><a class="post-link" href="/blog/${post.slug}/">${postMeta(post)}<h2 lang="${escape(post.lang)}">${escape(post.title)}</h2><p lang="${escape(post.lang)}">${escape(post.description)}</p></a></li>`).join('')}</ol>` : '<div class="empty-state"><h2>Nothing here just yet.</h2><p>The first piece is on its way.</p></div>'}`));
  for (const post of posts) {
    files.set(`/blog/${post.slug}/`, document(post.title, post.description, `/blog/${post.slug}/`, `<article>
<header class="article-header">${postMeta(post)}<h1>${escape(post.title)}</h1></header>
<div class="prose">${post.body}</div></article>`, post));
  }
  files.set('/blog/404.html', document('Post not found', 'This post could not be found.', '/blog/', '<header class="blog-header"><p class="eyebrow">404</p><h1>Page not found.</h1><p class="intro">This post may have moved, or the link may be incorrect.</p></header>').replace('</head>', '<meta name="robots" content="noindex"></head>'));
  files.set('/blog/feed.xml', `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog</title><link>${origin}/blog/</link><description>${escape(intro)}</description>${posts.map(post => `<item><title>${escape(post.title)}</title><link>${origin}/blog/${post.slug}/</link><guid>${origin}/blog/${post.slug}/</guid>${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}<description>${escape(post.description)}</description></item>`).join('')}</channel></rss>`);
  return { files, posts };
}

export default function blog(): Plugin {
  let root: string;
  let outDir: string;
  return {
    name: 'markdown-blog',
    configResolved(config) { root = config.root; outDir = resolve(root, config.build.outDir); },
    configureServer(server) {
      server.watcher.add(resolve(root, 'content/blog'));
      server.watcher.on('all', (_event, path) => {
        if (path.includes('/content/blog/') || path.endsWith('/Blog.css')) server.ws.send({ type: 'full-reload' });
      });
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
        if (pathname.startsWith('/blog/images/')) return next();
        if (pathname !== '/blog' && !pathname.startsWith('/blog/')) return next();
        try {
          const { files } = blogPages(root);
          const path = files.has(pathname) ? pathname : `${pathname}/`;
          const body = files.get(path);
          res.statusCode = body ? 200 : 404;
          res.setHeader('Content-Type', pathname.endsWith('.css') ? 'text/css; charset=utf-8' : pathname.endsWith('.xml') ? 'application/rss+xml; charset=utf-8' : 'text/html; charset=utf-8');
          const result = body ?? files.get('/blog/404.html')!;
          res.end(result.includes('</body>') ? result.replace('</body>', '<script type="module" src="/@vite/client"></script></body>') : result);
        } catch (error) { next(error); }
      });
    },
    writeBundle() {
      const { files, posts } = blogPages(root);
      for (const [path, content] of files) {
        const target = resolve(outDir, `.${path}${path.endsWith('/') ? 'index.html' : ''}`);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, content);
      }
      const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8').replace('</urlset>', `<url><loc>${origin}/blog/</loc></url>\n${posts.map(post => `<url><loc>${origin}/blog/${post.slug}/</loc></url>`).join('\n')}\n</urlset>`);
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap);
    },
  };
}
