import { Button, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import ROUTES_PATH from "@/routes/routesPath";

export default function ServerError() {
  const navigate = useNavigate();

  return (
    <Center mih="100vh">
      <div className="flex flex-col justify-center items-center">
        <div className="font-bold text-5xl">500</div>
        <h1 className="my-4 text-center">
          에러가 발생했어요 <br />
          잠시후에 다시 시도해주세요
        </h1>
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
  );
}
