import { z } from 'zod'
import { valiateTelegramLink } from './validators'

export const validationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100)
    .regex(/^[А-Яа-яa-zA-Z0-9\s\-_]+$/, 'Invalid characters in title'),

  description: z.string().trim().max(500).min(1, 'Title is required'),
  inviteLink: z
    .string()
    .trim()
    .max(100)
    .min(1)
    .refine(valiateTelegramLink, { message: 'Неверный формат ссылки. Пример: https://t.me/+AbCdEfGhIjKlMnOp' }),
  imageUrl: z.string().trim().max(500).min(1),
  coordinates: z
    .tuple([
      z
        .number()
        .gte(-180)
        .lte(180)
        .refine((val) => val.toFixed(6)), // 6 знаков после запятой
      z
        .number()
        .gte(-90)
        .lte(90)
        .refine((val) => val.toFixed(6)),
    ])
    .transform(([lon, lat]) => [Number(lon.toFixed(6)), Number(lat.toFixed(6))]),
})
