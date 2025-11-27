import { useEffect, Suspense, lazy, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import GitHubStats from './components/GitHubStats';
import Timeline from './components/Timeline';
import ParticleCanvas from './components/ParticleCanvas';
import LoadingScreen from './components/LoadingScreen';

// Lazy load Three.js component for better initial load
const ThreeBackground = lazy(() => import('./components/ThreeBackground'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100,
    });
  }, []);

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <>
      {/* Background Effects */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <ParticleCanvas />
      
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <About />
        
        {/* GitHub Stats Section */}
        <section className="py-12 relative">
          <div className="w-[90%] max-w-7xl mx-auto px-5">
            <h3 className="text-3xl font-bold text-center text-highlight-blue mb-2">
              <i className="fab fa-github mr-3"></i>
              GitHub Activity
            </h3>
            <p className="text-center text-text-muted mb-6">Real-time stats from my GitHub profile</p>
            <GitHubStats />
          </div>
        </section>

        <Skills />
        <Services />
        <Projects />
        <Timeline />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
