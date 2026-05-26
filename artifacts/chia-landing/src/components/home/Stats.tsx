import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

function StatItem({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) {
  const { value: animatedValue, elementRef } = useCounterAnimation(value);

  return (
    <div ref={elementRef} className="flex flex-col items-center text-center p-6">
      <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-2 flex items-center">
        {prefix}{animatedValue}{suffix}
      </div>
      <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const containerRef = useScrollAnimation("fadeUp");

  return (
    <section className="py-20 bg-secondary/10 border-y border-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-secondary/20">
          <StatItem value={10000} label="Clientes felices" prefix="+" />
          <StatItem value={500} label="Productos" prefix="+" />
          <StatItem value={5} label="Años de exp." prefix="+" />
          <StatItem value={100} label="Ingredientes naturales" suffix="%" />
        </div>
      </div>
    </section>
  );
}
