'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ProgramSelect from '@/components/ui/ProgramSelect'

/* Loose pass-through types — raw Payload docs. */
interface Program {
  id?: string
  name?: string
  slug?: string
  [key: string]: unknown
}

interface AdmissionCTAProps {
  programs?: Program[]
  className?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: 'AICTE Approved' },
  { icon: GraduationCap, label: 'Scholarship Available' },
  { icon: Briefcase, label: '100% Placement' },
] as const

export default function AdmissionCTA({
  className,
}: AdmissionCTAProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (company) return // honeypot tripped — silently ignore
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, program }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Split background. Mobile: navy top band, gold below.
          Desktop (lg+): diagonal — navy left half, gold right half. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Gold fills everything as the base layer */}
        <div className="h-full w-full bg-gold" />
        {/* Navy overlay: a top band on mobile, a diagonal left wedge on desktop */}
        <div
          className={cn(
            'absolute inset-0 bg-navy',
            '[clip-path:polygon(0_0,100%_0,100%_50%,0_50%)]',
            'lg:[clip-path:polygon(0_0,58%_0,42%_100%,0_100%)]',
          )}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — copy + trust chips */}
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Join SERI?
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/80 lg:mx-0">
              Applications open for the 2025-26 batch. Secure your seat in one of
              India&apos;s leading engineering institutes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2',
                    'glass-dark text-sm font-medium text-white',
                  )}
                >
                  <Icon className="h-4 w-4 text-gold-light" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — floating inquiry card */}
          <div className="relative">
            <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-elevated sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <CheckCircle2
                    className="mb-4 h-14 w-14 text-green-500"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl font-bold text-navy">
                    Thank you!
                  </h3>
                  <p className="mt-2 text-text-muted">
                    We&apos;ll call you back shortly to help with your admission.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle')
                      setName('')
                      setPhone('')
                      setProgram('')
                    }}
                    className="mt-6 text-sm font-semibold text-navy underline-offset-4 hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-navy">
                    Request a Callback
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    Fill in your details and our admissions team will reach out.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Honeypot */}
                    <div
                      className="absolute left-[-9999px]"
                      aria-hidden="true"
                    >
                      <label htmlFor="cta-company">Company</label>
                      <input
                        id="cta-company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cta-name"
                        className="mb-1.5 block text-sm font-medium text-text"
                      >
                        Full Name
                      </label>
                      <input
                        id="cta-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(
                          'w-full rounded-md border border-border px-4 py-2.5',
                          'text-text placeholder:text-text-muted',
                          'outline-none transition-all duration-200',
                          'focus:border-gold focus:ring-2 focus:ring-gold/30',
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cta-phone"
                        className="mb-1.5 block text-sm font-medium text-text"
                      >
                        Phone Number
                      </label>
                      <input
                        id="cta-phone"
                        name="phone"
                        type="tel"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        className={cn(
                          'w-full rounded-md border border-border px-4 py-2.5',
                          'text-text placeholder:text-text-muted',
                          'outline-none transition-all duration-200',
                          'focus:border-gold focus:ring-2 focus:ring-gold/30',
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cta-program"
                        className="mb-1.5 block text-sm font-medium text-text"
                      >
                        Program of Interest
                      </label>
                      <ProgramSelect
                        value={program}
                        onChange={setProgram}
                        placeholder="Select a program"
                      />
                    </div>

                    {status === 'error' && errorMessage ? (
                      <p className="text-sm text-accent" role="alert">
                        {errorMessage}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={cn(
                        'inline-flex w-full items-center justify-center gap-2',
                        'rounded-md bg-accent px-6 py-3 font-semibold text-white',
                        'transition-colors duration-200 hover:bg-accent-dark',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-60',
                      )}
                    >
                      {status === 'submitting'
                        ? 'Submitting…'
                        : 'Request Callback'}
                    </button>
                  </form>

                  <div className="mt-5 text-center">
                    <Link
                      href="/admissions/apply"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-primary-light"
                    >
                      Or apply directly
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
