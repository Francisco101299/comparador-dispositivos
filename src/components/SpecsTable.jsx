// ============================================================================
// src/components/SpecsTable.jsx
// Ficha técnica por sectores estilo versus: cada fila tiene su propia barra
// comparativa derivada automáticamente del texto. Al final de cada sector
// se muestra también la puntuación general del sector como resumen.
// ============================================================================
import { COLORS } from "../data/theme";

function priceNumber(p) {
  if (!p || typeof p !== "string") return 0;
  const n = parseInt(p.replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? 0 : n;
}

// Barra pequeña de puntuación para cada característica individual
function MiniBar({ scoreA, scoreB }) {
  const a = typeof scoreA === "number" ? scoreA : 0;
  const b = typeof scoreB === "number" ? scoreB : 0;
  const hasAny = a > 0 || b > 0;
  if (!hasAny) return null;
  return (
    <div className="grid grid-cols-2 gap-3 px-3 mt-1.5">
      <div className="flex items-center gap-1.5">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${a}%`, backgroundColor: COLORS.a, opacity: 0.75 }} />
        </div>
        {a > 0 && (
          <span className="text-[9px] font-bold shrink-0" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
            {a}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 justify-end">
        {b > 0 && (
          <span className="text-[9px] font-bold shrink-0" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
            {b}
          </span>
        )}
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
          <div className="h-full rounded-full transition-all ml-auto" style={{ width: `${b}%`, backgroundColor: COLORS.b, opacity: 0.75 }} />
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ value, color }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
        <div className="h-full rounded-full" style={{ width: `${value || 0}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold shrink-0" style={{ color, fontFamily: "'IBM Plex Mono', monospace" }}>
        {typeof value === "number" ? value : "—"}
      </span>
    </div>
  );
}

function parseMaxGB(t) {
  if (!t) return null;
  const re = /(\d+(?:[.,]\d+)?)\s*GB/gi;
  let m;
  let max = null;
  while ((m = re.exec(t))) {
    if (/^\s*RAM/i.test(t.slice(re.lastIndex, re.lastIndex + 4))) continue;
    const v = parseFloat(m[1].replace(",", "."));
    if (max === null || v > max) max = v;
  }
  return max;
}

function GBBar({ text, color }) {
  const gb = parseMaxGB(text);
  if (!gb) return <span className="text-[10px]" style={{ color: COLORS.muted }}>—</span>;
  const w = Math.max(6, Math.round((Math.min(gb, 1024) / 1024) * 100));
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
        <div className="h-full rounded-full" style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold shrink-0" style={{ color, fontFamily: "'IBM Plex Mono', monospace" }}>
        {gb} GB
      </span>
    </div>
  );
}

function screenType(p) {
  if (!p) return null;
  if (/AMOLED|POLED/i.test(p)) return "AMOLED";
  if (/OLED|Retina XDR/i.test(p)) return "OLED";
  if (/LCD|Retina/i.test(p)) return "LCD";
  return null;
}

function hzOf(p) {
  const m = (p || "").match(/(\d+)\s*Hz/);
  return m ? `${m[1]} Hz` : null;
}

function resOf(dev) {
  const p = (dev.details && dev.details.pantalla) || "";
  const m = p.match(/\d{3,4}\s*x\s*\d{3,4}/);
  if (m) return m[0];
  if (/4K|UHD/.test(p)) return "4K UHD";
  if (/QHD/.test(p)) return "QHD+";
  if (/1\.5K/.test(p)) return "1.5K";
  if (/2\.5K|2\.8K|3\.1K|3K|4\.5K/.test(p)) return "2.5K o superior";
  if (/FHD|1080p/.test(p)) return "FHD (1080p)";
  if (dev.type !== "Celular") return null;
  const price = priceNumber(dev.price);
  if (price >= 900) return "QHD+ (típico de gama alta)";
  if (price >= 250) return "FHD+ (típico de gama media)";
  return "HD+ (típico de gama baja)";
}

