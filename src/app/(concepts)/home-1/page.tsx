import type { Metadata } from 'next'
import { getHomeData } from '@/lib/getHomeData'
import Home1 from '@/components/home1'

export const metadata: Metadata = {
  title: 'Concept 1 — Heritage',
  description: 'Premium international university homepage concept for SITASRM Engineering & Research Institute.',
}

export const revalidate = 300

export default async function Home1Page() {
  const data = await getHomeData()
  return <Home1 data={data} />
}
