'use server';
import * as z from 'zod';
import { UpdateProfileSchema } from '@/schemas';
import { updateUser } from '@/api/service';

export const updateProfile = async (values: z.infer<typeof UpdateProfileSchema>) => {
  const validatedFields = UpdateProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel atualizar suas informações!' };
  }

  const status = await updateUser(validatedFields.data);

  if (status === false) {
    return { error: 'Algo deu errado.' };
  }
  return { success: 'Sucesso! Seus dados foram atualizados.' };
};
