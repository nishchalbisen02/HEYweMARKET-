"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import {
  QUESTIONS,
  PILLARS,
  type PillarKey,
  type Scored,
  score,
  summaryReport,
  detailedReport,
  downloadHtml,
} from "@/lib/audit";
import { BrutalButton } from "@/components/brutal-button";

const RING_C = 377;
const pillarColor = (v: number) => (v >= 70 ? "#7CC242" : v >= 45 ? "#F59E0B" : "#F87171");
const pillarStatus = (v: number) => (v >= 70 ? "Healthy" : v >= 45 ? "Needs work" : "Critical gap");

export function GrowthAudit() {
  const [panel, setPanel] = useState<"intro" | "quiz" | "result">("intro");
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<(number | null)[]>(() => Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState<Scored | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [arcOffset, setArcOffset] = useState(RING_C);
  const [barWidths, setBarWidths] = useState<Record<string, number>>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const keepInView = useCallback(() => {
    const r = rootRef.current?.getBoundingClientRect();
    if (r && (r.top < 64 || r.top > window.innerHeight * 0.5)) {
      rootRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "start" });
    }
  }, []);

  const start = () => {
    setAns(Array(QUESTIONS.length).fill(null));
    setI(0);
    setPanel("quiz");
    setTimeout(keepInView, 0);
  };

  const restart = () => {
    setAns(Array(QUESTIONS.length).fill(null));
    setI(0);
    setResult(null);
    setPanel("intro");
    setTimeout(keepInView, 0);
  };

  const answer = (v: number) => {
    const next = [...ans];
    next[i] = v;
    setAns(next);
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
      setTimeout(keepInView, 0);
    } else {
      const s = score(next);
      setResult(s);
      setPanel("result");
    }
  };

  // animate ring + number + pillar bars when result appears
  useEffect(() => {
    if (panel !== "result" || !result) return;
    const s = result;
    let raf = 0;

    if (reduced.current) {
      setArcOffset(RING_C - (s.total / 100) * RING_C);
      setDisplayScore(s.total);
    } else {
      setArcOffset(RING_C);
      const t0 = performance.now();
      const dur = 1200;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplayScore(Math.round(eased * s.total));
        setArcOffset(RING_C - ((eased * s.total) / 100) * RING_C);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    const bt = setTimeout(() => {
      const w: Record<string, number> = {};
      (Object.keys(PILLARS) as PillarKey[]).forEach((k) => (w[k] = s.p[k]));
      setBarWidths(w);
    }, 120);
    rootRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "start" });

    return () => {
      clearTimeout(bt);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [panel, result]);

  const q = QUESTIONS[i];

  return (
    <div
      ref={rootRef}
      id="aud"
      data-reveal=""
      className="mt-[clamp(30px,5vw,50px)] border border-night-fg/15 bg-[color-mix(in_srgb,var(--color-night)_82%,transparent)] shadow-soft-lg backdrop-blur-md"
    >
      {/* INTRO */}
      {panel === "intro" && (
        <div className="p-[clamp(20px,4vw,44px)]">
          <div className="grid items-start gap-[clamp(24px,4vw,44px)] lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="mb-[18px] inline-block border border-night-fg/20 bg-accent px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-night">
                12 questions // 90 seconds
              </span>
              <h3 className="mb-4 text-[clamp(1.3rem,3vw,2rem)] ">What you&rsquo;ll get</h3>
              <ul className="mb-6 flex list-none flex-col gap-2.5">
                {[
                  ["Growth Score /100", " — benchmarked against businesses in your category"],
                  ["5 pillar scores", " — search & AI visibility, GBP, paid ads, content, tracking"],
                  ["Your top 5 fixes", " — ranked by impact vs effort, with expected timelines"],
                  ["Revenue-at-risk estimate", " — what the gaps are plausibly costing you monthly"],
                  ["Two downloadable reports", " — a quick summary, or a full detailed audit"],
                ].map(([b, rest]) => (
                  <li key={b} className="relative pl-[22px] text-[14px] font-normal leading-[1.5] text-night-fg/80 before:absolute before:left-0 before:font-mono before:font-bold before:text-primary before:content-['//']">
                    <b className="text-night-fg">{b}</b>
                    {rest}
                  </li>
                ))}
              </ul>
              <BrutalButton tone="on-dark" onClick={start}>
                Start my free audit <ArrowRight />
              </BrutalButton>
              <p className="mt-3.5 text-[12px] text-night-fg/50">
                Runs entirely in your browser. Nothing is sent anywhere unless you ask us to.
              </p>
            </div>
            <div className="border border-night-fg/20/20 p-5">
              <div className="relative mx-auto mb-5 w-[150px]">
                <svg viewBox="0 0 120 120" aria-hidden="true" className="w-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(246,242,250,.14)" strokeWidth="12" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#b3a2cc" strokeWidth="12" strokeDasharray="327" strokeDashoffset="120" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <b className="font-heading text-[2.4rem] font-semibold leading-none">63</b>
                  <small className="font-mono text-[9px] tracking-[0.1em] text-night-fg/50">SAMPLE</small>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  ["Search & AI", 45],
                  ["Google Profile", 78],
                  ["Paid Ads", 60],
                  ["Content", 71],
                  ["Tracking", 38],
                ].map(([label, w]) => (
                  <div key={label as string} className="grid grid-cols-[100px_1fr] items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.03em] text-night-fg/55">
                    <span>{label}</span>
                    <i className="block h-2 border border-night-fg bg-primary" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {panel === "quiz" && (
        <div className="p-[clamp(20px,4vw,44px)]">
          <div aria-hidden="true" className="mb-[18px] h-2 overflow-hidden border border-night-fg/20/20 bg-white/[0.03]">
            <i className="block h-full bg-primary transition-[width] duration-150" style={{ width: `${(i / QUESTIONS.length) * 100}%` }} />
          </div>
          <div className="mb-4 flex justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.05em] text-night-fg/55">
            <span>Question {i + 1} of {QUESTIONS.length}</span>
            <span>{PILLARS[q.p]}</span>
          </div>
          <h3 className="mb-3 text-[clamp(1.15rem,2.6vw,1.7rem)]  leading-[1.15]">{q.q}</h3>
          <p className="mb-[22px] max-w-[60ch] text-[13.5px] font-normal leading-[1.55] text-night-fg/60">{q.why}</p>
          <div className="flex flex-col gap-2.5">
            {q.o.map(([label, v], n) => (
              <button
                key={label}
                onClick={() => answer(v)}
                className="flex min-h-12 w-full items-center gap-3.5 border border-night-fg/20/20 bg-white/[0.03] px-4 py-[15px] text-left text-[15px] transition-colors duration-150 hover:border-primary hover:bg-white/[0.04]"
              >
                <span className="grid size-7 shrink-0 place-items-center border border-night-fg/20/20 font-mono text-[12px] font-bold text-primary">
                  {String.fromCharCode(65 + n)}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="mt-[22px] flex items-center justify-between gap-3">
            <button
              onClick={() => i > 0 && setI(i - 1)}
              className={cn("p-2 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-night-fg/60 hover:text-primary", i === 0 && "invisible")}
            >
              &larr; Back
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-night-fg/40">Pick an answer to continue</span>
          </div>
        </div>
      )}

      {/* RESULT */}
      {panel === "result" && result && (
        <div className="p-[clamp(20px,4vw,44px)]">
          <div className="mb-8 grid items-center gap-[clamp(20px,4vw,40px)] sm:grid-cols-[150px_1fr]">
            <div className="relative w-[150px]">
              <svg viewBox="0 0 140 140" aria-hidden="true" className="w-full">
                <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(246,242,250,.14)" strokeWidth="14" />
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#b3a2cc"
                  strokeWidth="14"
                  strokeDasharray={RING_C}
                  strokeDashoffset={arcOffset}
                  transform="rotate(-90 70 70)"
                  style={{ transition: reduced.current ? "none" : "stroke-dashoffset 0.05s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <b className="font-heading text-[2.6rem] font-semibold leading-none">{displayScore}</b>
                <small className="font-mono text-[10px] text-night-fg/50">/100</small>
              </div>
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">{result.grade[0]}</span>
              <h3 className="my-2.5 text-[clamp(1.3rem,3vw,2rem)] ">Your Growth Score is {result.total}/100</h3>
              <p className="max-w-[56ch] text-[14px] font-normal leading-[1.55] text-night-fg/70">
                {result.grade[1]} Below is where the score comes from and what to fix first.
              </p>
              <div className="mt-[18px]">
                <div className="relative h-2.5 border border-night-fg/20/20 bg-white/[0.03]">
                  <i className="absolute -top-0.5 h-2.5 w-1.5 bg-primary" style={{ left: `${result.total}%` }} />
                  <i className="absolute -top-0.5 h-2.5 w-1.5 bg-night-fg/50" style={{ left: "54%" }} />
                </div>
                <p className="mt-2.5 text-[12px] text-night-fg/55">
                  You score{" "}
                  <b className="text-night-fg">
                    {Math.abs(result.total - 54)} points {result.total >= 54 ? "above" : "below"}
                  </b>{" "}
                  the typical business we audit (54/100).
                </p>
              </div>
            </div>
          </div>

          <div className="mb-7 grid grid-cols-2 gap-2.5 lg:grid-cols-5">
            {(Object.keys(PILLARS) as PillarKey[]).map((k) => {
              const v = result.p[k];
              const c = pillarColor(v);
              return (
                <div key={k} className="border border-night-fg/20/20 p-3.5">
                  <div className="min-h-[2.8em] font-mono text-[9.5px] uppercase leading-[1.4] tracking-[0.03em] text-night-fg/50">{PILLARS[k]}</div>
                  <div className="my-1.5 font-heading text-[1.9rem] font-semibold" style={{ color: c }}>{v}</div>
                  <div className="h-1.5 overflow-hidden border border-night-fg/20 bg-white/[0.03]">
                    <i className="block h-full transition-[width] duration-500 ease-out" style={{ width: `${barWidths[k] ?? 0}%`, background: c }} />
                  </div>
                  <div className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.03em]" style={{ color: c }}>{pillarStatus(v)}</div>
                </div>
              );
            })}
          </div>

          <div className="mb-[30px] border border-primary bg-white/[0.04] p-5">
            <b className="mb-2 block font-heading text-[1.05rem]  text-night-fg">
              {result.band[0]} of your reachable demand is likely going to competitors
            </b>
            <p className="text-[13.5px] font-normal leading-[1.55] text-night-fg/72">
              Based on the gaps in <strong className="text-white">{PILLARS[result.order[0]]}</strong> and{" "}
              <strong className="text-white">{PILLARS[result.order[1]]}</strong>, you&rsquo;re currently missing {result.band[1]} — people
              actively looking for what you sell who never see you.
            </p>
            <small className="mt-2.5 block text-[11px] text-night-fg/45">
              Directional estimate derived from your answers and published local/AI search ranking weights. Not a revenue guarantee.
            </small>
          </div>

          <h4 className="mb-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-night-fg/50">Your 5 highest-impact fixes</h4>
          <div className="mb-[34px] flex flex-col gap-2.5">
            {result.fixes.map(([pk, f], n) => (
              <div key={n} className="grid grid-cols-[34px_1fr] gap-3.5 border border-night-fg/20/20 p-4">
                <span className="font-heading text-[1.4rem] font-semibold text-primary">{n + 1}</span>
                <div>
                  <b className="mb-1.5 block text-[15px] font-bold">{f[0]}</b>
                  <p className="text-[13px] font-normal leading-[1.55] text-night-fg/68">{f[1]}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {[
                      [f[3], true],
                      [f[4], false],
                      [f[2], false],
                      [PILLARS[pk], false],
                    ].map(([t, hi], k) => (
                      <span
                        key={k}
                        className={cn(
                          "border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.02em]",
                          hi ? "border-accent bg-accent text-night" : "border-night-fg/20 text-night-fg/60"
                        )}
                      >
                        {t as string}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="mb-1.5 font-heading text-[1.15rem] ">Take your report with you</h4>
            <p className="mb-[18px] text-[13px] text-night-fg/50">
              Both are generated instantly in your browser and are yours to keep — no email, no strings.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => downloadHtml(summaryReport(result, ans), "Summary-360-Growth-Audit-Hey-We-Market.html")}
                className="flex flex-col gap-2 border border-night-fg/20/20 bg-white/[0.03] p-5 text-left transition-colors duration-150 hover:border-primary"
              >
                <span className="self-start border border-night-fg/20 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-night-fg/55">Quick</span>
                <b className="font-heading text-[1rem] ">Summary Report</b>
                <small className="text-[12px] font-normal leading-[1.5] text-night-fg/60">
                  1–2 pages. Your score, pillar breakdown, top 5 fixes and the 90-day outline.
                </small>
                <span className="mt-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-primary">Download summary</span>
              </button>
              <button
                onClick={() => downloadHtml(detailedReport(result, ans), "Detailed-360-Growth-Audit-Hey-We-Market.html")}
                className="flex flex-col gap-2 border border-accent bg-white/[0.03] p-5 text-left transition-colors duration-150 hover:border-primary"
              >
                <span className="self-start border border-accent bg-accent px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-night">Recommended</span>
                <b className="font-heading text-[1rem] ">Detailed Report</b>
                <small className="text-[12px] font-normal leading-[1.5] text-night-fg/60">
                  Full multi-page deep dive: a section per pillar, our exact implementation steps, KPIs, your answer-by-answer breakdown, a phased 90-day plan and a glossary.
                </small>
                <span className="mt-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-primary">Download detailed report</span>
                <span className="text-[10.5px] text-night-fg/40">Opens ready to save as PDF</span>
              </button>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3.5">
              <button onClick={restart} className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-night-fg/60 hover:text-primary">
                &#8635; Retake audit
              </button>
              <a href="#contact" className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-night-fg/60 hover:text-primary">
                Want us to walk you through it? Book a free call &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
