import { type HomeData } from '@/lib/homeData'
import Nav4 from './Nav4'
import Hero4 from './Hero4'
import Achievements4 from './Achievements4'
import Departments4 from './Departments4'
import CampusExperience4 from './CampusExperience4'
import Placements4 from './Placements4'
import Research4 from './Research4'
import Partners4 from './Partners4'
import Stories4 from './Stories4'
import Scholarships4 from './Scholarships4'
import Admissions4 from './Admissions4'
import News4 from './News4'
import VirtualTour4 from './VirtualTour4'
import Footer4 from './Footer4'

/**
 * Concept 4 — "Signature". SITASRM's official brand homepage, built entirely around
 * the brand palette: Royal Indigo #3B328A (60%), Lotus Pink #FA8DD2 (25%), Ivory
 * Cream #EDEAE2 (10%), Heritage Gold #C9A227 (5%). Elegant Fraunces serif display
 * (font-signature), lotus-inspired motifs. Owns its own navbar + footer.
 */
export default function Home4({ data }: { data: HomeData }) {
  const { siteSettings, programs, departments, gallery, placement, recruiters, testimonials, news, events } = data
  return (
    <div className="bg-ivory">
      <Nav4 siteSettings={siteSettings} />
      <main id="main">
        <Hero4 siteSettings={siteSettings} gallery={gallery} placement={placement} />
        <Achievements4 siteSettings={siteSettings} placement={placement} />
        <Departments4 departments={departments} programs={programs} />
        <CampusExperience4 gallery={gallery} />
        <Placements4 placement={placement} recruiters={recruiters} />
        <Research4 />
        <Partners4 recruiters={recruiters} />
        <Stories4 testimonials={testimonials} />
        <Scholarships4 />
        <Admissions4 siteSettings={siteSettings} />
        <News4 news={news} events={events} />
        <VirtualTour4 gallery={gallery} />
      </main>
      <Footer4 siteSettings={siteSettings} />
    </div>
  )
}
