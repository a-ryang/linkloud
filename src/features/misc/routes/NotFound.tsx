import { Button, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import SEO from "@/components/SEO";
import ROUTES_PATH from "@/routes/routesPath";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="404" />
      <Center mih="100vh">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-5xl">404</div>
          <h1 className="my-4">존재하지 않는 페이지입니다</h1>
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
