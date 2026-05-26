import { useEffect } from "react";
import gsap from "gsap";

export function useCursorTrail() {
  useEffect(() => {
    // Only run on desktop and if user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    
    if (prefersReducedMotion || isMobile) return;

    const cursor = document.createElement("div");
    cursor.className = "fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block";
    cursor.style.backgroundColor = "hsl(var(--secondary))";
    cursor.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(cursor);

    const follower = document.createElement("div");
    follower.className = "fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] opacity-50 mix-blend-difference hidden md:block";
    follower.style.border = "1px solid hsl(var(--primary))";
    follower.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    gsap.ticker.add(() => {
      // Smooth interpolation
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cursor.remove();
      follower.remove();
    };
  }, []);
}
