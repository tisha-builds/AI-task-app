import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center">
                <Zap size={13} className="text-white" />
              </div>
              <span className="font-heading font-bold text-white text-sm">TaskMind</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered task prioritization for focused professionals.
            </p>
          </div>

          {[
            {
              heading: 'Product',
              links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
            },
            {
              heading: 'Company',
              links: ['About', 'Blog', 'Careers', 'Press'],
            },
            {
              heading: 'Legal',
              links: ['Privacy', 'Terms', 'Security', 'Cookies'],
            },
          ].map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                {col.heading}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs">© 2026 TaskMind. All rights reserved.</span>
          <span className="text-xs">Built with React + Vite + TailwindCSS</span>
        </div>
      </div>
    </footer>
  );
}
