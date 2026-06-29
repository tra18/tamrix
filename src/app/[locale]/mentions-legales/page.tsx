import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";
import { LegalPageContent } from "@/components/LegalPageContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.legal.noticeTitle,
    description: dict.legal.noticeDescription,
  };
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <LegalPageContent dict={dict} type="notice" />;
}
