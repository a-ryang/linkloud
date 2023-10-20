"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

import ROUTER from "@/constants/router";

import { Logo } from "../icons";

export function LogoLink() {
  const router = useRouter();
  return (
    <li>
      <Button
        aria-label="링클라우드"
        variant="transparent"
        size="lg"
        component="a"
        fullWidth
        href={ROUTER.HOME}
        onClick={(e) => {
          e.preventDefault();
          router.push(ROUTER.HOME);
        }}
      >
        <Logo size={50} /> <span className="sr-only">linkloud</span>
      </Button>
    </li>
  );
}
