'use client';

import React, { useEffect } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

import { useBoardStore } from '@/store/BoardStore';
import { Column } from '@/components/Column';
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppable';
import * as styles from './index.styles';

export function Board() {
  const { getBoard, board } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, []);

  function handleDragEnd(result: DropResult) {}

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
