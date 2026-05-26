import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Recipes } from "@/components/home/Recipes";

import { Stats } from "@/components/home/Stats";
import { Social } from "@/components/home/Social";
import { Preloader } from "@/components/Preloader";
import { useCursorTrail } from "@/hooks/use-cursor-trail";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  
  useCursorTrail();

  return (
    <div className="min-h-screen flex flex-col w-full bg-background selection:bg-secondary selection:text-secondary-foreground">
      <Preloader onComplete={() => setPreloaderDone(true)} />
      
      {preloaderDone && (
        <>
          <Header />
          <main className="flex-grow">
            <Hero />
            <Categories />
            <Recipes />
            <Stats />

            <Social />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
