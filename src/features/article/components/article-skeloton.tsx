import { Skeleton } from "@mantine/core";

import classes from "./article-skeloton.module.css";

interface Props {
  count?: number;
}

export function ArticleSkeleton({ count = 5 }: Props) {
  const items = Array.from({ length: count }, (_, i) => (
    <li key={i}>
      <Skeleton height={160} />
    </li>
  ));

  return <ul className={classes.list}>{items}</ul>;
}
