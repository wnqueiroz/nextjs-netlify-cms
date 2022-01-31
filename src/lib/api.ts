import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const postsDirectory = join(process.cwd(), "posts");

export type Frontmatter = {
  tags?: string[];
  date: string;
  cover?: string;
  title?: string;
  author?: {
    name: string;
    login: string;
  };
};

export type Post = {
  slug: string;
  date: string;
  content: string;
  frontmatter: Frontmatter;
  timeToRead: string;
};

export function getPostBySlug(slug: string): Post | null {
  if (!slug) return null;

  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const date = format(new Date(data.date), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  return {
    slug: realSlug,
    date: data.date.toString(),
    frontmatter: { ...data, date },
    content,
    timeToRead: timeToRead(content),
  };
}

export function getAllPosts(): Post[] | null {
  const slugs = fs.readdirSync(postsDirectory);

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) =>
      new Date(String(a?.date)) > new Date(String(b?.date)) ? -1 : 1
    ) as Post[];

  if (!posts.length) return null;

  return posts;
}

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .process(markdown);

  return result.toString();
}

export function timeToRead(text: string) {
  const words = text.split(" ");
  const minutes = Math.ceil(words.length / 200);

  return `${minutes} min de leitura`;
}
