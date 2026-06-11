// Add new theme codes here as new themed collections are added
const THEME_CODES: Record<string, string> = {
  CDB:  'Café de Bébé',
  CSTK: 'Cider Sips & Tiny Kicks',
}

// Vite scans src/assets/event-inspiration at build time — adding a new subfolder
// with images is all that's needed to have them appear on this page.
const imageModules = import.meta.glob(
  '../assets/event-inspiration/**/*.{png,jpg,jpeg,PNG,JPG,webp}',
  { eager: true }
) as Record<string, { default: string }>

interface InspirationImage {
  src: string
  alt: string
  label: string
}

function parseImage(path: string, url: string): InspirationImage {
  const segments = path.split('/')
  const filename  = segments[segments.length - 1]
  const category  = segments[segments.length - 2]
  const nameNoExt = filename.replace(/\.[^/.]+$/, '')
  const parts     = nameNoExt.split('_')

  // Pattern: "Category_CODE_Detail" — second segment is the theme code
  if (parts.length >= 2) {
    const code = parts[1]
    if (THEME_CODES[code]) {
      return {
        src:   url,
        label: THEME_CODES[code],
        alt:   `${THEME_CODES[code]} — ${category}`,
      }
    }
  }

  // No matching code — fall back to folder name as label
  return {
    src:   url,
    label: category,
    alt:   `${nameNoExt} — ${category}`,
  }
}

const images: InspirationImage[] = Object.entries(imageModules).map(
  ([path, mod]) => parseImage(path, mod.default)
)

export default function Inspiration() {
  return (
    <main className="bg-blush">

      {/* Page header */}
      <section className="bg-blush py-[60px] px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <p className="font-cinzel text-[10px] tracking-[0.1em] uppercase text-[#C48A8A] mb-3">
            Event Inspiration
          </p>
          <h1 className="font-cormorant text-[42px] leading-tight text-[#43254A] mb-4">
            Moments, Moods, and Details.
          </h1>
          <p className="font-jost text-[15px] text-[#43254A]/65 mb-4">
            A curated look at the aesthetics, atmospheres, and ideas that shape the work.
          </p>
          <p className="font-jost italic text-[12px] text-[#43254A]/45">
            Gallery includes event photography and styled inspiration images.
          </p>
        </div>
      </section>

      {/* Masonry grid */}
      <div
        className="px-4 pb-[40px] columns-1 sm:columns-2 lg:columns-3"
        style={{ columnGap: '12px' }}
      >
        {images.map((img) => (
          <div key={img.src} className="break-inside-avoid mb-3 relative group">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full block"
            />
            {/* Overlay — hidden on mobile, fade in on hover for sm+ */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] bg-[#43254A]/55 pointer-events-none">
              <span className="font-cinzel text-[12px] tracking-[0.1em] uppercase text-[#F0E2E5] text-center px-4">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}
