import {
  BriefcaseBusiness,
  Code2,
  Database,
  Gauge,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  type LucideIcon,
} from 'lucide-react';
import profileImage from '../../images/profile.png';
import discoverGroupImage from '../../images/dg.png';
import colorPickerImage from '../../images/background-color-picker.png';
import tipCalculatorImage from '../../images/tip_calculator.png';
import youtubeMp3Image from '../../images/yt2mp3.png';
import hotelImage from '../../images/hotel.png';
import proshopImage from '../../images/proshop.png';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface ProjectLinks {
  github: string;
  demo?: string;
  demoAdmin?: string;
}

export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  stack: string[];
  role: string;
  timeframe: string;
  links: ProjectLinks;
  problem: string;
  solution: string;
  highlights: string[];
  outcome: string;
  accent: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  quote: string;
  author: string;
  rating: number;
  context: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Contact', href: '/#contact' },
];

export const profile = {
  name: 'Romano Lantano',
  title: 'Full-stack web developer',
  location: 'Philippines',
  email: 'romanolantano.dev@gmail.com',
  resumeUrl: '/resume/Lantano_Romano_resume.pdf',
  image: profileImage,
  intro:
    'I design and build responsive web products with a focus on polished interfaces, reliable application logic, and client-friendly delivery.',
};

export const heroStats: HeroStat[] = [
  { value: '5+', label: 'launched projects' },
  { value: '2+', label: 'client collaborations' },
  { value: '4.9', label: 'average review' },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend craft',
    description: 'Interfaces that feel responsive, structured, and easy to scan across screen sizes.',
    icon: Palette,
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    title: 'Application logic',
    description: 'Full-stack workflows, data handling, authentication patterns, and maintainable APIs.',
    icon: TerminalSquare,
    skills: ['Node.js', 'Express', 'PHP', 'REST APIs', 'Form handling', 'Git'],
  },
  {
    title: 'Data and platforms',
    description: 'Practical database design and integrations for production-facing web applications.',
    icon: Database,
    skills: ['MySQL', 'MongoDB', 'Odoo', 'Netlify', 'Render', 'GitHub'],
  },
];

export const services: Service[] = [
  {
    title: 'Frontend development',
    description:
      'Responsive product interfaces with clear hierarchy, polished motion, and performance-aware implementation.',
    icon: Code2,
    features: ['Responsive layouts', 'Component-driven UI', 'Interactive states', 'Performance tuning'],
  },
  {
    title: 'Backend development',
    description:
      'Server-side workflows, database-backed features, and pragmatic integrations for real business needs.',
    icon: Server,
    features: ['RESTful APIs', 'Database design', 'Authentication flows', 'Deployment support'],
  },
  {
    title: 'Web product polish',
    description:
      'Refinements that make an app easier to trust: accessibility, visual consistency, and launch readiness.',
    icon: Sparkles,
    features: ['Accessibility checks', 'UI refinement', 'Bug fixing', 'Launch QA'],
  },
];

