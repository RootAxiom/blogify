import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── Three.js Scene Components ─── */

function FloatingBlob({ position, color, speed, distort, scale }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef();
  const count = 600;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function FloatingRing({ position, color, scale }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 48]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={1.5}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#818cf8" />
      <pointLight position={[5, -3, 5]} intensity={0.6} color="#c084fc" />
      <FloatingBlob position={[-2.5, 0.5, 0]} color="#6366f1" speed={0.6} distort={0.45} scale={1.3} />
      <FloatingBlob position={[2.8, -0.8, -2]} color="#8b5cf6" speed={0.4} distort={0.35} scale={0.9} />
      <FloatingBlob position={[0.5, 1.8, -1]} color="#a78bfa" speed={0.5} distort={0.5} scale={0.7} />
      <FloatingRing position={[-1.5, -1.5, -1]} color="#c084fc" scale={0.5} />
      <FloatingRing position={[3, 1.5, -3]} color="#6366f1" scale={0.35} />
      <ParticleField />
    </>
  );
}

/* ─── Counter Animation Hook ─── */
function useCountUp(target, suffix = '', duration = 2) {
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const num = { val: 0 };
          gsap.to(num, {
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate: () => setDisplay(Math.round(num.val).toLocaleString() + suffix),
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return { ref, display };
}

/* ─── Main Component ─── */

const LandingPage = ({ onGetStarted }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);
  const ctaRef = useRef(null);
  const stepsRef = useRef(null);
  const stepItemsRef = useRef([]);
  const testimonialRef = useRef(null);

  const stat1 = useCountUp(1000, '+');
  const stat2 = useCountUp(5000, '+');
  const stat3 = useCountUp(50, 'K+');
  const stat4 = useCountUp(99, '%');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slide-in
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Hero text stagger
      const heroTl = gsap.timeline({ delay: 0.4 });
      heroTl
        .from(heroHeadingRef.current?.children || [], {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
        })
        .from(heroSubRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from(heroBtnsRef.current?.children || [], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
        }, '-=0.4');

      // Feature cards
      featureCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
        });
      });

      // Features heading
      if (featuresRef.current) {
        gsap.from(featuresRef.current.querySelectorAll('.features-header > *'), {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      // Steps section
      stepItemsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });

      // CTA parallax
      if (ctaRef.current) {
        gsap.from(ctaRef.current.querySelectorAll('.cta-inner > *'), {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          },
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Testimonials
      if (testimonialRef.current) {
        gsap.from(testimonialRef.current.querySelectorAll('.testimonial-card'), {
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMagnetic = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  };
  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      ),
      title: 'Distraction-Free Editor',
      desc: 'Write in a clean, minimal interface with full Markdown support. Your words take center stage — no clutter, no noise.',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      title: 'Secure by Default',
      desc: 'Enterprise-grade authentication, role-based permissions, and encrypted data. Your content and accounts stay protected.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
      ),
      title: 'Rich Media Embeds',
      desc: 'Drop in images, code blocks, and media with zero friction. Posts that look stunning on every device, every time.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
      ),
      title: 'Admin Dashboard',
      desc: 'Full control over your platform — manage users, moderate content, and track analytics from a powerful admin panel.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: 'Mobile Optimized',
      desc: 'Responsive from the ground up. Write on your laptop, read on your phone — the experience is seamless everywhere.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Lightning Fast',
      desc: 'Built with modern tech for instant page loads. No bloat, no lag — just speed that keeps your readers engaged.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      title: 'We ❤️ Open Source',
      desc: 'Blogify is fully open source. Browse the code, report bugs, suggest features, or submit a PR — contributions are always welcome!',
      color: 'from-gray-500 to-zinc-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0h.375a2.625 2.625 0 0 1 0 5.25H3.375a2.625 2.625 0 0 1 0-5.25H3.75" />
        </svg>
      ),
      title: 'Self-Hostable',
      desc: 'Own your data. Deploy Blogify on your own infrastructure in minutes with Docker. Full control, zero vendor lock-in.',
      color: 'from-sky-500 to-indigo-500',
    },
  ];

  const steps = [
    { num: '01', title: 'Create your account', desc: 'Sign up in seconds with email verification — no credit card required.' },
    { num: '02', title: 'Write your first post', desc: 'Open the editor, start typing, and format with simple Markdown syntax.' },
    { num: '03', title: 'Publish & share', desc: 'Hit publish and share your post with a clean, shareable link instantly.' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'Tech Blogger', text: "Switched from WordPress and never looked back. The editor is buttery smooth and my readers love the clean design.", avatar: 'SC' },
    { name: 'Marcus Rivera', role: 'Freelance Writer', text: "Finally a platform that doesn't get in the way of writing. I publish three times a week now — it used to be a chore.", avatar: 'MR' },
    { name: 'Priya Sharma', role: 'Content Strategist', text: "The admin tools are excellent. Managing a team of 12 writers is effortless with the role-based system.", avatar: 'PS' },
  ];

  return (
    <div ref={containerRef} className="landing-page bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* ─── Navbar ─── */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0f]/70 border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <pre className="text-[4px] leading-[4px] font-mono text-indigo-400 select-none" aria-hidden="true">{`
    ++++++++
    ++++++++
    ++++++++
     +++++++
      ++++++
     +++++++
      +++++
  +++++++++++
    +++++++++
  ++++  ++++ 
   =++++++++
     ++++++
      ++++
       ++
       +
`}</pre>
            <span className="text-lg font-semibold tracking-tight text-white/90">Blogify</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/privacy')}
              className="hidden sm:inline-flex text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate('/Contact')}
              className="hidden sm:inline-flex text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5"
            >
              Contact
            </button>
            <a
              href="https://github.com/blackXploit-404/blogify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors p-1.5"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <button
              onClick={onGetStarted}
              onMouseMove={handleMagnetic}
              onMouseLeave={handleMagneticLeave}
              className="relative px-5 py-2 text-sm font-medium rounded-lg bg-white text-[#0a0a0f] hover:bg-white/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
     <section className="relative min-h-screen flex items-center justify-center pt-10">
        {/* Three.js background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_75%)]" />

        {/* --- CHANGED: Added flex flex-col items-center here --- */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center w-full">
          
          {/* --- CHANGED: Added flex-col items-center to the heading wrapper --- */}
          <div ref={heroHeadingRef} className="flex flex-col items-center w-full">
            
            {/* --- CHANGED: Changed inline-block to block so it stacks vertically --- */}
            <pre className="block text-[8px] leading-[8px] sm:text-[10px] sm:leading-[10px] font-mono text-indigo-400 mb-6 select-none" aria-hidden="true">{`
    +++++++
    ++++++++
    ++++++++
     +++++++
      ++++++
     +++++++
      ++++
  +++++++++++
   ++++++++++
  ++++  +++= 
   =++++++++
     ++++++
      ++++
       ++
       +
`}</pre>
            <span className="inline-block mb-5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              The modern blogging platform
            </span>
            <h1 className="text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight">
              <span className="block text-white/95">Your ideas deserve</span>
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                a beautiful home.
              </span>
            </h1>
          </div>
          
          <p
            ref={heroSubRef}
            className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Write, publish, and grow your audience on a platform crafted for people who care about the craft of writing. No distractions — just your voice.
          </p>

          {/* --- CHANGED: Ensured w-full and flex justify-center on the button wrapper --- */}
          <div ref={heroBtnsRef} className="mt-10 flex w-full justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group relative px-6 py-3.5 text-base font-semibold rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_0_32px_-4px_rgba(99,102,241,0.5)] hover:shadow-[0_0_48px_-4px_rgba(99,102,241,0.7)] transition-shadow text-center"
            >
              Start Writing — It's Free
              <span className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            {/* If you are keeping the 'Learn More' button, put it back here. If not, remove this comment! */}
          </div>
        </div>
      </section>

      {/* ─── Trusted / Stats ─── */}
      <section className="relative py-24 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-center text-sm uppercase tracking-widest text-white/30 mb-14 font-medium">Trusted by writers worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { ref: stat1.ref, display: stat1.display, label: 'Active Writers' },
              { ref: stat2.ref, display: stat2.display, label: 'Published Posts' },
              { ref: stat3.ref, display: stat3.display, label: 'Monthly Readers' },
              { ref: stat4.ref, display: stat4.display, label: 'Uptime' },
            ].map((s, i) => (
              <div key={i} ref={s.ref}>
                <div className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {s.display}
                </div>
                <div className="mt-2 text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section ref={featuresRef} className="py-28 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
          <div className="features-header text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Everything you need,{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                nothing you don't.
              </span>
            </h2>
            <p className="mt-4 text-white/40 text-lg max-w-2xl mx-auto">
              A focused set of tools built for writers who value simplicity and power in equal measure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                ref={(el) => (featureCardsRef.current[i] = el)}
                className="group relative p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:border-white/[0.12]"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 text-white shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section ref={stepsRef} className="py-28 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Up and running in{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">minutes.</span>
            </h2>
          </div>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div
                key={i}
                ref={(el) => (stepItemsRef.current[i] = el)}
                className="flex items-start gap-6 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <span className="shrink-0 text-3xl font-black bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {s.num}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section ref={testimonialRef} className="py-28 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-14">
            Loved by{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">writers.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <p className="text-sm text-white/50 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.name}</p>
                    <p className="text-xs text-white/30">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section ref={ctaRef} className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.06] to-transparent pointer-events-none" />
        <div className="cta-inner max-w-3xl mx-auto text-center px-5 sm:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Ready to share{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">your story?</span>
          </h2>
          <p className="mt-4 text-white/40 text-lg max-w-xl mx-auto">
            Join thousands of writers who chose a better way to blog. Free to start, no strings attached.
          </p>
          <button
            onClick={onGetStarted}
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
            className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-white text-[#0a0a0f] hover:bg-white/90 transition-colors shadow-[0_0_40px_-8px_rgba(255,255,255,0.3)]"
          >
            Create Your Free Account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/[0.06] pt-16 pb-10 bg-[#060609]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <pre className="text-[4px] leading-[4px] font-mono text-indigo-400 select-none" aria-hidden="true">{`
    +++++++
    ++++++++
    ++++++++
     +++++++
      ++++++
     +++++++
      ++++
  +++++++++++
   ++++++++++
  ++++  +++= 
   =++++++++
     ++++++
      ++++
       ++
       +
`}</pre>
                <span className="text-lg font-semibold text-white/90">Blogify</span>
              </div>
              <p className="text-sm text-white/30 max-w-sm leading-relaxed mb-5">
                A modern, open-source blogging platform that empowers writers to share their stories and connect with readers worldwide.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/blackXploit-404/blogify" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://x.com/notaddedyet" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="X (Twitter)">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://instagram.com/notaddedyet" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><button onClick={() => navigate('/')} className="hover:text-white/70 transition-colors">Features</button></li>
                <li><a href="https://github.com/blackXploit-404/blogify" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Source Code</a></li>
                <li><button onClick={() => navigate('/')} className="hover:text-white/70 transition-colors">Self-Host</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm text-white/30">
                <li><a href="https://github.com/blackXploit-404/blogify/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Report Issue</a></li>
                <li><button onClick={() => navigate('/Contact')} className="hover:text-white/70 transition-colors">Contact</button></li>
                <li><button onClick={() => navigate('/privacy')} className="hover:text-white/70 transition-colors">Privacy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col items-center gap-5">
            <a
              href="https://stats.uptimerobot.com/ucLvlFewRq/802168320"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Check Server Status
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </a>
            <p className="text-xs text-white/20">&copy; 2026 Blogify. All rights reserved.</p>
            <p className="text-[11px] text-white/15 text-center leading-relaxed">
              This page is a landing demo page. Some information displayed may not be accurate and is shown for demonstration purposes only.
              <a href='/learnmore' className="underline text-white/30 hover:text-white transition-colors ml-1">Learn more</a>.

            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;