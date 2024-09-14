'use server';
import { createReview } from '@/api/service';
import { CommentSchema } from '@/schemas';
import * as z from 'zod';

export const createGuideReview = async (values: z.infer<typeof CommentSchema>, guideId: number) => {
  const validatedFields = CommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel concluir sua review' };
  }

  const status = await createReview(validatedFields.data, guideId);

  if (status === false) {
    return { error: 'Ocorreu um erro ao realizar seu review.' };
  }
  return { success: 'Sucesso! Você pode fechar esse pop-up agora.' };
};
