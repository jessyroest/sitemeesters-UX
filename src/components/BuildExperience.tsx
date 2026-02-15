/* ==================================================================
   THE BUILD EXPERIENCE - Light Mode
   Scroll-driven section: wireframe -> design -> code -> result
   ================================================================== */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASING } from '@/lib/constants';

const STEPS = [
    { num: '01', label: 'Idea', sub: 'Wireframe & Structure' },
    { num: '02', label: 'Design', sub: 'Visual Identity' },
    { num: '03', label: 'Development', sub: 'Code & Interaction' },
    { num: '04', label: 'Result', sub: 'Production Ready' },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function mapRange(value: number, inStart: number, inEnd: number) {
    if (inEnd === inStart) return value >= inEnd ? 1 : 0;
    return clamp01((value - inStart) / (inEnd - inStart));
}

function smoothStep(value: number) {
    return value * value * (3 - 2 * value);
}

function easedRange(value: number, inStart: number, inEnd: number) {
    return smoothStep(mapRange(value, inStart, inEnd));
}

/* --- Wireframe SVG (content only; stage handles positioning) --- */
function WireframeView({ progress }: { progress: number }) {
    const draw = Math.min(progress * 2, 1);

    return (
        <svg viewBox="0 0 800 480" fill="none" className="w-full h-auto">
            {/* Window */}
            <rect
                x="40"
                y="20"
                width="720"
                height="440"
                rx="12"
                stroke="#0A0A0A"
                strokeWidth="1"
                opacity={0.08}
                strokeDasharray="2400"
                strokeDashoffset={2400 - 2400 * draw}
            />
            <line x1="40" y1="58" x2="760" y2="58" stroke="#0A0A0A" strokeWidth="0.5" opacity={0.06 * draw} />
            {[70, 88, 106].map((cx) => (
                <circle key={cx} cx={cx} cy="39" r="4" stroke="#0A0A0A" strokeWidth="0.5" opacity={0.1 * draw} />
            ))}

            {/* Nav */}
            <rect x="70" y="70" width="80" height="8" rx="2" fill="#0A0A0A" opacity={0.06 * draw} />
            <rect x="620" y="70" width="40" height="8" rx="2" fill="#0A0A0A" opacity={0.04 * draw} />
            <rect x="680" y="70" width="50" height="8" rx="4" fill="#0A0A0A" opacity={0.06 * draw} />

            {/* Hero block */}
            <rect x="70" y="100" width="660" height="200" rx="8" stroke="#0A0A0A" strokeWidth="0.5" opacity={0.04 * draw} strokeDasharray="4 4" />
            <rect x="120" y="155" width="300" height="16" rx="3" fill="#0A0A0A" opacity={0.08 * draw} />
            <rect x="120" y="180" width="220" height="10" rx="2" fill="#0A0A0A" opacity={0.05 * draw} />
            <rect x="120" y="210" width="100" height="28" rx="14" fill="#0A0A0A" opacity={0.06 * draw} />
            <rect x="480" y="130" width="220" height="140" rx="6" stroke="#0A0A0A" strokeWidth="0.5" opacity={0.03 * draw} strokeDasharray="2 2" />

            {/* Cards */}
            {[0, 1, 2].map((i) => (
                <g key={i}>
                    <rect x={70 + i * 225} y="330" width="200" height="120" rx="8" stroke="#0A0A0A" strokeWidth="0.5" opacity={0.04 * draw} strokeDasharray="2 2" />
                    <rect x={90 + i * 225} y="350" width="60" height="6" rx="2" fill="#0A0A0A" opacity={0.06 * draw} />
                    <rect x={90 + i * 225} y="365" width="160" height="4" rx="1" fill="#0A0A0A" opacity={0.03 * draw} />
                </g>
            ))}
        </svg>
    );
}

/* --- Design View (content only; stage handles positioning) --- */
function DesignView({ progress }: { progress: number }) {
    return (
        <div
            className="w-full rounded-2xl overflow-hidden bg-white border border-black/[0.06]"
            style={{
                opacity: progress,
                boxShadow: `0 8px 40px rgba(0,0,0,${0.06 * progress}), 0 2px 8px rgba(0,0,0,${0.03 * progress})`,
            }}
        >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.04] bg-[#F8F8F8]">
                <div className="w-2.5 h-2.5 rounded-full bg-black/[0.06]" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/[0.06]" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/[0.06]" />
                <div className="ml-3 h-4 w-40 rounded-full bg-black/[0.04]" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[#0A0A0A]">Sitemeesters</span>
                    <div className="flex gap-4">
                        {['Work', 'About', 'Contact'].map((l) => (
                            <span key={l} className="text-[0.55rem] text-[#999] tracking-wider">{l}</span>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="text-[clamp(1rem,2vw,1.6rem)] font-bold text-[#0A0A0A] leading-tight mb-3" style={{ opacity: Math.min(progress * 1.5, 1) }}>
                        We build digital
                        <br />
                        <span className="text-[#4F46E5]">experiences</span>
                    </div>
                    <div className="h-2 w-3/4 rounded bg-black/[0.04] mb-2" />
                    <div className="h-2 w-1/2 rounded bg-black/[0.03] mb-4" />
                    <div className="inline-flex px-4 py-1.5 rounded-full text-[0.5rem] font-medium tracking-wider bg-[#0A0A0A] text-white" style={{ opacity: progress }}>
                        Start a project
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Strategy', color: '#4F46E5' },
                        { label: 'Design', color: '#7C3AED' },
                        { label: 'Development', color: '#2563EB' },
                    ].map((card, i) => (
                        <div
                            key={card.label}
                            className="p-3 rounded-lg border border-black/[0.04] bg-[#FAFAFA]"
                            style={{
                                opacity: Math.min(progress * 2 - i * 0.3, 1),
                                transform: `translateY(${(1 - Math.min(progress * 2 - i * 0.2, 1)) * 12}px)`,
                            }}
                        >
                            <div className="w-4 h-4 rounded-full mb-2" style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}25` }} />
                            <div className="text-[0.5rem] text-[#666] font-medium tracking-wider uppercase">{card.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* --- Code View --- */
const CODE_SNIPPETS = [
    { code: 'const hero = useRef<HTMLDivElement>(null);', x: '5%', y: '18%', color: '#7C3AED' },
    { code: '<motion.div animate={{ opacity: 1 }}>', x: '55%', y: '12%', color: '#2563EB' },
    { code: 'className="rounded-2xl shadow-lg"', x: '8%', y: '72%', color: '#059669' },
    { code: 'transition={{ duration: 0.8 }}', x: '50%', y: '78%', color: '#D97706' },
    { code: 'useScroll({ target: ref })', x: '65%', y: '45%', color: '#4F46E5' },
    { code: 'style={{ transform: `scale(${s})` }}', x: '3%', y: '48%', color: '#DC2626' },
];

function CodeView({ progress }: { progress: number }) {
    return (
        <>
            {CODE_SNIPPETS.map((snippet, i) => {
                const p = Math.max(0, Math.min((progress - i * 0.06) * 2, 1));
                return (
                    <div
                        key={i}
                        className="absolute font-mono text-[0.55rem] md:text-[0.65rem] whitespace-nowrap"
                        style={{
                            left: snippet.x,
                            top: snippet.y,
                            opacity: p * 0.4,
                            transform: `translateY(${(1 - p) * 20}px)`,
                            color: snippet.color,
                            filter: `blur(${(1 - p) * 2}px)`,
                            transition: 'all 0.3s ease-out',
                        }}
                    >
                        {snippet.code}
                    </div>
                );
            })}
        </>
    );
}

/* --- Result View (content only; stage handles positioning) --- */
function ResultView({ progress }: { progress: number }) {
    return (
        <div className="w-full flex flex-col items-center" style={{ opacity: progress }}>
            <div
                className="w-full"
                style={{
                    transform: `scale(${0.95 + progress * 0.05})`,
                    transition: 'transform 0.3s ease-out',
                }}
            >
                <div
                    className="rounded-2xl overflow-hidden bg-white border border-black/[0.06]"
                    style={{ boxShadow: `0 16px 64px rgba(0,0,0,${0.08 * progress}), 0 4px 16px rgba(0,0,0,${0.04 * progress})` }}
                >
                    {/* Browser bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.04] bg-[#F8F8F8]">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/70" />
                        <div className="ml-3 h-4 w-48 rounded-full bg-black/[0.04] flex items-center px-3">
                            <span className="text-[0.45rem] text-[#999] font-mono">sitemeesters.nl</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#0A0A0A]">Sitemeesters</span>
                            <div className="flex gap-4 items-center">
                                {['Work', 'About', 'Contact'].map((l) => (
                                    <span key={l} className="text-[0.55rem] text-[#666] tracking-wider">{l}</span>
                                ))}
                                <span className="text-[0.5rem] px-3 py-1 rounded-full bg-[#0A0A0A] text-white tracking-wider">Start</span>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <div className="text-[clamp(1.2rem,2.5vw,2rem)] font-bold text-[#0A0A0A] leading-tight mb-2">
                                We build digital
                                <br />
                                <span className="text-[#4F46E5]">experiences that convert.</span>
                            </div>
                            <div className="text-[0.55rem] text-[#999] mb-4 max-w-xs mx-auto">Award-winning studio building next-level web experiences</div>
                            <div className="flex justify-center gap-2">
                                <span className="px-4 py-1.5 rounded-full bg-[#0A0A0A] text-white text-[0.45rem] font-medium tracking-wider">View Work -&gt;</span>
                                <span className="px-4 py-1.5 rounded-full border border-black/[0.08] text-[#666] text-[0.45rem] tracking-wider">Contact</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { stat: '200+', label: 'Projects', color: '#4F46E5' },
                                { stat: '97%', label: 'Satisfaction', color: '#7C3AED' },
                                { stat: '8+', label: 'Years', color: '#2563EB' },
                            ].map((s) => (
                                <div key={s.label} className="p-3 rounded-lg border border-black/[0.04] bg-[#FAFAFA] text-center">
                                    <div className="text-[0.9rem] font-semibold" style={{ color: s.color }}>
                                        {s.stat}
                                    </div>
                                    <div className="text-[0.45rem] text-[#999] tracking-wider uppercase mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <motion.div className="mt-10 text-center" style={{ opacity: Math.max(0, (progress - 0.5) * 2) }}>
                <a
                    href="#contact"
                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#0A0A0A] text-white text-[0.78rem] font-medium tracking-[0.08em] rounded-full overflow-hidden hover:bg-[#222] transition-colors duration-300"
                >
                    <span className="relative z-10">Build mine like this</span>
                    <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">-&gt;</span>
                </a>
            </motion.div>
        </div>
    );
}

/* ================================================================== */
export default function BuildExperience() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const step1 = useTransform(scrollYProgress, [0, 0.24], [0, 1]);
    const step2 = useTransform(scrollYProgress, [0.16, 0.48], [0, 1]);
    const step3 = useTransform(scrollYProgress, [0.4, 0.74], [0, 1]);
    const step4 = useTransform(scrollYProgress, [0.62, 0.95], [0, 1]);
    const activeStep = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);
    const exitProgress = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

    const [s1, setS1] = useState(0);
    const [s2, setS2] = useState(0);
    const [s3, setS3] = useState(0);
    const [s4, setS4] = useState(0);
    const [active, setActive] = useState(0);
    const [exit, setExit] = useState(0);

    useEffect(() => {
        const u1 = step1.on('change', setS1);
        const u2 = step2.on('change', setS2);
        const u3 = step3.on('change', setS3);
        const u4 = step4.on('change', setS4);
        const uE = exitProgress.on('change', setExit);
        const uA = activeStep.on('change', (v) => {
            const stepIndex = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v + 0.0001)));
            setActive(stepIndex);
        });

        return () => {
            u1();
            u2();
            u3();
            u4();
            uE();
            uA();
        };
    }, [step1, step2, step3, step4, exitProgress, activeStep]);

    const wireframeOpacity = 1 - easedRange(s2, 0.05, 0.38);
    const designOpacity = easedRange(s2, 0.08, 0.42) * (1 - easedRange(s4, 0.06, 0.42));
    const codeOpacity = easedRange(s3, 0.12, 0.4) * (1 - easedRange(s4, 0.14, 0.6));
    const resultOpacity = easedRange(s4, 0.2, 0.74);

    return (
        <section ref={sectionRef} className="relative" style={{ height: '340vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-[#FAFAFA]" style={{ opacity: 1 - exit * 0.25 }}>
                {/* Step indicator - left side */}
                <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-6">
                    {STEPS.map((step, i) => (
                        <div key={step.num} className="flex items-center gap-3">
                            <div className="relative flex flex-col items-center">
                                <div
                                    className="w-2 h-2 rounded-full transition-all duration-500"
                                    style={{
                                        background: active >= i ? '#4F46E5' : 'rgba(0,0,0,0.08)',
                                        boxShadow: active === i ? '0 0 10px rgba(79,70,229,0.3)' : 'none',
                                    }}
                                />
                                {i < STEPS.length - 1 && (
                                    <div className="w-[1px] h-6 mt-1" style={{ background: active > i ? 'rgba(79,70,229,0.3)' : 'rgba(0,0,0,0.04)' }} />
                                )}
                            </div>
                            <div className="transition-opacity duration-500" style={{ opacity: active >= i ? 0.8 : 0.25 }}>
                                <p
                                    className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase transition-colors duration-500"
                                    style={{ color: active === i ? 'var(--accent)' : 'var(--text-muted)' }}
                                >
                                    {step.label}
                                </p>
                                <p className="text-[0.5rem] text-[#BBB] tracking-wide">{step.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Title */}
                <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 text-center z-20">
                    <motion.p
                        className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase text-[var(--text-muted)]"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASING.out }}
                    >
                        From Idea to Experience
                    </motion.p>
                </div>

                {/* Phase label */}
                <div className="absolute bottom-12 md:bottom-16 right-6 md:right-12 z-20 text-right">
                    <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[#CCC] mb-1">{STEPS[active]?.num}</p>
                    <p className="text-[clamp(1.2rem,3vw,2rem)] font-light tracking-tight transition-colors duration-700" style={{ color: active === 3 ? '#4F46E5' : 'rgba(0,0,0,0.06)' }}>
                        {STEPS[active]?.label}
                    </p>
                </div>

                {/*
                  Shared stage for all layers.
                  This is the single canonical coordinate space to prevent horizontal drift.
                */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-3xl px-8 relative h-full">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: wireframeOpacity, zIndex: 1 }}>
                            <WireframeView progress={s1} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: designOpacity, zIndex: 2 }}>
                            <DesignView progress={Math.min(s2 * 1.5, 1)} />
                        </div>
                        <div className="absolute inset-0 pointer-events-none" style={{ opacity: codeOpacity * 0.65, zIndex: 1 }}>
                            <CodeView progress={s3} />
                        </div>
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                opacity: resultOpacity,
                                zIndex: 3,
                                pointerEvents: resultOpacity > 0.6 ? 'auto' : 'none',
                            }}
                        >
                            <ResultView progress={s4} />
                        </div>
                    </div>
                </div>

                {/* Progress line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/[0.04]">
                    <motion.div className="h-full bg-[#4F46E5] origin-left" style={{ scaleX: scrollYProgress, opacity: 0.5 }} />
                </div>
            </div>
        </section>
    );
}
