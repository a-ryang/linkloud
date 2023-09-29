import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
  description?: string;
}

export default function SEO({
  title = "링클라우드 | 모두의 링크 라이브러리",
  description = "",
}: Props) {
  return (
    <Helmet>
      {/* HTML meta tag list */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Facebook meta tag list */}
      <meta property="og:url" content="https://linkloud.io" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter meta tag list */}
      <meta property="twitter:domain" content="linkloud.io"></meta>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
