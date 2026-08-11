// ============================================================================
// src/components/CategoryNav.jsx
// Menú desplegable para cambiar entre Celulares, Computadoras y Tablets,
// más un link a "Sugerir dispositivo". Se usa en el encabezado de las
// páginas principales.
// ============================================================================
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const CATEGORIES = [
  { label: "Celulares", path: "/celulares" },
  { label: "Computadoras", path: "/computadoras" },
  { label: "Tablets", path: "/tablets" },
];

export default function CategoryNav() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-center gap-4 flex-wrap text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="relative" ref={boxRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}
        >
          Categorías <ChevronDown size={14} />
        </button>
        {open && (
          <div className="absolute z-30 mt-1 left-1/2 -translate-x-1/2 min-w-[160px] rounded-md shadow-lg overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #D6DAE2" }}>
            {CATEGORIES.map((c) => (
              <Link
                key={c.path}
                to={c.path}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm hover:bg-[#F3F4F7] transition-colors"
                style={{ color: "#14181F" }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link to="/sugerir" className="px-3 py-1.5 rounded-full" style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}>
        ¿Falta tu dispositivo?
      </Link>
      <Link to="/blog" className="px-3 py-1.5 rounded-full" style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}>
        Blog
      </Link>
      <Link to="/acerca-de" className="px-3 py-1.5 rounded-full" style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}>
        Acerca de
      </Link>
    </nav>
  );
}
