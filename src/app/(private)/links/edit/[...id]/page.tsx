export const runtime = "edge";

import { AppShell } from "@/components/app-shell";
import { Center } from "@/components/layouts";
import { EditArticleForm } from "@/features/article/components";

export default function EditArticle({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id);

  return (
    <AppShell title="링크 수정하기">
      <Center>
        <EditArticleForm id={articleId} />
      </Center>
    </AppShell>
  );
}
