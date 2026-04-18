import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SignalTicker from "@/components/SignalTicker";
import FeaturesSection from "@/components/FeaturesSection";
import SignalsSection from "@/components/SignalsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SignalTicker />
      <FeaturesSection />
      <SignalsSection />
      <Footer />
    </main>
  );
}
