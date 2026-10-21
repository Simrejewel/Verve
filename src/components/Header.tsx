import React, { useState } from 'react';
import { Bookmark, Search, Moon, Sun, Menu, X, Code2, Globe } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category | 'All' | 'About' | 'Contact';
  onSelectCategory: (cat: Category | 'All' | 'About' | 'Contact') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onOpenSEO: () => void;
  onOpenSearchConsole: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSubscribeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  bookmarksCount,
  onOpenBookmarks,
  onOpenSearch,
  onOpenSEO,
  onOpenSearchConsole,
  theme,
  onToggleTheme,
  onSubscribeClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: Category | 'All' | 'About' | 'Contact' }[] = [
    { label: 'Home', value: 'All' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Student Life', value: 'Student Life' },
    { label: 'Personal Growth', value: 'Personal Growth' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Culture', value: 'Culture' },
    { label: 'About', value: 'About' },
    { label: 'Contact', value: 'Contact' },
  ];

  const handleNavClick = (val: Category | 'All' | 'About' | 'Contact') => {
    onSelectCategory(val);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Editorial Masthead Ribbon */}
      <div className="masthead-strip">
        <div className="container masthead-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>VOL. IV · ISSUE 28</span>
            <span aria-hidden="true">·</span>
            <span>AUTUMN 2026</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: 'var(--text-secondary)' }}>THE INDEPENDENT GEN Z JOURNAL</span>
          </div>
          <div className="masthead-links">
            <span>THURSDAY, OCT 8, 2026</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenSEO}
              className="masthead-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              title="Inspect SEO Meta & Schema"
            >
              <Code2 size={12} />
              <span>SEO Spec</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenSearchConsole}
              className="masthead-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1a73e8', fontWeight: 600 }}
              title="Connect & Verify Google Search Console"
            >
              <Globe size={12} />
              <span>Search Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="site-header">
        <div className="container header-container">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('All');
            }}
            className="brand-wordmark"
            aria-label="VERVE Magazine Homepage"
          >
            VERVE
            <span className="brand-dot" aria-hidden="true" />
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="nav-links" aria-label="Main Navigation">
            {navItems.map((item) => {
              const cleanHref =
                item.value === 'All'
                  ? '/'
                  : item.value === 'About'
                  ? '/about'
                  : item.value === 'Contact'
                  ? '/contact'
                  : `/${item.value.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <a
                  key={item.label}
                  href={cleanHref}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.value);
                  }}
                  className={`nav-link ${currentCategory === item.value ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="header-actions">
            <button
              onClick={onOpenSearch}
              className="icon-btn"
              title="Search articles"
              aria-label="Search articles"
            >
              <Search size={18} />
            </button>

            <button
              onClick={onOpenBookmarks}
              className="icon-btn"
              title="Reading list"
              aria-label="View saved articles"
            >
              <Bookmark size={18} />
              {bookmarksCount > 0 && <span className="badge-count">{bookmarksCount}</span>}
            </button>

            <button
              onClick={onToggleTheme}
              className="icon-btn"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle display theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={onSubscribeClick}
              className="btn-primary"
              style={{ display: 'inline-flex' }}
            >
              Subscribe
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="icon-btn mobile-nav-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'calc(var(--header-height) + 29px)',
            backgroundColor: 'var(--bg-base)',
            zIndex: 88,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            borderBottom: '1px solid var(--border-medium)',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.value)}
              style={{
                textAlign: 'left',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: currentCategory === item.value ? 700 : 500,
                color: currentCategory === item.value ? 'var(--accent-terracotta)' : 'var(--text-main)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSEO();
                }}
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Code2 size={16} /> SEO Tags
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearchConsole();
                }}
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center', borderColor: '#4285F4', color: '#1a73e8' }}
              >
                <Globe size={16} /> Search Console
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSubscribeClick();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </>
  );
};
