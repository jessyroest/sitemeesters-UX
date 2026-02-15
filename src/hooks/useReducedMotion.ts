/* ─── Reduced Motion Hook ─── */
'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true if user prefers reduced motion.
 * Used throughout the app to disable heavy animations.
 */
export function useReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
}
