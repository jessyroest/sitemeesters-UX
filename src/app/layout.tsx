import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sitemeesters - Digital Studio',
  description:
    'Award-winning digital studio gespecialiseerd in premium web experiences, brand identities en digitale producten die converteren.',
  keywords: [
    'webdesign',
    'digital agency',
    'sitemeesters',
    'web development',
    'nederland',
    'premium websites',
  ],
  openGraph: {
    title: 'Sitemeesters - Digital Studio',
    description: 'We build digital experiences that convert.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${syne.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
