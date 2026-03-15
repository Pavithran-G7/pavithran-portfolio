import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Code2, FileCode, Braces, Atom, Wind, Server, Terminal, Database, CircuitBoard, Flame, GitBranch, Github, Container, Figma, Palette } from "lucide-react";
import project001 from "@/assets/project-001.jpg";
import project002 from "@/assets/project-002.jpg";
import project003 from "@/assets/project-003.jpg";
import project004 from "@/assets/project-004.jpg";
import project005 from "@/assets/project-005.jpg";

declare const THREE: any;
declare const gsap: any;
declare const ScrollTrigger: any;
declare const ScrollToPlugin: any;
declare const TextPlugin: any;
declare const Splitting: any;

const NAV_LINKS = ["home","about","skills","projects","experience","contact"];

const SKILL_ICONS: Record<string, React.ComponentType<any>> = {
  "HTML5": Code2, "CSS3": Palette, "JavaScript": Braces, "React": Atom, "Tailwind CSS": Wind,
  "Node.js": Terminal, "Python": FileCode, "Express.js": Server,
  "MongoDB": Database, "MySQL": CircuitBoard, "Firebase": Flame,
  "Git": GitBranch, "GitHub": Github, "Docker": Container, "Figma": Figma,
};

const SKILLS = [
  { name: "HTML5", category: "FRONTEND", level: 90, status: "OPERATIONAL" },
  { name: "CSS3", category: "FRONTEND", level: 85, status: "OPERATIONAL" },
  { name: "JavaScript", category: "FRONTEND", level: 88, status: "OPERATIONAL" },
  { name: "React", category: "FRONTEND", level: 82, status: "ADVANCED" },
  { name: "Tailwind CSS", category: "FRONTEND", level: 78, status: "OPERATIONAL" },
  { name: "Node.js", category: "BACKEND", level: 75, status: "ADVANCED" },
  { name: "Python", category: "BACKEND", level: 80, status: "OPERATIONAL" },
  { name: "Express.js", category: "BACKEND", level: 70, status: "ADVANCED" },
  { name: "MongoDB", category: "DATABASE", level: 72, status: "ADVANCED" },
  { name: "MySQL", category: "DATABASE", level: 68, status: "ADVANCED" },
  { name: "Firebase", category: "DATABASE", level: 65, status: "LEARNING" },
  { name: "Git", category: "TOOLS", level: 85, status: "OPERATIONAL" },
  { name: "GitHub", category: "TOOLS", level: 88, status: "OPERATIONAL" },
  { name: "Docker", category: "TOOLS", level: 55, status: "LEARNING" },
  { name: "Figma", category: "TOOLS", level: 70, status: "ADVANCED" },
];

const PROJECTS = [
  { id: "001", title: "Personal Portfolio Website", desc: "A fully interactive portfolio with Three.js 3D scenes, GSAP scroll animations, and responsive design.", longDesc: "Built from scratch using React, Three.js for immersive 3D particle backgrounds, GSAP ScrollTrigger for cinematic section transitions, and custom CSS animations. Features a custom cursor system, momentum-based scrolling, and a cinematic loader sequence. Fully responsive across all devices.", tech: ["React","Three.js","GSAP","CSS3"], image: project001 },
  { id: "002", title: "Weather Dashboard App", desc: "Real-time weather app with location search, 7-day forecasts, and interactive radar maps using OpenWeather API.", longDesc: "A comprehensive weather dashboard that fetches real-time data from the OpenWeather API. Features include location-based search with autocomplete, 7-day extended forecasts with hourly breakdowns, interactive radar maps powered by Chart.js, and customizable temperature units. Built with a responsive glassmorphism UI.", tech: ["React","OpenWeather API","Chart.js","Tailwind"], image: project002 },
  { id: "003", title: "Task Management System", desc: "Full-stack Kanban board with drag-and-drop, user auth, real-time collaboration, and project analytics.", longDesc: "A full-stack project management tool featuring a Kanban-style drag-and-drop interface. Includes user authentication with JWT, real-time collaboration via Socket.io, project analytics dashboards, team member assignment, due date tracking, and priority labeling. Backend powered by Node.js and MongoDB.", tech: ["React","Node.js","MongoDB","Socket.io"], image: project003 },
  { id: "004", title: "E-Commerce Frontend Clone", desc: "Pixel-perfect Shopify-style storefront with cart functionality, product filtering, and Stripe checkout integration.", longDesc: "A pixel-perfect e-commerce storefront inspired by Shopify's design language. Features a fully functional shopping cart with quantity management, advanced product filtering and search, category navigation, wishlist functionality, and a complete Stripe checkout integration. State managed with Redux Toolkit.", tech: ["React","Redux","Stripe","Firebase"], image: project004 },
  { id: "005", title: "Chat Application", desc: "Real-time messaging app with private rooms, typing indicators, file sharing, and message reactions.", longDesc: "A real-time chat application supporting private and group messaging rooms. Built with Socket.io for instant message delivery, features include typing indicators, read receipts, file and image sharing with drag-and-drop, emoji reactions, message search, and user presence status. Backend uses Express with MongoDB for message persistence.", tech: ["React","Socket.io","Express","MongoDB"], image: project005 },
];

