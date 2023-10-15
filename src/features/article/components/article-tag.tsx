import Link from "next/link";

import classes from "./article-tag.module.css";

interface Props extends React.ComponentProps<"a"> {
  tag: Tag;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function ArticleTag({ tag, href, onClick }: Props) {
  return (
    <Link href={href} className={classes.tag} onClick={onClick}>
      #{tag.name}
    </Link>
  );
}
