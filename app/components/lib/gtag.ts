declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
export {};

export const trackConversion = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18273533155/GrcfCPfb4cUcEOP5v4lE",
      value: 1.0,
      currency: "ARS",
    });
  }
};