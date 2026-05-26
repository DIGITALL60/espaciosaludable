import { useEffect, useState } from "react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Scroll lock while preloading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "";
        onComplete();
      }
    });

    tl.to(".preloader-logo", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out"
    })
    .to(".preloader-bg", {
      yPercent: -100,
      duration: 0.7,
      ease: "power4.inOut",
      delay: 0.2
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="preloader-bg fixed inset-0 z-[100] bg-primary flex items-center justify-center">
      <div className="preloader-logo opacity-0 translate-y-8 flex flex-col items-center text-primary-foreground">
        <span className="font-serif text-5xl font-bold tracking-widest mb-2">CHÍA</span>
        <span className="text-sm tracking-[0.3em] uppercase opacity-70">Espacio Saludable</span>
      </div>
    </div>
  );
}
