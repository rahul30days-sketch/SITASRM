import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URI: z.string().min(10),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  REVALIDATION_SECRET: z.string().min(32).optional(),
  RECAPTCHA_SECRET_KEY: z.string().min(10).optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
})

export const env = envSchema.parse(process.env)
