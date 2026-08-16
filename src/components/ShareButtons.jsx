// ============================================================================
// src/components/ShareButtons.jsx
// Botones para compartir el resultado de una comparación: WhatsApp y
// copiar link. Usa la URL actual de la página (funciona en /comparar/...).
// ============================================================================
import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { COLORS } from "../data/theme";

export default function ShareButtons({ devA, devB }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `¿${devA.name} o ${devB.name}? Mira quién gana en esta comparación:`;

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback si el navegador no soporta clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <span className="text-xs flex items-center gap-1" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        <Share2 size={13} /> Compartir:
      </span>
      <button
        type="button"
        onClick={handleWhatsApp}
        className="text-xs px-3 py-1.5 rounded-full font-medium"
        style={{ backgroundColor: "#25D366", color: "#fff", fontFamily: "'Inter', sans-serif" }}
      >
        WhatsApp
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1"
        style={{ backgroundColor: copied ? COLORS.b : "#F0F2F5", color: copied ? "#fff" : COLORS.ink, fontFamily: "'Inter', sans-serif" }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "¡Copiado!" : "Copiar link"}
      </button>
    </div>
  );
          }
