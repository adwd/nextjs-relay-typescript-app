import Link from "next/link";

const Index = () => (
  <div>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
  </div>
);

export default Index;
