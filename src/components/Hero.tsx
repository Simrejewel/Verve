import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface HeroProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
}

export const Hero: React.FC<HeroProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="hero-section" aria-label="Featured Story">
      <div className="container">
        <div className="hero-grid">
          {/* Visual Anchor: Editorial Photograph */}
          <div 
            className="hero-media-wrapper"
            onClick={() => onReadArticle(article)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={article.heroImage}
              alt={article.imageAlt || `${article.title} cover story`}
              className="hero-media-image"
              width={800}
              height={500}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=70&fm=webp';
              }}
            />
            <div className="hero-badge-kicker">
              Cover Story · Issue 28
            </div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              backgroundColor: 'rgba(20, 19, 18, 0.8)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              backdropFilter: 'blur(4px)',
            }}>
              {article.imageName} · {article.imageSizeKB} KB
            </div>
          </div>

          {/* Narrative Content */}
          <div className="hero-content">
            <div className="editorial-kicker">
              {article.category}
            </div>

            <h1 className="hero-title">
              <a
                href={`/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle(article);
                }}
              >
                {article.title}
              </a>
            </h1>

            <p className="hero-deck">
              {article.deck}
            </p>

            {/* Zero-Pill Metadata Rule */}
            <div className="meta-row">
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{article.author.name}</span>
              <span className="meta-dot">·</span>
              <span>{article.readingTime}</span>
              <span className="meta-dot">·</span>
              <span>{article.publishDate}</span>
            </div>

            <div className="hero-footer">
              <button
                onClick={() => onReadArticle(article)}
                className="btn-primary"
                style={{ padding: '0.75rem 1.45rem', fontSize: '0.875rem' }}
              >
                Read Article <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onToggleBookmark(article)}
                className="btn-outline"
                style={{ padding: '0.75rem 1.15rem', fontSize: '0.875rem' }}
                title={isBookmarked ? 'Remove from bookmarks' : 'Save for later'}
              >
                <Bookmark 
                  size={16} 
                  fill={isBookmarked ? 'currentColor' : 'none'} 
                  color={isBookmarked ? 'var(--accent-terracotta)' : 'currentColor'}
                />
                <span>{isBookmarked ? 'Saved' : 'Save Story'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
