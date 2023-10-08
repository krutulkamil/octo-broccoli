import { storage } from '@/appwrite';
import type { IImage } from '@/types/todos';

export async function getImageUrl(image: IImage) {
  return storage.getFilePreview(image.bucketId, image.fileId);
}
