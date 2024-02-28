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
