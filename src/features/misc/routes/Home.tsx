import { Button, Title, Text, useMantineTheme } from "@mantine/core";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import GithubIcon from "@/components/Icons/GithubIcon";
import BottomNav from "@/components/Layout/BottomNav";
import SEO from "@/components/SEO";
import ArticleCards from "@/features/articles/components/ArticleCards";
import useAuth from "@/features/auth/hooks/useAuth";
import ROUTES_PATH from "@/routes/routesPath";

import classes from "./Home.module.css";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <SEO
        title="링클라우드 | 모두의 링크 라이브러리"
        description={`현재까지 n개의 링크가 모였어요`}
      />
      <div className={classes.wrap}>
        <div className={clsx("container flex-1", classes["wrap-inner"])}>
          <Hero isLoggedIn={isLoggedIn} />
          <section className={classes["article-section"]}>
            <h1 className="sr-only">링크 목록</h1>
            <ArticleCards />
          </section>
        </div>
        <Footer />
      </div>
      <BottomNav />
    </>
  );
}

const Hero = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const RenderButton = isLoggedIn ? (
    <Button
      component="a"
      href={ROUTES_PATH.CREATE_ARTICLE}
      size="lg"
      onClick={(e) => {
        e.preventDefault();
        navigate(ROUTES_PATH.CREATE_ARTICLE);
      }}
    >
      등록하기
    </Button>
  ) : (
    <Button
      component="a"
      href={ROUTES_PATH.LOGIN}
      size="lg"
      onClick={(e) => {
        e.preventDefault();
        navigate(ROUTES_PATH.LOGIN);
      }}
    >
      시작하기
    </Button>
  );

  return (
    <div className={classes.hero}>
      <Title order={1} ta="center">
        유용한{" "}
        <span style={{ color: theme.colors.linkloudBlue["5"] }}>링크</span>를
        공유하고 관리하세요
      </Title>
      <Text my="md">현재까지 999개의 링크가 모였어요</Text>
      <div>{RenderButton}</div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer-inner"]}>
        <div className={classes.copyright}>
          Copyright linkloud. All rights reserved
        </div>
        <div className={classes.github}>
          <a
            target="_blank"
            href="https://github.com/linkloud/linkloud.io"
            rel="noopener noreferrer"
          >
            <GithubIcon size={24} color="gray" />
          </a>
        </div>
      </div>
    </footer>
  );
};
