// ============================================================================
// src/components/DuelResult.jsx
// Resultado del duelo con precios referenciales en MONEDA LOCAL por país
// (colones, pesos, euros, soles...). El precio va destacado bajo el nombre.
// ============================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Crown, RotateCcw } from "lucide-react";
import { COLORS } from "../data/theme";
import { CATS, overallOf } from "../data/devices";
import { verdictText } from "../lib/verdict";
import ScoreDial from "./ScoreDial";
import DuelBar from "./DuelBar";
import DeviceIcon from "./DeviceIcon";
import RadarChart from "./RadarChart";
import WeightPicker, { DEFAULT_WEIGHTS } from "./WeightPicker";

// Países: factor de mercado (impuestos/importación), factor Apple (recargo
// mayor), moneda local y tipo de cambio aproximado (moneda por 1 USD).
const COUNTRIES = [
  { code: "US", name: "EE.UU.", factor: 1.0, appleFactor: 1.0, currency: "USD", locale: "en-US", rate: 1 },
  { code: "MX", name: "México", factor: 1.1, appleFactor: 1.15, currency: "MXN", locale: "es-MX", rate: 18.5 },
  { code: "CR", name: "Costa Rica", factor: 1.3, appleFactor: 1.73, currency: "CRC", locale: "es-CR", rate: 510 },
  { code: "CO", name: "Colombia", factor: 1.15, appleFactor: 1.25, currency: "COP", locale: "es-CO", rate: 4100 },
  { code: "AR", name: "Argentina", factor: 1.3, appleFactor: 1.6, currency: "ARS", locale: "es-AR", rate: 1300 },
  { code: "CL", name: "Chile", factor: 1.08, appleFactor: 1.15, currency: "CLP", locale: "es-CL", rate: 950 },
  { code: "PE", name: "Perú", factor: 1.08, appleFactor: 1.15, currency: "PEN", locale: "es-PE", rate: 3.75 },
  { code: "ES", name: "España", factor: 1.12, appleFactor: 1.2, currency: "EUR", locale: "es-ES", rate: 0.92 },
  { code: "EU", name: "Europa", factor: 1.15, appleFactor: 1.25, currency: "EUR", locale: "de-DE", rate: 0.92 },
];

function isAppleDevice(name) {
  return /iphone|ipad|macbook|imac|mac mini|mac studio|mac pro/i.test(name || "");
}

// Convierte "$1,199" USD al precio referencial en moneda local del país
function formatPriceForCountry(priceStr, country, apple) {
  if (!priceStr || typeof priceStr !== "string") return priceStr;
  const numeric = parseInt(String(priceStr).replace(/[^0-9]/g, ""), 10);
  if (isNaN(numeric)) return priceStr;
  const factor = apple ? country.appleFactor : country.factor;
  let local = numeric * factor * country.rate;
  // En monedas grandes (colones, pesos...) redondea a miles para leer mejor
  local = local >= 100000 ? Math.round(local / 1000) * 1000 : Math.round(local);
  try {
    const fmt = new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currency,
      maximumFractionDigits: 0,
    }).format(local);
    return `≈ ${fmt}`;
  } catch {
    return `≈ ${local}`;
  }
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

  const currentCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

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

  const priceA = formatPriceForCountry(devA.price, currentCountry, isAppleDevice(devA.name));
  const priceB = formatPriceForCountry(devB.price, currentCountry, isAppleDevice(devB.name));

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
          <div className="text-base sm:text-lg font-bold mt-1 mb-2" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
            {priceA}
          </div>
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
          <div className="text-base sm:text-lg font-bold mt-1 mb-2" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
            {priceB}
          </div>
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

      <p className="text-[10px] text-center mt-4" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        * Precios referenciales en moneda local con tipo de cambio aproximado. Varían según tienda, impuestos y tipo de cambio del día.
      </p>

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
