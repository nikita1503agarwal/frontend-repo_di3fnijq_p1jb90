import React, { useRef } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const appRef = useRef(null);
  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onStart={scrollToApp} />
      <Hero onGetStarted={scrollToApp} />
      <Features />
      <div ref={appRef}>
        <Dashboard />
      </div>
      <footer className="bg-black/80 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-white/60">
          Built for STEM Racing • Inspired by F1 aesthetics
        </div>
      </footer>
    </div>
  );
}

export default App;
