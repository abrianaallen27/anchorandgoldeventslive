export default function Footer() {
  return (
    <footer className="bg-plum text-blush">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

        {/* Main 3-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Col 1 — Contact */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <p className="font-cinzel text-[8px] tracking-cinzel uppercase text-rose-gold">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <a
                href="mailto:hello@anchorandgoldevents.com"
                className="flex items-center gap-2 font-jost text-[13px] text-blush/70 hover:text-rose-gold transition-colors"
              >
                <img src="/images/icons/icon-email.svg" alt="" aria-hidden="true" className="w-[20px] h-[20px] flex-shrink-0" />
                hello@anchorandgoldevents.com
              </a>
              <a
                href="tel:4028198618"
                className="flex items-center gap-2 font-jost text-[13px] text-blush/70 hover:text-rose-gold transition-colors"
              >
                <img src="/images/icons/icon-phone.svg" alt="" aria-hidden="true" className="w-[20px] h-[20px] flex-shrink-0" />
                (402) 819-8618
              </a>
            </div>
          </div>

          {/* Col 2 — Logo + tagline */}
          <div className="flex flex-col items-center md:gap-4">
            <img
              src="/images/ag-mark-main-white.svg"
              alt="Anchor & Gold Events Co."
              className="h-14 w-auto mb-3 md:mb-0"
            />
            <p className="font-allura text-3xl text-rose-gold leading-none text-center mb-2 md:mb-0">
              Anchored Vision.<br className="md:hidden" /> Gold Standard.
            </p>
            <p className="font-jost text-[12px] text-blush/50 leading-relaxed text-center md:max-w-[200px]">
              Full-service event planning in Omaha, Nebraska.
            </p>
          </div>

          {/* Col 3 — Social */}
          <div className="flex flex-col gap-5 items-center md:items-end">
            <p className="font-cinzel text-[8px] tracking-cinzel uppercase text-rose-gold">
              Follow Along
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group"
              >
                <img src="/images/icons/icon-instagram.svg" alt="" aria-hidden="true" className="w-[22px] h-[22px]" />
                <span className="font-cinzel text-[7px] tracking-cinzel uppercase text-blush/50 group-hover:text-rose-gold transition-colors">
                  Instagram
                </span>
              </a>
              <a
                href="https://pinterest.com"
                aria-label="Pinterest"
                className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group"
              >
                <img src="/images/icons/icon-pinterest.svg" alt="" aria-hidden="true" className="w-[22px] h-[22px]" />
                <span className="font-cinzel text-[7px] tracking-cinzel uppercase text-blush/50 group-hover:text-rose-gold transition-colors">
                  Pinterest
                </span>
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity group"
              >
                <img src="/images/icons/icon-linkedin.svg" alt="" aria-hidden="true" className="w-[22px] h-[22px]" />
                <span className="font-cinzel text-[7px] tracking-cinzel uppercase text-blush/50 group-hover:text-rose-gold transition-colors">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blush/10 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-jost text-[10px] text-blush/30">
            © {new Date().getFullYear()} Anchor &amp; Gold Events Co. LLC · Omaha, Nebraska
          </p>
          <p className="font-jost text-[10px] text-blush/20">
            Privacy Policy &nbsp;·&nbsp; Terms of Use
          </p>
        </div>
      </div>
    </footer>
  )
}

