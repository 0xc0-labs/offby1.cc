import { notFound } from "next/navigation";
import { Article } from "@/components/Research/Article";
import { articleBySlug, articles } from "@/content/research";
import { en } from "@/content/en";
import { articleMetadata } from "../../../research-metadata";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.en.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug("en", slug);
  return article ? articleMetadata("en", article) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug("en", slug);
  if (!article) notFound();
  return <Article content={en} article={article} />;
}
