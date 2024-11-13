import Image from "next/image";
import { metadata } from "./layout";
import { SimulationPanel } from "./ui/simulation-panel";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col text-center">
        <h1 className="text-2xl">{metadata.title?.toString()}</h1>
        {metadata.description}
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SimulationPanel />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Lorkenpeist/geneticar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            aria-hidden
            src="/github.svg"
            alt="GitHub icon"
            width={20}
            height={20}
          />
          Find {metadata.title?.toString()} on GitHub
        </a>
      </footer>
    </div>
  );
}
