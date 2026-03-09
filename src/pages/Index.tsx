import { useEffect, useRef, useState, useCallback } from "react";

declare const THREE: any;
declare const gsap: any;
declare const ScrollTrigger: any;
declare const ScrollToPlugin: any;
declare const TextPlugin: any;
declare const Splitting: any;

const NAV_LINKS = ["home","about","skills","projects","education","experience","contact"];

const SKILLS = [
  // Row 1 - Frontend
  { name: "HTML5", icon: "devicon-html5-plain", iconColor: "#e34f26", category: "FRONTEND", level: 90 },
  { name: "CSS3", icon: "devicon-css3-plain", iconColor: "#1572b6", category: "FRONTEND", level: 85 },
  { name: "JavaScript", icon: "devicon-javascript-plain", iconColor: "#f7df1e", category: "FRONTEND", level: 88 },
  { name: "React", icon: "devicon-react-original", iconColor: "#61dafb", category: "FRONTEND", level: 82 },
  { name: "Tailwind", icon: "devicon-tailwindcss-plain", iconColor: "#06b6d4", category: "FRONTEND", level: 78 },
  { name: "Next.js", icon: "devicon-nextjs-plain", iconColor: "#ffffff", category: "FRONTEND", level: 65 },
  // Row 2 - Backend
  { name: "Node.js", icon: "devicon-nodejs-plain", iconColor: "#339933", category: "BACKEND", level: 75 },
  { name: "Python", icon: "devicon-python-plain", iconColor: "#3776ab", category: "BACKEND", level: 80 },
  { name: "Express", icon: "devicon-express-original", iconColor: "#ffffff", category: "BACKEND", level: 70 },
  { name: "FastAPI", icon: "devicon-fastapi-plain", iconColor: "#009688", category: "BACKEND", level: 60 },
  { name: "REST API", icon: "fa-solid fa-network-wired", iconColor: "#00c2ff", category: "BACKEND", level: 78 },
  // Row 3 - Database + Tools
  { name: "MongoDB", icon: "devicon-mongodb-plain", iconColor: "#47a248", category: "DATABASE", level: 72 },
  { name: "MySQL", icon: "devicon-mysql-plain", iconColor: "#4479a1", category: "DATABASE", level: 68 },
  { name: "Firebase", icon: "devicon-firebase-plain", iconColor: "#ffca28", category: "DATABASE", level: 65 },
  { name: "Git", icon: "devicon-git-plain", iconColor: "#f05032", category: "TOOLS", level: 85 },
  { name: "GitHub", icon: "devicon-github-original", iconColor: "#ffffff", category: "TOOLS", level: 88 },
  { name: "Docker", icon: "devicon-docker-plain", iconColor: "#2496ed", category: "TOOLS", level: 55 },
  { name: "Figma", icon: "devicon-figma-plain", iconColor: "#f24e1e", category: "TOOLS", level: 70 },
  { name: "VS Code", icon: "devicon-vscode-plain", iconColor: "#007acc", category: "TOOLS", level: 90 },
];

