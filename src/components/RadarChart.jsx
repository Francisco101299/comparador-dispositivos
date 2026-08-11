import { CATS } from "../data/devices";

const SIZE = 280;
const CENTER = SIZE / 2;
const MAX_RADIUS = SIZE / 2 - 44;

function pointFor(index, value, totalCats) {
  const angle = (Math.PI * 2 * index) / totalCats - Math.PI / 2;
  const r = (value / 100) * MAX_RADIUS;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function labelPointFor(index, totalCats) {
  const angle = (Math.PI * 2 * index) / totalCats - Math.PI / 2;
  const r = MAX_RADIUS + 22;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function polygonPoints(scores, cats) {
  return cats.map((c, i) => {
    const p = pointFor(i, scores[c.key] || 0, cats.length);
    return `${p.x},${p.y}`;
  }).join(" ");
}

export default function RadarChart({ devA, devB, colorA, colorB }) {
  const rings = [0.25, 0.5, 0.75, 1];
  const totalCats = CATS.length;

  return (
    <div className="flex justify-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Gráfica comparando ${devA.name} y ${devB.name}`}>
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={CATS.map((_, i) => {
              const p = pointFor(i, ring * 100, totalCats);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="#D6DAE2"
            strokeWidth={1}
          />
        ))}

        {CATS.map((c, i) => {
          const outer = pointFor(i, 100, totalCats);
          return <line key={c.key} x1={CENTER} y1={CENTER} x2={outer.x} y2={outer.y} stroke="#D6DAE2" strokeWidth={1} />;
        })}

        <polygon points={polygonPoints(devA.scores, CATS)} fill={colorA} fillOpacity={0.22} stroke={colorA} strokeWidth={2} />
        <polygon points={polygonPoints(devB.scores, CATS)} fill={colorB} fillOpacity={0.22} stroke={colorB} strokeWidth={2} />

        {CATS.map((c, i) => {
          const p = labelPointFor(i, totalCats);
          return (
            <text
              key={c.key}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontFamily="'Inter', sans-serif"
              fill="#5B6270"
            >
              {c.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
    }
