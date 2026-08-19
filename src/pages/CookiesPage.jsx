// ============================================================================
// src/pages/CookiesPage.jsx
// Política de cookies + divulgación de afiliados (requerida por Amazon,
// AliExpress y redes publicitarias como AdSense).
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS } from "../data/theme";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";

const H2 = { fontFamily: "'Space Grotesk', sans-serif", color: COLORS.ink };
const P = { fontFamily: "'Inter', sans-serif", color: COLORS.ink };

export default function CookiesPage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Política de cookies y divulgación de afiliados — Duelo de Características"
        description="Cómo usamos el almacenamiento local en Duelo de Características y cómo funcionan nuestros enlaces de afiliados."
        canonical="/politica-cookies"
      />
      <div className="relative z-20 px-5 sm:px-10 pt-10 pb-8" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3"><Logo size={28} /></div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · Política de cookies y afiliados
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Política de cookies y divulgación de afiliados
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-8">
        <div className="rounded-lg p-5 sm:p-7 text-sm sm:text-base leading-relaxed space-y-5" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <section>
            <h2 className="font-bold text-lg mb-2" style={H2}>1. Almacenamiento local (sin cookies de seguimiento)</h2>
            <p style={P}>
              Este sitio no usa cookies propias de seguimiento. Usamos el almacenamiento local de tu navegador únicamente para recordar tus preferencias: país para mostrar precios, votos en comparaciones y los pesos de "¿qué te importa más?". Puedes borrarlos en cualquier momento desde la configuración de tu navegador.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2" style={H2}>2. Cookies de terceros</h2>
            <p style={P}>
              Si en el futuro mostramos publicidad (por ejemplo, Google AdSense), las redes publicitarias podrán usar cookies para mostrar anuncios relevantes. Puedes desactivarlas desde la configuración de anuncios de Google o desde tu navegador.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2" style={H2}>3. Divulgación de afiliados</h2>
            <p style={P}>
              Algunos enlaces de este sitio (Amazon, AliExpress, Mercado Libre) son enlaces de afiliados. Si compras a través de ellos, podemos recibir una comisión <strong>sin ningún costo adicional para ti</strong>. Esto no afecta el precio que pagas ni nuestras recomendaciones, que se basan en comparaciones independientes.
            </p>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2" style={H2}>4. Contacto</h2>
            <p style={P}>
              ¿Dudas sobre esta política? Escríbenos desde la página de <Link to="/contacto" className="underline">contacto</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
  }
