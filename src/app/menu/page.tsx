import { Center } from "@mantine/core";

import { AppShell } from "@/components/app-shell";
import { MenuList } from "@/features/menu/components";

export default function Menu() {
  return (
    <AppShell title="메뉴">
      <Center w="100%">
        <MenuList />
      </Center>
    </AppShell>
  );
}
