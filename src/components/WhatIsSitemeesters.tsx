/* ══════════════════════════════════════════════════════════════════
   WHAT IS SITEMEESTERS — Light mode about section
   ══════════════════════════════════════════════════════════════════ */
'use client';

import { motion } from 'framer-motion';
import { EASING, DURATION } from '@/lib/constants';

const FEATURES = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M7 12L10 9L14 13L19 8" />
            </svg>
        ),
        title: 'Custom Design',
        description: 'Every website is built around the brand and goals of the client. No templates, no shortcuts — only tailor-made design.',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
            </svg>
        ),
        title: 'Fast & Optimized',
        description: 'Performance-focused development for fast loading and smooth interaction. Every millisecond matters.',
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 20V14" />
                <path d="M12 20V10" />
                <path d="M17 20V4" />
            </svg>
        ),
        title: 'Built for Growth',
        description: 'Structured for scalability, SEO and future expansion. Your website grows with your business.',
    },
];

export default function WhatIsSitemeesters() {
    return (
        <section className="relative py-24 md:py-32 px-5 sm:px-6 md:px-12" id="about">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="max-w-3xl mb-14 md:mb-20">
                    <motion.p
                        className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase text-[var(--text-muted)] mb-4"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASING.out }}
                    >
                        Over Sitemeesters
                    </motion.p>
                    <motion.h2
                        className="text-[clamp(1.75rem,4.4vw,2.8rem)] font-semibold text-[var(--foreground)] tracking-tight leading-[1.08] mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.1, duration: DURATION.slow, ease: EASING.out }}
                    >
                        Websites built to stand out —{' '}
                        <span className="text-[var(--text-muted)]">not blend in.</span>
                    </motion.h2>
                    <motion.p
                        className="text-[0.95rem] md:text-[1.05rem] text-[var(--text-secondary)] leading-relaxed max-w-2xl"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.2, duration: DURATION.medium, ease: EASING.out }}
                    >
                        Sitemeesters builds modern, high-performance websites for businesses
                        that want to be taken seriously online. Every website is designed
                        around identity, speed and user experience.
                    </motion.p>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            className="group relative p-7 md:p-8 rounded-2xl bg-white/86 backdrop-blur-sm border border-black/[0.05] hover:border-black/[0.1] transition-all duration-500"
                            style={{ boxShadow: '0 10px 28px rgba(15,23,42,0.05)' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1, duration: DURATION.slow, ease: EASING.out }}
                            whileHover={{ y: -4, boxShadow: '0 14px 34px rgba(15,23,42,0.09)' }}
                        >
                            {/* Icon */}
                            <div className="text-[var(--text-muted)] mb-5 group-hover:text-[var(--accent)] transition-colors duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-[1.03rem] font-semibold text-[var(--foreground)] mb-2.5 tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-[0.84rem] text-[var(--text-secondary)] leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
