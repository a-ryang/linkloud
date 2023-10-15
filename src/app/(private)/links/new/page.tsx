import { Center } from "@mantine/core";

import { AppShell } from "@/components/app-shell";
import { CreateArticleForm } from "@/features/article/components";

export default async function CreateArticle() {
  return (
    <AppShell title="새로운 링크 등록하기">
      <Center mih="100vh">
        <CreateArticleForm />
      </Center>
    </AppShell>
  );
}