export const projects: Project[] = [
  {
    slug: 'discover-group-travel-services',
    title: 'Discover Group Travel Services',
    eyebrow: 'Travel platform',
    summary: 'A booking-focused travel website paired with an admin experience for tours and packages.',
    description:
      'A comprehensive travel booking platform with a client-facing site and an admin panel for managing tours, packages, and bookings.',
    image: discoverGroupImage,
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    role: 'Full-stack developer',
    timeframe: '2025',
    links: {
      github: 'https://github.com/Ronkruger/discoverGroup',
      demo: 'https://discoverg.netlify.app/',
      demoAdmin: 'https://admindiscovergrp.netlify.app/',
    },
    problem:
      'The travel service needed a stronger web presence and a more manageable way to present packages and booking paths.',
    solution:
      'Built a full-stack platform with public-facing package discovery and an admin surface for managing the core travel content.',
    highlights: ['Public travel package browsing', 'Admin management experience', 'Booking-oriented information architecture'],
    outcome: 'A more complete digital workflow for presenting travel services and converting inquiries.',
    accent: '#8fd3ff',
  },
  {
    slug: 'background-color-picker',
    title: 'Background Color Picker',
    eyebrow: 'Design utility',
    summary: 'A simple visual tool for exploring and copying background color values.',
    description: 'An intuitive tool to select and visualize color codes for web design backgrounds.',
    image: colorPickerImage,
    stack: ['HTML', 'CSS', 'JavaScript'],
    role: 'Frontend developer',
    timeframe: '2024',
    links: {
      github: 'https://github.com/Ronkruger/background-color-picker',
      demo: 'https://dainty-cassata-231695.netlify.app/',
    },
    problem: 'Color selection tools can feel abstract when the user cannot immediately see the result in context.',
    solution: 'Created a direct manipulation interface where users can preview background choices instantly.',
    highlights: ['Instant color preview', 'Copy-friendly color values', 'Lightweight browser-native implementation'],
    outcome: 'A fast utility for experimenting with UI background colors during design work.',
    accent: '#d9b46d',
  },
  {
    slug: 'tip-calculator',
    title: 'Tip Calculator',
    eyebrow: 'Utility app',
    summary: 'A focused calculator for quick tip amounts and simple bill splitting.',
    description: 'A simple and efficient application to compute tip amounts and split bills easily.',
    image: tipCalculatorImage,
    stack: ['HTML', 'CSS'],
    role: 'Frontend developer',
    timeframe: '2024',
    links: {
      github: 'https://github.com/Ronkruger/tip-calculator-for-business',
      demo: 'https://stellar-belekoy-0d4dde.netlify.app/',
    },
    problem: 'Users need a quick way to calculate tips without visual clutter or unnecessary steps.',
    solution: 'Built a compact calculator interface with clear input flow and immediate output.',
    highlights: ['Fast calculation flow', 'Compact responsive layout', 'Simple bill-splitting logic'],
    outcome: 'A practical micro-tool that demonstrates clean form interaction and calculation feedback.',
    accent: '#7dd3a8',
  },
  {
    slug: 'youtube-to-mp3',
    title: 'YouTube to MP3',
    eyebrow: 'Media utility',
    summary: 'A fast front-end experience for converting video links into downloadable audio format.',
    description: 'A tool concept for converting YouTube videos into MP3 audio format.',
    image: youtubeMp3Image,
    stack: ['HTML', 'CSS', 'Vite'],
    role: 'Frontend developer',
    timeframe: '2024',
    links: {
      github: 'https://github.com/Ronkruger/yt2mp3',
      demo: 'https://fanciful-choux-59513a.netlify.app/?fbclid=IwY2xjawHsZBVleHRuA2FlcQIxMAABHaGboEt4IcXkMMjbhNzRCPAwhVYxXS-NMn5BSY9UT_oaF09G3d6EW77RQw_aem_Ew78kp8TJZf0sx6UkwsgVA',
    },
    problem: 'The tool needed a clear input-to-result flow that users could understand immediately.',
    solution: 'Designed a focused landing interaction with a simple URL input and clear conversion path.',
    highlights: ['Single-purpose flow', 'Vite-powered setup', 'Responsive utility interface'],
    outcome: 'A direct utility experience built around speed and clarity.',
    accent: '#ffb4a8',
  },
  {
    slug: 'hotel-reservation-platform',
    title: 'Hotel Website',
    eyebrow: 'Reservation system',
    summary: 'A hotel reservation platform with registration and email confirmation workflows.',
    description: 'A hotel reservation platform with user registration and email confirmation features.',
    image: hotelImage,
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    role: 'Full-stack developer',
    timeframe: '2023',
    links: {
      github: 'https://github.com/Ronkruger/hotel-website-w-email-registration',
    },
    problem: 'The reservation flow needed server-side persistence and user registration support.',
    solution: 'Implemented a PHP and MySQL-backed booking workflow with email confirmation behavior.',
    highlights: ['Reservation flow', 'User registration', 'Email confirmation', 'MySQL data model'],
    outcome: 'A complete full-stack reservation concept for hospitality workflows.',
    accent: '#c4b5fd',
  },
  {
    slug: 'online-shop-mern-stack',
    title: 'Online Shop MERN Stack',
    eyebrow: 'E-commerce',
    summary: 'A MERN commerce experience for browsing gadgets and moving through checkout.',
    description: 'An online shop for gadgets with product browsing, checkout, and delivery-oriented flows.',
    image: proshopImage,
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    role: 'Full-stack developer',
    timeframe: '2024',
    links: {
      github: 'https://github.com/Ronkruger/shop-v2',
      demo: 'https://proshop-3rqi.onrender.com/',
    },
    problem: 'The shop needed familiar e-commerce patterns backed by a modern JavaScript stack.',
    solution: 'Built a MERN stack storefront with product browsing and checkout-oriented user flow.',
    highlights: ['Product catalog', 'Checkout flow', 'MERN architecture', 'Responsive storefront'],
    outcome: 'A practical e-commerce build showing full-stack product thinking.',
    accent: '#f2cc8f',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2025',
    title: 'Web developer at Discover Group Travel Services',
    description: 'Building travel-focused web experiences and improving digital workflows for package discovery.',
    icon: BriefcaseBusiness,
  },
  {
    year: '2024',
    title: 'MERN stack projects',
    description: 'Built full-stack applications with React, Node.js, Express, and MongoDB.',
    icon: Layers3,
  },
  {
    year: '2023',
    title: 'Reservation and backend systems',
    description: 'Worked with PHP and MySQL to create server-backed booking and registration workflows.',
    icon: ShieldCheck,
  },
  {
    year: '2022',
    title: 'Frontend specialization',
    description: 'Focused on responsive interfaces, JavaScript fundamentals, and modern web UI patterns.',
    icon: Globe2,
  },
  {
    year: '2021',
    title: 'Web development foundation',
    description: 'Started building with HTML, CSS, and JavaScript while developing a practical project habit.',
    icon: Rocket,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'He is easy to communicate.',
    author: 'Rh****d Ro****e',
    rating: 4.7,
    context: 'Client review',
  },
  {
    quote: 'Approachable and quick to address client concerns, plus the pricing is just right.',
    author: 'R***n S***n',
    rating: 5,
    context: 'Client review',
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Ronkruger',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/romano-lantano-418870234/',
    icon: Users,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/R2sl1/',
    icon: Globe2,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

export const credibilityMetrics = [
  { label: 'Performance-minded builds', icon: Gauge },
  { label: 'Client-first communication', icon: Users },
  { label: 'Production-ready delivery', icon: MapPin },
];

export const getProjectBySlug = (slug: string | undefined) => projects.find((project) => project.slug === slug);

export const getAdjacentProjects = (slug: string | undefined) => {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    return { previousProject: null, nextProject: null };
  }

  return {
    previousProject: projects[(currentIndex - 1 + projects.length) % projects.length],
    nextProject: projects[(currentIndex + 1) % projects.length],
  };
};