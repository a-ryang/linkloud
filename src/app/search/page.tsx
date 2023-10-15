import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { SearchContainer } from "@/features/article/components";

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const formatTags = (tags: string | string[] | undefined) => {
    if (typeof tags === "string") {
      return `[${tags}]`;
    }

    if (Array.isArray(tags)) {
      return tags.map((tag) => `[${tag}]`).join(" ");
    }
  };

  const tags = formatTags(searchParams.tags);

  return (
    <AppShell title="검색">
      <SearchContainer initialTags={tags} />
      <Footer />
    </AppShell>
  );
}
