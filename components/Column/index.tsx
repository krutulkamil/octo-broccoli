'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { cn } from '@/utils/cn';
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppable';
import type { ITodo, TTypedColumn } from '@/types/todos';
import * as styles from './index.styles';

interface IProps {
  id: TTypedColumn;
  todos: ITodo[];
  index: number;
}

export function Column({ id, todos, index }: IProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  styles.cardStyles,
                  snapshot.isDraggingOver
                    ? styles.isDraggingStyles
                    : styles.isNotDraggingStyles
                )}
              >
                <h2>{id}</h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
