import { create } from 'zustand';

import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import type { IBoard, TTypedColumn, IColumn, ITodo } from '@/types/todos';
import { databases } from '@/appwrite';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDB: (todo: ITodo, columnId: TTypedColumn) => void;
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

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: columnId }
    );
  },
}));
