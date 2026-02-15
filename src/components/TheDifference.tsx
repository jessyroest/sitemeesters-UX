/* ══════════════════════════════════════════════════════════════════
   THE DIFFERENCE — Light mode split comparison
   ══════════════════════════════════════════════════════════════════ */
'use client';

import { motion } from 'framer-motion';
import { EASING, DURATION } from '@/lib/constants';

const STANDARD = [
    'Template based',
    'Generic appearance',
    'Slow performance',
    'Limited flexibility',
];

const SITEMEESTERS = [
    'Custom experiences',
    'Modern design language',
    'Fast loading speed',
    'Future-proof structure',
];

export default function TheDifference() {
    return (
        <section className="relative py-24 md:py-32 px-5 sm:px-6 md:px-12">
            <div className="max-w-6xl mx-auto rounded-[1.75rem] border border-black/[0.05] bg-white/72 backdrop-blur-sm px-5 sm:px-8 md:px-12 py-12 md:py-14 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20">
                    <motion.p
                        className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase text-[var(--text-muted)] mb-4"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASING.out }}
                    >
                        Het verschil
                    </motion.p>
                    <motion.h2
                        className="text-[clamp(1.75rem,4.4vw,2.8rem)] font-semibold text-[var(--foreground)] tracking-tight leading-[1.08]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: DURATION.slow, ease: EASING.out }}
                    >
                        Not all websites are{' '}
                        <span className="text-[var(--text-muted)]">created equal</span>
                    </motion.h2>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Standard */}
                    <motion.div
                        className="p-6 md:p-8 rounded-2xl bg-[#F7F8FB] border border-black/[0.04]"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: DURATION.slow, ease: EASING.out }}
                    >
                        <h3 className="text-[0.65rem] tracking-[0.18em] uppercase text-[var(--text-muted)] mb-6 font-semibold">
                            Standard Websites
                        </h3>
                        <ul className="space-y-[18px]">
                            {STANDARD.map((item, i) => (
                                <motion.li key={item} className="flex items-center gap-4"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASING.out }}
                                >
                                    <span className="w-5 h-5 rounded-full bg-black/[0.05] flex items-center justify-center flex-shrink-0">
                                        <svg width="8" height="8" viewBox="0 0 8 8"><line x1="2" y1="2" x2="6" y2="6" stroke="#CCC" strokeWidth="1.2" /><line x1="6" y1="2" x2="2" y2="6" stroke="#CCC" strokeWidth="1.2" /></svg>
                                    </span>
                                    <span className="text-[0.84rem] text-[var(--text-muted)] font-normal">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Sitemeesters */}
                    <motion.div
                        className="group p-6 md:p-8 rounded-2xl bg-white border border-[#4F46E5]/[0.14] hover:border-[#4F46E5]/[0.22] transition-all duration-500"
                        style={{ boxShadow: '0 8px 28px rgba(79,70,229,0.08)' }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: 0.1, duration: DURATION.slow, ease: EASING.out }}
                        whileHover={{ boxShadow: '0 14px 38px rgba(79,70,229,0.14)' }}
                    >
                        <h3 className="text-[0.65rem] tracking-[0.18em] uppercase text-[#4F46E5]/70 mb-6 font-semibold">
                            Sitemeesters
                        </h3>
                        <ul className="space-y-[18px]">
                            {SITEMEESTERS.map((item, i) => (
                                <motion.li key={item} className="flex items-center gap-4"
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: EASING.out }}
                                >
                                    <span className="w-5 h-5 rounded-full bg-[#4F46E5]/[0.06] flex items-center justify-center flex-shrink-0">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M2 5L4.5 7.5L8 3" stroke="#4F46E5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-[0.84rem] text-[var(--text-secondary)] font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
