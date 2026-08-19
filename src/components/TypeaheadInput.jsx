// ============================================================================
// src/components/TypeaheadInput.jsx
// Input con autocompletado. Si recibe `forcedCategory`, solo sugiere
// dispositivos de esa categoría (la elige el usuario con CategoryPicker).
// ============================================================================
import { useState, useRef, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { COLORS } from "../data/theme";
import { DEVICES } from "../data/devices";
import { normalize } from "../lib/normalize";
import DeviceIcon from "./DeviceIcon";

const TYPE_GROUPS = {
  Celular: ["Celular"],
  Computadora: ["Desktop", "Laptop"],
  Tablet: ["Tablet"],
  Smartwatch: ["Smartwatch"],
  Dron: ["Dron"],
  Herramienta: ["Taladro", "Amoladora", "Atornillador", "Rotomartillo", "Sierra", "Lijadora", "Esmeril", "Compresor", "Generador", "Hidrolavadora", "Soldadora"],

};

export default function TypeaheadInput({ label, accent, value, onSelect, excludeId, forcedCategory }) {
  const [query, setQuery] = useState(value ? value.name : "");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    setQuery(value ? value.name : "");
  }, [value]);

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

  const results = useMemo(() => {
    const q = normalize(query.trim());
    let pool = DEVICES.filter((d) => d.id !== excludeId);
    if (forcedCategory && TYPE_GROUPS[forcedCategory]) {
      pool = pool.filter((d) => TYPE_GROUPS[forcedCategory].includes(d.type));
    }
    if (!q) return pool.slice(0, 6);
    // Busca por palabras sueltas (en cualquier orden), no solo frase exacta.
    // Así "Samsung S" encuentra "Samsung Galaxy S23" aunque "Galaxy" esté en medio.
    const words = q.split(/\s+/).filter(Boolean);
    const matches = pool.filter((d) => {
      const name = normalize(d.name);
      return words.every((w) => name.includes(w));
    });
    // Prioriza los que empiezan con lo que escribiste, luego el resto
    matches.sort((a, b) => {
      const aStarts = normalize(a.name).startsWith(q) ? 0 : 1;
      const bStarts = normalize(b.name).startsWith(q) ? 0 : 1;
      return aStarts - bStarts;
    });
    return matches.slice(0, 6);
  }, [query, excludeId, forcedCategory]);
  return (
    <div className="relative" ref={boxRef}>
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: accent }} />
        <input
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onSelect(null);
            setOpen(true);
          }}
          placeholder={label}
          className="w-full pl-9 pr-3 py-3 rounded-md outline-none text-sm sm:text-base"
          style={{ border: `2px solid ${accent}`, fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
        />
      </div>
      {open && (
        <div
          className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-md shadow-lg"
          style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}
        >
          {results.length === 0 && (
            <div className="px-3 py-3 text-sm" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Sin resultados. Prueba otro nombre o quita el filtro de categoría.
            </div>
          )}
          {results.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                onSelect(d);
                setQuery(d.name);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 text-sm flex items-center justify-between gap-2 hover:bg-[#F3F4F7] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
            >
              <span className="flex items-center gap-2 min-w-0">
                <DeviceIcon device={d} size={28} />
                <span className="truncate">{d.name}</span>
              </span>
              <span className="text-xs uppercase tracking-wide shrink-0" style={{ color: COLORS.muted }}>
                {d.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
