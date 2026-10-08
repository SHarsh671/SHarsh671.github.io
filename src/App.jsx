import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useInView, animate } from 'framer-motion'
import { ArrowUpRight, Mail, Download, ExternalLink, Menu, X, Code2, Database, Server, Terminal, MapPin, ShieldCheck, Layers } from 'lucide-react'
import './styles.css'

const GITHUB = 'https://github.com/SHarsh671'
const LINKEDIN = 'https://www.linkedin.com/in/harshmeet-s-1367083a6/'
const EMAIL = 'harshmeetsohi@gmail.com'

const projects = [
  {
    name: 'Job Application Management Platform',
    label: 'Featured Project',
    description: 'A full-stack job tracking platform built around applications, companies, interviews, statuses, and notes.',
    highlights: [
      'Built a Spring Boot REST API with 18 endpoints managing job applications, companies, interviews, statuses, and related notes',
      'Designed a normalized PostgreSQL schema with 6 tables using JPA/Hibernate, including indexes on frequently queried fields',
      'Implemented request validation, global exception handling, and 40+ JUnit tests achieving 80% test coverage',
      'Documented and tested the APIs with Postman and Swagger'
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA/Hibernate', 'JUnit', 'Maven'],
    repo: 'https://github.com/SHarsh671/job-application-management-platform',
    image: `${import.meta.env.BASE_URL}assets/images/project11.jpg`,
    accent: '01'
  },
  {
    name: 'Stock Portfolio Tracker',
    label: 'Backend Project',
    description: 'A portfolio management service for tracking holdings, transactions, portfolio value, and investment performance.',
    highlights: [
      'Built a portfolio management service with 14 REST endpoints tracking holdings, transactions, portfolio value, and performance',
      'Designed a relational PostgreSQL schema with 5 tables for portfolio and transaction management',
      'Implemented scheduled background jobs to refresh market data every 15 minutes and recalculate portfolio value',
      'Wrote 30+ JUnit tests covering portfolio calculations and core business logic'
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JUnit', 'REST'],
    repo: 'https://github.com/SHarsh671/stock-portfolio-tracker',
    image: `${import.meta.env.BASE_URL}assets/images/project2.webp`,
    accent: '02'
  },
  {
    name: 'AI Customer Support Assistant',
    label: 'AI Project',
    description: 'A retrieval-augmented support assistant that answers questions from a custom company knowledge base.',
    highlights: [
      'Built a RAG-based customer support assistant using a custom knowledge base of 25 documents',
      'Developed a FastAPI backend with PostgreSQL for storing application data and conversation history',
      'Integrated an LLM API to generate context-aware responses based on retrieved knowledge-base information'
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'OpenAI', 'RAG'],
    repo: 'https://github.com/SHarsh671/ai-customer-support-assistant',
    image: `${import.meta.env.BASE_URL}assets/images/project3.jpg`,
    accent: '03'
  }
]

const otherProjects = [
  {
    name: 'Due Date Tracker',
    description: 'A session-based deadline tracker with priority-based tasks and calendar synchronization.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    live: 'https://mcwta.vercel.app/'
  },
  {
    name: 'SmartCampus',
    description: 'A full-stack campus monitoring application with REST APIs and data visualization dashboards.',
    stack: ['React', 'REST APIs', 'Chart.js']
  }
]

const experience = [
  {
    role: 'Security Officer (Casual)',
    company: 'Paladin Security Group',
    date: 'Jun 2024 – Present',
    place: 'Burlington, ON',
    points: [
      'Monitor multi-camera CCTV and review footage to verify incidents at Burlington Centre',
      'Logged 50+ incidents and events in digital reports for supervisors and clients',
      'Covered 10+ events over 2+ years, following procedures while completing a CS degree and building projects'
    ]
  }
]

const skills = [
  { title: 'Languages', icon: Code2, items: ['Java', 'Python', 'JavaScript', 'SQL', 'C/C++'] },
  { title: 'Backend & Frameworks', icon: Server, items: ['Spring Boot', 'REST APIs', 'JPA/Hibernate', 'FastAPI', 'React'] },
  { title: 'Databases', icon: Database, items: ['PostgreSQL'] },
  { title: 'Testing & API Tools', icon: ShieldCheck, items: ['JUnit', 'Unit Testing', 'Postman', 'Swagger'] },
  { title: 'Developer Tools', icon: Terminal, items: ['Git', 'GitHub', 'Docker', 'Maven', 'Linux'] },
  { title: 'Practices', icon: Layers, items: ['OOP', 'SOLID Principles', 'RESTful API Design'] }
]

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } }

