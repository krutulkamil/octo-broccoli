import { ID, storage } from '@/appwrite';

export async function uploadImage(file: File) {
  if (!file) return;

  const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;
  if (!bucketId) return;

  return await storage.createFile(bucketId, ID.unique(), file);
}
