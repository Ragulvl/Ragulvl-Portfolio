'use client'

import { useEffect, useState, useRef } from 'react'
import {
  motion, useScroll, useTransform, useSpring, useInView,
  AnimatePresence
} from 'framer-motion'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import {
  Mail, Phone, MapPin, Github, Linkedin,
  Send, ArrowDown, ChevronRight, Download, Briefcase, ArrowUpRight,
  Menu, X, Award, Trophy, Users, GraduationCap
} from 'lucide-react'
import {
  SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript,
  SiMongodb, SiMysql, SiSpringboot, SiGit, SiExpress, SiTailwindcss, SiNextdotjs,
  SiCodechef, SiLeetcode, SiCodeforces, SiGithub, SiPostman,
  SiPostgresql, SiRedis, SiDocker
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

// ============ DATA ============
const personalInfo = {
  name: 'RAGUL VL',
  firstName: 'RAGUL',
  lastName: 'VL',
  role: 'Full Stack Developer | AI & Data Science Engineer | Solving Real-World Problems Through Scalable Products',
  tagline: 'B.Tech AI & DS @ KIT Coimbatore',
  resumeLink: 'https://drive.google.com/file/d/1_WL7_iCNwi5gKBf169Yq3wdBiXPZLO7B/view?usp=drive_link',
  email: 'ragulkamelash@gmail.com',
  phone: '+91 9626199577',
  location: 'Coimbatore, India',
  github: 'https://github.com/ragulvl',
  linkedin: 'https://linkedin.com/in/ragulvl',
  image: '/Ragulvl-Portfolio/profile.jpg',
}

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_0i693ai',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
}

const education = {
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  college: 'Kalaignar Karunanidhi Institute of Technology (KIT)',
  location: 'Coimbatore, India',
  year: '2023 – 2027',
  cgpa: '7.45',
}

const aboutBio = 'A passionate Full Stack Developer and AI & Data Science undergraduate at KIT Coimbatore, driven by a love for building scalable, real-world products. With a strong foundation in competitive programming — rated 5★ on CodeChef (Div 1) and 1700+ on LeetCode — I bring problem-solving rigor to every project I build. From end-to-end e-commerce platforms to food-tech applications, I enjoy turning complex ideas into clean, performant code. Always learning, always shipping.'

const projects = [
  {
    id: '01',
    title: 'Dinez',
    category: 'Food Tech',
    description: 'Built a production-ready campus food ordering platform using PostgreSQL and MongoDB. Implemented real-time order tracking using Socket.IO and Redis. Integrated Razorpay and PhonePe payment gateways with secure authentication workflows. Designed CI/CD pipelines, monitoring systems, health checks, and load-testing infrastructure.',
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'MongoDB', 'Socket.IO', 'Redis'],
    year: '2026',
    link: 'https://dinez.in/',
  },
  {
    id: '02',
    title: 'Thesium',
    category: 'AI Platform',
    description: 'Developed an AI-powered thesis generation platform with a multi-stage content pipeline. Engineered scalable BullMQ and Redis workflows for asynchronous processing. Implemented secure authentication, payment integration, and PostgreSQL database management. Established testing and CI/CD workflows for automated validation and deployment.',
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'BullMQ', 'Redis'],
    year: '2026',
    link: 'https://github.com/Ragulvl',
  },
  {
    id: '03',
    title: 'Archon',
    category: 'AI Engineering',
    description: 'Built an AI software engineering platform powered by a multi-agent architecture. Designed orchestration workflows coordinating planning, architecture, and coding agents. Implemented scalable backend services and PostgreSQL data management. Deployed a production-ready platform with Redis caching and monitoring support.',
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Redis', 'AI Agents'],
    year: '2026',
    link: 'https://github.com/Ragulvl',
  },
]

// Grouped skill categories with icons
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    ],
  },
]

