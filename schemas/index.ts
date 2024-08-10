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

export const CategoriesParams = z.union([
  z.literal('event'),
  z.literal('experience'),
  z.literal('touristpoint'),
  z.literal('hotel'),
  z.literal('restaurant')
]);

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

const InterestPointSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório!' }),
  averageValue: z
    .string()
    .transform((value) => value as unknown as number)
    .refine((value) => value >= 1 && value <= 3, {
      message: 'Uso: 1 = Barato, 2 = Médio, 3 = Caro'
    }),
  shortDescription: z.string().max(590, { message: 'Descrição curta é limitada a 500 caracteres' }),
  road: z.string().max(50, { message: 'O endereço é limitado a 50 caracteres.' }),
  number: z.string().max(5),
  zipcode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/)
    .transform((value) => value.replace('-', ''))
});

export const EventSchema = InterestPointSchema.extend({
  type: z.literal('EVENT'),
  duration: z.string(),
  longDescription: z
    .string()
    .max(2500, { message: 'Descrição longa é limitada a 2500 caracteres' }),
  date: z.date()
});

export const ExperienceSchema = InterestPointSchema.extend({
  type: z.literal('EXPERIENCE'),
  duration: z.string(),
  longDescription: z
    .string()
    .max(2500, { message: 'Descrição longa é limitada a 2500 caracteres' }),
  requiredAge: z.string().transform((value) => value as unknown as number)
});

export const HotelSchema = InterestPointSchema.extend({
  type: z.literal('HOTEL'),
  starsNumber: z.string().transform((value) => value as unknown as number),
  isResort: z.boolean().default(false),
  breakfastIncluded: z.boolean().default(false)
});

export const RestaurantSchema = InterestPointSchema.extend({
  type: z.literal('RESTAURANT'),
  foodType: z.string().max(40, { message: 'Tipo de comida é limitado a 40 caracteres.' })
});

export const TouristPointSchema = InterestPointSchema.extend({
  type: z.literal('TOURIST_POINT'),
  duration: z.string(),
  longDescription: z.string().max(2500, { message: 'Descrição longa é limitada a 2500 caracteres' })
});

export const InterestPointFormSchema = z.discriminatedUnion('type', [
  EventSchema,
  ExperienceSchema,
  HotelSchema,
  RestaurantSchema,
  TouristPointSchema
]);

export const EventEditSchema = EventSchema.extend({
  images: z.array(z.any()).min(1, 'É preciso no minimo 5 imagens.').optional(),
  imgCover: z
    .any()
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    )
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .optional()
});

export const ExperienceEditSchema = ExperienceSchema.extend({
  images: z.array(z.any()).min(1, 'É preciso no minimo 5 imagens.').optional(),
  imgCover: z
    .any()
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    )
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .optional()
});

export const HotelEditSchema = HotelSchema.extend({
  images: z.array(z.any()).min(1, 'É preciso no minimo 5 imagens.').optional(),
  imgCover: z
    .any()
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    )
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .optional()
});

export const RestaurantEditSchema = RestaurantSchema.extend({
  images: z.array(z.any()).min(1, 'É preciso no minimo 5 imagens').optional(),
  imgCover: z
    .any()
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    )
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .optional()
});

export const TouristPointEditSchema = TouristPointSchema.extend({
  images: z.array(z.any()).min(1, 'É preciso no minimo 5 imagens').optional(),
  imgCover: z
    .any()
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png'].includes(files?.[0]?.type),
      'Apenas imagens .jpg, .jpeg, .png são aceitas.'
    )
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, 'O arquivo pode ter no máximo 3mb!')
    .optional()
});

export const InterestPointEditFormSchema = z.discriminatedUnion('type', [
  EventEditSchema,
  ExperienceEditSchema,
  HotelEditSchema,
  RestaurantEditSchema,
  TouristPointEditSchema
]);
