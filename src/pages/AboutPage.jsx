// ============================================================================
// src/pages/AboutPage.jsx
// Página "Acerca de": explica qué es el sitio y cómo se calculan las
// puntuaciones. Le da contexto y credibilidad al proyecto.
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { DEVICES, CATS } from "../data/devices";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Acerca de Duelo de Especificaciones"
        description="Qué es Duelo de Especificaciones, cómo se calculan las puntuaciones y de dónde salen los datos del catálogo de celulares, computadoras y tablets."
        canonical={typeof window !== "undefined" ? window.location.origin + "/acerca-de" : "/acerca-de"}
      />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · Acerca de
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Acerca de este sitio
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <div className="rounded-lg shadow-lg p-5 sm:p-7 flex flex-col gap-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              ¿Qué es Duelo de Especificaciones?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Es un comparador que permite poner dos celulares, computadoras o tablets frente a frente
              y ver de forma clara en qué destaca cada uno: rendimiento, pantalla, batería, cámara,
              portabilidad y relación precio-calidad. Actualmente el catálogo incluye {DEVICES.length}{" "}
              dispositivos, y sigue creciendo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              ¿Cómo se calculan las puntuaciones?
            </h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Cada dispositivo recibe una puntuación de 0 a 100 en seis categorías, basada en sus
              especificaciones técnicas publicadas por el fabricante y comparadas contra el resto del
              catálogo:
            </p>
            <ul className="text-sm leading-relaxed list-disc pl-5" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {CATS.map((c) => (
                <li key={c.key}>{c.label}</li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              La puntuación general es el promedio de esas seis. Son estimaciones comparativas
              pensadas para orientar una decisión de compra, no mediciones de laboratorio ni
              benchmarks oficiales.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              ¿Falta un dispositivo o hay un dato incorrecto?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Puedes decirnos qué falta desde la sección{" "}
              <Link to="/sugerir" className="underline" style={{ color: COLORS.ink }}>
                ¿Falta tu dispositivo?
              </Link>{" "}
              — leemos cada sugerencia y actualizamos el catálogo con regularidad.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
        }
