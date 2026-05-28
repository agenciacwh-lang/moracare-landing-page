export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Mora Care — integrações
  botconversaWebhookUrl: process.env.BOTCONVERSA_WEBHOOK_URL ?? "",
  googleSheetsWebhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "",
  fbPixelId: process.env.FB_PIXEL_ID ?? "",
  fbCapiToken: process.env.FB_CAPI_TOKEN ?? "",
  siteUrl: process.env.SITE_URL ?? "https://www.moracare.com.br",
};
