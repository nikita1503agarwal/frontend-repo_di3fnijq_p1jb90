import React from 'react';
import { BookOpen, Sparkles, Cards, Wind } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Read the Regulations',
    desc: 'Open and browse the official PDF in a clean reader with search and section anchors.'
  },
  {
    icon: Cards,
    title: 'Flashcards',
    desc: 'Drill key rules and figures with spaced-repetition friendly flashcards.'
  },
  {
    icon: Sparkles,
    title: 'Explainer',
    desc: 'Select text and get a simple breakdown with compliance tips and extracted numbers.'
  },
  {
    icon: Wind,
    title: 'Inspiration',
    desc: 'Discover classic race cars and see aerodynamic insights summarized for learning.'
  }
];

export default function Features() {
  return (
    <section id="features" className="bg-gradient-to-b from-black to-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold">Built for the paddock</h2>
        <p className="mt-2 text-white/70 max-w-2xl">Study fast and stay compliant. Everything you need to understand the rules and build smarter.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-md hover:shadow-lg hover:bg-white/10 transition">
              <f.icon className="h-6 w-6 text-red-400" />
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
