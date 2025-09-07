# Overview

This repository contains Zeeshan Junaid's personal portfolio website - a modern, performance-focused Next.js application showcasing his work as a UI/UX Designer and Frontend Developer. The site features a comprehensive portfolio, blog, services pages, client testimonials, and contact functionality. Built with a focus on clean design, smooth animations, and excellent user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 14 with App Router for modern React-based SSR/SSG
- **Styling**: Tailwind CSS with custom design system and Shadcn/UI components
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Typography**: Custom local fonts (Switzer and AO) with font optimization
- **Theme System**: Next-themes for dark/light mode switching with persistent preferences

## Content Management
- **Blog System**: File-based MDX content with gray-matter for frontmatter parsing
- **Code Highlighting**: React Syntax Highlighter with custom code blocks
- **Static Data**: TypeScript modules for portfolio projects, reviews, and services

## UI Component System
- **Design System**: Shadcn/UI with Radix UI primitives as foundation
- **Layout Components**: Responsive container system with custom breakpoints
- **Interactive Elements**: Custom hover effects, blur backgrounds, and gradient animations
- **Form Components**: React Hook Form with Zod validation for type-safe forms

## Performance Optimizations
- **Image Optimization**: Next.js Image component with AVIF/WebP format support
- **Code Splitting**: Automatic route-based splitting with dynamic imports
- **Font Loading**: Local font optimization with font-display: swap
- **Loading States**: Skeleton components and Suspense boundaries for better UX

## SEO and Analytics
- **Metadata Management**: Dynamic Open Graph and Twitter Card generation
- **Structured Data**: JSON-LD schema markup for Person, Organization, and WebSite
- **Sitemap Generation**: Dynamic XML sitemap including blog posts and projects
- **Performance Monitoring**: Vercel Analytics and Speed Insights integration

# External Dependencies

## Email Service
- **Resend API**: Transactional email service for contact form submissions
- **Email Templates**: React-based email templates with table-based styling

## Analytics and Monitoring
- **Vercel Analytics**: User behavior tracking and page view analytics
- **Vercel Speed Insights**: Core Web Vitals monitoring and performance metrics

## Content and Media
- **Next.js Image Optimization**: Built-in image processing and optimization
- **React Player**: Video playback for testimonial videos
- **React Country Flag**: Country flag components for international client reviews

## Development Tools
- **TypeScript**: Full type safety across the application
- **ESLint**: Code quality and consistency enforcement
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Framer Motion**: Production-ready animation library

## UI Dependencies
- **Radix UI**: Accessible primitive components (Dialog, Dropdown, Toast, etc.)
- **Lucide React**: Consistent icon library with tree-shaking support
- **React Icons**: Additional icon sets for social media and technology logos
- **Class Variance Authority**: Type-safe variant API for component styling

## Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation for form data
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation