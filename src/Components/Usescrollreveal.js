import { useEffect, useRef, useState } from "react";

/**
 * Attach to a ref: fires once the element scrolls into view, then
 * stays true (no re-hiding on scroll-away, which reads as jittery).
 *
 *   const [ref, isVisible] = useScrollReveal();
 *   <div ref={ref} className={`bb-reveal ${isVisible ? "is-visible" : ""}`}>
 */
export function useScrollReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
}