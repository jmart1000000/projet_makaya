import { useState } from "react";
import { LanguageProvider } from "./components/LanguageContext.jsx";
import { ToastProvider } from "./components/ToastContext.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Pillars from "./components/Pillars.jsx";
import Mission from "./components/Mission.jsx";
import ImpactStats from "./components/ImpactStats.jsx";
import HaitiMap from "./components/HaitiMap.jsx";
import Programs from "./components/Programs.jsx";
import Team from "./components/Team.jsx";
import Gallery from "./components/Gallery.jsx";
import Video from "./components/Video.jsx";
import Faq from "./components/Faq.jsx";
import News from "./components/News.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import DonationModal from "./components/DonationModal.jsx";
import useReveal from "./useReveal.js";

function MainApp() {
  useReveal();
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const handleOpenDonate = () => setIsDonateOpen(true);
  const handleCloseDonate = () => setIsDonateOpen(false);

  return (
    <>
      <Header onOpenDonate={handleOpenDonate} />
      <main>
        <Hero onOpenDonate={handleOpenDonate} />
        <Pillars />
        <Gallery />
        <Mission onOpenDonate={handleOpenDonate} />
        <ImpactStats onOpenDonate={handleOpenDonate} />
        <HaitiMap />
        <Programs onOpenDonate={handleOpenDonate} />
        <Team />
        
        <Video />
        <Faq />
        <News />
        <Contact />
      </main>
      <Footer />

      <DonationModal isOpen={isDonateOpen} onClose={handleCloseDonate} />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <MainApp />
      </ToastProvider>
    </LanguageProvider>
  );
}
