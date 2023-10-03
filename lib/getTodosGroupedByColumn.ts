import { databases } from '@/appwrite';

export async function getTodosGroupedByColumn() {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  console.log(data);
}
