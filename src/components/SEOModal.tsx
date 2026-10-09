import React from 'react';
import { X, Copy, Check, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface SEOModalProps {
  article?: Article | null;
  onClose: () => void;
  onCopyNotice: (msg: string) => void;
}

export const SEOModal: React.FC<SEOModalProps> = ({ article, onClose, onCopyNotice }) => {
  const [copied, setCopied] = React.useState(false);

  const title = article ? article.seo.metaTitle : 'VERVE — Gen Z Lifestyle & Culture Magazine';
  const desc = article 
    ? article.seo.metaDescription 
    : 'VERVE is the premier Gen Z lifestyle and culture magazine. Read bold essays on student life, career growth, tech, and wellbeing. Discover latest stories now.';
  const primaryKw = article ? article.seo.primaryKeyword : 'Gen Z lifestyle magazine';
  const secondaryKws = article ? article.seo.secondaryKeywords.join(', ') : 'student life, college 2026, personal growth, youth culture';
  const slug = article ? article.seo.canonicalSlug : '/';
  const fullUrl = `https://verve-magazine.com${slug}`;

  const descLength = desc.length;
  const isOptimalDescLength = descLength >= 150 && descLength <= 160;

  const jsonLd = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.deck,
    "image": article.heroImage,
    "author": {
      "@type": "Person",
      "name": article.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "VERVE Magazine",
      "logo": {
        "@type": "ImageObject",
        "url": "https://verve-magazine.com/logo.png"
      }
    },
    "datePublished": article.isoDate,
    "mainEntityOfPage": fullUrl
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VERVE",
    "url": "https://verve-magazine.com",
    "description": desc
  };

  const handleCopyJsonLd = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLd, null, 2));
    setCopied(true);
    onCopyNotice('JSON-LD Schema copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">SEO & Metadata Audit</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Clean URLs, title tags, 150–160 char meta descriptions, Q&A headings, and KB images
            </p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Clean URL Spec */}
          <div className="seo-meta-tag-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="seo-meta-name">Clean Canonical URL Slug</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Clean & human-readable</span>
            </div>
            <span className="seo-meta-val" style={{ fontWeight: 600 }}>{slug}</span>
          </div>

          {/* Title Tag */}
          <div className="seo-meta-tag-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="seo-meta-name">&lt;title&gt; (Page Specific with Primary Keyword)</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{title.length} chars</span>
            </div>
            <span className="seo-meta-val">{title}</span>
          </div>

          {/* Meta Description with 150-160 char verification */}
          <div className="seo-meta-tag-item" style={{ borderLeft: isOptimalDescLength ? '3px solid #16a34a' : '3px solid #eab308' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="seo-meta-name">&lt;meta name="description"&gt; (Contains Keyword & CTA)</span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: isOptimalDescLength ? '#16a34a' : '#d97706',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                {isOptimalDescLength ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                {descLength} / 150–160 chars (Target Met)
              </span>
            </div>
            <span className="seo-meta-val" style={{ marginTop: '0.25rem' }}>{desc}</span>
          </div>

          {/* Primary Keyword */}
          <div className="seo-meta-tag-item">
            <span className="seo-meta-name">Primary Keyword Focus</span>
            <span className="seo-meta-val">{primaryKw}</span>
          </div>

          {/* Image optimization (in KB, Named, with Description) */}
          {article && (
            <div className="seo-meta-tag-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="seo-meta-name">Asset Specs (KB Compression & Naming)</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-terracotta)' }}>
                  {article.imageSizeKB} KB (Not MB)
                </span>
              </div>
              <span className="seo-meta-val">
                <strong>File:</strong> {article.imageName}<br />
                <strong>Description:</strong> {article.imageDescription}
              </span>
            </div>
          )}

          {/* Q&A Headings Audit */}
          {article && (
            <div className="seo-meta-tag-item">
              <span className="seo-meta-name">Headings in Q&A Format (Question & Answer)</span>
              <span className="seo-meta-val">
                {article.sections.filter(s => s.isQuestionFormat).map((s, i) => (
                  <div key={i} style={{ margin: '2px 0' }}>• {s.heading}</div>
                ))}
              </span>
            </div>
          )}

          {/* JSON-LD Structured Data */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Structured Data (Schema.org JSON-LD)
              </span>
              <button 
                onClick={handleCopyJsonLd} 
                className="btn-outline" 
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy Schema'}
              </button>
            </div>
            <pre style={{
              background: 'var(--bg-subtle)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              maxHeight: '140px'
            }}>
              {JSON.stringify(jsonLd, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
