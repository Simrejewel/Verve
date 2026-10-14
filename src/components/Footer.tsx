import React from 'react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category | 'All' | 'About' | 'Contact') => void;
  onOpenSEO: () => void;
  onOpenNewsletter: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSEO,
  onOpenNewsletter,
}) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('All');
              }}
              className="brand-wordmark"
            >
              VERVE
              <span className="brand-dot" aria-hidden="true" />
            </a>
            <p className="footer-desc">
              The premier digital publication for Gen Z. Exploring the messy, thrilling intersection of college, career, independence, culture, and technology.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Published weekly. Independent & reader-supported.
            </div>
          </div>

          {/* Editorial Sections */}
          <div className="footer-col">
            <h5>Sections</h5>
            <ul className="footer-links">
              <li>
                <a href="/lifestyle" onClick={(e) => { e.preventDefault(); onSelectCategory('Lifestyle'); }}>
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="/student-life" onClick={(e) => { e.preventDefault(); onSelectCategory('Student Life'); }}>
                  Student Life
                </a>
              </li>
              <li>
                <a href="/personal-growth" onClick={(e) => { e.preventDefault(); onSelectCategory('Personal Growth'); }}>
                  Personal Growth
                </a>
              </li>
              <li>
                <a href="/technology" onClick={(e) => { e.preventDefault(); onSelectCategory('Technology'); }}>
                  Technology & AI
                </a>
              </li>
              <li>
                <a href="/culture" onClick={(e) => { e.preventDefault(); onSelectCategory('Culture'); }}>
                  Culture & Society
                </a>
              </li>
              <li>
                <a href="/career" onClick={(e) => { e.preventDefault(); onSelectCategory('Career'); }}>
                  Career & Money
                </a>
              </li>
            </ul>
          </div>

          {/* Magazine & Company */}
          <div className="footer-col">
            <h5>Publication</h5>
            <ul className="footer-links">
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); onSelectCategory('About'); }}>
                  About & Manifesto
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); onSelectCategory('Contact'); }}>
                  Pitch a Story
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenNewsletter}
                  style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.875rem' }}
                >
                  The Sunday Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSEO}
                  style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.875rem' }}
                >
                  SEO & Schema Data
                </button>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); onSelectCategory('Contact'); }}>
                  Fellowships & Internships
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Social */}
          <div className="footer-col">
            <h5>Connect</h5>
            <ul className="footer-links">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram (@vervemag)
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  TikTok (@vervezone)
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                  X / Twitter (@VERVEMagazine)
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                  VERVE Radio / Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © 2026 VERVE Editorial Media LLC. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="/privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: VERVE respects your data privacy. We do not sell user data.'); }}>
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: All articles are copyright to their respective contributing authors and VERVE.'); }}>
              Terms of Service
            </a>
            <span aria-hidden="true">·</span>
            <a href="/licensing" onClick={(e) => { e.preventDefault(); alert('Image Licensing: All images licensed via Unsplash/Pexels verified editorial licenses.'); }}>
              Image Licensing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
