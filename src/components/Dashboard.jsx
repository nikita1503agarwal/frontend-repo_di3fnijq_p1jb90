import React, { useEffect, useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { BookOpen, Download, FileText, Sparkles, Cards, Link2 } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Section({ title, children, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur">
      <div className="flex items-center gap-2 text-white">
        {Icon && <Icon className="h-5 w-5 text-red-400" />}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="mt-4 text-white/90 text-sm">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [docTitle, setDocTitle] = useState('STEM Racing Professional Class Technical Regulations');
  const [docList, setDocList] = useState([]);

  const [selectedText, setSelectedText] = useState('');
  const [explain, setExplain] = useState(null);

  const [flashcards, setFlashcards] = useState([]);
  const [flashCount, setFlashCount] = useState(6);
  const [flashTag, setFlashTag] = useState('general');
  const [activeDoc, setActiveDoc] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/regulations`).then(r => r.json()).then(setDocList).catch(() => {});
  }, []);

  const handleImport = async () => {
    if (!pdfUrl) return;
    const res = await fetch(`${API}/api/regulations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: docTitle, source_url: pdfUrl })
    });
    const data = await res.json();
    await refreshDocs();
    setActiveDoc(data.id);
  };

  const refreshDocs = async () => {
    const d = await fetch(`${API}/api/regulations`).then(r => r.json());
    setDocList(d);
  };

  const openDoc = async (id) => {
    setActiveDoc(id);
    const d = await fetch(`${API}/api/regulations/${id}`).then(r => r.json());
    // Prefill selection for demo
    setSelectedText(d.text?.slice(0, 400) || '');
  };

  const runExplain = async () => {
    if (!selectedText) return;
    const out = await fetch(`${API}/api/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: selectedText })
    }).then(r => r.json());
    setExplain(out);
  };

  const genFlashcards = async () => {
    const out = await fetch(`${API}/api/flashcards/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doc_id: activeDoc, text: selectedText || undefined, count: flashCount, tag: flashTag })
    }).then(r => r.json());
    setFlashcards(out);
  };

  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold">Workspace</h2>
        <p className="text-white/70">Import the regulations PDF, create flashcards, get explanations, and explore inspiration.</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Section title="Import Regulations PDF" icon={Download}>
              <div className="flex flex-col md:flex-row gap-3">
                <input className="flex-1 rounded-xl bg-white/5 border border-white/10 p-3" placeholder="Paste PDF URL (public)" value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} />
                <input className="md:w-80 rounded-xl bg-white/5 border border-white/10 p-3" placeholder="Document title" value={docTitle} onChange={e => setDocTitle(e.target.value)} />
                <button className="rounded-xl bg-red-600 hover:bg-red-500 px-4 font-semibold" onClick={handleImport}>Import</button>
              </div>
              <div className="mt-3 text-xs text-white/60">Tip: You can also open an imported doc from the list on the right.</div>
            </Section>

            <Section title="Explainer" icon={Sparkles}>
              <textarea className="w-full min-h-[140px] rounded-xl bg-white/5 border border-white/10 p-3" placeholder="Paste any regulation text or select from a document" value={selectedText} onChange={e => setSelectedText(e.target.value)} />
              <div className="mt-3 flex gap-3">
                <button onClick={runExplain} className="rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2 font-semibold">Explain</button>
              </div>
              {explain && (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="font-semibold">Summary</div>
                  <p className="text-white/80 text-sm mt-1">{explain.summary}</p>
                  <div className="mt-3 font-semibold">Highlights</div>
                  <ul className="list-disc pl-5 text-white/80 text-sm mt-1 space-y-1">
                    {explain.bullets?.map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                </div>
              )}
            </Section>

            <Section title="Flashcards" icon={Cards}>
              <div className="flex flex-wrap gap-3 items-center">
                <label className="text-white/80 text-sm">Count</label>
                <input type="number" min={1} max={20} className="w-24 rounded-xl bg-white/5 border border-white/10 p-2" value={flashCount} onChange={e => setFlashCount(parseInt(e.target.value || '0'))} />
                <label className="text-white/80 text-sm">Tag</label>
                <input className="w-40 rounded-xl bg-white/5 border border-white/10 p-2" value={flashTag} onChange={e => setFlashTag(e.target.value)} />
                <button onClick={genFlashcards} className="ml-auto rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2 font-semibold">Generate</button>
              </div>

              {flashcards.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {flashcards.map((c) => (
                    <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">{c.tag || 'untagged'}</div>
                      <div className="mt-2 font-semibold">Q: {c.question}</div>
                      <div className="mt-2 text-white/80 text-sm">A: {c.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </div>

          <div className="space-y-6">
            <Section title="Your documents" icon={FileText}>
              <div className="space-y-2">
                {docList.length === 0 && (
                  <div className="text-white/60 text-sm">No documents yet. Import a PDF to get started.</div>
                )}
                {docList.map((d) => (
                  <button key={d.id} onClick={() => openDoc(d.id)} className={`w-full text-left rounded-xl p-3 border transition ${activeDoc === d.id ? 'bg-white/15 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div className="font-semibold text-sm">{d.title}</div>
                    <div className="text-xs text-white/60 truncate">{d.source_url}</div>
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Read the document" icon={BookOpen}>
              {activeDoc ? (
                <a href={`${API}/api/regulations/${activeDoc}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-sm">
                  <Link2 className="h-4 w-4" /> Open raw text
                </a>
              ) : (
                <div className="text-white/60 text-sm">Open a document to view.</div>
              )}
            </Section>

            <InspirationSection />
          </div>
        </div>
      </div>
    </section>
  );
}

function InspirationSection() {
  const [query, setQuery] = useState('Ferrari F2004');
  const [result, setResult] = useState(null);

  const run = async () => {
    const out = await fetch(`${API}/api/inspiration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }).then(r => r.json());
    setResult(out);
  };

  return (
    <Section title="Inspiration" icon={BookOpen}>
      <div className="flex gap-2">
        <input className="flex-1 rounded-xl bg-white/5 border border-white/10 p-2" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a car (e.g., McLaren MP4/4)" />
        <button onClick={run} className="rounded-xl bg-red-600 hover:bg-red-500 px-4 font-semibold">Analyze</button>
      </div>
      {result && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
          <div className="font-semibold">{result.car}</div>
          <p className="text-white/80 mt-1">{result.summary}</p>
          <div className="mt-2 font-semibold">Aero highlights</div>
          <ul className="list-disc pl-5 text-white/80 space-y-1">
            {result.aero_highlights?.map((h, i) => (<li key={i}>{h}</li>))}
          </ul>
        </div>
      )}
    </Section>
  );
}
