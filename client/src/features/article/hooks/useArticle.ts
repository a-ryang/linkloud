import { useQuery } from "@tanstack/react-query";

import { getArticle } from "../api/getArticle";

export default function useArticle(id: number) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
  });
}
