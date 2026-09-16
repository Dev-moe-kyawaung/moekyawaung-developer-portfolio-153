import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Impact } from "./components/Impact";
import { Systems } from "./components/Systems";
import { Decisions } from "./components/Decisions";
import { Reliability } from "./components/Reliability";
import { Leadership } from "./components/Leadership";
import { OpenSource } from "./components/OpenSource";
import { Contact } from "./components/Contact";
import { useReveal } from "./hooks/useEnv";

export default function App() {
  useReveal();

  return (
    <div className="relative min-h-screen bg-[var(--navy)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-[var(--orange)] focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:font-semibold focus:text-[#131313]"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Impact />
        <Systems />
        <Decisions />
        <Reliability />
        <Leadership />
        <OpenSource />
        <Contact />
      </main>
    </div>
  );
}
