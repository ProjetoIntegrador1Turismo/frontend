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
  name: z
    .string()
    .min(1, { message: 'Nome é obrigatório!' })
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/, 'Nome completo é obrigatório!')
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
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    )
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .optional(),
  name: z.string().min(4, { message: 'Nome é obrigatório!' }),
  email: z.string().email(),
  password: z.string().min(5, { message: 'Senha deve ter no minimo 5 caracteres!' }).optional()
});

export const EventSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  averageValue: z
    .string()
    .transform((value) => {
      return value as unknown as number;
    })
    .refine((value) => value >= 1 && value <= 3, {
      message: 'Uso: 1 = Barato, 2 = Médio, 3 = Caro'
    }),
  duration: z
    .string()
    .regex(/^(\d+)h(\d+)min$/)
    .transform((value) => {
      const [hours, minutes] =
        value
          .match(/^(\d+)h(\d+)min$/)
          ?.slice(1)
          .map(Number) || [];
      return { hours, minutes };
    })
    .refine(
      ({ hours, minutes }) => {
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
      },
      {
        message:
          'Formato de hora inválido. Use XhYmin, onde X são horas (0-23) e Y são minutos (0-59)'
      }
    )
    .transform((obj) => {
      return `${obj.hours}h${obj.minutes}`;
    }),
  shortDescription: z.string().max(590, { message: 'Descrição curta é limitada a 500 caracteres' }),
  type: z.literal('EVENT'),
  road: z.string().max(50, { message: 'O endereço é limitado a 50 caracteres.' }),
  number: z.string().max(5),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .transform((value) => value.replace('-', '')),
  longDescription: z
    .string()
    .max(2500, { message: 'Descrição longa é limitada a 2500 caracteres' }),
  date: z.date()
});

export const ExperienceSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  averageValue: z
    .string()
    .transform((value) => {
      return value as unknown as number;
    })
    .refine((value) => value >= 1 && value <= 3, {
      message: 'Uso: 1 = Barato, 2 = Médio, 3 = Caro'
    }),
  duration: z
    .string()
    .regex(/^(\d+)h(\d+)min$/)
    .transform((value) => {
      const [hours, minutes] =
        value
          .match(/^(\d+)h(\d+)min$/)
          ?.slice(1)
          .map(Number) || [];
      return { hours, minutes };
    })
    .refine(
      ({ hours, minutes }) => {
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
      },
      {
        message:
          'Formato de hora inválido. Use XhYmin, onde X são horas (0-23) e Y são minutos (0-59)'
      }
    )
    .transform((obj) => {
      return `${obj.hours}h${obj.minutes}`;
    }),
  shortDescription: z.string().max(590, { message: 'Descrição curta é limitada a 500 caracteres' }),
  type: z.literal('EXPERIENCE'),
  road: z.string().max(50, { message: 'O endereço é limitado a 50 caracteres.' }),
  number: z.string().max(5),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .transform((value) => value.replace('-', '')),
  longDescription: z
    .string()
    .max(2500, { message: 'Descrição longa é limitada a 2500 caracteres' }),
  category: z.string().min(1, { message: 'Categoria é obrigatoria!' }),
  requiredTime: z.string(),
  requiredAge: z.number()
});

export const HotelSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  averageValue: z
    .string()
    .transform((value) => {
      return value as unknown as number;
    })
    .refine((value) => value >= 1 && value <= 3, {
      message: 'Uso: 1 = Barato, 2 = Médio, 3 = Caro'
    }),
  duration: z
    .string()
    .regex(/^(\d+)h(\d+)min$/)
    .transform((value) => {
      const [hours, minutes] =
        value
          .match(/^(\d+)h(\d+)min$/)
          ?.slice(1)
          .map(Number) || [];
      return { hours, minutes };
    })
    .refine(
      ({ hours, minutes }) => {
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
      },
      {
        message:
          'Formato de hora inválido. Use XhYmin, onde X são horas (0-23) e Y são minutos (0-59)'
      }
    )
    .transform((obj) => {
      return `${obj.hours}h${obj.minutes}`;
    }),
  shortDescription: z.string().max(590, { message: 'Descrição curta é limitada a 500 caracteres' }),
  type: z.literal('HOTEL'),
  road: z.string().max(50, { message: 'O endereço é limitado a 50 caracteres.' }),
  number: z.string().max(5),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .transform((value) => value.replace('-', '')),
  starsNumber: z
    .number()
    .min(1)
    .max(5)
    .refine((value) => value >= 1 && value <= 5, {
      message: 'Numero de estrelas pode ser apenas de 1 a 5.'
    }),
  isResort: z.boolean().default(false),
  breakfastIncluded: z.boolean().default(false)
});

export const RestaurantSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  averageValue: z
    .string()
    .transform((value) => {
      return value as unknown as number;
    })
    .refine((value) => value >= 1 && value <= 3, {
      message: 'Uso: 1 = Barato, 2 = Médio, 3 = Caro'
    }),
  duration: z
    .string()
    .regex(/^(\d+)h(\d+)min$/)
    .transform((value) => {
      const [hours, minutes] =
        value
          .match(/^(\d+)h(\d+)min$/)
          ?.slice(1)
          .map(Number) || [];
      return { hours, minutes };
    })
    .refine(
      ({ hours, minutes }) => {
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
      },
      {
        message:
          'Formato de hora inválido. Use XhYmin, onde X são horas (0-23) e Y são minutos (0-59)'
      }
    )
    .transform((obj) => {
      return `${obj.hours}h${obj.minutes}`;
    }),
  shortDescription: z.string().max(590, { message: 'Descrição curta é limitada a 500 caracteres' }),
  type: z.literal('RESTAURANT'),
  road: z.string().max(50, { message: 'O endereço é limitado a 50 caracteres.' }),
  number: z.string().max(5),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .transform((value) => value.replace('-', '')),
  foodType: z.string().max(40, { message: 'Tipo de comida é limitado a 40 caracteres.' })
});

export const TouristPointSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  averageValue: z
    .string()
    .transform((value) => {
      return value as unknown as number;
    })
    .refine((value) => value >= 1 && value <= 3, {
      message: 'Uso: 1 = Barato, 2 = Médio, 3 = Caro'
    }),
  duration: z
    .string()
    .regex(/^(\d+)h(\d+)min$/)
    .transform((value) => {
      const [hours, minutes] =
        value
          .match(/^(\d+)h(\d+)min$/)
          ?.slice(1)
          .map(Number) || [];
      return { hours, minutes };
    })
    .refine(
      ({ hours, minutes }) => {
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
      },
      {
        message:
          'Formato de hora inválido. Use XhYmin, onde X são horas (0-23) e Y são minutos (0-59)'
      }
    )
    .transform((obj) => {
      return `${obj.hours}h${obj.minutes}`;
    }),
  shortDescription: z.string().max(590, { message: 'Descrição curta é limitada a 500 caracteres' }),
  type: z.literal('TOURISTPOINT'),
  road: z.string().max(50, { message: 'O endereço é limitado a 50 caracteres.' }),
  number: z.string().max(5),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .transform((value) => value.replace('-', '')),
  longDescription: z.string().max(2500, { message: 'Descrição longa é limitada a 2500 caracteres' })
});

export const InterestPointFormSchema = z.discriminatedUnion('type', [
  EventSchema,
  ExperienceSchema,
  HotelSchema,
  RestaurantSchema,
  TouristPointSchema
]);
