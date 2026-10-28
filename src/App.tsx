import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Target } from 'lucide-react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './App.css';

const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

// The contact form opens a mailto: to this address
const CONTACT_EMAIL = 'arnabh@hubrave.com';

const socials = [
  { label: 'LinkedIn', handle: 'arnabhkushwaha', href: 'https://www.linkedin.com/in/arnabhkushwaha/', icon: <Linkedin size={14} /> },
  { label: 'GitHub', handle: 'ZenSensi', href: 'https://github.com/ZenSensi', icon: <Github size={14} /> },
];

// image: optional screenshot in public/ — shown instead of the live iframe preview
const projects: { title: string; url: string; category: string; image?: string }[] = [
  { title: 'We Care Dental Clinic', url: 'https://wecaredentalclinic.vercel.app/', category: 'Health + AI' },
  { title: 'Calmorithm', url: 'https://calmorithm.vercel.app/', category: 'Wellness + Tech' },
  { title: 'Attendixx', url: 'https://attendixx.vercel.app/', category: 'SaaS + Management' },
  { title: 'Hirok Labs', url: 'https://hiroklabs.vercel.app/', category: 'Dev Ops' },
  { title: 'Dashboard Demo', url: 'https://demodash-git-old-dashboard-arnabh-projects.vercel.app/', category: 'Product Design', image: '/projects/dashboard-demo.png' },
  { title: 'Testpanel', url: 'https://testpanel-automation-landing-page.vercel.app/', category: 'Automation' },
  { title: 'PyPrac4U', url: 'https://pyprac4u.vercel.app/', category: 'EdTech' },
  { title: 'NextGen Coaching', url: 'https://nextgencoachingclasses.vercel.app/', category: 'Education' },
];

const pad = (n: number) => String(n).padStart(2, '0');

// Photo with a graceful fallback: drop an image at public/<src> and it shows up
const Photo = ({ src, fallback }: { src: string; fallback: string }) => (
  <div className="photo">
    <span>{fallback}</span>
    <img src={src} alt="" onError={e => { e.currentTarget.style.display = 'none'; }} />
  </div>
);

// Live, scaled-down render of the project site (or its screenshot); mobile renders a phone-width viewport
const Preview = ({ url, title, image, mobile = false }: { url: string; title: string; image?: string; mobile?: boolean }) => (
  <div className={`preview ${mobile ? 'mobile' : ''}`}>
    {image && !mobile
      ? <img src={image} alt={`${title} screenshot`} loading="lazy" />
      : <iframe src={url} title={`${title} preview`} loading="lazy" tabIndex={-1} aria-hidden="true" />}
  </div>
);

const Laptop = ({ p }: { p: typeof projects[number] }) => (
  <div className="laptop">
    <div className="laptop-screen"><Preview url={p.url} title={p.title} image={p.image} /></div>
    <div className="laptop-base" />
  </div>
);

const Phone = ({ p }: { p: typeof projects[number] }) => (
  <div className="phone"><Preview url={p.url} title={p.title} mobile /></div>
);

const Screws = () => <><i className="screw tl" /><i className="screw tr" /><i className="screw bl" /><i className="screw br" /></>;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Topbar = () => (
  <header className="topbar">
    <Link to="/" className="brand">
      <span className="mono-logo">AK</span>
      <span><b>ARNABH.DEV</b><small>Web design / UX / Development</small></span>
    </Link>
    <nav>
      <a href="/#work" className="pill">Index</a>
      <a href="/#contact" className="lang">Contact</a>
    </nav>
  </header>
);

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .6 } };