const PROJECTS = [
  { id: "001", title: "Personal Portfolio Website", desc: "A fully interactive portfolio with Three.js 3D scenes, GSAP scroll animations, and responsive design.", tech: ["React","Three.js","GSAP","CSS3"], gradient: "linear-gradient(135deg, #003344, #001a2e)", status: "DEPLOYED", shape: "cube" },
  { id: "002", title: "Weather Dashboard App", desc: "Real-time weather app with location search, 7-day forecasts, and interactive radar maps.", tech: ["React","OpenWeather API","Chart.js","Tailwind"], gradient: "linear-gradient(135deg, #1a2e00, #0a1a10)", status: "DEPLOYED", shape: "pyramid" },
  { id: "003", title: "Task Management System", desc: "Full-stack Kanban board with drag-and-drop, user auth, real-time collaboration.", tech: ["React","Node.js","MongoDB","Socket.io"], gradient: "linear-gradient(135deg, #2e1a00, #1a0e00)", status: "IN DEV", shape: "ring" },
  { id: "004", title: "E-Commerce Frontend Clone", desc: "Pixel-perfect Shopify-style storefront with cart functionality and Stripe checkout.", tech: ["React","Redux","Stripe","Firebase"], gradient: "linear-gradient(135deg, #001a3a, #000d1a)", status: "DEPLOYED", shape: "sphere" },
  { id: "005", title: "Chat Application", desc: "Real-time messaging app with private rooms, typing indicators, and file sharing.", tech: ["React","Socket.io","Express","MongoDB"], gradient: "linear-gradient(135deg, #1a0a1a, #0d050d)", status: "IN DEV", shape: "diamond" },
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
  { date: "Jun 2024 – Aug 2024", year: "2024", role: "Frontend Developer Intern", company: "TechFlow Solutions", bullets: ["Developed responsive UI components using React and Tailwind CSS for the company's SaaS platform","Optimized page load performance by 40% through code splitting and lazy loading strategies","Collaborated with the design team to implement pixel-perfect interfaces from Figma mockups"], status: "completed-status", statusText: "MISSION COMPLETE ✓", duration: "3 months" },
  { date: "Jan 2023 – Present", year: "2023", role: "Open Source Contributor", company: "GitHub Community", bullets: ["Contributed to 8+ open source projects including documentation and bug fixes","Maintained a personal library of reusable React components with 120+ GitHub stars","Reviewed pull requests and provided constructive feedback to fellow contributors"], status: "active", statusText: "ACTIVE MISSION", duration: "Ongoing" },
  { date: "Sep 2023 – May 2024", year: "2023", role: "Tech Club Lead", company: "MIT Tech Society", bullets: ["Organized 12+ workshops on web development, Python, and competitive programming","Mentored 30+ junior students in their coding journey and project development","Led the team to win the inter-college hackathon with a smart campus navigation app"], status: "completed-status", statusText: "MISSION COMPLETE ✓", duration: "9 months" },
  { date: "Mar 2023 – Present", year: "2023", role: "Freelance Web Developer", company: "Self-Employed", bullets: ["Delivered 8+ client projects including landing pages, portfolios, and small business websites","Built custom WordPress themes and headless CMS solutions for content-driven sites","Maintained a 5-star rating on Fiverr with 100% client satisfaction rate"], status: "active", statusText: "ACTIVE MISSION", duration: "Ongoing" },
];

