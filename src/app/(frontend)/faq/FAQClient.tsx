'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  items: FAQItem[]
}

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-medium hover:text-primary"
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className={`ml-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-4 text-text-muted">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export function FAQClient({ categories }: { categories: FAQCategory[] }) {
  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <section key={cat.category}>
          <h2 className="mb-4 font-display text-xl font-bold text-primary">{cat.category}</h2>
          <div className="rounded-md border border-border bg-white px-6">
            {cat.items.map((item) => (
              <AccordionItem key={item.question} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