const achievements = [
  { number: '01', title: '5⭐', subtitle: 'CodeChef Div 1 (2109) | Global Rank 3', icon: SiCodechef },
  { number: '02', title: '1717', subtitle: 'LeetCode Rating | 260+ Solved', icon: SiLeetcode },
  { number: '03', title: '1570', subtitle: 'Codeforces Rating | Best Rank 139', icon: SiCodeforces },
]

const certifications = [
  'AWS Academy Graduate – Cloud Foundations',
  'Approximation Algorithms and Linear Programming',
  'Algorithms for Searching, Sorting, and Indexing',
  'Dynamic Programming & Greedy Algorithms',
  'Advanced Linear Models for Data Science 1 & 2',
]

const detailedAchievements = [
  '1st Place – Code Relay Coding Competition, Karpagam College of Engineering',
  'Promoted to CodeChef Division 1, reflecting strong competitive problem-solving skills',
  'Top 16 Rank – College-level Codethon Programming Contest',
]

const leadership = [
  'Secretary, YouTubers and Photography Club, Kalaignar Karunanidhi Institute of Technology',
  'Mentored peers in competitive programming and placement-oriented problem-solving',
  'Demonstrated rapid learning by independently adapting to new technologies through hands-on projects',
]

// ============ PROFESSIONAL ANIMATION VARIANTS ============
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

// ============ MAGNETIC BUTTON COMPONENT ============
const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ============ ANIMATED TEXT SPLIT ============
const AnimatedText = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                delay: delay + i * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ============ GLOWING ORB ANIMATION ============
const GlowingOrb = ({ size = 400, color = 'amber', className = '' }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color === 'amber'
          ? 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(184,149,111,0.15) 0%, transparent 70%)'
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

// ============ REVEAL ON SCROLL ============
const RevealOnScroll = ({ children, width = "100%", delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: 'linear-gradient(90deg, #D4A574, #B8956F)',
          zIndex: 20,
        }}
      />
    </div>
  )
}

// ============ SCROLL DIRECTION HOOK ============
const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState('down')
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const updateScrollDir = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setScrollDir('down')
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDir('up')
      }
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', updateScrollDir, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDir)
  }, [])

  return { scrollDir, scrollY }
}

// ============ ADVANCED CURSOR ============
const FluidCursor = () => {
  const cursorRef = useRef(null)
  const cursorInnerRef = useRef(null)
  const trailsRef = useRef([])
  const pos = useRef({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')

  useEffect(() => {
    const cursor = cursorRef.current
    const inner = cursorInnerRef.current
    let trails = []

    // Create fewer, more subtle trail elements
    for (let i = 0; i < 6; i++) {
      const trail = document.createElement('div')
      trail.className = 'fixed rounded-full pointer-events-none z-[9997]'
      trail.style.width = `${6 - i * 0.5}px`
      trail.style.height = `${6 - i * 0.5}px`
      trail.style.background = `rgba(212, 165, 116, ${0.4 - i * 0.06})`
      trail.style.transform = 'translate(-50%, -50%)'
      document.body.appendChild(trail)
      trails.push({ el: trail, x: 0, y: 0 })
    }
    trailsRef.current = trails

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out',
      })

      gsap.to(inner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
      })
    }

    // Trail animation loop
    const animateTrails = () => {
      let x = pos.current.x
      let y = pos.current.y

      trails.forEach((trail, i) => {
        const speed = 0.25 - i * 0.03
        trail.x += (x - trail.x) * speed
        trail.y += (y - trail.y) * speed
        trail.el.style.left = trail.x + 'px'
        trail.el.style.top = trail.y + 'px'
        x = trail.x
        y = trail.y
      })

      requestAnimationFrame(animateTrails)
    }
    animateTrails()

    const onHover = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setIsHovering(true)
        setCursorLabel(target.dataset.cursor || '')
      }
    }

    const onLeave = () => {
      setIsHovering(false)
      setCursorLabel('')
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onHover)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onHover)
      document.removeEventListener('mouseout', onLeave)
      trails.forEach(t => t.el.remove())
    }
  }, [])

  return (
    <div className="hidden lg:block">
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full border border-amber-400/30"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          width: isHovering ? (cursorLabel ? 60 : 40) : 28,
          height: isHovering ? (cursorLabel ? 60 : 40) : 28,
          backgroundColor: isHovering ? 'rgba(212, 165, 116, 0.05)' : 'rgba(0, 0, 0, 0)',
          borderColor: isHovering ? 'rgba(212, 165, 116, 0.4)' : 'rgba(212, 165, 116, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Label */}
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] font-semibold text-amber-400 uppercase tracking-wide text-center"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          width: isHovering ? 0 : 6,
          height: isHovering ? 0 : 6,
          backgroundColor: '#D4A574',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}

