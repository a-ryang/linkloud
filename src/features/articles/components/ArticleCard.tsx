import {
  ActionIcon,
  Card,
  Group,
  Menu,
  Text,
  Title,
  Anchor,
  Flex,
} from "@mantine/core";
import {
  Book,
  BookBookmark,
  BookOpen,
  DotsThree,
  Heart,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";

interface Props {}

export default function ArticleCard({}: Props) {
  return (
    <Card
      withBorder
      component="article"
      shadow="sm"
      radius="md"
      className="cursor-pointer active:bg-gray-50"
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Title order={1} size="h5">
            제목
          </Title>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon aria-label="더보기" variant="subtle" color="gray">
                <DotsThree size={24} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<BookOpen />}>읽는 중</Menu.Item>
              <Menu.Item leftSection={<BookBookmark />}>읽음</Menu.Item>
              <Menu.Item leftSection={<Book />}>읽기 해제</Menu.Item>
              <Menu.Item leftSection={<PencilSimple />}>수정</Menu.Item>
              <Menu.Item leftSection={<Trash />} color="red">
                삭제
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <div className="mt-2">
        <Anchor size="sm">https://example.com</Anchor>
      </div>
      <Card.Section mt="sm" inheritPadding>
        <p>
          <Text component="span" c="gray.7" mr="xs">
            내용
          </Text>
          <span className="inline-flex gap-1">
            <Text component="span" c="gray.7" fw="500">
              #태그
            </Text>
            <Text component="span" c="gray.7" fw="500">
              #태그
            </Text>
            <Text component="span" c="gray.7" fw="500">
              #태그
            </Text>
          </span>
        </p>
      </Card.Section>
      <Card.Section inheritPadding mt="sm" pb="md">
        <Flex justify="space-between">
          <Flex gap="xs">
            <div>
              <Text component="span" c="gray.7" fw="500">
                111
              </Text>
              <Text component="span" c="gray.7">
                {" "}
                hits
              </Text>
            </div>
            <div>
              <Text component="span" c="gray.7" fw="500">
                111
              </Text>
              <Text component="span" c="gray.7">
                {" "}
                likes
              </Text>
            </div>
          </Flex>
          <div>
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
          </div>
        </Flex>
      </Card.Section>
    </Card>
  );
}
