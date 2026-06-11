import { useState, type FormEvent, type ChangeEvent } from 'react'

const eventTypes = [
  'Wedding',
  'Engagement Party',
  'Bridal Shower',
  'Rehearsal Dinner',
  'Birthday Celebration',
  'Anniversary Party',
  'Retirement Celebration',
  'Graduation Celebration',
  'Family Reunion',
  'Corporate Conference or Retreat',
  'Team or Company Event',
  'Client Appreciation Event',
  'Nonprofit Gala or Fundraiser',
  'Brand Launch or Experiential Event',
  'Holiday or Seasonal Event',
  'Baby Shower',
  "Other — I'll share details in my message",
]

const packageOptions = [
  'The Anchor (Day-Of Coordination)',
  'The Anchor & Gold (Partial Planning)',
  'The Gold Standard (Full-Service Planning)',
  'The Vision & Compass (Vision & Experience Development)',
  'The Golden Anchor (Custom Event Support)',
  'Not sure yet — open to recommendations',
]

const guestCounts = [
  'Fewer than 25',
  '25–50',
  '51–100',
  '101–150',
  '151–250',
  '250+',
  'Not sure yet',
]

type Path = 'schedule' | 'reach'

interface FormState {
  firstName:     string
  lastName:      string
  email:         string
  phone:         string
  eventDate:     string
  eventType:     string
  guestCount:    string
  packageChoice: string
  message:       string
}

