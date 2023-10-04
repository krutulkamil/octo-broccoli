'use client';

import React from 'react';
import type {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { XCircleIcon } from '@heroicons/react/20/solid';

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
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className={styles.wrapperStyles}
    >
      <div className={styles.todoWrapperStyles}>
        <p>{todo.title}</p>
        <button className={styles.todoButtonStyles}>
          <XCircleIcon className={styles.todoButtonIconStyles} />
        </button>
      </div>
    </div>
  );
}
