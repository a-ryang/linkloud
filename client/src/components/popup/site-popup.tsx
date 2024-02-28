"use client";
import { ActionIcon, Anchor, Button, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import { Portal } from "../portal";

import classes from "./site-popup.module.css";

type LstClosedDate = string | null;

export function SitePopup() {
  const [lastClosed, setLastClosed] = useLocalStorage<LstClosedDate>({
    key: "lipopup",
    defaultValue: null,
  });
  const [isVisible, setIsVisible] = useState(true);

  const today = new Date().toDateString();
  const shouldShowPopup = lastClosed !== today;

  const handleHideToday = () => {
    setLastClosed(today);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!shouldShowPopup || !isVisible) return null;

  return (
    <Portal>
      <div className={classes["popup-wrap"]}>
        <div role="dialog" className={classes.popup}>
          <div className={classes.close}>
            <ActionIcon
              aria-label="닫기"
              variant="subtle"
              color="dark"
              size="lg"
              onClick={handleClose}
            >
              <X size={20} />
            </ActionIcon>
          </div>

          <div>
            <Image src="/images/avatar.png" width={56} height={56} alt="avatar" />
          </div>

          <Title order={3}>안녕하세요 👋</Title>
          <p>
            사용중 발견한 버그, 개선사항은
            <Anchor
              target="_blank"
              href="https://github.com/linkloud/linkloud.io"
              rel="noopener noreferrer"
            >
              {" "}
              GitHub 이슈
            </Anchor>
            로 알려주세요
          </p>
          <Button variant="subtle" color="gray" onClick={handleHideToday}>
            오늘 하루 보지 않기
          </Button>
        </div>
      </div>
    </Portal>
  );
}