const Hero = () => (
  <section className="hero">
    <h1 className="giant">Design</h1>

    <motion.div className="glass id-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}>
      <Screws />
      <div className="id-top"><b>ARNABH.DEV</b><span>Case study</span></div>
      <div className="id-main">
        <div className="avatar"><Photo src="/me.jpg" fallback="AK" /></div>
        <div>
          <h2>Arnabh<br />Kushwaha.</h2>
          <p className="mono">Web developer / UX designer</p>
        </div>
      </div>
      <div className="id-foot mono"><span>Role <b>UX / UI Design</b></span><span>Build <b>React development</b></span></div>
    </motion.div>

    <motion.div className="tag-card orange" initial={{ rotate: -12, opacity: 0 }} animate={{ rotate: -5, opacity: 1 }} transition={{ delay: .5 }}>
      <Screws />
      <small>Tech stack</small>
      <b>React</b>
      <span>TypeScript · Vite · Tailwind<br />Framer Motion · Python · AI</span>
    </motion.div>

    <motion.div className="tag-card blue" initial={{ rotate: 12, opacity: 0 }} animate={{ rotate: 4, opacity: 1 }} transition={{ delay: .6 }}>
      <Screws />
      <small>Projects / 2025—2026</small>
      <b>Portfolio<br />case studies</b>
      <span>Hubrave Agency</span>
    </motion.div>

    <motion.a href="#contact" className="next-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }} whileHover={{ y: -4 }}>
      <small>Next project?</small>
      <b>Contact me <ArrowUpRight size={14} /></b>
    </motion.a>

    <div className="ticket"><i /><b>2025 — 2026</b><span className="barcode" /></div>

    <div className="scope">
      <h2>Project scope <i className="dot" /></h2>
      <p>Designing and building fast, AI-ready web products — from first sketch to a live system for clinics, coaching institutes, SaaS teams and startups.</p>
    </div>
  </section>
);

const Intro = () => (
  <motion.section className="sec intro" {...fadeUp}>
    <div>
      <span className="num">01</span>
      <h2 className="head">From idea<br />to working<br />product.</h2>
    </div>
    <div className="intro-copy">
      <p><b>Hubrave</b> started as a simple idea. The question was never just how a business should look online, but how its offer, bookings and day-to-day work could live inside the same system.</p>
      <p>I'm Arnabh — a BCA student in Data Science &amp; AI and the founder of Hubrave. I design the interface, write the code and wire in AI where it actually helps.</p>
    </div>
    <div className="devices">
      <Laptop p={projects[4]} />
      <Phone p={projects[0]} />
      <Phone p={projects[2]} />
    </div>
  </motion.section>
);

const blocks = [
  { k: 'Design system', t: 'Design that\nscales.', flow: ['Figma', 'Tokens', 'Components'], tags: ['color', 'type', 'spacing', 'motion', 'states'], d: 'One source of truth drives every page, card and state across the product.' },
  { k: 'Frontend', t: 'Fast, modern\nfrontends.', flow: ['React', 'TypeScript', 'Tailwind'], tags: ['vite', 'framer-motion', 'routing', 'seo', 'a11y'], d: 'Responsive interfaces that load fast and feel smooth on every device.' },
  { k: 'Data / AI', t: 'AI where\nit helps.', flow: ['Data', 'Model', 'Feature'], tags: ['python', 'apis', 'automation', 'ml'], d: 'Data science turned into features people use, not demos that sit on a shelf.' },
  { k: 'Ship / Operate', t: 'From deploy\nto day two.', flow: ['Build', 'Deploy', 'Monitor'], tags: ['vercel', 'analytics', 'performance'], d: 'Every project goes live, gets measured and keeps getting better.' },
];

const Block = ({ b, i }: { b: typeof blocks[number]; i: number }) => (
  <div className={`glass-dark block b${i}`}>
    <Screws />
    <div className="block-top"><span className="num light">02.{i + 1}</span><small>{b.k}</small></div>
    <h3>{b.t.split('\n').map(l => <React.Fragment key={l}>{l}<br /></React.Fragment>)}</h3>
    <div className="flow">{b.flow.map((f, j) => <React.Fragment key={f}>{j > 0 && <ArrowRight size={11} />}<span>{f}</span></React.Fragment>)}</div>
    <div className="chips">{b.tags.map(t => <span key={t}>{t}</span>)}</div>
    <p>{b.d}</p>
  </div>
);

const Architecture = () => (
  <motion.section className="blueprint" {...fadeUp}>
    <svg className="wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M50 50 H38 V22 H30 M50 50 H62 V22 H70 M50 50 H38 V76 H30 M50 50 H62 V76 H70" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth=".15" />
    </svg>
    <div className="bp-grid">
      <Block b={blocks[0]} i={0} />
      <div className="glass-dark core">
        <Screws />
        <span className="core-label">Core / Hubrave</span>
        <small>Arnabh / System 01</small>
        <h3>Core stack</h3>
        <ul>
          <li><b>—</b> 8 live projects</li>
          <li><b>—</b> 6 industries</li>
          <li><b>—</b> 1 agency founded</li>
        </ul>
        <div className="status"><small>Status</small><i /> Connected</div>
      </div>
      <Block b={blocks[1]} i={1} />
      <Block b={blocks[2]} i={2} />
      <Block b={blocks[3]} i={3} />
    </div>
  </motion.section>
);

