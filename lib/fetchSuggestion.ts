import { formatTodosForAI } from '@/lib/formatTodosForAI';
import type { IBoard } from '@/types/todos';
import type { ICompletionContent } from '@/types/completions';

export async function fetchSuggestion(board: IBoard) {
  const todos = formatTodosForAI(board);

  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });

  const { content }: ICompletionContent = await response.json();
  return content;
}
