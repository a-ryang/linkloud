import { AppShell } from "@/components/app-shell";
import { Center } from "@/components/layouts";
import { MenuList } from "@/features/menu/components";

export default function Menu() {
  return (
    <AppShell title="메뉴">
      <Center>
        <MenuList />
      </Center>
    </AppShell>
  );
}
