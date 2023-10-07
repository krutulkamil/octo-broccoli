import React from 'react';
import type {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { XCircleIcon } from '@heroicons/react/20/solid';

import type { ITodo, TTypedColumn } from '@/types/todos';
import * as styles from './index.styles';
import { useBoardStore } from '@/store/BoardStore';

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
    </div>
  );
}
