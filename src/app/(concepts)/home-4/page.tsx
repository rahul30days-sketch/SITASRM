import type { Metadata } from 'next'
import { getHomeData } from '@/lib/getHomeData'
import Home4 from '@/components/home4'

export const metadata: Metadata = {
  title: 'Concept 4 — Signature',
  description:
    'The signature SITASRM brand homepage — Royal Indigo, Lotus Pink and Heritage Gold.',
}

export const revalidate = 300

export default async function Home4Page() {
  const data = await getHomeData()
  return <Home4 data={data} />
}
