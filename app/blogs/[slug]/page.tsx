import { MDXRemote } from 'next-mdx-remote/rsc';

export default function Home() {
  return (
    <MDXRemote
      source={`# Hello World

      This is from Server Components!
      `}
    />
  );
}
