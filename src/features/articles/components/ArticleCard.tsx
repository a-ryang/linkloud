import { Card, Group, Text, Title, Anchor, Flex, Box } from "@mantine/core";

import classes from "./ArticleCard.module.css";
import ArticleMenuDropdown from "./ArticleMenuDropdown";
import ArticleTags from "./ArticleTags";
import ReadStatus from "./ReadStatus";

interface Props {
  article: Article;
  onClick?: (id: number) => void;
}

export default function ArticleCard({ article, onClick }: Props) {
  const hasDescriptionOrTags = article.description || article.tags.length > 0;

  return (
    <Card
      withBorder
      component="article"
      shadow="sm"
      radius="md"
      className={classes.card}
      onClick={onClick ? () => onClick(article.id) : undefined}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Flex align="center" gap="xs">
            <ReadStatus status={article.readStatus} />
            <Title order={1} size="h5">
              {article.title}
            </Title>
          </Flex>

          <ArticleMenuDropdown
            id={article.id}
            readStatus={article.readStatus}
            isMy={article.author}
          />
        </Group>
      </Card.Section>

      <Box mt="xs">
        <Anchor size="sm">{article.url}</Anchor>
      </Box>

      {hasDescriptionOrTags && (
        <Card.Section mt="sm" inheritPadding>
          <p>
            {article.description && (
              <Text component="span" c="gray.7" mr="xs">
                {article.description}
              </Text>
            )}
            <ArticleTags tags={article.tags} />
          </p>
        </Card.Section>
      )}

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
