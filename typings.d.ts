interface IBoard {
  columns: Map<TTypedColumn, IColumn>;
}

type TTypedColumn = 'todo' | 'inprogress' | 'done';

interface IColumn {
  id: TTypedColumn;
  todos: ITodo[];
}

interface ITodo {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
  title: string;
  status: TTypedColumn;
  image: IImage | null;
}

interface IImage {
  bucketId: string;
  fileId: string;
}
