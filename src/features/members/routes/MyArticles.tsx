import { Chip } from "@mantine/core";

import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";
import ArticleCard from "@/features/articles/components/ArticleCard";

export default function MyArticles() {
  return (
    <>
      <SEO title="내 링크" description="내 링크들을 모아볼 수 있어요" />
      <div>
        <h1 className="sr-only">내 링크</h1>
        <ul className="flex gap-2 py-8 px-4 overflow-x-scroll no-scrollbar">
          <li>
            <Chip defaultChecked size="md" variant="outline">
              읽는 중
            </Chip>
          </li>
          <li>
            <Chip size="md" variant="outline">
              읽지 않음
            </Chip>
          </li>
          <li>
            <Chip size="md" variant="outline">
              읽음
            </Chip>
          </li>
          <li>
            <Chip size="md" variant="outline">
              이름순
            </Chip>
          </li>
        </ul>
      </div>
      <section className="flex flex-col px-4">
        <h1 className="sr-only">링크 목록</h1>
        <ul className="flex flex-col gap-4 w-full">
          <li>
            <ArticleCard />
          </li>
          <li>
            <ArticleCard />
          </li>
          <li>
            <ArticleCard />
          </li>
          <li>
            <ArticleCard />
          </li>
        </ul>
      </section>
      <BottomNav />
    </>
  );
}
