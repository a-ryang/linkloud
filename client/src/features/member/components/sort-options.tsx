"use client";

import { Box, Chip, Group } from "@mantine/core";
import { useState } from "react";

import { ArticleReadStatus } from "@/features/article/components/article-read-status";

import { SortBy } from "../api/getMyArticles";

interface SortOption {
  value: SortBy;
  label: React.ReactNode;
}

const sortOptions: SortOption[] = [
  {
    value: "latest",
    label: "등록순",
  },
  {
    value: "unread",
    label: "읽지 않음",
  },
  {
    value: "reading",
    label: (
      <>
        <Box component="span" mr="xs">
          읽는중
        </Box>
        <ArticleReadStatus status="READING" />
      </>
    ),
  },

  {
    value: "read",
    label: (
      <>
        <Box component="span" mr="xs">
          읽음
        </Box>
        <ArticleReadStatus status="READ" />
      </>
    ),
  },
];

interface SortOptionsProps {
  onChange: (value: SortBy) => void;
}

export function SortOptions({ onChange }: SortOptionsProps) {
  const [currentOption, setCurrentOptions] = useState(sortOptions[0].value);

  const handleChange = (value: SortBy) => {
    setCurrentOptions(value);
    onChange(value);
  };

  return (
    <Chip.Group
      multiple={false}
      value={currentOption}
      onChange={(value) => handleChange(value as SortBy)}
    >
      <Group py="md" px="md" className="container">
        {sortOptions.map((option) => (
          <Chip key={option.value} value={option.value} size="md" variant="outline">
            {option.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
}
