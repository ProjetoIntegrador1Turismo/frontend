'use server';
import * as z from 'zod';
import { EditItineraryFormSchema, NewItineraryFormSchema } from '@/schemas';
import { ItineraryUpdate } from '@/api/service';

export const updateItinerary = async (
  values: z.infer<typeof EditItineraryFormSchema>,
  id: number
) => {
  const validatedFields = NewItineraryFormSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: 'Campos invalidos!' };
  // }

  const status = await ItineraryUpdate(values, id);
  if (!status.ok) {
    return { error: 'Erro ao editar roteiro!' };
  }

  return { success: 'Seu roteiro foi editado com sucesso!', id: status.id };
};
