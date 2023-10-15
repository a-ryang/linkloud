import { useRouter } from "next/navigation";

import { ArticleTag } from "./article-tag";
import classes from "./article-tag-list.module.css";

interface Props {
  tags: Tag[];
}

export function ArticleTagList({ tags }: Props) {
  const router = useRouter();

  if (tags.length === 0) return null;

  return (
    <span className={classes["tag-list"]}>
      {tags.map((tag) => (
        <ArticleTag
          key={tag.id}
          tag={tag}
          href={`/search?tags=${tag.name}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/search?tags=${tag.name}`);
          }}
        />
      ))}
    </span>
  );
}
