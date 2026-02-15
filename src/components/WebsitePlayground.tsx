/* ================================================================
   Website Playground
   ================================================================ */
'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DURATION, EASING } from '@/lib/constants';

type StyleKey = 'minimal' | 'bold' | 'luxury' | 'tech';
type MoodKey = 'dark' | 'light';
type AnimKey = 'calm' | 'dynamic';
type LayoutKey = 'agency' | 'personal' | 'product';

interface PreviewConfig {
    bg: string;
    cardBg: string;
    text: string;
    textMuted: string;
    accent: string;
    borderRadius: string;
    fontWeight: number;
    shadow: string;
}

const STYLES: Record<StyleKey, { label: string; config: Partial<PreviewConfig> }> = {
    minimal: { label: 'Minimal', config: { accent: '#0A0A0A', borderRadius: '8px', fontWeight: 400 } },
    bold: { label: 'Bold', config: { accent: '#4F46E5', borderRadius: '16px', fontWeight: 700 } },
    luxury: { label: 'Luxury', config: { accent: '#92734E', borderRadius: '4px', fontWeight: 300 } },
    tech: { label: 'Tech', config: { accent: '#2563EB', borderRadius: '12px', fontWeight: 500 } },
};

const LAYOUTS: Record<LayoutKey, { label: string; headline: string; navLinks: string[]; cta: string }> = {
    agency: { label: 'Agency', headline: 'We build digital experiences.', navLinks: ['Work', 'About', 'Contact'], cta: 'Start a project' },
    personal: { label: 'Personal', headline: 'Designer & Developer.', navLinks: ['Portfolio', 'Blog', 'About'], cta: 'Get in touch' },
    product: { label: 'Product', headline: 'Ship faster, build better.', navLinks: ['Features', 'Pricing', 'Docs'], cta: 'Get started free' },
};

const CONTROL_PANEL_TOKENS = {
    pillHeight: 30,
    pillPaddingX: 12,
    pillFontSize: 11,
    pillRadius: 9999,
    borderWidth: 1,
    borderOpacity: 0.16,
    sectionGapY: 14,
    sectionPaddingY: 2,
    titleRowHeight: 16,
    titleGapX: 8,
    iconSize: 10,
    rowHeight: 36,
    rowPadding: 3,
    rowGap: 4,
    titleTracking: '0.18em',
    pillTracking: '0.08em',
} as const;

const PANEL_BORDER_COLOR = `rgba(255,255,255,${CONTROL_PANEL_TOKENS.borderOpacity})`;

type IconKind = 'diamond' | 'dot' | 'bolt' | 'square';

