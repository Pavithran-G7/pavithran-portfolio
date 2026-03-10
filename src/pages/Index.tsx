import { useEffect, useRef, useState, useCallback } from "react";

declare const THREE: any;
declare const gsap: any;
declare const ScrollTrigger: any;
declare const ScrollToPlugin: any;
declare const TextPlugin: any;
declare const Splitting: any;

const NAV_LINKS = ["home","about","skills","projects","experience","contact"];

const SKILLS = [
  { name: "HTML5", icon: "fa-brands fa-html5", category: "FRONTEND", level: 90 },
  { name: "CSS3", icon: "fa-brands fa-css3-alt", category: "FRONTEND", level: 85 },
  { name: "JavaScript", icon: "fa-brands fa-js", category: "FRONTEND", level: 88 },
  { name: "React", icon: "fa-brands fa-react", category: "FRONTEND", level: 82 },
  { name: "Tailwind CSS", icon: "fa-solid fa-wind", category: "FRONTEND", level: 78 },
  { name: "Node.js", icon: "fa-brands fa-node-js", category: "BACKEND", level: 75 },
  { name: "Python", icon: "fa-brands fa-python", category: "BACKEND", level: 80 },
  { name: "Express.js", icon: "fa-solid fa-server", category: "BACKEND", level: 70 },
  { name: "MongoDB", icon: "fa-solid fa-database", category: "DATABASE", level: 72 },
  { name: "MySQL", icon: "fa-solid fa-table", category: "DATABASE", level: 68 },
  { name: "Firebase", icon: "fa-solid fa-fire", category: "DATABASE", level: 65 },
  { name: "Git", icon: "fa-brands fa-git-alt", category: "TOOLS", level: 85 },
  { name: "GitHub", icon: "fa-brands fa-github", category: "TOOLS", level: 88 },
  { name: "Docker", icon: "fa-brands fa-docker", category: "TOOLS", level: 55 },
  { name: "Figma", icon: "fa-brands fa-figma", category: "TOOLS", level: 70 },
];

