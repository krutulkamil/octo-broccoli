'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

import { cn } from '@/utils/cn';
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppable';
import { TodoCard } from '@/components/TodoCard';
import type { ITodo, TTypedColumn } from '@/types/todos';
import * as styles from './index.styles';
import { useBoardStore } from '@/store/BoardStore';

interface IProps {
  id: TTypedColumn;
  todos: ITodo[];
  index: number;
}

const idToColumnTextMap: { [key in TTypedColumn]: string } = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

export function Column({ id, todos, index }: IProps) {
  const { searchString } = useBoardStore();

  function getFilteredTodoCount() {
    if (!searchString) return todos.length;

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchString.toLowerCase())
    ).length;
  }

  const filteredTodos = searchString
    ? todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchString.toLowerCase())
      )
    : todos;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(index)} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  styles.columnStyles,
                  snapshot.isDraggingOver
                    ? styles.isDraggingStyles
                    : styles.isNotDraggingStyles
                )}
              >
                <h2 className={styles.columnTitleStyles}>
                  {idToColumnTextMap[id]}
                  <span className={styles.columnTitleLengthStyles}>
                    {getFilteredTodoCount()}
                  </span>
                </h2>

                <div className={styles.columnContentWrapperStyles}>
                  {filteredTodos.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  <div className={styles.addTodoWrapperStyles}>
                    <button className={styles.addTodoButtonStyles}>
                      <PlusCircleIcon
                        className={styles.addTodoButtonIconStyles}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
