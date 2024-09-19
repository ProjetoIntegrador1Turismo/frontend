'use server';
import { passwordRecovery } from '@/api/service';
import { RecoverySchema } from '@/schemas';
import * as z from 'zod';

export const recoverPassword = async (values: z.infer<typeof RecoverySchema>) => {
  const validatedFields = RecoverySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos invalidos!' };
  }

  const status = await passwordRecovery(validatedFields.data.email);

  if (status) {
    return { success: 'Um e-mail de recuperação de senha foi enviado para sua caixa de entrada!' };
  }
  return { error: 'Esse e-mail não está cadastrado no sistema!' };
};
