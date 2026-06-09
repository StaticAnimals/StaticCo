"use client";

import { useState } from "react";
import Link from "next/link";

const steps = ["Your Spa", "Treatments", "Clients", "Operations", "Goals"];

const treatmentOptions = [
  "Botox / Dysport", "Dermal filler", "Hydrafacial", "Laser hair removal",
  "Laser resurfacing / IPL", "Microneedling / PRP", "Chemical peels",
  "Medical-grade skincare", "Body contouring / CoolSculpting",
  "IV therapy / wellness", "Weight loss (semaglutide, etc.)", "Other",
];

const leadSources = [
  "Instagram / social", "Google search", "Client referrals",
  "Walk-ins", "Events / popups", "Influencer partnerships", "Other",
];

const intakeFields = [
  "Name + contact info", "Date of birth", "Medical history & contraindications",
  "Medications & allergies", "Consent forms (per treatment)", "Before photos",
  "Skin type / Fitzpatrick scale", "Treatment goals", "Referral source",
];

const bookingSoftwareOptions = [
  "Vagaro", "Mindbody", "GlossGenius", "Aesthetic Record",
  "Boulevard", "Jane", "Square Appointments", "Other", "Nothing - pen & paper / DMs",
];

const otherTools = [
  { val: "email-marketing", label: "Email marketing", sub: "Mailchimp, Klaviyo, etc." },
  { val: "sms-marketing", label: "SMS marketing", sub: "Podium, Birdeye, etc." },
  { val: "pos", label: "Point of sale", sub: "Square, Stripe, Clover" },
  { val: "emr", label: "EMR / charting", sub: "Aesthetic Record, PatientNow" },
  { val: "memberships", label: "Membership billing", sub: "recurring payment tool" },
  { val: "social-ads", label: "Paid social ads", sub: "Instagram, TikTok, Facebook" },
];

const priorities = [
  { val: "retention", label: "Get existing clients rebooking more often", sub: "builds: smart rebooking engine, churn alerts, treatment timelines" },
  { val: "reactivation", label: "Win back clients who stopped coming", sub: "builds: reactivation pipeline, automated win-back SMS" },
  { val: "new-clients", label: "Convert more new leads into clients", sub: "builds: lead tracker, source attribution, follow-up automation" },
  { val: "memberships", label: "Build predictable monthly recurring revenue", sub: "builds: membership tiers, recurring billing, member dashboard" },
  { val: "less-admin", label: "Spend less time on manual follow-up", sub: "builds: automated reminders, bulk SMS, one-click rebook" },
  { val: "reporting", label: "Understand my numbers (revenue, retention)", sub: "builds: revenue-by-treatment, provider performance, trends" },
  { val: "photos", label: "Organize before & after photos with consent", sub: "builds: photo library, consent tracking, marketing tags" },
];

