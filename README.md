# Zeeshan Junaid's Portfolio Website

This is the repository for my personal portfolio website, where I showcase my work, skills, and experience as a UI/UX Designer and Frontend Developer.

## About The Project

This project is a personal portfolio website built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/). It's designed to be a clean, modern, and performant showcase of my projects and abilities.

### Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/) - Backend and real-time features
- [MDX](https://mdxjs.com/) - Blog content management

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm/bun) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/zeeshanjunaid/zeeshanjunaid.dev.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up environment variables
    ```sh
    cp .env.example .env.local
    ```
    Fill in the required environment variables:
    - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
    - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)
    - `RESEND_API_KEY`: Your Resend API key for contact form emails

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the application in production mode. The application should be compiled with `npm run build` first.

### `npm run lint`

Runs the linter to catch any code style issues.

## Features

- **Responsive Design:** Fully responsive layout that looks great on all devices.
- **Dark Mode:** Theme toggling between light and dark modes.
- **Animations:** Smooth animations and transitions using Framer Motion.
- **Component-Based Architecture:** Built with a modular and reusable component structure.
- **Contact Form:** A functional contact form that sends emails using Resend.
- **Blog System:** MDX-based blog with syntax highlighting and interactive components.
- **Comment System:** Real-time commenting system with nested replies, likes, and authentication.
- **Authentication:** User authentication powered by Supabase Auth.
- **Real-time Updates:** Live updates for comments and interactions using Supabase Realtime.

## Dependencies

This project uses a variety of modern technologies and libraries, including:

- **`@radix-ui/react-*`**: A collection of low-level UI components for building high-quality, accessible design systems.
- **`class-variance-authority` & `clsx`**: For creating flexible and maintainable UI components with Tailwind CSS.
- **`framer-motion`**: For creating beautiful animations.
- **`lucide-react`**: A library of simply beautiful icons.
- **`next-themes`**: For handling themes in a Next.js application.
- **`react-hook-form` & `zod`**: For building and validating forms.
- **`tailwind-merge`**: A utility for merging Tailwind CSS classes.
- **`tailwindcss-animate`**: A plugin for adding animations to Tailwind CSS.
- **`resend`**: For handling contact form email functionality.
- **`@supabase/supabase-js`**: JavaScript client for Supabase backend services.
- **`@supabase/ssr`**: Server-side rendering utilities for Supabase.
- **`@mdx-js/loader` & `@mdx-js/react`**: For MDX content processing and rendering.
- **`date-fns`**: Modern JavaScript date utility library.

For a full list of dependencies, please see the `package.json` file.

## Recent Updates

### Comment System Complete Overhaul (Latest)

- **🚀 Performance Optimization**: Implemented optimized database functions with 98% reduction in queries (solved N+1 problem)
- **🔍 Advanced Search**: Full-text search functionality for comments with PostgreSQL's ts_rank
- **📊 Analytics Dashboard**: Comment engagement analytics with metrics and top commenters
- **🛡️ Moderation System**: Admin dashboard for managing reported comments and user content
- **⚡ Real-time Updates**: Enhanced real-time subscriptions with targeted updates instead of full refetch
- **🎨 Enhanced UI/UX**: Modern comment interface with sorting, pagination, and virtual scrolling
- **🔒 Security Improvements**: Server-side rate limiting, spam detection, and proper authentication
- **📱 Mobile Optimization**: Responsive design with touch-friendly interactions

### Key Features:
- ✅ **Optimized Performance**: Single-query comment loading with like counts
- ✅ **Comment Search**: Search through comments by content and author names
- ✅ **Sorting Options**: Sort by newest, oldest, most liked, most replies
- ✅ **Comment Editing**: Inline editing for comment authors
- ✅ **Report System**: Users can report inappropriate comments
- ✅ **Admin Moderation**: Dedicated admin dashboard at `/admin/comments`
- ✅ **Analytics**: Comment engagement metrics and insights
- ✅ **Rate Limiting**: Server-side protection against spam
- ✅ **Real-time Updates**: Live comment updates without page refresh
- ✅ **Nested Replies**: Multi-level comment threading
- ✅ **Like System**: Comment liking with real-time updates
- ✅ **Authentication**: Secure user authentication with Supabase Auth

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact

Zeeshan Junaid - [@ZeeshanJunaid](https://twitter.com/your-twitter) - hello@zeeshanjunaid.dev

Project Link: [https://github.com/zeeshanjunaid/zeeshanjunaid.dev](https://github.com/zeeshanjunaid/zeeshanjunaid.dev)
