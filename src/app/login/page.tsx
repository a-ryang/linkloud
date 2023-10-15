import { Container, Title, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import ROUTER from "@/constants/router";
import { GoogleButton } from "@/features/auth/components";

import classes from "./style.module.css";

// import NotFound from "@/features/misc/routes/NotFound";

export default async function Login() {
  // const { isLoggedIn } = useAuth();

  // if (isLoggedIn) return <NotFound />;

  return (
    <div className={classes.wrap}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <h1 className={classes.logo}>
              <Link href={ROUTER.HOME}>
                <Image src="/images/logo.svg" height={36} width={220} alt="linkloud" />
                <span className="sr-only">링클라우드</span>
              </Link>
            </h1>

            <Title order={2} className={classes.title}>
              유용한{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "blue", to: "linkloudBlue" }}
              >
                링크
              </Text>
              를 공유하고 관리하세요
            </Title>

            <div className={classes["social-login"]}>
              <GoogleButton />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
