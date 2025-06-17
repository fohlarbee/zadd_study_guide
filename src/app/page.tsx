import HeroSection from "@/components/heroSection";
import HomeBanner from "@/components/HomeBanner";
import Navbar from "@/components/navbar";
import OutlineSection from "@/components/outlineSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <HeroSection/>
      <OutlineSection/>
    </>
  );
}
