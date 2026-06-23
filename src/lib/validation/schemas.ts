import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(100).toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone must be 10 digits')
    .optional()
    .or(z.literal('')),
  subject: z.string().min(5).max(200).trim(),
  message: z.string().min(20).max(2000).trim(),
  honeypot: z.string().max(0).optional(),
  recaptchaToken: z.string().optional(),
})

export const inquirySchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(100).toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone must be 10 digits')
    .optional()
    .or(z.literal('')),
  programInterest: z.string().min(1).max(100),
  recaptchaToken: z.string().optional(),
})

export const brochureRequestSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(100).toLowerCase().trim(),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone must be 10 digits')
    .optional()
    .or(z.literal('')),
  program: z.string().min(1),
})

export const applicationSchema = z.object({
  applicantName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(100).toLowerCase().trim(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  dob: z.string().refine(
    (val) => {
      const date = new Date(val)
      const now = new Date()
      const age = now.getFullYear() - date.getFullYear()
      return age >= 15 && age <= 30
    },
    { message: 'Applicant must be between 15 and 30 years old' },
  ),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  category: z.enum(['general', 'obc', 'sc', 'st', 'ews']),
  programApplied: z.string().min(1),
  academicDetails: z.object({
    class10Percent: z.number().min(0).max(100),
    class10Board: z.string().max(50).trim(),
    class12Percent: z.number().min(0).max(100),
    class12Board: z.string().max(50).trim(),
    graduationPercent: z.number().min(0).max(100).optional(),
  }),
  address: z.object({
    street: z.string().max(200).trim(),
    city: z.string().max(100).trim(),
    state: z.string().max(100).trim(),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  }),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type InquiryFormData = z.infer<typeof inquirySchema>
export type BrochureRequestData = z.infer<typeof brochureRequestSchema>
export type ApplicationFormData = z.infer<typeof applicationSchema>
