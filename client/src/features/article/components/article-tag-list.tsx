import { useRouter } from "next/navigation";

import { Tag } from "@/features/tag/components";

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
        <Tag
          key={tag.id}
          tag={tag}
          href={`/search?tags=${tag.name}`}
          color="default"
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
