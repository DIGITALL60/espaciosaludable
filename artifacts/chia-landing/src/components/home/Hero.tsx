import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Leaf, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FULL_TITLE = "Tu día rico en proteínas ♡";

function useTypewriter(text: string, speed = 55, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export function Hero() {
  const { displayed, done } = useTypewriter(FULL_TITLE, 55, 300);

  const sectionRef  = useRef<HTMLElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef  = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLDivElement>(null);
  const trustRef    = useRef<HTMLDivElement>(null);
  const btn1Ref     = useRef<HTMLButtonElement>(null);
  const btn2Ref     = useRef<HTMLButtonElement>(null);

  // ── Entrance animations ──────────────────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Badge from top
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    // Subtitle from below (after ~title starts typing)
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.6 },
      "+=0.8"
    )
    // Buttons stagger
    .fromTo(buttonsRef.current!.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
      "-=0.2"
    )
    // Trust icons stagger
    .fromTo(trustRef.current!.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      "-=0.2"
    );

    // Video zoom in
    gsap.fromTo(videoRef.current,
      { scale: 1.12, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
    );

    // ── ScrollTrigger: parallax on video ─────────────────────────
    gsap.to(videoRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // ── ScrollTrigger: text content fades out on scroll ──────────
    gsap.to(".hero-text-col", {
      opacity: 0,
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "60% top",
        end: "bottom top",
        scrub: 1,
      },
    });

  }, { scope: sectionRef });

  // ── Button hover with GSAP ────────────────────────────────────────
  const hoverIn  = (ref: React.RefObject<HTMLButtonElement | null>) =>
    () => gsap.to(ref.current, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  const hoverOut = (ref: React.RefObject<HTMLButtonElement | null>) =>
    () => gsap.to(ref.current, { scale: 1,    duration: 0.2, ease: "power2.out" });

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-secondary/20 rounded-bl-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-accent/30 rounded-tr-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ─────────────────────────────────────────── */}
          <div className="hero-text-col max-w-2xl">

            {/* Badge */}
            <div
              ref={badgeRef}
              className="opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary font-medium text-sm mb-6 border border-secondary/30"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              NUEVA FÓRMULA MEJORADA
            </div>

            {/* Title — typewriter */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6 min-h-[1.2em]">
              {displayed}
              <span
                className={`inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-1 ${
                  done ? "animate-blink" : "opacity-100"
                }`}
              />
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="opacity-0 text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Alimentos reales, sin culpas y pensados para tu bienestar.
              Descubrí nuestra nueva línea de pastas de frutos secos TRIBA.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-12">
              <Button
                ref={btn1Ref}
                size="lg"
                className="opacity-0 bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full h-14 text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors"
                onMouseEnter={hoverIn(btn1Ref)}
                onMouseLeave={hoverOut(btn1Ref)}
              >
                Comprar Ahora
              </Button>
              <Button
                ref={btn2Ref}
                size="lg"
                variant="outline"
                className="opacity-0 rounded-full h-14 px-8 text-lg border-primary/20 hover:bg-primary/5 transition-colors"
                onMouseEnter={hoverIn(btn2Ref)}
                onMouseLeave={hoverOut(btn2Ref)}
              >
                Ver Recetas
              </Button>
            </div>

            {/* Trust icons */}
            <div
              ref={trustRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50"
            >
              {[
                { icon: Leaf,         text: "Ingredientes naturales" },
                { icon: Shield,       text: "Sin azúcar agregada"   },
                { icon: CheckCircle2, text: "Vegano y sin TACC"     },
                { icon: Heart,        text: "Atención personalizada"},
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="opacity-0 flex flex-col items-center sm:items-start gap-2 text-center sm:text-left"
                >
                  <div className="p-2 bg-accent rounded-full text-primary">
                    <item.icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground leading-tight max-w-[100px]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: video ───────────────────────────────────────── */}
          <div className="relative lg:ml-auto">
            <div ref={videoRef} className="relative w-full max-w-md mx-auto opacity-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-black aspect-[9/16]">
                <video
                  src="/chia-reel.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
