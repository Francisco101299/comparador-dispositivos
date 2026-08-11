// ============================================================================
// src/components/CategoryNav.jsx
// Menú compacto: "Categorías" (Celulares/Computadoras/Tablets) y "Más"
// (Blog, Acerca de, FAQ, Sugerir dispositivo) — dos desplegables en vez de
// cinco botones sueltos, para que no se vea saturado en pantallas chicas.
// ============================================================================
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const CATEGORIES = [
  { label: "Celulares", path: "/celulares" },
  { label: "Computadoras", path: "/computadoras" },
  { label: "Tablets", path: "/tablets" },
];

const MORE_LINKS = [
  { label: "¿Falta tu dispositivo?", path: "/sugerir" },
  { label: "Blog", path: "/blog" },
  { label: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
  { label: "Acerca de", path: "/acerca-de" },
];

function Dropdown({ label, items }) {
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
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full"
        style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}
      >
        {label} <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute z-30 mt-1 left-1/2 -translate-x-1/2 min-w-[180px] rounded-md shadow-lg overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid #D6DAE2" }}>
          {items.map((c) => (
            <Link
              key={c.path}
              to={c.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm hover:bg-[#F3F4F7] transition-colors whitespace-nowrap"
              style={{ color: "#14181F" }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryNav() {
  return (
    <nav className="flex items-center justify-center gap-3 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Dropdown label="Categorías" items={CATEGORIES} />
      <Dropdown label="Más" items={MORE_LINKS} />
    </nav>
  );
}