// ============ HORIZONTAL SCROLL TEXT ============
const MarqueeText = ({ children, direction = 1 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block px-4">{children}</span>
        ))}
      </motion.div>
    </div>
  )
}

// ============ TEXT WRAPPER (no animation - child handles it) ============
const DirectionalText = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// ============ PARALLAX ELEMENT (Both directions) ============
const Parallax = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}

// ============ ROTATING ELEMENT ON SCROLL ============
const ScrollRotate = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 20 })

  return (
    <motion.div ref={ref} style={{ rotate: smoothRotate }} className={className}>
      {children}
    </motion.div>
  )
}

// ============ SCALE ON SCROLL ============
const ScrollScale = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <motion.div ref={ref} style={{ scale: smoothScale, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

// ============ HORIZONTAL LINE REVEAL ============
const LineReveal = ({ className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className={`h-[1px] bg-neutral-800 relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500"
        initial={{ left: '-100%', right: '100%' }}
        animate={isInView ? { left: '0%', right: '0%' } : { left: '-100%', right: '100%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

// ============ STAGGER TEXT ============
const StaggerText = ({ text, className = '', delay = 0 }) => {
  const chars = text.split('')

  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      }
    },
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      }
    }
  }

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap text-white ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={charVariants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ============ NUMBER COUNTER ============
const NumberCounter = ({ value, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [displayValue, setDisplayValue] = useState(value)

  // Extract numeric part and suffix
  const numericMatch = value.match(/(\d+)/)
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0
  const prefix = value.substring(0, value.indexOf(numericMatch?.[1] || ''))
  const suffix = value.substring((value.indexOf(numericMatch?.[1] || '') + (numericMatch?.[1]?.length || 0)))

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const duration = 2000 // 2 seconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(numericValue * easeOutQuart)

      setDisplayValue(`${prefix}${currentValue}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, numericValue, value, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : `${prefix}0${suffix}`}
    </span>
  )
}

// ============ MORPH CARD ============
const MorphCard = ({ children, className = '', ...props }) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setTransform({
      rotateX: (y - centerY) / 15,
      rotateY: (centerX - x) / 15,
    })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      animate={{
        rotateX: -transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ============ SIMPLE BACKGROUND ============
const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 80% at 50% -20%, rgba(212, 165, 116, 0.08), transparent),
              radial-gradient(ellipse 60% 60% at 100% 100%, rgba(212, 165, 116, 0.05), transparent),
              radial-gradient(ellipse 50% 50% at 0% 80%, rgba(139, 90, 43, 0.05), transparent)
            `
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 165, 116, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 165, 116, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

// ============ CONTACT FORM ============
const ContactForm = () => {
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    console.log('Sending email using config:', {
      serviceId: emailConfig.serviceId,
      templateId: emailConfig.templateId,
      publicKeyLength: emailConfig.publicKey ? emailConfig.publicKey.length : 0,
    })

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailConfig.serviceId,
          template_id: emailConfig.templateId,
          user_id: emailConfig.publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: personalInfo.name,
          }
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        const errorText = await response.text()
        console.error('EmailJS Error Response:', errorText)
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-neutral-900/50 border border-amber-500/30 rounded-xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center"
        >
          <Send className="w-8 h-8 text-amber-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-neutral-400">Thank you for reaching out. I'll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-amber-400 hover:text-amber-300 text-sm"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-5 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-5 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-5 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
        />
      </motion.div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-4 bg-amber-500 text-neutral-900 font-semibold rounded-xl flex items-center justify-center gap-2 overflow-hidden relative group disabled:opacity-70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-cursor="Send"
      >
        <span className="relative z-10">
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </span>
        <Send className="w-5 h-5 relative z-10" />
        <motion.div
          className="absolute inset-0 bg-amber-400"
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </form>
  )
}

// ============ PROJECT ITEM ============
const ProjectItem = ({ project, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative py-10 border-b border-neutral-800/30 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="View"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/3 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative grid grid-cols-12 gap-4 items-center">
        {/* Number */}
        <motion.div
          className="col-span-2 lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <span className="text-5xl lg:text-6xl font-black text-neutral-800/60 group-hover:text-amber-500/30 transition-colors">
            {project.id}
          </span>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="col-span-10 lg:col-span-7"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        >
          <span className="text-amber-400 text-xs font-mono uppercase tracking-widest">
            {project.category}
          </span>
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-100 mt-1 group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-500 text-sm mt-2 line-clamp-2">
            {project.description}
          </p>
        </motion.div>

        {/* Tech & Year */}
        <motion.div
          className="col-span-12 lg:col-span-4 flex items-center justify-between lg:justify-end gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] rounded-full border border-neutral-700/50 text-neutral-500 group-hover:border-amber-500/30 group-hover:text-neutral-400 transition-colors"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] text-neutral-600">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Year & Arrow */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-600 text-sm font-mono">{project.year}</span>
            <motion.div
              animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-5 h-5 text-amber-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.a>
  )
}

// ============ TECH ICON ============
const TechIcon = ({ tech, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const Icon = tech.icon

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200
      }}
    >
      <motion.div
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-neutral-900/80 border border-neutral-800/50 flex items-center justify-center cursor-pointer relative overflow-hidden"
        whileHover={{
          scale: 1.15,
          borderColor: tech.color,
          boxShadow: `0 0 30px ${tech.color}40`
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        data-cursor={tech.name}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${tech.color}25 0%, transparent 70%)`
          }}
        />

        {/* Actual Icon */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            className="w-10 h-10 md:w-12 md:h-12"
            style={{ color: tech.color }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ============ ACHIEVEMENT CARD ============
const AchievementCard = ({ item, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="relative p-6 rounded-xl bg-neutral-900/40 border border-neutral-800/40 overflow-hidden hover:border-amber-500/30 transition-all duration-300">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex items-center gap-5">
          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-6 h-6 text-amber-400" />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <div className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
              <NumberCounter value={item.title} />
            </div>
            <p className="text-sm text-neutral-500 mt-0.5">{item.subtitle}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============ BACK TO TOP ============
const BackToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow cursor-pointer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowDown className="w-5 h-5 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ============ MAIN COMPONENT ============
export default function Portfolio() {
  const { scrollDir } = useScrollDirection()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden cursor-none">
      <FluidCursor />
      <FloatingShapes />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Scroll direction indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 text-xs text-neutral-500 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ rotate: scrollDir === 'up' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
        <span>{scrollDir.toUpperCase()}</span>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-neutral-950/30 border-b border-neutral-800/30"
      >
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            className="text-xl font-black tracking-tighter"
            whileHover={{ scale: 1.1 }}
            data-cursor="Home"
          >
            <span className="text-amber-400">R</span>VL
          </motion.div>

          <div className="hidden md:flex items-center gap-10">
            {['Work', 'Skills', 'About', 'Contact'].map((item, i) => (
              <MagneticButton key={item}>
                <motion.button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm text-neutral-400 hover:text-white transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  data-cursor={item}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </MagneticButton>
            ))}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 backdrop-blur-xl bg-neutral-950/90 flex items-center justify-center"
          >
            <motion.div
              className="flex flex-col items-center gap-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                }
              }}
            >
              {['Work', 'Skills', 'About', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase())
                    setMobileMenuOpen(false)
                  }}
                  className="text-3xl font-bold text-neutral-300 hover:text-amber-400 transition-colors"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  {item}
                </motion.button>
              ))}

              <motion.div
                className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              />

              <motion.div
                className="flex items-center gap-6"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-400 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="text-neutral-400 hover:text-amber-400 transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Glowing ambient orbs */}
        <GlowingOrb size={600} className="top-20 -left-48" />
        <GlowingOrb size={500} color="gold" className="bottom-20 -right-48" />

        <div className="container mx-auto px-6 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Photo */}
            <Parallax speed={-0.3}>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScrollRotate className="absolute -inset-8 border border-amber-500/20 rounded-full" />
                {/* Second rotating ring */}
                <motion.div
                  className="absolute -inset-12 border border-amber-500/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={personalInfo.image}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </Parallax>

            {/* Text */}
            <div className="text-center lg:text-left">
              <motion.div
                className="flex items-center gap-3 mb-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-neutral-400">Available for work</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 100, rotateX: -80 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-neutral-100">{personalInfo.firstName}</span>{' '}
                </motion.span>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 100, rotateX: -80 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-amber-400">{personalInfo.lastName}</span>
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-xl md:text-2xl text-neutral-400">{personalInfo.role}</p>
                <p className="text-sm md:text-base text-amber-400/70 font-mono mt-2">{personalInfo.tagline}</p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={staggerItem}>
                  <MagneticButton>
                    <motion.button
                      onClick={() => scrollToSection('work')}
                      className="group px-8 py-4 bg-amber-500 text-neutral-900 font-semibold rounded-full flex items-center gap-2 overflow-hidden relative"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="Click"
                    >
                      <span className="relative z-10">View Work</span>
                      <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <motion.div
                        className="absolute inset-0 bg-amber-400"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </MagneticButton>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <MagneticButton>
                    <motion.button
                      onClick={() => scrollToSection('contact')}
                      className="group px-8 py-4 border border-neutral-700 text-neutral-300 font-semibold rounded-full overflow-hidden relative hover:border-amber-500 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="Click"
                    >
                      <span className="relative z-10">Contact</span>
                      <motion.div
                        className="absolute inset-0 bg-amber-500/10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ borderRadius: '9999px' }}
                      />
                    </motion.button>
                  </MagneticButton>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <MagneticButton>
                    <motion.a
                      href={personalInfo.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group px-8 py-4 font-semibold rounded-full overflow-hidden relative flex items-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #D4A574 0%, #C4956A 50%, #B4855A 100%)',
                        boxShadow: '0 0 20px rgba(212, 165, 116, 0.3), 0 0 40px rgba(212, 165, 116, 0.1)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(212, 165, 116, 0.5), 0 0 60px rgba(212, 165, 116, 0.2)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="Download"
                    >
                      <Download className="w-5 h-5 text-neutral-900 relative z-10" />
                      <span className="text-neutral-900 relative z-10">Download Resume</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-neutral-500 uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            className="w-5 h-10 border border-neutral-700 rounded-full flex justify-center pt-2"
            animate={{ borderColor: ['rgba(115,115,115,1)', 'rgba(212,165,116,1)', 'rgba(115,115,115,1)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-amber-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Ambient glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Glass card */}
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800/50 backdrop-blur-sm overflow-hidden">
                {/* Gradient accent line */}
                <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-amber-400 via-orange-400 to-transparent rounded-full" />

                {/* Decorative quote mark */}
                <span className="absolute top-4 right-8 text-[120px] md:text-[180px] font-serif text-amber-500/5 leading-none select-none pointer-events-none">&ldquo;</span>

                <div className="relative z-10 pl-6">
                  <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">ABOUT ME</span>
                  <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mt-6 font-light">
                    {aboutBio}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-12 border-y border-neutral-800/30 overflow-hidden">
        <MarqueeText direction={1} baseSpeed={15}>
          <span className="text-6xl md:text-8xl font-black text-neutral-800/30">
            PROJECTS • WORK • DEVELOPMENT • CODE •
          </span>
        </MarqueeText>
      </div>

      {/* ========== WORK ========== */}
      <section id="work" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <DirectionalText>
              <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">SELECTED WORK</span>
            </DirectionalText>
            <DirectionalText className="mt-4">
              <h2 className="text-5xl md:text-7xl font-black">
                <StaggerText text="Featured Projects" />
              </h2>
            </DirectionalText>
          </div>

          <div>
            {projects.map((project, i) => (
              <ProjectItem key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE ========== */}
      <section id="experience" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <DirectionalText>
              <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">CAREER</span>
            </DirectionalText>
            <DirectionalText className="mt-4">
              <h2 className="text-5xl md:text-7xl font-black">
                <StaggerText text="Experience" />
              </h2>
            </DirectionalText>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />

              {/* Experience Card */}
              <motion.div
                className="ml-6 md:ml-20 p-6 md:p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl relative"
                whileHover={{ borderColor: 'rgba(212, 165, 116, 0.3)', x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[30px] md:-left-[52px] top-8 w-4 h-4 rounded-full bg-amber-500 border-4 border-neutral-950" />

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Web Development Intern</h3>
                      <p className="text-amber-400 font-medium">LearnLogicify Technologies</p>
                    </div>
                  </div>
                  <span className="text-neutral-500 text-sm font-mono">Coimbatore</span>
                </div>

                {/* Bullet points */}
                <ul className="space-y-3 text-neutral-300">
                  <motion.li
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>Contributed to the development of full-stack web applications using React, Node.js, MongoDB, and RESTful APIs in a collaborative environment.</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>Assisted in optimizing deployment workflows and implemented Git-based version control along with secure API integrations.</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span>Took ownership of end-to-end development for the Fusion Forge PCs platform, coordinating frontend features, backend services, and admin functionalities.</span>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== EDUCATION ========== */}
      <section className="py-24 bg-neutral-900/30 relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <DirectionalText>
              <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">ACADEMICS</span>
            </DirectionalText>
            <DirectionalText className="mt-4">
              <h2 className="text-5xl md:text-7xl font-black">
                <StaggerText text="Education" />
              </h2>
            </DirectionalText>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Ambient glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-neutral-800/50 backdrop-blur-sm overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-[100px]" />

                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* CGPA Ring */}
                  <motion.div
                    className="relative w-28 h-28 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(64,64,64,0.3)" strokeWidth="6" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="url(#cgpaGradient)" strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${(parseFloat(education.cgpa) / 10) * 264} 264`}
                        initial={{ strokeDashoffset: 264 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="cgpaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#D97706" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-amber-400">{education.cgpa}</span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">CGPA</span>
                    </div>
                  </motion.div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                      <GraduationCap className="w-5 h-5 text-amber-400" />
                      <span className="text-neutral-500 text-sm font-mono">{education.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{education.degree}</h3>
                    <p className="text-amber-400/80 font-medium mb-3">{education.college}</p>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-500 text-sm">{education.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SKILLS ========== */}
      <section id="skills" className="py-24 bg-neutral-900/30 relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <DirectionalText>
              <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">TECH STACK</span>
            </DirectionalText>
            <DirectionalText className="mt-4">
              <h2 className="text-5xl md:text-7xl font-black">
                <StaggerText text="Skills" />
              </h2>
            </DirectionalText>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-amber-500/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-amber-400 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col items-center gap-1.5 p-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50 hover:border-amber-500/40 transition-colors group"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <skill.icon
                        className="w-6 h-6 transition-colors"
                        style={{ color: skill.color }}
                      />
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <LineReveal className="mt-12" />
        </div>
      </section>

      {/* ========== ABOUT — UNIFIED SECTION ========== */}
      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <DirectionalText>
              <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">ABOUT ME</span>
            </DirectionalText>
            <DirectionalText className="mt-4">
              <h2 className="text-5xl md:text-7xl font-black">
                <StaggerText text="Highlights" />
              </h2>
            </DirectionalText>
          </div>

          {/* CP Milestones */}
          <div className="mb-16">
            <h3 className="text-sm font-mono text-amber-400/70 uppercase tracking-[0.2em] mb-6 text-center">Competitive Programming</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {achievements.map((item, i) => (
                <AchievementCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          <LineReveal className="mb-16" />

          {/* Achievements + Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Achievements
              </h3>
              <div className="space-y-3">
                {detailedAchievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl hover:border-amber-500/30 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm group-hover:text-white transition-colors">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl hover:border-amber-500/30 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm group-hover:text-white transition-colors">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 justify-center">
              <Users className="w-5 h-5 text-amber-400" />
              Leadership & Activities
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {leadership.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-neutral-900/50 border border-neutral-800/50 rounded-xl hover:border-amber-500/30 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <span className="text-neutral-300 text-sm group-hover:text-white transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee 2 */}
      <div className="py-10 overflow-hidden">
        <MarqueeText direction={-1} baseSpeed={60}>
          <span className="text-5xl md:text-7xl font-black text-neutral-800/30">
            REACT • NODE • PYTHON • JAVA • MONGODB • TYPESCRIPT •
          </span>
        </MarqueeText>
      </div>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="py-24 bg-neutral-900/30 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <DirectionalText>
                <span className="text-amber-400 font-mono text-sm tracking-[0.3em]">GET IN TOUCH</span>
              </DirectionalText>
              <DirectionalText className="mt-4">
                <h2 className="text-5xl md:text-7xl font-black">
                  <StaggerText text="Let's Connect" />
                </h2>
              </DirectionalText>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <ScrollScale>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: 'Email', value: personalInfo.email },
                    { icon: Phone, label: 'Phone', value: personalInfo.phone },
                    { icon: MapPin, label: 'Location', value: personalInfo.location },
                  ].map((item, i) => (
                    <MorphCard key={i} data-cursor="Copy">
                      <motion.div
                        className="flex items-center gap-5 p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/50"
                        whileHover={{ x: 10, borderColor: 'rgba(212,165,116,0.5)' }}
                      >
                        <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider">{item.label}</p>
                          <p className="text-neutral-100 font-medium">{item.value}</p>
                        </div>
                      </motion.div>
                    </MorphCard>
                  ))}
                </div>
              </ScrollScale>

              <ScrollScale>
                <ContactForm />
              </ScrollScale>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-800/30 relative overflow-hidden">
        <GlowingOrb size={300} className="-bottom-32 left-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Social Links */}
            <motion.div
              className="flex items-center gap-6"
              variants={staggerContainer}
            >
              {[
                { icon: Github, href: personalInfo.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' }
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors relative group"
                  variants={staggerItem}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor={social.label}
                >
                  <social.icon className="w-5 h-5" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
              variants={fadeInUp}
            />

            {/* Copyright */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-2 text-center"
              variants={fadeInUp}
            >
              <p className="text-neutral-500 text-sm">© 2026 Ragul VL</p>
              <span className="hidden md:inline text-neutral-700">•</span>
              <motion.p
                className="text-neutral-600 text-sm font-mono"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #737373, #D4A574, #737373)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Crafted with passion
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* ========== BACK TO TOP ========== */}
      <BackToTop />
    </div>
  )
}
