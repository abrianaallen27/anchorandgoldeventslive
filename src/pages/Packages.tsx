import { Link } from 'react-router-dom'
import { useState } from 'react'

const packages = [
  {
    name: 'The Anchor',
    subtitle: 'Event Management & Day-Of Coordination',
    price: 'Starting at $1,500',
    description: 'For the client who has planned their event and needs a steady, professional hand to execute it flawlessly. I step in to refine your timeline, confirm every vendor, align all logistics, and lead your event day from start to finish — so you can be fully present for the moments that matter.',
    included: '12–15 hours of service covering the final 4–6 weeks and full event day management (up to 8 hours on-site), timeline creation and refinement, vendor confirmation calls, rehearsal attendance, and one pre-event walkthrough.',
    moves: 'Guest count over 100 · Multiple venues or locations · Event day beyond 8 hours · Additional coordinator needed · Complex vendor logistics',
  },
  {
    name: 'The Anchor & Gold',
    subtitle: 'Partial Planning',
    price: 'Starting at $2,750',
    description: "The best of both worlds — you've started the process, and now you want a partner to help you finish it right. I come in 3–6 months out, assess what's in place, source what's missing, sharpen the vision, and carry it through to a seamlessly executed event day.",
    included: '20–25 hours of service covering vendor sourcing and management (up to 5 vendors), design direction, timeline development, planning check-ins, and full event day management.',
    moves: 'Guest count over 100 · More than 5 vendors to source · Extended planning timeline · Design complexity · Rehearsal dinner or secondary event coordination',
  },
  {
    name: 'The Gold Standard',
    subtitle: 'Full-Service Event Planning',
    price: 'Starting at $5,500',
    featured: true,
    description: 'This is the full experience — start to finish, vision to execution. I guide the concept, build the plan, manage every vendor and moving part, and lead your event day with the same level of care and accountability I bring to every detail.',
    included: '40–50 hours of service covering complete planning from first conversation through post-event wrap-up, vendor sourcing and management, budget tracking, timeline and logistics development, and full event day leadership. Based on a standard event up to 75 guests, single venue, Omaha metro.',
    moves: '76–150 guests ($6,500+) · 151–250 guests ($8,500+) · Multiple events within the engagement · Production or design intensity · Extended planning timeline · Travel outside the Omaha metro',
  },
  {
    name: 'The Vision & Compass',
    subtitle: 'Event Vision & Experience Development',
    price: 'Starting at $1,200',
    description: "You bring the vision. I bring the compass. Together we shape and refine your direction so every detail connects with clarity and purpose — from guest flow to aesthetic alignment.",
    included: '8–12 hours covering concept development, aesthetic direction, guest experience mapping, and a fully documented plan your vendors can work from.',
    moves: 'Revision rounds beyond two · Complex or multi-layered vision · Scope of vendor briefing materials · Integration with ongoing planning support',
  },
  {
    name: 'The Golden Anchor',
    subtitle: 'Custom Event Support',
    price: 'Starting at $750',
    description: [
      "Your event. Your people. Your moment. Some celebrations don't fit neatly into a category — and they don't have to. Whether it's a community fundraiser, a privately hosted celebration, or something entirely your own, I'll build a scope that meets you exactly where you are and holds everything to the same gold standard.",
      "Birthdays, baby showers, bridal showers, graduation parties, engagement parties, themed gatherings — if you're hosting at home and want the experience to feel effortless and intentional, I can help with everything from décor and tablescape design to vendor sourcing, rental coordination, catering, party favors, and more. You focus on your guests. I'll handle the rest.",
    ],
    included: 'Scoped in full following your initial consultation. No assumptions, no surprises — just a clear agreement built around your actual event.',
    moves: 'Everything is determined together. Typical social event full planning ranges from $1,500–$2,250+ depending on guest count, design intensity, and vendor coordination needs.',
  },
]

const addOns = [
  { service: 'Rehearsal dinner or next-day event coordination', price: '$400' },
  { service: 'Additional on-site coordinator', price: '$250 per event' },
  { service: 'Hourly consulting (standalone, 3-hour minimum)', price: '$125/hr' },
  { service: 'Rush booking (within 60 days of event)', price: '$150/hr' },
  { service: 'Extended event day hours (beyond package baseline)', price: '$125/hr' },
]

