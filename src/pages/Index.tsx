import { useEffect, useRef, useState, useCallback } from "react";
import { Code2, FileCode, Braces, Atom, Wind, Server, Terminal, Database, CircuitBoard, Flame, GitBranch, Github, Container, Figma, Palette, Layout, Layers, HardDrive, Wrench } from "lucide-react";
import Lenis from 'lenis';
import project001 from "@/assets/project-001.jpg";
import project002 from "@/assets/project-002.jpg";
import project003 from "@/assets/project-003.jpg";
import project004 from "@/assets/project-004.jpg";
import project005 from "@/assets/project-005.jpg";
import { SEO } from "@/components/SEO";

// Section background colors for scroll-driven transitions
const SECTION_BG_COLORS = [
  { section: '#home', color: 'hsl(210, 80%, 3%)' },
  { section: '#about', color: 'hsl(220, 60%, 5%)' },
  { section: '#skills', color: 'hsl(215, 50%, 4%)' },
  { section: '#projects', color: 'hsl(210, 70%, 3%)' },
  { section: '#education', color: 'hsl(225, 55%, 5%)' },
  { section: '.achievements-section', color: 'hsl(200, 60%, 4%)' },
  { section: '#experience', color: 'hsl(218, 65%, 4%)' },
  { section: '#contact', color: 'hsl(195, 50%, 5%)' },
];

const NAV_LINKS = ["home", "about", "skills", "projects", "experience", "contact"];

const SKILL_ICONS: Record<string, React.ComponentType<unknown>> = {
  "Python": FileCode, "C": Terminal, "Java": Braces, "SQL (MySQL)": CircuitBoard,
  "TensorFlow": Atom, "MediaPipe": Flame, "NumPy": Database, "Pandas": Server,
  "Machine Learning": Code2, "Computer Vision": Palette,
  "UiPath": Container, "n8n": Wind,
  "Git": GitBranch, "GitHub": Github, "Google Colab": Layout,
};

const CATEGORY_ICONS: Record<string, React.ComponentType<unknown>> = {
  "LANGUAGES": Terminal, "AI & ML": Atom, "AUTOMATION": Wind, "TOOLS": Wrench,
};

const CATEGORY_ORDER = ["LANGUAGES", "AI & ML", "AUTOMATION", "TOOLS"];

const SKILLS = [
  { name: "Python", category: "LANGUAGES", level: 90, status: "OPERATIONAL" },
  { name: "C", category: "LANGUAGES", level: 80, status: "OPERATIONAL" },
  { name: "Java", category: "LANGUAGES", level: 78, status: "ADVANCED" },
  { name: "SQL (MySQL)", category: "LANGUAGES", level: 75, status: "ADVANCED" },
  { name: "Machine Learning", category: "AI & ML", level: 88, status: "OPERATIONAL" },
  { name: "Computer Vision", category: "AI & ML", level: 82, status: "ADVANCED" },
  { name: "TensorFlow", category: "AI & ML", level: 80, status: "OPERATIONAL" },
  { name: "MediaPipe", category: "AI & ML", level: 75, status: "ADVANCED" },
  { name: "NumPy", category: "AI & ML", level: 85, status: "OPERATIONAL" },
  { name: "Pandas", category: "AI & ML", level: 83, status: "OPERATIONAL" },
  { name: "UiPath", category: "AUTOMATION", level: 78, status: "ADVANCED" },
  { name: "n8n", category: "AUTOMATION", level: 72, status: "ADVANCED" },
  { name: "Git", category: "TOOLS", level: 85, status: "OPERATIONAL" },
  { name: "GitHub", category: "TOOLS", level: 88, status: "OPERATIONAL" },
  { name: "Google Colab", category: "TOOLS", level: 80, status: "OPERATIONAL" },
];

const SKILLS_BY_CATEGORY = CATEGORY_ORDER.map(cat => ({
  category: cat,
  skills: SKILLS.filter(s => s.category === cat),
}));

