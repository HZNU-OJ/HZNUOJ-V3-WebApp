import { useEffect, useRef, useState } from "react";

/**
 * Use if the screen width is in [`l`, `r`)
 *
 * @note `l` and `r` must be constant values.
 */
export function useScreenWidthWithin(l: number, r: number): boolean {
  const refMediaQueryList = useRef<MediaQueryList>();

  // Initialization
  if (!refMediaQueryList.current) {
    refMediaQueryList.current = Number.isFinite(r)
      ? window.matchMedia(
          `only screen and (min-width: ${l}px) and (max-width: ${r - 1}px)`,
        )
      : window.matchMedia(`only screen and (min-width: ${l}px)`);
  }

  const [result, setResult] = useState(refMediaQueryList.current.matches);

  useEffect(() => {
    function onChange(e: MediaQueryListEvent) {
      setResult(e.matches);
    }

    if (refMediaQueryList.current.addEventListener) {
      refMediaQueryList.current.addEventListener("change", onChange);
      return () =>
        refMediaQueryList.current.removeEventListener("change", onChange);
    } else {
      refMediaQueryList.current.addListener(onChange);
      return () => refMediaQueryList.current.removeListener(onChange);
    }
  });

  return result;
}
