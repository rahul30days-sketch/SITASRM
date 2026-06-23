/**
 * SERI database seed — populates every Payload collection + globals with realistic demo data.
 *
 * Run:  npm run seed            (aborts if data already exists)
 *       npm run seed -- --force (wipes content collections, then reseeds)
 *
 * Uses the Payload Local API directly (no running Next server required) and
 * downloads images from Unsplash / placehold.co into the Media collection.
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { getPayload } from 'payload'

// ---- Load .env BEFORE importing payload.config (which reads DATABASE_URI at eval time) ----
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
      }
    }
  }
}

const FORCE = process.argv.includes('--force')
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const ok = (m: string) => console.log(`  ✅ ${m}`)
const warn = (m: string) => console.log(`  ⚠️  ${m}`)

type AnyDoc = Record<string, unknown> & { id: string }

async function main() {
  loadEnv()
  console.log('→ Initializing Payload...')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  // ---- Existing-data guard ----
  const existing = await payload.count({ collection: 'programs' })
  if (existing.totalDocs > 0 && !FORCE) {
    console.log(
      `\n⛔ Data already exists (${existing.totalDocs} programs). ` +
        `Re-run with:  npm run seed -- --force  to wipe and reseed.\n`,
    )
    process.exit(0)
  }

  if (FORCE) {
    console.log('→ Wiping existing content (--force)...')
    const wipe = [
      'media', 'programs', 'faculty', 'departments', 'news', 'events',
      'testimonials', 'recruiters', 'placements', 'gallery', 'downloads', 'admissions',
    ] as const
    for (const c of wipe) {
      try {
        await payload.delete({ collection: c, where: { id: { exists: true } } })
      } catch {
        /* ignore */
      }
    }
  }

  const counts: Record<string, number> = {}
  const bump = (k: string) => (counts[k] = (counts[k] || 0) + 1)

  // ---------------------------------------------------------------- MEDIA
  console.log('→ Uploading media (downloading images)...')
  const mediaCache = new Map<string, string>() // url -> media id

  async function fetchBuffer(url: string): Promise<{ data: Buffer; mimetype: string } | null> {
    try {
      const res = await fetch(url)
      if (!res.ok) return null
      const buf = Buffer.from(await res.arrayBuffer())
      const mimetype = res.headers.get('content-type')?.split(';')[0] || 'image/jpeg'
      return { data: buf, mimetype }
    } catch {
      return null
    }
  }

  async function placeholderBuffer(): Promise<{ data: Buffer; mimetype: string }> {
    const data = await sharp({
      create: { width: 1200, height: 800, channels: 4, background: { r: 15, g: 31, b: 61, alpha: 1 } },
    }).png().toBuffer()
    return { data, mimetype: 'image/png' }
  }

  /** Upload an image URL to Media (cached by URL). Falls back to a navy placeholder. */
  async function media(url: string, alt: string): Promise<string> {
    if (mediaCache.has(url)) return mediaCache.get(url)!
    let file = await fetchBuffer(url)
    if (!file) {
      warn(`download failed, using placeholder for: ${alt}`)
      file = await placeholderBuffer()
    }
    const ext = file.mimetype.includes('png') ? 'png' : file.mimetype.includes('pdf') ? 'pdf' : 'jpg'
    const name = `${alt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50)}.${ext}`
    const doc = (await payload.create({
      collection: 'media',
      data: { alt, category: ext === 'pdf' ? 'document' : 'image' },
      file: { data: file.data, mimetype: file.mimetype, name, size: file.data.length },
    })) as AnyDoc
    mediaCache.set(url, doc.id)
    bump('media')
    return doc.id
  }

  const IMG = {
    cse: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    mech: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    civil: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    ece: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    eee: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    mtech: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    mba: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    diploma: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800',
    campus: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    labs: 'https://images.unsplash.com/photo-1532094349884-543559059a00?w=800',
    library: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
    hostel: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    fest: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    news: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    f1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    f2: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    f3: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    f4: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    f5: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    f6: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    t1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  }

  // Pre-upload shared images
  const programImg: Record<string, string> = {}
  for (const [k, url] of Object.entries({ cse: IMG.cse, mech: IMG.mech, civil: IMG.civil, ece: IMG.ece, eee: IMG.eee, mtech: IMG.mtech, mba: IMG.mba, diploma: IMG.diploma })) {
    programImg[k] = await media(url, `${k} program`)
  }
  const facultyImg = [IMG.f1, IMG.f2, IMG.f3, IMG.f4, IMG.f5, IMG.f6]
  const facImgIds: string[] = []
  for (let i = 0; i < facultyImg.length; i++) facImgIds.push(await media(facultyImg[i], `faculty ${i + 1}`))
  const galleryImg = {
    campus: await media(IMG.campus, 'campus'),
    labs: await media(IMG.labs, 'labs'),
    library: await media(IMG.library, 'library'),
    hostel: await media(IMG.hostel, 'hostel'),
    sports: await media(IMG.sports, 'sports'),
    fest: await media(IMG.fest, 'tech fest'),
  }
  const newsImg = await media(IMG.news, 'news')
  const studentImg = await media(IMG.t1, 'student')
  const pdfId = await media('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'document')

  // ---------------------------------------------------------------- PROGRAMS
  console.log('→ Programs...')
  const P = (name: string, slug: string, category: string, duration: string, seats: number, fee: number, desc: string, careers: string[], highlights: [string, string][], img: string, featured = true) => ({
    name, slug, category, duration, totalSeats: seats,
    shortDescription: desc,
    affiliatedTo: 'Maharshi Dayanand University (MDU), Rohtak',
    approvedBy: [{ body: 'AICTE' }, { body: 'NAAC' }],
    fees: { tuitionFee: fee, scholarshipAvailable: true, feesNote: 'Merit scholarships up to 100% available for eligible students.' },
    careerOpportunities: careers.map((role) => ({ role })),
    highlights: highlights.map(([label, value]) => ({ label, value })),
    featuredImage: img, featured, status: 'published',
  })
  const programDefs = [
    P('B.Tech Computer Science & Engineering', 'btech-cse', 'undergraduate', '4 Years', 120, 95000, 'Industry-aligned CSE program with AI/ML, cloud and full-stack tracks. Eligibility: 10+2 with PCM, min 50%.', ['Software Engineer', 'Data Scientist', 'Cloud Architect', 'Product Manager'], [['AI/ML Lab', 'Dedicated'], ['Placement', '100% record'], ['Cloud Computing', 'Industry tie-ups']], programImg.cse),
    P('B.Tech Mechanical Engineering', 'btech-mechanical', 'undergraduate', '4 Years', 60, 90000, 'Core mechanical engineering with CAD/CAM, thermal and manufacturing specializations. Eligibility: 10+2 PCM, min 50%.', ['Design Engineer', 'Production Manager', 'Automobile Engineer'], [['CAD/CAM Lab', 'Modern'], ['Workshops', 'Hands-on'], ['Industry Visits', 'Regular']], programImg.mech),
    P('B.Tech Civil Engineering', 'btech-civil', 'undergraduate', '4 Years', 60, 88000, 'Civil engineering covering structures, geotech and construction management. Eligibility: 10+2 PCM, min 50%.', ['Site Engineer', 'Project Manager', 'Structural Designer'], [['Structural Lab', 'Equipped'], ['Surveying', 'Field training'], ['Software', 'STAAD / AutoCAD']], programImg.civil),
    P('B.Tech Electronics & Communication', 'btech-ece', 'undergraduate', '4 Years', 60, 90000, 'ECE program in VLSI, embedded systems and communication. Eligibility: 10+2 PCM, min 50%.', ['VLSI Engineer', 'Embedded Systems Engineer', 'Telecom Engineer'], [['VLSI Lab', 'Advanced'], ['Embedded', 'IoT focus'], ['Comms', '5G ready']], programImg.ece),
    P('B.Tech Electrical Engineering', 'btech-electrical', 'undergraduate', '4 Years', 60, 88000, 'Electrical engineering with power systems and automation. Eligibility: 10+2 PCM, min 50%.', ['Power Systems Engineer', 'Automation Engineer'], [['Power Lab', 'High-voltage'], ['Automation', 'PLC/SCADA'], ['Renewable', 'Solar lab']], programImg.eee),
    P('M.Tech Computer Science', 'mtech-cs', 'postgraduate', '2 Years', 30, 80000, 'Advanced CS specialization with research focus. Eligibility: B.Tech with min 55%.', ['Research Engineer', 'Senior Software Engineer', 'AI Specialist'], [['Research', 'Funded projects'], ['Publications', 'IEEE/Springer'], ['Specialization', 'AI / Data']], programImg.mtech),
    P('MBA (Technology Management)', 'mba-tech', 'postgraduate', '2 Years', 60, 75000, 'MBA blending management with technology leadership. Eligibility: Graduation with 50% + CAT/MAT/CMAT.', ['Business Analyst', 'Product Manager', 'Operations Manager', 'Consultant'], [['Specializations', 'Finance / Marketing'], ['Simulations', 'Business labs'], ['Internships', 'Corporate']], programImg.mba),
    P('Diploma in Mechanical Engineering', 'diploma-mechanical', 'diploma', '3 Years', 60, 45000, 'Practical 3-year diploma in mechanical engineering. Eligibility: 10th pass.', ['Junior Engineer', 'Technician', 'CAD Operator'], [['Workshops', 'Extensive'], ['Practical', 'Skill-first'], ['Placement', 'Assured support']], programImg.diploma),
  ]
  const programs: Record<string, string> = {}
  for (const p of programDefs) {
    try {
      const d = (await payload.create({ collection: 'programs', data: p as never })) as AnyDoc
      programs[p.slug] = d.id; bump('programs'); ok(`Program: ${p.name}`)
    } catch (e) { warn(`Program ${p.slug}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- FACULTY
  console.log('→ Faculty...')
  const F = (name: string, slug: string, designation: string, deptKey: string, qualification: string, exp: number, spec: string, research: string[], img: string, isHOD = false, featured = false) => ({
    _deptKey: deptKey,
    data: {
      name, slug, designation, qualification, experienceYears: exp, specialization: spec,
      researchInterests: research.map((topic) => ({ topic })),
      profileImage: img, email: `${slug.replace(/^(dr|prof)-/, '')}@seri.net.in`,
      linkedin: `https://linkedin.com/in/${slug}`,
      isHOD, featured, status: 'published',
    },
  })
  const facultyDefs = [
    F('Dr. Rajesh Kumar Sharma', 'dr-rajesh-kumar-sharma', 'Professor & HOD', 'cse', 'Ph.D. (IIT Delhi), M.Tech (NIT Kurukshetra)', 18, 'Machine Learning, Computer Vision', ['Machine Learning', 'Computer Vision'], facImgIds[0], true, true),
    F('Dr. Priya Mehta', 'dr-priya-mehta', 'Associate Professor', 'cse', 'Ph.D. (Delhi University), M.Tech', 12, 'Data Science, Cloud Computing', ['Data Science', 'Cloud Computing'], facImgIds[1], false, true),
    F('Prof. Amit Verma', 'prof-amit-verma', 'Professor & HOD', 'mechanical', 'M.Tech (IIT Roorkee), MBA', 22, 'Thermal Engineering, Manufacturing', ['Thermal Systems', 'Manufacturing'], facImgIds[2], true, true),
    F('Dr. Sunita Agarwal', 'dr-sunita-agarwal', 'Professor & HOD', 'electronics', 'Ph.D. (IIT Delhi)', 15, 'VLSI Design, Embedded Systems', ['VLSI', 'Embedded Systems'], facImgIds[3], true, true),
    F('Dr. Vikram Singh Rao', 'dr-vikram-singh-rao', 'Associate Professor & HOD', 'civil', 'Ph.D. (NIT Hamirpur)', 14, 'Structural Engineering', ['Structures', 'Earthquake Engineering'], facImgIds[4], true, false),
    F('Prof. Anita Gupta', 'prof-anita-gupta', 'Assistant Professor', 'cse', 'M.Tech (MDU Rohtak), pursuing Ph.D.', 8, 'Web Technologies, Databases', ['Web Tech', 'Databases'], facImgIds[5], false, false),
    F('Dr. Manoj Tiwari', 'dr-manoj-tiwari', 'Professor & HOD', 'electrical', 'Ph.D. (IIT Kanpur)', 20, 'Power Systems, Renewable Energy', ['Power Systems', 'Solar Energy'], facImgIds[0], true, false),
    F('Dr. Kavita Joshi', 'dr-kavita-joshi', 'Associate Professor', 'management', 'Ph.D. (FMS Delhi), MBA', 13, 'Finance, Strategy', ['Corporate Finance', 'Strategy'], facImgIds[1], false, false),
    F('Prof. Sanjay Malhotra', 'prof-sanjay-malhotra', 'Professor & HOD', 'management', 'Ph.D., MBA (IIM Lucknow)', 19, 'Marketing, Analytics', ['Marketing', 'Business Analytics'], facImgIds[2], true, false),
    F('Dr. Neha Bansal', 'dr-neha-bansal', 'Assistant Professor', 'electronics', 'Ph.D. (DTU)', 9, 'Signal Processing', ['DSP', 'Communication'], facImgIds[3], false, false),
    F('Prof. Rohit Khanna', 'prof-rohit-khanna', 'Assistant Professor', 'mechanical', 'M.Tech (NIT Kurukshetra)', 7, 'Robotics, Automation', ['Robotics', 'Mechatronics'], facImgIds[4], false, false),
    F('Dr. Pooja Saxena', 'dr-pooja-saxena', 'Associate Professor', 'electrical', 'Ph.D. (MNIT Jaipur)', 11, 'Control Systems', ['Control Systems', 'Automation'], facImgIds[5], false, false),
  ]
  const faculty: Record<string, string> = {}
  const facultyByDept: Record<string, string[]> = {}
  for (const f of facultyDefs) {
    try {
      const d = (await payload.create({ collection: 'faculty', data: f.data as never })) as AnyDoc
      faculty[f.data.slug] = d.id; bump('faculty'); ok(`Faculty: ${f.data.name}`)
      ;(facultyByDept[f._deptKey] ||= []).push(d.id)
    } catch (e) { warn(`Faculty ${f.data.slug}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- DEPARTMENTS
  console.log('→ Departments...')
  const D = (name: string, slug: string, hodSlug: string, deptKey: string, progSlugs: string[], desc: string, labs: string[], achievements?: string) => ({
    name, slug, shortDescription: desc,
    hod: faculty[hodSlug], programs: progSlugs.map((s) => programs[s]).filter(Boolean),
    facultyList: facultyByDept[deptKey] || [],
    facilities: labs.map((l) => ({ name: l, description: `Well-equipped ${l} for practical learning and research.` })),
    vision: achievements || `To be a center of excellence in ${name}.`,
    status: 'published',
  })
  const deptDefs = [
    D('Computer Science & Engineering', 'cse', 'dr-rajesh-kumar-sharma', 'cse', ['btech-cse', 'mtech-cs'], 'CSE department with AI/ML, cloud and cyber-security focus.', ['AI/ML Lab', 'Data Structures Lab', 'Web Dev Lab', 'Cyber Security Lab'], 'Best Department Award 2023; 3 patents filed.'),
    D('Mechanical Engineering', 'mechanical', 'prof-amit-verma', 'mechanical', ['btech-mechanical', 'diploma-mechanical'], 'Mechanical engineering with strong design and manufacturing labs.', ['CAD/CAM Lab', 'Thermal Lab', 'Fluid Mechanics Lab', 'Manufacturing Lab']),
    D('Electronics & Communication', 'electronics', 'dr-sunita-agarwal', 'electronics', ['btech-ece'], 'ECE department specializing in VLSI and embedded systems.', ['VLSI Lab', 'Embedded Systems Lab', 'Communication Lab']),
    D('Civil Engineering', 'civil', 'dr-vikram-singh-rao', 'civil', ['btech-civil'], 'Civil engineering with modern structural and geotech labs.', ['Structural Lab', 'Surveying Lab', 'Geo-Technical Lab']),
    D('Management Studies', 'management', 'prof-sanjay-malhotra', 'management', ['mba-tech'], 'Management studies with industry simulation facilities.', ['Bloomberg Terminal', 'Business Simulation Lab']),
  ]
  const depts: Record<string, string> = {}
  for (const d of deptDefs) {
    try {
      const doc = (await payload.create({ collection: 'departments', data: d as never })) as AnyDoc
      depts[d.slug] = doc.id; bump('departments'); ok(`Department: ${d.name}`)
    } catch (e) { warn(`Department ${d.slug}: ${(e as Error).message}`) }
  }
  // Link faculty -> department
  const facDeptMap: Record<string, string> = { 'dr-rajesh-kumar-sharma': 'cse', 'dr-priya-mehta': 'cse', 'prof-anita-gupta': 'cse', 'prof-amit-verma': 'mechanical', 'prof-rohit-khanna': 'mechanical', 'dr-sunita-agarwal': 'electronics', 'dr-neha-bansal': 'electronics', 'dr-vikram-singh-rao': 'civil', 'dr-manoj-tiwari': 'electrical', 'dr-pooja-saxena': 'electrical', 'dr-kavita-joshi': 'management', 'prof-sanjay-malhotra': 'management' }
  for (const [fSlug, dKey] of Object.entries(facDeptMap)) {
    if (faculty[fSlug] && depts[dKey]) {
      try { await payload.update({ collection: 'faculty', id: faculty[fSlug], data: { department: depts[dKey] } as never }) } catch { /* ignore */ }
    }
  }
  ok('Faculty linked to departments')

  // ---------------------------------------------------------------- NEWS
  console.log('→ News...')
  const newsDefs = [
    { title: 'SERI Achieves Record 95% Placement in 2024', slug: 'record-95-percent-placement-2024', type: 'achievement', publishedAt: '2025-01-15T10:00:00.000Z', excerpt: 'Students from the 2024 batch secured positions at top companies across IT, core and management sectors.', img: newsImg, tags: ['Placements', 'Achievement'] },
    { title: 'Admissions Open for 2025-26 Academic Year', slug: 'admissions-open-2025-26', type: 'announcement', publishedAt: '2025-01-01T09:00:00.000Z', excerpt: 'Applications are now open for all B.Tech, M.Tech, MBA and Diploma programs for 2025-26.', tags: ['Admissions'] },
    { title: 'SERI Signs MOU with TCS for Industry Training', slug: 'mou-with-tcs', type: 'news', publishedAt: '2024-12-20T09:00:00.000Z', excerpt: 'A new partnership with TCS brings industry-grade training and internships to SERI students.', tags: ['Industry', 'Partnership'] },
    { title: "Annual Technical Fest 'TechNova 2025' Registration Open", slug: 'technova-2025-registration', type: 'announcement', publishedAt: '2025-01-10T09:00:00.000Z', excerpt: 'Register now for TechNova 2025 — coding contests, robotics, hackathons and more.', tags: ['Events', 'TechNova'] },
    { title: 'SERI Research Team Publishes Paper in IEEE Journal', slug: 'ieee-journal-publication', type: 'achievement', publishedAt: '2024-12-05T09:00:00.000Z', excerpt: 'Faculty and students co-authored a paper on machine learning published in a reputed IEEE journal.', tags: ['Research'] },
    { title: 'New AI/ML Lab Inaugurated by Industry Expert', slug: 'new-aiml-lab-inaugurated', type: 'news', publishedAt: '2024-11-25T09:00:00.000Z', excerpt: 'A state-of-the-art AI/ML laboratory was inaugurated to boost hands-on learning and research.', tags: ['Infrastructure'] },
    { title: 'Scholarship Results Announced for Meritorious Students', slug: 'scholarship-results-2024', type: 'announcement', publishedAt: '2024-11-10T09:00:00.000Z', excerpt: 'Merit scholarship results are out — congratulations to all awardees for the 2024-25 session.', tags: ['Scholarships'] },
    { title: 'SERI Alumni Meet 2024 — A Grand Success', slug: 'alumni-meet-2024', type: 'news', publishedAt: '2024-10-15T09:00:00.000Z', excerpt: 'Alumni from across the globe reconnected at the SERI Alumni Meet 2024 on campus.', tags: ['Alumni'] },
  ]
  for (const n of newsDefs) {
    try {
      const { img, tags, ...rest } = n
      await payload.create({ collection: 'news', data: { ...rest, featuredImage: img, tags: tags.map((t) => ({ tag: t })), status: 'published' } as never })
      bump('news'); ok(`News: ${n.title}`)
    } catch (e) { warn(`News ${n.slug}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- EVENTS
  console.log('→ Events...')
  const eventDefs = [
    { title: 'TechNova 2025 — Annual Technical Fest', slug: 'technova-2025', type: 'cultural', startDate: '2025-03-15T09:00:00.000Z', endDate: '2025-03-17T18:00:00.000Z', venue: 'SERI Main Campus', shortDescription: 'Three days of coding, robotics, hackathons, cultural nights and tech talks.', capacity: 2000, img: galleryImg.fest, isFeatured: true },
    { title: 'Campus Placement Drive — Infosys', slug: 'placement-drive-infosys', type: 'placement', startDate: '2025-02-05T09:00:00.000Z', venue: 'Placement Hall', shortDescription: 'On-campus recruitment drive by Infosys for final-year students.', isFeatured: false },
    { title: 'Workshop: Machine Learning with Python', slug: 'ml-with-python-workshop', type: 'workshop', startDate: '2025-01-28T10:00:00.000Z', venue: 'AI/ML Lab', shortDescription: 'Hands-on ML workshop covering Python, scikit-learn and model deployment.', capacity: 100, isFeatured: true },
    { title: 'Sports Day 2025 — Inter-Department Tournament', slug: 'sports-day-2025', type: 'sports', startDate: '2025-02-20T08:00:00.000Z', venue: 'SERI Sports Ground', shortDescription: 'Inter-department sports tournament with cricket, football, athletics and more.', isFeatured: false },
    { title: 'Expert Lecture — Future of AI in Engineering', slug: 'future-of-ai-lecture', type: 'academic', startDate: '2025-02-10T11:00:00.000Z', venue: 'Seminar Hall', shortDescription: 'An industry-expert guest lecture on the role of AI across engineering domains.', isFeatured: false },
  ]
  for (const e of eventDefs) {
    try {
      const { img, ...rest } = e
      await payload.create({ collection: 'events', data: { ...rest, images: [{ image: img || galleryImg.campus }], status: 'published' } as never })
      bump('events'); ok(`Event: ${e.title}`)
    } catch (err) { warn(`Event ${e.slug}: ${(err as Error).message}`) }
  }

  // ---------------------------------------------------------------- TESTIMONIALS
  console.log('→ Testimonials...')
  const testimonialDefs = [
    { studentName: 'Rahul Chauhan', batch: '2020-2024', program: 'btech-cse', company: 'Infosys', designation: 'Systems Engineer', testimonialText: 'SERI gave me the technical skills and confidence to crack campus placements. The faculty guidance was exceptional throughout my journey.' },
    { studentName: 'Priya Sharma', batch: '2019-2023', program: 'btech-cse', company: 'TCS', designation: 'Software Engineer', testimonialText: 'The placement cell at SERI is outstanding. Mock interviews and aptitude training sessions made all the difference for me.' },
    { studentName: 'Aditya Kumar', batch: '2020-2024', program: 'btech-mechanical', company: 'Wipro', designation: 'Graduate Engineer Trainee', testimonialText: 'Hands-on labs and supportive mentors prepared me well for the industry. Proud to be a SERI alumnus.' },
    { studentName: 'Sneha Verma', batch: '2021-2023', program: 'mba-tech', company: 'HDFC Bank', designation: 'Management Trainee', testimonialText: 'The MBA program balanced theory with real business simulations. Placements and faculty support were top-notch.' },
    { studentName: 'Mohit Yadav', batch: '2019-2023', program: 'btech-ece', company: 'HCL Technologies', designation: 'Embedded Engineer', testimonialText: 'The VLSI and embedded labs at SERI are excellent. I gained practical skills that employers really value.' },
    { studentName: 'Ananya Singh', batch: '2020-2024', program: 'btech-cse', company: 'Cognizant', designation: 'Programmer Analyst', testimonialText: 'From day one the faculty pushed us to build real projects. That made campus interviews so much easier.' },
    { studentName: 'Karan Malhotra', batch: '2018-2022', program: 'btech-civil', company: 'L&T Construction', designation: 'Site Engineer', testimonialText: 'SERI’s industry visits and strong fundamentals helped me step confidently into a core engineering role.' },
    { studentName: 'Ishita Rao', batch: '2021-2023', program: 'mtech-cs', company: 'Tech Mahindra', designation: 'Research Engineer', testimonialText: 'The research culture at SERI is inspiring. I published my first paper here and landed my dream job.' },
  ]
  for (const t of testimonialDefs) {
    try {
      const { program, ...rest } = t
      await payload.create({ collection: 'testimonials', data: { ...rest, program: programs[program], rating: 5, profileImage: studentImg, featured: true, status: 'published' } as never })
      bump('testimonials'); ok(`Testimonial: ${t.studentName}`)
    } catch (e) { warn(`Testimonial ${t.studentName}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- RECRUITERS
  console.log('→ Recruiters...')
  const recruiterDefs: [string, string, number, number][] = [
    ['TCS', 'platinum', 45, 350000], ['Infosys', 'platinum', 38, 360000], ['Wipro', 'platinum', 32, 340000], ['HCL Technologies', 'platinum', 28, 380000],
    ['Cognizant', 'gold', 24, 400000], ['Tech Mahindra', 'gold', 20, 390000], ['L&T Technology', 'gold', 16, 420000], ['Maruti Suzuki', 'gold', 14, 450000],
    ['HDFC Bank', 'silver', 12, 380000], ['ICICI Bank', 'silver', 10, 370000], ['Byjus', 'silver', 9, 360000], ['Ola', 'silver', 8, 500000], ['Zomato', 'silver', 7, 520000],
    ['Various Startups', 'regular', 15, 300000], ['Government PSUs', 'regular', 10, 600000],
  ]
  const recruiterIds: string[] = []
  for (const [name, tier, hired, avg] of recruiterDefs) {
    try {
      const logo = await media(`https://placehold.co/240x100/1a3c6e/c8a951/png?text=${encodeURIComponent(name)}`, `${name} logo`)
      const d = (await payload.create({ collection: 'recruiters', data: { name, logo, tier, studentsHired: hired, averagePackage: avg, featured: tier === 'platinum' || tier === 'gold' } as never })) as AnyDoc
      recruiterIds.push(d.id); bump('recruiters'); ok(`Recruiter: ${name}`)
    } catch (e) { warn(`Recruiter ${name}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- PLACEMENTS
  console.log('→ Placements...')
  try {
    await payload.create({ collection: 'placements', data: {
      year: 2024, totalStudents: 480, studentsPlaced: 456, highestPackage: 14, averagePackage: 5.2, recruitersCount: 120,
      topRecruiters: recruiterIds.slice(0, 8),
      highlights: [{ label: 'Overall Placement', value: '95%' }, { label: 'Highest Package', value: '₹14 LPA' }, { label: 'Companies', value: '120+' }],
    } as never })
    bump('placements'); ok('Placement record: 2024')
  } catch (e) { warn(`Placements: ${(e as Error).message}`) }

  // ---------------------------------------------------------------- GALLERY
  console.log('→ Gallery...')
  const galleryDefs: [string, string, string[]][] = [
    ['Campus Infrastructure', 'campus', [galleryImg.campus, galleryImg.library, galleryImg.hostel]],
    ['Annual Tech Fest 2024', 'events', [galleryImg.fest, galleryImg.campus]],
    ['Laboratory Facilities', 'labs', [galleryImg.labs, galleryImg.library]],
    ['Hostel & Amenities', 'hostels', [galleryImg.hostel, galleryImg.campus]],
    ['Sports & Cultural Events', 'sports', [galleryImg.sports, galleryImg.fest]],
  ]
  for (const [title, category, imgs] of galleryDefs) {
    try {
      await payload.create({ collection: 'gallery', data: { title, category, images: imgs.map((image) => ({ image })), date: '2024-12-01T00:00:00.000Z', featured: category === 'campus', status: 'published' } as never })
      bump('gallery'); ok(`Gallery: ${title}`)
    } catch (e) { warn(`Gallery ${title}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- DOWNLOADS
  console.log('→ Downloads...')
  const downloadDefs: [string, string, string][] = [
    ['Admission Brochure 2025-26', 'Complete prospectus with programs, fees and campus details.', 'brochure'],
    ['B.Tech CSE Syllabus', 'Detailed syllabus for B.Tech Computer Science.', 'syllabus'],
    ['Scholarship Application Form', 'Form to apply for merit and need-based scholarships.', 'form'],
    ['Fee Structure 2025-26', 'Program-wise fee structure for the 2025-26 session.', 'notice'],
    ['Hostel Rules & Regulations', 'Rules and code of conduct for hostel residents.', 'notice'],
    ['Anti-Ragging Policy', 'Mandatory anti-ragging policy and undertaking.', 'notice'],
    ['Library Rules', 'Central library usage rules and timings.', 'notice'],
    ['B.Tech Mechanical Syllabus', 'Detailed syllabus for B.Tech Mechanical Engineering.', 'syllabus'],
  ]
  for (const [title, description, category] of downloadDefs) {
    try {
      await payload.create({ collection: 'downloads', data: { title, description, category, file: pdfId, featured: category === 'brochure', status: 'published', publishedAt: '2025-01-01T00:00:00.000Z' } as never })
      bump('downloads'); ok(`Download: ${title}`)
    } catch (e) { warn(`Download ${title}: ${(e as Error).message}`) }
  }

  // ---------------------------------------------------------------- ADMISSIONS
  console.log('→ Admissions...')
  try {
    await payload.create({ collection: 'admissions', data: {
      title: 'Admissions 2025-26',
      importantDates: [
        { event: 'Applications Open', date: '01 January 2025' },
        { event: 'Last Date to Apply', date: '31 March 2025' },
        { event: 'Counselling Begins', date: '15 April 2025' },
        { event: 'Classes Commence', date: '01 August 2025' },
      ],
      documentChecklist: [
        { document: '10th Marksheet' }, { document: '12th Marksheet' }, { document: 'Migration Certificate' },
        { document: 'Transfer Certificate' }, { document: 'Entrance Exam Scorecard (JEE / State CET)' },
        { document: 'Category Certificate (if applicable)' }, { document: 'Passport-size Photographs' }, { document: 'Aadhaar Card' },
      ],
      status: 'published',
    } as never })
    bump('admissions'); ok('Admissions: 2025-26')
  } catch (e) { warn(`Admissions: ${(e as Error).message}`) }

  // ---------------------------------------------------------------- GLOBALS
  console.log('→ Globals...')
  const logoId = await media('https://placehold.co/240x100/0f1f3d/c8a951/png?text=SERI', 'SERI logo')
  try {
    await payload.updateGlobal({ slug: 'site-settings', data: {
      siteName: 'SITASRM Engineering & Research Institute',
      tagline: 'Shaping Engineers, Building Futures',
      logo: logoId,
      phone: [{ number: '98765 43210' }, { number: '0124-4567890' }],
      email: [{ address: 'admissions@seri.net.in' }, { address: 'info@seri.net.in' }],
      address: 'NH-48, Delhi-Rohtak Road, Bahadurgarh, Haryana - 124507',
      mapEmbedUrl: 'https://www.google.com/maps?q=Bahadurgarh+Haryana&output=embed',
      socialLinks: { facebook: 'https://facebook.com/seriharyana', instagram: 'https://instagram.com/seri.net.in', linkedin: 'https://linkedin.com/school/seri-haryana', youtube: 'https://youtube.com/@seriharyana' },
      announcementBanner: { enabled: true, message: 'Admissions Open for 2025-26 · Last Date: March 31, 2025', type: 'urgent', link: '/admissions/apply' },
      stats: { establishedYear: 2008, programCount: 8, facultyCount: 60, studentCount: 2000, placementPercent: 95, campusAcres: 15 },
    } as never })
    bump('globals'); ok('Global: Site Settings')
  } catch (e) { warn(`Site Settings: ${(e as Error).message}`) }

  try {
    await payload.updateGlobal({ slug: 'navigation', data: {
      primaryNav: [
        { label: 'Home', href: '/' },
        { label: 'Programs', href: '/programs', children: [{ label: 'B.Tech CSE', href: '/programs/btech-cse' }, { label: 'B.Tech Mechanical', href: '/programs/btech-mechanical' }, { label: 'M.Tech CS', href: '/programs/mtech-cs' }, { label: 'MBA', href: '/programs/mba-tech' }, { label: 'All Programs', href: '/programs' }] },
        { label: 'Departments', href: '/departments' },
        { label: 'Admissions', href: '/admissions', children: [{ label: 'How to Apply', href: '/admissions/apply' }, { label: 'Admission Process', href: '/admissions' }, { label: 'Downloads', href: '/downloads' }, { label: 'FAQ', href: '/faq' }] },
        { label: 'Placements', href: '/placements' },
        { label: 'Campus', href: '/gallery', children: [{ label: 'Gallery', href: '/gallery' }, { label: 'Events', href: '/events' }, { label: 'News', href: '/news' }] },
        { label: 'Contact', href: '/contact' },
      ],
      ctaButton: { label: 'Apply Now', href: '/admissions/apply', variant: 'primary' },
    } as never })
    bump('globals'); ok('Global: Navigation')
  } catch (e) { warn(`Navigation: ${(e as Error).message}`) }

  try {
    await payload.updateGlobal({ slug: 'footer', data: {
      columns: [
        { heading: 'Programs', links: [{ label: 'B.Tech CSE', href: '/programs/btech-cse' }, { label: 'B.Tech Mechanical', href: '/programs/btech-mechanical' }, { label: 'MBA', href: '/programs/mba-tech' }, { label: 'M.Tech CS', href: '/programs/mtech-cs' }] },
        { heading: 'Quick Links', links: [{ label: 'About', href: '/about' }, { label: 'Admissions', href: '/admissions' }, { label: 'Placements', href: '/placements' }, { label: 'Downloads', href: '/downloads' }] },
        { heading: 'Resources', links: [{ label: 'News', href: '/news' }, { label: 'Events', href: '/events' }, { label: 'Gallery', href: '/gallery' }, { label: 'FAQ', href: '/faq' }] },
        { heading: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms', href: '/terms' }, { label: 'Refund Policy', href: '/refund-policy' }] },
      ],
      bottomLinks: [{ label: 'Privacy', href: '/privacy-policy' }, { label: 'Terms', href: '/terms' }],
      copyrightText: '© 2025 SITASRM Engineering & Research Institute, Bahadurgarh, Haryana. All rights reserved.',
      showSocialLinks: true,
    } as never })
    bump('globals'); ok('Global: Footer')
  } catch (e) { warn(`Footer: ${(e as Error).message}`) }

  // ---- Summary ----
  console.log('\n──────── Seed Summary ────────')
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(14)} ${v}`)
  console.log('──────────────────────────────')

  // ---- Best-effort ISR revalidation (if dev/prod server is running) ----
  if (process.env.REVALIDATION_SECRET) {
    try {
      await fetch(`${SERVER_URL}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REVALIDATION_SECRET}` },
        body: JSON.stringify({ path: '/' }),
      })
      console.log('  ↻ Requested ISR revalidation for /')
    } catch { /* server may not be running */ }
  }

  console.log('\n✅ Seed complete.\n')
  process.exit(0)
}

main().catch((e) => { console.error('Seed failed:', e); process.exit(1) })
