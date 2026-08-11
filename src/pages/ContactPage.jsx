// ============================================================================
// src/pages/ContactPage.jsx
// Página de contacto simple en /contacto: muestra el correo y un botón que
// abre la app de correo directamente, sin formulario.
// ============================================================================
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { COLORS, FONT_IMPORT } from "../data/theme";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";

const CONTACT_EMAIL = "franckxx101219990@gmail.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Contacto"
        description="Ponte en contacto con Duelo de Especificaciones para dudas, sugerencias o comentarios."
        canonical={typeof window !== "undefined" ? window.location.origin + "/contacto" : "/contacto"}
      />
      <style>{FONT_IMPORT}</style>

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · Contacto
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contacto
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            ¿Dudas, comentarios o algo que quieras decirnos?
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 sm:px-10 -mt-6">
        <div className="rounded-lg shadow-lg p-6 sm:p-8 text-center flex flex-col items-center gap-4" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: 56, height: 56, backgroundColor: COLORS.aSoft }}>
            <Mail size={24} color={COLORS.a} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            Escríbenos directamente a nuestro correo y te responderemos lo antes posible.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="w-full py-3 rounded-md font-semibold text-sm uppercase tracking-wide text-center"
            style={{ backgroundColor: COLORS.ink, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Escribir correo
          </a>
          <p className="text-xs" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            {CONTACT_EMAIL}
          </p>
        </div>
      </div>
    </div>
  );
                                                    }
