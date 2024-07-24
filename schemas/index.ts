import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido!' }),
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

export const UpdateProfileSchema = z.object({
  avatar: z
    .any()
    .refine((files) => files?.[0]?.size <= 1 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    ),
  name: z.string().min(4, { message: 'Nome é obrigatório!' }),
  email: z.string().email(),
  password: z.string().min(5, { message: 'Senha deve ter no minimo 5 caracteres!' })
});
