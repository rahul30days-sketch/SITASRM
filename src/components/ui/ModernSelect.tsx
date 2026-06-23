'use client'

/**
 * ModernSelect — a styled, accessible dropdown built on Radix UI Select
 * (the primitive shadcn/ui's Select wraps). Supports flat `options` or grouped
 * `groups`, an optional left icon, and an error state.
 *
 * @example
 * <ModernSelect value={v} onChange={setV} icon={User} options={[{ value: 'm', label: 'Male' }]} />
 */

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

interface ModernSelectProps {
  value: string
  onChange: (value: string) => void
  options?: SelectOption[]
  groups?: SelectOptionGroup[]
  placeholder?: string
  error?: string
  disabled?: boolean
  icon?: LucideIcon
}

function Option({ option }: { option: SelectOption }) {
  return (
    <Select.Item
      value={option.value}
      className={cn(
        'relative flex cursor-pointer select-none items-center justify-between rounded-md px-3 py-2.5 text-sm text-gray-700 outline-none transition-colors',
        'data-[highlighted]:bg-[#f0f4ff] data-[highlighted]:text-[#1a3c6e] hover:bg-[#f0f4ff] hover:text-[#1a3c6e]',
        'data-[state=checked]:!bg-[#1a3c6e] data-[state=checked]:!text-white',
      )}
    >
      <Select.ItemText>{option.label}</Select.ItemText>
      <Select.ItemIndicator>
        <Check className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

export default function ModernSelect({
  value,
  onChange,
  options,
  groups,
  placeholder = 'Select an option',
  error,
  disabled,
  icon: Icon,
}: ModernSelectProps) {
  return (
    <div className="w-full">
      <Select.Root value={value || undefined} onValueChange={onChange} disabled={disabled}>
        <Select.Trigger
          aria-invalid={error ? true : undefined}
          className={cn(
            'group flex h-[52px] w-full items-center gap-2.5 rounded-[10px] bg-white px-3.5 text-left text-sm outline-none',
            'border-[1.5px] transition-colors',
            'data-[placeholder]:text-[#6b7280]',
            'disabled:cursor-not-allowed disabled:opacity-60',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#e5e7eb] focus:border-[#1a3c6e] data-[state=open]:border-[#1a3c6e]',
          )}
        >
          {Icon && <Icon size={18} className="shrink-0 text-[#6b7280]" aria-hidden="true" />}
          <span className="flex-1 truncate text-gray-900">
            <Select.Value placeholder={placeholder} />
          </span>
          <Select.Icon asChild>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className="shrink-0 text-[#6b7280] transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className={cn(
              'z-[200] max-h-[320px] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[12px] border border-[#f3f4f6] bg-white',
              'shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
            )}
          >
            <Select.Viewport className="p-1.5">
              {groups
                ? groups.map((group, gi) => (
                    <React.Fragment key={group.label}>
                      {gi > 0 && <Select.Separator className="my-1.5 h-px bg-[#f3f4f6]" />}
                      <Select.Group>
                        <Select.Label className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c8a951]">
                          {group.label}
                        </Select.Label>
                        {group.options.map((opt) => (
                          <Option key={opt.value} option={opt} />
                        ))}
                      </Select.Group>
                    </React.Fragment>
                  ))
                : (options || []).map((opt) => <Option key={opt.value} option={opt} />)}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
