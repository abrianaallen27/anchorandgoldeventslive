import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

/* ── HERO ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative bg-blush min-h-[65vh] flex items-stretch overflow-hidden" aria-label="Hero">
      {/* Left */}
      <div className="flex flex-col justify-center w-full lg:w-[35%] px-8 sm:px-10 lg:px-12 xl:px-16 py-10 lg:py-12 z-10">
        <h1 className="font-cinzel-dec font-bold text-3xl sm:text-4xl xl:text-5xl leading-snug text-plum mb-2">
          The Anchor Your<br />Event Needs.
        </h1>
        <h2 className="font-allura text-4xl sm:text-5xl xl:text-6xl text-rose-gold mb-6">
          The Gold Standard It Deserves.
        </h2>
        <span className="block w-10 border-t border-rose-gold mb-7" aria-hidden="true" />
        <p className="font-jost text-[16px] leading-relaxed text-plum/80 mb-4 max-w-sm">
          Anchor &amp; Gold Events is a full-service event planning company built for clients who want their event done right — and done without the stress landing on them.
        </p>
        <p className="font-jost text-[16px] leading-relaxed text-plum/80 mb-6 max-w-sm">
          Whether you want a true planning partner or someone to take the reins entirely, I adjust to your style and hold every detail to a standard that speaks for itself.
        </p>
        <p className="font-cormorant italic text-lg text-plum mb-8">When you're ready, so am I.</p>
        <Link to="/contact" className="btn-plum self-start">
          Book a Consultation <ArrowRight />
        </Link>
        <p className="flex items-center gap-2 mt-7 font-jost text-[11px] text-plum/50">
          <PinIcon /> Serving Omaha, Nebraska and surrounding areas
        </p>
      </div>

      {/* Right image */}
      <div className="hidden lg:block absolute right-0 top-0 h-full w-[65%]" aria-hidden="true">
        <img
          src="/images/hero-rooftop.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blush via-blush/40 via-[16%] to-transparent to-[33%]" />
      </div>

      {/* Mobile bg */}
      <div className="absolute inset-0 -z-10 lg:hidden" aria-hidden="true">
        <img
          src="/images/hero-rooftop.png"
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>
    </section>
  )
}

/* ── EVENTS I'M BUILT FOR ──────────────────────────────────── */
const eventSlides = [
  { caption: 'Weddings',                                   src: '/images/Card 01 - Weddings.png' },
  { caption: 'Engagement Parties & Pre-Wedding Events',    src: '/images/Card 02 - Engagement Parties & Pre-Wedding Events.png' },
  { caption: 'Birthday Celebrations',                      src: '/images/Card 03 - Birthday Celebrations.png' },
  { caption: 'Kids & Teen Celebrations',                   src: '/images/Card 04 - Kids & Teen Celebrations.png' },
  { caption: 'Baby Showers',                               src: '/images/Card 05 - Baby Showers.png' },
  { caption: 'Retirement & Anniversary Celebrations',      src: '/images/Card 06 - Retirement & Anniversary Celebrations.png' },
  { caption: 'Holiday and Seasonal Parties',               src: '/images/Card 07 - Holiday and Seasonal Parties.png' },
  { caption: 'Galas and Fundraisers',                      src: '/images/Card 08 - Galas and Fundraisers.png' },
  { caption: 'Corporate Conferences and Gatherings',       src: '/images/Card 09 - Corporate Conferences and Gatherings.png' },
  { caption: 'Brand Launches and Grand Openings',          src: '/images/Card 10 - Brand Launches and Grand Openings.png' },
]

