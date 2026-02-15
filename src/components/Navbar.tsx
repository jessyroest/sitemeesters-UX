'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 30,
        mass: 0.25,
    });

    const shellOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);
    const shellBorder = useTransform(smoothProgress, [0, 0.04], [0, 0.09]);
    const shellShadow = useTransform(smoothProgress, [0, 0.04], [0, 0.12]);

    return (
        <motion.nav className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 pt-3">
            <motion.div
                className="mx-auto max-w-6xl rounded-2xl"
                style={{
                    backgroundColor: useTransform(shellOpacity, (v) => `rgba(255,255,255,${v * 0.82})`),
                    border: useTransform(shellBorder, (v) => `1px solid rgba(0,0,0,${v})`),
                    boxShadow: useTransform(shellShadow, (v) => `0 10px 30px rgba(15,23,42,${v})`),
                    backdropFilter: useTransform(shellOpacity, (v) => `blur(${v * 14}px)`),
                }}
            >
                <div className="h-14 md:h-16 px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <a
                        href="#"
                        className="justify-self-start text-[0.96rem] sm:text-[1rem] font-semibold tracking-[0.08em] uppercase"
                        style={{ color: 'var(--foreground)' }}
                    >
                        <span>SITE</span>
                        <span className="text-[#06B6D4]">MEESTERS</span>
                    </a>

                    <ul className="hidden md:flex items-center gap-7 justify-self-center">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="group relative text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-300"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#0A0A0A] transition-all duration-300 group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="justify-self-end flex items-center gap-2">
                        <a
                            href="#contact"
                            className="md:hidden inline-flex items-center px-3.5 py-2 rounded-full text-[0.68rem] font-semibold tracking-[0.08em] uppercase border border-black/[0.08]"
                            style={{ color: 'var(--foreground)' }}
                        >
                            Contact
                        </a>
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-white bg-[#0A0A0A] hover:bg-[#1F2937] transition-colors duration-300"
                        >
                            Let&apos;s Talk
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    );
}