const EDUCATION = [
  { initial: "M", degree: "B.Tech in Computer Science", institution: "Mumbai Institute of Technology", year: "2022 – 2026", gpa: "GPA: 8.7/10", tags: ["Data Structures","Algorithms","Web Dev","DBMS","OS"], status: "pursuing" },
  { initial: "S", degree: "Higher Secondary (Science)", institution: "St. Xavier's High School", year: "2020 – 2022", gpa: "94.6%", tags: ["Physics","Chemistry","Mathematics","Computer Science"], status: "completed" },
];

const ACHIEVEMENTS_STATS = [
  { value: 500, suffix: "+", label: "Hours Coded" },
  { value: 3, suffix: "", label: "Hackathons" },
  { value: 15, suffix: "+", label: "Open Source Contributions" },
  { value: 2, suffix: "", label: "Internships" },
];

const ACHIEVEMENT_CARDS = [
  { icon: "fa-solid fa-trophy", title: "HackMIT 2024 — Top 10 Finalist", desc: "Built an AI-powered study assistant in 36 hours. Ranked in the top 10 out of 300+ teams." },
  { icon: "fa-solid fa-certificate", title: "AWS Cloud Practitioner Certified", desc: "Earned the AWS Certified Cloud Practitioner certification, demonstrating cloud fluency." },
  { icon: "fa-solid fa-code-branch", title: "Open Source Contributor — React", desc: "Contributed bug fixes and documentation improvements to the React ecosystem on GitHub." },
  { icon: "fa-solid fa-medal", title: "Dean's List — Academic Excellence", desc: "Recognized on the Dean's List for maintaining a GPA above 8.5 for 4 consecutive semesters." },
];

const EXPERIENCE = [
  { date: "Jun 2024 – Aug 2024", role: "Frontend Developer Intern", company: "TechFlow Solutions", bullets: ["Developed responsive UI components using React and Tailwind CSS for the company's SaaS platform","Optimized page load performance by 40% through code splitting and lazy loading strategies","Collaborated with the design team to implement pixel-perfect interfaces from Figma mockups"], status: "completed-status", statusText: "COMPLETED" },
  { date: "Jan 2023 – Present", role: "Open Source Contributor", company: "GitHub Community", bullets: ["Contributed to 8+ open source projects including documentation and bug fixes","Maintained a personal library of reusable React components with 120+ GitHub stars","Reviewed pull requests and provided constructive feedback to fellow contributors"], status: "active", statusText: "ACTIVE" },
  { date: "Sep 2023 – May 2024", role: "Tech Club Lead", company: "MIT Tech Society", bullets: ["Organized 12+ workshops on web development, Python, and competitive programming","Mentored 30+ junior students in their coding journey and project development","Led the team to win the inter-college hackathon with a smart campus navigation app"], status: "completed-status", statusText: "COMPLETED" },
  { date: "Mar 2023 – Present", role: "Freelance Web Developer", company: "Self-Employed", bullets: ["Delivered 8+ client projects including landing pages, portfolios, and small business websites","Built custom WordPress themes and headless CMS solutions for content-driven sites","Maintained a 5-star rating on Fiverr with 100% client satisfaction rate"], status: "active", statusText: "ACTIVE" },
];

const SOCIAL_ICONS = [
  { icon: "fa-brands fa-github", url: "#", tooltip: "GitHub" },
  { icon: "fa-brands fa-linkedin", url: "#", tooltip: "LinkedIn" },
  { icon: "fa-brands fa-x-twitter", url: "#", tooltip: "Twitter/X" },
];

