# Overview

This is a personal portfolio website for Zeeshan Junaid, a freelance UI/UX designer and frontend developer with 8+ years of experience. The website showcases his work, services, client testimonials, and provides a platform for potential clients to connect with him. Built as a modern, high-performance web application, it serves as both a portfolio and a lead generation tool for his freelance business.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses **Next.js 14** with the App Router architecture for optimal performance and modern React patterns. The frontend is built with **TypeScript** for type safety and **Tailwind CSS** for utility-first styling. **Framer Motion** provides smooth animations and micro-interactions throughout the site.

The component architecture follows a modular pattern with reusable UI components built using **Radix UI** primitives and **shadcn/ui** for consistent design system implementation. The app uses a container-based layout system for consistent spacing and responsive design.

## Content Management
Blog posts are managed through **MDX files** stored in the content directory, processed using **next-mdx-remote** and **gray-matter**. This provides a developer-friendly content management system without requiring a database or CMS. Project data and other content are managed through TypeScript data files for type safety.

## Styling System
The design system is built on **Tailwind CSS** with custom design tokens defined in the configuration. Dark mode support is implemented using **next-themes** with seamless theme switching. Custom fonts (Switzer and AO) are loaded using Next.js font optimization.

## Email Integration
Contact form functionality uses **Resend** API for reliable email delivery with custom email templates. Form validation is handled through **React Hook Form** with **Zod** schema validation for robust client-side validation.

## Performance Optimization
The application implements several performance optimizations including Next.js automatic image optimization with AVIF/WebP formats, dynamic imports for code splitting, and proper meta tags for SEO. **Vercel Analytics** and **Speed Insights** provide performance monitoring.

## Component Organization
Components are organized into logical groups:
- UI components in `components/ui/` (based on shadcn/ui)
- Feature components in `components/`
- Page-specific components in route directories
- Data management through dedicated files in `data/`

# External Dependencies

## Core Framework
- **Next.js 14**: React framework with App Router for server-side rendering and static site generation
- **React 18**: Frontend library with modern hooks and concurrent features
- **TypeScript**: Type safety and improved developer experience

## Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Headless UI primitives for accessible components
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Framer Motion**: Animation library for smooth interactions
- **next-themes**: Theme management for dark/light mode support

## Content & Forms
- **next-mdx-remote**: MDX processing for blog posts
- **gray-matter**: Frontmatter parsing for blog posts
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation library

## Email & Communication
- **Resend**: Email delivery service for contact forms
- **Axios**: HTTP client for API requests

## Analytics & Monitoring
- **Vercel Analytics**: User analytics and insights
- **Vercel Speed Insights**: Performance monitoring

## Development Tools
- **ESLint**: Code linting with Next.js configuration
- **PostCSS**: CSS processing with Tailwind integration
- **Autoprefixer**: CSS vendor prefixing

## Icon Libraries
- **Lucide React**: Modern icon library
- **React Icons**: Additional icon sets for social media and branding
- **devicons-react**: Technology/framework icons for skills display

## Additional Features
- **react-country-flag**: Country flag components for testimonials
- **react-player**: Video player for testimonial videos
- **react-masonry-css**: Masonry layout for content grids
- **cmdk**: Command palette functionality
- **nextjs-toploader**: Page loading progress indicator