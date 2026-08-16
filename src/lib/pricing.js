// ============================================================================
// src/lib/pricing.js
// Sistema de precios con prioridad:
//   1. Precio local específico del dispositivo (device.priceByCountry[code])
//   2. Conversión aproximada desde el precio base en USD (fallback)
//   3. "Precio no disponible" si no hay ningún precio válido
//
// Para agregar un precio local a un dispositivo en src/data/devices.js,
// agrega el campo priceByCountry junto a price, por ejemplo:
//
//   price: "$999",
//   priceByCountry: {
//     MX: { price: 25999, source: "Precio de referencia", exact: true },
//     CR: { price: 599000, source: "Precio de referencia", exact: true },
//   },
//
// No es obligatorio — un dispositivo sin priceByCountry sigue funcionando
// normal, usando la conversión aproximada como antes.
// ============================================================================

// Países: factor de mercado (impuestos/importación), factor Apple (recargo
// mayor), moneda local y tipo de cambio aproximado (moneda por 1 USD).
// Se usan SOLO como fallback, cuando el dispositivo no tiene priceByCountry
// para el país seleccionado.
export const COUNTRIES = [
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

export function isAppleDevice(name) {
  return /iphone|ipad|macbook|imac|mac mini|mac studio|mac pro/i.test(name || "");
}

// Convierte un precio base en formato string ("$999", "$1,199", "€1.199")
// a un número. Reemplaza al parseInt() anterior, que interpretaba mal
// separadores de miles/decimales. Asume que el precio base siempre está
// en formato USD del catálogo ("$1,199" = mil ciento noventa y nueve).
function parseUsdAmount(value) {
  if (typeof value === "number" && !isNaN(value)) return value;
  if (!value || typeof value !== "string") return null;
  // Deja solo dígitos, puntos y comas
  let cleaned = value.replace(/[^0-9.,]/g, "");
  if (!cleaned) return null;
  // En el catálogo, la coma siempre es separador de miles (formato US),
  // así que se elimina antes de convertir a número.
  cleaned = cleaned.replace(/,/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

function formatCurrency(amount, country) {
  try {
    return new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${country.currency}`;
  }
}

/**
 * Resuelve el precio a mostrar para un dispositivo en un país dado.
 * @returns {{ text: string, label: string, isEstimate: boolean, available: boolean }}
 */
export function resolvePrice(device, countryCode) {
  const country = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  // 1. Precio local específico del dispositivo
  const local = device.priceByCountry && device.priceByCountry[countryCode];
  if (local && typeof local.price === "number" && !isNaN(local.price)) {
    return {
      text: formatCurrency(local.price, country),
      label: local.source || "Precio de referencia",
      isEstimate: false,
      available: true,
    };
  }

  // 2. Conversión aproximada desde el precio base en USD
  const baseUsd = parseUsdAmount(device.price);
  if (baseUsd !== null) {
    const factor = isAppleDevice(device.name) ? country.appleFactor : country.factor;
    let converted = baseUsd * factor * country.rate;
    // En monedas de valores altos (colones, pesos...) redondea a miles para leer mejor
    converted = converted >= 100000 ? Math.round(converted / 1000) * 1000 : Math.round(converted);
    return {
      text: `≈ ${formatCurrency(converted, country)}`,
      label: "Estimación por conversión",
      isEstimate: true,
      available: true,
    };
  }

  // 3. No hay ningún precio válido
  return {
    text: "Precio no disponible",
    label: "",
    isEstimate: false,
    available: false,
  };
   }
