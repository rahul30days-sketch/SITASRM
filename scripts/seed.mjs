// Comprehensive seed for local development — real content extracted from https://www.seri.net.in
// Run with: node scripts/seed.mjs   (dev server must be running on http://localhost:3000)
//
// NOTE: Faculty members (other than the Director), recruiters, placement numbers,
// and testimonials are PLACEHOLDERS for demo purposes — replace them with real data
// in the admin panel. Everything else (institute info, programs, departments,
// facilities, contact, social, blog titles) is from the live site.
import { MongoClient } from 'mongodb'
import sharp from 'sharp'

const BASE = process.env.SEED_BASE_URL || 'http://localhost:3000/api'
const DB_URI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017'
const DB_NAME = 'seri'

const ADMIN = { email: 'rahul@30days.in', password: 'SeriAdmin@2026', name: 'Rahul', role: 'superAdmin' }

let token = ''

async function clean() {
  const mongo = new MongoClient(DB_URI)
  await mongo.connect()
  const db = mongo.db(DB_NAME)
  const cols = ['users', 'programs', 'faculties', 'departments', 'news', 'events',
    'testimonials', 'recruiters', 'placements', 'downloads', 'admissions', 'galleries',
    'media', 'payload-locked-documents']
  for (const c of cols) {
    try { const r = await db.collection(c).deleteMany({}); if (r.deletedCount) console.log(`  cleared ${c}: ${r.deletedCount}`) } catch {}
  }
  await mongo.close()
}

async function register() {
  const r = await fetch(`${BASE}/users/first-register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ADMIN),
  })
  const j = await r.json()
  if (!r.ok || !j.token) { console.log('FAILED admin:', r.status, JSON.stringify(j)); process.exit(1) }
  token = j.token
  console.log(`Admin: ${ADMIN.email}`)
}

async function create(pathname, data, label) {
  const r = await fetch(`${BASE}${pathname}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `payload-token=${token}` },
    body: JSON.stringify(data),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) { console.log(`  ✗ ${label}: ${r.status} ${JSON.stringify(j.errors || j).slice(0, 240)}`); return null }
  console.log(`  ✓ ${label}`)
  return j.doc || j
}

