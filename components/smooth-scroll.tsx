"use client";
import { useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<any>(null);

  useEffect(() => {
    const initializeScroll = async () => {
      // @ts-ignore
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: contentRef.current!,
        lerp: 0.1,
        smooth: true,
        easing: (t:any) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        autoResize: true,
      });
    };

    initializeScroll();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <main ref={contentRef} className="pt-[100px]">
      {children}
    </main>
  );
};

export default SmoothScroll;