function frontalOf(dev) {
  const c = (dev.details && dev.details.camara) || "";
  const m = c.match(/(\d+)\s*MP\s*(?:frontal|delantera|TrueDepth)/i) || c.match(/frontal\s*(\d+)\s*MP/i);
  if (m) return `${m[1]} MP`;
  if (/TrueDepth/i.test(c)) return "12 MP";
  if (dev.type !== "Celular") return null;
  const price = priceNumber(dev.price);
  if (price >= 700) return "12 MP (típico)";
  if (price >= 250) return "13 MP (típico)";
  return "8 MP (típico)";
}

function videoOf(dev) {
  const c = (dev.details && dev.details.camara) || "";
  const m = c.match(/(8K|4K|2\.7K|1080p)\s*\/\s*(\d+)/i);
  if (m) return `${m[1].toUpperCase()} a ${m[2]} fps`;
  if (/8K/.test(c)) return "8K";
  if (/4K/.test(c)) return "4K";
  if (/1080p/.test(c)) return "1080p";
  return null;
}

function oisOf(dev) {
  const c = (dev.details && dev.details.camara) || "";
  if (/OIS|estabilizaci/i.test(c)) return "Sí";
  if (dev.type !== "Celular") return null;
  const price = priceNumber(dev.price);
  if (price >= 600) return "Sí (típico de gama alta)";
  if (price >= 300) return "En algunos modelos";
  return "No (típico de gama baja)";
}

function apertureOf(dev) {
  const c = (dev.details && dev.details.camara) || "";
  const m = c.match(/f\/([\d.]+)/i);
  if (m) return `f/${m[1]}`;
  if (dev.type !== "Celular") return null;
  const price = priceNumber(dev.price);
  if (price >= 900) return "f/1.4 – f/1.7 (muy luminosa)";
  if (price >= 400) return "f/1.8 – f/2.0";
  return "f/2.0 – f/2.4";
}

function getRed(dev) {
  if (dev.specs && dev.specs.red) return dev.specs.red;
  if (dev.type !== "Celular") return null;
  const chip = (dev.details && dev.details.rendimiento) || "";
  if (/Dimensity/.test(chip)) return "5G";
  if (/4G/.test(chip)) return "4G";
  if (/Helio|Unisoc|SC98|QM215/.test(chip)) return "4G";
  if (/Snapdragon (680|685|662|665|670|730)/.test(chip)) return "4G";
  if (/Chip A/.test(chip)) {
    const mA = chip.match(/A(\d+)/);
    return mA && parseInt(mA[1], 10) >= 14 ? "5G" : "4G";
  }
  return (dev.year || 0) >= 2019 ? "5G" : "4G";
}

function getNucleos(dev) {
  if (dev.specs && dev.specs.nucleos) return dev.specs.nucleos;
  const chip = (dev.details && dev.details.rendimiento) || "";
  if (!chip) return null;
  if (/Chip A/.test(chip)) return "6 núcleos";
  if (/Chip M/.test(chip)) return "8 núcleos o más";
  if (/SC9832|QM215/.test(chip)) return "4 núcleos";
  return "8 núcleos (octa-core)";
}

function getResistencia(dev) {
  if (dev.specs && dev.specs.resistencia) return dev.specs.resistencia;
  const txt = `${(dev.details && dev.details.portabilidad) || ""} ${(dev.details && dev.details.pantalla) || ""}`;
  const m = txt.match(/IP\d{2}/);
  if (m) return m[0];
  if (/MIL-STD/i.test(txt)) return "MIL-STD-810";
  if (dev.type !== "Celular") return null;
  const p = priceNumber(dev.price);
  if (p >= 800) return "IP68 (agua y golpes, gama alta)";
  if (p >= 400) return "IP54–IP67 (típico de gama media)";
  return "Sin certificación (típico de gama baja)";
}

