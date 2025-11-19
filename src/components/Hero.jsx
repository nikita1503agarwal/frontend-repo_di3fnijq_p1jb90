import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            STEM Racing • Learning Suite
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            How to build a legal car
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Master the Professional Class technical regulations with flashcards, explainers, and real-world inspiration. Built with a dynamic motorsport vibe.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={onGetStarted} className="rounded-full bg-red-600 hover:bg-red-500 transition px-6 py-3 font-semibold shadow-lg shadow-red-600/30">Get started</button>
            <a href="#features" className="rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 transition">Explore features</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
