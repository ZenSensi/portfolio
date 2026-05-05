import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Palette, Layout, ArrowUpRight } from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';

const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
import './App.css';
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { CardBody, CardContainer, CardItem } from "./components/ui/3d-card-effect";
import Loader from "./components/ui/3d-box-loader-animation";
import { ButtonColorful } from "./components/ui/button-colorful";

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `translate(-50%, -50%) ${isHovering ? 'scale(4)' : 'scale(1)'}` }}
    />
  );
};

// Navbar Component
const Navbar = () => (
  <nav className="navbar container">
    <Link to="/" className="logo outfit interactive">AK.</Link>
    <div className="nav-links">
      <a href="/#projects" className="interactive">Projects</a>
      <a href="/#about" className="interactive">About</a>
      <Link to="/news" className="interactive">News</Link>
      <a href="https://hubrave.vercel.app/" target="_blank" rel="noopener noreferrer" className="interactive">Agency</a>
      <a href="https://cal.com/hubrave/meeting" target="_blank" rel="noopener noreferrer" className="interactive">
        <ButtonColorful label="Hire me" className="h-9 px-4 text-xs" />
      </a>
    </div>
  </nav>
);

const dailyQuotes = [
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
];

// Hero Component
const Hero = () => {
  const [displayText, setDisplayText] = useState('Arnabh Kushwaha');
  const [phase, setPhase] = useState(0);
  const [quote, setQuote] = useState(dailyQuotes[0]);

  useEffect(() => {
    setQuote(dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      if (phase === 0) { // Wait at end of Arnabh Kushwaha
        timeout = setTimeout(() => setPhase(1), 2000);
      } else if (phase === 1) { // Erasing Arnabh Kushwaha
        if (displayText === '') {
          setPhase(2);
        } else {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, 80);
        }
      } else if (phase === 2) { // Typing "aka ZenSensi"
        const target = 'aka ZenSensi';
        if (displayText === target) {
          setPhase(3);
        } else {
          timeout = setTimeout(() => {
            setDisplayText(target.slice(0, displayText.length + 1));
          }, 150);
        }
      } else if (phase === 3) { // Wait at end of aka ZenSensi
        timeout = setTimeout(() => setPhase(4), 2000);
      } else if (phase === 4) { // Erasing aka ZenSensi
        if (displayText === '') {
          setPhase(5);
        } else {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, 80);
        }
      } else if (phase === 5) { // Rewriting Arnabh Kushwaha
        const target = 'Arnabh Kushwaha';
        if (displayText === target) {
          setPhase(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayText(target.slice(0, displayText.length + 1));
          }, 150);
        }
      }
    };

    handleTyping();
    return () => clearTimeout(timeout);
  }, [phase, displayText]);

  return (
    <section className="hero container">
      <div className="scanlines" />
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [11, 11],
          [14, 14],
          [16, 12],
        ]}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-40",
        )}
      />
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title"
        >
          {displayText}<span className="cursor" />
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-description"
        >
          Web Developer, Designer & UX/UI Specialist. Building the next generation of digital experiences.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="daily-quote-section"
        >
          <p className="quote-text">"{quote.text}"</p>
          <p className="quote-author">— {quote.author}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex justify-center"
        >
          <a href="https://cal.com/hubrave/meeting" target="_blank" rel="noopener noreferrer" className="interactive">
            <ButtonColorful label="Hire me" className="h-12 px-8 text-lg" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Hubrave Section
