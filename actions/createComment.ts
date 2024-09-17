'use server';
import { createInterestPointComment } from '@/api/service';
import { CommentSchema } from '@/schemas';
import * as z from 'zod';

export const createComment = async (values: z.infer<typeof CommentSchema>, tourId: number) => {
  const validatedFields = CommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel concluir seu comentário' };
  }

  const status = await createInterestPointComment(validatedFields.data, tourId);

  if (status === false) {
    return { error: 'Ocorreu um erro ao realizar seu comentário' };
  }
  return { success: 'Sucesso! Você pode fechar esse pop-up agora.' };
};
