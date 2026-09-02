// ============================================================================
// src/components/CategoryPicker.jsx
// Dos botones grandes: TECNOLOGÍA y HERRAMIENTAS. Al tocarlos se despliega
// el menú de subcategorías (celulares, drones, tablets... / taladros,
// percutores, atornilladores...). La elección filtra el buscador.
// ============================================================================
import { useState } from "react";
import { Cpu, Wrench, ChevronDown } from "lucide-react";
import { COLORS } from "../data/theme";
import { useLanguage } from "../lib/LanguageContext";

export default function CategoryPicker({ value, onChange }) {
  const { t } = useLanguage();
  const [openGroup, setOpenGroup] = useState(null);

  const GROUPS = [
    {
      key: "Tecnologia",
      label: t("category.group.tech"),
      icon: Cpu,
      subs: [
        { key: "Tecnologia", label: t("category.sub.techAll") },
        { key: "Celular", label: t("category.sub.phones") },
        { key: "Computadora", label: t("category.sub.computers") },
        { key: "Tablet", label: t("category.sub.tablets") },
        { key: "Smartwatch", label: t("category.sub.watches") },
        { key: "Dron", label: t("category.sub.drones") },
      ],
    },
    {
      key: "Herramienta",
      label: t("category.group.tools"),
      icon: Wrench,
      subs: [
        { key: "Herramienta", label: t("category.sub.toolsAll") },
        { key: "Taladro", label: t("category.sub.drill") },
        { key: "Rotomartillo", label: t("category.sub.hammerDrill") },
        { key: "Atornillador", label: t("category.sub.screwdriver") },
        { key: "Amoladora", label: t("category.sub.grinder") },
        { key: "Sierra", label: t("category.sub.saw") },
        { key: "Lijadora", label: t("category.sub.sander") },
        { key: "Esmeril", label: t("category.sub.benchGrinder") },
        { key: "Soldadora", label: t("category.sub.welder") },
        { key: "Compresor", label: t("category.sub.compressor") },
        { key: "Generador", label: t("category.sub.generator") },
        { key: "Hidrolavadora", label: t("category.sub.pressureWasher") },
      ],
    },
  ];

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
