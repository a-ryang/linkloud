import { Container, Title, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import NotFound from "@/features/misc/routes/NotFound";
import ROUTES_PATH from "@/routes/routesPath";

import GoogleButton from "../components/GoogleButton";
import useAuth from "../hooks/useAuth";

import classes from "./Login.module.css";

export default function Login() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <NotFound />;

  return (
    <div className={classes.wrap}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <h1 className={classes.logo}>
              <Link to={ROUTES_PATH.HOME}>
                <Image src="/logo.svg" h={36} w="auto" />
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
