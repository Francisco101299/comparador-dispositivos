// ============================================================================
// src/pages/PrivacyPage.jsx
// Política de privacidad en /privacidad. Texto genérico y honesto para un
// sitio sin cuentas de usuario ni base de datos propia.
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Política de privacidad"
        description="Política de privacidad de Duelo de Especificaciones: qué datos se recopilan al visitar el sitio y cómo se usan."
        canonical={typeof window !== "undefined" ? window.location.origin + "/privacidad" : "/privacidad"}
      />
      <style>{FONT_IMPORT}</style>

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · Privacidad
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Política de privacidad
          </h1>
          <p className="mt-2 text-xs" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            Última actualización: agosto de 2026
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <div className="rounded-lg shadow-lg p-5 sm:p-7 flex flex-col gap-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              Qué datos recopilamos
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Este sitio no requiere que crees una cuenta ni te pide información personal para
              compararlo dispositivos. No almacenamos tus búsquedas ni comparaciones en ningún
              servidor propio. Al visitar el sitio, el proveedor de hosting (Vercel) y Google
              (a través de Search Console y, en su caso, herramientas de análisis) pueden recopilar
              automáticamente información técnica básica, como tu dirección IP, tipo de navegador y
              páginas visitadas, con fines de estadística y seguridad — esto es estándar en
              prácticamente cualquier sitio web y no identifica a personas por nombre.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              Formulario de sugerencias
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              La sección "¿Falta tu dispositivo?" abre tu propia aplicación de correo para que nos
              escribas directamente. Ese mensaje llega a nuestro correo como cualquier email normal;
              no se guarda en ninguna base de datos del sitio ni se comparte con terceros.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              Cookies
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Este sitio no usa cookies propias. Servicios externos que puedan estar activos
              (como los del proveedor de hosting) podrían usar cookies técnicas o de análisis según
              sus propias políticas.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              Enlaces a terceros
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Este sitio puede incluir enlaces hacia tiendas u otros sitios externos para consultar
              precios. No tenemos control sobre las prácticas de privacidad de esos sitios; te
              recomendamos revisar sus políticas por separado.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              Contacto
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Si tienes dudas sobre esta política, puedes escribirnos desde la sección{" "}
              <Link to="/sugerir" className="underline" style={{ color: COLORS.ink }}>
                ¿Falta tu dispositivo?
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
              }
