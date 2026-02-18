import { Helmet } from "react-helmet-async";
import { BASE_URL, SITE_NAME } from "@/lib/config";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object;
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.svg`;

export default function SEO({ title, description, path = "/", ogImage, noindex = false, jsonLd }: SEOProps) {
  const fullTitle = title.includes("Zahal") ? title : `${title} | Zahal`;
  const url = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
