'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { DURATION, EASING } from '@/lib/constants';

const STEPS = [
    {
        num: '01',
        title: 'Discovery',
        description: 'Understanding the business, goals and audience. We map out the full picture before writing a single line of code.',
    },
    {
        num: '02',
        title: 'Design & Structure',
        description: 'Wireframes and visual design built around clarity and experience. Every element has a purpose.',
    },
    {
        num: '03',
        title: 'Build & Optimize',
        description: 'Responsive development with performance optimization. Clean code, fast loads, smooth interactions.',
    },
    {
        num: '04',
        title: 'Launch & Grow',
        description: "Website launch followed by improvements and scaling. We don't just build - we maintain and evolve.",
    },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function easedRange(value: number, start: number, end: number) {
    if (end === start) return value >= end ? 1 : 0;
    const t = clamp01((value - start) / (end - start));
    return t * t * (3 - 2 * t);
}

export default function HowIWork() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 0.78', 'end 0.25'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.35,
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsub = smoothProgress.on('change', setProgress);
        return unsub;
    }, [smoothProgress]);

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden" id="process">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
                    <motion.p
                        className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase mb-4"
                        style={{ color: 'var(--text-muted)' }}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASING.out }}
                    >
                        Werkwijze
                    </motion.p>
                    <motion.h2
                        className="text-[clamp(1.75rem,4.4vw,2.8rem)] font-semibold tracking-tight leading-[1.08]"
                        style={{ color: 'var(--foreground)' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08, duration: DURATION.slow, ease: EASING.out }}
                    >
                        From first call to final pixel
                    </motion.h2>
                </div>

                <div className="relative">
                    <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px">
                        <div className="absolute inset-0" style={{ background: 'var(--border)' }} />
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-full origin-top"
                            style={{
                                scaleY: progress,
                                opacity: 0.85,
                                background: 'linear-gradient(180deg, rgba(37,99,235,0.75) 0%, rgba(79,70,229,0.85) 58%, rgba(6,182,212,0.7) 100%)',
                            }}
                        />
                    </div>

                    <div className="relative space-y-8 md:space-y-10">
                        {STEPS.map((step, i) => {
                            const isRight = i % 2 === 1;
                            const stepProgress = easedRange(progress, i * 0.18, i * 0.18 + 0.34);
                            const isActive = stepProgress > 0.3;

                            return (
                                <motion.article
                                    key={step.num}
                                    className="grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-start gap-4 md:gap-7"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ delay: i * 0.07, duration: DURATION.slow, ease: EASING.out }}
                                >
                                    <div className="col-start-1 row-start-1 flex items-start justify-center pt-1 md:col-start-2">
                                        <div
                                            className="h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-500"
                                            style={{
                                                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                                                backgroundColor: 'var(--surface)',
                                                boxShadow: isActive ? '0 0 0 4px rgba(79, 70, 229, 0.12)' : 'none',
                                            }}
                                        >
                                            <span
                                                className="text-[0.58rem] font-semibold tracking-[0.04em] transition-colors duration-500"
                                                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
                                            >
                                                {step.num}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={`col-start-2 row-start-1 w-full md:max-w-[27rem] ${isRight ? 'md:col-start-3 md:mr-auto' : 'md:col-start-1 md:ml-auto'}`}
                                    >
                                        <div
                                            className="rounded-2xl border px-5 py-5 md:px-6 md:py-6 transition-all duration-500"
                                            style={{
                                                borderColor: isActive ? 'rgba(79, 70, 229, 0.32)' : 'var(--border)',
                                                backgroundColor: 'var(--surface)',
                                                boxShadow: isActive ? '0 14px 40px rgba(79, 70, 229, 0.08)' : '0 6px 24px rgba(0, 0, 0, 0.04)',
                                            }}
                                        >
                                            <p
                                                className="text-[0.6rem] uppercase tracking-[0.2em] mb-2 font-medium"
                                                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
                                            >
                                                Step {step.num}
                                            </p>
                                            <h3 className="text-[1.08rem] md:text-[1.2rem] font-semibold tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
                                                {step.title}
                                            </h3>
                                            <p className="text-[0.88rem] leading-relaxed max-w-[42ch]" style={{ color: 'var(--text-secondary)' }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
