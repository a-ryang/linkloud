"use client";

import { PropsWithChildren } from "react";

import classes from "./center.module.css";

export function Center({ children }: PropsWithChildren) {
  return <div className={classes.center}>{children}</div>;
}
