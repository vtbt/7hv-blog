import Image from 'next/image';

export default async function About() {
  return (
    <div className="prose">
      <h2>About myself</h2>
      <Image src="/images/photo.jpg" alt="my-photo" width={400} height={400} />
      <p>
        Hi everyone! I&apos;m Thu, a software engineer with a passion for
        coding.
        <br />
        I&apos;m excited to share my experiences, learn from others, and connect
        with like-minded individuals.
      </p>
    </div>
  );
}
