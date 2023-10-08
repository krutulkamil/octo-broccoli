import React from 'react';
import Image from 'next/image';
import type {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { XCircleIcon } from '@heroicons/react/20/solid';

import { useBoardStore } from '@/store/BoardStore';
import { useTodoImage } from '@/hooks/useTodoImage';
import type { ITodo, TTypedColumn } from '@/types/todos';
import * as styles from './index.styles';

interface IProps {
  todo: ITodo;
  index: number;
  id: TTypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: IProps) {
  const { deleteTodo } = useBoardStore();
  const { imageUrl } = useTodoImage({ todo });

  function handleDeleteTodo() {
    return deleteTodo(index, todo, id);
  }

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className={styles.wrapperStyles}
    >
      <div className={styles.todoWrapperStyles}>
        <p>{todo.title}</p>
        <button onClick={handleDeleteTodo} className={styles.todoButtonStyles}>
          <XCircleIcon className={styles.todoButtonIconStyles} />
        </button>
      </div>
      {imageUrl && (
        <div className={styles.todoImageWrapperStyles}>
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={400}
            height={200}
            className={styles.todoImageStyles}
          />
        </div>
      )}
    </div>
  );
}
