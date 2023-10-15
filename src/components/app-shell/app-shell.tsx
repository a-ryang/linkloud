import { PropsWithChildren } from "react";

import { BottomNav } from "../bottom-nav";
import { Sidebar } from "../sidebar";

import classes from "./app-shell.module.css";

interface Props {
  title: string;
}

export function AppShell({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <div className={classes.app}>
        <h1 className="sr-only">{title}</h1>
        <Sidebar />
        <main className={classes.main}>
          <div>
            <header className={classes.header}>
              <span>{title}</span>
            </header>
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </>
  );
}
