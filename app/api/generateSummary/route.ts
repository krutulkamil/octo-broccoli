import { NextResponse } from 'next/server';

import { openai } from '@/lib/openai';
import type { ICompletionMessage } from '@/types/completions';

export async function POST(req: Request) {
  try {
    const { todos } = await req.json();

    if (!openai) {
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    }

    if (!todos) {
      return new NextResponse('Todos are required', { status: 400 });
    }

    const messages: ICompletionMessage[] = [
      {
        role: 'system',
        content:
          'You are a todos summarizer. When responding, welcome the user as GPT Todo Summarizer Assistant. Limit the response to 200 characters.',
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as "To Do", "In Progress" and "Done". Remember that todos can be in "To Do" category so don't mix those words. Then tell the user to have a productive day! Here's the data ${JSON.stringify(
          todos
        )}`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
