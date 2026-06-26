import type { Metadata } from 'next'
import { getHomeData } from '@/lib/getHomeData'
import Home3 from '@/components/home3'

export const metadata: Metadata = {
  title: 'Concept 3 — Obsidian',
  description: 'Bold dark-luxury homepage concept for SITASRM Engineering & Research Institute.',
}

export const revalidate = 300

export default async function Home3Page() {
  const data = await getHomeData()
  return <Home3 data={data} />
}
