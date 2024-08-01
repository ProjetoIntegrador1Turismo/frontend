'use server';
import * as z from 'zod';
import { InterestPointFormSchema } from '@/schemas';
import { interestPointCreate } from '@/api/service';
import { error } from 'console';

export const createInterestPoint = async (values: z.infer<typeof InterestPointFormSchema>) => {
  const validatedFields = InterestPointFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: `${validatedFields.error}` };
  }

  const status = await interestPointCreate(validatedFields.data);

  

  return { success: `${JSON.stringify(status)}` };
};