const PROJECTS = [
  { id: "001", title: "Fee Concession Automation", desc: "RPA solution using UiPath to automate fee concession approval process, reducing manual processing time.", longDesc: "Designed and implemented an RPA solution using UiPath to automate the fee concession approval process. Reduced manual processing time significantly and improved operational efficiency for the organization. The bot handles form validation, data extraction, and approval routing automatically.", tech: ["UiPath", "RPA", "Automation"], image: project001 },
  { id: "002", title: "Farm Assist — AI Chatbot", desc: "Bilingual (Tamil/English) AI-powered chatbot using React.js and n8n for real-time farmer assistance.", longDesc: "Developed a bilingual (Tamil/English) AI-powered chatbot using React.js and n8n. Integrated APIs and webhook-based workflows for real-time farmer assistance. Improved accessibility and user engagement through conversational AI, helping farmers get instant answers about crop management, weather, and market prices.", tech: ["React.js", "n8n", "APIs", "AI"], image: project002 },
  { id: "003", title: "Motion Capture System", desc: "Real-time human motion recognition using OpenCV, MediaPipe and Unity for 3D visualization.", longDesc: "Built a real-time human motion recognition system using OpenCV and MediaPipe. Integrated Python-based pose detection with Unity for 3D visualization. Enabled real-time movement tracking and interaction, creating an immersive experience for motion analysis and gaming applications.", tech: ["Python", "MediaPipe", "OpenCV", "Unity"], image: project003 },
];