function SectionIcon({ kind }: { kind: IconKind }) {
    if (kind === 'diamond') {
        return (
            <svg viewBox="0 0 12 12" width={CONTROL_PANEL_TOKENS.iconSize} height={CONTROL_PANEL_TOKENS.iconSize} fill="none" aria-hidden>
                <path d="M6 1L11 6L6 11L1 6L6 1Z" fill="currentColor" />
            </svg>
        );
    }

    if (kind === 'dot') {
        return (
            <svg viewBox="0 0 12 12" width={CONTROL_PANEL_TOKENS.iconSize} height={CONTROL_PANEL_TOKENS.iconSize} fill="none" aria-hidden>
                <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            </svg>
        );
    }

    if (kind === 'bolt') {
        return (
            <svg viewBox="0 0 12 12" width={CONTROL_PANEL_TOKENS.iconSize} height={CONTROL_PANEL_TOKENS.iconSize} fill="none" aria-hidden>
                <path d="M6.7 1.5L3.5 6.3H6L5.2 10.5L8.5 5.7H6L6.7 1.5Z" fill="currentColor" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 12 12" width={CONTROL_PANEL_TOKENS.iconSize} height={CONTROL_PANEL_TOKENS.iconSize} fill="none" aria-hidden>
            <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    );
}

function PillSelector<T extends string>({
    options,
    value,
    onChange,
    layoutId,
}: {
    options: { key: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
    layoutId: string;
}) {
    return (
        <div
            className="w-full flex items-center"
            style={{
                height: CONTROL_PANEL_TOKENS.rowHeight,
                padding: CONTROL_PANEL_TOKENS.rowPadding,
                gap: CONTROL_PANEL_TOKENS.rowGap,
                borderRadius: CONTROL_PANEL_TOKENS.pillRadius,
                border: `${CONTROL_PANEL_TOKENS.borderWidth}px solid ${PANEL_BORDER_COLOR}`,
                backgroundColor: 'rgba(255,255,255,0.04)',
            }}
        >
            {options.map((opt) => {
                const selected = value === opt.key;

                return (
                    <button
                        key={opt.key}
                        onClick={() => onChange(opt.key)}
                        className="relative min-w-0 flex-1 inline-flex items-center justify-center overflow-hidden leading-none uppercase whitespace-nowrap transition-colors duration-300"
                        style={{
                            height: CONTROL_PANEL_TOKENS.pillHeight,
                            paddingInline: CONTROL_PANEL_TOKENS.pillPaddingX,
                            borderRadius: CONTROL_PANEL_TOKENS.pillRadius,
                            borderWidth: CONTROL_PANEL_TOKENS.borderWidth,
                            borderStyle: 'solid',
                            borderColor: PANEL_BORDER_COLOR,
                            color: selected ? '#F3F6FF' : '#8C95AF',
                            fontSize: CONTROL_PANEL_TOKENS.pillFontSize,
                            letterSpacing: CONTROL_PANEL_TOKENS.pillTracking,
                            lineHeight: 1,
                        }}
                    >
                        {selected && (
                            <motion.div
                                layoutId={layoutId}
                                className="absolute inset-0"
                                style={{
                                    borderRadius: CONTROL_PANEL_TOKENS.pillRadius,
                                    backgroundColor: 'rgba(43,50,76,0.92)',
                                    boxShadow: `inset 0 0 0 ${CONTROL_PANEL_TOKENS.borderWidth}px rgba(255,255,255,0.14), 0 8px 20px rgba(2,6,23,0.46)`,
                                }}
                                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                        )}
                        <span className="relative z-10 leading-none">{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function ControlSection<T extends string>({
    icon,
    title,
    options,
    value,
    onChange,
    layoutId,
}: {
    icon: IconKind;
    title: string;
    options: { key: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
    layoutId: string;
}) {
    return (
        <section style={{ paddingBlock: CONTROL_PANEL_TOKENS.sectionPaddingY }}>
            <div
                className="flex items-center"
                style={{
                    height: CONTROL_PANEL_TOKENS.titleRowHeight,
                    gap: CONTROL_PANEL_TOKENS.titleGapX,
                    marginBottom: 8,
                }}
            >
                <span className="inline-flex items-center justify-center shrink-0 text-white/45" style={{ width: CONTROL_PANEL_TOKENS.iconSize, height: CONTROL_PANEL_TOKENS.iconSize }}>
                    <SectionIcon kind={icon} />
                </span>
                <p
                    className="uppercase font-semibold text-[var(--text-muted)] leading-none"
                    style={{
                        fontSize: 11,
                        letterSpacing: CONTROL_PANEL_TOKENS.titleTracking,
                        lineHeight: 1,
                    }}
                >
                    {title}
                </p>
            </div>
            <PillSelector options={options} value={value} onChange={onChange} layoutId={layoutId} />
        </section>
    );
}

export default function WebsitePlayground() {
    const [style, setStyle] = useState<StyleKey>('minimal');
    const [mood, setMood] = useState<MoodKey>('dark');
    const [anim, setAnim] = useState<AnimKey>('calm');
    const [layout, setLayout] = useState<LayoutKey>('agency');

    const config = useMemo<PreviewConfig>(() => {
        const base = STYLES[style].config;
        const isDark = mood === 'dark';
        return {
            bg: isDark ? '#0A0A0F' : '#FFFFFF',
            cardBg: isDark ? '#141419' : '#F8F8F8',
            text: isDark ? '#F0F0F0' : '#0A0A0A',
            textMuted: isDark ? '#666' : '#999',
            accent: base.accent || '#0A0A0A',
            borderRadius: base.borderRadius || '8px',
            fontWeight: base.fontWeight || 400,
            shadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
        };
    }, [style, mood]);

    const layoutConfig = LAYOUTS[layout];
    const isDynamic = anim === 'dynamic';

    const feedback = useMemo(() => {
        const parts: string[] = [];
        if (style === 'minimal') parts.push('clean lines');
        else if (style === 'bold') parts.push('bold presence');
        else if (style === 'luxury') parts.push('refined elegance');
        else parts.push('technical precision');

        parts.push(mood === 'dark' ? 'a dark atmosphere' : 'a bright, open feel');
        parts.push(anim === 'calm' ? 'subtle motion' : 'dynamic energy');

        return `You prefer ${parts[0]} with ${parts[1]} and ${parts[2]}.`;
    }, [style, mood, anim]);

    return (
        <section className="relative py-28 md:py-36 px-5 sm:px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14 md:mb-20">
                    <motion.p
                        className="text-[0.62rem] font-semibold tracking-[0.24em] uppercase text-[var(--text-muted)] mb-4"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASING.out }}
                    >
                        Interactive Playground
                    </motion.p>
                    <motion.h2
                        className="text-[clamp(1.75rem,4.4vw,2.8rem)] font-semibold text-[var(--foreground)] tracking-tight leading-[1.08]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: DURATION.slow, ease: EASING.out }}
                    >
                        Design your ideal <span className="text-[var(--accent)]">website</span>
                    </motion.h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)] items-start gap-8 lg:gap-10 xl:gap-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: DURATION.slow, ease: EASING.out }}
                >
                    <div className="w-full min-w-0 max-w-xl lg:max-w-none mx-auto">
                        <div
                            className="min-w-0 rounded-2xl border border-white/[0.12] bg-[rgba(10,14,28,0.78)] p-5 md:p-6 shadow-[0_12px_38px_rgba(2,6,23,0.44)]"
                            style={{ display: 'flex', flexDirection: 'column', rowGap: CONTROL_PANEL_TOKENS.sectionGapY }}
                        >
                            <ControlSection
                                icon="diamond"
                                title="Style"
                                options={Object.entries(STYLES).map(([k, v]) => ({ key: k as StyleKey, label: v.label }))}
                                value={style}
                                onChange={setStyle}
                                layoutId="style-pill"
                            />

                            <ControlSection
                                icon="dot"
                                title="Mood"
                                options={[
                                    { key: 'dark' as MoodKey, label: 'Dark' },
                                    { key: 'light' as MoodKey, label: 'Light' },
                                ]}
                                value={mood}
                                onChange={setMood}
                                layoutId="mood-pill"
                            />

                            <ControlSection
                                icon="bolt"
                                title="Animation"
                                options={[
                                    { key: 'calm' as AnimKey, label: 'Calm' },
                                    { key: 'dynamic' as AnimKey, label: 'Dynamic' },
                                ]}
                                value={anim}
                                onChange={setAnim}
                                layoutId="anim-pill"
                            />

                            <ControlSection
                                icon="square"
                                title="Layout"
                                options={Object.entries(LAYOUTS).map(([k, v]) => ({ key: k as LayoutKey, label: v.label }))}
                                value={layout}
                                onChange={setLayout}
                                layoutId="layout-pill"
                            />

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={feedback}
                                    className="text-[0.8rem] text-[#A8B2CC] italic font-light leading-relaxed pt-4 border-t border-white/[0.1]"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    &ldquo;{feedback}&rdquo;
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="relative w-full max-w-3xl lg:max-w-none mx-auto">
                        <div
                            className="rounded-2xl overflow-hidden border border-white/[0.12]"
                            style={{ boxShadow: '0 16px 52px rgba(2,6,23,0.42), 0 2px 10px rgba(2,6,23,0.28)' }}
                        >
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.1] bg-[#10182C]">
                                <div className="w-2 h-2 rounded-full bg-white/[0.18]" />
                                <div className="w-2 h-2 rounded-full bg-white/[0.18]" />
                                <div className="w-2 h-2 rounded-full bg-white/[0.18]" />
                                <div className="ml-3 h-3.5 w-36 rounded-full bg-white/[0.08]" />
                            </div>

                            <motion.div className="p-5 md:p-7 min-h-[340px]" animate={{ backgroundColor: config.bg }} transition={{ duration: 0.5 }}>
                                <motion.div className="flex items-center justify-between mb-8" animate={{ color: config.text }} transition={{ duration: 0.4 }}>
                                    <span className="text-[0.65rem] font-semibold tracking-[0.08em] uppercase" style={{ fontWeight: config.fontWeight > 500 ? 700 : 500 }}>
                                        {layout === 'personal' ? 'J. Studio' : layout === 'product' ? 'Launchpad' : 'Sitemeesters'}
                                    </span>
                                    <div className="flex gap-3 items-center">
                                        {layoutConfig.navLinks.map((l) => (
                                            <span key={l} className="text-[0.5rem] tracking-wider" style={{ color: config.textMuted }}>
                                                {l}
                                            </span>
                                        ))}
                                        <motion.span
                                            className="text-[0.45rem] px-2.5 py-1 tracking-wider font-medium"
                                            animate={{
                                                backgroundColor: config.accent,
                                                color: '#FFFFFF',
                                                borderRadius: config.borderRadius,
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {layoutConfig.cta}
                                        </motion.span>
                                    </div>
                                </motion.div>

                                <div className="mb-6">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={layout + style}
                                            initial={{ opacity: 0, y: isDynamic ? 15 : 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: isDynamic ? -15 : -8 }}
                                            transition={{ duration: isDynamic ? 0.35 : 0.5, ease: EASING.out }}
                                        >
                                            <div className="text-[clamp(0.9rem,1.8vw,1.4rem)] leading-tight mb-3" style={{ color: config.text, fontWeight: config.fontWeight > 500 ? 700 : 600 }}>
                                                {layoutConfig.headline}
                                            </div>
                                            <div className="h-2 w-2/3 rounded mb-1.5" style={{ backgroundColor: `${config.textMuted}20` }} />
                                            <div className="h-2 w-1/2 rounded mb-4" style={{ backgroundColor: `${config.textMuted}15` }} />
                                            <motion.div
                                                className="inline-flex px-4 py-1.5 text-[0.45rem] font-medium text-white tracking-wider"
                                                animate={{ backgroundColor: config.accent, borderRadius: config.borderRadius }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                {layoutConfig.cta} -&gt;
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="grid grid-cols-3 gap-2.5">
                                    {['Strategy', 'Design', 'Code'].map((label, i) => (
                                        <motion.div
                                            key={label}
                                            className="p-3 border"
                                            animate={{
                                                backgroundColor: config.cardBg,
                                                borderColor: mood === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                                                borderRadius: config.borderRadius,
                                                boxShadow: config.shadow,
                                            }}
                                            transition={{ duration: 0.4, delay: isDynamic ? i * 0.05 : 0 }}
                                            whileHover={isDynamic ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' } : {}}
                                        >
                                            <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: `${config.accent}20` }} />
                                            <div className="text-[0.45rem] font-medium tracking-wider uppercase" style={{ color: config.textMuted }}>
                                                {label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <a href="#contact" className="group inline-flex items-center gap-2 text-[0.8rem] font-medium text-[#4F46E5] hover:text-[#3730A3] transition-colors duration-300">
                        Let&apos;s build something like this
                        <span className="group-hover:translate-x-1 transition-transform duration-300">-&gt;</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
