/**
 * @example interface ApiResponse {
 *   items: Type[];
 *   pageInfo: PageInfo
 * }
 */
interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * @example interface ApiResponse extends CursorPageInfo
 * */
interface CursorPageInfo {
  currentPage: number;
  size: number;
  itemsSize: number;
  nextItemId: number;
  lastPage: boolean;
}

interface Member {
  id: number;
  nickname: string;
  picture: string;
  role: MemberRole;
}

type MemberRole = "USER" | "NEW_MEMBER" | "MEMBER" | "ADMIN";

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

type ArticleReadStatus = "unread" | "reading" | "read";

interface Tag {
  id: number;
  name: string;
  count?: number;
}

interface OG {
  title: string;
  url: string;
  ogImage: string;
  description: string;
}
