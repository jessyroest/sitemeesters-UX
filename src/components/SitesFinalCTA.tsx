'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DURATION, EASING } from '@/lib/constants';

export default function SitesFinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const gradientOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [0.975, 1]);

    return (
        <section ref={sectionRef} className="relative py-28 md:py-36 px-5 sm:px-6 md:px-12 overflow-hidden" id="contact">
            <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: gradientOpacity }}>
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 58% 50% at 50% 62%, rgba(79,70,229,0.09) 0%, transparent 72%)',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 34% 36% at 28% 72%, rgba(37,99,235,0.07) 0%, transparent 66%)',
                    }}
                />
            </motion.div>

            <motion.div
                className="relative max-w-4xl mx-auto text-center rounded-[1.75rem] border border-black/[0.06] bg-white/78 backdrop-blur-sm px-6 sm:px-8 md:px-12 py-12 md:py-14 shadow-[0_22px_56px_rgba(15,23,42,0.08)]"
                style={{ scale }}
            >
                <motion.p
                    className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase text-[var(--text-muted)] mb-7"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASING.out }}
                >
                    Let&apos;s connect
                </motion.p>

                <motion.h2
                    className="text-[clamp(1.95rem,5.2vw,3.6rem)] font-semibold text-[var(--foreground)] tracking-tight leading-[1.06] mb-5"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08, duration: DURATION.slow, ease: EASING.out }}
                >
                    Let&apos;s build something
                    <br className="hidden md:block" />
                    <span className="text-[var(--accent)]">people remember.</span>
                </motion.h2>

                <motion.p
                    className="text-[0.95rem] md:text-[1.05rem] text-[var(--text-tertiary)] max-w-xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Ready to start? Reach out and let&apos;s talk about your project.
                    No pressure - just a clear conversation.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: EASING.out }}
                >
                    <a
                        href="mailto:info@sitemeesters.nl"
                        className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#0A0A0A] text-white text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-full hover:bg-[#1F2937] transition-colors duration-300"
                    >
                        <span>Start een project</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">-&gt;</span>
                    </a>
                    <a
                        href="https://wa.me/31612345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 border border-black/[0.08] text-[var(--text-secondary)] text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-full hover:border-[#25D366]/40 hover:text-[#25D366] transition-all duration-300"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-60 group-hover:opacity-100 transition-opacity">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </a>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-7 text-[0.68rem] tracking-[0.1em] uppercase text-[var(--text-muted)]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45, duration: 0.8 }}
                >
                    <a href="mailto:info@sitemeesters.nl" className="hover:text-[var(--text-tertiary)] transition-colors duration-300">
                        info@sitemeesters.nl
                    </a>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-black/[0.1]" />
                    <span>Nederland</span>
                </motion.div>
            </motion.div>

            <div className="relative mt-20 md:mt-24 pt-8 border-t border-black/[0.05]">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[0.6rem] tracking-[0.14em] uppercase text-[var(--text-muted)]">
                        &copy; {new Date().getFullYear()} Sitemeesters
                    </p>
                    <div className="flex items-center gap-6">
                        {['Instagram', 'LinkedIn', 'X'].map((social) => (
                            <a key={social} href="#" className="text-[0.55rem] tracking-[0.14em] uppercase text-[var(--text-muted)] hover:text-[var(--text-tertiary)] transition-colors duration-300">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
