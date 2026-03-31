
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

// Components
import Footer from './components/footer';
import Navbar from './components/navbar';
import SwalPopup from './components/SwalPopup';
import ScrollToTopButton from './ScrollToTop/ScrollToTopButton';

// Styles
import './css/card.scss';
import './css/globals.scss';

// Dynamic imports for client-only 3D components (no SSR)
const Background3D = dynamic(() => import('./components/3d/Background3D'), { ssr: false });
const Preloader = dynamic(() => import('./components/preloader/Preloader'), { ssr: false });
const SceneTrackerClient = dynamic(
  () => import('./components/3d/SceneProvider').then((mod) => {
    // Return a component that renders SceneTracker
    const SceneTracker = mod.SceneTracker;
    return function SceneTrackerWrapper() {
      return <SceneTracker />;
    };
  }),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '𝐕𝐢𝐝𝐡𝐞𝐲 𝐁𝐡𝐨𝐠𝐚𝐝𝐢 — Portfolio V3',
  description: 'Immersive 3D portfolio of Vidhey Bhogadi — Full Stack Developer, ML Engineer, and Creative Technologist. Explore my work in an interactive cyberpunk universe.',
  keywords: 'Vidhey Bhogadi, portfolio, full stack developer, machine learning, 3D portfolio, software engineer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="title_logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e1a" />
      </head>
      <body className={inter.className}>
        {/* ── Cinematic Preloader ── */}
        <Preloader />

        {/* ── Global Scene State Tracker ── */}
        <SceneTrackerClient />

        {/* ── 3D Background (persistent behind all content) ── */}
        <Background3D />

        {/* ── Scroll Progress Indicator ── */}
        <div
          id="scroll-progress"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '2px',
            width: '0%',
            background: 'linear-gradient(90deg, #7849f8, #ff2d95, #00f0ff)',
            zIndex: 9998,
            transition: 'width 0.1s linear',
            boxShadow: '0 0 10px rgba(120, 73, 248, 0.5)',
          }}
        />

        <ToastContainer
          theme="dark"
          toastStyle={{
            background: 'rgba(13, 18, 36, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(120, 73, 248, 0.2)',
            borderRadius: '12px',
          }}
        />

        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          <SwalPopup />
          {children}
        </main>

        <Footer />
        <ScrollToTopButton />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
