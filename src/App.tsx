import React, { useState, useEffect, useRef } from 'react';
import { motion, MotionConfig, type Variants, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Plus, Target } from 'lucide-react';
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
const SITE = 'https://arnabh.is-a.dev';
const HUBRAVE = 'https://www.hubrave.com/';

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
const Photo = ({ src, fallback, alt = '' }: { src: string; fallback: string; alt?: string }) => {
  const img = useRef<HTMLImageElement>(null);
  const hide = () => { if (img.current) img.current.style.display = 'none'; };
  // Prerendered images can fail before React attaches onError, so also check once mounted
  useEffect(() => { if (img.current?.complete && !img.current.naturalWidth) hide(); }, []);
  return (
    <div className="photo">
      <span>{fallback}</span>
      <img ref={img} src={src} alt={alt} onError={hide} />
    </div>
  );
};

// Live, scaled-down render of the project site (or its screenshot); mobile renders a phone-width viewport
const Preview = ({ url, title, image, mobile = false }: { url: string; title: string; image?: string; mobile?: boolean }) => (
  <div className={`preview ${mobile ? 'mobile' : ''}`}>
    {image && !mobile
      ? <img src={image} alt={`${title} screenshot`} loading="lazy" />
      : <iframe src={url} title={`${title} preview`} loading="lazy" tabIndex={-1} aria-hidden="true" />}
  </div>
);

const Laptop = ({ p, variants }: { p: typeof projects[number]; variants?: Variants }) => (
  <motion.div className="laptop" variants={variants}>
    <div className="laptop-screen"><Preview url={p.url} title={p.title} image={p.image} /></div>
    <div className="laptop-base" />
  </motion.div>
);

const Phone = ({ p, variants }: { p: typeof projects[number]; variants?: Variants }) => (
  <motion.div className="phone" variants={variants}><Preview url={p.url} title={p.title} mobile /></motion.div>
);

const Screws = () => <><i className="screw tl" /><i className="screw tr" /><i className="screw bl" /><i className="screw br" /></>;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Topbar = () => (
  <motion.header className="topbar" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7, ease }}>
    <Link to="/" className="brand">
      <span className="mono-logo">AK</span>
      <span><b>ARNABH.DEV</b><small>Web design / UX / Development</small></span>
    </Link>
    <nav>
      <a href="/#work" className="pill">Index</a>
      <a href="/#contact" className="lang">Contact</a>
    </nav>
  </motion.header>
);

const ease = [0.16, 1, 0.3, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: .1, delayChildren: .05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: .9, ease } } };
const pop: Variants = { hidden: { opacity: 0, y: 40, scale: .96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: .8, ease } } };
// Spread on a section: children with variants animate in, staggered, the first time it scrolls into view
const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: .15 }, variants: stagger } as const;

// Heading whose lines slide up from behind a mask
const Lines = ({ lines, className }: { lines: React.ReactNode[]; className: string }) => (
  <h2 className={className}>
    {lines.map((l, i) => (
      <span key={i} className="line-mask">
        <motion.span className="line" variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1, ease, delay: i * .08 } } }}>{l}</motion.span>
      </span>
    ))}
  </h2>
);

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orangeY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const blueY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // ID card tilts toward the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-.5, .5], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-.5, .5], [-9, 9]), { stiffness: 150, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - .5);
    my.set((e.clientY - r.top) / r.height - .5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <section className="hero" ref={ref} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.p className="giant" aria-hidden="true" style={{ y: wordY }}>
        {'Design'.split('').map((c, i) => (
          <motion.span key={i} initial={{ y: '40%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease, delay: i * .06 }}>{c}</motion.span>
        ))}
      </motion.p>

      <motion.div className="glass id-card" style={{ y: cardY, rotateX, rotateY, transformPerspective: 1000 }}
        initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, ease, delay: .35 }}>
        <Screws />
        <div className="id-top"><b>ARNABH.DEV</b><span>Case study</span></div>
        <div className="id-main">
          <div className="avatar"><Photo src="/me.jpg" fallback="AK" alt="Arnabh Kushwaha" /></div>
          <div>
            <h1>Arnabh{' '}<br />Kushwaha.<span className="sr-only"> (ZenSensi) — Web Developer &amp; UX/UI Designer, Founder of Hubrave</span></h1>
            <p className="mono">Web developer / UX designer</p>
          </div>
        </div>
        <div className="id-foot mono"><span>Role <b>UX / UI Design</b></span><span>Build <b>React development</b></span></div>
      </motion.div>

      <motion.div className="tag-card orange" style={{ y: orangeY }} initial={{ rotate: -16, opacity: 0, x: -50 }} animate={{ rotate: -5, opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 13, delay: .7 }} whileHover={{ rotate: -2, scale: 1.04 }}>
        <Screws />
        <small>Tech stack</small>
        <b>React</b>
        <span>TypeScript · Vite · Tailwind<br />Framer Motion · Python · AI</span>
      </motion.div>

      <motion.div className="tag-card blue" style={{ y: blueY }} initial={{ rotate: 16, opacity: 0, x: 50 }} animate={{ rotate: 4, opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 13, delay: .85 }} whileHover={{ rotate: 1, scale: 1.04 }}>
        <Screws />
        <small>Projects / 2025—2026</small>
        <b>Portfolio<br />case studies</b>
        <span>Hubrave Agency</span>
      </motion.div>

      <motion.a href="#contact" className="next-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease, delay: 1 }}
        whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: .97 }}>
        <small>Next project?</small>
        <b>Contact me <ArrowUpRight size={14} /></b>
      </motion.a>

      <motion.div className="ticket" initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 1.1, duration: .6 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
        <i /><b>2025 — 2026</b><span className="barcode" />
      </motion.div>

      <motion.div className="scope" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease, delay: .9 }}>
        <h2>Project scope <i className="dot" /></h2>
        <p>Designing and building fast, AI-ready web products — from first sketch to a live system for clinics, coaching institutes, SaaS teams and startups.</p>
      </motion.div>
    </section>
  );
};

