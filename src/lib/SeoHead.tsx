import { Helmet } from 'react-helmet';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
}

export const SeoHead = ({
  title,
  description,
  keywords,
  noIndex = false,
  ogImage = '/logo_main.png',
  ogType = 'website',
  canonicalUrl,
}: SeoHeadProps) => {
  const siteName = 'Form Builder';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Search Engine */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/logo_main.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo_main.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo_main.png" />
      <link rel="shortcut icon" href="/logo_main.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}; 