import { Button, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import SEO from "@/components/SEO";
import ROUTES_PATH from "@/routes/routesPath";

import classes from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="404" />
      <Center mih="100vh">
        <div className={classes.wrap}>
          <div className={classes["error-code"]}>404</div>
          <h1 className={classes.message}>존재하지 않는 페이지입니다</h1>
          <div>
            <Button
              component="a"
              href={ROUTES_PATH.HOME}
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES_PATH.HOME);
              }}
            >
              홈으로
            </Button>
          </div>
        </div>
      </Center>
      ;
    </>
  );
}
