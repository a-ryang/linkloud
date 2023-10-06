import { Menu } from "@mantine/core";
import { PencilSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface Props {
  articleId: number;
}

export default function Edit({ articleId }: Props) {
  const navigate = useNavigate();

  const handleClickEdit = (id: number) => {
    navigate(`/links/edit/${id}`);
  };

  return (
    <Menu.Item
      leftSection={<PencilSimple />}
      onClick={(e) => {
        e.stopPropagation();
        handleClickEdit(articleId);
      }}
    >
      수정
    </Menu.Item>
  );
}
