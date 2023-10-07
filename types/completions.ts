export const completionMessageRoleArr = [
  'user',
  'assistant',
  'system',
] as const;
export type TCompletionMessageRole = (typeof completionMessageRoleArr)[number];

export interface ICompletionMessage {
  role: TCompletionMessageRole;
  content: string;
}

export interface ICompletionContent {
  content: string;
}