function PackageCard({ pkg }: { pkg: typeof packages[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border ${pkg.featured ? 'border-rose-gold' : 'border-blush/20'} bg-plum`}>
      {pkg.featured && (
        <p className="bg-rose-gold px-6 py-2 text-center font-cinzel text-[10px] tracking-cinzel uppercase text-blush">
          Signature Package
        </p>
      )}
      <div className="p-6 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="font-cinzel text-sm tracking-cinzel uppercase text-blush">{pkg.name}</h2>
            <p className="font-cormorant italic text-xl text-rose-gold mt-1">{pkg.subtitle}</p>
          </div>
          <span className="font-cormorant text-2xl text-blush sm:flex-shrink-0">{pkg.price}</span>
        </div>

        <div className="font-jost text-base leading-relaxed text-blush/75 mb-6 space-y-3">
          {(Array.isArray(pkg.description) ? pkg.description : [pkg.description]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 font-cinzel text-xs tracking-cinzel uppercase text-rose-gold hover:text-blush transition-colors min-h-[44px]"
          aria-expanded={open}
        >
          {open ? 'Hide Details' : 'View Details'}
          <svg className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="mt-5 pt-5 border-t border-blush/10 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-cinzel text-xs tracking-cinzel uppercase text-rose-gold mb-3">What's Included</h3>
              <p className="font-jost text-base leading-relaxed text-blush/60">{pkg.included}</p>
            </div>
            <div>
              <h3 className="font-cinzel text-xs tracking-cinzel uppercase text-rose-gold mb-3">What Moves the Price</h3>
              <p className="font-jost text-base leading-relaxed text-blush/60">{pkg.moves}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Strip({ src, side }: { src: string; side: 'left' | 'right' }) {
  return (
    <div className={`hidden lg:block absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} w-72`} aria-hidden="true">
      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
    </div>
  )
}

export default function Packages() {
  return (
    <main className="bg-blush">

      {/* Header */}
      <section className="bg-plum py-12 md:py-20 px-4 md:px-6 text-center">
        <h1 className="font-cinzel text-lg md:text-xl tracking-cinzel uppercase text-blush mb-1">Packages &amp; Pricing</h1>
        <span className="block mx-auto mt-2 mb-6 w-10 border-t border-rose-gold" aria-hidden="true" />
        <p className="font-cormorant italic text-2xl md:text-3xl text-blush/70 max-w-md mx-auto">
          Flexible support for events of all sizes and styles.
        </p>
      </section>

      {/* Packages */}
      <section aria-label="Service packages" className="relative overflow-hidden py-12 md:py-16">
        <Strip src="/images/pkg-strip-left.png" side="left" />
        <Strip src="/images/pkg-strip-right.png" side="right" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 flex flex-col gap-6">
          <div className="text-center">
            <Link to="/contact" className="btn-plum">Let's Get Started <ArrowRight /></Link>
          </div>
          {packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
          <div className="text-center">
            <Link to="/contact" className="btn-plum">Let's Get Started <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section aria-labelledby="addons-heading" className="bg-plum relative overflow-hidden py-12 md:py-16">
        <Strip src="/images/addon-strip-left.png" side="left" />
        <Strip src="/images/addon-strip-right.png" side="right" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10">
          <h2 id="addons-heading" className="font-cinzel text-sm tracking-cinzel uppercase text-blush mb-2 text-center">Add-Ons</h2>
          <p className="font-cormorant italic text-xl text-center text-blush/60 mb-8">Available with any package.</p>

          <div className="border border-blush/20 overflow-hidden mb-12">
            {addOns.map((item, i) => (
              <div
                key={item.service}
                className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 md:px-6 py-4 ${i % 2 === 0 ? 'bg-plum' : 'bg-plum/80'}`}
              >
                <span className="font-jost text-base text-blush/80">{item.service}</span>
                <span className="font-cormorant text-lg text-rose-gold">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Travel & Away Events',
                body: 'Anchor & Gold is based in Omaha, Nebraska. For events outside the metro, travel and accommodation costs are quoted individually. Have your heart set on a venue outside Omaha? Reach out — we\'ll make it work.',
              },
              {
                title: 'Transparency Is Part of the Standard',
                body: 'Every package comes with a clearly defined scope so you always know what\'s included, what\'s not, and what would change your investment. Change orders are always discussed before they\'re applied.',
              },
              {
                title: 'A Note on Vendor Relationships',
                body: 'Anchor & Gold does not accept commissions or undisclosed markups from vendors. Any preferred vendor relationship will always be disclosed to you directly. Your trust is the foundation this business is built on.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-blush border border-rose-gold/40 p-6">
                <h3 className="font-cinzel text-xs tracking-cinzel uppercase text-plum mb-3">{item.title}</h3>
                <span className="block w-6 border-t border-rose-gold mb-4" aria-hidden="true" />
                <p className="font-jost text-base leading-relaxed text-plum/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blush py-12 md:py-16 px-4 md:px-6 text-center">
        <p className="font-cormorant italic text-2xl md:text-3xl text-plum mb-3">Not sure which package fits?</p>
        <p className="font-jost text-base text-plum/60 mb-8 max-w-sm mx-auto">That's what the consultation is for. Reach out and we'll figure it out together.</p>
        <Link to="/contact" className="btn-plum">Book a Consultation <ArrowRight /></Link>
      </section>

    </main>
  )
}

function ArrowRight() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
}
