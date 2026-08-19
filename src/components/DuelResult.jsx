// ============================================================================
// src/components/DuelResult.jsx
// Resultado del duelo: primero las tarjetas con fotos, luego los pesos,
// precios por país, ficha por sectores, votación, veredicto y compartir.
// ============================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Crown, RotateCcw } from "lucide-react";
import { COLORS } from "../data/theme";
import { CATS, overallOf } from "../data/devices";
import { verdictText } from "../lib/verdict";
import { COUNTRIES, resolvePrice } from "../lib/pricing";
import ScoreDial from "./ScoreDial";
import SpecsTable from "./SpecsTable";
import DuelBar from "./DuelBar";
import DeviceIcon from "./DeviceIcon";
import RadarChart from "./RadarChart";
import WeightPicker, { DEFAULT_WEIGHTS } from "./WeightPicker";
import ShareButtons from "./ShareButtons";

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

  const pairKey = `duelo:${devA.slug}-vs-${devB.slug}`;
  const [myVote, setMyVote] = useState(null);
  const [stats, setStats] = useState({ a: 0, b: 0 });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferredCountry");
      if (saved && COUNTRIES.find((c) => c.code === saved)) {
        setCountryCode(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      setMyVote(localStorage.getItem(pairKey));
      setStats(JSON.parse(localStorage.getItem(pairKey + ":stats") || '{"a":0,"b":0}'));
    } catch {}
  }, [pairKey]);

  const handleCountryChange = (code) => {
    setCountryCode(code);
    try {
      localStorage.setItem("preferredCountry", code);
    } catch {}
  };

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

  const totalVotes = stats.a + stats.b;
  const pctA = totalVotes ? Math.round((stats.a / totalVotes) * 100) : 50;
  const pctB = 100 - pctA;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "/";
  const fbHref = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl);

  return (
    <div>
      <h2 className="sr-only">Resultado: {devA.name} contra {devB.name}</h2>

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

      {/* Tarjetas con fotos PRIMERO */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg p-5 text-center relative" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          {aWins && <Crown size={20} className="absolute -top-2.5 left-1/2 -translate-x-1/2" style={{ color: COLORS.gold }} />}
          <div className="flex justify-center mb-2">
            <DeviceIcon device={devA} size={64} color={COLORS.a} bg={COLORS.aSoft} />
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
            <DeviceIcon device={devB} size={64} color={COLORS.b} bg={COLORS.bSoft} />
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

      {/* ¿Qué te importa más? (ahora debajo de las fotos) */}
      <div className="mb-6">
        <WeightPicker weights={weights} onChange={handleWeightsChange} onReset={handleWeightsReset} />
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

      <div className="rounded-lg p-4 sm:p-6 mb-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
        <div className="text-xs uppercase tracking-widest mb-2 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
          Categoría por categoría
        </div>
        {CATS.map((c) => (
          <DuelBar key={c.key} label={c.label} scoreA={devA.scores[c.key]} scoreB={devB.scores[c.key]} detailA={devA.details[c.key]} detailB={devB.details[c.key]} />
        ))}
      </div>

      <SpecsTable devA={devA} devB={devB} priceA={priceA} priceB={priceB} />

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
              {totalVotes} voto{totalVotes === 1 ? "" : "s"} en este dispositivo · los votos se guardan en tu navegador
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

      <div className="mt-6 rounded-lg p-5 text-sm sm:text-base leading-relaxed" style={{ backgroundColor: COLORS.panelDark, color: "#E7E9EE", fontFamily: "'Inter', sans-serif" }}>
        <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: "'Space Grotesk', sans-serif" }}>Veredicto</div>
        {verdictText(devA, devB)}
      </div>

      <div className="mt-4">
        <ShareButtons devA={devA} devB={devB} />
      </div>

      {anyEstimate && (
        <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
          * Los precios marcados como "Estimación por conversión" son un cálculo aproximado a partir del precio en EE.UU., y pueden variar según la tienda, impuestos locales, aranceles de importación y el tipo de cambio del día. No representan necesariamente el precio final de venta.
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
