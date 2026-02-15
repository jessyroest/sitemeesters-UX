/* ─── Text Scramble Hook — Letters decode from random chars to real text ─── */
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

/**
 * Creates a "hacker decode" text effect.
 * Characters scramble rapidly then settle into their final form left-to-right.
 */
export function useTextScramble(
    target: string,
    options: { delay?: number; speed?: number; enabled?: boolean } = {}
) {
    const { delay = 0, speed = 30, enabled = true } = options;
    const [display, setDisplay] = useState(() => (enabled ? '' : target));
    const frameRef = useRef<number>(0);

    const scramble = useCallback(() => {
        let iteration = 0;
        const len = target.length;

        const run = () => {
            setDisplay(
                target
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < iteration) return target[i];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join('')
            );

            iteration += 1 / 3;
            if (iteration <= len) {
                frameRef.current = window.setTimeout(run, speed);
            } else {
                setDisplay(target);
            }
        };
        run();
    }, [target, speed]);

    useEffect(() => {
        if (!enabled) return;
        const timeout = window.setTimeout(scramble, delay);
        return () => {
            clearTimeout(timeout);
            clearTimeout(frameRef.current);
        };
    }, [scramble, delay, enabled, target]);

    return enabled ? display : target;
}
