import { get } from "@/libs/api";

interface GetOpenGraphQuery {
  targetUrl: string;
}

export async function getOpenGraph(query: GetOpenGraphQuery): Promise<OG> {
  return get("/v2/opengraph", {
    params: {
      ...query,
    },
  });
}
