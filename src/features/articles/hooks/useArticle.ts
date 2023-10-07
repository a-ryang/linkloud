import { getArticle } from "../api/getArticle";

export default function useArticle() {
  return async (id: number) => {
    const { url } = await getArticle(id);
    if (url) {
      window.open(url, "_blank", "noreferrer");
    }
  };
}
