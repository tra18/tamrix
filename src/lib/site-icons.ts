import type { Metadata } from "next";

/** Favicon / PWA icons — logo Tamrix pour onglet, favoris et suggestions navigateur. */
export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
    { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  shortcut: "/icons/favicon-32.png",
};
