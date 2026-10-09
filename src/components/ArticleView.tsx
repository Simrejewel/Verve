import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Copy,
  Twitter,
  Linkedin,
  MessageCircle,
  Check,
  Type,
  Code2,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ImageIcon,
  Sparkles,
} from 'lucide-react';
import { Article } from '../types';
import { StoryCard } from './StoryCard';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onOpenSEO: () => void;
  onShowToast: (msg: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  onOpenSEO,
  onShowToast,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [largeFont, setLargeFont] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to top on article switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${article.seo.metaTitle}`;
  }, [article]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanPermalink = `${window.location.origin}${article.seo.canonicalSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cleanPermalink);
    setCopiedLink(true);
    onShowToast(`Clean URL copied: ${article.seo.canonicalSlug}`);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" via @VERVEMagazine`);
    const url = encodeURIComponent(cleanPermalink);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(cleanPermalink);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this story: "${article.title}" - ${cleanPermalink}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Find related articles by relatedSlugs or matching category
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .filter((a) => article.relatedSlugs.includes(a.slug) || a.category === article.category)
    .slice(0, 3);

  return (
    <article className="article-page" aria-label={article.title}>
      {/* Sticky Reading Progress Indicator */}
      <div className="reading-progress-track">
        <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Header Container */}
      <header className="article-header">
        <div className="container article-header-container">
          <button onClick={onBack} className="back-link">
            <ArrowLeft size={16} /> Back to Magazine
          </button>

          {/* Clean Readable URL Slug Affordance */}
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleCopyLink}
              title="Click to copy clean URL"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-subtle)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span>{article.seo.canonicalSlug}</span>
              {copiedLink ? <Check size={12} color="var(--accent-terracotta)" /> : <Copy size={12} />}
            </button>
          </div>

          <div className="article-category">
            {article.category}
          </div>

          <h1 className="article-title">
            {article.title}
          </h1>

          <p className="article-deck">
            {article.deck}
          </p>

          {/* Author & Publication Byline */}
          <div className="article-author-meta">
            <div className="author-detail">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="author-detail-avatar"
                width={44}
                height={44}
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="author-detail-info">
                <div className="author-detail-name">{article.author.name}</div>
                <div className="author-detail-role">{article.author.role}</div>
              </div>
            </div>

            <div className="article-meta-divider" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} color="var(--text-muted)" />
                {article.publishDate}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} color="var(--text-muted)" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Visual Asset with WebP KB size & Explicit Description */}
      <div className="article-hero-media">
        <div className="article-hero-img-wrap">
          <img
            src={article.heroImage}
            alt={article.imageAlt}
            className="article-hero-img"
            width={800}
            height={450}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Image naming, size in KB, description & attribution */}
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              <ImageIcon size={13} color="var(--accent-terracotta)" />
              {article.imageName}
            </span>
            <span style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.7rem',
              color: 'var(--accent-terracotta)'
            }}>
              {article.imageSizeKB} KB · WebP (Optimized)
            </span>
          </div>
          <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Description:</strong> {article.imageDescription}
          </p>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            {article.imageCredit}
          </div>
        </div>
      </div>

      {/* Reading Convenience Toolbar */}
      <div className="container-narrow">
        <aside className="reading-toolbar" aria-label="Reading Controls">
          <div className="toolbar-group">
            <button
              onClick={() => setLargeFont(!largeFont)}
              className={`toolbar-btn ${largeFont ? 'active' : ''}`}
              title="Toggle reading font size"
            >
              <Type size={15} />
              <span>{largeFont ? 'Standard Size' : 'Larger Type'}</span>
            </button>
            <button
              onClick={() => onToggleBookmark(article)}
              className={`toolbar-btn ${isBookmarked ? 'active' : ''}`}
              title="Save to bookmarks"
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>

          <div className="toolbar-group">
            <button onClick={onOpenSEO} className="toolbar-btn" title="View SEO Tags & Metadata">
              <Code2 size={15} />
              <span>SEO Spec</span>
            </button>
            <button onClick={handleCopyLink} className="toolbar-btn" title="Copy clean article URL">
              {copiedLink ? <Check size={15} color="var(--accent-terracotta)" /> : <Copy size={15} />}
              <span>{copiedLink ? 'Copied' : 'Share URL'}</span>
            </button>
          </div>
        </aside>

        {/* Long-form Article Body Prose */}
        <div className={`article-prose ${largeFont ? 'font-lg' : ''}`}>
          {/* Introduction Paragraphs with First-letter Drop Cap */}
          {article.introduction.map((para, i) => (
            <p key={`intro-${i}`} className={i === 0 ? 'intro-paragraph' : ''}>
              {para}
            </p>
          ))}

          {/* Structured Sections with Question-and-Answer Formatted Headings */}
          {article.sections.map((section, idx) => (
            <section key={`sec-${idx}`} style={{ marginBottom: '2.5rem' }}>
              {section.heading && (
                <div style={{ marginTop: '2.75rem', marginBottom: '1.25rem' }}>
                  {section.isQuestionFormat && (
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--accent-terracotta)',
                      marginBottom: '0.25rem'
                    }}>
                      Question & Analysis
                    </span>
                  )}
                  <h2 style={{ marginTop: 0 }}>
                    {section.heading}
                  </h2>
                </div>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={`p-${idx}-${pIdx}`}>{para}</p>
              ))}

              {section.pullquote && (
                <aside className="editorial-pullquote">
                  <blockquote className="pullquote-text">
                    “{section.pullquote}”
                  </blockquote>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                    {article.author.name} · VERVE Issue 28
                  </span>
                </aside>
              )}

              {section.keyTakeaway && (
                <div style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--accent-terracotta)',
                  margin: '2rem 0',
                  fontSize: '0.95rem',
                  color: 'var(--text-main)',
                  fontWeight: 500
                }}>
                  <strong style={{ color: 'var(--accent-terracotta)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>
                    Key Takeaway
                  </strong>
                  {section.keyTakeaway}
                </div>
              )}
            </section>
          ))}

          {/* Interactive Question and Answer (Q&A) Section */}
          {article.faqItems && article.faqItems.length > 0 && (
            <section style={{ margin: '3.5rem 0', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '1.75rem', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <HelpCircle size={20} color="var(--accent-terracotta)" />
                <h3 style={{ fontSize: '1.45rem', margin: 0, fontFamily: 'var(--font-serif)' }}>
                  Questions & Answers (Q&A)
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Common questions our readers and college students ask about this topic:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {article.faqItems.map((item, fIdx) => (
                  <div
                    key={`faq-${fIdx}`}
                    style={{
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-subtle)',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'var(--text-main)'
                      }}
                      aria-expanded={openFaqIndex === fIdx}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>Q:</span>
                        {item.question}
                      </span>
                      {openFaqIndex === fIdx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openFaqIndex === fIdx && (
                      <div style={{ padding: '0 1rem 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-main)', marginRight: '0.4rem' }}>A:</span>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Final Key Takeaways Checklist Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="takeaway-card">
              <div className="takeaway-title">
                <span>Core Takeaways for Your Notebook</span>
              </div>
              <ul className="takeaway-list">
                {article.keyTakeaways.map((item, kIdx) => (
                  <li key={`takeaway-${kIdx}`} className="takeaway-item">
                    <span className="takeaway-bullet">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Sharing Strip */}
          <div className="social-share-strip">
            <span className="share-label">Share This Essay</span>
            <div className="share-buttons">
              <button onClick={handleCopyLink} className="share-pill-btn" title="Copy clean shareable link">
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedLink ? 'Copied' : 'Copy URL'}</span>
              </button>
              <button onClick={handleShareTwitter} className="share-pill-btn" title="Share on X / Twitter">
                <Twitter size={14} />
                <span>X / Twitter</span>
              </button>
              <button onClick={handleShareLinkedIn} className="share-pill-btn" title="Share on LinkedIn">
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </button>
              <button onClick={handleShareWhatsApp} className="share-pill-btn" title="Share on WhatsApp">
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Author Biography Box */}
          <div className="author-bio-card">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="author-bio-avatar"
              width={72}
              height={72}
              referrerPolicy="no-referrer"
            />
            <div className="author-bio-info">
              <h4>Written by {article.author.name}</h4>
              <div className="author-bio-role">{article.author.role}</div>
              <p className="author-bio-text">{article.author.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="related-section" aria-label="Related Stories">
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <span className="section-label">Keep Exploring</span>
                <h3 className="section-heading">More from VERVE</h3>
              </div>
            </div>

            <div className="stories-grid">
              {relatedArticles.map((rel) => (
                <StoryCard
                  key={rel.id}
                  article={rel}
                  onSelectArticle={onSelectArticle}
                  isBookmarked={false}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

