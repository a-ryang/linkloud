import { Card, Group, Text, Title, Anchor, Flex } from "@mantine/core";

import useAuth from "@/features/auth/hooks/useAuth";

import ArticleMenuDropdown from "./ArticleMenuDropdown";
import ArticleTags from "./ArticleTags";

interface Props {
  article: Article;
  onClick?: (id: number) => void;
}

export default function ArticleCard({ article, onClick }: Props) {
  const { isLoggedIn } = useAuth();

  return (
    <Card
      withBorder
      component="article"
      shadow="sm"
      radius="md"
      className="cursor-pointer active:bg-gray-50"
      onClick={onClick ? () => onClick(article.id) : undefined}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Title order={1} size="h5">
            {article.title}
          </Title>
          {isLoggedIn && (
            <ArticleMenuDropdown
              id={article.id}
              readStatus={article.readStatus}
              isMy={article.author}
            />
          )}
        </Group>
      </Card.Section>
      <div className="mt-2">
        <Anchor size="sm">{article.url}</Anchor>
      </div>
      <Card.Section mt="sm" inheritPadding>
        <p>
          <Text component="span" c="gray.7" mr="xs">
            {article.description}
          </Text>
          <ArticleTags tags={article.tags} />
        </p>
      </Card.Section>
      <Card.Section inheritPadding mt="sm" pb="md">
        <Flex justify="space-between">
          <Flex gap="xs">
            <div>
              <Text component="span" c="gray.7" fw="500">
                {article.views}
              </Text>
              <Text component="span" c="gray.7">
                {" "}
                hits
              </Text>
            </div>
            {/* <div>
              <Text component="span" c="gray.7" fw="500">
                {article.hearts}
              </Text>
              <Text component="span" c="gray.7">
                {" "}
                likes
              </Text>
            </div> */}
          </Flex>
          {/* <div>
            <ActionIcon
              aria-label="좋아요"
              variant="subtle"
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Heart
                size={20}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </ActionIcon>
          </div> */}
        </Flex>
      </Card.Section>
    </Card>
  );
}
