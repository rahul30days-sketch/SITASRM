import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/seo/schemas'
import { FAQClient } from './FAQClient'

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  seo: { metaDescription: 'Frequently asked questions about admissions, programs, fees, placements, and campus life at SERI.' },
  path: '/faq',
})

const FAQ_DATA = [
  {
    category: 'Admissions',
    items: [
      { question: 'What is the last date to apply for 2025-26?', answer: 'The last date for submission of applications for the 2025-26 academic year is March 31, 2025. We recommend applying early as seats are limited and filled on a merit basis.' },
      { question: 'What documents are required for admission?', answer: 'You need your 10th and 12th mark sheets, migration certificate, transfer certificate, entrance exam scorecard (JEE Main / State CET), category certificate (if applicable), passport-size photographs, and Aadhaar card.' },
      { question: 'Is there any entrance exam required?', answer: 'SERI accepts JEE Main and State CET scores for B.Tech admissions. Direct admission is also available under the management quota for eligible candidates.' },
    ],
  },
  {
    category: 'Fees & Scholarships',
    items: [
      { question: 'What scholarships are available?', answer: 'SERI offers merit scholarships of up to 100% of tuition fees for top-performing students, along with government and need-based scholarships. Eligibility is based on academic merit and entrance exam performance.' },
      { question: 'What is the fee payment schedule?', answer: 'Fees can be paid annually or in two installments per academic year. The first installment is due at the time of admission and the second before the start of the even semester.' },
      { question: 'Is bank loan facility available?', answer: 'Yes, SERI is empanelled with leading nationalized and private banks for education loans. Our admissions office assists students with the required documentation.' },
    ],
  },
  {
    category: 'Programs',
    items: [
      { question: 'Which programs are approved by AICTE?', answer: 'All of SERI’s engineering and management programs — B.Tech (CSE, Mechanical, Civil, ECE, Electrical), M.Tech, MBA and Diploma — are approved by AICTE and the institute is NAAC accredited.' },
      { question: 'What is the intake capacity for B.Tech CSE?', answer: 'The B.Tech Computer Science & Engineering program has an annual intake of 120 seats. Other B.Tech branches have 60 seats each.' },
    ],
  },
  {
    category: 'Campus',
    items: [
      { question: 'Is hostel facility available?', answer: 'Yes, separate hostels for boys and girls are available on campus with modern amenities, mess facilities, 24/7 Wi-Fi, power backup and round-the-clock security.' },
      { question: 'What sports facilities does SERI offer?', answer: 'SERI has cricket, football, basketball and volleyball grounds, a gymnasium, and indoor facilities for table tennis, badminton, carrom and chess.' },
    ],
  },
  {
    category: 'Placements',
    items: [
      { question: 'What companies visit for campus placements?', answer: 'Top recruiters include TCS, Infosys, Wipro, HCL Technologies, Cognizant, Tech Mahindra, L&T, Maruti Suzuki, HDFC Bank and many more — over 120 companies visit each year.' },
      { question: 'What is the average salary package?', answer: 'For the 2024 batch the average package was ₹5.2 LPA and the highest package was ₹14 LPA, with an overall placement rate of 95%.' },
    ],
  },
]

export default function FAQPage() {
  const allItems = FAQ_DATA.flatMap((cat) => cat.items)

  return (
    <>
      <JsonLd schema={faqSchema(allItems)} />
      <div className="min-h-screen bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
              Find answers to common questions about SERI.
            </p>
          </div>
          <FAQClient categories={FAQ_DATA} />
        </div>
      </div>
    </>
  )
}
