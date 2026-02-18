import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

const BASE_URL = "https://zahal-productos-naturales.replit.app";
const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.svg`;

export default function SEO({ title, description, path = "/", ogImage }: SEOProps) {
  const fullTitle = title.includes("Zahal") ? title : `${title} | Zahal`;
  const url = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Zahal Productos Naturales" />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
