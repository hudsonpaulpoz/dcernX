import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://dcernx.com";

interface SeoProps {
  title: string;
  description: string;
  path: string; // route path, e.g. "/ai-analysis"
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

/** Build an absolute URL for canonical / og:url. */
const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Per-route SEO head. Sitewide fallbacks live in index.html;
 * this component overrides them per page for JS-executing crawlers.
 */
export const Seo = ({ title, description, path, ogType = "website", jsonLd, noindex }: SeoProps) => {
  const url = abs(path);
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
};
