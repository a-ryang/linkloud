export const runtime = "edge";

import { Center } from "@mantine/core";

import { AppShell } from "@/components/app-shell";
import { EditArticleForm } from "@/features/article/components";

export default function EditArticle({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id);

  return (
    <AppShell title="링크 수정하기">
      <Center mih="100vh">
        <EditArticleForm id={articleId} />
      </Center>
    </AppShell>
  );
}
