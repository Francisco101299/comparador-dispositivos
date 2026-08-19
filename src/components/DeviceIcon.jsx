// ============================================================================
// src/components/DeviceIcon.jsx
// Foto real si el dispositivo tiene `image`; si no, foto fija por categoría
// (tecnología: Unsplash / herramientas: fotos de producto); si la foto falla,
// ícono de respaldo.
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
  Taladro: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/3fa2fa74e-de1e-477b-a386-966c6d8d4f3e6577.png"],
  Atornillador: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/0fa2fa74e-de1e-477b-a386-966c6d8d4f3e7969.png"],
  Rotomartillo: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/1fa2fa74e-de1e-477b-a386-966c6d8d4f3e4242.png"],
  Amoladora: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/6fa2fa74e-de1e-477b-a386-966c6d8d4f3e5684.png"],
  Esmeril: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/2fa2fa74e-de1e-477b-a386-966c6d8d4f3e3545.png"],
  Sierra: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/0fa2fa74e-de1e-477b-a386-966c6d8d4f3e1862.png"],
  Lijadora: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/0fa2fa74e-de1e-477b-a386-966c6d8d4f3e8363.png"],
  Compresor: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/4fa2fa74e-de1e-477b-a386-966c6d8d4f3e3141.png"],
  Generador: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/0fa2fa74e-de1e-477b-a386-966c6d8d4f3e4514.png"],
  Hidrolavadora: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/1fa2fa74e-de1e-477b-a386-966c6d8d4f3e2116.png"],
  Soldadora: ["https://image.qwenlm.ai/public_source/dbabf79d-c786-4935-8f94-5a03c12d5b53/2fa2fa74e-de1e-477b-a386-966c6d8d4f3e3031.png"],
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
        src={photo}
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
