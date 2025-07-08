'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

type PortfolioData = {
  name: string;
  bio: string;
  skills: { value: string }[];
  projects: { title: string; description: string }[];
  contact: string;
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-indigo-700">My Portfolio</div>
        <ul className="hidden md:flex gap-8 text-indigo-600 font-semibold">
          <li><a href="#hero" className="hover:text-indigo-800">Home</a></li>
          <li><a href="#skills" className="hover:text-indigo-800">Skills</a></li>
          <li><a href="#projects" className="hover:text-indigo-800">Projects</a></li>
          <li><a href="#contact" className="hover:text-indigo-800">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default function PreviewPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) setPortfolioData(JSON.parse(savedData));
  }, []);

  // Download JSON file function
  function downloadPortfolio() {
    if (!portfolioData) return;
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(/\s+/g, '_').toLowerCase()}_portfolio.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  if (!hasMounted) return null;

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center px-6">
        {/* Hero */}
        <motion.section
          id="hero"
          className="max-w-4xl w-full mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700">
            Welcome to my portfolio
          </h1>
          <p className="mt-4 text-indigo-600 text-lg">
            Explore my skills, projects, and contact info below.
          </p>
          <button
            onClick={downloadPortfolio}
            className="mt-6 px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Download Portfolio JSON
          </button>
        </motion.section>

        {!portfolioData ? (
          <div className="text-gray-600 text-lg font-semibold">
            No portfolio data found. Please generate your portfolio first.
          </div>
        ) : (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10"
          >
            <header className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">{portfolioData.name}</h2>
              <p className="text-indigo-500 italic text-lg">{portfolioData.bio}</p>
            </header>

            <section id="skills" className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 border-b border-indigo-200 pb-2 text-indigo-600">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-block bg-indigo-100 text-indigo-700 font-medium px-4 py-1 rounded-full shadow-sm hover:bg-indigo-200 transition cursor-default"
                  >
                    {skill.value}
                  </span>
                ))}
              </div>
            </section>

            <section id="projects" className="mb-10">
              <h3 className="text-2xl font-semibold mb-6 border-b border-indigo-200 pb-2 text-indigo-600">Projects</h3>
              <div className="space-y-8">
                {portfolioData.projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="p-6 border border-indigo-100 rounded-xl shadow-sm hover:shadow-md transition cursor-default"
                  >
                    <h4 className="text-xl font-semibold text-indigo-700 mb-2">{project.title}</h4>
                    <p className="text-gray-700">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <footer id="contact" className="text-center mt-12">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Contact</h3>
              <p className="text-indigo-700 text-lg underline">{portfolioData.contact}</p>
            </footer>
          </motion.div>
        )}
      </main>
    </>
  );
}
