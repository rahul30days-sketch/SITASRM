'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { X, CheckCircle2 } from 'lucide-react'
import ProgramSelect from '@/components/ui/ProgramSelect'

const STORAGE_KEY = 'seri-callback-shown'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function CallbackModal() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [program, setProgram] = React.useState('')
  const [company, setCompany] = React.useState('') // honeypot
  const [status, setStatus] = React.useState<Status>('idle')
  const [errorMsg, setErrorMsg] = React.useState('')

  // Auto-open once per browser session, shortly after load.
  React.useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      /* sessionStorage unavailable */
    }
    if (alreadyShown) return
    const timer = setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        /* ignore */
      }
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (company) return // honeypot tripped
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, program, honeypot: company }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(
          data?.error === 'Validation failed'
            ? 'Please enter a valid name, 10-digit phone, and select a program.'
            : data?.error || 'Something went wrong. Please try again.',
        )
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  const inputClass =
    'w-full rounded-[10px] border-[1.5px] border-[#e5e7eb] px-3.5 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-[#6b7280] focus:border-[#1a3c6e]'

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby="callback-desc"
          // Don't close the modal when interacting with the program dropdown,
          // which renders in its own portal (Radix Select inside Radix Dialog).
          onPointerDownOutside={(e) => {
            const t = e.detail.originalEvent?.target as Element | null
            if (t?.closest('[data-radix-popper-content-wrapper],[data-radix-select-content]')) {
              e.preventDefault()
            }
          }}
          onInteractOutside={(e) => {
            const t = e.detail.originalEvent?.target as Element | null
            if (t?.closest('[data-radix-popper-content-wrapper],[data-radix-select-content]')) {
              e.preventDefault()
            }
          }}
          className="fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-elevated focus:outline-none sm:p-7"
        >
          <Dialog.Close
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f0f4ff] hover:text-[#1a3c6e]"
          >
            <X size={18} />
          </Dialog.Close>

          {status === 'success' ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" aria-hidden="true" />
              <Dialog.Title className="mt-4 font-display text-2xl font-bold text-primary">
                Request Received!
              </Dialog.Title>
              <p className="mt-2 text-sm text-text-muted">
                Thank you, {name || 'there'}. Our admissions team will call you back shortly.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <Dialog.Title className="font-display text-2xl font-bold text-primary">
                Request a Callback
              </Dialog.Title>
              <Dialog.Description id="callback-desc" className="mt-1 text-sm text-text-muted">
                Fill in your details and our admissions team will reach out.
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="cb-name" className="mb-1.5 block text-sm font-medium text-text">
                    Full Name
                  </label>
                  <input
                    id="cb-name"
                    className={inputClass}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cb-phone" className="mb-1.5 block text-sm font-medium text-text">
                    Phone Number
                  </label>
                  <input
                    id="cb-phone"
                    className={inputClass}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cb-email" className="mb-1.5 block text-sm font-medium text-text">
                    Email <span className="font-normal text-text-muted">(optional)</span>
                  </label>
                  <input
                    id="cb-email"
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={254}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Program of Interest</label>
                  <ProgramSelect value={program} onChange={setProgram} placeholder="Select a program" />
                </div>

                {/* Honeypot — hidden from users, catches bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                {status === 'error' && errorMsg && (
                  <p className="text-sm text-accent" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || !name || phone.length !== 10 || !program}
                  className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Request Callback'}
                </button>

                <Link
                  href="/admissions/apply"
                  onClick={() => setOpen(false)}
                  className="block text-center text-sm font-semibold text-primary hover:underline"
                >
                  Or apply directly →
                </Link>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
