import { databases } from '@/appwrite';
import { columnTypesArr } from '@/types/todos';
import type { TTypedColumn, IColumn, IBoard } from '@/types/todos';

export async function getTodosGroupedByColumn() {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)?.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TTypedColumn, IColumn>());

  for (const columnType of columnTypesArr) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // SORT COLUMNS TO BE ALWAYS IN ORDER (todo, inprogress, done)
  const sortedColumns = new Map<TTypedColumn, IColumn>(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypesArr.indexOf(a[0]) - columnTypesArr.indexOf(b[0])
    )
  );

  const board: IBoard = {
    columns: sortedColumns,
  };

  return board;
}
