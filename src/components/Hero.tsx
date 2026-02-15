'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.22 + i * 0.11,
            duration: 0.86,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, -74]);
    const opacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
    const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.24]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32 pb-20 md:pb-24">
            <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: orbScale }}>
                <div
                    className="absolute -top-[24%] right-[-8%] w-[58rem] h-[34rem] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(79,70,229,0.16) 0%, rgba(79,70,229,0.03) 44%, transparent 72%)',
                        animation: 'heroFloatA 20s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute -bottom-[20%] left-[-16%] w-[52rem] h-[30rem] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.02) 42%, transparent 70%)',
                        animation: 'heroFloatB 24s ease-in-out infinite',
                    }}
                />
            </motion.div>

            <div
                className="absolute inset-0 pointer-events-none opacity-[0.22]"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(circle at 50% 42%, black 20%, transparent 72%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 42%, black 20%, transparent 72%)',
                }}
            />

            <motion.div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12 w-full" style={{ y: textY, opacity }}>
                <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.06fr_0.94fr]">
                    <div>
                        <motion.p
                            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[0.64rem] font-semibold tracking-[0.16em] uppercase mb-7 border border-white/[0.16] bg-[rgba(15,20,36,0.72)] backdrop-blur"
                            style={{ color: 'var(--text-secondary)' }}
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            animate="visible"
                        >
                            Design & Development Studio
                        </motion.p>

                        <motion.h1
                            className="text-[clamp(2.35rem,6.4vw,5.2rem)] leading-[1.02] tracking-[-0.032em] font-semibold mb-6"
                            style={{ color: 'var(--foreground)' }}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            animate="visible"
                        >
                            Websites that feel premium
                            <br />
                            and <span
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #22D3EE 0%, #6366F1 48%, #F97316 100%)',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >convert fast</span>.
                        </motion.h1>

                        <motion.p
                            className="text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-2xl mb-9"
                            style={{ color: 'var(--text-secondary)' }}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            animate="visible"
                        >
                            Sitemeesters builds digital experiences with a sharp visual identity,
                            strong performance, and clear conversion flow from first impression to first lead.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10"
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            animate="visible"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-300 shadow-[0_10px_26px_rgba(79,70,229,0.35)]"
                            >
                                Start a project
                                <span className="transition-transform duration-300 group-hover:translate-x-0.5">-&gt;</span>
                            </a>
                            <a
                                href="#about"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.78rem] font-semibold tracking-[0.08em] uppercase border border-white/[0.2] hover:border-white/[0.35] transition-colors duration-300"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Learn more
                            </a>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[16rem] sm:max-w-xl"
                            variants={fadeUp}
                            custom={4}
                            initial="hidden"
                            animate="visible"
                        >
                            {[
                                { value: '200+', label: 'Projects' },
                                { value: '97%', label: 'Client score' },
                                { value: '90+', label: 'Lighthouse' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-white/[0.12] bg-[rgba(17,24,44,0.72)] backdrop-blur px-3.5 py-3 text-center shadow-[0_10px_24px_rgba(2,6,23,0.32)]"
                                >
                                    <p className="text-[0.98rem] md:text-[1.06rem] font-semibold leading-none mb-1" style={{ color: 'var(--foreground)' }}>
                                        {item.value}
                                    </p>
                                    <p className="text-[0.58rem] uppercase tracking-[0.16em]" style={{ color: 'var(--text-muted)' }}>
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div className="hidden lg:block" variants={fadeUp} custom={2} initial="hidden" animate="visible">
                        <div className="rounded-3xl border border-white/[0.14] bg-[rgba(14,21,40,0.8)] backdrop-blur p-5 shadow-[0_24px_80px_rgba(2,6,23,0.5)]">
                            <div className="flex items-center gap-2 pb-4 border-b border-white/[0.1]">
                                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.18]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.18]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.18]" />
                                <span className="ml-3 h-3.5 w-40 rounded-full bg-white/[0.08]" />
                            </div>

                            <div className="pt-5 space-y-4">
                                <div className="rounded-2xl border border-white/[0.1] bg-[var(--surface-muted)] p-4">
                                    <p className="text-[0.62rem] uppercase tracking-[0.16em] mb-2 text-[var(--text-tertiary)]">Positioning</p>
                                    <p className="text-[1.06rem] font-semibold leading-tight text-[var(--foreground)]">
                                        Clarity first, visual noise out.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {['UX Structure', 'Visual Identity', 'Fast Build', 'Growth Ready'].map((tag) => (
                                        <div key={tag} className="rounded-xl border border-white/[0.1] bg-[rgba(255,255,255,0.02)] px-3 py-3">
                                            <p className="text-[0.62rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">{tag}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-2xl border border-[#4F46E5]/40 bg-[rgba(29,33,67,0.72)] p-4">
                                    <p className="text-[0.62rem] uppercase tracking-[0.16em] mb-1.5 text-[#A5B4FC]">Result</p>
                                    <p className="text-[0.9rem] leading-relaxed text-[#C7D2FE]">
                                        A premium website that performs, ranks, and helps your brand feel credible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.7 }}
            >
                <span className="text-[0.6rem] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                    Scroll
                </span>
                <motion.div
                    className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
                    style={{ borderColor: 'rgba(255,255,255,0.28)' }}
                    animate={{ borderColor: ['rgba(255,255,255,0.24)', 'rgba(255,255,255,0.44)', 'rgba(255,255,255,0.24)'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <motion.div
                        className="w-1 h-1.5 rounded-full bg-white/50"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>

        </section>
    );
}
