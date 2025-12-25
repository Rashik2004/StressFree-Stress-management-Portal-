import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-0 relative overflow-hidden font-sans rounded-t-2xl transition-colors duration-500">
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="md:w-1/3 flex flex-col gap-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 22H22L12 2Z" className="fill-accent"/>
                    <path d="M12 6L4.5 21H19.5L12 6Z" className="fill-primary"/>
                    <path d="M12 10L7 20H17L12 10Z" className="fill-accent"/>
                </svg>
               </div>
               <span className="text-2xl font-bold tracking-wide text-primary-foreground">STRESSFREE</span>
            </div>

            <p className="text-primary-foreground/80 leading-relaxed max-w-sm">
              Empowering you with advanced tools to manage stress, improve mental well-being, and find your inner peace.
            </p>

            {/* Social Icons */}
            <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors"><span className="sr-only">X</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zl-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#" className="hover:text-accent transition-colors"><span className="sr-only">LinkedIn</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#" className="hover:text-accent transition-colors"><span className="sr-only">Instagram</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="#" className="hover:text-accent transition-colors"><span className="sr-only">Facebook</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 px-4 py-2 border border-primary-foreground/50 hover:border-white transition-colors w-fit uppercase text-sm tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              Back to Top
            </button>
          </div>

          <div className="md:w-1/2 flex justify-between md:justify-end gap-16 md:gap-32">
            {/* Site Map */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-lg">Site Map</h4>
              <ul className="flex flex-col gap-4 text-primary-foreground/80">
                <li><Link to="/" className="hover:text-accent transition-colors">Homepage</Link></li>
                <li><Link to="/meditations" className="hover:text-accent transition-colors">Meditations</Link></li>
                <li><Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
                <li><Link to="/journal" className="hover:text-accent transition-colors">Journal</Link></li>
                <li><Link to="/community" className="hover:text-accent transition-colors">Community</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-lg">Legal</h4>
              <ul className="flex flex-col gap-4 text-primary-foreground/80">
                <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Services</Link></li>
                <li><Link to="/guidelines" className="hover:text-accent transition-colors">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary/90 text-primary-foreground/60 py-4 px-8 text-center text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} StressFree. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
