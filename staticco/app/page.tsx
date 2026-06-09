"use client";

import { useState, useEffect, useRef } from "react";

// ─── Orbit Logo ─────────────────────────────────────────────────────────────
function OrbitLogo({ dark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-7 h-7 flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-600" />
        </div>
        <div
          className="absolute inset-0 rounded-full border border-blue-500/40"
          style={{ animation: "orbitA 3.5s linear infinite" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600" />
        </div>
        <div
          className="absolute inset-0 rounded-full border border-blue-500/20"
          style={{ animation: "orbitB 5.5s linear infinite" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400/60" />
        </div>
      </div>
      <span
        className={`font-bold text-[17px] tracking-tight ${
          dark ? "text-white/80" : "text-gray-900"
        }`}
        style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.025em" }}
      >
        Static<span className="text-blue-600">.</span>Co
      </span>
    </div>
  );
}

// ─── Workflow Rail ───────────────────────────────────────────────────────────
const workflowSteps = [
  { id: "lead", label: "New lead", sub: "captured automatically", color: "bg-slate-100 text-slate-600 border-slate-200" },
  { id: "quote", label: "Quote sent", sub: "auto after 2h", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "followup", label: "Follow-up", sub: "day 3 · SMS", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "won", label: "Won ✓", sub: "revenue logged", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "rebook", label: "Auto rebook", sub: "on your schedule", color: "bg-violet-50 text-violet-700 border-violet-200" },
];

function WorkflowRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % workflowSteps.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* annotation */}
      <div className="absolute -top-6 left-3 flex items-center gap-1.5">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M0 6 Q10 0 20 6" stroke="#94a3b8" strokeWidth="1" fill="none" strokeDasharray="2 2" />
        </svg>
        <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">your client workflow · mapped automatically</span>
      </div>

      <div className="flex items-center gap-1.5 mt-2">
        {workflowSteps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1.5">
            <div
              className={`border rounded-lg px-2.5 py-1.5 transition-all duration-300 cursor-default ${step.color} ${
                active === i ? "shadow-sm scale-105 ring-1 ring-offset-1 ring-blue-300" : "opacity-60"
              }`}
            >
              <div className="text-[11px] font-semibold whitespace-nowrap leading-tight">{step.label}</div>
              <div className="text-[9px] opacity-70 whitespace-nowrap leading-tight mt-0.5">{step.sub}</div>
            </div>
            {i < workflowSteps.length - 1 && (
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="flex-shrink-0 opacity-40">
                <path d="M0 4h10M7 1l3 3-3 3" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Industry Pills ──────────────────────────────────────────────────────────
const industries = [
  { label: "Med Spas", dot: "bg-rose-400" },
  { label: "Roofing", dot: "bg-amber-400" },
  { label: "Legal", dot: "bg-slate-400" },
  { label: "Real Estate", dot: "bg-blue-400" },
  { label: "Agencies", dot: "bg-violet-400" },
  { label: "Clinics", dot: "bg-emerald-400" },
  { label: "Contractors", dot: "bg-orange-400" },
];

// ─── Mini CRM Card ───────────────────────────────────────────────────────────
function MiniCRMCard() {
  const clients = [
    { initials: "JM", name: "James M.", tag: "Follow-up due", tagColor: "bg-red-50 text-red-600", days: "12d since last contact", avatarBg: "bg-red-100 text-red-600" },
    { initials: "SK", name: "Sarah K.", tag: "VIP · Active", tagColor: "bg-emerald-50 text-emerald-700", days: "Next appt. in 6d", avatarBg: "bg-emerald-100 text-emerald-700" },
    { initials: "AP", name: "Alex P.", tag: "Rebook soon", tagColor: "bg-amber-50 text-amber-700", days: "Due in 18 days", avatarBg: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* card header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-semibold text-gray-500 tracking-wide uppercase">Client pipeline</span>
        </div>
        <span className="text-[10px] text-gray-400">5 clients need attention</span>
      </div>
      {/* rows */}
      <div className="divide-y divide-gray-50">
        {clients.map((c) => (
          <div key={c.initials} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/50 transition-colors">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${c.avatarBg}`}>
              {c.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-gray-800 leading-tight">{c.name}</div>
              <div className="text-[10px] text-gray-400 leading-tight mt-0.5">{c.days}</div>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.tagColor}`}>{c.tag}</span>
          </div>
        ))}
      </div>
      {/* footer */}
      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
        <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Send all follow-up messages →
        </button>
      </div>
    </div>
  );
}

// ─── Hero Visual Panel ───────────────────────────────────────────────────────
function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[520px] flex flex-col justify-center gap-5 pl-4">

      {/* industry pills cluster */}
      <div>
        <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2.5 ml-0.5">
          Built for your vertical
        </div>
        <div className="flex flex-wrap gap-1.5">
          {industries.map((ind) => (
            <div
              key={ind.label}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-[11px] font-medium text-gray-700 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-default"
            >
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ind.dot}`} />
              {ind.label}
            </div>
          ))}
        </div>
      </div>

      {/* workflow rail */}
      <div className="relative mt-1">
        <WorkflowRail />
      </div>

      {/* mini CRM card */}
      <div className="relative">
        {/* annotation arrow */}
        <div className="absolute -right-2 -top-7 flex items-center gap-1">
          <span className="text-[10px] text-slate-400 italic">knows your client cycles</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2 Q14 8 8 14" stroke="#94a3b8" strokeWidth="1" fill="none" strokeDasharray="2 2" />
            <path d="M6 11 L8 14 L11 12" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <MiniCRMCard />
      </div>

      {/* bottom stat chips */}
      <div className="flex gap-2 flex-wrap">
        {[
          { val: "74%", label: "client retention" },
          { val: "3×", label: "more rebookings" },
          { val: "↓62%", label: "admin time" },
        ].map((s) => (
          <div key={s.val} className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <div className="text-[14px] font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{s.val}</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-wide leading-tight mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────
const steps = [
  {
    step: "01",
    title: "Tell us how your business actually works",
    body: "Fill out a short questionnaire — your client lifecycle, your follow-up process, the things that fall through the cracks right now. Takes five minutes.",
    detail: "We read every answer. Nothing goes into a generic template.",
  },
  {
    step: "02",
    title: "We build a working demo around your workflow",
    body: "Within 24 hours you get a demo built around your specific business type. Not a generic mockup — a real CRM configured for how you operate.",
    detail: "If your business runs on recurring service cycles, the CRM knows that. If you track where leads come from, it tracks that.",
  },
  {
    step: "03",
    title: "You go live in days, not months",
    body: "We walk you through the demo, you tell us what to adjust, and we get you set up. Onboarding is hours. There's no IT team, no implementation project, no consultants.",
    detail: "Most clients are fully operational within a week of their first conversation.",
  },
];

// ─── Why Static Co. ──────────────────────────────────────────────────────────
const differentiators = [
  {
    label: "Knows your industry",
    body: "Every feature, every default, every workflow is built around how your type of business actually runs. Not every business.",
    tag: "Vertical-first",
    tagColor: "bg-blue-50 text-blue-700",
  },
  {
    label: "Priced for small businesses",
    body: "Flat monthly pricing. No contracts, no per-seat surprises, no features locked behind enterprise tiers. Cancel any time.",
    tag: "Transparent pricing",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Onboards in hours",
    body: "We set it up for you. You're not reading documentation or watching tutorial videos. You just tell us what you need.",
    tag: "White-glove setup",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    label: "Built around your feedback",
    body: "When you're a Static Co. client, what you ask for actually gets built. Not in 18 months on a product roadmap — in the next version.",
    tag: "Direct line to the builder",
    tagColor: "bg-violet-50 text-violet-700",
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function StaticCoLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* inject orbit keyframes + Sora font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        @keyframes orbitA {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitB {
          from { transform: rotate(65deg); }
          to   { transform: rotate(-295deg); }
        }
        @keyframes bgOrbitA { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes bgOrbitB { from { transform: translate(-50%,-50%) rotate(65deg); } to { transform: translate(-50%,-50%) rotate(-295deg); } }
        @keyframes bgOrbitC { from { transform: translate(-50%,-50%) rotate(130deg); } to { transform: translate(-50%,-50%) rotate(-230deg); } }
        @keyframes bgOrbitD { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        .sora { font-family: 'Sora', sans-serif; }
      `}</style>

      <div className="bg-blue-50/50 min-h-screen text-gray-900 antialiased">

        {/* ── NAV ─────────────────────────────────────────────────────────── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-blue-50/90 backdrop-blur-sm border-b border-blue-100 shadow-sm" : "bg-transparent"}`}>
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <OrbitLogo />
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
              <a href="#products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Products</a>
              <a href="#why" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Why us</a>
              <a
                href="/questionnaire"
                className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Get started
              </a>
            </div>
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* animated orbit background */}
          <div
            className="absolute pointer-events-none"
            style={{ top: "42%", left: "64%", width: "1000px", height: "1000px" }}
            aria-hidden="true"
          >
            <div style={{ position: "absolute", top: "50%", left: "50%", width: "18px", height: "18px", borderRadius: "50%", background: "#111827", opacity: 0.18, transform: "translate(-50%,-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", width: "1000px", height: "1000px", marginTop: "-500px", marginLeft: "-500px", borderRadius: "50%", border: "1.5px solid rgba(17,24,39,0.06)", animation: "bgOrbitD 26s linear infinite" }}>
              <div style={{ position: "absolute", top: "-4px", left: "50%", width: "8px", height: "8px", borderRadius: "50%", background: "#111827", opacity: 0.14, transform: "translateX(-50%)" }} />
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", width: "720px", height: "720px", marginTop: "-360px", marginLeft: "-360px", borderRadius: "50%", border: "1.5px solid rgba(17,24,39,0.09)", animation: "bgOrbitC 18s linear infinite" }}>
              <div style={{ position: "absolute", top: "-4px", left: "50%", width: "9px", height: "9px", borderRadius: "50%", background: "#111827", opacity: 0.18, transform: "translateX(-50%)" }} />
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", width: "480px", height: "480px", marginTop: "-240px", marginLeft: "-240px", borderRadius: "50%", border: "1.5px solid rgba(17,24,39,0.13)", animation: "bgOrbitB 12s linear infinite" }}>
              <div style={{ position: "absolute", top: "-5px", left: "50%", width: "10px", height: "10px", borderRadius: "50%", background: "#111827", opacity: 0.24, transform: "translateX(-50%)" }} />
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", width: "280px", height: "280px", marginTop: "-140px", marginLeft: "-140px", borderRadius: "50%", border: "1.5px solid rgba(17,24,39,0.18)", animation: "bgOrbitA 7s linear infinite" }}>
              <div style={{ position: "absolute", top: "-6px", left: "50%", width: "12px", height: "12px", borderRadius: "50%", background: "#111827", opacity: 0.32, transform: "translateX(-50%)" }} />
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left: copy */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-6 tracking-wide">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                CRM software · Built for your industry
              </div>

              <h1
                className="sora text-5xl md:text-6xl font-extrabold leading-[1.04] tracking-tight text-gray-900 mb-6"
              >
                CRM software that{" "}
                <span className="italic text-blue-600">actually fits</span>{" "}
                how your business works.
              </h1>

              <p className="text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-md">
                Generic CRMs are built for every company at once. We build one that maps your exact workflow, your client cycles, and your follow-up process — so nothing falls through the cracks.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="/questionnaire"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
                >
                  Get your custom CRM →
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors border-b border-gray-200 hover:border-gray-500 pb-0.5"
                >
                  See how it works
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100">
                {[
                  { val: "5 min", label: "to describe your business" },
                  { val: "24 hrs", label: "to get a working demo" },
                  { val: "$0", label: "to get started" },
                ].map((s) => (
                  <div key={s.val} className="flex flex-col gap-0.5">
                    <span className="sora text-2xl font-bold text-gray-900 leading-none">{s.val}</span>
                    <span className="text-xs text-gray-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual */}
            <div className="hidden md:block">
              <HeroVisual />
            </div>
          </div>
          </div>
        </section>

        {/* ── THIN MARQUEE STRIP ───────────────────────────────────────────── */}
        <div className="border-y border-gray-100 bg-gray-50/60 py-3 overflow-hidden relative">
          {/* fade masks on both edges so the loop is invisible */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgb(249,250,251), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgb(249,250,251), transparent)" }} />
          <div className="flex gap-10 items-center whitespace-nowrap" style={{ animation: "marquee 22s linear infinite", width: "max-content" }}>
            {[...industries, ...industries, ...industries, ...industries].map((ind, i) => (
              <span key={i} className="flex items-center gap-2 text-xs text-gray-400 font-medium flex-shrink-0">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ind.dot}`} />
                {ind.label}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
          `}</style>
        </div>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-14">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">How it works</div>
            <h2 className="sora text-4xl font-bold tracking-tight text-gray-900 max-w-lg leading-tight">
              From conversation to CRM in days, not months.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {steps.map((s) => (
              <div key={s.step} className="bg-white p-8 group hover:bg-blue-50/30 transition-colors">
                <div className="text-xs font-bold text-blue-600 tracking-widest mb-4">{s.step}</div>
                <div className="w-8 h-0.5 bg-blue-600 mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="sora text-[17px] font-bold text-gray-900 leading-snug mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.body}</p>
                <p className="text-xs text-blue-600/80 italic leading-relaxed border-l-2 border-blue-100 pl-3">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
        <section id="products" className="bg-gray-950 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Our products</div>
              <h2 className="sora text-4xl font-bold tracking-tight text-white max-w-lg leading-tight">
                Vertical CRMs. Each one built for one industry.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800 rounded-xl overflow-hidden border border-gray-800">
              {/* Aura — live */}
              <div className="bg-gray-900 p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />
                <div className="inline-block bg-blue-600/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-5">
                  Now available
                </div>
                <div className="sora text-3xl font-bold text-white mb-1.5">Aura</div>
                <div className="text-sm text-gray-400 mb-6 leading-relaxed">
                  The CRM built for med spas and aesthetics practices. Knows treatment cycles, tracks client lifetime value, and automates the follow-ups that keep clients coming back.
                </div>
                <ul className="flex flex-col gap-2.5 mb-8">
                  {[
                    "Smart rebooking based on Botox, filler, and laser cycles",
                    "Visual client treatment timeline from day one",
                    "Reactivation pipeline with personalized SMS previews",
                    "Before & after photo library with consent tracking",
                    "Membership management + monthly recurring revenue",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-blue-600/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/questionnaire/aura"
                  className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
                >
                  Get started with Aura →
                </a>
              </div>

              {/* More verticals — coming soon */}
              <div className="bg-gray-900/60 p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-gray-800 text-gray-500 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-5 border border-gray-700">
                    Coming soon
                  </div>
                  <div className="sora text-3xl font-bold text-gray-500 mb-1.5">More verticals</div>
                  <div className="text-sm text-gray-600 mb-8 leading-relaxed">
                    We're building CRMs for additional industries. If yours isn't listed, tell us — it might be next on the roadmap.
                  </div>
                  <div className="flex flex-col gap-3">
                    {["Real estate agencies", "Independent insurance brokers", "Home service businesses", "Fitness studios & gyms"].map((v) => (
                      <div key={v} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href="/questionnaire"
                  className="inline-block mt-8 border border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-500 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all w-fit"
                >
                  Tell us about your business →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY STATIC CO. ───────────────────────────────────────────────── */}
        <section id="why" className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-14">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Why Static Co.</div>
            <h2 className="sora text-4xl font-bold tracking-tight text-gray-900 max-w-lg leading-tight">
              What makes this different from every other CRM.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {differentiators.map((d) => (
              <div key={d.label} className="bg-white p-8 group hover:bg-gray-50/80 transition-colors">
                <div className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded mb-5 ${d.tagColor}`}>
                  {d.tag}
                </div>
                <h3 className="sora text-[18px] font-bold text-gray-900 mb-3 leading-snug">{d.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
        <section className="bg-blue-600 py-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="sora text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Ready to see what a CRM built for you looks like?
            </h2>
            <p className="text-blue-100/80 text-lg font-light mb-10 leading-relaxed">
              Fill out a short questionnaire and we'll have a working demo in your hands within 24 hours. No commitment, no credit card.
            </p>
            <a
              href="/questionnaire"
              className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold text-base px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-800/30"
            >
              Get your free demo →
            </a>
            <p className="text-blue-200/50 text-xs mt-4">Takes 5 minutes · Free · No sales calls</p>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="bg-gray-950 border-t border-gray-800 py-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <OrbitLogo dark />
            <div className="flex gap-8 flex-wrap justify-center">
              {["How it works", "Products", "Get started"].map((l) => (
                <a
                  key={l}
                  href={l === "Get started" ? "/questionnaire" : `#${l.toLowerCase().replace(" ", "-")}`}
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {l}
                </a>
              ))}
              <a href="mailto:team@staticco.net" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                team@staticco.net
              </a>
            </div>
            <span className="text-xs text-gray-700">© 2026 Static Co.</span>
          </div>
        </footer>

      </div>
    </>
  );
}
