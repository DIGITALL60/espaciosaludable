import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useCounterAnimation(endValue: number, duration: number = 2) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    ScrollTrigger.create({
      trigger: elementRef.current,
      start: "top 80%",
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: endValue,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            setValue(Math.floor(obj.val));
          }
        });
      },
      once: true
    });
  }, { scope: elementRef });

  return { value, elementRef };
}
