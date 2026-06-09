"use client";

import Link from "next/link";

// Each industry maps to a product. Add a new entry here when you launch a vertical,
// then create app/questionnaire/[slug]/page.tsx to match the `href`.
const products = [
  {
    slug: "aura",
    industry: "Med Spas & Aesthetics",
    desc: "Smart rebooking on treatment cycles, client timelines, reactivation, memberships, and before & after photos.",
    status: "live",
    badge: "Aura · Available",
    dot: "bg-rose-400",
  },
  {
    slug: null,
    product: "Coming soon",
    industry: "Roofing & Contractors",
    desc: "Job pipeline, quote follow-ups, and seasonal rebooking built for home service businesses.",
    status: "soon",
    dot: "bg-amber-400",
  },
  {
    slug: null,
    product: "Coming soon",
    industry: "Real Estate",
    desc: "Lead tracking, listing follow-ups, and client lifecycle management for agents and teams.",
    status: "soon",
    dot: "bg-blue-400",
  },
  {
    slug: null,
    product: "Coming soon",
    industry: "Legal & Professional Services",
    desc: "Matter tracking, intake automation, and client communication for small firms.",
    status: "soon",
    dot: "bg-slate-400",
  },
  {
    slug: "other",
    industry: "Something else",
    desc: "Run a different kind of business? Tell us how it works and what you need — we build new verticals based on real demand.",
    status: "live",
    badge: "Tell us more →",
    dot: "bg-emerald-400",
  },
];

export default function QuestionnaireChooser() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap');`}</style>

      {/* Header */}
      <div className="bg-gray-900 px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold text-blue-400" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>Static<span className="text-blue-500">.</span>Co</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Back to site</span>
        </Link>
        <div className="text-right">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Get your custom CRM</div>
          <div className="text-xs text-gray-600 mt-0.5">Choose your industry</div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Step 1 — Pick your industry</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          Which best describes your business?
        </h1>
        <p className="text-gray-500 mb-12 leading-relaxed max-w-xl">
          We build a separate CRM for each industry so it fits exactly how your business runs. Pick yours below and we&apos;ll take you to a short questionnaire tailored to it.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {products.map((p, i) => {
            const card = (
              <div
                className={`group flex items-start gap-4 p-6 rounded-xl border transition-all ${
                  p.status === "live"
                    ? "border-gray-200 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer"
                    : "border-gray-100 bg-gray-50 cursor-not-allowed"
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${p.dot} ${p.status === "soon" ? "opacity-40" : ""}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className={`text-lg font-bold ${p.status === "live" ? "text-gray-900" : "text-gray-400"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                      {p.industry}
                    </span>
                    {p.status === "live" ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-400 px-2 py-0.5 rounded border border-gray-200">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${p.status === "live" ? "text-gray-500" : "text-gray-400"}`}>
                    {p.desc}
                  </p>
                </div>
                {p.status === "live" && (
                  <div className="text-blue-600 text-xl self-center transition-transform group-hover:translate-x-1">→</div>
                )}
              </div>
            );

            return p.slug ? (
              <Link key={i} href={`/questionnaire/${p.slug}`}>{card}</Link>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-gray-50 border border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-1">Don&apos;t see your industry?</p>
          <p className="text-xs text-gray-400">
            We&apos;re adding new verticals all the time. Email{" "}
            <a href="mailto:hello@staticco.net" className="text-blue-600 hover:underline">hello@staticco.net</a>
            {" "}and tell us what you do — yours might be next.
          </p>
        </div>
      </div>
    </>
  );
}
