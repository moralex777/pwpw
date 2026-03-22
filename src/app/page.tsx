import HeroSection from "@/components/HeroSection";
import GenezaSection from "@/components/GenezaSection";
import FilozofiaSection from "@/components/FilozofiaSection";
import QuotesSection from "@/components/QuotesSection";
import ToastSection from "@/components/ToastSection";
import SiteFooter from "@/components/SiteFooter";
import CorkEntry from "@/components/CorkEntry";
import WinoMetr from "@/components/WinoMetr";
import TimeTheme from "@/components/TimeTheme";

export default function Home() {
  return (
    <>
      <CorkEntry />
      <HeroSection />
      <GenezaSection />
      <FilozofiaSection />
      <QuotesSection />
      <ToastSection />
      <SiteFooter />
      <WinoMetr />
      <TimeTheme />
    </>
  );
}
