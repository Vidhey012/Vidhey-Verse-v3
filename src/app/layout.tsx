import type { Metadata } from 'next';
import { Orbitron, Rajdhani, JetBrains_Mono, Share_Tech_Mono } from 'next/font/google';
import './globals.css';
import { TronCursor } from '@/components/cursor/TronCursor';
import { TronNav } from '@/components/navigation/TronNav';
import { ThreeCanvas } from '@/components/providers/ThreeCanvas';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron'
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jetbrains-mono'
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-share-tech-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vidhey.netlify.app'),
  title: 'Vidhey Bhogadi — The Program Has Entered The Grid',
  description: 'Cinematic TRON 3D Portfolio of Vidhey Bhogadi, Systems Engineer at TCS.',
  openGraph: {
    title: 'Vidhey Bhogadi — The Program Has Entered The Grid',
    description: 'Cinematic TRON 3D Portfolio of Vidhey Bhogadi, Systems Engineer at TCS.',
    url: 'https://vidhey.netlify.app',
    siteName: 'Vidhey Verse',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidhey Bhogadi — The Program Has Entered The Grid',
    description: 'Cinematic TRON 3D Portfolio of Vidhey Bhogadi, Systems Engineer at TCS.',
    images: ['/og-image.png'],
  },
};

import { UIProvider } from '@/components/providers/UIProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className={`${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable} ${shareTechMono.variable}`}>
      <body className="font-body text-text-primary antialiased selection:bg-accent-primary/30 selection:text-white custom-scrollbar bg-transparent">
        <UIProvider>
          <div className="scanlines" />
          <ThreeCanvas />
          <TronCursor />
          <div className="relative z-50">
            <TronNav />
            <main className="relative z-50">
              {children}
            </main>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
