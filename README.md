# Portfolio
New portfolio : )

Technology used
- react
- Vite
- shadcn (pretty sure)

click the Wikipedia link I got my own entry 🙃

mh idk what to else put here
oh wait

What I learned 
- haiku is bad at design
- design skill helps make better designs
## Blog

Add a `.md` file to `content/blog/`. That's it — it appears in the blog automatically on the next build.

For example, `content/blog/something-on-my-mind.md`:

```md
# Something on my mind

Your piece starts here. Write in **Markdown**.

## A section, if you need one

More thoughts.
```

The first `#` heading becomes the title (or the filename if there isn't one), and the first paragraph supplies the list excerpt. Use lowercase, hyphen-separated filenames; the example becomes `/blog/something-on-my-mind/`. Every Markdown file is published; there are no drafts or publish flags.

Optional YAML frontmatter can override `title`, `description`, `date` (quoted `YYYY-MM-DD`), or `lang` (`en` by default, `de` for German). None is required. Dated posts appear newest first, then undated posts alphabetically by filename. No date is invented for undated posts.

To show a publication date on the blog list and article, start the file like this. The date stays fixed when you edit the post later:

```md
---
date: "2026-09-12"
---

# Your title

Your piece goes here.
```

Run `npm run dev -- --host 0.0.0.0` and open `http://<your-tailscale-ip>:5173/blog/` from your other machine. Markdown edits refresh the preview automatically. Push to `main` to publish through the existing GitHub Pages workflow.

Put images in `public/blog/images/` and use `![A description](/blog/images/photo.jpg)`. Headings, emphasis, links, lists, quotes, images, code blocks, and tables work; raw HTML is disabled.

Production builds generate standalone HTML/CSS with no browser JavaScript or external fonts, plus RSS at `/blog/feed.xml` and sitemap entries. `npm run build` builds the site; `npm test` checks the Markdown pipeline.
