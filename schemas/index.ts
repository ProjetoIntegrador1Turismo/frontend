import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Insira um e-mail válido!'
  }),
  password: z.string().min(1, { message: 'Senha inválida' })
});
