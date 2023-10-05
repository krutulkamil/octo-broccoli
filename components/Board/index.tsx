'use client';

import React, { useEffect } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

import { useBoardStore } from '@/store/BoardStore';
import { Column } from '@/components/Column';
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppable';
import * as styles from './index.styles';

export function Board() {
  const { getBoard, board, setBoardState, updateTodoInDB } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  function handleDragEnd(result: DropResult) {
    const { destination, source, type } = result;

    // if dropped outside the list - return
    if (!destination) return;

    // handle column drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);

      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodoInDB(todoMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.columnsGridStyles}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
