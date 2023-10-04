import { create } from 'zustand';

import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import type { IBoard, TTypedColumn, IColumn } from '@/types/todos';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
}

export const useBoardStore = create<IBoardState>((set) => ({
  board: {
    columns: new Map<TTypedColumn, IColumn>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
}));
