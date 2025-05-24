# Airbnb Clone

A modern Airbnb clone built with Next.js 14, featuring a responsive design and full-stack functionality.

![Airbnb Clone Preview](/public/github-readme-description.png)

## Description

This project is a feature-rich Airbnb clone that replicates the core functionality of the popular accommodation booking platform. It includes property listings, search functionality, user authentication, and booking management.

## Features

- 🔐 User Authentication with Kinde
- 🏠 Property Listings with Images
- 🔍 Advanced Search Functionality
- 📍 Location-based Search with Map Integration
- 📅 Date Range Selection
- 💳 Booking Management
- 📱 Responsive Design
- 🌐 Server-side Rendering
- 🔒 Protected Routes
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma with PostgreSQL
- **Authentication:** Kinde
- **Maps:** Leaflet
- **Testing:** Jest & React Testing Library
- **Icons:** Lucide React
- **UI Components:** Shadcn UI

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your environment variables:

- `KINDE_CLIENT_ID`
- `KINDE_CLIENT_SECRET`
- `KINDE_ISSUER_URL`
- `KINDE_SITE_URL`
- `KINDE_POST_LOGIN_REDIRECT_URL`
- `KINDE_POST_LOGOUT_REDIRECT_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

5. Run database migrations:

```bash
pnpm prisma generate
pnpm prisma db push
```

6. Start the development server:

```bash
pnpm dev
```

## Setup

1. **Database Setup**

   - Ensure PostgreSQL is installed and running
   - Create a new database
   - Update the DATABASE_URL in your .env file

2. **Authentication Setup**

   - Create a Kinde account
   - Set up a new application
   - Configure the callback URLs
   - Add the credentials to your .env file

3. **Cloudinary Setup**
   - Create a Cloudinary account
   - Create a new cloud
   - Add the cloud name to your .env file

## Development

- Run tests: `pnpm test`
- Run tests in watch mode: `pnpm test:watch`
- Build the project: `pnpm build`
- Start production server: `pnpm start`
- Run linting: `pnpm lint`

## Project Structure

```
├── app/
│   ├── components/     # React components
│   ├── actions/        # Server actions
│   ├── api/           # API routes
│   └── (routes)/      # App routes
├── public/            # Static files
├── prisma/           # Database schema
└── shared/           # Shared utilities
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
