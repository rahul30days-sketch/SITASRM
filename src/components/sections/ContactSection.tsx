import { cn } from '@/lib/utils'

interface ContactSectionProps {
  address: string
  phone: string[]
  email: string[]
  mapEmbedUrl: string
  className?: string
}

export default function ContactSection({
  address,
  phone,
  email,
  mapEmbedUrl,
  className,
}: ContactSectionProps) {
  const contactCards = [
    {
      title: 'Visit Us',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      content: <p className="text-text-muted leading-relaxed">{address}</p>,
    },
    {
      title: 'Call Us',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-1">
          {phone.map((number) => (
            <a
              key={number}
              href={`tel:${number.replace(/\s/g, '')}`}
              className="block text-text-muted hover:text-primary transition-colors"
            >
              {number}
            </a>
          ))}
        </div>
      ),
    },
    {
      title: 'Email Us',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-1">
          {email.map((addr) => (
            <a
              key={addr}
              href={`mailto:${addr}`}
              className="block text-text-muted hover:text-primary transition-colors break-all"
            >
              {addr}
            </a>
          ))}
        </div>
      ),
    },
  ]

  return (
    <section className={cn('py-16 sm:py-20 lg:py-24 bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out to us through any of the
            channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info cards */}
          <div className="space-y-6">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className={cn(
                  'flex gap-5 p-6 rounded-md',
                  'bg-surface border border-border/50',
                  'hover:shadow-card transition-shadow duration-200',
                )}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-12 h-12 rounded-md',
                    'bg-primary-100 text-primary',
                    'flex items-center justify-center',
                  )}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-2">
                    {card.title}
                  </h3>
                  {card.content}
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps embed */}
          <div
            className={cn(
              'rounded-md overflow-hidden',
              'border border-border/50',
              'shadow-card',
              'min-h-[320px] lg:min-h-full',
            )}
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SERI Campus Location"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
