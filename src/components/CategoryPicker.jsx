// ============================================================================
// src/components/CategoryPicker.jsx
// Dos botones grandes: TECNOLOGÍA y HERRAMIENTAS. Al tocarlos se despliega
// el menú de subcategorías (celulares, drones, tablets... / taladros,
// percutores, atornilladores...). La elección filtra el buscador.
// ============================================================================
import { useState } from "react";
import { Cpu, Wrench, ChevronDown } from "lucide-react";
import { COLORS } from "../data/theme";

const GROUPS = [
  {
    key: "Tecnologia",
    label: "Tecnología",
    icon: Cpu,
    subs: [
      { key: "Tecnologia", label: "Todo" },
      { key: "Celular", label: "Celulares" },
      { key: "Computadora", label: "Computadoras" },
      { key: "Tablet", label: "Tablets" },
      { key: "Smartwatch", label: "Relojes" },
      { key: "Dron", label: "Drones" },
    ],
  },
  {
    key: "Herramienta",
    label: "Herramientas",
    icon: Wrench,
    subs: [
      { key: "Herramienta", label: "Todas" },
      { key: "Taladro", label: "Taladros" },
      { key: "Rotomartillo", label: "Percutores" },
      { key: "Atornillador", label: "Atornilladores" },
      { key: "Amoladora", label: "Amoladoras" },
      { key: "Sierra", label: "Sierras" },
      { key: "Lijadora", label: "Lijadoras" },
      { key: "Esmeril", label: "Esmeriles" },
      { key: "Soldadora", label: "Soldadoras" },
      { key: "Compresor", label: "Compresores" },
      { key: "Generador", label: "Generadores" },
      { key: "Hidrolavadora", label: "Hidrolavadoras" },
    ],
  },
];

export default function CategoryPicker({ value, onChange }) {
  const [openGroup, setOpenGroup] = useState(null);

  const activeGroup = GROUPS.find((g) => g.subs.some((s) => s.key === value));

  return (
    <div className="mb-5">
      <div className="flex items-center justify-center gap-8">
        {GROUPS.map((g) => {
          const Icon = g.icon;
          const active = activeGroup && activeGroup.key === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setOpenGroup(openGroup === g.key ? null : g.key)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="flex items-center justify-center rounded-2xl transition-colors"
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: active ? COLORS.a : "transparent",
                  border: `2px solid ${active ? COLORS.a : "#2A2F3A"}`,
                }}
              >
                <Icon size={28} color={active ? "#fff" : "#B9BEC9"} strokeWidth={1.75} />
              </div>
              <span
                className="text-[11px] uppercase tracking-wide flex items-center gap-1"
                style={{ color: active ? "#fff" : "#9BA1AD", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {g.label} <ChevronDown size={12} />
              </span>
            </button>
          );
        })}
      </div>

      {openGroup && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {GROUPS.find((g) => g.key === openGroup).subs.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => onChange(value === s.key ? null : s.key)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: value === s.key ? COLORS.a : "#2A2F3A",
                color: value === s.key ? "#fff" : "#B9BEC9",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
                }
