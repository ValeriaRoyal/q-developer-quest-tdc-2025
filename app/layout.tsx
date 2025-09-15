import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { WebVitalsReporter } from '@/components/WebVitalsReporter'
import { CriticalResourcePreloader } from '@/components/CriticalResourcePreloader'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://catalogo-hotwheels.vercel.app'),
  title: {
    default: 'Hot Wheels Catalog - Gerencie sua Coleção',
    template: '%s | Hot Wheels Catalog'
  },
  description: 'Sistema completo para catalogar e gerenciar sua coleção de miniaturas Hot Wheels. Desenvolvido com Amazon Q Developer.',
  keywords: ['Hot Wheels', 'coleção', 'miniaturas', 'catálogo', 'carros'],
  authors: [{ name: 'Amazon Q Developer' }],
  creator: 'Amazon Q Developer',
  publisher: 'TDC São Paulo 2025',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://catalogo-hotwheels.vercel.app',
    title: 'Hot Wheels Catalog',
    description: 'Sistema para catalogar sua coleção de miniaturas Hot Wheels',
    siteName: 'Hot Wheels Catalog',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@amazonq',
    title: 'Hot Wheels Catalog',
    description: 'Sistema para catalogar sua coleção de miniaturas Hot Wheels',
  },
  icons: {
    shortcut: '/logo.svg',
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <CriticalResourcePreloader />
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = theme === 'dark' || (!theme && systemDark);
                  
                  const html = document.documentElement;
                  if (isDark) {
                    html.classList.add('dark');
                    html.style.colorScheme = 'dark';
                  } else {
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                  }
                } catch (e) {
                  console.warn('Theme initialization failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 ease-in-out`}>
        <WebVitalsReporter />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Pular para o conteúdo principal
        </a>
        <ErrorBoundary>
          <Providers>
            <main id="main-content" role="main">
              {children}
            </main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
