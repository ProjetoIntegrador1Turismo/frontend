'use server';
import * as z from 'zod';
import { NewItineraryFormSchema } from '@/schemas';
import { ItineraryCreate } from '@/api/service';

export const createItinerary = async (values: z.infer<typeof NewItineraryFormSchema>) => {
  const validatedFields = NewItineraryFormSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: 'Campos invalidos!' };
  // }

  const status = await ItineraryCreate(values);

  if (!status.ok) {
    return { error: 'Erro ao criar roteiro!' };
  }

  return { success: 'Seu roteiro foi criado com sucesso!', id: status.id };
};