const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact']

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const photoY = useTransform(scrollY, [0, 600], [0, 80])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const navigate = (id) => {
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <div className="noise" />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <nav className="nav">
        <button className="brand" onClick={() => navigate('home')} aria-label="Go home">
          HS<span>.</span>
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {sections.map((item) => (
            <button key={item} className={active === item ? 'active' : ''} onClick={() => navigate(item)}>{item}</button>
          ))}
        </div>
        <a className="nav-github" href={GITHUB} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid" />
          <div className="container hero-content">
            <motion.div initial="hidden" animate="visible" variants={reveal} className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> Open to software engineering opportunities</div>
              <h1>Harshmeet <span>Singh</span></h1>
              <h2>New Grad <em>Software Engineer</em></h2>
              <p className="hero-text">Computer Science graduate from McMaster University building backend systems, APIs, and full-stack applications with Java, Spring Boot, Python, PostgreSQL, and React.</p>
              <div className="hero-actions">
                <button className="btn primary" onClick={() => navigate('projects')}>View projects <ArrowUpRight size={18} /></button>
                <a className="btn ghost" href={`${import.meta.env.BASE_URL}assets/resume/resume.pdf`} download>Resume <Download size={17} /></a>
              </div>
              <div className="social-row">
                <a href={GITHUB} target="_blank" rel="noreferrer"><Code2 size={19} /> github.com/SHarsh671</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer"><ExternalLink size={19} /> LinkedIn</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} style={{ y: photoY }} className="hero-photo-wrap">
              <div className="photo-orbit orbit-one" />
              <div className="photo-orbit orbit-two" />
              <div className="hero-photo-card">
                <img src={`${import.meta.env.BASE_URL}assets/images/profile1.png`} alt="Harshmeet Singh" />
                <div className="photo-caption"><span>harshmeet.singh</span><span>~/developer</span></div>
              </div>
            </motion.div>
          </div>
          <div className="scroll-cue">Scroll to explore <span /></div>
        </section>

        <section id="about" className="section">
          <div className="container narrow">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
              <p className="section-kicker">01 / About</p>
              <h2 className="section-title">Building things I can <span>explain.</span></h2>
              <div className="about-grid">
                <div className="about-copy">
                  <p>I’m a Computer Science graduate from McMaster University focused on software engineering and backend development. I enjoy turning ideas into working systems and learning the engineering decisions behind them.</p>
                  <p>Right now I’m deepening my Java and Spring Boot skills while building production-style projects around REST APIs, PostgreSQL, testing, Docker, and cloud deployment.</p>
                  <div className="location"><MapPin size={16} /> Hamilton, Ontario · Open to relocation</div>
                </div>
                <div className="about-card">
                  <div className="terminal-top"><span /><span /><span /></div>
                  <pre>{`$ whoami\nharshmeet-singh\n\n$ focus\nbackend + full-stack\n\n$ education\nMcMaster University · CS · 2026\n\n$ currently-learning\nJava → Spring Boot → AWS`}</pre>
                </div>
              </div>
              <div className="stats">
                <div><strong><CountUp to={3} /></strong><span>Backend and AI projects</span></div>
                <div><strong><CountUp to={32} /></strong><span>REST endpoints built</span></div>
                <div><strong><CountUp to={70} suffix="+" /></strong><span>JUnit tests written</span></div>
                <div><strong><CountUp to={2} suffix="+" /></strong><span>Years reliable on the job</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
              <p className="section-kicker">02 / Projects</p>
              <div className="section-heading-row"><h2 className="section-title">Things I’m <span>building.</span></h2><p>Backend-focused projects built with Java, Spring Boot, and PostgreSQL, plus an AI project in Python.</p></div>
            </motion.div>
            <div className="project-list">
              {projects.map((project, index) => (
                <motion.article key={project.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} variants={reveal} transition={{ delay: index * .08 }} className="project-card" onMouseMove={spotlight}>
                  <div className="project-image"><img src={project.image} alt={`${project.name} preview`} /><div className="project-number">{project.accent}</div></div>
                  <div className="project-content">
                    <div><span className="project-label">{project.label}</span><h3>{project.name}</h3><p>{project.description}</p><ul className="highlights">{project.highlights.map(h => <li key={h}>{h}</li>)}</ul></div>
                    <div><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.repo} target="_blank" rel="noreferrer">View repository <ExternalLink size={16} /></a></div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="other-wrap">
              <h3>Other work</h3>
              <div className="other-grid">{otherProjects.map(project => <div className="other-card" onMouseMove={spotlight} key={project.name}><div><h4>{project.name}</h4><p>{project.description}</p></div><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={15} /></a>}</div>)}</div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
              <p className="section-kicker">03 / Skills</p>
              <h2 className="section-title">My current <span>toolbox.</span></h2>
            </motion.div>
            <div className="skills-grid">{skills.map(({ title, icon: Icon, items }, i) => <motion.div key={title} className="skill-card" onMouseMove={spotlight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ delay: i * .08 }}><Icon size={21} /><h3>{title}</h3><div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div></motion.div>)}</div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container narrow">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
              <p className="section-kicker">04 / Experience</p>
              <h2 className="section-title">Reliable <span>by default.</span></h2>
              {experience.map(job => (
                <div className="exp-card" onMouseMove={spotlight} key={job.company}>
                  <div className="exp-head">
                    <div><h3>{job.role}</h3><p className="exp-company">{job.company} · {job.place}</p></div>
                    <span className="exp-date">{job.date}</span>
                  </div>
                  <ul className="highlights">{job.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container narrow">
            <motion.div className="contact-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
              <p className="section-kicker">05 / Contact</p>
              <h2>Let’s build something <span>useful.</span></h2>
              <p>I’m currently looking for entry-level software engineering opportunities. If you’re hiring, building something interesting, or just want to connect, feel free to reach out.</p>
              <div className="contact-actions"><a className="btn primary" href={`mailto:${EMAIL}`}><Mail size={17} /> {EMAIL}</a><a className="btn ghost" href={LINKEDIN} target="_blank" rel="noreferrer"><ExternalLink size={17} /> LinkedIn</a></div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer><div className="container footer-inner"><span>© {new Date().getFullYear()} Harshmeet Singh</span><span>Built with React · <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></span></div></footer>
    </div>
  )
}

export default App
