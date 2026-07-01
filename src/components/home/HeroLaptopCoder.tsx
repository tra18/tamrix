"use client";

import { useEffect, useState, type ReactNode } from "react";

interface CodeShowcaseCopy {
  filename: string;
  statusTyping: string;
  statusDone: string;
  lines: string[];
}

interface HeroLaptopCoderProps {
  copy: CodeShowcaseCopy;
}

function highlightLine(line: string): ReactNode {
  if (line.startsWith("//")) {
    return <span className="text-tamrix-muted">{line}</span>;
  }
  if (line.includes("await") || line.includes("const") || line.includes("export")) {
    const parts = line.split(/(\b(?:export|const|await|async|function)\b)/g);
    return parts.map((part, i) => {
      if (["export", "const", "await", "async", "function"].includes(part)) {
        return (
          <span key={i} className="text-violet-300">
            {part}
          </span>
        );
      }
      if (part.includes('"') || part.includes("'")) {
        return (
          <span key={i} className="text-emerald-300">
            {part}
          </span>
        );
      }
      if (part.includes("tamrix") || part.includes("build") || part.includes("deploy")) {
        return (
          <span key={i} className="text-brand-300">
            {part}
          </span>
        );
      }
      return (
        <span key={i} className="text-tamrix-text/90">
          {part}
        </span>
      );
    });
  }
  if (line.includes("✓")) {
    return <span className="text-emerald-400">{line}</span>;
  }
  return <span className="text-tamrix-text/90">{line}</span>;
}

export function HeroLaptopCoder({ copy }: HeroLaptopCoderProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setLineIndex(copy.lines.length);
      setCharIndex(0);
      setDone(true);
      return;
    }

    const currentLine = copy.lines[lineIndex];
    if (!currentLine) {
      const resetTimer = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
        setDone(false);
      }, 2800);
      return () => clearTimeout(resetTimer);
    }

    if (charIndex < currentLine.length) {
      const speed = currentLine[charIndex] === " " ? 28 : 42;
      const timer = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }

    if (lineIndex < copy.lines.length - 1) {
      const timer = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 320);
      return () => clearTimeout(timer);
    }

    setDone(true);
    const timer = setTimeout(() => {
      setLineIndex(0);
      setCharIndex(0);
      setDone(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, copy.lines, reducedMotion]);

  const visibleLines = reducedMotion
    ? copy.lines
    : copy.lines.slice(0, lineIndex + 1).map((line, i) =>
        i < lineIndex ? line : line.slice(0, charIndex)
      );

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden>
      <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-brand-300/10 blur-3xl" />
      <div className="absolute -right-2 top-8 h-24 w-24 rounded-full bg-brand-300/5 blur-2xl" />

      <div className="relative rounded-t-2xl border border-tamrix-border/80 bg-gradient-to-b from-tamrix-elevated to-tamrix-surface p-2 shadow-glow-lg sm:p-3">
        <div className="overflow-hidden rounded-xl border border-tamrix-border bg-[#060d14] shadow-inner">
          <div className="flex items-center gap-2 border-b border-tamrix-border bg-tamrix-surface/90 px-3 py-2.5 sm:px-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="ml-1 truncate font-mono text-[10px] text-tamrix-muted sm:text-xs">
              {copy.filename}
            </span>
            <span className="ml-auto hidden rounded border border-brand-300/20 bg-brand-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-300 sm:inline">
              Tamrix IDE
            </span>
          </div>

          <div className="relative min-h-[200px] p-3 font-mono text-[11px] leading-relaxed sm:min-h-[240px] sm:p-4 sm:text-xs">
            <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-tamrix-border/50 bg-tamrix-bg/40 text-right pr-2 pt-3 text-[10px] text-tamrix-muted/50 select-none">
              {visibleLines.map((_, i) => (
                <div key={i} className="leading-relaxed">
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="pl-7 sm:pl-8">
              {visibleLines.map((line, i) => (
                <div key={i} className="min-h-[1.25rem] whitespace-pre">
                  {highlightLine(line)}
                  {i === visibleLines.length - 1 && !done && !reducedMotion && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-brand-300 align-middle" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-tamrix-border bg-tamrix-surface/60 px-3 py-2 sm:px-4">
            <div className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${done ? "bg-emerald-400" : "animate-pulse bg-brand-300"}`}
              />
              <span className="text-[10px] text-tamrix-muted sm:text-xs">
                {done ? copy.statusDone : copy.statusTyping}
              </span>
            </div>
            <span className="font-mono text-[10px] text-brand-300/60">UTF-8</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-0 h-3 w-[92%] rounded-b-md border-x border-b border-tamrix-border/60 bg-gradient-to-b from-tamrix-elevated to-tamrix-surface" />
      <div className="mx-auto h-1.5 w-[38%] rounded-b-lg bg-gradient-to-b from-tamrix-border/80 to-transparent" />
    </div>
  );
}