const PROJECTS = [
  { id: "001", title: "Personal Portfolio Website", desc: "A fully interactive portfolio with Three.js 3D scenes, GSAP scroll animations, and responsive design.", tech: ["React","Three.js","GSAP","CSS3"], gradient: "linear-gradient(135deg, #00c2ff22, #3dffa022)" },
  { id: "002", title: "Weather Dashboard App", desc: "Real-time weather app with location search, 7-day forecasts, and interactive radar maps using OpenWeather API.", tech: ["React","OpenWeather API","Chart.js","Tailwind"], gradient: "linear-gradient(135deg, #f0a50022, #00c2ff22)" },
  { id: "003", title: "Task Management System", desc: "Full-stack Kanban board with drag-and-drop, user auth, real-time collaboration, and project analytics.", tech: ["React","Node.js","MongoDB","Socket.io"], gradient: "linear-gradient(135deg, #3dffa022, #00c2ff22)" },
  { id: "004", title: "E-Commerce Frontend Clone", desc: "Pixel-perfect Shopify-style storefront with cart functionality, product filtering, and Stripe checkout integration.", tech: ["React","Redux","Stripe","Firebase"], gradient: "linear-gradient(135deg, #00c2ff22, #f0a50022)" },
  { id: "005", title: "Chat Application", desc: "Real-time messaging app with private rooms, typing indicators, file sharing, and message reactions.", tech: ["React","Socket.io","Express","MongoDB"], gradient: "linear-gradient(135deg, #f0a50022, #3dffa022)" },
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

const SOCIAL_LINKS = [
  { icon: "fa-brands fa-github", url: "#", label: "GitHub" },
  { icon: "fa-brands fa-linkedin", url: "#", label: "LinkedIn" },
  { icon: "fa-brands fa-x-twitter", url: "#", label: "X" },
];

// SVG wave divider paths (flat → final shape)
const DIVIDERS = [
  { flat: "M0,60 L1440,60", final: "M0,60 Q360,0 720,60 T1440,60" }, // gentle sine
  { flat: "M0,60 L1440,60", final: "M0,0 L1440,80" }, // diagonal cut
  { flat: "M0,60 L1440,60", final: "M0,60 Q240,10 480,50 Q720,90 960,40 Q1200,10 1440,60" }, // double wave
  { flat: "M0,60 L1440,60", final: "M0,60 L360,60 L360,30 L720,30 L720,60 L1080,60 L1080,20 L1440,20" }, // staircase
  { flat: "M0,60 L1440,60", final: "M0,60 Q720,-20 1440,60" }, // mountain peak
  { flat: "M0,60 L1440,60", final: "M0,50 L180,20 L360,55 L540,15 L720,45 L900,10 L1080,50 L1260,25 L1440,40" }, // jagged data
  { flat: "M0,60 L1440,60", final: "M0,40 Q480,80 720,30 Q960,-10 1440,50" }, // asymmetric wave
];

const SectionDivider = ({ index }: { index: number }) => {
  const d = DIVIDERS[index % DIVIDERS.length];
  return (
    <div className="section-divider">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="divider-svg">
        <path className="divider-path" d={d.flat} data-final={d.final} fill="none" stroke="hsl(195,100%,50%)" strokeWidth="1" opacity="0.2" />
      </svg>
    </div>
  );
};

export default function Index() {
  const [loaderPhase, setLoaderPhase] = useState<'sweep'|'reveal'|'split'|'done'>('sweep');
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false);

  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const heroRoleRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLDivElement>(null);
  const loaderNameRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  // ===== LOADER SEQUENCE =====
  useEffect(() => {
    // Phase 1: sweep (700ms)
    setTimeout(() => setLoaderPhase('reveal'), 800);
    // Phase 2: reveal content (name chars, role, bar)
    setTimeout(() => setLoaderPhase('split'), 2300);
    // Phase 3: split panels exit
    setTimeout(() => {
      setLoaderPhase('done');
      setScrollIndicatorVisible(true);
    }, 2900);
  }, []);

  // Loader name char reveal
  useEffect(() => {
    if (loaderPhase === 'reveal' && loaderNameRef.current) {
      const chars = loaderNameRef.current.querySelectorAll('.loader-char');
      gsap.fromTo(chars,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [loaderPhase]);

  // ===== THREE.JS BACKGROUND (simplified) =====
  useEffect(() => {
    if (!bgCanvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.z = 400;
    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvasRef.current, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isMobile = window.innerWidth <= 768;
    const starCount = isMobile ? 800 : 2500;

    // Stars - reduced opacity
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i*3] = (Math.random()-0.5)*2000;
      positions[i*3+1] = (Math.random()-0.5)*2000;
      positions[i*3+2] = (Math.random()-0.5)*2000;
      const isIce = Math.random() > 0.7;
      colors[i*3] = isIce ? 0 : 0.78;
      colors[i*3+1] = isIce ? 0.76 : 0.91;
      colors[i*3+2] = 1;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.2, vertexColors: true, transparent: true, opacity: 0.4, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Wireframe drifters - very low opacity ghost shapes
    const drifters: any[] = [];
    const geos = [
      new THREE.IcosahedronGeometry(20, 1),
      new THREE.IcosahedronGeometry(28, 1),
      new THREE.TorusGeometry(22, 1.5, 8, 32),
      new THREE.TorusGeometry(18, 1.2, 8, 32),
      new THREE.OctahedronGeometry(18, 0),
    ];
    geos.forEach((g, i) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.04 + Math.random()*0.03 });
      const m = new THREE.Mesh(g, mat);
      m.position.set((Math.random()-0.5)*300, (Math.random()-0.5)*200, (Math.random()-0.5)*200);
      if (i >= 2) m.rotation.z = 0.7;
      scene.add(m);
      drifters.push({ mesh: m, driftDir: 1, driftSpeed: 0.005 + Math.random()*0.005, rotSpeed: { x: Math.random()*0.005, y: Math.random()*0.008, z: i===4 ? 0.003 : 0 } });
    });

    const sceneGroup = new THREE.Group();
    sceneGroup.add(stars);
    drifters.forEach(d => sceneGroup.add(d.mesh));
    scene.add(sceneGroup);

    let targetRotX = 0, targetRotY = 0;
    const handleMouse = (e: MouseEvent) => {
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.3;
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    let scrollY = 0;
    const handleScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      sceneGroup.rotation.x += (targetRotX - sceneGroup.rotation.x) * 0.03;
      sceneGroup.rotation.y += (targetRotY - sceneGroup.rotation.y) * 0.03;
      camera.position.z = 400 + scrollY * 0.15;
      drifters.forEach(d => {
        d.mesh.rotation.x += d.rotSpeed.x;
        d.mesh.rotation.y += d.rotSpeed.y;
        d.mesh.rotation.z += d.rotSpeed.z;
        d.mesh.position.y += d.driftDir * d.driftSpeed;
        if (Math.abs(d.mesh.position.y) > 120) d.driftDir *= -1;
      });
      const pos = starGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        pos[i*3+1] += Math.sin(Date.now() * 0.0001 + i) * 0.02;
      }
      starGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // ===== HERO 3D — FULL SCREEN =====
  useEffect(() => {
    if (!heroCanvasRef.current || loaderPhase !== 'done') return;
    const container = heroCanvasRef.current;
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.z = 300;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Central compound: dark sphere + icosahedron cage
    const sphereGeo = new THREE.SphereGeometry(30, 32, 32);
    const sphereMat = new THREE.MeshPhongMaterial({ color: 0x0a1628, shininess: 20, transparent: true, opacity: 0.6 });
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    const cageGeo = new THREE.IcosahedronGeometry(50, 1);
    const cageMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.2 });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    group.add(cage);

    // 3 orbital rings with satellite dots
    const ringColors = [0x00c2ff, 0x3dffa0, 0xf0a500];
    const ringTilts = [
      { x: 0, z: 0 },
      { x: Math.PI / 4, z: Math.PI / 6 },
      { x: -Math.PI / 3, z: Math.PI / 3 },
    ];
    const satellites: { angle: number; speed: number; radius: number; mesh: any; ringGroup: any }[] = [];

    ringColors.forEach((color, i) => {
      const ringGeo = new THREE.TorusGeometry(70 + i * 18, 0.6, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = ringTilts[i].x;
      ring.rotation.z = ringTilts[i].z;
      group.add(ring);

      // Satellite dot
      const satGeo = new THREE.SphereGeometry(1.5, 8, 8);
      const satMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
      const sat = new THREE.Mesh(satGeo, satMat);
      ring.add(sat);
      satellites.push({ angle: Math.random() * Math.PI * 2, speed: 0.008 + i * 0.004, radius: 70 + i * 18, mesh: sat, ringGroup: ring });
    });

    // 8-10 scattered wireframe shapes (space debris)
    const debrisGeos = [
      new THREE.TetrahedronGeometry(5, 0),
      new THREE.OctahedronGeometry(4, 0),
      new THREE.IcosahedronGeometry(3, 0),
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.TetrahedronGeometry(6, 0),
      new THREE.OctahedronGeometry(5, 0),
      new THREE.IcosahedronGeometry(4, 0),
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.TetrahedronGeometry(3, 0),
      new THREE.OctahedronGeometry(3, 0),
    ];
    const debris: any[] = [];
    debrisGeos.forEach((g) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.08 + Math.random() * 0.06 });
      const m = new THREE.Mesh(g, mat);
      m.position.set(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 200 - 50
      );
      group.add(m);
      debris.push({ mesh: m, rotX: (Math.random()-0.5)*0.01, rotY: (Math.random()-0.5)*0.01, phase: Math.random()*Math.PI*2 });
    });

    scene.add(group);
    scene.add(new THREE.AmbientLight(0x001133, 0.5));
    const pLight1 = new THREE.PointLight(0x00c2ff, 1.8, 500);
    pLight1.position.set(100, 100, 100);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0x3dffa0, 0.8, 500);
    pLight2.position.set(-100, -50, 80);
    scene.add(pLight2);

    let targetRX = 0, targetRY = 0;
    const handleMouse = (e: MouseEvent) => {
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.4;
      targetRY = (e.clientX / window.innerWidth - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouse);

    const anim = () => {
      requestAnimationFrame(anim);
      cage.rotation.y += 0.003;
      cage.rotation.x += 0.001;

      satellites.forEach(s => {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.y = Math.sin(s.angle) * s.radius;
      });

      debris.forEach(d => {
        d.mesh.rotation.x += d.rotX;
        d.mesh.rotation.y += d.rotY;
        d.mesh.position.y += Math.sin(Date.now() * 0.001 + d.phase) * 0.05;
      });

      group.rotation.x += (targetRX - group.rotation.x) * 0.04;
      group.rotation.y += (targetRY - group.rotation.y) * 0.04;
      renderer.render(scene, camera);
    };
    anim();

    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [loaderPhase]);

  // ===== CUSTOM CURSOR + AMBIENT GLOW =====
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!ring || !dot) return;

    const move = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const down = () => { ring.classList.add('clicking'); dot.classList.add('clicking'); };
    const up = () => { ring.classList.remove('clicking'); dot.classList.remove('clicking'); };

    const lerpLoop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.10;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.10;
      ring.style.left = ringPos.current.x + 'px';
      ring.style.top = ringPos.current.y + 'px';

      // Ambient cursor glow
      if (glow) {
        glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.06;
        glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.06;
        glow.style.left = glowPos.current.x + 'px';
        glow.style.top = glowPos.current.y + 'px';
      }

      requestAnimationFrame(lerpLoop);
    };
    lerpLoop();

    const addHover = () => {
      document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
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

      // Hide scroll indicator on first scroll
      if (scrollTop > 50 && scrollIndicatorVisible) {
        setScrollIndicatorVisible(false);
      }

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
  }, [scrollIndicatorVisible]);

  // ===== GSAP ANIMATIONS =====
  useEffect(() => {
    if (loaderPhase !== 'done') return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

    requestAnimationFrame(() => {
      // Hero entrance stagger
      gsap.from('.hero-label', { y: 30, opacity: 0, duration: 0.6, delay: 0.1, ease: "power3.out" });
      gsap.from('.hero-name', { y: 40, opacity: 0, duration: 0.7, delay: 0.25, ease: "power3.out" });
      gsap.from('.hero-role', { y: 30, opacity: 0, duration: 0.6, delay: 0.45, ease: "power3.out" });
      gsap.from('.hero-tagline', { y: 30, opacity: 0, duration: 0.6, delay: 0.6, ease: "power3.out" });
      gsap.from('.hero-buttons', { y: 30, opacity: 0, duration: 0.6, delay: 0.75, ease: "power3.out" });

      // Text scramble for role
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

      // Tagline typewriter cycle
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

      // Hero pin + parallax exit
      gsap.to(".hero-text", {
        x: -120, opacity: 0,
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=150%", scrub: 1, pin: true }
      });
      gsap.to(".hero-3d-canvas", {
        scale: 0.6, opacity: 0,
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=150%", scrub: 1 }
      });

      // ---- Section heading accent lines ----
      document.querySelectorAll('.heading-accent-line').forEach(line => {
        gsap.fromTo(line, { width: 0 }, {
          width: '60px', duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none reverse" }
        });
      });

      // ---- SVG Divider morph animations ----
      document.querySelectorAll('.divider-path').forEach(path => {
        const finalD = (path as SVGPathElement).getAttribute('data-final');
        if (finalD) {
          gsap.to(path, {
            attr: { d: finalD },
            scrollTrigger: { trigger: path, start: "top 90%", end: "top 50%", scrub: 1 }
          });
        }
      });

      // ---- ABOUT: Curtain word reveal ----
      const aboutWords = document.querySelectorAll('.about-section [data-splitting] .word');
      if (aboutWords.length) {
        gsap.from(aboutWords, {
          y: "100%", opacity: 0, rotationX: -80,
          stagger: { each: 0.02, from: "start" },
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-section", start: "top 70%", end: "top 20%", scrub: 0.8 }
        });
      }

      // Stat counters
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

      // ---- SKILLS: 3D card flip cascade ----
      gsap.from('.skill-card', {
        rotateX: 90, opacity: 0, y: 40,
        transformOrigin: "top center",
        stagger: { each: 0.07, from: "center" },
        duration: 0.9, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".skills-section", start: "top 60%", toggleActions: "play none none reverse" }
      });

      // Skill bar fill
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const level = (bar as HTMLElement).dataset.level || "0";
        ScrollTrigger.create({
          trigger: bar, start: "top 90%", once: true,
          onEnter: () => { (bar as HTMLElement).style.width = level + "%"; }
        });
      });

      // ---- PROJECTS: Horizontal scroll ----
      const track = document.querySelector('.projects-track') as HTMLElement;
      if (track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: getScrollAmount, ease: "none",
          scrollTrigger: {
            trigger: ".projects-section", start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pin: true, scrub: 1.2, anticipatePin: 1, invalidateOnRefresh: true,
          }
        });
      }

      // ---- EDUCATION: clip-path morph ----
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

      // ---- ACHIEVEMENTS: counter + radial burst ----
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

      // ---- EXPERIENCE: SVG line draw + card flip ----
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

      // ---- CONTACT: columns slide in from sides ----
      gsap.from('.contact-info', {
        x: -80, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 70%", toggleActions: "play none none reverse" }
      });
      gsap.from('.contact-form-panel', {
        x: 80, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 70%", toggleActions: "play none none reverse" }
      });

      // ---- MAGNETIC BUTTONS ----
      if (window.innerWidth > 768) {
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit').forEach(btn => {
          const el = btn as HTMLElement;
          el.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const pull = (80 - dist) / 80;
              gsap.to(el, { x: dx * pull * 0.3, y: dy * pull * 0.3, duration: 0.3, ease: "power2.out" });
            }
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
          });
        });
      }

      // ---- CHARACTER HOVER LIGHTING on headings ----
      if (window.innerWidth > 768) {
        document.querySelectorAll('.section-heading').forEach(heading => {
          const chars = heading.querySelectorAll('.char');
          if (!chars.length) return;
          chars.forEach((ch: Element) => {
            const el = ch as HTMLElement;
            el.addEventListener('mouseenter', () => {
              el.style.color = 'hsl(195, 100%, 50%)';
              el.style.textShadow = '0 0 12px hsla(195, 100%, 50%, 0.5)';
              el.style.transition = 'color 0.15s, text-shadow 0.15s';
            });
            el.addEventListener('mouseleave', () => {
              setTimeout(() => {
                el.style.color = '';
                el.style.textShadow = '';
              }, 200);
            });
          });
        });
      }

      // ---- Splitting.js for headings ----
      try { Splitting({ target: '[data-splitting]', by: 'chars' }); } catch(e) {}
    });

    return () => { ScrollTrigger.getAll().forEach((t: any) => t.kill()); };
  }, [loaderPhase]);

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

  const scrollToSection = (id: string) => {
    gsap.to(window, { scrollTo: { y: `#${id}`, offsetY: 64 }, duration: 1.5, ease: "power4.inOut" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSending(true);
    setTimeout(() => {
      setFormSending(false);
      setFormSent(true);
      setTimeout(() => setFormSent(false), 3000);
    }, 1200);
  };

  const loaderName = "ALEX CHEN";

  return (
    <>
      {/* ===== LOADER ===== */}
      {loaderPhase !== 'done' && (
        <div className="loader-overlay">
          {/* Split panels for exit */}
          <div className={`loader-panel loader-panel-top ${loaderPhase === 'split' ? 'exit' : ''}`}></div>
          <div className={`loader-panel loader-panel-bottom ${loaderPhase === 'split' ? 'exit' : ''}`}></div>

          {/* Sweep line */}
          {loaderPhase === 'sweep' && <div className="loader-sweep-line" />}

          {/* Reveal content */}
          {(loaderPhase === 'reveal' || loaderPhase === 'split') && (
            <div className="loader-reveal-content">
              <div className="loader-portfolio-label">PORTFOLIO 2025</div>
              <div className="loader-name-reveal" ref={loaderNameRef}>
                {loaderName.split('').map((ch, i) => (
                  <span key={i} className={`loader-char ${ch === ' ' ? 'space' : ''}`}>{ch}</span>
                ))}
              </div>
              <div className="loader-role-reveal">Full-Stack Developer</div>
              <div className="loader-bar-wrap">
                <div className={`loader-bar-fill ${loaderPhase === 'reveal' || loaderPhase === 'split' ? 'filling' : ''}`}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CURSORS */}
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-glow" ref={cursorGlowRef}></div>

      {/* BG CANVAS */}
      <canvas id="bg-canvas" ref={bgCanvasRef}></canvas>

      {/* NAVBAR */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <svg width="36" height="36" viewBox="0 0 36 36" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
          <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="2"/>
          <polygon points="18,8 28,18 18,28 8,18" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="1.5" opacity="0.5"/>
        </svg>
        <ul className="nav-links">
          {NAV_LINKS.map(id => (
            <li key={id}><a className={activeNav === id ? 'active' : ''} onClick={() => scrollToSection(id)}>{id}</a></li>
          ))}
        </ul>
        <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span/><span/><span/>
        </div>
      </nav>

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(id => (
          <a key={id} onClick={() => scrollToSection(id)}>{id}</a>
        ))}
        <div className="social-icons">
          {SOCIAL_LINKS.map(s => (
            <a key={s.label} href={s.url} aria-label={s.label}><i className={s.icon}></i></a>
          ))}
        </div>
      </div>

      <div className="content-wrapper">
        {/* ===== HERO ===== */}
        <section id="home" className="hero-section">
          <div className="hero-3d-canvas" ref={heroCanvasRef}></div>
          <div className="hero-text">
            <div className="hero-label">● SYSTEM ONLINE</div>
            <h1 className="hero-name">ALEX CHEN</h1>
            <div className="hero-role" ref={heroRoleRef}>&nbsp;</div>
            <div className="hero-tagline" ref={heroTaglineRef}>&nbsp;</div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>VIEW PROJECTS</button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>CONTACT ME</button>
            </div>
          </div>

          {/* Scroll invitation */}
          <div
            className={`scroll-indicator ${scrollIndicatorVisible ? 'visible' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            <span className="scroll-label">SCROLL TO EXPLORE</span>
            <div className="scroll-line">
              <div className="scroll-dot"></div>
            </div>
          </div>
        </section>

        <SectionDivider index={0} />

        {/* ===== ABOUT ===== */}
        <section id="about" className="about-section">
          <span className="section-label">// 01. WHO I AM</span>
          <h2 className="section-heading" data-splitting>About Me</h2>
          <div className="heading-accent-line"></div>
          <div className="about-grid">
            <div>
              <div className="about-avatar-wrap">
                <div className="about-avatar">AC</div>
                <div className="about-avatar-border"></div>
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

        <SectionDivider index={1} />

        {/* ===== SKILLS ===== */}
        <section id="skills" className="skills-section">
          <span className="section-label">// 02. TECH ARSENAL</span>
          <h2 className="section-heading" data-splitting>My Skills</h2>
          <div className="heading-accent-line"></div>
          <div className="skills-grid">
            {SKILLS.map(skill => (
              <div className="skill-card" key={skill.name} onMouseMove={handleSkillMouseMove} onMouseLeave={handleSkillMouseLeave}>
                <div className="skill-icon"><i className={skill.icon}></i></div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-category">{skill.category}</div>
                <div className="skill-bar"><div className="skill-bar-fill" data-level={skill.level}></div></div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider index={2} />

        {/* ===== PROJECTS ===== */}
        <section className="projects-section">
          <span className="section-label">// 03. MISSION LOG</span>
          <h2 className="section-heading">Featured Projects</h2>
          <div className="heading-accent-line" style={{ marginLeft: '5vw' }}></div>
          <div className="projects-track">
            {PROJECTS.map(p => (
              <div className="project-card" key={p.id}>
                <div className="project-visual">
                  <div className="gradient-bg" style={{ background: p.gradient, width: '100%', height: '100%' }}></div>
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
        </section>

        <SectionDivider index={3} />

        {/* ===== EDUCATION ===== */}
        <section id="education" className="education-section">
          <span className="section-label">// 04. KNOWLEDGE BASE</span>
          <h2 className="section-heading">Education</h2>
          <div className="heading-accent-line"></div>
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

        <SectionDivider index={4} />

        {/* ===== ACHIEVEMENTS ===== */}
        <section className="achievements-section">
          <span className="section-label">// 05. MILESTONES</span>
          <h2 className="section-heading">Achievements</h2>
          <div className="heading-accent-line"></div>
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

        <SectionDivider index={5} />

        {/* ===== EXPERIENCE ===== */}
        <section id="experience" className="experience-section">
          <span className="section-label">// 06. MISSION HISTORY</span>
          <h2 className="section-heading">Experience</h2>
          <div className="heading-accent-line"></div>
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

        <SectionDivider index={6} />

        {/* ===== CONTACT — REDESIGNED ===== */}
        <section id="contact" className="contact-section">
          <div className="contact-grid-new">
            {/* Left: Info block */}
            <div className="contact-info">
              <span className="section-label">// 07. GET IN TOUCH</span>
              <h2 className="contact-heading">
                <span>Let's Work</span>
                <span className="gradient-text">Together</span>
              </h2>
              <p className="contact-desc">
                Currently available for internships, freelance projects, and open-source collaboration. Let's build something meaningful.
              </p>
              <div className="contact-hr"></div>
              <div className="contact-social-links">
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={s.label} href={s.url} className={`contact-social-row ${i < SOCIAL_LINKS.length - 1 ? 'bordered' : ''}`}>
                    <div className="contact-social-left">
                      <i className={s.icon}></i>
                      <span>{s.label}</span>
                    </div>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form panel */}
            <div className="contact-form-panel">
              <div className="contact-form-title">Send a Message</div>
              <form className="contact-form-new" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>YOUR NAME</label>
                  <input type="text" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>EMAIL ADDRESS</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>SUBJECT</label>
                  <input type="text" required placeholder="Project inquiry" />
                </div>
                <div className="form-group">
                  <label>MESSAGE</label>
                  <textarea required placeholder="Tell me about your project..." rows={4}></textarea>
                </div>
                <button type="submit" className={`btn-submit ${formSending ? 'sending' : ''} ${formSent ? 'sent' : ''}`} disabled={formSending}>
                  {formSending ? 'SENDING...' : formSent ? '✓ MESSAGE SENT' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ===== FOOTER — SIMPLIFIED ===== */}
        <footer className="footer-new">
          <div className="footer-brand">
            <svg width="28" height="28" viewBox="0 0 36 36">
              <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="2"/>
              <polygon points="18,8 28,18 18,28 8,18" fill="none" stroke="hsl(195,100%,50%)" strokeWidth="1.5" opacity="0.5"/>
            </svg>
            <span>ALEX CHEN</span>
          </div>
          <div className="footer-social">
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.url} aria-label={s.label}><i className={s.icon}></i></a>
            ))}
          </div>
          <div className="footer-copy">© 2025 Alex Chen. Built with ♥ and code.</div>
          <button className="footer-back-top" onClick={() => gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: "power4.inOut" })}>
            ↑ BACK TO TOP
          </button>
        </footer>
      </div>

      {/* BACK TO TOP (fixed) */}
      <button className={`back-to-top ${showBackTop ? 'visible' : ''}`} onClick={() => gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: "power4.inOut" })} aria-label="Back to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}
