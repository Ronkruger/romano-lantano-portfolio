import About from '../components/About';
import Contact from '../components/Contact';
import GitHubStats from '../components/GitHubStats';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Timeline from '../components/Timeline';

const HomePage = () => {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <GitHubStats />
      <Skills />
      <Services />
      <Projects />
      <Timeline />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;