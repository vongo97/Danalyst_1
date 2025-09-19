// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter as Geist } from "next/font/google";
import { JetBrains_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["análisis de datos", "data science", "cursos online", "aprendizaje", "IA", "plantillas de análisis"],
  authors: [
    {
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@analystacademy",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="Access-Control-Allow-Origin" content="https://share.minicoursegenerator.com/" />
        <script src="https://share.minicoursegenerator.com/viewer.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            const app = new MiniCourse();
            document.addEventListener("DOMContentLoaded", function () {
              app.init({
                code: "python-e-ia-para-principiantes-fundamentos-datos-y-modelos-e8dba3", 
                share: false
              });
            });
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ErrorBoundary>
          <AuthProvider>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}