import { formatTodosForAI } from '@/lib/formatTodosForAI';
import type { IBoard, TFlatTodosCounted } from '@/types/todos';

export async function fetchSuggestion(board: IBoard) {
  const todos = formatTodosForAI(board);

  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...todos } satisfies TFlatTodosCounted),
  });

  // TODO: content type
  const { content } = await response.json();
  return content;
}
