import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Insira um e-mail válido!'
  }),
  password: z.string().min(5, { message: 'Senha deve ter no minimo 5 caracteres!' })
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Insira um e-mail válido!'
  }),
  password: z.string().min(5, { message: 'Senha deve ter no minimo 5 caracteres!' }),
  name: z.string().min(1, { message: 'Nome é obrigatório!' })
});

export const RegisterGuideSchema = z.object({
  email: z.string().email({
    message: 'Insira um e-mail válido!'
  }),
  password: z.string().min(5, { message: 'Senha deve ter no minimo 5 caracteres!' }),
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  cadastur: z.string().min(1, { message: 'Cadastur é obrigatório para o cadastro de guia!' })
});
