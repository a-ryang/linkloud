interface Article {
  id: number;
  title: string;
  url: string;
  description: string;
  views: number;
  hearts: number;
  readStatus: ArticleReadStatus;
  tags: Tag[];
  ogImage: string | null;
  author?: boolean;
}

type ArticleReadStatus = "UNREAD" | "READING" | "READ";
