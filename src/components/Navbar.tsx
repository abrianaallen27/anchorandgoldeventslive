import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { label: 'Home',               to: '/',            end: true  },
  { label: 'About',              to: '/about',       end: false },
  { label: 'Packages & Pricing', to: '/packages',    end: false },
  { label: 'Event Inspiration',  to: '/inspiration', end: false },
  { label: 'Contact',            to: '/contact',     end: false },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 80) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`ag-nav sticky top-0 z-50 border-b border-soft-mauve/40${scrolled ? ' scrolled' : ''}`}>
      <nav
        className="ag-nav-inner w-full pl-0 pr-6 lg:pr-12 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" aria-label="Anchor & Gold Events Co. — Home">
          <img
            src="/images/ag-logo-main.svg"
            alt="Anchor & Gold Events Co."
            className="ag-nav-logo-img w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden xl:flex flex-1 items-center justify-center" role="list">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `ag-nav-link font-cinzel text-[13px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-rose-gold border-b border-rose-gold pb-0.5'
                      : 'text-plum hover:text-rose-gold'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Book CTA */}
        <Link
          to="/contact"
          className="ag-nav-cta hidden xl:inline-flex items-center gap-2 bg-plum text-blush font-cinzel text-[10px] tracking-[0.1em] uppercase hover:bg-plum/80 transition-colors duration-200 flex-shrink-0"
        >
          Book a Consultation
        </Link>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden flex flex-col gap-1.5 p-2 ml-auto"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-px bg-plum transition-transform duration-200 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-px bg-plum transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-plum transition-transform duration-200 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-blush border-t border-soft-mauve/40 px-6 pb-8">
          <ul className="flex flex-col gap-5 pt-6" role="list">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `font-cinzel text-xs tracking-cinzel uppercase transition-colors ${
                      isActive ? 'text-rose-gold' : 'text-plum hover:text-rose-gold'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/contact"
                className="btn-plum w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Book a Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
