# Pavithran Portfolio

Professional developer portfolio website built for performance, accessibility, and clean presentation of projects, skills, and experience.

Repository visibility: Private

## Live Website

https://pavithraninfo.dev/

## Overview

This project is a modern single-page portfolio application powered by Vite, React, and TypeScript. It includes responsive layouts, smooth animations, production-ready SEO setup, and an optimized build pipeline.

## Core Features

- Responsive UI for desktop, tablet, and mobile devices
- Interactive project showcase and skills sections
- Structured sections for About, Experience, Education, and Contact
- SEO-friendly metadata with canonical domain configuration
- Automatically generated sitemap during production builds

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion

## Project Setup

1. Ensure you have access to this private repository.
2. Clone the repository.
3. Install dependencies.
4. Start the local development server.

```sh
npm install
npm run dev
```

## Access Requirements

- You must be explicitly added as a collaborator to access this repository.
- Use a GitHub account with approved access rights.
- For deployment access, your Git identity and deployment permissions must match project settings.

## Available Scripts

- `npm run dev`  
  Starts the development server.

- `npm run build`  
  Generates a production build.

- `npm run preview`  
  Serves the production build locally for validation.

- `npm run test`  
  Runs the test suite.

- `npm run seo:generate`  
  Generates the sitemap file used for search indexing.

## Deployment

Standard production flow:

1. Build the project.
2. Deploy the generated output.

```sh
npm run build
npm run preview
```

If deploying through Vercel from a private repository:

- Ensure the commit author has deployment permissions for the linked Vercel project.
- Hobby plan has collaboration limits for private repositories.
- For multi-contributor private-repo deployment workflows, use Vercel Pro or a single authorized deploy account.

## SEO Configuration

- Canonical domain: https://pavithraninfo.dev/
- Sitemap generation script: `scripts/generate-sitemap.mjs`
- Robots reference: https://pavithraninfo.dev/sitemap.xml

## Project Structure

- `src`  
  Application source code
- `public`  
  Static assets and SEO files
- `scripts`  
  Utility scripts including sitemap generation

## Collaboration Guidelines

- This is a private project; collaboration is restricted to approved contributors.
- Use dedicated branches for changes.
- Keep commits focused and use clear commit messages.
- Open a pull request for review before merging to the main branch.
