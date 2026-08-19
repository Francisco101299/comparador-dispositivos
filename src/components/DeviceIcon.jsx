// ============================================================================
// src/components/DeviceIcon.jsx
// Muestra la foto real del dispositivo si tiene campo `image`; si no, una
// foto genérica de la categoría (Unsplash, licencia libre); si la foto falla,
// el ícono ilustrativo. NO usamos fotos reales de productos con marca por
// derechos de autor.
// ============================================================================
import { useState } from "react";
import { Smartphone, Laptop, Monitor, Tablet, Watch, PlaneTakeoff, Wrench, Hammer, Disc, Gauge, Zap, Droplets, Slice, Eraser, Cog, Flame } from "lucide-react";
const ICONS = {
  Celular: Smartphone,
  Laptop: Laptop,
  Desktop: Monitor,
  Tablet: Tablet,
  Smartwatch: Watch,
  Dron: PlaneTakeoff,
  Taladro: Cog,
  Amoladora: Disc,
  Atornillador: Wrench,
  Rotomartillo: Hammer,
  Sierra: Slice,
  Lijadora: Eraser,
  Esmeril: Disc,
  Compresor: Gauge,
  Generador: Zap,
  Hidrolavadora: Droplets,
  Soldadora: Flame,
};


// Fotos genéricas por categoría (Unsplash, licencia libre). Varias variantes
// para que no todos los dispositivos del mismo tipo muestren la misma foto.
const PHOTOS = {
  Celular: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505",
  ],
  Laptop: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  ],
  Desktop: [
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
  ],
  Tablet: [
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    "https://images.unsplash.com/photo-1561154464-82e9adf327c7",
  ],
  Smartwatch: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1544117519-31a4b719223d",
  ],
  Dron: [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
  ],
  Taladro: ["https://images.unsplash.com/photo-1504148456320-7d9474199363"],
  Rotomartillo: ["https://images.unsplash.com/photo-1530124566582-618bc91cc6ac"],
  Atornillador: ["https://images.unsplash.com/photo-1504148456320-7d9474199363"],
  Amoladora: ["https://images.unsplash.com/photo-1555628932-35151b3a5e1f"],
  Sierra: ["https://images.unsplash.com/photo-1572981779307-38b8cabb2402"],
  Lijadora: ["https://images.unsplash.com/photo-1580910051074-3eb694886505"],
  Esmeril: ["https://images.unsplash.com/photo-1530124566582-618bc91cc6ac"],
  Compresor: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837"],
  Generador: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"],
  Hidrolavadora: ["https://images.unsplash.com/photo-1581093458791-9d42e3c7e117"],
  Soldadora: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1"],
};

function hashId(id) {
  let h = 0;
  for (const c of id || "") h += c.charCodeAt(0);
  return h;
}

export default function DeviceIcon({ device, size = 40, color, bg }) {
  const [failed, setFailed] = useState(false);

  const photos = PHOTOS[device.type] || [];
  const photo =
    device.image || (photos.length ? photos[hashId(device.id) % photos.length] : null);

  if (photo && !failed) {
    return (
      <img
        src={`${photo}?auto=format&fit=crop&w=160&q=60`}
        alt={device.name}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="object-cover rounded-md shrink-0"
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
