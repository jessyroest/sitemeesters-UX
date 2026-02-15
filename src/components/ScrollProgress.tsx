/* ─── Scroll Progress — Subtle top bar ─── */
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #06B6D4 0%, #4F46E5 58%, #2563EB 100%)',
                opacity: 0.85,
                boxShadow: '0 0 14px rgba(79,70,229,0.34)',
            }}
        />
    );
}
