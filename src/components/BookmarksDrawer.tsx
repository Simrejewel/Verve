import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer-panel" aria-label="Saved Articles">
        <div className="drawer-header">
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
              Reading List ({savedArticles.length})
            </h3>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Saved stories to read at your leisure
            </p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close reading list">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-list">
          {savedArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                No stories saved yet
              </p>
              <p style={{ fontSize: '0.825rem' }}>
                Tap the bookmark icon on any article card or reader to save it here.
              </p>
            </div>
          ) : (
            <>
              {savedArticles.map((article) => (
                <div key={article.id} className="drawer-item">
                  <img
                    src={article.heroImage}
                    alt={article.imageAlt || `${article.title} thumbnail`}
                    className="drawer-item-img"
                    width={60}
                    height={60}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=70&fm=webp';
                    }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-terracotta)', fontWeight: 700 }}>
                      {article.category}
                    </span>
                    <h4 
                      className="drawer-item-title" 
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      style={{ cursor: 'pointer', marginTop: '2px' }}
                    >
                      {article.title}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {article.readingTime}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="icon-btn"
                    title="Remove from list"
                    style={{ width: '30px', height: '30px', flexShrink: 0 }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {savedArticles.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={onClearAll}
              style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Clear all bookmarks
            </button>
            <button
              onClick={() => {
                if (savedArticles[0]) {
                  onSelectArticle(savedArticles[0]);
                  onClose();
                }
              }}
              className="btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.775rem' }}
            >
              Read Next <ArrowRight size={13} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
