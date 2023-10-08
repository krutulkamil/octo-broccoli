import { useState, useEffect } from 'react';

import { getImageUrl } from '@/lib/getImageUrl';
import type { ITodo } from '@/types/todos';

interface IProps {
  todo: ITodo;
}

export const useTodoImage = ({ todo }: IProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const image = todo.image;

      const fetchImage = async () => {
        const imageUrl = await getImageUrl(image);
        setImageUrl(imageUrl.href);
      };

      fetchImage();
    }
  }, [todo]);

  return {
    imageUrl,
  };
};
