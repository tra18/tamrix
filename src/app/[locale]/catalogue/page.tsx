import { CatalogueClient } from "./CatalogueClient";
import { getDictionary } from "@/i18n/get-dictionary";
import { getApplications } from "@/data/applications";
import { locales, type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CataloguePage({ params }: PageProps) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const applications = getApplications(dict);

  return (
    <CatalogueClient
      applications={applications}
      locale={loc}
      dict={dict}
    />
  );
}
