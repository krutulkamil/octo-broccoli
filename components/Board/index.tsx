'use client';

import React, { useEffect } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

import { useBoardStore } from '@/store/BoardStore';
import { Column } from '@/components/Column';
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppable';
import * as styles from './index.styles';

export function Board() {
  const { getBoard, board, setBoardState } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, []);

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
