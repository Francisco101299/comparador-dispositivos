// ============================================================================
// src/components/DeviceIcon.jsx
// Ícono estilizado según el tipo de dispositivo (Celular, Laptop, Desktop,
// Tablet). Si en el futuro un dispositivo tiene un campo `image` con una URL
// real, se muestra esa foto en vez del ícono — por ahora ningún dispositivo
// la tiene, así que todos usan el ícono por defecto.
// ============================================================================
import { Smartphone, Laptop, Monitor, Tablet, Watch, PlaneTakeoff } from "lucide-react";
const ICONS = {
  Celular: Smartphone,
  Laptop: Laptop,
  Desktop: Monitor,
  Tablet: Tablet,
  Smartwatch: Watch,
  Dron: PlaneTakeoff,
};
export default function DeviceIcon({ device, size = 40, color, bg }) {
  if (device.image) {
    return (
      <img
        src={device.image}
        alt={device.name}
        width={size}
        height={size}
        className="object-contain rounded-md"
        style={{ width: size, height: size }}
      />
    );
  }

  const Icon = ICONS[device.type] || Smartphone;

  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size, backgroundColor: bg || "#EDEFF3" }}
      aria-hidden="true"
    >
      <Icon size={Math.round(size * 0.55)} color={color || "#5B6270"} strokeWidth={1.75} />
    </div>
  );
}
