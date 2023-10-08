import { create } from 'zustand';

import { databases, ID, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { uploadImage } from '@/lib/uploadImage';
import type {
  IBoard,
  TTypedColumn,
  IColumn,
  ITodo,
  IImage,
} from '@/types/todos';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDB: (todo: ITodo, columnId: TTypedColumn) => void;
  deleteTodo: (todoIndex: number, todo: ITodo, columnId: TTypedColumn) => void;
  addTask: (title: string, columnId: TTypedColumn, image?: File | null) => void;
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
  addTask: async (title, columnId, image) => {
    let file: IImage | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTaskInput: '' });
    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: ITodo = {
        $id,
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $collectionId: process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
        $databaseId: process.env.NEXT_PUBLIC_DATABASE_ID!,
        $permissions: [],
        title,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        column.todos.push(newTodo);
      }

      return { board: { columns: newColumns } };
    });
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
