// ============================================================================
// src/components/CommunityVote.jsx
// Bloque de comunidad: votación "¿Cuál gana?" guardada en el navegador +
// enlace para opinar/comentar en Facebook. Sin backend ni servicios externos.
// ============================================================================
import { useState, useEffect } from "react";
import { COLORS } from "../data/theme";

export default function CommunityVote({ devA, devB }) {
  const pairKey = `duelo:${devA.slug}-vs-${devB.slug}`;
  const [myVote, setMyVote] = useState(null);
  const [stats, setStats] = useState({ a: 0, b: 0 });

  useEffect(() => {
    try {
      setMyVote(localStorage.getItem(pairKey));
      setStats(JSON.parse(localStorage.getItem(pairKey + ":stats") || '{"a":0,"b":0}'));
    } catch {}
  }, [pairKey]);

  const vote = (side) => {
    if (myVote === side) return;
    const next = { ...stats };
    if (myVote === "A") next.a = Math.max(0, next.a - 1);
    if (myVote === "B") next.b = Math.max(0, next.b - 1);
    if (side === "A") next.a += 1;
    else next.b += 1;
    setMyVote(side);
    setStats(next);
    try {
      localStorage.setItem(pairKey, side);
      localStorage.setItem(pairKey + ":stats", JSON.stringify(next));
    } catch {}
  };

  const total = stats.a + stats.b;
  const pctA = total ? Math.round((stats.a / total) * 100) : 50;
  const pctB = 100 - pctA;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "/";
  const fbHref = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl);

  return (
    <div className="rounded-lg p-4 sm:p-5 mt-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="text-xs uppercase tracking-widest mb-1 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
        ¿Y tú qué opinas?
      </div>
      <p className="text-xs text-center mb-3" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        Vota por tu favorito o deja tu comentario en Facebook.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => vote("A")}
          className="py-2.5 px-2 rounded-md font-semibold text-xs sm:text-sm"
          style={{
            backgroundColor: myVote === "A" ? COLORS.a : COLORS.aSoft,
            color: myVote === "A" ? "#fff" : COLORS.a,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {myVote === "A" ? "✓ " : ""}{devA.name}
        </button>
        <button
          onClick={() => vote("B")}
          className="py-2.5 px-2 rounded-md font-semibold text-xs sm:text-sm"
          style={{
            backgroundColor: myVote === "B" ? COLORS.b : COLORS.bSoft,
            color: myVote === "B" ? "#fff" : COLORS.b,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {myVote === "B" ? "✓ " : ""}{devB.name}
        </button>
      </div>

      {myVote && (
        <div className="mt-3">
          <div className="flex h-7 rounded-md overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
            <div className="flex items-center justify-center text-[11px] font-bold transition-all duration-500" style={{ width: `${pctA}%`, backgroundColor: COLORS.a, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
              {pctA}%
            </div>
            <div className="flex items-center justify-center text-[11px] font-bold transition-all duration-500" style={{ width: `${pctB}%`, backgroundColor: COLORS.b, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
              {pctB}%
            </div>
          </div>
          <p className="text-[10px] text-center mt-1.5" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            {total} voto{total === 1 ? "" : "s"} en este dispositivo · los votos se guardan en tu navegador
          </p>
        </div>
      )}

      <a
        href={fbHref}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-xs mt-3 underline"
        style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}
      >
        💬 Opinar y comentar en Facebook
      </a>
    </div>
  );
                                       }