const PROJECT_CARD_WIDTH = 480;
const PROJECT_GAP = 32;
const NAVBAR_HEIGHT = 72;

function ProjectsHorizontalScroll({ projects, onProjectClick }: { projects: typeof PROJECTS; onProjectClick: (p: typeof PROJECTS[0]) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Total track width of all cards laid out horizontally
  const trackWidth = projects.length * PROJECT_CARD_WIDTH + (projects.length - 1) * PROJECT_GAP;
  // How far we need to translate so the last card is fully visible (accounting for viewport & padding)
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1400;
  const horizontalPadding = viewportWidth * 0.1; // 5vw on each side
  const translateDistance = Math.max(0, trackWidth - viewportWidth + horizontalPadding);
  // Section height = viewport height + scroll distance needed for full horizontal travel
  const sectionHeight = typeof window !== "undefined"
    ? window.innerHeight + translateDistance
    : 2400;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -translateDistance]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="projects-section"
      style={{ height: `${sectionHeight}px`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
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
        <motion.div
          style={{
            x,
            display: "flex",
            gap: `${PROJECT_GAP}px`,
            willChange: "transform",
          }}
        >
          {projects.map((p, i) => (
            <motion.div
              className="project-card"
              key={p.id}
              style={{ flex: `0 0 ${PROJECT_CARD_WIDTH}px` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [doorsGone, setDoorsGone] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [formSent, setFormSent] = useState(false);
  const [popupProject, setPopupProject] = useState<typeof PROJECTS[0] | null>(null);

  // bgCanvasRef removed — no particle background
  const heroCanvasRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);
  const heroRoleRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  // ===== LOADER SEQUENCE =====
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to({}, { duration: 0.7 })
      .to(loaderTextRef.current, { duration: 1.0, text: "INITIALIZING PORTFOLIO SYSTEMS...", ease: "none" }, 0.9)
      .call(() => { if (loaderBarRef.current) loaderBarRef.current.style.width = "100%"; }, [], 1.9)
      .to("#loader > *", { opacity: 0, duration: 0.4 }, 2.7)
      .call(() => {
        setLoaded(true);
        // Start door open animation after loader hides
        setTimeout(() => setDoorOpen(true), 100);
        // Remove door panels after animation completes
        setTimeout(() => setDoorsGone(true), 1200);
      }, [], 3.1);
  }, []);

  // ===== BACKGROUND REMOVED FOR SIMPLICITY =====

  // ===== HERO 3D CENTERPIECE =====
  useEffect(() => {
    if (!heroCanvasRef.current || !loaded) return;
    const container = heroCanvasRef.current;
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 500);
    camera.position.z = 200;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const innerGeo = new THREE.IcosahedronGeometry(48, 1);
    const innerMat = new THREE.MeshPhongMaterial({ color: 0x00c2ff, shininess: 100, flatShading: true });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    const outerGeo = new THREE.IcosahedronGeometry(68, 1);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.25 });
    group.add(new THREE.Mesh(outerGeo, outerMat));

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(82, 1.4, 16, 64), new THREE.MeshBasicMaterial({ color: 0x00c2ff, transparent: true, opacity: 0.2 }));
    group.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(94, 0.8, 16, 64), new THREE.MeshBasicMaterial({ color: 0x3dffa0, transparent: true, opacity: 0.15 }));
    ring2.rotation.x = 0.73;
    group.add(ring2);

    const orbitGeo = new THREE.BufferGeometry();
    const orbitPos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(-1 + (2*i)/60);
      const theta = Math.sqrt(60 * Math.PI) * phi;
      orbitPos[i*3] = 85 * Math.cos(theta) * Math.sin(phi);
      orbitPos[i*3+1] = 85 * Math.sin(theta) * Math.sin(phi);
      orbitPos[i*3+2] = 85 * Math.cos(phi);
    }
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
    const orbitMat = new THREE.PointsMaterial({ color: 0x00c2ff, size: 2, transparent: true, opacity: 0.6 });
    group.add(new THREE.Points(orbitGeo, orbitMat));

    scene.add(group);
    scene.add(new THREE.AmbientLight(0x001133, 0.5));
    const pLight1 = new THREE.PointLight(0x00c2ff, 2.2, 400);
    pLight1.position.set(100, 100, 100);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0x3dffa0, 1.0, 400);
    pLight2.position.set(-100, -50, 80);
    scene.add(pLight2);

    let targetRX = 0, targetRY = 0;
    const handleMouse = (e: MouseEvent) => {
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.6;
      targetRY = (e.clientX / window.innerWidth - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', handleMouse);

    const anim = () => {
      requestAnimationFrame(anim);
      group.rotation.y += 0.005;
      ring1.rotation.x += 0.009;
      ring2.rotation.y += 0.006;
      group.rotation.x += (targetRX - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };
    anim();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [loaded]);

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

  // Native browser scrolling keeps section transitions precise and stable.


  // ===== GSAP ANIMATIONS =====
  useEffect(() => {
    if (!loaded) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

    requestAnimationFrame(() => {
      Splitting({ target: '[data-splitting]', by: 'words' });

      // ---- HERO ----
      const roleEl = heroRoleRef.current;
      if (roleEl) {
        const finalText = "Full-Stack Developer & Creative Coder";
        let iter = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        const scrambleInterval = setInterval(() => {
          roleEl.textContent = finalText.split("").map((c, i) => i < iter ? c : chars[Math.floor(Math.random()*chars.length)]).join("");
          iter += 1/2;
          if (iter >= finalText.length) { clearInterval(scrambleInterval); roleEl.textContent = finalText; }
        }, 40);
      }

      const taglineEl = heroTaglineRef.current;
      if (taglineEl) {
        const phrases = ["Building the future, one commit at a time.", "Turning caffeine into clean code.", "Passionate about pixels and performance."];
        let pIdx = 0;
        const cyclePhrase = () => {
          gsap.to(taglineEl, { duration: 1.5, text: phrases[pIdx], ease: "none", onComplete: () => {
            gsap.delayedCall(2, () => {
              gsap.to(taglineEl, { duration: 0.5, text: "", ease: "none", onComplete: () => {
                pIdx = (pIdx + 1) % phrases.length;
                cyclePhrase();
              }});
            });
          }});
        };
        gsap.delayedCall(1, cyclePhrase);
      }

      gsap.to(".hero-text", {
        x: -120, opacity: 0,
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=150%", scrub: 1, pin: true }
      });
      gsap.to(".hero-3d", {
        scale: 0.6, opacity: 0, rotation: 30,
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=150%", scrub: 1 }
      });

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
            gsap.to(obj, { val: target, duration: 1.5, ease: "power2.out", onUpdate: () => {
              (el as HTMLElement).textContent = Math.floor(obj.val) + suffix;
            }});
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

      // ---- PROJECTS (handled by framer-motion) ----

      // ---- EDUCATION ----
      document.querySelectorAll('.education-card').forEach(card => {
        gsap.fromTo(card,
          { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", opacity: 0 },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, duration: 1.1, ease: "power3.out",
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
            gsap.to(obj, { val: target, duration: 1.5, ease: "power2.out", onUpdate: () => {
              (el as HTMLElement).textContent = Math.floor(obj.val) + suffix;
            }});
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
    });

    return () => { ScrollTrigger.getAll().forEach((t: any) => t.kill()); };
  }, [loaded]);

  // ===== SKILL CARD TILT =====
  const handleSkillMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x*15}deg) rotateX(${-y*15}deg)`;
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
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
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
      {/* LOADER */}
      <div id="loader" className={loaded ? "hidden" : ""}>
        <div className="loader-scanline" />
        <svg className="loader-logo" viewBox="0 0 60 60">
          <polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="2"/>
          <polygon points="30,12 48,30 30,48 12,30" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="1.5" opacity="0.5"/>
        </svg>
        <div className="loader-text"><span ref={loaderTextRef}></span></div>
        <div className="loader-progress"><div className="loader-progress-bar" ref={loaderBarRef}></div></div>
      </div>

      {/* DOOR REVEAL */}
      {!doorsGone && (
        <div className="door-overlay">
          <div className={`door-panel door-left ${doorOpen ? 'open' : ''}`}></div>
          <div className={`door-panel door-right ${doorOpen ? 'open' : ''}`}></div>
        </div>
      )}

      {/* CURSORS */}
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* FOG — subtle gradient only */}
      <div className="fog-overlay">
        <div className="fog-blob"></div>
        <div className="fog-blob"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <ul className="nav-links">
            {NAV_LINKS.map(id => (
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
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span/><span/><span/>
          </div>
        </div>
      </nav>

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(id => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
            }}
          >
            {id}
          </a>
        ))}
        <SocialIcons />
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
        {/* ===== HERO ===== */}
        <section id="home" className="hero-section">
          <div className="hero-text">
            <div className="hero-status"><span className="dot"></span> SYSTEM ONLINE</div>
            <h1 className="hero-name">ALEX CHEN</h1>
            <div className="hero-role" ref={heroRoleRef}>&nbsp;</div>
            <div className="hero-tagline" ref={heroTaglineRef}>&nbsp;</div>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>VIEW PROJECTS</a>
              <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>CONTACT ME</a>
              <a href="#" className="btn-resume" download>
                <i className="fa-solid fa-download"></i> DOWNLOAD RESUME
              </a>
            </div>
            <div className="hero-social">
              {SOCIAL_ICONS.map(s => (
                <a key={s.tooltip} href={s.url} aria-label={s.tooltip}><i className={s.icon}></i></a>
              ))}
            </div>
          </div>
          <div className="hero-3d" ref={heroCanvasRef}></div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="about-section">
          <span className="section-label">// 01. WHO I AM</span>
          <h2 className="section-heading" data-splitting>About <span className="accent">Me</span></h2>
          <div className="about-grid">
            <div>
              <div className="about-avatar-wrap">
                <div className="about-avatar">AC</div>
                <div className="about-avatar-border"></div>
                <div className="about-scan-line"></div>
              </div>
              <span className="about-badge">STUDENT DEVELOPER</span>
            </div>
            <div className="about-text">
              <p data-splitting>I'm a third-year Computer Science student at Mumbai Institute of Technology with a deep passion for building beautiful, functional web experiences. My journey started with a simple HTML page in high school and has evolved into a full-stack skill set spanning React, Node.js, Python, and cloud technologies.</p>
              <p data-splitting>When I'm not coding, you'll find me contributing to open-source projects, participating in hackathons, or mentoring junior developers at our college tech club. I believe great software is born from the intersection of clean code, thoughtful design, and relentless curiosity.</p>
              <p data-splitting>I'm currently seeking internship opportunities where I can apply my skills to real-world problems and continue growing as a developer. Let's build something amazing together.</p>
              <div className="about-stats">
                {[
                  { val: 2, suffix: "+", label: "Years Coding" },
                  { val: 20, suffix: "+", label: "Projects" },
                  { val: 8, suffix: "", label: "Technologies" },
                  { val: 3, suffix: "", label: "Hackathons" },
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
          <div className="skills-grid">
            {SKILLS.map(skill => {
              const IconComp = SKILL_ICONS[skill.name] || Code2;
              return (
                <div className="skill-card" key={skill.name} onMouseMove={handleSkillMouseMove} onMouseLeave={handleSkillMouseLeave}>
                  <div className="skill-icon"><IconComp size={28} /></div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-category">{skill.category}</div>
                  <div className="skill-bar"><div className="skill-bar-fill" data-level={skill.level}></div></div>
                  <div className="skill-status">{skill.status}</div>
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
          <h2 className="section-heading">Education</h2>
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
          <h2 className="section-heading">Achievements</h2>
          <div className="achievements-stats">
            {ACHIEVEMENTS_STATS.map((s, i) => (
              <div className="achievement-stat" key={i}>
                <div className="achievement-stat-number" data-target={s.value} data-suffix={s.suffix}>0</div>
                <div className="achievement-stat-label">{s.label}</div>
                <div className="radial-burst">
                  {Array.from({length: 8}).map((_, j) => (
                    <span key={j} style={{ transform: `rotate(${j*45}deg) translateY(-30px)` }}></span>
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
          <h2 className="section-heading">Experience</h2>
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
                I'm currently open to freelance projects, internship opportunities, and exciting collaborations. Feel free to reach out — I'd love to hear from you.
              </p>
              <div className="contact-links">
                {[
                  { icon: "fa-brands fa-github", label: "GitHub", url: "github.com/alexchen" },
                  { icon: "fa-brands fa-linkedin", label: "LinkedIn", url: "linkedin.com/in/alexchen" },
                  { icon: "fa-brands fa-x-twitter", label: "Twitter / X", url: "twitter.com/alexchendev" },
                ].map((l, i) => (
                  <a className="contact-link-row" href="#" key={i}>
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
          <div className="footer-copy">© 2025 Alex Chen. All rights reserved.</div>
        </footer>
      </div>

      {/* BACK TO TOP */}
      <button className={`back-to-top ${showBackTop ? 'visible' : ''}`} onClick={() => gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: "power4.inOut" })} aria-label="Back to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}
