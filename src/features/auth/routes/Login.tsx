import {
  Card,
  Center,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

import NotFound from "@/features/misc/routes/NotFound";
import ROUTES_PATH from "@/routes/routesPath";

import GoogleButton from "../components/GoogleButton";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const theme = useMantineTheme();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <NotFound />;

  return (
    <Center mih="100vh" style={{ background: theme.colors.gray["1"] }}>
      <Card component="section" padding="lg" radius="lg" withBorder shadow="sm">
        <h1>
          <Link to={ROUTES_PATH.HOME}>
            <Image src="/logo.svg" h={36} w="auto" />
            <span className="sr-only">링클라우드</span>
          </Link>
        </h1>

        <Text c="dimmed" my="xl" style={{ textAlign: "center" }}>
          간편하게 시작하세요
        </Text>

        <Stack>
          <div>
            <GoogleButton />
          </div>
        </Stack>
      </Card>
    </Center>
  );
}
