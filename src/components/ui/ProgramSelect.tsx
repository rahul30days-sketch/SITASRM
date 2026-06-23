'use client'

/**
 * ProgramSelect — a grouped program picker. Thin wrapper over <ModernSelect>
 * with the SERI program list hardcoded and a GraduationCap icon.
 *
 * @example
 * <ProgramSelect value={val} onChange={setVal} error={errors.program} />
 */

import { GraduationCap } from 'lucide-react'
import ModernSelect, { type SelectOptionGroup } from './ModernSelect'

interface ProgramSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
}

const toGroup = (label: string, names: string[]): SelectOptionGroup => ({
  label,
  options: names.map((n) => ({ value: n, label: n })),
})

const PROGRAM_GROUPS: SelectOptionGroup[] = [
  toGroup('Undergraduate', [
    'B.Tech Computer Science & Engineering',
    'B.Tech Mechanical Engineering',
    'B.Tech Civil Engineering',
    'B.Tech Electronics & Communication',
    'B.Tech Electrical Engineering',
  ]),
  toGroup('Postgraduate', ['M.Tech Computer Science', 'MBA (Technology Management)']),
  toGroup('Diploma', ['Diploma in Mechanical Engineering']),
]

export default function ProgramSelect({
  value,
  onChange,
  placeholder = 'Select your program',
  error,
  disabled,
}: ProgramSelectProps) {
  return (
    <ModernSelect
      value={value}
      onChange={onChange}
      groups={PROGRAM_GROUPS}
      icon={GraduationCap}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
    />
  )
}