function getAudio(dev) {
  if (dev.specs && dev.specs.audio) return dev.specs.audio;
  if (dev.type === "Celular") return priceNumber(dev.price) >= 250 ? "Altavoces estéreo" : "Altavoz mono";
  return "Altavoces estéreo";
}

// ==========================================================================
// SCORING POR CARACTERÍSTICA: deriva 0-100 a partir del texto de cada fila.
// Si el parseo falla, devuelve null (no se dibuja barra).
// ==========================================================================
function scoreFeature(label, value, dev) {
  if (!value || typeof value !== "string") return null;
  const v = value;
  const l = label.toLowerCase();

  // Tasa de refresco
  if (/refresco/.test(l)) {
    const m = v.match(/(\d+)\s*Hz/);
    if (!m) return null;
    const hz = parseInt(m[1], 10);
    if (hz >= 144) return 98;
    if (hz >= 120) return 90;
    if (hz >= 90) return 72;
    if (hz >= 60) return 55;
    return 40;
  }

  // Resolución
  if (/resoluci/i.test(l)) {
    if (/4K|UHD|4\.5K/i.test(v)) return 98;
    if (/QHD|2\.8K|3\.1K|3K|2\.5K|1\.5K/i.test(v)) return 88;
    if (/FHD|1080p/i.test(v)) return 70;
    if (/HD\+|720p/i.test(v)) return 50;
    return null;
  }

  // Almacenamiento (por GB)
  if (/almacenamiento|storage/i.test(l) && !/versiones/i.test(l)) {
    const gb = parseMaxGB(v);
    if (!gb) return null;
    if (gb >= 1024) return 98;
    if (gb >= 512) return 88;
    if (gb >= 256) return 78;
    if (gb >= 128) return 62;
    if (gb >= 64) return 48;
    return 35;
  }

  // RAM
  if (/\bram\b/i.test(l)) {
    const m = v.match(/(\d+)\s*GB/i);
    if (!m) return null;
    const gb = parseInt(m[1], 10);
    if (gb >= 24) return 98;
    if (gb >= 16) return 90;
    if (gb >= 12) return 82;
    if (gb >= 8) return 70;
    if (gb >= 6) return 55;
    return 40;
  }

  // Batería (mAh para celulares, horas para laptops/drones)
  if (/bater/.test(l)) {
    const mah = v.match(/(\d{3,5})\s*mAh/i);
    if (mah) {
      const m = parseInt(mah[1], 10);
      if (m >= 6000) return 98;
      if (m >= 5000) return 85;
      if (m >= 4500) return 75;
      if (m >= 4000) return 60;
      return 45;
    }
    const horas = v.match(/(\d+)\s*h/i);
    if (horas) {
      const h = parseInt(horas[1], 10);
      if (h >= 20) return 98;
      if (h >= 15) return 88;
      if (h >= 10) return 75;
      if (h >= 6) return 55;
      return 40;
    }
    return null;
  }

  // Carga / Energía
  if (/carga|energ/.test(l)) {
    const w = v.match(/(\d+)\s*W/);
    if (w) {
      const watts = parseInt(w[1], 10);
      if (watts >= 120) return 98;
      if (watts >= 67) return 88;
      if (watts >= 45) return 75;
      if (watts >= 25) return 60;
      if (watts >= 15) return 45;
      return 30;
    }
    if (/r[aá]pida/i.test(v)) return 70;
    return null;
  }

  // Cámara frontal
  if (/frontal/.test(l)) {
    const m = v.match(/(\d+)\s*MP/i);
    if (!m) return null;
    const mp = parseInt(m[1], 10);
    if (mp >= 32) return 95;
    if (mp >= 16) return 85;
    if (mp >= 12) return 75;
    if (mp >= 8) return 58;
    return 40;
  }

  // Video
  if (/video|grabaci/i.test(l)) {
    if (/8K/i.test(v)) return 98;
    if (/4K.*60|60.*4K/i.test(v)) return 88;
    if (/4K/i.test(v)) return 75;
    if (/2\.7K/i.test(v)) return 65;
    if (/1080p/i.test(v)) return 45;
    return null;
  }

  // OIS
  if (/estabilizad|ois/i.test(l)) {
    if (/^(s[ií]|yes|s[ií]\s)/i.test(v)) return 90;
    if (/no/i.test(v)) return 30;
    if (/algunos/i.test(v)) return 60;
    return null;
  }

  // Apertura
  if (/apertura/i.test(l)) {
    const m = v.match(/f\/([\d.]+)/);
    if (!m) return null;
    const f = parseFloat(m[1]);
    if (f <= 1.5) return 98;
    if (f <= 1.8) return 85;
    if (f <= 2.0) return 75;
    if (f <= 2.4) return 60;
    return 45;
  }

  // Red móvil
  if (/red\s*m/i.test(l)) {
    if (/5G/i.test(v)) return 90;
    if (/4G/i.test(v)) return 50;
    return 30;
  }

  // Núcleos
  if (/n[uú]cleos/i.test(l)) {
    if (/(m[aá]s|8\s*n[uú]cleos\s*o\s*m[aá]s)/i.test(v)) return 95;
    const m = v.match(/(\d+)\s*n[uú]cleos/i);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    if (n >= 10) return 95;
    if (n >= 8) return 80;
    if (n >= 6) return 65;
    if (n >= 4) return 45;
    return 30;
  }

  // Resistencia
  if (/resistencia|protecci/i.test(l)) {
    if (/IP68/i.test(v)) return 95;
    if (/IP69/i.test(v)) return 98;
    if (/IP67/i.test(v)) return 80;
    if (/IP65/i.test(v)) return 70;
    if (/IP54/i.test(v)) return 55;
    if (/MIL-STD/i.test(v)) return 90;
    if (/sin/i.test(v)) return 25;
    return null;
  }

  // Audio
  if (/audio/i.test(l)) {
    if (/est[eé]reo/i.test(v)) return 85;
    if (/mono/i.test(v)) return 45;
    return null;
  }

  // Año
  if (l === "año") {
    const y = parseInt(v, 10);
    if (!y) return null;
    if (y >= 2026) return 98;
    if (y >= 2025) return 92;
    if (y >= 2024) return 85;
    if (y >= 2023) return 75;
    if (y >= 2022) return 60;
    if (y >= 2020) return 45;
    return 30;
  }

  return null;
}

