'use server';
import { selectTop3Home } from '@/api/service';
import { SelectTop3FormSchema } from '@/schemas';
import * as z from 'zod';

export const selectTop3 = async (values: z.infer<typeof SelectTop3FormSchema>) => {
  const validatedFields = SelectTop3FormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel concluir sua requisição' };
  }

  const status = await selectTop3Home(validatedFields.data);

  if (status === false) {
    return { error: 'Ocorreu um erro ao atualizar o top 3' };
  }
  return { success: 'Sucesso! O top 3 foi atualizado!' };
};
