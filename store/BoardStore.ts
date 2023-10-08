import { create } from 'zustand';

import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import type { IBoard, TTypedColumn, IColumn, ITodo } from '@/types/todos';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDB: (todo: ITodo, columnId: TTypedColumn) => void;
  deleteTodo: (todoIndex: number, todo: ITodo, columnId: TTypedColumn) => void;
  searchString: string;
  setSearchString: (searchTerm: string) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TTypedColumn;
  setNewTaskType: (columnId: TTypedColumn) => void;
  image: File | null;
  setImage: (file: File | null) => void;
}

export const useBoardStore = create<IBoardState>((set, get) => ({
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
  deleteTodo: async (todoIndex, todo, columnId) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(columnId)?.todos.splice(todoIndex, 1);

    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  newTaskInput: '',
  setNewTaskInput: (input) => set({ newTaskInput: input }),
  newTaskType: 'todo',
  setNewTaskType: (columnId) => set({ newTaskType: columnId }),
  image: null,
  setImage: (file) => set({ image: file }),
}));
