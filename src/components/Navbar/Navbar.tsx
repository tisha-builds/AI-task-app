import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (isDashboard) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-14 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-heading font-bold text-gray-900 text-sm tracking-tight">TaskMind</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
            ← Back to home
          </Link>
          <div className="w-7 h-7 rounded-full bg-brand-700 text-white text-xs flex items-center justify-center font-semibold">
            JD
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-700 flex items-center justify-center shadow-sm">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-heading font-bold text-gray-900 tracking-tight">TaskMind</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {['Features', 'Pricing', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className="text-sm text-gray-700 hover:text-brand-700 transition-colors font-medium">
            Log in
          </Link>
          <Link to="/dashboard" className="btn-primary text-sm py-2">
            Start free →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2">
          {['Features', 'Pricing', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="py-2 text-sm text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link to="/dashboard" className="btn-secondary w-full justify-center text-sm py-2.5">
              Log in
            </Link>
            <Link to="/dashboard" className="btn-primary w-full justify-center text-sm py-2.5">
              Start free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
