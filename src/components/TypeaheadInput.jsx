// ============================================================================
// src/components/TypeaheadInput.jsx
// Input con autocompletado para elegir un dispositivo a comparar.
// ============================================================================
import { useState, useRef, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { COLORS } from "../data/theme";
import { DEVICES } from "../data/devices";
import { normalize } from "../lib/normalize";

export default function TypeaheadInput({ label, accent, value, onSelect, excludeId }) {
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
    if (!q) return pool.slice(0, 6);
    return pool.filter((d) => normalize(d.name).includes(q)).slice(0, 6);
  }, [query, excludeId]);

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
              Sin resultados. Prueba otro nombre de la lista.
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
              className="w-full text-left px-3 py-2.5 text-sm flex items-center justify-between hover:bg-[#F3F4F7] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
            >
              <span>{d.name}</span>
              <span className="text-xs uppercase tracking-wide" style={{ color: COLORS.muted }}>
                {d.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
        }
