import { Helmet } from "react-helmet-async";
import { BASE_URL, SITE_NAME } from "@/lib/config";

type JsonLdSchema = Record<string, unknown>;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: JsonLdSchema | JsonLdSchema[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

function absoluteUrl(value?: string): string {
  if (!value) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${BASE_URL}${value}`;
  return `${BASE_URL}/${value.replace(/^\/+/, "")}`;
}

export default function SEO({
  title,
  description,
  path = "/",
  ogImage,
  ogType = "website",
  noindex = false,
  jsonLd,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
}: SEOProps) {
  const fullTitle = title.includes("Zahal") ? title : `${title} | Zahal`;
  const url = `${BASE_URL}${path}`;
  const image = absoluteUrl(ogImage);

  const jsonLdString = jsonLd
    ? JSON.stringify(
        Array.isArray(jsonLd)
          ? { "@context": "https://schema.org", "@graph": jsonLd }
          : jsonLd
      )
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === "article" && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLdString && (
        <script type="application/ld+json">{jsonLdString}</script>
      )}
    </Helmet>
  );
}
