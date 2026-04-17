# My Gallery - Creative Portfolio Blog

![App Preview](https://imgix.cosmicjs.com/411e65f0-3a72-11f1-9280-bf44b40df479-autopilot-photo-1506126613408-eca07ce68773-1776439781712.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive blog built with Next.js 16 and Cosmic CMS, featuring posts, authors, and categories.

## Features

- 📝 Blog posts with rich content and featured images
- 👤 Author profiles with bios and avatars
- 🏷️ Category-based content organization
- 🖼️ Optimized images via imgix
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 16

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69e251a29b97908e11634e27&clone_repository=69e2527f9b97908e11634e4d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a photography portfolio with photo galleries, collections, an about section, and client testimonials.
> 
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Gallery". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
> 
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- A Cosmic account with bucket configured

### Installation

```bash
bun install
bun dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with author and categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .depth(1)

// Fetch single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug })
  .depth(1)
```

## Cosmic CMS Integration

The app integrates with three content types: posts, authors, and categories. Posts connect to authors (single) and categories (multiple).

## Deployment

Deploy to Vercel or Netlify with the following environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->