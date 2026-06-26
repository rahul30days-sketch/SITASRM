import type { Metadata } from 'next'
import { getHomeData } from '@/lib/getHomeData'
import Home2 from '@/components/home2'

export const metadata: Metadata = {
  title: 'Concept 2 — Studio',
  description: 'Apple/Awwwards-inspired minimal homepage concept for SITASRM Engineering & Research Institute.',
}

export const revalidate = 300

export default async function Home2Page() {
  const data = await getHomeData()
  return <Home2 data={data} />
}
