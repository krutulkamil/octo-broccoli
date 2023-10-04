export interface IBoard {
  columns: Map<TTypedColumn, IColumn>;
}

export const columnTypesArr = ['todo', 'inprogress', 'done'] as const;
export type TTypedColumn = (typeof columnTypesArr)[number];

export interface IColumn {
  id: TTypedColumn;
  todos: ITodo[];
}

export interface ITodo {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
  title: string;
  status: TTypedColumn;
  image?: IImage | null;
}

export interface IImage {
  bucketId: string;
  fileId: string;
}
