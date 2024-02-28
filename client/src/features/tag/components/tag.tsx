import clsx from "clsx";
import Link from "next/link";

import classes from "./tag.module.css";

interface Props extends React.ComponentProps<"a"> {
  tag: Tag;
  href: string;
  color?: "default" | "gray";
  onClick?: (e: React.MouseEvent) => void;
}

export function Tag({ tag, href, color = "default", onClick }: Props) {
  return (
    <Link href={href} className={clsx(classes.tag, classes[color])} onClick={onClick}>
      #{tag.name}
    </Link>
  );
}
