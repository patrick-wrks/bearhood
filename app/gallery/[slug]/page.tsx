import { getAllGalleries } from "@/lib/galleries";
import { GalleryPageContent } from "@/components/gallery-page-content";

export function generateStaticParams() {
  return getAllGalleries().map((g) => ({ slug: g.slug }));
}

export default async function GallerySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <GalleryPageContent slug={slug} />;
}
