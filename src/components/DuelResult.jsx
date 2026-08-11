// ============================================================================
// src/components/DuelResult.jsx
// Muestra el resultado del duelo: ícono y tarjeta de puntuación de cada
// dispositivo (con insignias "Mejor en..."), gráfica de radar, barras
// comparativas por categoría, y veredicto. Compartido entre HomePage y
// ComparisonPage.
// ============================================================================
import { Link } from "react-router-dom";
import { Crown, RotateCcw } from "lucide-react";
import { COLORS } from "../data/theme";
import { CATS, overallOf } from "../data/devices";
import { verdictText } from "../lib/verdict";
import ScoreDial from "./ScoreDial";
import DuelBar from "./DuelBar";
import DeviceIcon from "./DeviceIcon";
import RadarChart from "./RadarChart";

export default function DuelResult({ devA, devB, onReset, resetTo = "/" }) {
  const overallA = overallOf(devA);
  const overallB = overallOf(devB);
  const aWins = overallA > overallB;
  const bWins = overallB > overallA;

  const badgesA = CATS.filter((c) => devA.scores[c.key] > devB.scores[c.key]).slice(0, 2);
  const badgesB = CATS.filter((c) => devB.scores[c.key] > devA.scores[c.key]).slice(0, 2);

  return (
    <div>
      <h2 className="sr-only">Resultado: {devA.name} contra {devB.name}</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg p-5 text-center relative" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          {aWins && <Crown size={20} className="absolute -top-2.5 left-1/2 -translate-x-1/2" style={{ color: COLORS.gold }} />}
          <div className="flex justify-center mb-2">
            <DeviceIcon device={devA} size={44} color={COLORS.a} bg={COLORS.aSoft} />
          </div>
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: COLORS.a, fontFamily: "'Space Grotesk', sans-serif" }}>{devA.type}</div>
          <Link to={`/${devA.slugType}/${devA.slug}`} className="font-semibold text-sm sm:text-base mb-3 block hover:underline" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
            {devA.name}
          </Link>
          <ScoreDial value={overallA} color={COLORS.a} label="Puntuación" />
          <div className="text-xs mt-2" style={{ color: COLORS.muted }}>{devA.year} · {devA.price}</div>
          {badgesA.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {badgesA.map((c) => (
                <span
                  key={c.key}
                  className="text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide"
                  style={{ backgroundColor: COLORS.aSoft, color: COLORS.a, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  🏆 Mejor {c.label.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-lg p-5 text-center relative" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          {bWins && <Crown size={20} className="absolute -top-2.5 left-1/2 -translate-x-1/2" style={{ color: COLORS.gold }} />}
          <div className="flex justify-center mb-2">
            <DeviceIcon device={devB} size={44} color={COLORS.b} bg={COLORS.bSoft} />
          </div>
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: COLORS.b, fontFamily: "'Space Grotesk', sans-serif" }}>{devB.type}</div>
          <Link to={`/${devB.slugType}/${devB.slug}`} className="font-semibold text-sm sm:text-base mb-3 block hover:underline" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
            {devB.name}
          </Link>
          <ScoreDial value={overallB} color={COLORS.b} label="Puntuación" />
          <div className="text-xs mt-2" style={{ color: COLORS.muted }}>{devB.year} · {devB.price}</div>
          {badgesB.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {badgesB.map((c) => (
                <span
                  key={c.key}
                  className="text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide"
                  style={{ backgroundColor: COLORS.bSoft, color: COLORS.b, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  🏆 Mejor {c.label.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg p-4 sm:p-6 mb-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
        <div className="text-xs uppercase tracking-widest mb-3 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
          Vista general
        </div>
        <RadarChart devA={devA} devB={devB} colorA={COLORS.a} colorB={COLORS.b} />
        <div className="flex items-center justify-center gap-5 mt-2">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.a, fontFamily: "'Inter', sans-serif" }}>
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.a }} /> {devA.name}
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.b, fontFamily: "'Inter', sans-serif" }}>
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.b }} /> {devB.name}
          </span>
        </div>
      </div>

      <div className="rounded-lg p-4 sm:p-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
        <div className="text-xs uppercase tracking-widest mb-2 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
          Categoría por categoría
        </div>
        {CATS.map((c) => (
          <DuelBar key={c.key} label={c.label} scoreA={devA.scores[c.key]} scoreB={devB.scores[c.key]} detailA={devA.details[c.key]} detailB={devB.details[c.key]} />
        ))}
      </div>

      <div className="mt-6 rounded-lg p-5 text-sm sm:text-base leading-relaxed" style={{ backgroundColor: COLORS.panelDark, color: "#E7E9EE", fontFamily: "'Inter', sans-serif" }}>
        <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: "'Space Grotesk', sans-serif" }}>Veredicto</div>
        {verdictText(devA, devB)}
      </div>

      {onReset ? (
        <button onClick={onReset} className="mt-6 mx-auto flex items-center gap-2 text-sm px-4 py-2 rounded-md" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif", border: `1px solid ${COLORS.line}` }}>
          <RotateCcw size={14} /> Nueva comparación
        </button>
      ) : (
        <Link to={resetTo} className="mt-6 mx-auto flex items-center gap-2 text-sm px-4 py-2 rounded-md w-fit" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif", border: `1px solid ${COLORS.line}` }}>
          <RotateCcw size={14} /> Nueva comparación
        </Link>
      )}
    </div>
    );
}
