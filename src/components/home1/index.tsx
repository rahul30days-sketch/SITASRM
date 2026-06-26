import { type HomeData } from '@/lib/homeData'
import Nav1 from './Nav1'
import Hero1 from './Hero1'
import Programs1 from './Programs1'
import Rankings1 from './Rankings1'
import Campus1 from './Campus1'
import Research1 from './Research1'
import Admissions1 from './Admissions1'
import Testimonials1 from './Testimonials1'
import News1 from './News1'
import Footer1 from './Footer1'

/**
 * Concept 1 — "Heritage". Oxford/Harvard/Imperial mood: full-screen cinematic
 * campus hero, transparent→solid mega-menu navbar, serif typography, navy + gold,
 * editorial section rhythm. Owns its own navbar + footer (no shared chrome).
 */
export default function Home1({ data }: { data: HomeData }) {
  const { siteSettings, programs, news, events, testimonials, placement, gallery } = data
  return (
    <div className="bg-white">
      <Nav1 siteSettings={siteSettings} programs={programs} />
      <main id="main">
        <Hero1 siteSettings={siteSettings} gallery={gallery} placement={placement} />
        <Programs1 programs={programs} />
        <Rankings1 siteSettings={siteSettings} placement={placement} />
        <Campus1 gallery={gallery} />
        <Research1 />
        <Admissions1 />
        <Testimonials1 testimonials={testimonials} />
        <News1 news={news} events={events} />
      </main>
      <Footer1 siteSettings={siteSettings} />
    </div>
  )
}