const Intro = () => (
  <motion.section className="sec intro" {...inView}>
    <motion.div variants={rise}>
      <span className="num">01</span>
      <Lines className="head" lines={['From idea', 'to working', 'product.']} />
    </motion.div>
    <motion.div className="intro-copy" variants={rise}>
      <p><b>Hubrave</b> started as a simple idea. The question was never just how a business should look online, but how its offer, bookings and day-to-day work could live inside the same system.</p>
      <p>I'm Arnabh — a BCA student in Data Science &amp; AI and the founder of Hubrave. I design the interface, write the code and wire in AI where it actually helps.</p>
    </motion.div>
    <motion.div className="devices" variants={stagger}>
      <Laptop p={projects[4]} variants={{ hidden: { opacity: 0, x: 80 }, show: { opacity: 1, x: 0, transition: { duration: 1, ease } } }} />
      <Phone p={projects[0]} variants={{ hidden: { opacity: 0, y: 80, rotate: 8 }, show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } } }} />
      <Phone p={projects[2]} variants={{ hidden: { opacity: 0, y: 80, rotate: -8 }, show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } } }} />
    </motion.div>
  </motion.section>
);

const blocks = [
  { k: 'Design system', t: 'Design that\nscales.', flow: ['Figma', 'Tokens', 'Components'], tags: ['color', 'type', 'spacing', 'motion', 'states'], d: 'One source of truth drives every page, card and state across the product.' },
  { k: 'Frontend', t: 'Fast, modern\nfrontends.', flow: ['React', 'TypeScript', 'Tailwind'], tags: ['vite', 'framer-motion', 'routing', 'seo', 'a11y'], d: 'Responsive interfaces that load fast and feel smooth on every device.' },
  { k: 'Data / AI', t: 'AI where\nit helps.', flow: ['Data', 'Model', 'Feature'], tags: ['python', 'apis', 'automation', 'ml'], d: 'Data science turned into features people use, not demos that sit on a shelf.' },
  { k: 'Ship / Operate', t: 'From deploy\nto day two.', flow: ['Build', 'Deploy', 'Monitor'], tags: ['vercel', 'analytics', 'performance'], d: 'Every project goes live, gets measured and keeps getting better.' },
];

const Block = ({ b, i }: { b: typeof blocks[number]; i: number }) => (
  <motion.div className={`glass-dark block b${i}`} variants={pop} whileHover={{ y: -6 }}>
    <Screws />
    <div className="block-top"><span className="num light">02.{i + 1}</span><small>{b.k}</small></div>
    <h3>{b.t.split('\n').map(l => <React.Fragment key={l}>{l}<br /></React.Fragment>)}</h3>
    <div className="flow">{b.flow.map((f, j) => <React.Fragment key={f}>{j > 0 && <ArrowRight size={11} />}<span>{f}</span></React.Fragment>)}</div>
    <div className="chips">{b.tags.map(t => <span key={t}>{t}</span>)}</div>
    <p>{b.d}</p>
  </motion.div>
);

