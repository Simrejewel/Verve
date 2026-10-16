import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, ShieldCheck, Feather } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <div style={{ paddingTop: '2.5rem' }}>
        <button onClick={onBack} className="back-link">
          <ArrowLeft size={16} /> Back to Magazine
        </button>
      </div>

      <header className="static-page-header">
        <span className="editorial-kicker" style={{ justifyContent: 'center' }}>
          Editorial Manifesto
        </span>
        <h1 className="static-page-title">What We Stand For</h1>
        <p className="static-page-deck">
          VERVE is an independent digital magazine exploring modern youth culture, student life, career navigation, personal growth, and technology for the 16–28 generation.
        </p>
        <div style={{
          marginTop: '1.25rem',
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <Sparkles size={12} color="var(--accent-terracotta)" /> SEO Strategy:
          </span>
          <span style={{ backgroundColor: 'var(--accent-warm-tint)', color: 'var(--accent-terracotta)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
            Main: independent youth editorial
          </span>
          <span style={{ backgroundColor: 'var(--bg-surface)', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}>
            Related: Gen Z journalism manifesto
          </span>
          <span style={{ backgroundColor: 'var(--bg-surface)', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}>
            Related: young adult culture publication
          </span>
        </div>
      </header>

      <div className="container-narrow">
        <div className="manifesto-box">
          <p>
            <strong>The Internet Does Not Need More Generic Content.</strong>
          </p>
          <p>
            Most young adults are caught between two bad extremes: patronizing mainstream legacy media that treats Gen Z like an alien demographic, and hyper-cynical social feeds engineered to keep you anxious and scrolling.
          </p>
          <p>
            We built VERVE to be the third space: thoughtful essays, practical career breakdowns, real college realities, and honest reflections on what it feels like to navigate your twenties in 2026.
          </p>
        </div>

        <div style={{ margin: '3.5rem 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Core Commitments</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Feather size={20} color="var(--accent-terracotta)" />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>01. Human-Led Perspective</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Every essay is written by real young practitioners, students, and culture writers. We believe in lived experience, distinct opinions, and nuance over homogenized summaries.
              </p>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={20} color="var(--accent-terracotta)" />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>02. Licensed & Attributed Imagery</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                We uphold visual editorial integrity. Every image on VERVE comes from verified open-access archives, photographers, or editorial contributors with proper attribution.
              </p>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <BookOpen size={20} color="var(--accent-terracotta)" />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>03. High Signal-to-Noise Ratio</h3>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                No clickbait slideshows, no 40-paragraph fluff recipes, no synthetic listicles. We value your finite mental energy and write pieces designed to stay with you.
              </p>
            </div>
          </div>
        </div>

        <div style={{ margin: '4rem 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>The Masthead</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--text-main)' }}>Maya Chen</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-terracotta)' }}>Culture & Essays Editor</span>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--text-main)' }}>Julian Vance</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-terracotta)' }}>Productivity & Habits Contributor</span>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--text-main)' }}>Sofia Al-Mansoor</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-terracotta)' }}>Higher Ed & Campus Reporter</span>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--text-main)' }}>Kofi Mensah</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-terracotta)' }}>Career & Digital Strategy Columnist</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