const HubraveSection = () => (
  <section className="hubrave-section">
    <div className="container">
      <div className="hubrave-card">
        <div className="hubrave-header">
          <p className="outfit">Provide Web related Services</p>
          <h2 className="outfit">Founder of Hubrave Agency</h2>
          <div className="hubrave-stats">
            <div className="stat"><span>8+</span> Projects</div>
            <div className="stat"><span>AI</span> Driven</div>
          </div>
        </div>
        <div className="hubrave-body">
          <p>A tech-driven agency focused on building and optimizing digital products for businesses. We bridge the gap between Data Science and premium UX.</p>
          <a href="https://hubrave.vercel.app/" target="_blank" rel="noopener noreferrer" className="interactive inline-block">
            <ButtonColorful label="Explore" className="h-12 px-8" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

// Projects Section
const projects = [
  { title: 'Dental Scan', url: 'https://dental-scan-kappa.vercel.app/', category: 'Health + AI' },
  { title: 'Calmorithm', url: 'https://calmorithm.vercel.app/', category: 'Wellness + Tech' },
  { title: 'Attendixx', url: 'https://attendixx.vercel.app/', category: 'SaaS + Management' },
  { title: 'Dashboard Demo', url: 'https://dashboard-demo-tau-five.vercel.app/', category: 'Product Design' },
  { title: 'Hirok Labs', url: 'https://hiroklabs.vercel.app/', category: 'Dev Ops' },
  { title: 'Testpanel', url: 'https://testpanel-automation-landing-page.vercel.app/', category: 'Automation' },
  { title: 'PyPrac4U', url: 'https://pyprac4u.vercel.app/', category: 'EdTech' },
  { title: 'NextGen Coaching', url: 'https://nextgencoachingclasses.vercel.app/', category: 'Education' },
];

const Projects = () => (
  <section id="projects" className="section-padding container">
    <div className="section-header">
      <h2 className="outfit section-title">My Projects</h2>
      <p className="section-subtitle">Selected digital products and experiments.</p>
    </div>
    <div className="projects-grid">
      {projects.map((project, index) => (
        <CardContainer key={index} className="inter-var w-full" containerClassName="py-4 w-full">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="block w-full">
            <CardBody className="project-card glass interactive h-auto w-full group/card">
              <CardItem
                translateZ="50"
                className="project-category outfit"
              >
                {project.category}
              </CardItem>
              <CardItem
                translateZ="100"
                className="project-title outfit"
              >
                {project.title}
              </CardItem>
              <CardItem
                translateZ="60"
                className="project-link-icon"
              >
                <ArrowUpRight size={24} />
              </CardItem>
            </CardBody>
          </a>
        </CardContainer>
      ))}
    </div>
  </section>
);

// About Section
const About = () => (
  <section id="about" className="section-padding container about-section">
    <div className="about-grid">
      <div className="about-text">
        <p className="outfit section-subtitle">The Story</p>
        <h2 className="outfit section-title">Creative Engineering</h2>
        <p>I am Arnabh Kushwaha, a digital architect currently pursuing <strong>BCA in Data Science & Artificial Intelligence</strong>. I believe in the power of code and design to solve complex problems and create meaningful human experiences.</p>
        <p>As the founder of <strong>Hubrave</strong>, I lead a team of creators dedicated to building and optimizing digital products for businesses across the globe. My focus is at the intersection of technical excellence and aesthetic precision.</p>
        <div className="skills-tags">
          <span>Data Science</span><span>AI Engineering</span><span>React Development</span><span>UX Research</span><span>UI Design</span>
        </div>
      </div>
      <div className="social-links">
        <a href="https://github.com/ZenSensi" target="_blank" className="social-pill interactive"><Github size={24} /> GitHub <ArrowUpRight size={20} /></a>
        <a href="https://www.linkedin.com/in/arnabhkushwaha/" target="_blank" className="social-pill interactive"><Linkedin size={24} /> LinkedIn <ArrowUpRight size={20} /></a>
      </div>
    </div>
  </section>
);

// Newsletter Section
interface NewsItem {
  id: string;
  date: string;
  title: string;
  url: string;
}

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetching latest AI & Tech news from Hacker News API (Free, Open Source, No Key Required)
        const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=artificial+intelligence&tags=story&hitsPerPage=4');
        const data = await response.json();
        const formattedNews = data.hits.map((hit: any) => ({
          id: hit.objectID,
          date: new Date(hit.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          title: hit.title,
          url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        }));
        setNewsItems(formattedNews);
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section id="news" className="section-padding container">
      <div style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h1 className="outfit" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>NEWS</h1>
      </div>
      <div className="newsletter-grid">
        <div className="news-content">
          <p className="outfit section-subtitle">Daily Updates</p>
          <h2 className="outfit section-title">Latest AI & Tech News</h2>
          <div className="news-list">
            {loadingNews ? (
              <p>Loading latest news...</p>
            ) : (
              newsItems.map((news) => (
                <a href={news.url} target="_blank" rel="noopener noreferrer" key={news.id} className="news-item block interactive" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="news-date">{news.date}</span>
                  <h3 className="news-title flex items-center gap-2" style={{ marginTop: '0.5rem', marginBottom: '0' }}>
                    {news.title} <ArrowUpRight size={16} />
                  </h3>
                </a>
              ))
            )}
          </div>
        </div>

        <div className="subscribe-box glass">
          <h3 className="outfit">Stay Updated</h3>
          <p>Subscribe to the newsletter to get daily news, articles, and product updates delivered straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="subscribe-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="subscribe-input interactive"
            />
            <button type="submit" className="subscribe-btn interactive">
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribed && <p className="success-msg">Thank you! You're now subscribed to the newsletter.</p>}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="footer container">
    <div className="footer-content">
      <div className="outfit footer-logo">AK.</div>
      <p>&copy; 2026 Arnabh Kushwaha. Built with Skills.</p>
    </div>
  </footer>
);

const Home = () => (
  <>
    <Hero />
    <HubraveSection />
    <Projects />
    <About />
  </>
);

const NewsPage = () => (
  <div style={{ paddingTop: '50px', minHeight: '80vh' }}>
    <Newsletter />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show the beautiful loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FEF7F0]"
        >
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="app"
        >
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