const empty: FormState = {
  firstName: '', lastName: '', email: '', phone: '',
  eventDate: '', eventType: '', guestCount: '', packageChoice: '', message: '',
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty)
  const [path, setPath] = useState<Path>('schedule')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name:     `${form.firstName} ${form.lastName}`,
          from_email:    form.email,
          phone:         form.phone,
          event_date:    form.eventDate,
          event_type:    form.eventType,
          guest_count:    form.guestCount,
          package_choice: form.packageChoice,
          message:        form.message,
          preferred_path: path === 'schedule'
            ? 'Schedule a consultation (will book via Calendly)'
            : 'Just reach out — prefers email follow-up',
        }),
      })

      const data = await res.json() as { success: boolean }
      if (!data.success) throw new Error('send failed')

      setStatus('success')
      if (path === 'schedule') {
        setTimeout(() => {
          window.open(
            'https://calendly.com/anchorandgoldevents/anchor-gold-events-initial-consultation',
            '_blank',
          )
        }, 1500)
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="bg-blush">
      {/* Header */}
      <section className="bg-plum py-20 px-6 text-center">
        <h1 className="font-cinzel text-xs tracking-cinzel uppercase text-blush mb-1">
          I'm Ready When You Are.
        </h1>
        <span className="block mx-auto mt-2 mb-6 w-10 border-t border-rose-gold" aria-hidden="true" />
        <p className="font-cormorant italic text-xl text-blush/70 max-w-lg mx-auto">
          You don't have to have it all figured out to reach out. Full vision, a starting point, or
          somewhere in between — tell me what matters most and we'll build from there.
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {status === 'success' ? (
            <ThankYou path={path} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <h2 className="font-cinzel font-bold text-[13px] tracking-cinzel uppercase text-plum">
                What Are We Planning?
              </h2>
              <p className="font-jost text-[16px] text-plum/85 -mt-3">
                No polished plan required. Fill out the form below and I'll be in touch within 24–48 hours.
              </p>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" name="firstName" type="text" required placeholder="First name" value={form.firstName} onChange={update} />
                <Field label="Last Name"  name="lastName"  type="text" required placeholder="Last name"  value={form.lastName}  onChange={update} />
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email Address" name="email" type="email" required placeholder="email@example.com"  value={form.email} onChange={update} />
                <Field label="Phone Number"  name="phone" type="tel"   required placeholder="(000) 000-0000"     value={form.phone} onChange={update} />
              </div>

              {/* Event date */}
              <div>
                <label htmlFor="eventDate" className="field-label">
                  Event Date <span className="text-rose-gold">*</span>
                </label>
                <input
                  id="eventDate" name="eventDate" type="text" required
                  placeholder="MM/DD/YYYY — or your best estimate"
                  className="field-input"
                  value={form.eventDate}
                  onChange={update}
                />
                <p className="font-jost text-[14px] text-plum/65 mt-1">
                  Not sure yet? Give us your best estimate — we can nail down the details on our call.
                </p>
              </div>

              {/* Event type */}
              <div>
                <label htmlFor="eventType" className="field-label">
                  Event Type <span className="text-rose-gold">*</span>
                </label>
                <select
                  id="eventType" name="eventType" required
                  className="field-input"
                  value={form.eventType}
                  onChange={update}
                >
                  <option value="">Select one…</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {form.eventType.startsWith('Other') && (
                  <p className="font-jost text-[15px] text-rose-gold mt-1">
                    Feel free to describe your event in the message field below.
                  </p>
                )}
              </div>

              {/* Guest count */}
              <div>
                <label htmlFor="guestCount" className="field-label">
                  Estimated Guest Count <span className="text-rose-gold">*</span>
                </label>
                <select
                  id="guestCount" name="guestCount" required
                  className="field-input"
                  value={form.guestCount}
                  onChange={update}
                >
                  <option value="">Select one…</option>
                  {guestCounts.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* Package preference */}
              <div>
                <label htmlFor="packageChoice" className="field-label">
                  Do You Have an Event Package in Mind?
                </label>
                <select
                  id="packageChoice" name="packageChoice"
                  className="field-input"
                  value={form.packageChoice}
                  onChange={update}
                >
                  <option value="">Select one…</option>
                  {packageOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="field-label">
                  Tell Me About Your Event <span className="text-rose-gold">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={5}
                  placeholder="What are you envisioning? Feel free to share as much or as little as you'd like — we'll get into the details on our call."
                  className="field-input resize-none"
                  value={form.message}
                  onChange={update}
                />
              </div>

              {/* Path preference */}
              <fieldset className="border border-soft-mauve/40 p-5">
                <legend className="font-cinzel font-bold text-[13px] tracking-cinzel uppercase text-plum px-2">
                  After submitting, what would you prefer?
                </legend>
                <div className="flex flex-col gap-3 mt-3">
                  {([
                    ['schedule', "Schedule a consultation now — I'll direct you to my scheduling link so you can book a time that works for you."],
                    ['reach',    "Just reach out for now — I'll follow up within 24–48 hours to connect via email."],
                  ] as [Path, string][]).map(([val, label]) => (
                    <label key={val} className="flex items-start gap-3 cursor-pointer">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${path === val ? 'border-plum' : 'border-plum/30'}`}>
                        {path === val && <div className="w-2 h-2 rounded-full bg-plum" />}
                      </div>
                      <input type="radio" name="path" value={val} checked={path === val} onChange={() => setPath(val)} className="sr-only" required />
                      <span className="font-jost text-[15px] text-plum/90 leading-relaxed">{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Error banner */}
              {status === 'error' && (
                <div className="border border-rose-gold/60 bg-rose-gold/10 px-5 py-4">
                  <p className="font-jost text-[15px] text-plum">
                    Something went wrong sending your message. Please email{' '}
                    <a href="mailto:hello@anchorandgoldevents.com" className="underline">
                      hello@anchorandgoldevents.com
                    </a>{' '}
                    directly.
                  </p>
                </div>
              )}

              {/* Privacy note */}
              <p className="font-jost text-[14px] text-plum/65">
                By submitting this form, you'll receive a response from Abriana within 24–48 hours.
                Your information will never be shared with third parties.
              </p>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-plum self-start disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? 'Sending…'
                  : path === 'schedule'
                    ? 'Submit & Schedule My Consultation'
                    : 'Send My Message'}
                {status !== 'sending' && <ArrowRight />}
              </button>
            </form>
          )}

          {/* Direct contact */}
          <div className="mt-12 pt-10 border-t border-soft-mauve/40">
            <p className="font-cinzel text-[13px] tracking-cinzel uppercase text-plum/80 mb-5">Or reach out directly</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@anchorandgoldevents.com" className="flex items-center gap-2 font-jost text-[16px] text-plum/70 hover:text-rose-gold transition-colors">
                <MailIcon /> hello@anchorandgoldevents.com
              </a>
              <a href="tel:4028198618" className="flex items-center gap-2 font-jost text-[16px] text-plum/70 hover:text-rose-gold transition-colors">
                <PhoneIcon /> (402) 819-8618
              </a>
            </div>
            <p className="font-jost text-[15px] text-plum/65 mt-4">
              I respond to all inquiries within 24–48 hours.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ── Thank-you screen ──────────────────────────────────────── */
function ThankYou({ path }: { path: Path }) {
  return (
    <div className="text-center py-8">
      <span className="font-allura text-6xl text-rose-gold block mb-6">Thank you.</span>
      <p className="font-cormorant text-xl text-plum mb-4">I'm glad you're here.</p>
      {path === 'schedule' ? (
        <>
          <p className="font-jost text-[16px] text-plum/70 max-w-sm mx-auto mb-8 leading-relaxed">
            Please use the link below to book your consultation at a time that works for you.
            I'll be in touch within 24–48 hours to confirm receipt of your details.
          </p>
          <a
            href="https://calendly.com/anchorandgoldevents/anchor-gold-events-initial-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-plum"
          >
            Book Your Consultation <ArrowRight />
          </a>
        </>
      ) : (
        <p className="font-jost text-[16px] text-plum/70 max-w-sm mx-auto leading-relaxed">
          I've received your details and will be in touch within 24–48 hours. In the meantime,
          feel free to email me directly at{' '}
          <a href="mailto:hello@anchorandgoldevents.com" className="text-rose-gold hover:text-plum transition-colors">
            hello@anchorandgoldevents.com
          </a>.
        </p>
      )}
      <p className="font-cormorant italic text-plum/50 mt-8">— Abriana</p>
    </div>
  )
}

/* ── Reusable field ────────────────────────────────────────── */
function Field({
  label, name, type, required, placeholder, value, onChange,
}: {
  label: string; name: string; type: string; required?: boolean
  placeholder?: string; value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}{required && <span className="text-rose-gold ml-1">*</span>}
      </label>
      <input
        id={name} name={name} type={type} required={required}
        placeholder={placeholder} className="field-input"
        value={value} onChange={onChange}
      />
    </div>
  )
}

/* ── Icons ─────────────────────────────────────────────────── */
function ArrowRight() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
}
function MailIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="flex-shrink-0" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
}
function PhoneIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="flex-shrink-0" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
}
