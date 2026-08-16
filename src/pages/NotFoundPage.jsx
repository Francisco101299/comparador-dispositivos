// ============================================================================
// src/pages/NotFoundPage.jsx
// Página 404 con meta robots "noindex".
// ============================================================================
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../data/theme";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Página no encontrada | Duelo de Características";
    let tag = document.querySelector('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, follow");
    return () => tag.setAttribute("content", "index, follow");
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: COLORS.bg }}>
      <div className="text-center px-5" style={{ fontFamily: "'Inter', sans-serif" }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.ink }}>404</h1>
        <p className="mb-4" style={{ color: COLORS.muted }}>No encontramos esa página.</p>
        <Link to="/" className="underline" style={{ color: COLORS.ink }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
          }
