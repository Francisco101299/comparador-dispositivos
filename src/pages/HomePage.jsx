// ============================================================================
// src/pages/HomePage.jsx
// Página principal: elegir dos dispositivos y compararlos. Al comparar,
// navega a /comparar/:slugA-vs-:slugB (URL propia e indexable).
// ============================================================================
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Swords } from "lucide-react";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { DEVICES } from "../data/devices";
import { comparisonSlug, homeMeta } from "../lib/seo";
import SeoHead from "../components/SeoHead";
import TypeaheadInput from "../components/TypeaheadInput";
import CategoryNav from "../components/CategoryNav";

export default function HomePage() {
  const [devA, setDevA] = useState(null);
  const [devB, setDevB] = useState(null);
  const navigate = useNavigate();

  const canCompare = devA && devB && devA.id !== devB.id;
  const meta = homeMeta();

  const goCompare = () => {
    if (!canCompare) return;
    navigate(`/comparar/${comparisonSlug(devA, devB)}`);
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead title={meta.title} description={meta.description} canonical={meta.canonical} />
      <style>{FONT_IMPORT}</style>

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full" style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}>
            <Swords size={12} /> Duelo de especificaciones
          </div>
          <CategoryNav />
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ¿Cuál gana?
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            Elige dos celulares o computadoras de la lista y compara sus características al instante.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 -mt-6">
        <h2 className="sr-only">Elige dos dispositivos para comparar</h2>
        <div className="rounded-lg shadow-lg p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-start" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <TypeaheadInput label="Dispositivo A (ej. iPhone 16 Pro)" accent={COLORS.a} value={devA} onSelect={setDevA} excludeId={devB ? devB.id : null} />
          <div className="hidden sm:flex items-center justify-center font-bold text-sm shrink-0 pt-3" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
            VS
          </div>
          <TypeaheadInput label="Dispositivo B (ej. Galaxy S25 Ultra)" accent={COLORS.b} value={devB} onSelect={setDevB} excludeId={devA ? devA.id : null} />

          <button
            type="button"
            onClick={goCompare}
            disabled={!canCompare}
            className="sm:col-span-3 mt-1 w-full py-3 rounded-md font-semibold text-sm uppercase tracking-wide disabled:opacity-40 transition-opacity"
            style={{ backgroundColor: COLORS.ink, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Comparar
          </button>
          {devA && devB && devA.id === devB.id && (
            <p className="sm:col-span-3 text-xs text-center" style={{ color: COLORS.a, fontFamily: "'Inter', sans-serif" }}>
              Elige dos dispositivos distintos.
            </p>
          )}
        </div>
        <p className="text-center text-xs mt-3" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
          Base de datos local de {DEVICES.length} celulares y computadoras. Empieza a escribir para ver sugerencias.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10">
        <p className="text-center text-sm mt-8" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
          Selecciona dos dispositivos arriba (de las sugerencias) y presiona "Comparar", o explora el{" "}
          <Link to="/celulares" className="underline">catálogo de celulares</Link> y el{" "}
          <Link to="/computadoras" className="underline">catálogo de computadoras</Link>.
        </p>
      </div>
    </div>
  );
      }