function RadioGroup({ name, options, value, onChange, cols = 2 }: {
  name: string; options: string[]; value: string; onChange: (v: string) => void; cols?: number;
}) {
  return (
    <div className={`grid gap-2 ${cols === 1 ? "grid-cols-1" : cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${value === opt ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="accent-blue-600 flex-shrink-0" />
          <span className="text-sm text-gray-800">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange, cols = 2 }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void; cols?: number;
}) {
  const toggle = (opt: string) => onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  return (
    <div className={`grid gap-2 ${cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${selected.includes(opt) ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="accent-blue-600 flex-shrink-0" />
          <span className="text-sm text-gray-800">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroupSub({ options, selected, onChange }: {
  options: { val: string; label: string; sub: string }[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (val: string) => onChange(selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val]);
  return (
    <div className="grid grid-cols-1 gap-2">
      {options.map((opt) => (
        <label key={opt.val} className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${selected.includes(opt.val) ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
          <input type="checkbox" checked={selected.includes(opt.val)} onChange={() => toggle(opt.val)} className="accent-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm text-gray-800 font-medium">{opt.label}</div>
            {opt.sub && <div className="text-xs text-gray-400 mt-0.5">{opt.sub}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}

function Question({ label, hint, required, children }: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="text-sm font-semibold text-gray-800 mb-1">{label} {required && <span className="text-blue-500">*</span>}</div>
      {hint && <div className="text-xs text-gray-400 italic mb-3">{hint}</div>}
      {children}
    </div>
  );
}

export default function AuraQuestionnaire() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [spaName, setSpaName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [staff, setStaff] = useState("");
  const [providers, setProviders] = useState("");

  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [topTreatment, setTopTreatment] = useState("");
  const [rebookCycles, setRebookCycles] = useState("");
  const [tracksConsent, setTracksConsent] = useState("");

  const [clientCount, setClientCount] = useState("");
  const [ticketSize, setTicketSize] = useState("");
  const [selectedLeadSources, setSelectedLeadSources] = useState<string[]>([]);
  const [hasMemberships, setHasMemberships] = useState("");
  const [membershipDetail, setMembershipDetail] = useState("");
  const [churnWindow, setChurnWindow] = useState("");
  const [followupMethod, setFollowupMethod] = useState("");

  const [bookingSoftware, setBookingSoftware] = useState("");
  const [softwareFrustration, setSoftwareFrustration] = useState("");
  const [selectedIntakeFields, setSelectedIntakeFields] = useState<string[]>([]);
  const [photoMethod, setPhotoMethod] = useState("");
  const [selectedOtherTools, setSelectedOtherTools] = useState<string[]>([]);

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [winDefinition, setWinDefinition] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  const input = "w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  const canProceed = () => (step === 0 ? !!(spaName && ownerName && email && location) : true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/mwvjbpjw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Aura questionnaire - ${spaName}`,
          source: "Aura questionnaire",
          spa_name: spaName,
          owner_name: ownerName,
          email,
          phone,
          location,
          staff,
          providers,
          treatments: selectedTreatments.join(", "),
          top_treatment: topTreatment,
          rebook_cycles: rebookCycles,
          consent: tracksConsent,
          client_count: clientCount,
          ticket_size: ticketSize,
          lead_sources: selectedLeadSources.join(", "),
          memberships: hasMemberships,
          membership_detail: membershipDetail,
          churn_window: churnWindow,
          followup_method: followupMethod,
          booking_software: bookingSoftware,
          software_frustration: softwareFrustration,
          intake_fields: selectedIntakeFields.join(", "),
          photo_method: photoMethod,
          other_tools: selectedOtherTools.join(", "),
          priorities: selectedPriorities.join(", "),
          win_definition: winDefinition,
          budget,
          timeline,
          anything_else: anythingElse,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l6 6 10-12" stroke="#4A7A5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>You&apos;re all set.</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">Thanks for the detail - it genuinely shapes what we build. We&apos;ll review your answers and follow up within 24 hours with a working Aura demo tailored to {spaName || "your spa"}.</p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-left mb-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Your submission</div>
            {[
              { label: "Spa", val: spaName },
              { label: "Owner", val: ownerName },
              { label: "Email", val: email },
              { label: "Treatments", val: selectedTreatments.length + " selected" },
              { label: "Status", val: "Received", green: true },
            ].map((r) => (
              <div key={r.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-gray-400">{r.label}</span>
                <span className={`font-medium ${r.green ? "text-green-600" : "text-gray-800"}`}>{r.val}</span>
              </div>
            ))}
          </div>
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
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Aura Setup Questionnaire</div>
          <div className="text-xs text-gray-600 mt-0.5">Med Spa CRM - Confidential</div>
        </div>
      </div>

      <div className="bg-gray-900 px-8 pb-5">
        <div className="flex items-center max-w-2xl">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${i < step ? "bg-blue-600/30 text-blue-400 border border-blue-600/40" : i === step ? "bg-blue-600 text-white" : "border border-gray-700 text-gray-600"}`}>{i < step ? "\u2713" : i + 1}</div>
                <span className={`text-[9px] uppercase tracking-wide ${i === step ? "text-blue-400" : "text-gray-600"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-1 mb-4 ${i < step ? "bg-blue-600/40" : "bg-gray-800"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {step === 0 && (
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Section 1 of 5</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Tell us about your spa</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">The basics, so we know who we&apos;re building for and how your team is structured.</p>

            <div className="grid grid-cols-2 gap-4 mb-7">
              <div><div className="text-sm font-semibold text-gray-800 mb-2">Spa name <span className="text-blue-500">*</span></div><input className={input} value={spaName} onChange={(e) => setSpaName(e.target.value)} placeholder="e.g. Lumiere Med Spa" /></div>
              <div><div className="text-sm font-semibold text-gray-800 mb-2">Your name <span className="text-blue-500">*</span></div><input className={input} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="First and last name" /></div>
              <div><div className="text-sm font-semibold text-gray-800 mb-2">Email <span className="text-blue-500">*</span></div><input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourspa.com" /></div>
              <div><div className="text-sm font-semibold text-gray-800 mb-2">Phone</div><input className={input} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" /></div>
            </div>

            <div className="mb-7"><div className="text-sm font-semibold text-gray-800 mb-2">City and state <span className="text-blue-500">*</span></div><input className={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Dallas, TX" /></div>

            <div className="border-t border-gray-100 my-6" />

            <Question label="How many total staff work at your spa?">
              <RadioGroup name="staff" options={["Just me", "2-4", "5-10", "10+"]} value={staff} onChange={setStaff} />
            </Question>

            <Question label="How many of those are providers/injectors who see clients?" hint="This tells us how to build provider scheduling and per-provider revenue tracking.">
              <RadioGroup name="providers" options={["1", "2-3", "4-6", "7+"]} value={providers} onChange={setProviders} cols={3} />
            </Question>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Section 2 of 5</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Your treatments</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">This is the most important section for how Aura works. We use your treatments and their cycles to build the smart rebooking engine - the thing that knows a Botox client is due at 90 days, not just &quot;hasn&apos;t visited in a while.&quot;</p>

            <Question label="Which treatments do you offer?" hint="Select all - each becomes a tracked treatment type in your CRM." required>
              <CheckboxGroup options={treatmentOptions} selected={selectedTreatments} onChange={setSelectedTreatments} cols={2} />
            </Question>

            <Question label="What's your #1 highest-volume treatment?" hint="The one that drives the most bookings - we'll optimize the rebooking flow around it first.">
              <input className={input} value={topTreatment} onChange={(e) => setTopTreatment(e.target.value)} placeholder="e.g. Botox - about 60% of our appointments" />
            </Question>

            <Question label="Tell us the rebooking cycle for each treatment you offer." hint="This is GOLD for the build - list how often clients should return for each. Example: 'Botox every 3 months, filler every 6-9 months, Hydrafacial monthly, laser every 4-6 weeks for a package of 6.'">
              <textarea className={`${input} min-h-[120px] resize-y`} value={rebookCycles} onChange={(e) => setRebookCycles(e.target.value)} placeholder="Botox: every 90 days&#10;Filler: every 6 months&#10;Hydrafacial: monthly&#10;Laser hair removal: every 4-6 weeks, 6-session package..." />
            </Question>

            <Question label="Do you require signed consent forms before treatments?" hint="Determines whether we build consent tracking into every appointment and photo.">
              <RadioGroup name="consent" options={["Yes - every treatment", "Only for certain treatments", "Not currently, but we should"]} value={tracksConsent} onChange={setTracksConsent} cols={1} />
            </Question>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Section 3 of 5</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Your clients</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Helps us size the database, configure churn thresholds, and set up your membership tiers and lead tracking.</p>

            <div className="grid grid-cols-2 gap-4 mb-7">
              <div><div className="text-sm font-semibold text-gray-800 mb-2">Approx. active clients?</div><select className={input} value={clientCount} onChange={(e) => setClientCount(e.target.value)}><option value="">Select a range</option>{["Under 100", "100-300", "300-600", "600-1,000", "Over 1,000"].map(o => <option key={o}>{o}</option>)}</select></div>
              <div><div className="text-sm font-semibold text-gray-800 mb-2">Average spend per visit?</div><select className={input} value={ticketSize} onChange={(e) => setTicketSize(e.target.value)}><option value="">Select a range</option>{["Under $200", "$200-$400", "$400-$600", "$600-$1,000", "Over $1,000"].map(o => <option key={o}>{o}</option>)}</select></div>
            </div>

            <Question label="Where do most new clients come from?" hint="Sets up your lead source tracking and attribution reporting.">
              <CheckboxGroup options={leadSources} selected={selectedLeadSources} onChange={setSelectedLeadSources} />
            </Question>

            <Question label="Do you offer memberships or monthly packages?">
              <RadioGroup name="mem" options={["Yes, we do", "No, but want to", "No interest"]} value={hasMemberships} onChange={setHasMemberships} cols={3} />
            </Question>

            {(hasMemberships === "Yes, we do" || hasMemberships === "No, but want to") && (
              <Question label="Describe your membership tiers (or what you'd want them to be)." hint="Name, price, and what's included. We'll build these directly into your membership dashboard.">
                <textarea className={`${input} min-h-[90px] resize-y`} value={membershipDetail} onChange={(e) => setMembershipDetail(e.target.value)} placeholder="e.g. Glow - $149/mo, includes 1 Hydrafacial + 15% off all treatments. Luxe - $249/mo, includes monthly Botox touch-up + unlimited Hydrafacials..." />
              </Question>
            )}

            <Question label="When do you consider a client 'at risk' of not coming back?" hint="Sets your default churn alert threshold (you can override per-treatment later).">
              <RadioGroup name="churn" options={["30 days", "60 days", "90 days", "Depends on treatment"]} value={churnWindow} onChange={setChurnWindow} />
            </Question>

            <Question label="How do you follow up with clients who haven't rebooked today?">
              <RadioGroup name="followup" options={["We text/call them manually", "Occasional email blast", "Our software does it automatically", "Honestly, we don't - this is the problem"]} value={followupMethod} onChange={setFollowupMethod} cols={1} />
            </Question>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Section 4 of 5</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>How you run things now</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">So Aura replaces what isn&apos;t working and fits how your front desk already operates.</p>

            <Question label="What software do you currently use for booking?">
              <RadioGroup name="software" options={bookingSoftwareOptions} value={bookingSoftware} onChange={setBookingSoftware} cols={1} />
            </Question>

            <Question label="What frustrates you most about your current setup?" hint="The single most useful answer in this whole form. Be specific and honest - this becomes the first thing we fix.">
              <textarea className={`${input} min-h-[110px] resize-y`} value={softwareFrustration} onChange={(e) => setSoftwareFrustration(e.target.value)} placeholder="e.g. It tracks appointments fine but has no idea who's overdue for Botox. I manually scroll through clients to find people to text. Reports are useless. They charge extra for SMS..." />
            </Question>

            <Question label="What do you collect when a new client comes in?" hint="We'll pre-build your intake form with exactly these fields.">
              <CheckboxGroup options={intakeFields} selected={selectedIntakeFields} onChange={setSelectedIntakeFields} />
            </Question>

            <Question label="How do you handle before & after photos today?" hint="Photos + consent are a big med spa pain point - tells us how much to build here.">
              <RadioGroup name="photos" options={["Staff phones / personal camera roll", "Shared folder (Drive, Dropbox)", "Inside our current software", "No real system - it's a mess"]} value={photoMethod} onChange={setPhotoMethod} cols={1} />
            </Question>

            <Question label="What else are you currently paying for?" hint="Helps us know what Aura can absorb so you can cancel other subscriptions.">
              <CheckboxGroupSub options={otherTools} selected={selectedOtherTools} onChange={setSelectedOtherTools} />
            </Question>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Section 5 of 5</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>What success looks like</h1>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">This decides what we build first. Each priority maps to a specific part of Aura - pick what would move the needle most for you.</p>

            <Question label="What are your top priorities?" hint="Select all that matter - the labels show what each one builds." required>
              <CheckboxGroupSub options={priorities} selected={selectedPriorities} onChange={setSelectedPriorities} />
            </Question>

            <Question label="If Aura worked perfectly, what would change in 90 days?" hint="Be concrete. 'More clients rebooking' is good. '15 reactivated clients a month at $400 each' is even better - it tells us exactly what to measure.">
              <textarea className={`${input} min-h-[100px] resize-y`} value={winDefinition} onChange={(e) => setWinDefinition(e.target.value)} placeholder="e.g. I want to stop losing Botox clients after one visit. If Aura could automatically flag everyone due for a touch-up and let me text them in one click, and I recovered even 10 clients a month, that pays for itself 20x over..." />
            </Question>

            <Question label="Monthly budget for this?">
              <RadioGroup name="budget" options={["Under $100/mo", "$100-$200/mo", "$200-$350/mo", "$350+/mo", "Flexible if it delivers"]} value={budget} onChange={setBudget} cols={3} />
            </Question>

            <Question label="How soon do you want to get going?">
              <RadioGroup name="timeline" options={["ASAP", "Within a month", "1-3 months", "Just exploring"]} value={timeline} onChange={setTimeline} />
            </Question>

            <Question label="Anything else we should know?">
              <textarea className={`${input} min-h-[80px] resize-y`} value={anythingElse} onChange={(e) => setAnythingElse(e.target.value)} placeholder="A feature you've always wished existed, something unique about how your spa runs, questions about Aura..." />
            </Question>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
          <button onClick={() => setStep((s) => s - 1)} className={`text-sm text-gray-500 hover:text-gray-800 transition-colors border-b border-gray-200 hover:border-gray-500 pb-0.5 ${step === 0 ? "invisible" : ""}`}>Back</button>
          <span className="text-xs text-gray-400">Step {step + 1} of {steps.length}</span>
          {step < steps.length - 1 ? (
            <button onClick={() => { if (canProceed()) setStep((s) => s + 1); }} className={`bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all ${!canProceed() ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}>Continue</button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-50">{submitting ? "Sending..." : "Submit"}</button>
          )}
        </div>
      </div>
    </>
  );
}