function EventsBuiltFor() {
  const [index, setIndex] = useState(0)
  const paused = useRef(false)

  const total = eventSlides.length
  const prev = () => setIndex((i) => (i - 3 + total) % total)
  const next = () => setIndex((i) => (i + 3) % total)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 3) % total)
    }, 5000)
    return () => clearInterval(id)
  }, [total])

  // visible window: show up to 3 cards, wrapping around
  const visible = [0, 1, 2].map((offset) => eventSlides[(index + offset) % total])

  return (
    <section className="bg-plum py-16 px-2" aria-labelledby="events-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 id="events-heading" className="font-cinzel text-xs tracking-cinzel uppercase text-blush mb-1">
            Events I'm Built For
          </h2>
          <span className="block mx-auto mt-2 mb-4 w-10 border-t border-rose-gold" aria-hidden="true" />
          <p className="font-cormorant italic text-2xl text-rose-gold">
            Big moments. Tiny Details. I'm equally obsessed with both.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative flex items-center gap-4"
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false }}
        >
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous event type"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-blush/30 text-blush/60 hover:border-rose-gold hover:text-rose-gold transition-colors"
          >
            ←
          </button>

          {/* Cards */}
          <div key={index} className="carousel-fade flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
            {visible.map((slide, i) => (
              <div
                key={`${slide.caption}-${i}`}
                className="flex flex-col"
              >
                {/* Image / placeholder */}
                {slide.src ? (
                  <img
                    src={slide.src}
                    alt={slide.caption}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-plum border border-blush/10 flex flex-col items-center justify-center gap-3">
                    <img
                      src="/images/ag-mark-rose.svg"
                      alt=""
                      aria-hidden="true"
                      className="w-12 h-12 opacity-40"
                    />
                    <span className="font-cinzel text-[8px] tracking-cinzel uppercase text-blush/30">
                      Image coming soon
                    </span>
                  </div>
                )}
                {/* Caption */}
                <div className="border border-blush/10 border-t-0 px-4 py-3 text-center">
                  <p className="font-cinzel text-[13px] tracking-cinzel uppercase text-blush/80">
                    {slide.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next event type"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-blush/30 text-blush/60 hover:border-rose-gold hover:text-rose-gold transition-colors"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-7" role="tablist">
          {eventSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                i === index ? 'bg-rose-gold' : 'bg-blush/25 hover:bg-blush/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── SIGNATURE SERVICES ───────��────────────────────────────── */
const services = [
  {
    title: 'Full-Service Event Planning',
    icon: <ClipboardIcon />,
    body: 'This is for the client who wants full coverage support from start to finish. I guide the vision, build the timeline, manage vendors, oversee logistics, and lead your event day — all while keeping your budget on track. Whether you want a true collaborative partner or someone to simply take the reins, I adjust to your style and bring the same level of care and accountability either way. You get a plan, a partner, and execution you can trust.',
  },
  {
    title: 'Event Vision & Experience Development',
    icon: <LightbulbIcon />,
    body: 'I help you build, shape, and refine your direction so every detail connects with clarity and purpose. From guest flow to aesthetic direction, I translate bold vision into a clear plan vendors can execute confidently.',
  },
  {
    title: 'Vendor Sourcing & Management',
    icon: <VendorIcon />,
    body: 'I identify, vet, and coordinate the right partners for your event. From contracts to communication, I make sure every vendor understands the expectations, delivers at the level required, and fits within your budget.',
  },
  {
    title: 'Event Management & Day-Of Coordination',
    icon: <CalendarIcon />,
    body: 'For clients who have planned their event but want professional leadership to run it with clarity and control. I step in to create or refine timelines, confirm vendor details, align logistics, and manage execution so everything unfolds smoothly.',
  },
  {
    title: 'Custom Event Support',
    icon: <StarIcon />,
    body: "Some events don't fit neatly into a category. And they don't have to. If your needs require a tailored blend of planning, coordination, and execution, I'll build a scope that meets you exactly where you are.",
  },
]

function SignatureServices() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-plum py-20 px-6" aria-labelledby="services-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="font-cinzel text-xs tracking-cinzel uppercase text-blush mb-1">
            Signature Services
          </h2>
          <span className="block mx-auto mt-2 mb-4 w-10 border-t border-rose-gold" aria-hidden="true" />
          <p className="font-cormorant italic text-2xl text-blush/60">
            Here's how I can help.
          </p>
        </div>

        <div className="border-t border-blush/10">
          {services.map((svc, i) => {
            const isOpen = open === i
            return (
              <div key={svc.title} className="border-b border-blush/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-center gap-6 px-6 py-5 text-left transition-colors duration-200 group ${isOpen ? 'bg-blush/5' : 'hover:bg-blush/5'}`}
                >
                  {/* Left accent bar */}
                  <span className={`flex-shrink-0 w-0.5 h-8 transition-colors duration-200 ${isOpen ? 'bg-rose-gold' : 'bg-blush/20 group-hover:bg-rose-gold/50'}`} aria-hidden="true" />
                  {/* Icon */}
                  <span className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-rose-gold' : 'text-blush/40 group-hover:text-rose-gold/70'}`}>
                    {svc.icon}
                  </span>
                  {/* Title */}
                  <span className={`flex-1 font-cinzel text-[15px] tracking-cinzel uppercase transition-colors duration-200 ${isOpen ? 'text-rose-gold' : 'text-blush/80 group-hover:text-blush'}`}>
                    {svc.title}
                  </span>
                  {/* Chevron */}
                  <span className={`flex-shrink-0 text-blush/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-rose-gold' : ''}`} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>

                {/* Expandable body */}
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
                  <p className="font-jost text-[15px] leading-relaxed text-blush/60 px-5 sm:px-6 pb-6 pt-1 sm:pl-[4.5rem]">
                    {svc.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/contact" className="btn-outline-blush inline-flex">
            Book a Consultation <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ClipboardIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="15" x2="12" y2="15" /></svg>
}
function LightbulbIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21h6M10 17h4M12 3a6 6 0 016 6c0 2.5-1.5 4.5-3 5.5V17H9v-2.5C7.5 13.5 6 11.5 6 9a6 6 0 016-6z" /></svg>
}
function VendorIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M3 21v-2a5 5 0 015-5h4a5 5 0 015 5v2M19 11a3 3 0 012 2.83V21" /></svg>
}
function CalendarIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><rect x="7" y="14" width="3" height="3" rx="0.5" /><rect x="14" y="14" width="3" height="3" rx="0.5" /></svg>
}
function StarIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
}

/* ─�� HOW IT WORKS ───────────────────────────��──────────────── */
const steps = [
  {
    num: '01',
    title: 'Initial Consultation',
    body: `We start with a conversation — no pressure, no commitment. You share your vision, your questions, and what you're hoping to feel on event day. I listen, ask the right questions, and get a clear picture of what you need. This is where we figure out if we're the right fit.`,
  },
  {
    num: '02',
    title: 'Proposal & Agreement',
    body: `I'll put together a clear scope of work that outlines exactly what I'll handle, how I'll handle it, and what it will cost. This is our time to agree on clear expectations for services, communication, and payments.`,
  },
  {
    num: '03',
    title: "Let's Make It Official",
    body: "Once you've signed and your initial payment is confirmed, you're on my calendar and we are in motion. We'll establish a check-in cadence that works for you.",
  },
  {
    num: '04',
    title: 'Planning, Design & Progress Updates',
    body: "I'll build your timeline, source and manage vendors, shape the experience, and keep you informed every step of the way. You'll always have visibility into where things stand.",
  },
  {
    num: '05',
    title: 'Final Confirmation',
    body: "Vendors are confirmed, timelines are finalized, and every detail is accounted for. We'll do a virtual final check-in and in-person walkthrough where applicable. You'll go into event day knowing nothing has been left to chance.",
  },
  {
    num: '06',
    title: 'Event Day',
    body: "This is your moment. I'm on the ground managing every moving part so you don't have to think about a single one. Show up, be present, and enjoy what you've been looking forward to.",
  },
  {
    num: '07',
    title: 'Post-Event Wrap-Up',
    body: "When the last guest leaves, my job isn't quite done. I'll help tie up any loose ends and make sure everything ends as cleanly as it began.",
  },
]

function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section className="bg-plum py-20 px-6" aria-labelledby="process-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 id="process-heading" className="font-cinzel text-xs tracking-cinzel uppercase text-blush mb-1">
            So You Reach Out to Me...
          </h2>
          <p className="font-allura text-4xl text-rose-gold mt-1">then what?</p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:grid md:grid-cols-7 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex flex-col items-center text-center cursor-pointer group"
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Circle */}
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-3 transition-colors duration-200 ${
                activeStep === i ? 'bg-rose-gold border-rose-gold' : 'border-rose-gold/60 bg-transparent'
              }`}>
                <span className="font-cinzel text-[9px] text-blush">{step.num}</span>
              </div>
              {/* Title */}
              <h3 className={`font-cinzel text-[9px] tracking-cinzel uppercase leading-snug mb-2 transition-colors duration-200 ${
                activeStep === i ? 'text-rose-gold' : 'text-blush'
              }`}>
                {step.title}
              </h3>
              {/* Body — visible on hover */}
              <p className={`font-jost text-[10px] text-blush/60 leading-relaxed transition-all duration-300 overflow-hidden ${
                activeStep === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col gap-3">
          {steps.map((step, i) => (
            <div key={step.num} className="border border-blush/20">
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                aria-expanded={activeStep === i}
              >
                <span className="w-8 h-8 rounded-full border border-rose-gold/60 flex items-center justify-center flex-shrink-0">
                  <span className="font-cinzel text-[8px] text-blush">{step.num}</span>
                </span>
                <span className="font-cinzel text-[9px] tracking-cinzel uppercase text-blush flex-1">{step.title}</span>
                <span className={`text-rose-gold transition-transform duration-200 ${activeStep === i ? 'rotate-180' : ''}`}>↓</span>
              </button>
              {activeStep === i && (
                <div className="px-5 pb-5">
                  <p className="font-jost text-[15px] text-blush/60 leading-relaxed">{step.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── EVENT INSPIRATION ─────────────────────────────────────── */
const galleryImages = [
  { src: '/images/gallery/Elegant Dinner Toast Image.png', alt: 'Elegant dinner toast' },
  { src: '/images/gallery/Romance Table Setting.png', alt: 'Romance table setting' },
  { src: '/images/gallery/Luxe Birthday.png', alt: 'Luxe birthday celebration' },
  { src: "/images/gallery/Mother_s Day Brunch_Blush.png", alt: "Mother's Day brunch" },
  { src: '/images/gallery/Barbie Birthday Party.png', alt: 'Barbie birthday party' },
  { src: '/images/gallery/Little Cutie Baby Shower Dessert Table.png', alt: 'Baby shower dessert table' },
]

function EventInspiration() {
  return (
    <section className="bg-blush py-20 px-6" aria-labelledby="inspiration-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 id="inspiration-heading" className="font-cinzel text-xs tracking-cinzel uppercase text-plum">Event Inspiration</h2>
          <span className="block mx-auto mt-2 mb-5 w-10 border-t border-rose-gold" aria-hidden="true" />
          <p className="font-cormorant text-lg text-plum/70 max-w-md mx-auto">
            A mood board of aesthetics and details inspiring the events I love to bring to life.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((img) => (
            <div key={img.src} className="aspect-[4/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline-plum">
            See My Services <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT TEASER ────────────────────────────────────────── */
function ContactTeaser() {
  return (
    <section className="relative bg-plum py-24 px-6 overflow-hidden" aria-labelledby="teaser-heading">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <img src="/images/gallery/Elegant Dinner Toast Image.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <h2 id="teaser-heading" className="font-cormorant text-5xl font-light text-blush mb-4">Let's Talk.</h2>
          <p className="font-jost text-[16px] text-blush/70 max-w-sm leading-relaxed">
            No polished plan required. Whether you have every detail mapped out or you're starting with a single idea, tell me what matters most and we'll build from there.
          </p>
        </div>
        <Link to="/contact" className="btn-outline-blush flex-shrink-0">
          Book a Consultation <ArrowRight />
        </Link>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ──────────────────────────────────────────── */
const testimonials = [
  {
    quote: "If you are looking for a planner that will pay close attention to detail and stay within your budget without compromising the vision, then Abriana is the planner for you. I was her first client almost a decade ago, and I still think about how smoothly my wedding day ran. I felt supported every single step of the way and never had to worry.",
    name: 'Tangie G.',
    img: '/images/testimonials/Tangie G.jpg',
  },
  {
    quote: "We had to part ways with a different planner about 60 days before our wedding, and I was PANICKED. Abriana jumped in without a second thought and helped pull off the celebration I envisioned. Her quick thinking and thoughtful coordination of vendors and timeline turned a stressful situation into a beautiful and seamless celebration.",
    name: 'Fai T.',
    img: '/images/testimonials/Fai T.jpg',
  },
  {
    quote: "Abriana really has an eye and mind for creative details, and I love how quickly she brought a couple of last minute details to life to round out our big day.",
    name: 'Jade G.',
    img: '/images/testimonials/Jade G.jpeg',
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-blush py-20 px-6" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="font-cinzel text-xs tracking-cinzel uppercase text-plum">What Clients Are Saying</h2>
          <span className="block mx-auto mt-2 mb-0 w-10 border-t border-rose-gold" aria-hidden="true" />
        </div>

        {/* Desktop — 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col gap-5 bg-blush border border-soft-mauve/40 p-8">
              <span className="font-allura text-6xl text-rose-gold/40 leading-none select-none" aria-hidden="true">"</span>
              <p className="font-jost text-[15px] leading-relaxed text-plum/80 flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-2">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover" />
                <span className="font-cormorant italic text-sm text-plum/60">— {t.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — single card with dots */}
        <div className="md:hidden">
          <div className="flex flex-col gap-5 border border-soft-mauve/40 p-8">
            <span className="font-allura text-6xl text-rose-gold/40 leading-none select-none" aria-hidden="true">"</span>
            <p className="font-jost text-[16px] leading-relaxed text-plum/80">"{testimonials[active].quote}"</p>
            <div className="flex items-center gap-3">
              <img src={testimonials[active].img} alt={testimonials[active].name} className="w-20 h-20 rounded-full object-cover" />
              <span className="font-cormorant italic text-sm text-plum/60">— {testimonials[active].name}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)} aria-label="Previous" className="text-plum/40 hover:text-plum">←</button>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-rose-gold' : 'bg-plum/20'}`} />
            ))}
            <button onClick={() => setActive((a) => (a + 1) % testimonials.length)} aria-label="Next" className="text-plum/40 hover:text-plum">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Shared icons ──────────────────────────────────────────── */
function ArrowRight() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
}
function PinIcon() {
  return <svg className="w-3.5 h-3.5 text-rose-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.314-2.686-6-6-6z" /><circle cx="12" cy="8" r="2" strokeWidth={1.5} /></svg>
}

/* ── PAGE ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <EventsBuiltFor />
      <SignatureServices />
      <HowItWorks />
      <EventInspiration />
      <ContactTeaser />
      <Testimonials />
    </>
  )
}
