"use client";

import { useState } from "react";
import Link from "next/link";

export default function OtherQuestionnaire() {
  const [submitted, setSubmitted] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [describe, setDescribe] = useState("");
  const [clientFlow, setClientFlow] = useState("");
  const [repeatPattern, setRepeatPattern] = useState("");
  const [biggestProblem, setBiggestProblem] = useState("");
  const [currentTools, setCurrentTools] = useState("");
  const [budget, setBudget] = useState("");

  const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  const budgetOptions = ["Under $100/mo", "$100-$200/mo", "$200-$350/mo", "$350+/mo", "Flexible if it delivers"];
  const canSubmit = businessName && ownerName && email && describe;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l6 6 10-12" stroke="#4A7A5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>Thanks — we got it.</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">We read every one of these. If your business looks like a fit, we&apos;ll send you a short questionnaire built specifically for your industry — the next step toward a CRM made for {businessName || "your business"}.</p>
          <Link href="/" className="text-blue-600 text-sm hover:underline">Back to Static Co.</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap');`}</style>

      <div className="bg-gray-900 px-8 py-6 flex items-center justify-between">
        <Link href="/questionnaire" className="flex flex-col">
          <span className="text-xl font-bold text-blue-400" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>Static<span className="text-blue-500">.</span>Co</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Change industry</span>
        </Link>
        <div className="text-right">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Tell us about your business</div>
          <div className="text-xs text-gray-600 mt-0.5">General inquiry · Confidential</div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Let&apos;s see if we&apos;re a fit</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Tell us how your business works</h1>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">We don&apos;t have a pre-built CRM for your industry yet. This is a few quick questions so we can tell whether we&apos;re a fit — if we are, we&apos;ll send you a short questionnaire built specifically for your industry, just like our med spa product.</p>

        <div className="grid grid-cols-2 gap-4 mb-7">
          <div><label className="text-sm font-semibold text-gray-800 mb-2 block">Business name <span className="text-blue-500">*</span></label><input className={input} value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your business name" /></div>
          <div><label className="text-sm font-semibold text-gray-800 mb-2 block">Your name <span className="text-blue-500">*</span></label><input className={input} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="First and last name" /></div>
          <div><label className="text-sm font-semibold text-gray-800 mb-2 block">Email <span className="text-blue-500">*</span></label><input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" /></div>
          <div><label className="text-sm font-semibold text-gray-800 mb-2 block">Phone</label><input className={input} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" /></div>
        </div>

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">What industry are you in?</label>
          <input className={input} value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Dog grooming, tattoo studio, auto detailing, dental..." />
        </div>

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-800 mb-1 block">What does your business do, in your own words? <span className="text-blue-500">*</span></label>
          <div className="text-xs text-gray-400 italic mb-3">Describe what you sell and who your customers are.</div>
          <textarea className={`${input} min-h-[90px] resize-y`} value={describe} onChange={(e) => setDescribe(e.target.value)} placeholder="e.g. We're a mobile dog grooming service. We have 4 vans and book recurring appointments — most clients come every 4-6 weeks..." />
        </div>

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-800 mb-1 block">How does a customer go from first contact to coming back again?</label>
          <div className="text-xs text-gray-400 italic mb-3">This single answer tells us the most — it&apos;s how we&apos;ll design a questionnaire built for your industry. Walk us through the whole journey.</div>
          <textarea className={`${input} min-h-[100px] resize-y`} value={clientFlow} onChange={(e) => setClientFlow(e.target.value)} placeholder="e.g. They find us on Instagram, DM us, we book them, they come in, then we manually text them a month later to rebook..." />
        </div>

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-800 mb-1 block">Do your customers come back on a regular cycle?</label>
          <div className="text-xs text-gray-400 italic mb-3">Businesses where customers return on a predictable schedule are where a CRM helps most.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["Yes — on a fairly regular cycle", "Sometimes, but not predictable", "Mostly one-time customers", "Not sure"].map((opt) => (
              <label key={opt} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${repeatPattern === opt ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
                <input type="radio" name="repeat" checked={repeatPattern === opt} onChange={() => setRepeatPattern(opt)} className="accent-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-800 mb-1 block">What&apos;s the single biggest headache in running your business right now?</label>
          <div className="text-xs text-gray-400 italic mb-3">The thing that, if solved, would make the biggest difference.</div>
          <textarea className={`${input} min-h-[80px] resize-y`} value={biggestProblem} onChange={(e) => setBiggestProblem(e.target.value)} placeholder="e.g. I lose track of who's due to come back and I'm doing all the follow-up by hand..." />
        </div>

        <div className="mb-7">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">What tools or software do you use today?</label>
          <input className={input} value={currentTools} onChange={(e) => setCurrentTools(e.target.value)} placeholder="e.g. Square for payments, a paper calendar, Instagram DMs..." />
        </div>

        <div className="mb-8">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Monthly budget if we built something for you?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {budgetOptions.map((opt) => (
              <label key={opt} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${budget === opt ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
                <input type="radio" name="budget" checked={budget === opt} onChange={() => setBudget(opt)} className="accent-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <Link href="/questionnaire" className="text-sm text-gray-500 hover:text-gray-800 transition-colors border-b border-gray-200 hover:border-gray-500 pb-0.5">Back</Link>
          <button onClick={() => { if (canSubmit) setSubmitted(true); }} disabled={!canSubmit} className={`bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all ${!canSubmit ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}>Submit</button>
        </div>
      </div>
    </>
  );
}
