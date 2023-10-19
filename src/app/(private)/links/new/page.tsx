import { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { Center } from "@/components/layouts";
import { CreateArticleForm } from "@/features/article/components";

export const metadata: Metadata = {
  title: "링클라우드 | 새 링크 등록하기",
};

export default async function CreateArticle() {
  return (
    <AppShell title="새 링크 등록하기">
      <Center>
        <CreateArticleForm />
      </Center>
    </AppShell>
  );
}
