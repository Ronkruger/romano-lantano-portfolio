import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    slug: 'discover-group-travel-services',
    title: 'Discover Group Travel Services',
    eyebrow: 'Travel platform',
    summary: 'A booking-focused travel website paired with an admin experience for tours and packages.',
    description: 'A comprehensive travel booking platform with a client-facing site and an admin panel for managing tours, packages, and bookings.',
    imageUrl: '/images/dg.png',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    role: 'Full-stack developer',
    timeframe: '2025',
    githubUrl: 'https://github.com/Ronkruger/discoverGroup',
    demoUrl: 'https://discoverg.netlify.app/',
    demoAdminUrl: 'https://admindiscovergrp.netlify.app/',
    problem: 'The travel service needed a stronger web presence and a more manageable way to present packages and booking paths.',
    solution: 'Built a full-stack platform with public-facing package discovery and an admin surface for managing the core travel content.',
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
    imageUrl: '/images/background-color-picker.png',
    stack: ['HTML', 'CSS', 'JavaScript'],
    role: 'Frontend developer',
    timeframe: '2024',
    githubUrl: 'https://github.com/Ronkruger/background-color-picker',
    demoUrl: 'https://dainty-cassata-231695.netlify.app/',
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
    imageUrl: '/images/tip_calculator.png',
    stack: ['HTML', 'CSS'],
    role: 'Frontend developer',
    timeframe: '2024',
    githubUrl: 'https://github.com/Ronkruger/tip-calculator-for-business',
    demoUrl: 'https://stellar-belekoy-0d4dde.netlify.app/',
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
    imageUrl: '/images/yt2mp3.png',
    stack: ['HTML', 'CSS', 'Vite'],
    role: 'Frontend developer',
    timeframe: '2024',
    githubUrl: 'https://github.com/Ronkruger/yt2mp3',
    demoUrl: 'https://fanciful-choux-59513a.netlify.app/?fbclid=IwY2xjawHsZBVleHRuA2FlcQIxMAABHaGboEt4IcXkMMjbhNzRCPAwhVYxXS-NMn5BSY9UT_oaF09G3d6EW77RQw_aem_Ew78kp8TJZf0sx6UkwsgVA',
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
    imageUrl: '/images/hotel.png',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    role: 'Full-stack developer',
    timeframe: '2023',
    githubUrl: 'https://github.com/Ronkruger/hotel-website-w-email-registration',
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
    imageUrl: '/images/proshop.png',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    role: 'Full-stack developer',
    timeframe: '2024',
    githubUrl: 'https://github.com/Ronkruger/shop-v2',
    demoUrl: 'https://proshop-3rqi.onrender.com/',
    problem: 'The shop needed familiar e-commerce patterns backed by a modern JavaScript stack.',
    solution: 'Built a MERN stack storefront with product browsing and checkout-oriented user flow.',
    highlights: ['Product catalog', 'Checkout flow', 'MERN architecture', 'Responsive storefront'],
    outcome: 'A practical e-commerce build showing full-stack product thinking.',
    accent: '#f2cc8f',
  },
];

async function main() {
  for (const [index, project] of projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: { ...project, sortOrder: index, featured: true },
      create: { ...project, sortOrder: index, featured: true },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });