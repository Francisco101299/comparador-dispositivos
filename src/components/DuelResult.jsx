// ============================================================================
// src/components/DuelResult.jsx
// Resultado del duelo con precios por país. Prioridad:
//   1. Precio local específico (si el dispositivo lo tiene)
//   2. Conversión aproximada desde USD (fallback, con leyenda "estimación")
//   3. "Precio no disponible"
// ============================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Crown, RotateCcw } from "lucide-react";
import { COLORS } from "../data/theme";
import { CATS, overallOf } from "../data/devices";
import { verdictText } from "../lib/verdict";
import { COUNTRIES, resolvePrice } from "../lib/pricing";
import ScoreDial from "./ScoreDial";
import DuelBar from "./DuelBar";
import DeviceIcon from "./DeviceIcon";
import RadarChart from "./RadarChart";
import WeightPicker, { DEFAULT_WEIGHTS } from "./WeightPicker";

function PriceBlock({ price, color }) {
  return (
    <div className="mt-1 mb-2">
      <div className="text-base sm:text-lg font-bold" style={{ color, fontFamily: "'IBM Plex Mono', monospace" }}>
        {price.text}
      </div>
      {price.available && (
        <div
          className="text-[9px] uppercase tracking-widest mt-0.5"
          style={{ color: price.isEstimate ? COLORS.muted : color, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {price.label}
        </div>
      )}
    </div>
  );
}

export default function DuelResult({ devA, devB, onReset, resetTo = "/" }) {
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [countryCode, setCountryCode] = useState("US");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferredCountry");
      if (saved && COUNTRIES.find((c) => c.code === saved)) {
        setCountryCode(saved);
      }
    } catch {}
  }, []);

  const handleCountryChange = (code) => {
    setCountryCode(code);
    try {
      localStorage.setItem("preferredCountry", code);
    } catch {}
  };

  const calculateWeightedOverall = (scores, weights) => {
    let totalWeight = 0;
    let weightedSum = 0;
    CATS.forEach((c) => {
      weightedSum += (scores[c.key] || 0) * weights[c.key];
      totalWeight += weights[c.key];
    });
    return Math.round(weightedSum / totalWeight);
  };

  const overallA = calculateWeightedOverall(devA.scores, weights);
  const overallB = calculateWeightedOverall(devB.scores, weights);
  const aWins = overallA > overallB;
  const bWins = overallB > overallA;

  const badgesA = CATS.filter((c) => devA.scores[c.key] > devB.scores[c.key]).slice(0, 2);
  const badgesB = CATS.filter((c) => devB.scores[c.key] > devA.scores[c.key]).slice(0, 2);

  const handleWeightsChange = (newWeights) => setWeights(newWeights);
  const handleWeightsReset = () => setWeights(DEFAULT_WEIGHTS);

  const priceA = resolvePrice(devA, countryCode);
  const priceB = resolvePrice(devB, countryCode);
  const anyEstimate = priceA.isEstimate || priceB.isEstimate;

  return (
    <div>
      <h2 className="sr-only">Resultado: {devA.name} contra {devB.name}</h2>

      <div className="mb-6">
        <WeightPicker weights={weights} onChange={handleWeightsChange} onReset={handleWeightsReset} />
      </div>

      {/* Selector de país */}
      <div className="mb-5 rounded-lg p-3 flex flex-col items-center gap-2" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
        <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
          Ver precios en:
        </span>
        <div className="flex flex-wrap justify-center gap-1.5">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => handleCountryChange(c.code)}
              className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: countryCode === c.code ? COLORS.ink : "#F0F2F5",
                color: countryCode === c.code ? "#fff" : COLORS.ink,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg p-5 text-center relative" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          {aWins && <Crown size={20} className="absolute -top-2.5 left-1/2 -translate-x-1/2" style={{ color: COLORS.gold }} />}
          <div className="flex justify-center mb-2">
            <DeviceIcon device={devA} size={44} color={COLORS.a} bg={COLORS.aSoft} />
          </div>
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: COLORS.a, fontFamily: "'Space Grotesk', sans-serif" }}>{devA.type}</div>
          <Link to={`/${devA.slugType}/${devA.slug}`} className="font-semibold text-sm sm:text-base block hover:underline" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
            {devA.name}
          </Link>
          <PriceBlock price={priceA} color={COLORS.a} />
          <ScoreDial value={overallA} color={COLORS.a} label="Puntuación" />
          <div className="text-xs mt-2" style={{ color: COLORS.muted }}>{devA.year}</div>
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
          <Link to={`/${devB.slugType}/${devB.slug}`} className="font-semibold text-sm sm:text-base block hover:underline" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
            {devB.name}
          </Link>
          <PriceBlock price={priceB} color={COLORS.b} />
          <ScoreDial value={overallB} color={COLORS.b} label="Puntuación" />
          <div className="text-xs mt-2" style={{ color: COLORS.muted }}>{devB.year}</div>
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

      {anyEstimate && (
        <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
          * Los precios marcados como "Estimación por conversión" son un cálculo aproximado a partir del precio en EE.UU., y pueden variar según la tienda, impuestos locales, aranceles de importación y el tipo de cambio del día. No representan necesariame
          </p>
      )}

      {onReset ? (
        <button onClick={onReset} className="mt-4 mx-auto flex items-center gap-2 text-sm px-4 py-2 rounded-md" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif", border: `1px solid ${COLORS.line}` }}>
          <RotateCcw size={14} /> Nueva comparación
        </button>
      ) : (
        <Link to={resetTo} className="mt-4 mx-auto flex items-center gap-2 text-sm px-4 py-2 rounded-md w-fit" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif", border: `1px solid ${COLORS.line}` }}>
          <RotateCcw size={14} /> Nueva comparación
        </Link>
      )}
    </div>
  );
}
