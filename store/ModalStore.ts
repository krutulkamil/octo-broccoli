import { create } from 'zustand';

interface IModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
}

export const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  newTaskInput: '',
  setNewTaskInput: (input) => set({ newTaskInput: input }),
}));
