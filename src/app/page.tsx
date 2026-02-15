/* ─── Main Page — Premium Light Mode ─── */
'use client';

import LenisProvider from '@/components/LenisProvider';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BuildExperience from '@/components/BuildExperience';
import WebsitePlayground from '@/components/WebsitePlayground';
import WhatIsSitemeesters from '@/components/WhatIsSitemeesters';
import HowIWork from '@/components/HowIWork';
import TheDifference from '@/components/TheDifference';
import PerformanceIndicator from '@/components/PerformanceIndicator';
import SitesFinalCTA from '@/components/SitesFinalCTA';

export default function Home() {
  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <BuildExperience />
        <WebsitePlayground />
        <WhatIsSitemeesters />
        <HowIWork />
        <TheDifference />
        <PerformanceIndicator />
        <SitesFinalCTA />
      </main>
    </LenisProvider>
  );
}