async function setGlobal(slug, data, label) {
  const r = await fetch(`${BASE}/globals/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `payload-token=${token}` },
    body: JSON.stringify(data),
  })
  const j = await r.json().catch(() => ({}))
  console.log(r.ok ? `  ✓ ${label}` : `  ✗ ${label}: ${r.status} ${JSON.stringify(j.errors || j).slice(0, 240)}`)
}

async function uploadMedia(buf, filename, alt) {
  const fd = new FormData()
  fd.append('file', new Blob([buf], { type: 'image/png' }), filename)
  fd.append('_payload', JSON.stringify({ alt, category: 'image' }))
  const r = await fetch(`${BASE}/media`, { method: 'POST', headers: { Cookie: `payload-token=${token}` }, body: fd })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) { console.log(`  ✗ media ${filename}: ${r.status} ${JSON.stringify(j.errors || j).slice(0, 200)}`); return null }
  return (j.doc || j).id
}

async function placeholder(w, h, rgb) {
  return sharp({ create: { width: w, height: h, channels: 4, background: { ...rgb, alpha: 1 } } }).png().toBuffer()
}

async function main() {
  console.log('Cleaning...')
  await clean()
  await register()

  // ---- Placeholder media ----
  console.log('Uploading placeholder media...')
  const logoId = await uploadMedia(await placeholder(400, 400, { r: 26, g: 60, b: 110 }), 'seri-logo.png', 'SERI logo')
  const wideId = await uploadMedia(await placeholder(1200, 630, { r: 26, g: 60, b: 110 }), 'seri-campus.png', 'SERI campus')
  const sqId = await uploadMedia(await placeholder(600, 600, { r: 200, g: 169, b: 81 }), 'seri-square.png', 'SERI placeholder')

  // ---- Programs (real content from seri.net.in) ----
  console.log('Seeding programs...')
  const AFFIL = 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)'
  const programDefs = [
    {
      name: 'B.Tech in Computer Science & Engineering (CSE)', slug: 'btech-cse', category: 'undergraduate', duration: '4 Years',
      shortDescription: 'A 4-year program building a strong foundation in computing, programming, software development, and problem-solving with hands-on labs and industry exposure.',
      careers: ['Software Developer', 'Full Stack Developer', 'System Engineer', 'Database Administrator', 'Cloud Support Associate', 'IT Analyst'],
      highlights: [{ label: 'Specializations', value: 'Cloud / AI / Cybersecurity' }, { label: 'Approach', value: 'Hands-on & Project-based' }],
    },
    {
      name: 'B.Tech in CSE (Artificial Intelligence & Machine Learning)', slug: 'btech-aiml', category: 'undergraduate', duration: '4 Years',
      shortDescription: 'Specialization in AI & ML blending computer science fundamentals with applied AI — covering self-driving systems, AI drones, robotics, and predictive analytics.',
      careers: ['ML Engineer', 'AI Developer', 'Data Scientist', 'Algorithm Developer', 'Software Engineer'],
      highlights: [{ label: 'Focus', value: 'AI / ML / Robotics' }, { label: 'Approach', value: 'Interdisciplinary' }],
    },
    {
      name: 'B.Tech in Computer Science & Information Technology (CS&IT)', slug: 'btech-csit', category: 'undergraduate', duration: '4 Years',
      shortDescription: 'Integrates core computer science with IT-specific areas like cloud computing, cybersecurity, web & mobile development, and data science.',
      careers: ['Software Developer', 'Cloud Engineer', 'Cybersecurity Analyst', 'Network Engineer', 'Database Administrator'],
      highlights: [{ label: 'Focus', value: 'Cloud / Security / Web' }, { label: 'Approach', value: 'Emerging Tech' }],
    },
    {
      name: 'B.Tech in Electronics & Communication Engineering (ECE)', slug: 'btech-ec', category: 'undergraduate', duration: '4 Years',
      shortDescription: 'Prepares students for careers in electronic devices, circuits, and communication systems — microelectronics, wireless, satellite and optical communication.',
      careers: ['Electronics Engineer', 'Communication Systems Engineer', 'Embedded Systems Engineer', 'VLSI Design Engineer', 'Research Associate'],
      highlights: [{ label: 'Focus', value: 'Microelectronics / Comms' }, { label: 'Approach', value: 'Theory + Practical' }],
    },
    {
      name: 'Master of Business Administration (MBA)', slug: 'mba', category: 'postgraduate', duration: '2 Years',
      shortDescription: 'Two-year program developing socially conscious, globally aware business leaders through simulations, projects, internships and industry interaction.',
      careers: ['Business Analyst', 'Marketing Manager', 'HR Manager', 'Finance Analyst', 'Operations Manager', 'Entrepreneur'],
      highlights: [{ label: 'Specializations', value: 'HR / Marketing / Finance / IB' }, { label: 'Focus', value: 'Industry 4.0' }],
    },
  ]
  const programIds = {}
  for (const p of programDefs) {
    const doc = await create('/programs', {
      name: p.name, slug: p.slug, category: p.category, duration: p.duration,
      shortDescription: p.shortDescription,
      affiliatedTo: AFFIL,
      approvedBy: [{ body: 'AICTE' }, { body: 'AKTU' }],
      careerOpportunities: p.careers.map((role) => ({ role })),
      highlights: p.highlights,
      fees: { scholarshipAvailable: true, feesNote: 'Please contact the admissions office for the latest fee structure and scholarship details.' },
      featuredImage: wideId, featured: true, status: 'published',
    }, `program: ${p.slug}`)
    if (doc) programIds[p.slug] = doc.id
  }

  // ---- Faculty (Director is real; others are PLACEHOLDERS) ----
  console.log('Seeding faculty...')
  const facultyDefs = [
    { name: 'Dr. S.R. Pandey', slug: 'dr-sr-pandey', designation: 'Director', qualification: 'Ph.D. (IIT Kharagpur)', specialization: 'Engineering & Research', experienceYears: 25, isHOD: false, featured: true },
    { name: 'Dr. Anjali Verma', slug: 'dr-anjali-verma', designation: 'Professor & Head, Computer Science', qualification: 'Ph.D., M.Tech (CSE)', specialization: 'AI, Machine Learning', experienceYears: 16, isHOD: true, featured: true, dept: 'cse' },
    { name: 'Dr. Rajesh Kumar', slug: 'dr-rajesh-kumar', designation: 'Professor & Head, Electronics', qualification: 'Ph.D. (ECE)', specialization: 'VLSI, Communication Systems', experienceYears: 18, isHOD: true, featured: true, dept: 'ece' },
    { name: 'Dr. Priya Nair', slug: 'dr-priya-nair', designation: 'Professor & Head, Management', qualification: 'Ph.D., MBA', specialization: 'Finance, Strategy', experienceYears: 14, isHOD: true, featured: true, dept: 'mba' },
    { name: 'Prof. Amit Sharma', slug: 'prof-amit-sharma', designation: 'Associate Professor, AI/ML', qualification: 'M.Tech (AI), Ph.D. (pursuing)', specialization: 'Deep Learning, NLP', experienceYears: 9, featured: true, dept: 'cse' },
    { name: 'Prof. Neha Gupta', slug: 'prof-neha-gupta', designation: 'Assistant Professor, IT', qualification: 'M.Tech (IT)', specialization: 'Cloud, Cybersecurity', experienceYears: 7, featured: false, dept: 'cse' },
  ]
  const facultyIds = {}
  for (const f of facultyDefs) {
    const doc = await create('/faculty', {
      name: f.name, slug: f.slug, designation: f.designation, qualification: f.qualification,
      specialization: f.specialization, experienceYears: f.experienceYears,
      researchInterests: f.specialization.split(',').map((t) => ({ topic: t.trim() })),
      profileImage: sqId, isHOD: !!f.isHOD, featured: !!f.featured, status: 'published',
    }, `faculty: ${f.slug}`)
    if (doc) { facultyIds[f.slug] = doc.id; f.id = doc.id }
  }

  // ---- Departments ----
  console.log('Seeding departments...')
  const deptDefs = [
    { name: 'Computer Science & Engineering', slug: 'cse', hod: 'dr-anjali-verma', programs: ['btech-cse', 'btech-aiml', 'btech-csit'],
      shortDescription: 'Programs in CSE, AI/ML and CS&IT with strong industry collaboration and modern computing labs.',
      vision: 'To be a center of excellence in computing education, research and innovation.',
      facilities: [{ name: 'Computer Programming Lab', description: '200+ computers with licensed software and 300 Mbps connectivity.' }, { name: 'AI / Research Lab', description: 'Advanced AI and interdisciplinary research facilities.' }] },
    { name: 'Electronics & Communication Engineering', slug: 'ece', hod: 'dr-rajesh-kumar', programs: ['btech-ec'],
      shortDescription: 'Focuses on electronic devices, communication systems, microelectronics and signal processing.',
      vision: 'To develop competent engineers for the electronics and communication industry.',
      facilities: [{ name: 'Electronics Lab', description: 'Hardware kits and instrumentation for circuits and communication.' }, { name: 'Electrical Lab', description: 'Practical training for electrical and electronic systems.' }] },
    { name: 'Management Studies (MBA)', slug: 'management', hod: 'dr-priya-nair', programs: ['mba'],
      shortDescription: 'Dual-specialization MBA developing socially conscious, globally aware business leaders.',
      vision: 'To nurture ethical, industry-ready management professionals.',
      facilities: [{ name: 'Entrepreneurship Lab', description: 'Incubation and startup mentoring facilities.' }, { name: 'Conference Halls', description: 'Two AC conference halls for seminars and video conferences.' }] },
  ]
  const deptIds = {}
  for (const d of deptDefs) {
    const doc = await create('/departments', {
      name: d.name, slug: d.slug, shortDescription: d.shortDescription, vision: d.vision,
      hod: facultyIds[d.hod], programs: d.programs.map((s) => programIds[s]).filter(Boolean),
      facilities: d.facilities, status: 'published',
    }, `department: ${d.slug}`)
    if (doc) deptIds[d.slug] = doc.id
  }

  // Link faculty -> department
  console.log('Linking faculty to departments...')
  const facDept = { 'dr-anjali-verma': 'cse', 'prof-amit-sharma': 'cse', 'prof-neha-gupta': 'cse', 'dr-rajesh-kumar': 'ece', 'dr-priya-nair': 'management' }
  for (const [fac, dep] of Object.entries(facDept)) {
    if (facultyIds[fac] && deptIds[dep]) {
      await fetch(`${BASE}/faculty/${facultyIds[fac]}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', Cookie: `payload-token=${token}` },
        body: JSON.stringify({ department: deptIds[dep] }),
      })
    }
  }
  console.log('  ✓ faculty departments linked')

  // ---- News (real blog titles from the live site) ----
  console.log('Seeding news...')
  const newsDefs = [
    { title: 'The Rise of AI-Powered Marketing: What MBA Students Need to Know', slug: 'ai-powered-marketing-guide-for-mba-students', type: 'news', publishedAt: '2026-06-19T10:00:00.000Z', excerpt: 'How AI is reshaping marketing and what every MBA student should learn to stay ahead.', tags: ['MBA', 'AI', 'Marketing'] },
    { title: 'Understanding the Role of an Electrical Engineer', slug: 'role-of-an-electrical-engineer-and-ece-career-guide', type: 'news', publishedAt: '2026-06-17T10:00:00.000Z', excerpt: 'A career guide to electrical and electronics & communication engineering roles.', tags: ['ECE', 'Careers'] },
    { title: 'Digital Marketing Trends in India 2026 Every MBA Student Should Know', slug: 'digital-marketing-trends-in-india-2026-mba-students', type: 'news', publishedAt: '2026-06-17T09:00:00.000Z', excerpt: 'The digital marketing trends shaping India in 2026 and their impact on business.', tags: ['MBA', 'Digital Marketing'] },
    { title: 'Admissions Open for 2026-28 Academic Cycle', slug: 'admissions-open-2026-28', type: 'announcement', publishedAt: '2026-06-01T09:00:00.000Z', excerpt: 'Applications are now open for B.Tech and MBA programs for the 2026-28 cycle.', tags: ['Admissions'] },
  ]
  for (const n of newsDefs) await create('/news', { ...n, tags: (n.tags || []).map((t) => ({ tag: t })), featuredImage: wideId, status: 'published' }, `news: ${n.slug}`)

  // ---- Events (upcoming) ----
  console.log('Seeding events...')
  const eventDefs = [
    { title: 'TechFest 2026 — Annual Technical Symposium', slug: 'techfest-2026', type: 'academic', startDate: '2026-08-14T09:00:00.000Z', endDate: '2026-08-15T17:00:00.000Z', venue: 'SERI Auditorium, Greater Noida', shortDescription: 'Two days of coding contests, project expos, workshops and tech talks.', isFeatured: true },
    { title: 'Industry Connect: Placement Readiness Workshop', slug: 'placement-readiness-workshop', type: 'placement', startDate: '2026-07-20T10:00:00.000Z', venue: 'Conference Hall A', shortDescription: 'Resume building, mock interviews and aptitude training with industry mentors.', isFeatured: false },
    { title: 'AI & Machine Learning Hands-on Bootcamp', slug: 'aiml-bootcamp-2026', type: 'workshop', startDate: '2026-07-28T09:30:00.000Z', endDate: '2026-07-30T16:00:00.000Z', venue: 'AI Research Lab', shortDescription: 'A 3-day practical bootcamp on building and deploying ML models.', isFeatured: true },
    { title: 'Annual Cultural Fest — Spandan', slug: 'cultural-fest-spandan-2026', type: 'cultural', startDate: '2026-09-05T11:00:00.000Z', venue: 'Campus Grounds', shortDescription: 'Music, dance, drama and celebrations across the SERI campus.', isFeatured: false },
  ]
  for (const e of eventDefs) await create('/events', { ...e, status: 'published' }, `event: ${e.slug}`)

  // ---- Testimonials (PLACEHOLDER) ----
  console.log('Seeding testimonials...')
  const testimonialDefs = [
    { studentName: 'Rohit Singh', batch: '2024', program: 'btech-cse', company: 'Tech Mahindra', designation: 'Software Engineer', rating: 5, testimonialText: 'The hands-on labs and placement training at SERI gave me the confidence and skills to land my dream job.' },
    { studentName: 'Sneha Agarwal', batch: '2024', program: 'mba', company: 'HDFC Bank', designation: 'Management Trainee', rating: 5, testimonialText: 'The MBA program’s industry interactions and live projects prepared me well for the corporate world.' },
    { studentName: 'Arjun Mehta', batch: '2023', program: 'btech-aiml', company: 'Wipro', designation: 'ML Engineer', rating: 4, testimonialText: 'Specializing in AI/ML here opened doors to roles I had only dreamed of. Great faculty support.' },
    { studentName: 'Pooja Sharma', batch: '2023', program: 'btech-ec', company: 'HCLTech', designation: 'Embedded Engineer', rating: 5, testimonialText: 'Excellent labs and supportive mentors. The ECE department truly prepares you for industry.' },
  ]
  for (const t of testimonialDefs) await create('/testimonials', { ...t, program: programIds[t.program], featured: true, status: 'published' }, `testimonial: ${t.studentName}`)

  // ---- Recruiters (PLACEHOLDER companies) ----
  console.log('Seeding recruiters...')
  const recruiterDefs = [
    { name: 'Tata Consultancy Services', tier: 'platinum', studentsHired: 42, averagePackage: 450000 },
    { name: 'Infosys', tier: 'platinum', studentsHired: 35, averagePackage: 480000 },
    { name: 'Wipro', tier: 'gold', studentsHired: 28, averagePackage: 420000 },
    { name: 'HCLTech', tier: 'gold', studentsHired: 24, averagePackage: 440000 },
    { name: 'Tech Mahindra', tier: 'gold', studentsHired: 20, averagePackage: 410000 },
    { name: 'Cognizant', tier: 'silver', studentsHired: 18, averagePackage: 460000 },
    { name: 'Accenture', tier: 'platinum', studentsHired: 22, averagePackage: 520000 },
    { name: 'Capgemini', tier: 'silver', studentsHired: 16, averagePackage: 400000 },
  ]
  const recruiterIds = []
  for (const rc of recruiterDefs) {
    const doc = await create('/recruiters', { ...rc, logo: logoId, featured: true }, `recruiter: ${rc.name}`)
    if (doc) recruiterIds.push(doc.id)
  }

  // ---- Placements (PLACEHOLDER stats) ----
  console.log('Seeding placements...')
  await create('/placements', {
    year: 2025, totalStudents: 320, studentsPlaced: 295, highestPackage: 1800000, averagePackage: 520000, recruitersCount: 60,
    topRecruiters: recruiterIds.slice(0, 6),
    highlights: [{ label: 'Placement Rate', value: '92%' }, { label: 'Highest Package', value: '₹18 LPA' }, { label: 'Recruiters', value: '60+' }],
  }, 'placements: 2025')

  // ---- Gallery ----
  console.log('Seeding gallery...')
  const galleryDefs = [
    { title: 'Campus Walkthrough', category: 'campus', featured: true },
    { title: 'Computer & AI Labs', category: 'labs', featured: false },
    { title: 'Sports & Recreation', category: 'sports', featured: false },
    { title: 'Cultural Events', category: 'cultural', featured: false },
  ]
  for (const g of galleryDefs) await create('/gallery', { title: g.title, category: g.category, images: [{ image: wideId }, { image: sqId }], featured: g.featured, date: '2026-03-15T00:00:00.000Z', status: 'published' }, `gallery: ${g.title}`)

  // ---- Downloads ----
  console.log('Seeding downloads...')
  const downloadDefs = [
    { title: 'SERI Prospectus 2026-27', description: 'Complete prospectus with programs, fees and campus details.', category: 'brochure' },
    { title: 'B.Tech Admission Form 2026', description: 'Application form for B.Tech programs.', category: 'form' },
    { title: 'MBA Syllabus', description: 'Detailed MBA course syllabus.', category: 'syllabus' },
    { title: 'Anti-Ragging Notice', description: 'Mandatory anti-ragging policy and undertaking.', category: 'notice' },
  ]
  for (const d of downloadDefs) await create('/downloads', { ...d, file: logoId, featured: d.category === 'brochure', status: 'published', publishedAt: '2026-05-01T00:00:00.000Z' }, `download: ${d.title}`)

  // ---- Admissions ----
  console.log('Seeding admissions...')
  await create('/admissions', {
    title: 'Admissions 2026-28',
    importantDates: [
      { event: 'Applications Open', date: '01 June 2026' },
      { event: 'Last Date to Apply', date: '31 July 2026' },
      { event: 'Counselling Begins', date: '10 August 2026' },
      { event: 'Classes Commence', date: '01 September 2026' },
    ],
    documentChecklist: [
      { document: '10th & 12th Mark Sheets' }, { document: 'Transfer Certificate' },
      { document: 'Migration Certificate' }, { document: 'Entrance Exam Scorecard (JEE/CUET/AKTU)' },
      { document: 'Category Certificate (if applicable)' }, { document: 'Passport-size Photographs' },
      { document: 'Aadhaar Card' },
    ],
    status: 'published',
  }, 'admissions: 2026-28')

  // ---- Globals ----
  console.log('Seeding globals...')
  await setGlobal('site-settings', {
    siteName: 'SITASRM Engineering & Research Institute',
    tagline: 'Mapping Your Education to Your Ambition',
    logo: logoId,
    phone: [{ number: '+91 92898 96157' }],
    email: [{ address: 'admissions@seri.net.in' }, { address: 'info@seri.net.in' }],
    address: 'Plot No. 14, Knowledge Park-III, Greater Noida, Uttar Pradesh 201306, India',
    mapEmbedUrl: 'https://www.google.com/maps?q=Knowledge+Park+III+Greater+Noida&output=embed',
    socialLinks: {
      facebook: 'https://facebook.com/sitasrm.seri/',
      instagram: 'https://instagram.com/seri.grnoida/',
      linkedin: 'https://linkedin.com/company/sitasrm-engineering-and-research-institute/',
      twitter: 'https://x.com/seri_grnoida',
    },
    announcementBanner: { enabled: true, message: 'Admissions Open for 2026-28 — Apply Now!', link: '/admissions/apply', type: 'urgent' },
    stats: { establishedYear: 2008, programCount: 5, facultyCount: 60, studentCount: 1200, placementPercent: 92, campusAcres: 10 },
  }, 'site-settings')

  await setGlobal('navigation', {
    primaryNav: [
      { label: 'About', href: '/about' },
      { label: 'Programs', href: '/programs', children: [
        { label: 'B.Tech CSE', href: '/programs/btech-cse' },
        { label: 'B.Tech AI/ML', href: '/programs/btech-aiml' },
        { label: 'B.Tech CS&IT', href: '/programs/btech-csit' },
        { label: 'B.Tech ECE', href: '/programs/btech-ec' },
        { label: 'MBA', href: '/programs/mba' },
      ] },
      { label: 'Departments', href: '/departments' },
      { label: 'Faculty', href: '/faculty' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Placements', href: '/placements' },
      { label: 'Campus', href: '/gallery', children: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'Events', href: '/events' },
        { label: 'News', href: '/news' },
      ] },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: { label: 'Apply Now', href: '/admissions/apply', variant: 'primary' },
  }, 'navigation')

  await setGlobal('footer', {
    columns: [
      { heading: 'Programs', links: [
        { label: 'B.Tech CSE', href: '/programs/btech-cse' },
        { label: 'B.Tech AI/ML', href: '/programs/btech-aiml' },
        { label: 'B.Tech ECE', href: '/programs/btech-ec' },
        { label: 'MBA', href: '/programs/mba' },
      ] },
      { heading: 'Quick Links', links: [
        { label: 'About Us', href: '/about' },
        { label: 'Admissions', href: '/admissions' },
        { label: 'Placements', href: '/placements' },
        { label: 'Downloads', href: '/downloads' },
      ] },
      { heading: 'Resources', links: [
        { label: 'News & Blog', href: '/news' },
        { label: 'Events', href: '/events' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'FAQ', href: '/faq' },
      ] },
      { heading: 'Legal', links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Refund Policy', href: '/refund-policy' },
      ] },
    ],
    bottomLinks: [{ label: 'Privacy', href: '/privacy-policy' }, { label: 'Terms', href: '/terms' }],
    copyrightText: '© 2026 SITASRM Engineering & Research Institute, Greater Noida. All rights reserved.',
    showSocialLinks: true,
  }, 'footer')

  console.log('\nSeed complete.')
  console.log(`\n  Admin login:  ${ADMIN.email}  /  ${ADMIN.password}`)
}

main().catch((e) => { console.error('Seed error:', e); process.exit(1) })
