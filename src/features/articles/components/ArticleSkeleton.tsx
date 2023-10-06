import { Skeleton } from "@mantine/core";

import classes from "./ArticleSkeleton.module.css";

interface Props {
  count?: number;
}

export default function ArticleSkeleton({ count = 5 }: Props) {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push(
      <li key={i}>
        <Skeleton height={160} />
      </li>,
    );
  }

  return <ul className={classes.list}>{items}</ul>;
}
