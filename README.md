# Danalyst - Professional Data Analysis Learning Platform

Danalyst is a comprehensive web application that provides professional data analysis education through interactive courses, personalized mentoring, and AI-powered learning tools.

## 🚀 Features

- **Multi-Provider Authentication**: Email/Password, Microsoft Azure AD, and Google
- **Payment Integration**: MercadoPago for premium memberships
- **AI-Powered Tools**: Analysis template generator and course content creation
- **Blog System**: Educational content and resources
- **Responsive Design**: Works across all devices
- **Premium Membership**: Advanced features and exclusive content

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Authentication**: NextAuth.js
- **Payments**: MercadoPago
- **Deployment**: Azure App Service, Vercel

## 📋 Prerequisites

- Node.js 22.x or later
- npm 9.x or later
- PostgreSQL database
- MercadoPago account
- Google Cloud Platform account
- Microsoft Azure AD account

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd danalyst
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with your credentials (see `.env.example`)

5. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment

The application is configured for deployment on:
- **Azure App Service** (primary)
- **Vercel** (alternative)

See deployment guides in the `/docs` folder for detailed instructions.

## 📁 Project Structure

```
src/
├── app/                 # Next.js 13+ app directory
├── components/          # Reusable React components
├── lib/                # Core utilities and services
└── tests/              # Test files

prisma/                 # Database schema and migrations
public/                 # Static assets
.github/workflows/      # CI/CD pipelines
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.