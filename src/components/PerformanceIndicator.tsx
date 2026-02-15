'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { DURATION, EASING } from '@/lib/constants';

const METRICS = [
    { label: 'Performance', value: 98, color: '#4F46E5' },
    { label: 'Accessibility', value: 95, color: '#7C3AED' },
    { label: 'SEO', value: 97, color: '#2563EB' },
    { label: 'Best Practices', value: 96, color: '#059669' },
];

function CircularGauge({
    value,
    label,
    color,
    delay,
}: {
    value: number;
    label: string;
    color: string;
    delay: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const timeout = window.setTimeout(() => {
            let frame: number;
            const start = performance.now();
            const duration = 2000;

            const animate = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(eased * value));
                if (progress < 1) frame = requestAnimationFrame(animate);
            };

            frame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frame);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, value, delay]);

    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (circumference * count) / 100;

    return (
        <motion.div
            ref={ref}
            className="flex flex-col items-center gap-3.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: delay / 1000, duration: DURATION.slow, ease: EASING.out }}
        >
            <div className="relative w-[6.75rem] h-[6.75rem] md:w-[7.75rem] md:h-[7.75rem]">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 0.08s linear' }}
                        opacity={0.85}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[1.45rem] md:text-[1.72rem] font-semibold tabular-nums text-[var(--foreground)]">
                        {count}
                    </span>
                </div>
            </div>
            <p className="text-[0.62rem] tracking-[0.14em] uppercase text-[var(--text-muted)] font-semibold text-center">
                {label}
            </p>
        </motion.div>
    );
}

export default function PerformanceIndicator() {
    return (
        <section className="relative py-24 md:py-32 px-5 sm:px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14 md:mb-20">
                    <motion.p
                        className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase text-[var(--text-muted)] mb-4"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASING.out }}
                    >
                        Performance
                    </motion.p>
                    <motion.h2
                        className="text-[clamp(1.75rem,4.4vw,2.8rem)] font-semibold text-[var(--foreground)] tracking-tight leading-[1.08] mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: DURATION.slow, ease: EASING.out }}
                    >
                        Built for speed. <span className="text-[var(--text-tertiary)]">Measured to prove it.</span>
                    </motion.h2>
                    <motion.p
                        className="text-[0.88rem] md:text-[0.95rem] text-[var(--text-tertiary)] max-w-lg mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Every website we deliver scores 90+ on Google Lighthouse across all key categories.
                    </motion.p>
                </div>

                <motion.div
                    className="relative p-7 md:p-10 rounded-2xl bg-white/82 backdrop-blur-sm border border-black/[0.05]"
                    style={{ boxShadow: '0 14px 36px rgba(15,23,42,0.07)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION.slow, ease: EASING.out }}
                >
                    <div className="flex items-center gap-3 mb-8 pb-5 border-b border-black/[0.05]">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-black/[0.07]" />
                            <div className="w-2 h-2 rounded-full bg-black/[0.07]" />
                            <div className="w-2 h-2 rounded-full bg-black/[0.07]" />
                        </div>
                        <div className="ml-3 h-3 w-32 rounded-full bg-black/[0.04]" />
                        <div className="ml-auto flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                            <span className="text-[0.52rem] text-[var(--text-muted)] tracking-[0.14em] uppercase font-mono">Live analysis</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-6">
                        {METRICS.map((metric, i) => (
                            <CircularGauge key={metric.label} value={metric.value} label={metric.label} color={metric.color} delay={i * 180} />
                        ))}
                    </div>

                    <div className="mt-8 pt-5 border-t border-black/[0.05] text-center">
                        <p className="text-[0.6rem] text-[var(--text-muted)] tracking-[0.14em] uppercase">
                            Scores based on Google Lighthouse audit - desktop
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
