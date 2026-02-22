// @/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function refreshPath(path: string) {
  // Next.js에서 제공하는 공식 함수
  revalidatePath(path);
}