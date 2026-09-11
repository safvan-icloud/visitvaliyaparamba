import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://visitvaliyaparamba.com'),
  title: 'Visit Valiyaparamba | Kerala\'s Hidden Coastal Paradise',
  description:
    'Discover breathtaking beaches, serene backwaters, island adventures, and unforgettable coastal experiences in Valiyaparamba, Kerala.',
  keywords: [
    'Valiyaparamba',
    'Valiyaparamba Beach',
    'Kerala Tourism',
    'Backwaters',
    'Island Tourism',
    'Beach Tourism',
    'Coastal Kerala',
  ],
  openGraph: {
    title: 'Visit Valiyaparamba',
    description: 'Kerala\'s Hidden Coastal Paradise',
    url: 'https://visitvaliyaparamba.com',
    siteName: 'Visit Valiyaparamba',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 800,
        alt: 'Valiyaparamba coastal scenery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Valiyaparamba',
    description: 'Kerala\'s Hidden Coastal Paradise',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
