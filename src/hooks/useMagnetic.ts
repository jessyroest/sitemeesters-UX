/* ─── Magnetic Button Hook — Elements that follow cursor within proximity ─── */
'use client';

import { useRef, useCallback } from 'react';

/**
 * Makes an element magnetically attracted to the cursor.
 * Returns ref to attach + mouse handlers.
 */
export function useMagnetic(strength: number = 0.3) {
    const ref = useRef<HTMLElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'translate(0px, 0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            if (el) el.style.transition = '';
        }, 500);
    }, []);

    return { ref, handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave } };
}
