/**
 * Centralizado de rastreamento Google Ads e Facebook Pixel
 * Evita duplicação e garante timing correto de conversões
 */

/**
 * Dispara evento de conversão de lead (apenas após sucesso do formulário)
 * Send_to: PHnvCN3244ccEP_4lotD (Conversão - Mora Care)
 */
export function trackLeadConversion() {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-18008620159/PHnvCN3244ccEP_4lotD",
      value: 1.0,
      currency: "BRL",
    });
  }
}

/**
 * Dispara evento de clique no WhatsApp (não é conversão, apenas rastreamento)
 * Send_to: 7b2QCPb1ybccEP_4lotD (Clique WhatsApp)
 */
export function trackWhatsAppClick() {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-18008620159/7b2QCPb1ybccEP_4lotD",
    });
  }
}

/**
 * Dispara evento de Lead no Facebook Pixel
 */
export function trackFacebookLead() {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead");
  }
}

/**
 * Dispara conversão de lead (Google Ads + Facebook Pixel)
 * Use apenas após sucesso comprovado do formulário
 */
export function trackLeadSuccess() {
  trackLeadConversion();
  trackFacebookLead();
}
