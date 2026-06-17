import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ag-intro-shown'

export default function Preloader() {
  const [mounted, setMounted] = useState(() => !sessionStorage.getItem(STORAGE_KEY))
  const [logoIn, setLogoIn] = useState(false)
  const [dotCount, setDotCount] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (!mounted) return
    const t1 = setTimeout(() => setLogoIn(true), 150)
    const t2 = setTimeout(() => setDotCount(1), 1000)
    const t3 = setTimeout(() => setDotCount(2), 2000)
    const t4 = setTimeout(() => setDotCount(3), 3000)
    const t5 = setTimeout(() => setDotCount(4), 4000)
    const t6 = setTimeout(() => setDotCount(5), 5000)
    const t7 = setTimeout(() => setFadingOut(true), 6000)
    const t8 = setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setMounted(false)
    }, 6600)
    return () => { [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout) }
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#F0E2E5] flex items-center justify-center transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        className={`flex flex-col items-center gap-7 transition-all duration-700 ease-out ${
          logoIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <img
          src="/images/ag-logo-main-tight.png"
          alt="Anchor & Gold Events Co."
          className="w-[22rem] max-w-[88vw] h-auto"
        />

        <div className="flex items-center gap-4" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src="/images/ag-mark-gradient.svg"
              alt=""
              className={`w-14 h-14 transition-all duration-500 ease-out ${
                dotCount > i ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
