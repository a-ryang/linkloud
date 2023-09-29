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

export default function CreateArticle() {
  const [step, setStep] = useState(1);
  const [link, setLink] = useState("");
  const form = useForm({
    initialValues: {
      link: "",
      title: "",
      description: "",
      tags: [],
    },
  });

  const handleClickNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <SEO title="새로운 링크 등록하기" />
      <Center mih="100vh">
        <div className="min-h-screen w-full max-w-xs">
          <div className="my-6">
            <Title ml="md">새 링크 등록</Title>
          </div>
          <form className="flex flex-col gap-4">
            {step === 1 && (
              <>
                <TextInput
                  autoComplete="off"
                  label="링크"
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
                  className="flex-1"
                  onChange={(e) => setLink(e.currentTarget.value)}
                />
                <Button
                  aria-label="다음"
                  type="button"
                  fullWidth
                  mt="sm"
                  onClick={handleClickNext}
                >
                  다음
                </Button>
              </>
            )}
            {step === 2 && (
              <>
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
                    onClick={handleClickPrev}
                  >
                    이전
                  </Button>
                  <Button
                    aria-label="등록"
                    type="submit"
                    mt="sm"
                    fullWidth
                    onClick={handleClickNext}
                  >
                    등록
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </Center>
      <BottomNav />
    </>
  );
}
