import { useForm, zodResolver } from "@mantine/form";

import { createArticleSchema } from "@/libs/validation/article";

export interface UseArticleForm {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

export default function useArticleForm(initialValues: UseArticleForm) {
  const form = useForm<UseArticleForm>({
    initialValues,
    validate: zodResolver(createArticleSchema),
  });

  return form;
}
