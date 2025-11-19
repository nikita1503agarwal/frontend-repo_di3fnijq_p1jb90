import React from 'react';

export default function Navbar({ onStart }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-red-500 to-red-700" />
          <span className="font-semibold text-white">Legal Car</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#features" className="hover:text-white">Features</a>
          <button onClick={onStart} className="rounded-full bg-red-600 hover:bg-red-500 px-4 py-1.5 font-semibold">Open app</button>
        </nav>
      </div>
    </header>
  );
}
