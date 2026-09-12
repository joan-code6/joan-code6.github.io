import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readPosts, blogPages } from './blog.ts';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-blog-'));
  mkdirSync(join(root, 'content/blog'), { recursive: true });
  mkdirSync(join(root, 'src/pages'), { recursive: true });
  writeFileSync(join(root, 'src/pages/Blog.css'), 'body {}');
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return (name, extra = '', body = 'A **bold** opinion.') => {
    writeFileSync(join(root, 'content/blog', name + '.md'), `---\ntitle: 'A title & more'\ndescription: 'A short description'\ndate: "2026-09-12"\n${extra}\n---\n${body}`);
    return root;
  };
}

test('plain Markdown files automatically become posts, pages, and feed entries', t => {
  const root = fixture(t)('placeholder');
  rmSync(join(root, 'content/blog/placeholder.md'));
  writeFileSync(join(root, 'content/blog/my-opinion.md'), '# My **opinion**\n\nAn opening paragraph.\n\n## Details\n\nMore text.');
  const { files, posts } = blogPages(root);
  assert.equal(posts[0].title, 'My opinion');
  assert.equal(posts[0].description, 'An opening paragraph.');
  assert.equal(posts[0].date, '');
  assert.match(files.get('/blog/'), /My opinion/);
  assert.match(files.get('/blog/feed.xml'), /my-opinion/);
  const page = files.get('/blog/my-opinion/');
  assert.equal((page.match(/<h1>/g) ?? []).length, 1);
  assert.match(page, /<h2>Details/);
  assert.ok(!page.includes('<footer>'));
  assert.ok(!page.includes('Bennet'));
  assert.ok(!page.includes('<time'));
  assert.ok(!page.includes('Draft'));
  writeFileSync(join(root, 'content/blog/another-thought.md'), 'Just a paragraph.');
  assert.equal(readPosts(root)[0].title, 'another thought');
});

test('renders Markdown safely into standalone HTML, with language and metadata', t => {
  const root = fixture(t)('opinion', 'lang: de', '## Heading\n\n**Bold** and [unsafe](javascript:alert(1)).¹\n\n[^1]: A source.\n\n<script>alert(1)</script>\n\n| A | B |\n| - | - |\n| 1 | 2 |');
  const page = blogPages(root).files.get('/blog/opinion/');
  assert.match(page, /<html lang="de">/);
  assert.match(page, /<strong>Bold<\/strong>/);
  assert.match(page, /<table>/);
  assert.match(page, /A title &amp; more/);
  assert.ok(!page.includes('<script'));
  assert.ok(!page.includes('href="javascript:'));
  assert.match(page, /footnote/);
  assert.match(page, /https:\/\/joancode.dev\/blog\/opinion\//);
});

test('rejects malformed optional dates', t => {
  const add = fixture(t);
  const root = add('bad');
  writeFileSync(join(root, 'content/blog/bad.md'), '---\ntitle: Bad date\ndescription: Invalid date\ndate: "2026-02-30"\n---\nText.');
  assert.throws(() => readPosts(root), /date must be/);
});

test('orders posts newest first, with a stable filename tiebreaker', t => {
  const add = fixture(t);
  const root = add('z-last');
  add('a-first');
  writeFileSync(join(root, 'content/blog/older.md'), '---\ntitle: Older\ndescription: Earlier post\ndate: "2025-01-01"\n---\nEarlier.');
  assert.deepEqual(readPosts(root).map(p => p.slug), ['a-first', 'z-last', 'older']);
});
