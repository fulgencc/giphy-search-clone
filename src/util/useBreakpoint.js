import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

/**
 * 
 * @param {number} width Width of the screen
 * @returns a string of the current breakpoint
 */
const getDeviceConfig = (width) => {
    if (width < 320) {
        return 'xs';
    } else if (width >= 320 && width < 720) {
        return 'sm';
    } else if (width >= 720 && width < 1024) {
        return 'md';
    } else if (width >= 1024) {
        return 'lg';
    }
};

/**
 * Custom hook to return breakpoints of the window. Credits to:
 * https://betterprogramming.pub/usebreakpoint-hook-get-media-query-breakpoints-in-react-3f1779b73568
 * @returns the name of the breakpoint the browser is at.
 */
const useBreakpoint = () => {
    const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));

    useEffect(() => {
        const calcInnerWidth = throttle(function () {
            setBrkPnt(getDeviceConfig(window.innerWidth))
        }, 200);
        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, []);

    return brkPnt;
}
export default useBreakpoint;