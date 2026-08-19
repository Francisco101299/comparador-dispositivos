// ============================================================================
// src/components/CategoryPicker.jsx
// Selector visual grande (3 íconos) para elegir qué categoría de
// dispositivo se va a buscar: Celular, Computadora o Tablet.
// ============================================================================
import { Smartphone, Laptop, Tablet, Watch, PlaneTakeoff, Wrench } from "lucide-react";
import { COLORS } from "../data/theme";

const OPTIONS = [
  { key: "Celular", label: "Celular", icon: Smartphone },
  { key: "Computadora", label: "Computadora", icon: Laptop },
  { key: "Tablet", label: "Tablet", icon: Tablet },
{ key: "Smartwatch", label: "Reloj", icon: Watch },
  { key: "Dron", label: "Dron", icon: PlaneTakeoff },
  { key: "Herramienta", label: "Herramienta", icon: Wrench },
];

export default function CategoryPicker({ value, onChange }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(active ? null : opt.key)}
            aria-pressed={active}
            className="flex flex-col items-center gap-1.5 transition-transform"
            style={{ transform: active ? "scale(1.06)" : "scale(1)" }}
          >
            <div
              className="flex items-center justify-center rounded-2xl transition-colors"
              style={{
                width: 56,
                height: 56,
                backgroundColor: active ? COLORS.a : "transparent",
                border: `2px solid ${active ? COLORS.a : "#2A2F3A"}`,
              }}
            >
              <Icon size={26} color={active ? "#fff" : "#B9BEC9"} strokeWidth={1.75} />
            </div>
            <span
              className="text-[11px] uppercase tracking-wide"
              style={{ color: active ? "#fff" : "#9BA1AD", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
