import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props {
  tags: Tag[];
}

export default function ArticleTags({ tags }: Props) {
  const navigate = useNavigate();
  if (tags.length === 0) return null;

  return (
    <span className="inline-flex gap-1">
      {tags.map((tag) => (
        <Anchor
          key={tag.id}
          href={`/search?tag=${tag.name}`}
          c="gray.7"
          fw="500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/search?tag=${tag.name}`);
          }}
        >
          #{tag.name}
        </Anchor>
      ))}
    </span>
  );
}
