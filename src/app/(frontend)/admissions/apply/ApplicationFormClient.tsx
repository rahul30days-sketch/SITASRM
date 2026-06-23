'use client'

import { useState } from 'react'
import { User, Tag } from 'lucide-react'
import { applicationSchema } from '@/lib/validation/schemas'
import ProgramSelect from '@/components/ui/ProgramSelect'
import ModernSelect from '@/components/ui/ModernSelect'
import DatePicker from '@/components/ui/DatePicker'

interface Program {
  id: string
  name: string
  category: string
}

const STEPS = ['Personal Details', 'Academic Details', 'Program Selection', 'Address', 'Review & Submit'] as const

export function ApplicationFormClient({ programs }: { programs: Program[] }) {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '' as string,
    category: '' as string,
    programApplied: '',
    academicDetails: {
      class10Percent: 0,
      class10Board: '',
      class12Percent: 0,
      class12Board: '',
      graduationPercent: 0,
    },
    address: { street: '', city: '', state: '', pincode: '' },
  })

  const updateField = (path: string, value: string | number) => {
    setFormData((prev) => {
      const copy = { ...prev } as Record<string, unknown>
      const keys = path.split('.')
      let current = copy
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
        current = current[keys[i]] as Record<string, unknown>
      }
      current[keys[keys.length - 1]] = value
      return copy as typeof prev
    })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    const result = applicationSchema.safeParse(formData)
    if (!result.success) {
      setError(Object.values(result.error.flatten().fieldErrors).flat().join(', '))
      setSubmitting(false)
      return
    }
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const data = await res.json()
      if (res.ok && data.applicationNumber) {
        setApplicationNumber(data.applicationNumber)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setSubmitting(false)
    }
  }

  if (applicationNumber) {
    return (
      <div className="rounded-md bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">&#10003;</div>
        <h2 className="font-display text-2xl font-bold text-primary">Application Submitted!</h2>
        <p className="mt-2 text-text-muted">Your application number is:</p>
        <p className="mt-2 text-2xl font-bold text-accent">{applicationNumber}</p>
        <p className="mt-4 text-sm text-text-muted">Please save this number for future reference.</p>
      </div>
    )
  }

  const inputClass = 'w-full rounded-md border border-border px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
  const labelClass = 'mb-1 block text-sm font-medium text-text'

  return (
    <div className="rounded-md bg-white p-6 shadow-card sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${i <= step ? 'bg-primary text-white' : 'bg-gray-200 text-text-muted'}`}>
              {i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`mx-2 h-0.5 w-full ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
      <h2 className="mb-6 font-display text-xl font-semibold">{STEPS[step]}</h2>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Full Name *</label>
            <input className={inputClass} value={formData.applicantName} onChange={(e) => updateField('applicantName', e.target.value)} maxLength={100} />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" className={inputClass} value={formData.email} onChange={(e) => updateField('email', e.target.value)} maxLength={100} />
          </div>
          <div>
            <label className={labelClass}>Phone *</label>
            <input className={inputClass} value={formData.phone} onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} />
          </div>
          <div>
            <label className={labelClass}>Date of Birth *</label>
            <DatePicker
              value={formData.dob}
              onChange={(v) => updateField('dob', v)}
              placeholder="dd-mm-yyyy"
              fromYear={1990}
            />
          </div>
          <div>
            <label className={labelClass}>Gender *</label>
            <ModernSelect
              value={formData.gender}
              onChange={(v) => updateField('gender', v)}
              placeholder="Select gender"
              icon={User}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer-not-to-say', label: 'Prefer not to say' },
              ]}
            />
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <ModernSelect
              value={formData.category}
              onChange={(v) => updateField('category', v)}
              placeholder="Select category"
              icon={Tag}
              options={[
                { value: 'general', label: 'General' },
                { value: 'obc', label: 'OBC' },
                { value: 'sc', label: 'SC' },
                { value: 'st', label: 'ST' },
                { value: 'ews', label: 'EWS' },
              ]}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Class 10th Percentage *</label>
            <input type="number" className={inputClass} min={0} max={100} value={formData.academicDetails.class10Percent || ''} onChange={(e) => updateField('academicDetails.class10Percent', Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Class 10th Board *</label>
            <input className={inputClass} value={formData.academicDetails.class10Board} onChange={(e) => updateField('academicDetails.class10Board', e.target.value)} maxLength={50} />
          </div>
          <div>
            <label className={labelClass}>Class 12th Percentage *</label>
            <input type="number" className={inputClass} min={0} max={100} value={formData.academicDetails.class12Percent || ''} onChange={(e) => updateField('academicDetails.class12Percent', Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Class 12th Board *</label>
            <input className={inputClass} value={formData.academicDetails.class12Board} onChange={(e) => updateField('academicDetails.class12Board', e.target.value)} maxLength={50} />
          </div>
          <div>
            <label className={labelClass}>Graduation Percentage (if applicable)</label>
            <input type="number" className={inputClass} min={0} max={100} value={formData.academicDetails.graduationPercent || ''} onChange={(e) => updateField('academicDetails.graduationPercent', Number(e.target.value))} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className={labelClass}>Select Program *</label>
          <ProgramSelect
            value={programs.find((p) => p.id === formData.programApplied)?.name || ''}
            onChange={(name) => {
              const match = programs.find((p) => p.name === name)
              updateField('programApplied', match?.id || '')
            }}
          />
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Street Address</label>
            <input className={inputClass} value={formData.address.street} onChange={(e) => updateField('address.street', e.target.value)} maxLength={200} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input className={inputClass} value={formData.address.city} onChange={(e) => updateField('address.city', e.target.value)} maxLength={100} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input className={inputClass} value={formData.address.state} onChange={(e) => updateField('address.state', e.target.value)} maxLength={100} />
          </div>
          <div>
            <label className={labelClass}>Pincode</label>
            <input className={inputClass} value={formData.address.pincode} onChange={(e) => updateField('address.pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} maxLength={6} />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 text-sm">
          <h3 className="font-display font-semibold">Personal Details</h3>
          <p>{formData.applicantName} | {formData.email} | {formData.phone}</p>
          <p>DOB: {formData.dob} | Gender: {formData.gender} | Category: {formData.category}</p>
          <h3 className="font-display font-semibold">Academic Details</h3>
          <p>10th: {formData.academicDetails.class10Percent}% ({formData.academicDetails.class10Board})</p>
          <p>12th: {formData.academicDetails.class12Percent}% ({formData.academicDetails.class12Board})</p>
          <h3 className="font-display font-semibold">Program</h3>
          <p>{programs.find((p) => p.id === formData.programApplied)?.name || 'Not selected'}</p>
          <h3 className="font-display font-semibold">Address</h3>
          <p>{[formData.address.street, formData.address.city, formData.address.state, formData.address.pincode].filter(Boolean).join(', ')}</p>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <div className="mt-8 flex justify-between">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="rounded-md border border-border px-6 py-2 text-sm font-medium hover:bg-surface">
            Previous
          </button>
        )}
        <div className="ml-auto">
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-light">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="rounded-md bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
