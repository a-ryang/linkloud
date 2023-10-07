import { PropsWithChildren } from "react";

import SEO from "../SEO";

import classes from "./AppShell.module.css";
import BottomNav from "./BottomNav";
import SideNav from "./SideNav";

interface Props {
  title: string;
  ogTitle: string;
  ogDescription?: string;
}

export default function AppShell({
  title,
  ogTitle,
  ogDescription,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      <SEO title={ogTitle} description={ogDescription} />
      <div className={classes.wrap}>
        <h1 className="sr-only">{title}</h1>
        <SideNav />
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
