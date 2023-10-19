import { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { Center } from "@/components/layouts";
import { EditArticleForm } from "@/features/article/components";

export const metadata: Metadata = {
  title: "링클라우드 |링크 수정하기",
};

export default function EditArticle() {
  return (
    <AppShell title="링크 수정하기">
      <Center>
        <EditArticleForm />
      </Center>
    </AppShell>
  );
}
