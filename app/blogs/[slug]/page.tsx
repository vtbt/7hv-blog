import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { YouTubeEmbed } from '@next/third-parties/google';
import { MDXRemote } from 'next-mdx-remote/rsc';

import MdxLayout from '../layout';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('blogs'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}
function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join('blogs', slug + '.mdx'),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}
export default function Post({ params }: any) {
  const props = getPost(params);

  return (
    <MdxLayout>
      <h1 className="text-2xl">{props.frontMatter.title}</h1>
      <p>{props.frontMatter.date}</p>

      {/* @ts-expect-error Server Component */}
      <MDXRemote
        source={props.content}
        components={{
          YouTubeEmbed,
        }}
      />
    </MdxLayout>
  );
}