const Architecture = () => (
  <motion.section className="blueprint" {...inView}>
    <svg className="wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M50 50 H38 V22 H30 M50 50 H62 V22 H70 M50 50 H38 V76 H30 M50 50 H62 V76 H70" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth=".15"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, ease: 'easeInOut', delay: .4 } } }} />
    </svg>
    <div className="bp-grid">
      <Block b={blocks[0]} i={0} />
      <motion.div className="glass-dark core" variants={pop}>
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
      </motion.div>
      <Block b={blocks[1]} i={1} />
      <Block b={blocks[2]} i={2} />
      <Block b={blocks[3]} i={3} />
    </div>
  </motion.section>
);

const Work = () => (
  <motion.section className="sec work" id="work" {...inView}>
    <div className="work-head">
      <motion.div variants={rise}>
        <span className="num">03</span>
        <Lines className="head" lines={['Same brand.', 'A better system.']} />
      </motion.div>
      <motion.ul className="work-list" variants={stagger}>
        {projects.map(p => <motion.li key={p.title} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}><i />{p.title}</motion.li>)}
      </motion.ul>
    </div>
    <motion.div className="work-grid" variants={stagger}>
      {projects.map((p, i) => (
        <motion.a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" className="work-card" variants={rise} whileHover={{ y: -8 }}>
          <p className="mono"><b>[{pad(i + 1)}] {p.title}</b><br />{p.category}</p>
          <Laptop p={p} />
        </motion.a>
      ))}
    </motion.div>
  </motion.section>
);

const layers = ['Frontend', 'Logic', 'Data', 'Automation'];

const Result = () => (
  <motion.section className="sec result" {...inView}>
    <motion.div variants={rise}>
      <span className="num">04</span>
      <Lines className="head small" lines={["The result isn't", (
        <span className="brush">just a new look.<motion.i variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: .8, ease, delay: .7 } } }} /></span>
      )]} />
    </motion.div>
    <motion.div variants={rise}>
      <Lines className="head small" lines={["It's a system that", "didn't exist before."]} />
      <div className="objective">
        <Target size={18} />
        <div><b>Objective reached</b><p>A product that simplifies the owner's work, improves the experience for every user, and keeps growing over time.</p></div>
      </div>
    </motion.div>
    <motion.div className="stack3d" aria-hidden="true" variants={stagger}>
      {layers.map((l, i) => (
        <motion.div key={l} className="layer" style={{ '--i': i } as React.CSSProperties}
          variants={{ hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 12 } } }}>
          <i className="plane" /><span>{l}</span>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

const faqs = [
  { q: 'Who is Arnabh Kushwaha?', a: 'Arnabh Kushwaha, known online as ZenSensi, is a web developer and UX/UI designer from India. He is pursuing a BCA in Data Science & Artificial Intelligence and is the founder of Hubrave, a tech-driven digital agency.' },
  { q: 'What is Hubrave?', a: 'Hubrave is a digital agency founded by Arnabh Kushwaha. It designs, builds and optimizes websites, SaaS dashboards and AI-powered tools for businesses, combining data science with clean, fast user experience.' },
  { q: 'What technologies does Arnabh Kushwaha work with?', a: 'He builds frontends with React, TypeScript, Vite, Tailwind CSS and Framer Motion, designs interfaces and design systems for UX/UI, and integrates data science and AI features where they help users.' },
  { q: 'What projects has Arnabh Kushwaha built?', a: `He has built and launched ${projects.length} live web products: ${projects.map(p => `${p.title} (${p.category})`).join(', ')}.` },
  { q: 'How can I hire Arnabh Kushwaha for a project?', a: `Send a message through the contact form on this page or email ${CONTACT_EMAIL}. He is open to new website, web app, SaaS and AI integration projects in 2026.` },
  { q: 'What does ZenSensi mean?', a: 'ZenSensi is the online handle Arnabh Kushwaha uses on GitHub and across the web.' },
];

const FAQ = () => (
  <motion.section className="sec faq" id="faq" {...inView}>
    <motion.div variants={rise}>
      <span className="num">05</span>
      <Lines className="head small" lines={['Questions,', 'answered.']} />
    </motion.div>
    <motion.div className="faq-list" variants={stagger}>
      {faqs.map(f => (
        <motion.details key={f.q} variants={rise}>
          <summary><h3>{f.q}</h3><Plus size={16} /></summary>
          <p>{f.a}</p>
        </motion.details>
      ))}
    </motion.div>
  </motion.section>
);

// Structured data for search engines and AI answer engines, built from the same data the page renders
const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
);

