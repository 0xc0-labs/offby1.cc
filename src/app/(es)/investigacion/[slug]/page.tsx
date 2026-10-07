import { notFound } from "next/navigation";
import { Article } from "@/components/Research/Article";
import { articleBySlug, articles } from "@/content/research";
import { es } from "@/content/es";
import { articleMetadata } from "../../../research-metadata";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.es.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug("es", slug);
  return article ? articleMetadata("es", article) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug("es", slug);
  if (!article) notFound();
  return <Article content={es} article={article} />;
}
