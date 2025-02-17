import { createDirectus, rest, } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
  hero_image: string;
}

type Banners = {
  title: string;
  image: string;
  key: string
  url: string;
}

type BlockContents = {
  title: string;
  description: Author;
  icon: string;
  image: string;
  key: string
  url: string;
}

type Author = {
  name: string
}

type Page = {
  title: string;
  content: string;
  slug: string;
}

type Post = {
  image: string;
  title: string;
  author: Author;
  content: string;
  published_date: string
  slug: string;
}

type Schema = {
  posts: Post[];
  global: Global;
  pages: Page[];
  banners: Banners[];
  block_contents: BlockContents[];
}

// const directus = createDirectus<Schema>('http://localhost:8055').with(rest());
const directus = createDirectus<Schema>(import.meta.env.YOUR_DIRECTUS_URL).with(rest());

export default directus;