'use client'

/**
 * DatePicker — a modern calendar date picker (Radix Popover + custom calendar),
 * styled to match ModernSelect. Value/onChange use a `yyyy-mm-dd` string.
 *
 * @example
 * <DatePicker value={dob} onChange={setDob} placeholder="dd-mm-yyyy" error={errors.dob} />
 */

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
  /** Earliest selectable year (default: current year - 80). */
  fromYear?: number
  /** Latest selectable year (default: current year). */
  toYear?: number
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3))

function pad(n: number) {
  return String(n).padStart(2, '0')
}
function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function parseISO(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '')
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return Number.isNaN(d.getTime()) ? null : d
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export default function DatePicker({
  value,
  onChange,
  placeholder = 'dd-mm-yyyy',
  error,
  disabled,
  fromYear,
  toYear,
}: DatePickerProps) {
  const today = new Date()
  const maxYear = toYear ?? today.getFullYear()
  const minYear = fromYear ?? maxYear - 80

  const selected = parseISO(value)
  const [open, setOpen] = React.useState(false)
  const [view, setView] = React.useState<'days' | 'years'>('days')
  const [viewDate, setViewDate] = React.useState<Date>(
    selected ?? new Date(maxYear - 18, 0, 1),
  )

  // Keep the visible month in sync when the value changes externally / on open.
  React.useEffect(() => {
    if (open) setViewDate(selected ?? new Date(maxYear - 18, 0, 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  // 42 cells (6 weeks) starting from the Sunday on/before the 1st.
  const gridStart = new Date(year, month, 1 - new Date(year, month, 1).getDay())
  const days = Array.from({ length: 42 }, (_, i) =>
    new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i),
  )

  const shiftMonth = (delta: number) => setViewDate(new Date(year, month + delta, 1))

  const pickDay = (d: Date) => {
    onChange(toISO(d))
    setOpen(false)
  }

  // Year view: 12-year page containing the current year.
  const yearPageStart = Math.floor(year / 12) * 12
  const yearPage = Array.from({ length: 12 }, (_, i) => yearPageStart + i)

  const navBtn =
    'flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] transition-colors hover:bg-[#f0f4ff] hover:text-[#1a3c6e]'

  return (
    <div className="w-full">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            type="button"
            aria-invalid={error ? true : undefined}
            className={cn(
              'group flex h-[52px] w-full items-center gap-2.5 rounded-[10px] bg-white px-3.5 text-left text-sm outline-none',
              'border-[1.5px] transition-colors',
              'disabled:cursor-not-allowed disabled:opacity-60',
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#e5e7eb] focus:border-[#1a3c6e] data-[state=open]:border-[#1a3c6e]',
            )}
          >
            <CalendarDays size={18} className="shrink-0 text-[#6b7280]" aria-hidden="true" />
            <span className={cn('flex-1 truncate', selected ? 'text-gray-900' : 'text-[#6b7280]')}>
              {selected ? `${pad(selected.getDate())} ${MONTHS_SHORT[selected.getMonth()]} ${selected.getFullYear()}` : placeholder}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="z-[200] w-[300px] rounded-[12px] border border-[#f3f4f6] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          >
            {/* Caption */}
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                aria-label={view === 'days' ? 'Previous month' : 'Previous years'}
                onClick={() => (view === 'days' ? shiftMonth(-1) : setViewDate(new Date(year - 12, month, 1)))}
                className={navBtn}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setView(view === 'days' ? 'years' : 'days')}
                className="rounded-md px-3 py-1 font-display text-sm font-bold text-[#1a3c6e] transition-colors hover:bg-[#f0f4ff]"
              >
                {view === 'days' ? `${MONTHS[month]} ${year}` : `${yearPageStart} – ${yearPageStart + 11}`}
              </button>

              <button
                type="button"
                aria-label={view === 'days' ? 'Next month' : 'Next years'}
                onClick={() => (view === 'days' ? shiftMonth(1) : setViewDate(new Date(year + 12, month, 1)))}
                className={navBtn}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {view === 'days' ? (
              <>
                {/* Weekday header */}
                <div className="mb-1 grid grid-cols-7">
                  {WEEKDAYS.map((w) => (
                    <div key={w} className="flex h-8 items-center justify-center text-xs font-semibold uppercase tracking-wide text-[#c8a951]">
                      {w}
                    </div>
                  ))}
                </div>
                {/* Day grid */}
                <div className="grid grid-cols-7 gap-0.5">
                  {days.map((d) => {
                    const outside = d.getMonth() !== month
                    const isSel = selected && sameDay(d, selected)
                    const isToday = sameDay(d, today)
                    return (
                      <button
                        type="button"
                        key={toISO(d)}
                        onClick={() => pickDay(d)}
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors',
                          outside ? 'text-gray-300' : 'text-gray-700',
                          'hover:bg-[#f0f4ff] hover:text-[#1a3c6e]',
                          isToday && !isSel && 'ring-1 ring-[#c8a951] ring-inset',
                          isSel && '!bg-[#1a3c6e] font-semibold !text-white',
                        )}
                      >
                        {d.getDate()}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              /* Year grid */
              <div className="grid grid-cols-3 gap-2 py-1">
                {yearPage.map((y) => {
                  const disabledYear = y < minYear || y > maxYear
                  const isSelYear = selected?.getFullYear() === y
                  return (
                    <button
                      type="button"
                      key={y}
                      disabled={disabledYear}
                      onClick={() => {
                        setViewDate(new Date(y, month, 1))
                        setView('days')
                      }}
                      className={cn(
                        'flex h-10 items-center justify-center rounded-md text-sm transition-colors',
                        'text-gray-700 hover:bg-[#f0f4ff] hover:text-[#1a3c6e]',
                        'disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent',
                        isSelYear && '!bg-[#1a3c6e] font-semibold !text-white',
                      )}
                    >
                      {y}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between border-t border-[#f3f4f6] pt-2">
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setOpen(false)
                }}
                className="rounded-md px-2 py-1 text-sm font-medium text-[#6b7280] transition-colors hover:text-[#1a3c6e]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  setView('days')
                  setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
                }}
                className="rounded-md px-2 py-1 text-sm font-medium text-[#1a3c6e] transition-colors hover:underline"
              >
                Today
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