export default function SpecsTable({ devA, devB, priceA, priceB }) {
  const dA = devA.details || {};
  const dB = devB.details || {};
  const sA = devA.scores || {};
  const sB = devB.scores || {};
  const xA = devA.specs || {};
  const xB = devB.specs || {};

  const sections = [
    {
      title: "Rendimiento",
      scoreKey: "rendimiento",
      rows: [
        { label: "Chip / Procesador", a: dA.rendimiento, b: dB.rendimiento },
        { label: "Núcleos", a: getNucleos(devA), b: getNucleos(devB) },
      ],
    },
    {
      title: "Pantalla",
      scoreKey: "pantalla",
      rows: [
        { label: "Pantalla", a: dA.pantalla, b: dB.pantalla },
        { label: "Resolución", a: resOf(devA), b: resOf(devB) },
        { label: "Tasa de refresco", a: hzOf(dA.pantalla), b: hzOf(dB.pantalla) },
        { label: "Tipo de pantalla", a: screenType(dA.pantalla), b: screenType(dB.pantalla) },
      ],
    },
    {
      title: "Batería",
      scoreKey: "bateria",
      rows: [
        { label: "Batería", a: dA.bateria, b: dB.bateria },
        { label: "Carga / Energía", a: dA.energia, b: dB.energia },
      ],
    },
    {
      title: "Cámara",
      scoreKey: "camara",
      rows: [
        { label: "Cámara principal", a: dA.camara, b: dB.camara },
        { label: "Apertura (cámara principal)", a: apertureOf(devA), b: apertureOf(devB) },
        { label: "Cámara frontal", a: frontalOf(devA), b: frontalOf(devB) },
        { label: "Grabación de video", a: videoOf(devA), b: videoOf(devB) },
        { label: "Estabilizador óptico (OIS)", a: oisOf(devA), b: oisOf(devB) },
      ],
    },
    {
      title: "Conectividad y diseño",
      rows: [
        { label: "Red móvil", a: getRed(devA), b: getRed(devB) },
        { label: "Protección contra golpes y agua", a: getResistencia(devA), b: getResistencia(devB) },
        { label: "Tamaño", a: xA.tamano, b: xB.tamano },
        { label: "Audio", a: getAudio(devA), b: getAudio(devB) },
      ],
    },
    {
      title: "Portabilidad",
      scoreKey: "portabilidad",
      rows: [{ label: "Peso / Diseño", a: dA.portabilidad, b: dB.portabilidad }],
    },
    {
      title: "Memoria y almacenamiento",
      scoreKey: "memoria",
      rows: [
        { label: "Versiones (RAM + almacenamiento)", a: dA.memoria, b: dB.memoria },
        { label: "Barra comparativa de almacenamiento", a: dA.memoria, b: dB.memoria, gb: true },
      ],
    },
    {
      title: "General",
      scoreKey: "precioCalidad",
      rows: [
        { label: "Año", a: String(devA.year), b: String(devB.year) },
        { label: "Precio", a: (priceA && priceA.text) || devA.price, b: (priceB && priceB.text) || devB.price },
      ],
    },
  ];

  return (
    <div className="rounded-lg mt-6 overflow-hidden" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="p-4 pb-3 text-center" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="text-xs uppercase tracking-widest" style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
          Ficha técnica por sectores
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.title}>
          <div
            className="py-2 px-3 text-center text-xs sm:text-sm font-bold uppercase tracking-widest border-y"
            style={{ backgroundColor: "#F4F6F9", borderColor: COLORS.line, color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {sec.title}
          </div>

          {sec.rows.map((r) => {
            if (!r.a && !r.b) return null;
            const sArow = scoreFeature(r.label, r.a, devA);
            const sBrow = scoreFeature(r.label, r.b, devB);
            const showBar = (sArow !== null || sBrow !== null) && !r.gb;
            return (
              <div key={r.label} className="py-2.5 border-b" style={{ borderColor: COLORS.line }}>
                <div className="text-[10px] uppercase tracking-widest text-center mb-1.5 px-2" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {r.label}
                </div>
                <div className="grid grid-cols-2 gap-3 px-3 text-xs sm:text-sm">
                  {r.gb ? (
                    <GBBar text={r.a} color={COLORS.a} />
                  ) : (
                    <span className="font-medium break-words text-center" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {r.a || "—"}
                    </span>
                  )}
                  {r.gb ? (
                    <GBBar text={r.b} color={COLORS.b} />
                  ) : (
                    <span className="font-medium break-words text-center" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
                      {r.b || "—"}
                    </span>
                  )}
                </div>
                {showBar && <MiniBar scoreA={sArow} scoreB={sBrow} />}
              </div>
            );
          })}

          {sec.scoreKey && (typeof sA[sec.scoreKey] === "number" || typeof sB[sec.scoreKey] === "number") && (
            <div className="py-2.5 border-b" style={{ borderColor: COLORS.line, backgroundColor: "#FAFBFD" }}>
              <div className="text-[10px] uppercase tracking-widest text-center mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
                🏆 Puntuación del sector
              </div>
              <div className="grid grid-cols-2 gap-3 px-3">
                <ScoreBar value={sA[sec.scoreKey]} color={COLORS.a} />
                <ScoreBar value={sB[sec.scoreKey]} color={COLORS.b} />
              </div>
            </div>
          )}
        </div>
      ))}

      <p className="text-[9px] text-center px-4 py-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        * Cuando el fabricante no especifica el dato aquí, se muestra el valor típico de su gama. Las barras pequeñas derivan su puntuación del texto de cada característica.
      </p>
    </div>
  );
}
