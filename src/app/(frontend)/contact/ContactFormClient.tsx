'use client'

import { useState } from 'react'
import { contactSchema } from '@/lib/validation/schemas'

export function ContactFormClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setFieldErrors({})

    const result = contactSchema.safeParse(form)
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as Record<string, string[]>)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else if (data.fieldErrors) {
        setFieldErrors(data.fieldErrors)
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">&#10003;</div>
        <p className="font-semibold text-primary">Message sent successfully!</p>
        <p className="mt-1 text-sm text-text-muted">We will get back to you soon.</p>
      </div>
    )
  }

  const inputClass = 'w-full rounded-md border border-border px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="hidden"><input tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} /></div>
      <div>
        <label className="mb-1 block text-sm font-medium">Name *</label>
        <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
        {fieldErrors.name && <p className="mt-1 text-xs text-accent">{fieldErrors.name[0]}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Email *</label>
          <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={100} required />
          {fieldErrors.email && <p className="mt-1 text-xs text-accent">{fieldErrors.email[0]}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} maxLength={10} />
          {fieldErrors.phone && <p className="mt-1 text-xs text-accent">{fieldErrors.phone[0]}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Subject *</label>
        <input className={inputClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={200} required />
        {fieldErrors.subject && <p className="mt-1 text-xs text-accent">{fieldErrors.subject[0]}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Message *</label>
        <textarea className={inputClass} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} required />
        {fieldErrors.message && <p className="mt-1 text-xs text-accent">{fieldErrors.message[0]}</p>}
      </div>
      {error && <p className="text-sm text-accent">{error}</p>}
      <button type="submit" disabled={submitting} className="w-full rounded-md bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-50">
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
