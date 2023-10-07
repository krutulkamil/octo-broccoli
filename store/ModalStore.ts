import { create } from 'zustand';

import type { TTypedColumn } from '@/types/todos';

interface IModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TTypedColumn;
  setNewTaskType: (columnId: TTypedColumn) => void;
  image: File | null;
  setImage: (file: File | null) => void;
}

export const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  newTaskInput: '',
  setNewTaskInput: (input) => set({ newTaskInput: input }),
  newTaskType: 'todo',
  setNewTaskType: (columnId) => set({ newTaskType: columnId }),
  image: null,
  setImage: (file) => set({ image: file }),
}));
