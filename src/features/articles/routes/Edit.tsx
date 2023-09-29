import {
  Button,
  Center,
  CloseButton,
  TagsInput,
  TextInput,
  Title,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";

export default function EditArticle() {
  const [link, setLink] = useState("");
  const form = useForm({
    initialValues: {
      link: "",
      title: "",
      description: "",
      tags: [],
    },
  });

  return (
    <>
      <SEO title="링크 수정하기" />
      <Center mih="100vh">
        <div className="min-h-screen w-full max-w-xs">
          <div className="my-6">
            <Title ml="md">링크 수정</Title>
          </div>
          <form className="flex flex-col gap-4">
            <Image src="https://picsum.photos/200/300" h={48} w="auto" />
            <TextInput
              label="링크"
              disabled
              value={link}
              placeholder="등록하려는 링크를 입력해주세요"
              size="md"
              radius="md"
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  aria-label="링크 입력 지우기"
                  onClick={() => setLink("")}
                  style={{ display: link.length > 0 ? undefined : "none" }}
                />
              }
              onChange={(e) => setLink(e.currentTarget.value)}
            />
            <TextInput
              label="제목"
              placeholder="제목을 입력해주세요"
              size="md"
              radius="md"
              withAsterisk
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  aria-label="제목 입력 지우기"
                  onClick={() => setLink("")}
                  style={{ display: link.length > 0 ? undefined : "none" }}
                />
              }
              {...form.getInputProps("title")}
            />
            <TextInput
              label="설명"
              placeholder="설명을 입력해주세요"
              size="md"
              radius="md"
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  aria-label="설명 입력 지우기"
                  onClick={() => setLink("")}
                  style={{ display: link.length > 0 ? undefined : "none" }}
                />
              }
              {...form.getInputProps("description")}
            />
            <TagsInput
              label="엔터를 눌러 태그를 등록해보세요"
              description="최대 5개까지 등록할 수 있어요"
              placeholder="태그를 등록해보세요"
              maxTags={5}
              size="md"
              radius="md"
            />
            <div className="flex gap-4">
              <Button
                aria-label="이전"
                type="button"
                mt="sm"
                fullWidth
                variant="light"
                onClick={() => {}}
              >
                취소
              </Button>
              <Button
                aria-label="등록"
                type="submit"
                mt="sm"
                fullWidth
                onClick={() => {}}
              >
                수정
              </Button>
            </div>
          </form>
        </div>
      </Center>
      <BottomNav />
    </>
  );
}
