'use client';

import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useBoardStore } from '@/store/BoardStore';

export function Board() {
  const { getBoard, board } = useBoardStore();

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {Array.from(board.columns.entries()).map(([id, todos], index) => (
              <Column key={id} id={id} todos={todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
