import React from 'react';
import { Bookmark } from 'lucide-react';
import { Article } from '../types';

interface StoryCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article className="story-card">
      <div 
        className="story-card-image-wrap"
        onClick={() => onSelectArticle(article)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={article.heroImage}
          alt={article.imageAlt || `${article.title} cover image`}
          className="story-card-image"
          width={640}
          height={400}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=75&fm=webp';
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(20, 19, 18, 0.75)',
          color: '#ffffff',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          padding: '2px 6px',
          borderRadius: '3px',
          backdropFilter: 'blur(3px)',
        }}>
          {article.imageSizeKB} KB
        </div>
      </div>

      <div className="story-card-body">
        <div className="story-card-category">
          {article.category}
        </div>

        <h3 className="story-card-title">
          <a
            href={`/${article.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectArticle(article);
            }}
          >
            {article.title}
          </a>
        </h3>

        <p className="story-card-deck">
          {article.deck}
        </p>

        <div style={{ margin: '0.6rem 0 0.25rem' }}>
          <a
            href={`/${article.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectArticle(article);
            }}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent-terracotta)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Read Article &rarr;
          </a>
        </div>

        <div className="story-card-footer">
          <div className="author-mini">
            <img
              src={article.author.avatar}
              alt={`Portrait of ${article.author.name}`}
              className="author-mini-avatar"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=70&fm=webp';
              }}
            />
            <div>
              <span className="author-mini-name">{article.author.name}</span>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {article.readingTime} · {article.publishDate.split(',')[0]}
              </div>
            </div>
          </div>

          <div className="story-card-actions">
            <button
              onClick={() => onToggleBookmark(article)}
              className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
              title={isBookmarked ? 'Saved to reading list' : 'Save for later'}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
            >
              <Bookmark
                size={18}
                fill={isBookmarked ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
