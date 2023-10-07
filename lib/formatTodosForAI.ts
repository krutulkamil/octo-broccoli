import {
  columnTypesArr,
  type IBoard,
  type TTypedColumn,
  type TFlatTodos,
  type TFlatTodosCounted,
} from '@/types/todos';

export function formatTodosForAI(board: IBoard) {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce(
    (acc: TFlatTodos, [columnId, column]) => {
      acc[columnId] = column.todos;
      return acc;
    },
    {
      todo: [],
      inprogress: [],
      done: [],
    }
  );

  const isColumnId = (columnId: string): columnId is TTypedColumn => {
    return !!columnTypesArr.find((col) => col === columnId);
  };

  return Object.entries(flatArray).reduce(
    (acc: TFlatTodosCounted, [columnId, todos]) => {
      if (!isColumnId(columnId)) return acc;

      acc[columnId] = todos.length;
      return acc;
    },
    {
      todo: 0,
      inprogress: 0,
      done: 0,
    }
  );
}
