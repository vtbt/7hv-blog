import fs from 'fs';
import path from 'path';

import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';

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
      <h1>{props.frontMatter.title}</h1>
      <h5>{props.frontMatter.description}</h5>
      <h5>{props.frontMatter.date}</h5>

      <MDXRemote source={props.content} />
    </MdxLayout>
  );
}
