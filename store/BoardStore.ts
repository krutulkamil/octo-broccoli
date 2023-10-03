import { create } from 'zustand';

import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
}

export const useBoardStore = create<IBoardState>((set) => ({
  board: {
    columns: new Map<TTypedColumn, IColumn>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
}));