const EDUCATION = [
  { initial: "K", degree: "B.E. in AI & Machine Learning", institution: "K.S. Rangasamy College of Technology, Tiruchengode", year: "2023 – 2027", gpa: "CGPA: 8.94 (upto 5th sem)", tags: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP"], status: "pursuing" },
  { initial: "S", degree: "HSC (Higher Secondary)", institution: "Sengunthar Matriculation Hr. Sec. School, Tharamangalam", year: "2021 – 2023", gpa: "90%", tags: ["Physics", "Chemistry", "Mathematics", "Computer Science"], status: "completed" },
  { initial: "S", degree: "SSLC (Secondary)", institution: "Sengunthar Matriculation Hr. Sec. School, Tharamangalam", year: "2021", gpa: "100%", tags: ["Science", "Mathematics", "English", "Tamil"], status: "completed" },
];

const ACHIEVEMENTS_STATS = [
  { value: 80, suffix: "+", label: "LeetCode Problems" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 3, suffix: "+", label: "Certifications" },
  { value: 3, suffix: "", label: "Projects Built" },
];

const ACHIEVEMENT_CARDS = [
  { icon: "fa-solid fa-certificate", title: "Oracle AI Foundation Associate", desc: "Earned the Oracle Certified AI Foundation Associate — a globally recognized certification in AI fundamentals." },
  { icon: "fa-solid fa-trophy", title: "NPTEL Elite — Joy of Computing", desc: "Certified from NPTEL Online Course 'The Joy of Computing using Python' with Elite grade." },
  { icon: "fa-solid fa-medal", title: "NPTEL Elite+Silver — Entrepreneurship", desc: "Certified from NPTEL 'Understanding Incubation and Entrepreneurship' with Elite+Silver grade." },
  { icon: "fa-solid fa-code", title: "HackerRank Java & Python Badge", desc: "Earned Java and Python badges on HackerRank, demonstrating strong programming fundamentals." },
  { icon: "fa-solid fa-book", title: "Published Author — Hope's Tapestry", desc: "Contributed a story in the anthology 'Hope's Tapestry', published by Let's Write Publication." },
  { icon: "fa-solid fa-users", title: "Hackathon Participant", desc: "Participated in Hackathons conducted by Bhumi-Skilled and ICT Academy." },
];

const EXPERIENCE = [
  { date: "Aug 2025 – Sep 2025", role: "AI Engineer Intern", company: "ResDev Global Solution, Certainti.ai", bullets: ["Completed hands-on training in Artificial Intelligence and Machine Learning concepts", "Built and evaluated machine learning models using Python, TensorFlow, and Scikit-learn", "Performed data preprocessing, model training, and performance evaluation on real datasets"], status: "completed-status", statusText: "COMPLETED" },
  { date: "Apr 2025 – Jun 2025", role: "AIML Virtual Intern", company: "Eduskill & Google for Developer", bullets: ["Developed an AI-based interview automation system for organizational use", "Worked on backend development, API integration, and AI workflow design", "Collaborated on building a full-stack AI application following industry practices"], status: "completed-status", statusText: "COMPLETED" },
];

const SOCIAL_ICONS = [
  { icon: "fa-brands fa-github", url: "https://github.com/Pavithran030", tooltip: "GitHub" },
  { icon: "fa-brands fa-linkedin", url: "https://www.linkedin.com/in/pavithran030", tooltip: "LinkedIn" },
  { icon: "fa-brands fa-x-twitter", url: "#", tooltip: "Twitter/X" },
];

const PROJECT_CARD_WIDTH = 480;
const PROJECT_GAP = 32;
const NAVBAR_HEIGHT = 72;

function ProjectsHorizontalScroll({ projects, onProjectClick }: { projects: typeof PROJECTS; onProjectClick: (p: typeof PROJECTS[0]) => void }) {
  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div
        className="projects-pin-wrapper"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 5vw",
        }}
      >
        <span className="section-label" style={{ marginBottom: 12 }}>// 03. MISSION LOG</span>
        <h2 className="section-heading" style={{ marginBottom: 32 }}>Featured <span className="accent">Projects</span></h2>
        <div
          className="projects-track"
          style={{
            display: "flex",
            gap: `${PROJECT_GAP}px`,
            willChange: "transform",
          }}
        >
          {projects.map((p) => (
            <div
              className="project-card"
              key={p.id}
              style={{ flex: `0 0 ${PROJECT_CARD_WIDTH}px` }}
            >
              <div className="project-visual" onClick={() => onProjectClick(p)} style={{ cursor: "pointer" }}>
                <img src={p.image} alt={p.title} className="project-image" loading="lazy" />
                <div className="project-image-overlay">
                  <i className="fa-solid fa-expand"></i>
                </div>
                <div className="project-mission">MISSION-{p.id}</div>
              </div>
              <div className="project-content">
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  <a href="#">↗ LIVE DEMO</a>
                  <a href="#">{"</>"} SOURCE CODE</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [diamondOpen, setDiamondOpen] = useState(false);
  const [revealGone, setRevealGone] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadBarDone, setLoadBarDone] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [formSent, setFormSent] = useState(false);
  const [popupProject, setPopupProject] = useState<typeof PROJECTS[0] | null>(null);

  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  // ===== CLICK AUDIO FEEDBACK =====
  const playClickSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore audio API failures on restricted browsers/devices.
    }
  }, []);

  // ===== LOADER SEQUENCE =====
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to({}, { duration: 0.7 })
      .to(loaderTextRef.current, { duration: 1.0, text: "INITIALIZING PORTFOLIO SYSTEMS...", ease: "none" }, 0.9)
      .call(() => { if (loaderBarRef.current) loaderBarRef.current.style.width = "100%"; }, [], 1.9)
      .to("#loader > *", { opacity: 0, duration: 0.4 }, 2.7)
      .call(() => {
        setLoaded(true);
        setTimeout(() => setDiamondOpen(true), 100);
        setTimeout(() => setRevealGone(true), 1400);
        // Hide load bar after its animation completes (~5s after load)
        setTimeout(() => setLoadBarDone(true), 5500);
      }, [], 3.1);
  }, []);

  // ===== LENIS SMOOTH SCROLL =====
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger?.update?.();
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loaded]);

  // ===== BACKGROUND REMOVED FOR SIMPLICITY =====

  // ===== CUSTOM CURSOR =====
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    const move = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const down = () => { ring.classList.add('clicking'); dot.classList.add('clicking'); };
    const up = () => { ring.classList.remove('clicking'); dot.classList.remove('clicking'); };

    const lerpLoop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
      ring.style.left = ringPos.current.x + 'px';
      ring.style.top = ringPos.current.y + 'px';
      requestAnimationFrame(lerpLoop);
    };
    lerpLoop();

    const addHover = () => {
      document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .btn-transmit, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
      });
      document.querySelectorAll('p, h1, h2, h3, span, li').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('text-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('text-hover'));
      });
    };
    setTimeout(addHover, 3500);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  // ===== SCROLL TRACKING =====
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setNavScrolled(scrollTop > 80);
      setShowBackTop(scrollTop > 400);

      const sections = NAV_LINKS.map(id => document.getElementById(id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.getBoundingClientRect().top <= 200) {
          setActiveNav(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ===== SMOOTH SECTION REVEAL VIA INTERSECTION OBSERVER =====
  useEffect(() => {
    if (!loaded) return;
    const sections = document.querySelectorAll('.about-section, .skills-section, .education-section, .achievements-section, .experience-section, .contact-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.01, rootMargin: '200px 0px 0px 0px' });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [loaded]);


  // ===== GSAP ANIMATIONS =====
  useEffect(() => {
    if (!loaded) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

    requestAnimationFrame(() => {
      Splitting({ target: '[data-splitting]', by: 'words' });

      // ---- HERO — smooth parallax fade-out ----
      const heroTl = gsap.timeline({
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=60%", scrub: 0.3, pin: true, pinSpacing: true }
      });
      heroTl.to(".hero-text", { y: -80, opacity: 0, scale: 0.97, duration: 1, ease: "power2.in" }, 0);
      heroTl.to(".hero-glow-orb", { opacity: 0, scale: 1.3, duration: 1 }, 0);
      heroTl.to(".hero-grid-pattern", { opacity: 0, duration: 0.8 }, 0);
      heroTl.to(".hero-corner-frame", { opacity: 0, duration: 0.6 }, 0);

      // ---- ABOUT ----
      const aboutWords = document.querySelectorAll('.about-section [data-splitting] .word');
      if (aboutWords.length) {
        gsap.from(aboutWords, {
          y: "100%", opacity: 0, rotationX: -80,
          stagger: { each: 0.02, from: "start" },
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-section", start: "top 70%", end: "top 20%", scrub: 0.8 }
        });
      }

      document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const target = parseInt((el as HTMLElement).dataset.target || "0");
        const suffix = (el as HTMLElement).dataset.suffix || "";
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 1.5, ease: "power2.out", onUpdate: () => {
                (el as HTMLElement).textContent = Math.floor(obj.val) + suffix;
              }
            });
          }
        });
      });

      // ---- SKILLS ----
      const skillCards = document.querySelectorAll('.skill-card');
      if (skillCards.length) {
        gsap.set(skillCards, { opacity: 1, rotateX: 0, y: 0 });
        gsap.from(skillCards, {
          opacity: 0, y: 30,
          stagger: { each: 0.05, from: "start" },
          duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".skills-section", start: "top 80%", toggleActions: "play none none none" }
        });
      }

      const skillChars = document.querySelectorAll('.skills-section .section-heading .char');
      if (skillChars.length) {
        gsap.from(skillChars, {
          opacity: 0, y: 80, rotation: -15,
          stagger: 0.04, ease: "expo.out",
          scrollTrigger: { trigger: ".skills-section", start: "top 70%", toggleActions: "play none none reverse" }
        });
      }

      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const level = (bar as HTMLElement).dataset.level || "0";
        ScrollTrigger.create({
          trigger: bar, start: "top 90%", once: true,
          onEnter: () => { (bar as HTMLElement).style.width = level + "%"; }
        });
      });

      // ---- PROJECTS HORIZONTAL SCROLL (desktop only) ----
      const isMobile = window.innerWidth <= 768;
      const projectsTrack = document.querySelector('.projects-track') as HTMLElement;
      const projectsSection = document.getElementById('projects');
      if (projectsTrack && projectsSection && !isMobile) {
        const trackWidth = projectsTrack.scrollWidth;
        const viewportWidth = window.innerWidth;
        const translateDistance = trackWidth - viewportWidth + viewportWidth * 0.1;

        gsap.to(projectsTrack, {
          x: -translateDistance,
          ease: "none",
          scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: () => `+=${translateDistance}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.from('.project-card', {
          opacity: 0, scale: 0.9,
          stagger: 0.08, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: projectsSection, start: "top 80%", toggleActions: "play none none none" }
        });
      } else if (isMobile && projectsSection) {
        // Mobile: simple staggered fade-up for project cards
        gsap.from('.project-card', {
          opacity: 0, y: 30,
          stagger: 0.12, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: projectsSection, start: "top 85%", toggleActions: "play none none none" }
        });
      }

      // ---- EDUCATION ----
      document.querySelectorAll('.education-card').forEach(card => {
        gsap.fromTo(card,
          { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", opacity: 0 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }
          }
        );
      });

      const eduLine = document.querySelector('.education-line') as HTMLElement;
      if (eduLine) {
        gsap.to(eduLine, {
          height: "100%",
          scrollTrigger: { trigger: ".education-section", start: "top 60%", end: "bottom 60%", scrub: 1 }
        });
      }

      // ---- ACHIEVEMENTS ----
      document.querySelectorAll('.achievement-stat-number[data-target]').forEach(el => {
        const target = parseInt((el as HTMLElement).dataset.target || "0");
        const suffix = (el as HTMLElement).dataset.suffix || "";
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 1.5, ease: "power2.out", onUpdate: () => {
                (el as HTMLElement).textContent = Math.floor(obj.val) + suffix;
              }
            });
            const burst = (el as HTMLElement).parentElement?.querySelector('.radial-burst');
            if (burst) {
              gsap.fromTo(burst.children, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, stagger: 0.03, ease: "power2.out" });
            }
          }
        });
      });

      gsap.from('.achievement-card', {
        x: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: '.achievement-cards', start: "top 80%", toggleActions: "play none none reverse" }
      });

      // ---- EXPERIENCE ----
      const svgLine = document.querySelector('.exp-svg-path') as SVGPathElement;
      if (svgLine) {
        const length = svgLine.getTotalLength();
        svgLine.style.strokeDasharray = String(length);
        svgLine.style.strokeDashoffset = String(length);
        gsap.to(svgLine, {
          strokeDashoffset: 0,
          scrollTrigger: { trigger: ".experience-section", start: "top 50%", end: "bottom 60%", scrub: 1 }
        });
      }

      document.querySelectorAll('.exp-card').forEach(card => {
        gsap.from(card, {
          rotationX: 90, opacity: 0, transformOrigin: "top center", duration: 1.0, ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }
        });
      });

      // ---- CONTACT ----
      gsap.from('.contact-info', {
        x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 70%", toggleActions: "play none none reverse" }
      });
      gsap.from('.contact-form', {
        x: 60, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 70%", toggleActions: "play none none reverse" }
      });
      gsap.from('.contact-link-row', {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.6, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-links", start: "top 85%", toggleActions: "play none none reverse" }
      });

      // ---- BACKGROUND COLOR TRANSITIONS ----
      const bgLayer = document.querySelector('.bg-transition-layer') as HTMLElement;
      if (bgLayer) {
        SECTION_BG_COLORS.forEach(({ section, color }) => {
          const el = document.querySelector(section);
          if (el) {
            ScrollTrigger.create({
              trigger: el,
              start: 'top 60%',
              end: 'bottom 40%',
              onEnter: () => gsap.to(bgLayer, { backgroundColor: color, duration: 1.2, ease: 'power2.inOut' }),
              onEnterBack: () => gsap.to(bgLayer, { backgroundColor: color, duration: 1.2, ease: 'power2.inOut' }),
            });
          }
        });
      }

      // ---- ENHANCED CHARACTER SPLITS for section headings ----
      document.querySelectorAll('.section-heading[data-splitting]').forEach(heading => {
        const chars = heading.querySelectorAll('.char');
        if (chars.length) {
          gsap.from(chars, {
            opacity: 0, y: 60, rotateX: -90, filter: 'blur(8px)',
            stagger: 0.02, duration: 0.8, ease: 'power4.out',
            scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' }
          });
        }
      });

      // ---- STAGGERED BUILD-ON REVEALS ----
      document.querySelectorAll('.achievement-card, .education-card, .exp-card').forEach(card => {
        gsap.from(card, {
          opacity: 0, y: 40, scale: 0.95,
          duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [loaded]);

  // ===== MAGNETIC HOVER EFFECT (desktop only) =====
  useEffect(() => {
    if (!loaded || window.innerWidth <= 768) return;

    const magneticEls = document.querySelectorAll('.hero-btn, .nav-cta, .hero-social-link, .btn-submit');
    const handlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = [];

    magneticEls.forEach(el => {
      const move = (e: MouseEvent) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      };
      (el as HTMLElement).addEventListener('mousemove', move);
      (el as HTMLElement).addEventListener('mouseleave', leave);
      handlers.push({ el, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        (el as HTMLElement).removeEventListener('mousemove', move);
        (el as HTMLElement).removeEventListener('mouseleave', leave);
      });
    };
  }, [loaded]);

  // ===== CLICK AUDIO ON BUTTONS =====
  useEffect(() => {
    if (!loaded) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .btn-primary, .btn-secondary, .hero-btn, .nav-cta')) {
        playClickSound();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [loaded, playClickSound]);

  // Prevent background scrolling while mobile navigation is open.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // ===== SKILL CARD TILT =====
  const handleSkillMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
  }, []);
  const handleSkillMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  }, []);

  const scrollToSection = useCallback((id: string, smooth = true) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = id === "home" ? 0 : NAVBAR_HEIGHT;
    const top = Math.max(section.getBoundingClientRect().top + window.scrollY - offset, 0);
    window.history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
    if (lenisRef.current && smooth) {
      lenisRef.current.scrollTo(top, { duration: 1.5 });
    } else {
      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    }
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const alignToHash = () => scrollToSection(hash, false);
    window.addEventListener("load", alignToHash);
    const timeout = window.setTimeout(alignToHash, 0);

    return () => {
      window.removeEventListener("load", alignToHash);
      window.clearTimeout(timeout);
    };
  }, [scrollToSection]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  const SocialIcons = ({ className = "" }: { className?: string }) => (
    <div className={`social-icons ${className}`}>
      {SOCIAL_ICONS.map(s => (
        <a key={s.tooltip} href={s.url} data-tooltip={s.tooltip} aria-label={s.tooltip}>
          <i className={s.icon}></i>
        </a>
      ))}
    </div>
  );

  return (
    <>
      <SEO
        title="Pavithran G | AI & ML Developer Portfolio"
        description="Portfolio of Pavithran G, an AI and ML developer building machine learning, computer vision, and automation projects with Python, TensorFlow, and modern web tools."
        path="/"
        type="website"
      />

      {/* LOADER */}
      <div id="loader" className={loaded ? "hidden" : ""}>
        <div className="loader-scanline" />
        <svg className="loader-logo" viewBox="0 0 60 60">
          <polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="2" />
          <polygon points="30,12 48,30 30,48 12,30" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="1.5" opacity="0.5" />
        </svg>
        <div className="loader-text"><span ref={loaderTextRef}></span></div>
        <div className="loader-progress"><div className="loader-progress-bar" ref={loaderBarRef}></div></div>
      </div>

      {/* DIAMOND REVEAL */}
      {!revealGone && (
        <div className={`diamond-overlay ${diamondOpen ? 'open' : ''}`}>
          <div className="diamond-glow"></div>
        </div>
      )}

      {/* CURSORS */}
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* BACKGROUND TRANSITION LAYER */}
      <div className="bg-transition-layer"></div>

      {/* FOG — subtle gradient only */}
      <div className="fog-overlay">
        <div className="fog-blob"></div>
        <div className="fog-blob"></div>
      </div>

      {/* NAVBAR — premium glass */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="nav-brand" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="nav-brand-mark">PG</span>
            <span className="nav-brand-divider"></span>
            <span className="nav-brand-label">PORTFOLIO</span>
          </a>
          <ul className="nav-links-minimal">
            {NAV_LINKS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeNav === id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                >
                  {id}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
            Let's Talk
          </a>
          <div
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            role="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMobileMenuOpen(!mobileMenuOpen);
              }
            }}
          >
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* NAVBAR LOAD ANIMATION BAR */}
      {!loadBarDone && <div className={`navbar-load-bar ${loadBarDone ? 'done' : ''}`}></div>}

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-nav-list" role="menu" aria-label="Mobile navigation">
            {NAV_LINKS.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className={`mobile-menu-link ${activeNav === id ? 'active' : ''}`}
                role="menuitem"
                style={{ transitionDelay: mobileMenuOpen ? `${i * 0.06 + 0.15}s` : '0s' }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                <span className="mobile-link-text">{id}</span>
              </a>
            ))}
          </div>
          <div className="mobile-menu-footer">
            <div className="mobile-menu-divider"></div>
            <a href="#contact" className="mobile-menu-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Let's Talk
            </a>
            <div className="mobile-menu-socials">
              {SOCIAL_ICONS.map(s => (
                <a key={s.tooltip} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.tooltip} className="mobile-social-icon">
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT POPUP — clean minimal */}
      {popupProject && (
        <div className="project-popup-overlay" onClick={() => setPopupProject(null)}>
          <div className="project-popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setPopupProject(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img src={popupProject.image} alt={popupProject.title} className="popup-image" />
            <div className="popup-body">
              <h3 className="popup-title">{popupProject.title}</h3>
              <p className="popup-desc">{popupProject.longDesc}</p>
              <div className="popup-tech">
                {popupProject.tech.map(t => <span key={t}>{t}</span>)}
              </div>
              <div className="popup-links">
                <a href="#" className="btn-primary">↗ LIVE DEMO</a>
                <a href="#" className="btn-secondary">{"</>"} SOURCE CODE</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="content-wrapper">
        {/* ===== HERO — premium modern ===== */}
        <section id="home" className="hero-section">
          {/* Decorative elements */}
          <div className="hero-grid-pattern"></div>
          <div className="hero-glow-orb hero-glow-orb--1"></div>
          <div className="hero-glow-orb hero-glow-orb--2"></div>
          <div className="hero-corner-frame hero-corner-frame--tl"></div>
          <div className="hero-corner-frame hero-corner-frame--br"></div>

          <div className="hero-text">
            <h1 className="hero-name">
              <span className="hero-name-first">PAVITHRAN</span>
              <span className="hero-name-last"> G<span className="hero-name-dot">.</span></span>
            </h1>

            <div className="hero-role-tag">
              <span className="hero-role-line"></span>
              <span className="hero-role-label">AI & ML DEVELOPER</span>
              <span className="hero-role-line"></span>
            </div>

            <div className="hero-subtitle-row">
              <span className="hero-subtitle-badge">
                <span className="status-dot"></span>
                AVAILABLE
              </span>
              <span className="hero-subtitle-separator">—</span>
              <span className="hero-subtitle-text">K.S.Rangasamy College of Technology</span>
            </div>

            <p className="hero-description">
              Building AI-driven applications, automation workflows & computer vision systems.
              Turning data into real-world impact with Python, TensorFlow & full-stack AI development.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="hero-btn hero-btn--primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                <span>View Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
              </a>
              <a href="/Pavithran_CV.pdf" className="hero-btn hero-btn--ghost" download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                <span>Resume</span>
              </a>
            </div>

            <div className="hero-social-row">
              <a href="https://github.com/Pavithran030" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/pavithran030" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="mailto:techpavithran18@gmail.com" aria-label="Email" className="hero-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
              </a>
              <span className="hero-social-divider"></span>
              <span className="hero-scroll-hint">Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="about-section">
          <span className="section-label">// 01. WHO I AM</span>
          <h2 className="section-heading" data-splitting>About <span className="accent">Me</span></h2>
          <div className="about-grid">
            <div className="about-profile-card">
              <div className="profile-card-glow"></div>
              <div className="profile-card-inner">
                <div className="profile-photo-wrapper">
                  <div className="profile-photo-placeholder">PG</div>
                  <div className="profile-photo-ring"></div>
                  <div className="profile-photo-dot"></div>
                </div>
                <div className="profile-name-tag">PAVITHRAN G</div>
                <span className="profile-role-badge">AI & ML DEVELOPER</span>
                <div className="profile-meta-row">
                  <span className="profile-meta-item"><i className="fa-solid fa-location-dot"></i> Tiruchengode, TN</span>
                  <span className="profile-meta-item"><i className="fa-solid fa-graduation-cap"></i> B.E. AI &amp; ML</span>
                </div>
                <div className="profile-status-row">
                  <span className="profile-status-dot"></span>
                  Open for opportunities
                </div>
                <div className="profile-social-links">
                  <a href="https://github.com/Pavithran030" target="_blank" rel="noopener noreferrer" className="profile-social-btn" aria-label="GitHub">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/pavithran030" target="_blank" rel="noopener noreferrer" className="profile-social-btn" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="mailto:techpavithran18@gmail.com" className="profile-social-btn" aria-label="Email">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="about-text">
              <p data-splitting>Motivated AI and Machine Learning undergraduate with hands-on experience in building AI-driven applications, automation workflows, and computer vision systems. Skilled in Python, machine learning fundamentals, and full-stack AI project development.</p>
              <p data-splitting>I've interned at ResDev Global Solution (Certainti.ai) as an AI Engineer and completed a virtual AIML internship with Google for Developers through Eduskill. My projects range from RPA automation with UiPath to bilingual AI chatbots and real-time motion capture systems.</p>
              <p data-splitting>Seeking an entry-level AI/ML or software engineering role to apply problem-solving skills, data-driven thinking, and continuous learning to real-world industry challenges. Let's build something impactful together.</p>
              <div className="about-stats">
                {[
                  { val: 2, suffix: "+", label: "Internships" },
                  { val: 3, suffix: "+", label: "Projects" },
                  { val: 80, suffix: "+", label: "LeetCode" },
                  { val: 3, suffix: "+", label: "Certifications" },
                ].map(s => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-number" data-target={s.val} data-suffix={s.suffix}>0</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section id="skills" className="skills-section">
          <span className="section-label">// 02. TECH ARSENAL</span>
          <h2 className="section-heading" data-splitting>My <span className="accent">Skills</span></h2>
          <div className="skills-categories">
            {SKILLS_BY_CATEGORY.map(({ category, skills }) => {
              const CatIcon = CATEGORY_ICONS[category] || Code2;
              return (
                <div className="skill-category-group" key={category}>
                  <div className="skill-category-header">
                    <div className="skill-category-icon"><CatIcon size={20} /></div>
                    <h3 className="skill-category-title">{category}</h3>
                    <span className="skill-category-count">{skills.length} skills</span>
                  </div>
                  <div className="skills-grid">
                    {skills.map(skill => {
                      const IconComp = SKILL_ICONS[skill.name] || Code2;
                      return (
                        <div className="skill-card" key={skill.name} onMouseMove={handleSkillMouseMove} onMouseLeave={handleSkillMouseLeave}>
                          <div className="skill-icon"><IconComp size={24} strokeWidth={1.5} /></div>
                          <div className="skill-name">{skill.name}</div>
                          <div className="skill-bar"><div className="skill-bar-fill" data-level={skill.level}></div></div>
                          <div className="skill-level">{skill.level}%</div>
                          <div className={`skill-status ${skill.status.toLowerCase()}`}>{skill.status}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <ProjectsHorizontalScroll projects={PROJECTS} onProjectClick={setPopupProject} />

        {/* ===== EDUCATION ===== */}
        <section id="education" className="education-section">
          <span className="section-label">// 04. KNOWLEDGE BASE</span>
          <h2 className="section-heading" data-splitting>Education</h2>
          <div className="education-timeline">
            <div className="education-line"></div>
            {EDUCATION.map((edu, i) => (
              <div className="education-card" key={i}>
                <div className="edu-initial">{edu.initial}</div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-meta">
                  <span className="edu-year">{edu.year}</span>
                  <span className="edu-gpa">{edu.gpa}</span>
                </div>
                <div className="edu-tags">
                  {edu.tags.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className={`edu-status ${edu.status}`}>{edu.status === 'pursuing' ? '● PURSUING' : '✓ COMPLETED'}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== ACHIEVEMENTS ===== */}
        <section className="achievements-section">
          <span className="section-label">// 05. MILESTONES</span>
          <h2 className="section-heading" data-splitting>Achievements</h2>
          <div className="achievements-stats">
            {ACHIEVEMENTS_STATS.map((s, i) => (
              <div className="achievement-stat" key={i}>
                <div className="achievement-stat-number" data-target={s.value} data-suffix={s.suffix}>0</div>
                <div className="achievement-stat-label">{s.label}</div>
                <div className="radial-burst">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <span key={j} style={{ transform: `rotate(${j * 45}deg) translateY(-30px)` }}></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="achievement-cards">
            {ACHIEVEMENT_CARDS.map((a, i) => (
              <div className="achievement-card" key={i}>
                <i className={a.icon}></i>
                <div>
                  <div className="achievement-card-title">{a.title}</div>
                  <div className="achievement-card-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section id="experience" className="experience-section">
          <span className="section-label">// 06. MISSION HISTORY</span>
          <h2 className="section-heading" data-splitting>Experience</h2>
          <div className="experience-timeline">
            <svg className="experience-svg-line" width="40" height="100%" preserveAspectRatio="none">
              <path className="exp-svg-path" d="M20,0 L20,2000" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px hsl(195,100%,50%,0.5))' }} />
            </svg>
            {EXPERIENCE.map((exp, i) => (
              <div className="experience-entry" key={i}>
                <div className="exp-card">
                  <div className="exp-date">{exp.date}</div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">{exp.company}</div>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                  <span className={`exp-status ${exp.status}`}>{exp.statusText}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="contact-section">
          <span className="section-label">// 07. GET IN TOUCH</span>
          <h2 className="section-heading">Contact <span className="accent">Me</span></h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's work together</h3>
              <p className="contact-desc">
                I'm currently open to AI/ML engineering roles, internship opportunities, and exciting collaborations. Feel free to reach out — I'd love to hear from you.
              </p>
              <div className="contact-links">
                {[
                  { icon: "fa-solid fa-envelope", label: "Email", url: "techpavithran18@gmail.com", href: "mailto:techpavithran18@gmail.com" },
                  { icon: "fa-brands fa-github", label: "GitHub", url: "github.com/Pavithran030", href: "https://github.com/Pavithran030" },
                  { icon: "fa-brands fa-linkedin", label: "LinkedIn", url: "linkedin.com/in/pavithran030", href: "https://www.linkedin.com/in/pavithran030" },
                  { icon: "fa-solid fa-phone", label: "Phone", url: "+91 9363575964", href: "tel:+919363575964" },
                ].map((l, i) => (
                  <a className="contact-link-row" href={l.href} target="_blank" rel="noopener noreferrer" key={i}>
                    <i className={l.icon}></i>
                    <div>
                      <span className="link-label">{l.label}</span>
                      <span className="link-url">{l.url}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" required placeholder="Project inquiry" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea required placeholder="Tell me about your project..." rows={4}></textarea>
              </div>
              <button type="submit" className={`btn-submit ${formSent ? 'sent' : ''}`}>
                {formSent ? '✓ Message Sent' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <div className="footer-copy">© 2025 Pavithran G. All rights reserved.</div>
        </footer>
      </div>

      {/* BACK TO TOP */}
      <button className={`back-to-top ${showBackTop ? 'visible' : ''}`} onClick={() => gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: "power4.inOut" })} aria-label="Back to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}
