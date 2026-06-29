import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr").then((m) => m.dictionary),
  en: () => import("./dictionaries/en").then((m) => m.dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
