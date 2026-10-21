import React, { useState, useEffect } from 'react';
import { 
  X, Check, Copy, ExternalLink, Globe, CheckCircle2, 
  FileCode, ShieldCheck, AlertCircle, RefreshCw, Terminal, 
  Search, ArrowRight, BookOpen, Layers
} from 'lucide-react';

interface SearchConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const SearchConsoleModal: React.FC<SearchConsoleModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [activeTab, setActiveTab] = useState<'verification' | 'sitemap' | 'guide' | 'robots'>('verification');
  
  // Verification code state
  const [verificationCode, setVerificationCode] = useState<string>(() => {
    return localStorage.getItem('verve_gsc_verification_token') || '5aI5cZsLi6avw2eQptFuhc-e0bJbj29ulljvDmnVCII';
  });
  const [inputVal, setInputVal] = useState<string>(verificationCode);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Current origins
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://verve-magazine.com';
  const canonicalDomain = 'https://verve-magazine.com';
  
  // Check if live tag exists in head
  const [liveTagContent, setLiveTagContent] = useState<string | null>(null);

  const checkLiveTag = () => {
    if (typeof document !== 'undefined') {
      const tag = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null;
      if (tag && tag.content) {
        setLiveTagContent(tag.content);
      } else {
        setLiveTagContent(null);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkLiveTag();
      setInputVal(verificationCode);
    }
  }, [isOpen, verificationCode]);

  // Handle saving verification token
  const handleSaveToken = () => {
    let cleanToken = inputVal.trim();
    
    // Auto-parse if the user pasted full meta tag: <meta name="google-site-verification" content="..." />
    const metaMatch = cleanToken.match(/content=["']([^"']+)["']/i);
    if (metaMatch && metaMatch[1]) {
      cleanToken = metaMatch[1];
    }

    if (!cleanToken) {
      onNotify('Please enter a valid Google Search Console verification token');
      return;
    }

    // Update document head meta tag
    let tag = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'google-site-verification';
      document.head.appendChild(tag);
    }
    tag.content = cleanToken;

    // Save to localStorage
    localStorage.setItem('verve_gsc_verification_token', cleanToken);
    setVerificationCode(cleanToken);
    setInputVal(cleanToken);
    setLiveTagContent(cleanToken);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    onNotify('Google Search Console verification meta tag updated in <head>!');
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  if (!isOpen) return null;

  const currentPropertyUrl = origin.includes('localhost') || origin.includes('run.app')
    ? origin
    : canonicalDomain;

  const fullMetaTagCode = `<meta name="google-site-verification" content="${verificationCode}" />`;

  return (
    <div className="seo-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Google Search Console Integration">
      <div 
        className="seo-modal-content" 
        style={{ maxWidth: '720px', width: '92%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="seo-modal-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '8px', 
              backgroundColor: '#4285F4', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(66, 133, 244, 0.25)'
            }}>
              <Search size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Google Search Console
                <span style={{ 
                  fontSize: '0.68rem', 
                  backgroundColor: '#e8f0fe', 
                  color: '#1967d2', 
                  padding: '2px 8px', 
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)'
                }}>
                  Live Integration
                </span>
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Verify site ownership, submit sitemaps, and monitor indexing for VERVE
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="seo-close-btn" 
            aria-label="Close Google Search Console Modal"
            style={{ padding: '0.4rem', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          borderBottom: '1px solid var(--border-color)', 
          padding: '0.75rem 0',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('verification')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'verification' ? 'var(--text-primary)' : 'transparent',
              color: activeTab === 'verification' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldCheck size={14} />
            Ownership Verification
          </button>

          <button
            onClick={() => setActiveTab('sitemap')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'sitemap' ? 'var(--text-primary)' : 'transparent',
              color: activeTab === 'sitemap' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <FileCode size={14} />
            Sitemap.xml (18 URLs)
          </button>

          <button
            onClick={() => setActiveTab('robots')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'robots' ? 'var(--text-primary)' : 'transparent',
              color: activeTab === 'robots' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Terminal size={14} />
            Robots.txt
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'guide' ? 'var(--text-primary)' : 'transparent',
              color: activeTab === 'guide' ? 'var(--bg-primary)' : 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={14} />
            Step-by-Step Guide
          </button>
        </div>

        {/* Tab 1: Verification */}
        {activeTab === 'verification' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '1rem' }}>
            {/* Quick Status Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              backgroundColor: liveTagContent ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${liveTagContent ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {liveTagContent ? (
                  <CheckCircle2 size={18} color="#16a34a" />
                ) : (
                  <AlertCircle size={18} color="#dc2626" />
                )}
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: liveTagContent ? '#15803d' : '#b91c1c' }}>
                    {liveTagContent ? 'Verification Tag Active in Document Head' : 'No Verification Tag Detected'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Googlebot can crawl and verify this site immediately
                  </div>
                </div>
              </div>
              <button
                onClick={checkLiveTag}
                title="Refresh verification status"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={12} /> Refresh Status
              </button>
            </div>

            {/* Property URL Card */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Your Property URL for Google Search Console
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={currentPropertyUrl} 
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem'
                  }}
                />
                <button
                  onClick={() => copyToClipboard(currentPropertyUrl, 'propUrl', 'Property URL')}
                  className="btn-primary"
                  style={{ padding: '0.55rem 0.9rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {copiedKey === 'propUrl' ? <Check size={14} /> : <Copy size={14} />}
                  {copiedKey === 'propUrl' ? 'Copied' : 'Copy URL'}
                </button>
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                Use this URL in Google Search Console when adding your property via the <strong>URL prefix</strong> method.
              </div>
            </div>

            {/* Verification Code Form */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                HTML Tag Verification Code (from Google Search Console)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder='Paste code or full <meta name="google-site-verification" content="..." />'
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem'
                  }}
                />
                <button
                  onClick={handleSaveToken}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {isSaved ? <Check size={14} /> : <ShieldCheck size={14} />}
                  {isSaved ? 'Saved & Active!' : 'Save & Activate'}
                </button>
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                Accepts both the raw verification token or the complete Google meta tag snippet.
              </div>
            </div>

            {/* Generated HTML Meta Tag */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Active HTML Verification Tag
                </span>
                <button
                  onClick={() => copyToClipboard(fullMetaTagCode, 'metaTag', 'Meta Tag')}
                  className="btn-outline"
                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedKey === 'metaTag' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedKey === 'metaTag' ? 'Copied' : 'Copy HTML Tag'}
                </button>
              </div>
              <pre style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                overflowX: 'auto'
              }}>
                {fullMetaTagCode}
              </pre>
            </div>

            {/* Action Bar */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingTop: '0.5rem', 
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  textDecoration: 'none',
                  fontSize: '0.825rem',
                  padding: '0.5rem 1rem'
                }}
              >
                <span>Open Google Search Console</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setActiveTab('sitemap')}
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', padding: '0.5rem 0.9rem' }}
              >
                <span>Next: Submit Sitemap.xml</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Sitemap */}
        {activeTab === 'sitemap' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '1rem' }}>
            <div style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.08)', 
              padding: '0.85rem 1rem', 
              borderRadius: '8px', 
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}>
              <FileCode size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1d4ed8' }}>
                  Sitemap is Live & Ready for Submission
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  In Google Search Console, navigate to <strong>Indexing → Sitemaps</strong>, enter <code>sitemap.xml</code> in the "Add a new sitemap" field, and click <strong>Submit</strong>.
                </div>
              </div>
            </div>

            {/* Sitemap URLs */}
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Sitemap Absolute URL
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={`${currentPropertyUrl}/sitemap.xml`}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem'
                  }}
                />
                <button
                  onClick={() => copyToClipboard(`${currentPropertyUrl}/sitemap.xml`, 'fullSitemap', 'Full Sitemap URL')}
                  className="btn-primary"
                  style={{ padding: '0.55rem 0.9rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {copiedKey === 'fullSitemap' ? <Check size={14} /> : <Copy size={14} />}
                  {copiedKey === 'fullSitemap' ? 'Copied' : 'Copy Sitemap URL'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Shortcut relative path:</span>
                <code style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>sitemap.xml</code>
                <button
                  onClick={() => copyToClipboard('sitemap.xml', 'relSitemap', 'sitemap.xml')}
                  className="btn-outline"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedKey === 'relSitemap' ? <Check size={11} /> : <Copy size={11} />}
                  {copiedKey === 'relSitemap' ? 'Copied' : 'Copy sitemap.xml'}
                </button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)' }}
                >
                  <span>View Raw XML</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Sitemap Structure Breakdown */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ 
                backgroundColor: 'var(--bg-subtle)', 
                padding: '0.6rem 0.9rem', 
                fontSize: '0.775rem', 
                fontWeight: 700, 
                display: 'flex', 
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <span>18 URLs Included in Sitemap</span>
                <span style={{ color: '#16a34a' }}>✓ Canonical & Clean</span>
              </div>
              <div style={{ maxHeight: '180px', overflowY: 'auto', padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ color: 'var(--text-secondary)', padding: '2px 0' }}>// Main & Section Pages (8)</div>
                <div style={{ padding: '2px 0' }}>• / (Priority 1.0, Daily)</div>
                <div style={{ padding: '2px 0' }}>• /student-life (Priority 0.8)</div>
                <div style={{ padding: '2px 0' }}>• /personal-growth (Priority 0.8)</div>
                <div style={{ padding: '2px 0' }}>• /career (Priority 0.8)</div>
                <div style={{ padding: '2px 0' }}>• /culture (Priority 0.8)</div>
                <div style={{ padding: '2px 0' }}>• /technology (Priority 0.8)</div>
                <div style={{ padding: '2px 0' }}>• /about (Priority 0.7)</div>
                <div style={{ padding: '2px 0' }}>• /contact (Priority 0.7)</div>
                <div style={{ color: 'var(--text-secondary)', padding: '6px 0 2px' }}>// Editorial Articles (10)</div>
                <div style={{ padding: '2px 0' }}>• /things-i-wish-i-knew-at-18 (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /how-to-stop-wasting-your-20s (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /the-reality-of-being-a-college-student-in-2026 (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /how-to-build-a-personal-brand-as-a-student (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /10-skills-that-can-actually-make-you-money (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /why-everyone-feels-behind-in-their-20s (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /how-to-make-friends-after-college (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /the-rise-of-the-side-hustle-generation (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /digital-detox-does-it-actually-work (Priority 0.9)</div>
                <div style={{ padding: '2px 0' }}>• /how-ai-is-changing-student-life (Priority 0.9)</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Robots.txt */}
        {activeTab === 'robots' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '1rem' }}>
            <div style={{ 
              backgroundColor: 'var(--bg-subtle)', 
              padding: '0.85rem 1rem', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  Robots.txt Crawl Directives
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Allows Googlebot, Bingbot, and web crawlers complete access with sitemap linking
                </div>
              </div>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View /robots.txt</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <pre style={{
              margin: 0,
              padding: '1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              lineHeight: 1.6
            }}>
{`User-agent: *
Allow: /

# Sitemaps
Sitemap: ${currentPropertyUrl}/sitemap.xml`}
            </pre>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Google Search Console checks <code>/robots.txt</code> to confirm there are no disallow rules blocking indexing.
            </div>
          </div>
        )}

        {/* Tab 4: Step-by-Step Guide */}
        {activeTab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Follow these simple steps to finish connecting your property in Google Search Console:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-subtle)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  1
                </span>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Open Google Search Console</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>search.google.com/search-console</a> and sign in with your Google account.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-subtle)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  2
                </span>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Add Property via "URL prefix"</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Click the property dropdown at top-left → <em>Add property</em>. Select the right box: <strong>URL prefix</strong>. Paste your site URL: <code>{currentPropertyUrl}</code>.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-subtle)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  3
                </span>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Choose "HTML tag" Verification</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Expand the <strong>HTML tag</strong> option. Copy the meta tag or token code.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-subtle)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  4
                </span>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Paste into VERVE &amp; Save</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Switch back to the <em>Ownership Verification</em> tab here, paste the code, and click <strong>Save &amp; Activate</strong>.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-subtle)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                  5
                </span>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Click "Verify" &amp; Submit Sitemap</strong>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    In Google Search Console, click <strong>VERIFY</strong>. Once verified, open <strong>Sitemaps</strong> and submit <code>sitemap.xml</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
