import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/Navigation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Hero } from '@/sections/Hero';
import { History } from '@/sections/History';
import { Gallery } from '@/sections/Gallery';
import { Services } from '@/sections/Services';
import { Process } from '@/sections/Process';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Navigation />
      <main>
        <Hero />
        <History />
        <Gallery />
        <div id="servicios">
          <Services />
        </div>
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
