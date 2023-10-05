import { useBoardStore } from '@/store/BoardStore';
import type { ITodo } from '@/types/todos';

interface IProps {
  todos: ITodo[];
}

export const useFilteredTodos = ({ todos }: IProps) => {
  const { searchString } = useBoardStore();

  function getFilteredTodoCount() {
    if (!searchString) return todos.length;

    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchString.toLowerCase())
    ).length;
  }

  const filteredTodos = searchString
    ? todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchString.toLowerCase())
      )
    : todos;

  return {
    getFilteredTodoCount,
    filteredTodos,
  };
};
