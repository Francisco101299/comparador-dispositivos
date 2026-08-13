// ============================================================================
// src/pages/SuggestPage.jsx
// Formulario para que la gente sugiera un dispositivo que falte. Al enviar,
// abre la app de correo del usuario con el mensaje ya redactado — no
// requiere backend ni registrarse en ningún servicio externo.
// ============================================================================
import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";
import SiteBanner from "../components/SiteBanner";

const DEST_EMAIL = "franckxx101219990@gmail.com";

export default function SuggestPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Celular");
  const [notes, setNotes] = useState("");

  const canSend = name.trim().length > 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    const subject = `Sugerencia de dispositivo: ${name}`;
    const body = `Dispositivo: ${name}\nCategoría: ${type}\n\nDetalles adicionales:\n${notes || "(sin detalles adicionales)"}`;
    window.location.href = `mailto:${DEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Sugerir un dispositivo"
        description="¿No encuentras tu celular, computadora o tablet? Sugiérelo y lo agregamos al comparador."
        canonical={typeof window !== "undefined" ? window.location.origin + "/sugerir" : "/sugerir"}
      />
      <style>{FONT_IMPORT}</style>

      <div className="relative px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · Sugerir dispositivo
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ¿Falta tu dispositivo?
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            Dinos cuál y lo agregamos al comparador.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 mt-6">
  <SiteBanner />
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-lg p-4 sm:p-5 flex flex-col gap-4"
          style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}
        >
          <div>
            <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
              Nombre del dispositivo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Samsung Galaxy A55"
              className="w-full px-3 py-3 rounded-md outline-none text-sm sm:text-base"
              style={{ border: `2px solid ${COLORS.line}`, fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
              Categoría
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-3 rounded-md outline-none text-sm sm:text-base"
              style={{ border: `2px solid ${COLORS.line}`, fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
            >
              <option value="Celular">Celular</option>
              <option value="Computadora">Computadora</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
              Detalles (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Cualquier dato que ayude: precio, año, dónde lo viste, etc."
              rows={4}
              className="w-full px-3 py-3 rounded-md outline-none text-sm sm:text-base resize-none"
              style={{ border: `2px solid ${COLORS.line}`, fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
            />
          </div>

          <button
            type="submit"
            disabled={!canSend}
            className="w-full py-3 rounded-md font-semibold text-sm uppercase tracking-wide disabled:opacity-40 transition-opacity"
            style={{ backgroundColor: COLORS.ink, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Enviar sugerencia
          </button>
          <p className="text-xs text-center" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            Al enviar se abrirá tu app de correo con el mensaje ya escrito.
          </p>
        </form>
      </div>
    </div>
  );
}
