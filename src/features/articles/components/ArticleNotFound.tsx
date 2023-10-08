import { Box, Text } from "@mantine/core";
import { CloudSlash } from "@phosphor-icons/react";

export default function ArticleNotFound() {
  return (
    <Box ta="center">
      <CloudSlash size={30} weight="bold" color="gray" />
      <Text>등록된 링크가 없어요</Text>
    </Box>
  );
}
