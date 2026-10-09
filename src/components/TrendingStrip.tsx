import React from 'react';
import { Article } from '../types';

interface TrendingStripProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TrendingStrip: React.FC<TrendingStripProps> = ({ articles, onSelectArticle }) => {
  const trendingList = articles
    .filter((a) => a.trendingRank && a.trendingRank <= 4)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));

  return (
    <section className="trending-section" aria-label="Trending Stories">
      <div className="container">
        <div className="section-header">
          <div className="section-title-group">
            <span className="section-label">Most Read Right Now</span>
            <h2 className="section-heading">Trending Discussions</h2>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Updated hourly across reader network
          </span>
        </div>

        <div className="trending-grid">
          {trendingList.map((article, index) => (
            <article key={article.id} className="trending-card">
              <span className="trending-rank">
                0{index + 1}
              </span>
              <div className="trending-content">
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--accent-terracotta)' }}>
                  {article.category}
                </span>
                <h3 className="trending-card-title">
                  <a
                    href={`#/article/${article.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectArticle(article);
                    }}
                  >
                    {article.title}
                  </a>
                </h3>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
                  <span>{article.readingTime}</span>
                  <span style={{ margin: '0 5px' }}>·</span>
                  <span>{article.author.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