const person = { '@id': `${SITE}/#person` };
const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage', '@id': `${SITE}/#profile`, url: `${SITE}/`, name: 'Arnabh Kushwaha (ZenSensi) — Portfolio',
      inLanguage: 'en', dateModified: '2026-10-29', mainEntity: person, isPartOf: { '@id': `${SITE}/#website` },
    },
    {
      '@type': 'Person', ...person, name: 'Arnabh Kushwaha', alternateName: 'ZenSensi', url: `${SITE}/`, image: `${SITE}/me.jpg`,
      email: `mailto:${CONTACT_EMAIL}`, jobTitle: 'Web Developer & UX/UI Designer',
      description: faqs[0].a, address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      worksFor: { '@id': `${HUBRAVE}#organization` },
      knowsAbout: ['Web Development', 'UX/UI Design', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Data Science', 'Artificial Intelligence'],
      sameAs: ['https://github.com/ZenSensi', 'https://www.linkedin.com/in/arnabhkushwaha/', HUBRAVE],
    },
    {
      '@type': 'Organization', '@id': `${HUBRAVE}#organization`, name: 'Hubrave', alternateName: 'Hubrave Agency', url: HUBRAVE,
      founder: person, description: faqs[1].a,
    },
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Arnabh Kushwaha', alternateName: 'ZenSensi', publisher: person, inLanguage: 'en' },
    {
      '@type': 'ItemList', '@id': `${SITE}/#projects`, name: 'Projects by Arnabh Kushwaha',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'WebSite', name: p.title, url: p.url, genre: p.category, creator: person },
      })),
    },
    {
      '@type': 'FAQPage', '@id': `${SITE}/#faq`,
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

const Footer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New project from ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.footer className="footer" id="contact" {...inView}>
      <div className="footer-main">
        <motion.div className="f-id" variants={rise}>
          <motion.div className="f-avatar" whileHover={{ scale: 1.06, rotate: -3 }}><Photo src="/me.jpg" fallback="AK" alt="Arnabh Kushwaha" /></motion.div>
          <div>
            <b>Arnabh Kushwaha.</b>
            <small>Web developer / UX designer</small>
            <p className="mono">Plan. Organize. Clarify. Build.</p>
          </div>
        </motion.div>
        <motion.div className="f-contact" variants={rise}>
          <a href={`mailto:${CONTACT_EMAIL}`}><small>[E-mail]</small><b>{CONTACT_EMAIL}</b><Mail size={14} /></a>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><small>[{s.label}]</small><b>{s.handle}</b>{s.icon}</a>
          ))}
        </motion.div>
        <motion.form className="f-form" onSubmit={submit} variants={rise}>
          <p className="mono form-title">Open for new projects in 2026</p>
          <div className="f-row">
            <label>Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
            <label>E-mail<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
          </div>
          <label>Message<textarea rows={2} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label>
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: .97 }}>Let's build the project <ArrowRight size={14} /></motion.button>
        </motion.form>
      </div>
      <div className="footer-bottom mono">
        <span>Legal</span><span>2026</span>
        <Link to="/news">News</Link>
        <a href={HUBRAVE} target="_blank" rel="noopener noreferrer">Hubrave Agency ↗</a>
      </div>
    </motion.footer>
  );
};

const Home = () => (
  <>
    <title>Arnabh Kushwaha (ZenSensi) — Web Developer &amp; UX/UI Designer | Hubrave</title>
    <meta name="description" content="Arnabh Kushwaha (ZenSensi) is a web developer and UX/UI designer from India and founder of Hubrave. React, TypeScript and AI-powered websites, SaaS and web apps." />
    <link rel="canonical" href={`${SITE}/`} />
    <JsonLd data={homeSchema} />
    <Hero />
    <Intro />
    <Architecture />
    <Work />
    <Result />
    <FAQ />
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
      <link rel="canonical" href={`${SITE}/news`} />
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

// Thin orange bar across the top that tracks page scroll
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: .001 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
};

function App() {
  return (
    // reducedMotion="user": transforms are skipped when the OS "reduce motion" setting is on
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <ScrollProgress />
      <Topbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
