import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OperatorsSection from "@/components/OperatorsSection";
import AuthoritySection from "@/components/AuthoritySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <OperatorsSection />
        <AuthoritySection />
      </main>
      <Footer />
    </div>
  );
}