const SOCIAL_ICONS = [
  { icon: "fa-brands fa-github", url: "#", tooltip: "GitHub" },
  { icon: "fa-brands fa-linkedin-in", url: "#", tooltip: "LinkedIn" },
  { icon: "fa-brands fa-x-twitter", url: "#", tooltip: "Twitter / X" },
  { icon: "fa-brands fa-instagram", url: "#", tooltip: "Instagram" },
  { icon: "fa-brands fa-free-code-camp", url: "#", tooltip: "LeetCode" },
  { icon: "fa-solid fa-envelope", url: "#", tooltip: "Send Email" },
];

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [formSent, setFormSent] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);
  const heroRoleRef = useRef<HTMLDivElement>(null);
  const heroTaglineRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const bgModeRef = useRef(1);

  // ===== LOADER SEQUENCE =====
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to({}, { duration: 0.7 })
      .to(loaderTextRef.current, { duration: 1.0, text: "INITIALIZING PORTFOLIO SYSTEMS...", ease: "none" }, 0.9)
      .call(() => { if (loaderBarRef.current) loaderBarRef.current.style.width = "100%"; }, [], 1.9)
      .to("#loader > *", { opacity: 0, duration: 0.4 }, 2.7)
      .call(() => setLoaded(true), [], 3.1);
  }, []);

  // ===== MULTI-MODE BACKGROUND =====
  useEffect(() => {
    if (!bgCanvasRef.current) return;
    const canvas = bgCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const isMobile = window.innerWidth <= 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mode 1: Starfield
    const starCount = isMobile ? 2000 : 6000;
    const stars: { x: number; y: number; z: number; size: number; color: string }[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000,
        size: i < starCount * 0.75 ? 1.0 : 2.2,
        color: Math.random() > 0.7 ? '#00c2ff' : '#c8e8ff'
      });
    }
    let cameraZ = 0;

    // Mode 2: Neural Network
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 80; i++) {
      nodes.push({
        x: Math.random() * 2000, y: Math.random() * 2000,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        r: i < 3 ? 8 : 3
      });
    }

    // Mode 3: Aurora data streams
    const ribbons: { points: { x: number; y: number }[]; speed: number; width: number; color: string; opacity: number }[] = [];
    const colors3 = ['#00c2ff', '#3dffa0', '#f0a500'];
    for (let i = 0; i < 12; i++) {
      const pts: { x: number; y: number }[] = [];
      const baseX = Math.random() * 2000;
      for (let j = 0; j < 8; j++) {
        pts.push({ x: baseX + (Math.random() - 0.5) * 200, y: j * 300 });
      }
      ribbons.push({
        points: pts, speed: 0.4 + Math.random() * 0.8,
        width: 2 + Math.random() * 6,
        color: colors3[i % 3], opacity: 0.06 + Math.random() * 0.12
      });
    }

    let mxBg = 0, myBg = 0;
    const handleMouse = (e: MouseEvent) => {
      mxBg = e.clientX; myBg = e.clientY;
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    let currentMode = 1;
    let targetAlpha = { m1: 1, m2: 0, m3: 0 };
    let alpha = { m1: 1, m2: 0, m3: 0 };
    let frame = 0;

    const handleScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      cameraZ = window.scrollY * 0.1;
      if (pct < 30) {
        if (bgModeRef.current !== 1) { bgModeRef.current = 1; targetAlpha = { m1: 1, m2: 0, m3: 0 }; }
      } else if (pct < 65) {
        if (bgModeRef.current !== 2) { bgModeRef.current = 2; targetAlpha = { m1: 0, m2: 1, m3: 0 }; }
      } else {
        if (bgModeRef.current !== 3) { bgModeRef.current = 3; targetAlpha = { m1: 0, m2: 0, m3: 1 }; }
      }
    };
    window.addEventListener('scroll', handleScroll);

    const drawStarfield = () => {
      const w = canvas.width, h = canvas.height;
      for (const star of stars) {
        const depth = (star.z - cameraZ % 1000 + 1000) % 1000;
        const scale = 400 / (depth + 1);
        const sx = star.x * scale + w / 2;
        const sy = star.y * scale + h / 2;
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
        const twinkle = Math.random() < 0.001 ? 0.3 : 1;
        ctx.globalAlpha = alpha.m1 * Math.min(1, scale * 0.5) * twinkle;
        ctx.fillStyle = star.color;
        ctx.fillRect(sx, sy, star.size * scale * 0.3, star.size * scale * 0.3);
      }
    };

    const drawNeuralNet = () => {
      const w = canvas.width, h = canvas.height;
      // move nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // mouse repulsion
        const dx = n.x - mxBg, dy = n.y - myBg;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          n.x += (dx / dist) * 2;
          n.y += (dy / dist) * 2;
        }
      }
      // draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            ctx.strokeStyle = `rgba(0,194,255,${(1 - d / 180) * 0.4 * alpha.m2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      // draw nodes
      for (const n of nodes) {
        ctx.globalAlpha = alpha.m2;
        ctx.fillStyle = '#00c2ff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00c2ff';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const drawAurora = () => {
      const h = canvas.height;
      frame++;
      for (const r of ribbons) {
        // move ribbons upward
        for (const p of r.points) {
          p.y -= r.speed;
          p.x += Math.sin(frame * 0.01 + p.y * 0.003) * 0.5;
        }
        // respawn at bottom if top goes off
        if (r.points[r.points.length - 1].y < -100) {
          for (let j = 0; j < r.points.length; j++) {
            r.points[j].y = h + j * 300;
            r.points[j].x = Math.random() * canvas.width;
          }
        }
        ctx.globalAlpha = r.opacity * alpha.m3;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(r.points[0].x, r.points[0].y);
        for (let j = 1; j < r.points.length; j++) {
          const xc = (r.points[j - 1].x + r.points[j].x) / 2;
          const yc = (r.points[j - 1].y + r.points[j].y) / 2;
          ctx.quadraticCurveTo(r.points[j - 1].x, r.points[j - 1].y, xc, yc);
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      // Lerp alpha transitions
      alpha.m1 += (targetAlpha.m1 - alpha.m1) * 0.03;
      alpha.m2 += (targetAlpha.m2 - alpha.m2) * 0.03;
      alpha.m3 += (targetAlpha.m3 - alpha.m3) * 0.03;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw active modes (crossfade)
      if (alpha.m1 > 0.01) drawStarfield();
      ctx.globalAlpha = 1;
      if (alpha.m2 > 0.01) drawNeuralNet();
      ctx.globalAlpha = 1;
      if (alpha.m3 > 0.01) drawAurora();
      ctx.globalAlpha = 1;
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ===== HERO 3D SPHERE + RINGS =====
  useEffect(() => {
    if (!heroCanvasRef.current || !loaded) return;
    const container = heroCanvasRef.current;
    const size = Math.min(container.clientWidth || 450, 500);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 500);
    camera.position.z = 220;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Core Sphere
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x001a33, emissive: 0x003355, specular: 0x00c2ff,
      shininess: 180, transparent: true, opacity: 0.9
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 32), coreMat);
    group.add(core);

    // Icosahedron cage
    const cageMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.20 });
    const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(62, 1), cageMat);
    group.add(cage);

    // Inner grid sphere
    const gridMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.08 });
    const gridSphere = new THREE.Mesh(new THREE.SphereGeometry(52, 16, 16), gridMat);
    group.add(gridSphere);

    // Orbital Ring 1 (equatorial)
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(85, 1.2, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x00c2ff, transparent: true, opacity: 0.5 })
    );
    group.add(ring1);

    // Satellite on ring 1
    const sat1 = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x3dffa0 })
    );
    group.add(sat1);

    // Orbital Ring 2 (tilted 55°)
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(95, 0.8, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x3dffa0, transparent: true, opacity: 0.3 })
    );
    ring2.rotation.x = 55 * Math.PI / 180;
    group.add(ring2);

    // Satellite on ring 2
    const sat2 = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xf0a500 })
    );
    group.add(sat2);

    // Orbital Ring 3 (tilted -35°)
    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(78, 0.6, 8, 60),
      new THREE.MeshBasicMaterial({ color: 0xf0a500, transparent: true, opacity: 0.2 })
    );
    ring3.rotation.z = -35 * Math.PI / 180;
    group.add(ring3);

    // Particle halo
    const haloGeo = new THREE.BufferGeometry();
    const haloCount = 300;
    const haloPos = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / haloCount);
      const theta = Math.sqrt(haloCount * Math.PI) * phi;
      haloPos[i * 3] = 110 * Math.cos(theta) * Math.sin(phi);
      haloPos[i * 3 + 1] = 110 * Math.sin(theta) * Math.sin(phi);
      haloPos[i * 3 + 2] = 110 * Math.cos(phi);
    }
    haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
    const haloMat = new THREE.PointsMaterial({ color: 0xc8e8ff, size: 1.5, transparent: true, opacity: 0.4 });
    const halo = new THREE.Points(haloGeo, haloMat);
    group.add(halo);

    scene.add(group);

    // Lighting
    scene.add(new THREE.AmbientLight(0x001133, 0.6));
    const pl1 = new THREE.PointLight(0x00c2ff, 3.0, 400);
    pl1.position.set(120, 80, 120);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x3dffa0, 1.5, 400);
    pl2.position.set(-100, -60, 80);
    scene.add(pl2);
    const pl3 = new THREE.PointLight(0xf0a500, 0.8, 400);
    pl3.position.set(0, -120, 0);
    scene.add(pl3);

    let targetRX = 0, targetRY = 0;
    let sat1Angle = 0, sat2Angle = 0;

    const handleMouse = (e: MouseEvent) => {
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.3;
      targetRY = (e.clientX / window.innerWidth - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', handleMouse);

    const anim = () => {
      requestAnimationFrame(anim);

      // Core pulse
      const pulse = 1.0 + 0.05 * Math.sin(Date.now() * 0.005);
      core.scale.set(pulse, pulse, pulse);

      // Rotations
      cage.rotation.y += 0.004;
      cage.rotation.x += 0.001;
      gridSphere.rotation.y -= 0.003;
      ring1.rotation.x += 0.007;
      ring2.rotation.y += 0.005;
      ring3.rotation.z += 0.004;
      halo.rotation.y += 0.002;

      // Satellite orbits
      sat1Angle += 0.012;
      sat1.position.set(
        85 * Math.cos(sat1Angle),
        0,
        85 * Math.sin(sat1Angle)
      );

      sat2Angle += 0.008;
      const s2x = 95 * Math.cos(sat2Angle);
      const s2y = 95 * Math.sin(sat2Angle) * Math.cos(55 * Math.PI / 180);
      const s2z = 95 * Math.sin(sat2Angle) * Math.sin(55 * Math.PI / 180);
      sat2.position.set(s2x, s2y, s2z);

      // Mouse interaction
      group.rotation.x += (targetRX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRY - group.rotation.y) * 0.05;

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
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.10;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.10;
      ring.style.left = ringPos.current.x + 'px';
      ring.style.top = ringPos.current.y + 'px';
      requestAnimationFrame(lerpLoop);
    };
    lerpLoop();

    const addHover = () => {
      document.querySelectorAll('a, button, .social-icon-btn, .hex-cell, .project-card').forEach(el => {
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
          roleEl.textContent = finalText.split("").map((c, i) => i < iter ? c : chars[Math.floor(Math.random() * chars.length)]).join("");
          iter += 0.5;
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

      // Hero pin + parallax exit
      gsap.to(".hero-text", {
        x: -120, opacity: 0,
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=150%", scrub: 1, pin: true }
      });
      gsap.to(".hero-3d", {
        scale: 0.6, opacity: 0, rotation: 30,
        scrollTrigger: { trigger: "#home", start: "top top", end: "+=150%", scrub: 1 }
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

      // ---- SKILLS: hex radial wave ----
      gsap.from(".hex-cell", {
        scale: 0, opacity: 0, rotation: 60,
        duration: 0.7, ease: "back.out(2)",
        stagger: { each: 0.04, from: "center", grid: "auto" },
        scrollTrigger: { trigger: ".hex-grid", start: "top 70%", toggleActions: "play none none reverse" }
      });

      // ---- PROJECTS: Horizontal scroll ----
      const track = document.querySelector('.projects-track') as HTMLElement;
      if (track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
        const horizontalTween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // Card entrance animations
        document.querySelectorAll('.project-card').forEach(card => {
          gsap.from(card, {
            y: 80, opacity: 0, rotationY: 25,
            duration: 0.9, ease: "power3.out",
            scrollTrigger: {
              trigger: card, start: "left 80%",
              containerAnimation: horizontalTween,
              toggleActions: "play none none reverse"
            }
          });
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
            if (burst) gsap.fromTo(burst.children, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, stagger: 0.03, ease: "power2.out" });
          }
        });
      });

      gsap.from('.achievement-card', {
        x: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: '.achievement-cards', start: "top 80%", toggleActions: "play none none reverse" }
      });

      // ---- EXPERIENCE: SVG line draw + alternating card slides ----
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

      document.querySelectorAll('.exp-entry').forEach((entry, i) => {
        const card = entry.querySelector('.exp-card');
        const node = entry.querySelector('.exp-node');
        const isLeft = i % 2 === 0;
        if (card) {
          gsap.from(card, {
            x: isLeft ? -80 : 80, opacity: 0, rotationY: isLeft ? -15 : 15,
            duration: 1.0, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }
          });
        }
        if (node) {
          gsap.from(node, {
            scale: 0, opacity: 0, duration: 0.6, ease: "back.out(3)",
            scrollTrigger: { trigger: node, start: "top 85%", toggleActions: "play none none reverse" }
          });
        }
      });

      // ---- CONTACT ----
      gsap.from('.radar-container', {
        scale: 0, duration: 1, ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".contact-section", start: "top 70%", toggleActions: "play none none reverse" }
      });
      gsap.from('.contact-form', {
        y: 80, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 70%", toggleActions: "play none none reverse" }
      });
      gsap.from('.contact-link-row', {
        x: -40, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-links", start: "top 85%", toggleActions: "play none none reverse" }
      });

      // ---- Section heading underlines via IntersectionObserver ----
      const headingLines = document.querySelectorAll('.heading-underline');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
        });
      }, { threshold: 0.5 });
      headingLines.forEach(el => io.observe(el));

    });

    return () => { ScrollTrigger.getAll().forEach((t: any) => t.kill()); };
  }, [loaded]);

  const scrollToSection = (id: string) => {
    gsap.to(window, { scrollTo: { y: `#${id}`, offsetY: 64 }, duration: 1.5, ease: "power4.inOut" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  const SocialIconButtons = ({ className = "", size = "" }: { className?: string; size?: string }) => (
    <div className={`social-icons-btns ${className}`}>
      {SOCIAL_ICONS.map(s => (
        <a key={s.tooltip} href={s.url} className={`social-icon-btn ${size}`} data-tooltip={s.tooltip} aria-label={s.tooltip}>
          <i className={s.icon}></i>
        </a>
      ))}
    </div>
  );

  const SectionDivider = () => (
    <div className="section-divider"></div>
  );

  const SectionHeading = ({ number, label, title, accent }: { number: string; label: string; title: string; accent: string }) => (
    <div className="section-heading-wrap">
      <span className="section-label">
        <span className="label-line"></span>
        <span className="label-number">{number}</span>
        {label}
      </span>
      <h2 className="section-heading" data-splitting>{title} <span className="accent">{accent}</span></h2>
      <div className="heading-underline"></div>
    </div>
  );

  const getCategoryTint = (cat: string) => {
    switch (cat) {
      case 'FRONTEND': return 'hex-frontend';
      case 'BACKEND': return 'hex-backend';
      case 'DATABASE': return 'hex-database';
      default: return 'hex-tools';
    }
  };

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

      {/* CURSORS */}
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* BG CANVAS */}
      <canvas id="bg-canvas" ref={bgCanvasRef}></canvas>

      {/* FOG */}
      <div className="fog-overlay">
        <div className="fog-blob"></div>
        <div className="fog-blob"></div>
        <div className="fog-blob"></div>
        <div className="fog-blob"></div>
      </div>

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
        <SocialIconButtons />
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
        <SocialIconButtons />
      </div>

      {/* SCROLL DOTS */}
      <div className="scroll-dots">
        {NAV_LINKS.map(id => (
          <div
            key={id}
            className={`scroll-dot ${activeNav === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
            data-tooltip={id}
          />
        ))}
      </div>

      <div className="content-wrapper">
        {/* ===== HERO ===== */}
        <section id="home" className="hero-section">
          <div className="hero-text">
            <div className="hero-status"><span className="dot"></span> SYSTEM ONLINE — 2025</div>
            <h1 className="hero-name">ALEX CHEN</h1>
            <div className="hero-role" ref={heroRoleRef}>&nbsp;</div>
            <div className="hero-tagline" ref={heroTaglineRef}>&nbsp;</div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>VIEW PROJECTS</button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>CONTACT ME</button>
            </div>
            <SocialIconButtons className="hero-social-btns" />
          </div>
          <div className="hero-3d" ref={heroCanvasRef}></div>
        </section>

        <SectionDivider />

        {/* ===== ABOUT ===== */}
        <section id="about" className="about-section">
          <SectionHeading number="01." label="WHO I AM" title="About" accent="Me" />
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

        <SectionDivider />

        {/* ===== SKILLS ===== */}
        <section id="skills" className="skills-section">
          <SectionHeading number="02." label="TECH ARSENAL" title="My" accent="Skills" />
          <div className="hex-grid">
            {SKILLS.map((skill, idx) => (
              <div
                className={`hex-cell ${getCategoryTint(skill.category)}`}
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(idx)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <i className={skill.icon} style={{ color: skill.iconColor, fontSize: 32 }}></i>
                <div className="hex-name">{skill.name}</div>
                <div className="hex-level">{skill.level}%</div>
                {hoveredSkill === idx && (
                  <svg className="proficiency-ring" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(var(--border-line))" strokeWidth="2" opacity="0.3" />
                    <circle
                      cx="50" cy="50" r="46" fill="none"
                      stroke={skill.category === 'FRONTEND' ? '#00c2ff' : skill.category === 'BACKEND' ? '#3dffa0' : skill.category === 'DATABASE' ? '#f0a500' : '#1a3a5c'}
                      strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 46}`}
                      strokeDashoffset={`${2 * Math.PI * 46 * (1 - skill.level / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ===== PROJECTS ===== */}
        <section className="projects-section">
          <SectionHeading number="03." label="MISSION LOG" title="Featured" accent="Projects" />
          <div className="projects-wrapper">
            <div className="projects-track">
              {PROJECTS.map(p => (
                <div className="project-card" key={p.id}>
                  <div className="project-visual" style={{ background: p.gradient }}>
                    <div className={`project-shape shape-${p.shape}`}></div>
                    <div className="project-visual-fade"></div>
                    <div className="project-mission">MISSION-{p.id}</div>
                    <div className={`project-status-badge ${p.status === 'DEPLOYED' ? 'deployed' : 'indev'}`}>
                      ● {p.status}
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-title">{p.title}</div>
                    <div className="project-title-line"></div>
                    <div className="project-desc">{p.desc}</div>
                    <div className="project-tech">
                      {p.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                    <div className="project-links">
                      <a href="#">↗ LIVE</a>
                      <a href="#">{"</>"} CODE</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ===== EDUCATION ===== */}
        <section id="education" className="education-section">
          <SectionHeading number="04." label="KNOWLEDGE BASE" title="Education" accent="" />
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

        <SectionDivider />

        {/* ===== ACHIEVEMENTS ===== */}
        <section className="achievements-section">
          <SectionHeading number="05." label="MILESTONES" title="Achievements" accent="" />
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

        <SectionDivider />

        {/* ===== EXPERIENCE ===== */}
        <section id="experience" className="experience-section">
          <SectionHeading number="06." label="MISSION HISTORY" title="Experience" accent="" />
          <div className="experience-timeline-new">
            <svg className="exp-spine-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00c2ff"/>
                  <stop offset="50%" stopColor="#3dffa0"/>
                  <stop offset="100%" stopColor="#f0a500"/>
                </linearGradient>
              </defs>
              <line className="exp-svg-path" x1="50%" y1="0" x2="50%" y2="100%"
                stroke="url(#timelineGradient)" strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,194,255,0.6))' }}
              />
            </svg>

            {EXPERIENCE.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div className={`exp-entry ${isLeft ? 'entry-left' : 'entry-right'}`} key={i}>
                  {/* Year label */}
                  {(i === 0 || exp.year !== EXPERIENCE[i-1].year) && (
                    <div className="exp-year-label">{exp.year}</div>
                  )}
                  {/* Node */}
                  <div className="exp-node">
                    <div className="exp-node-outer"></div>
                    <div className="exp-node-diamond"></div>
                    <div className="exp-node-pulse"></div>
                  </div>
                  {/* Connector */}
                  <div className="exp-connector"></div>
                  {/* Card */}
                  <div className="exp-card">
                    <div className="exp-card-header">
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-company">{exp.company}</div>
                    </div>
                    <div className="exp-date-bar">
                      <span>◀ {exp.date} ▶</span>
                      <span className="exp-duration">[{exp.duration}]</span>
                    </div>
                    <ul className="exp-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                    <span className={`exp-status ${exp.status}`}>[{exp.statusText}]</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <SectionDivider />

        {/* ===== CONTACT ===== */}
        <section id="contact" className="contact-section">
          <SectionHeading number="07." label="ESTABLISH CONNECTION" title="Contact" accent="Me" />
          <div className="contact-grid">
            <div>
              <div className="radar-container">
                <div className="radar-circle"></div>
                <div className="radar-circle"></div>
                <div className="radar-circle"></div>
                <div className="radar-circle"></div>
                <div className="radar-circle"></div>
                <div className="radar-sweep"></div>
                <div className="radar-blip" style={{ top: '30%', left: '60%', animationDelay: '0.5s' }}></div>
                <div className="radar-blip" style={{ top: '65%', left: '35%', animationDelay: '1.2s' }}></div>
                <div className="radar-blip" style={{ top: '45%', left: '72%', animationDelay: '2s' }}></div>
              </div>
              <div className="contact-links">
                {[
                  { icon: "fa-brands fa-github", text: "github.com/alexchen" },
                  { icon: "fa-brands fa-linkedin-in", text: "linkedin.com/in/alexchen" },
                  { icon: "fa-brands fa-x-twitter", text: "twitter.com/alexchendev" },
                  { icon: "fa-brands fa-instagram", text: "instagram.com/alexchen" },
                  { icon: "fa-solid fa-envelope", text: "alex@chendev.com" },
                  { icon: "fa-solid fa-code", text: "leetcode.com/alexchen" },
                  { icon: "fa-solid fa-globe", text: "alexchen.dev" },
                ].map((l, i) => (
                  <a className="contact-link-row" href="#" key={i}>
                    <i className={l.icon}></i>
                    <span className="separator">::</span>
                    <span>{l.text}</span>
                  </a>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <span className="prefix">{">>"} YOUR NAME:</span>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="form-field">
                <span className="prefix">{">>"} EMAIL:</span>
                <input type="email" required placeholder="john@example.com" />
              </div>
              <div className="form-field">
                <span className="prefix">{">>"} MESSAGE:</span>
                <textarea required placeholder="Let's collaborate..." rows={4}></textarea>
              </div>
              <button type="submit" className={`btn-transmit ${formSent ? 'sent' : ''}`}>
                {formSent ? '✓ SIGNAL TRANSMITTED' : '[[ TRANSMIT SIGNAL ]]'}
              </button>
            </form>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <div className="footer-logo">ALEX CHEN</div>
          <SocialIconButtons className="footer-social" size="large" />
          <div className="footer-status">[ ALL SYSTEMS NOMINAL ]</div>
          <div className="footer-copy">© 2025 Alex Chen. Built with ♥ and code.</div>
        </footer>
      </div>

      {/* BACK TO TOP */}
      <button className={`back-to-top ${showBackTop ? 'visible' : ''}`} onClick={() => gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: "power4.inOut" })} aria-label="Back to top">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}