const Work = () => (
  <motion.section className="sec work" id="work" {...fadeUp}>
    <div className="work-head">
      <div>
        <span className="num">03</span>
        <h2 className="head">Same brand.<br />A better system.</h2>
      </div>
      <ul className="work-list">
        {projects.map(p => <li key={p.title}><i />{p.title}</li>)}
      </ul>
    </div>
    <div className="work-grid">
      {projects.map((p, i) => (
        <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" className="work-card">
          <p className="mono"><b>[{pad(i + 1)}] {p.title}</b><br />{p.category}</p>
          <Laptop p={p} />
        </a>
      ))}
    </div>
  </motion.section>
);

const layers = ['Frontend', 'Logic', 'Data', 'Automation'];

const Result = () => (
  <motion.section className="sec result" {...fadeUp}>
    <div>
      <span className="num">04</span>
      <h2 className="head small">The result isn't<br /><span className="brush">just a new look.</span></h2>
    </div>
    <div>
      <h2 className="head small">It's a system that<br />didn't exist before.</h2>
      <div className="objective">
        <Target size={18} />
        <div><b>Objective reached</b><p>A product that simplifies the owner's work, improves the experience for every user, and keeps growing over time.</p></div>
      </div>
    </div>
    <div className="stack3d" aria-hidden="true">
      {layers.map((l, i) => (
        <div key={l} className="layer" style={{ '--i': i } as React.CSSProperties}><i className="plane" /><span>{l}</span></div>
      ))}
    </div>
  </motion.section>
);

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New project from ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-main">
        <div className="f-id">
          <div className="f-avatar"><Photo src="/me.jpg" fallback="AK" /></div>
          <div>
            <b>Arnabh Kushwaha.</b>
            <small>Web developer / UX designer</small>
            <p className="mono">Plan. Organize. Clarify. Build.</p>
          </div>
        </div>
        <div className="f-contact">
          <a href={`mailto:${CONTACT_EMAIL}`}><small>[E-mail]</small><b>{CONTACT_EMAIL}</b><Mail size={14} /></a>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><small>[{s.label}]</small><b>{s.handle}</b>{s.icon}</a>
          ))}
        </div>
        <form className="f-form" onSubmit={submit}>
          <p className="mono form-title">Open for new projects in 2026</p>
          <div className="f-row">
            <label>Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
            <label>E-mail<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          </div>
          <label>Message<textarea rows={2} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label>
          <button type="submit">Let's build the project <ArrowRight size={14} /></button>
        </form>
      </div>
      <div className="footer-bottom mono">
        <span>Legal</span><span>2026</span>
        <Link to="/news">News</Link>
        <a href="https://hubrave.vercel.app/" target="_blank" rel="noopener noreferrer">Hubrave Agency ↗</a>
      </div>
    </footer>
  );
};

const Home = () => (
  <>
    <title>Arnabh Kushwaha | Portfolio & Digital Architect</title>
    <meta name="description" content="Portfolio of Arnabh Kushwaha (ZenSensi) - BCA Student in Data Science & AI, Web Developer, UX/UI Designer, and founder of Hubrave Agency. Building modern, high-performance digital products." />
    <link rel="canonical" href="https://arnabhkushwaha.com/" />
    <Hero />
    <Intro />
    <Architecture />
    <Work />
    <Result />
  </>
);

interface NewsItem { id: string; date: string; title: string; url: string; }

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Latest AI & Tech news from the Hacker News API (free, no key)
        const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=artificial+intelligence&tags=story&hitsPerPage=6');
        const data = await response.json();
        setNewsItems(data.hits.map((hit: any) => ({
          id: hit.objectID,
          date: new Date(hit.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          title: hit.title,
          url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        })));
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="sec news">
      <title>Latest Tech & AI News | Arnabh Kushwaha</title>
      <meta name="description" content="Stay updated with the latest trends in Artificial Intelligence, machine learning, and software engineering, curated by Arnabh Kushwaha." />
      <link rel="canonical" href="https://arnabhkushwaha.com/news" />
      <div>
        <span className="num">AI</span>
        <h1 className="head">Latest<br />news.</h1>
      </div>
      <div className="news-list">
        {loadingNews ? <p className="mono">Loading latest news...</p> : newsItems.map(n => (
          <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" className="news-item">
            <small className="mono">{n.date}</small>
            <span>{n.title} <ArrowUpRight size={14} /></span>
          </a>
        ))}
      </div>
    </section>
  );
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Topbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
