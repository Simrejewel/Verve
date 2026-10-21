import React from 'react';
import { Home, Compass, ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';
import { Article, Category } from '../types';

interface NotFoundViewProps {
  onBackToHome: () => void;
  onSelectCategory: (cat: Category | 'All' | 'About' | 'Contact') => void;
  onSelectArticle: (article: Article) => void;
  onOpenSearch?: () => void;
  articles: Article[];
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onBackToHome,
  onSelectCategory,
  onSelectArticle,
  onOpenSearch,
  articles,
}) => {
  // Top recommended articles for user to discover instead
  const recommendedArticles = articles.slice(0, 3);

  const mainCategories: { name: Category; label: string; desc: string }[] = [
    { name: 'Student Life', label: 'Student Life', desc: 'Campus reality, modern study routines & AI tools' },
    { name: 'Personal Growth', label: 'Personal Growth', desc: 'Mindset shifts, habits & navigating your 20s' },
    { name: 'Career', label: 'Career', desc: 'Freelancing, monetizable skills & personal branding' },
    { name: 'Culture', label: 'Culture', desc: 'Gen Z trends, social commentary & mental wellbeing' },
    { name: 'Technology', label: 'Technology', desc: 'Digital detoxes, AI copilots & modern focus' },
    { name: 'Lifestyle', label: 'Lifestyle', desc: 'Modern friendships, city living & wellness' },
  ];

  return (
    <div className="not-found-view" style={{ minHeight: '75vh', padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Editorial 404 Hero */}
        <div 
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'var(--card-bg, #ffffff)',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.04))',
            marginBottom: '3rem',
          }}
        >
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'var(--accent-cream, #f7efe6)',
              color: 'var(--accent-terracotta, #c2593f)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            <Compass size={14} />
            <span>Error 404 · Page Not Found</span>
          </div>

          <h1 
            style={{
              fontFamily: 'var(--font-serif, "Newsreader", Georgia, serif)',
              fontSize: 'clamp(2.2rem, 5vw, 3.25rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: '0 auto 1.25rem',
              maxWidth: '680px',
            }}
          >
            The story you're looking for seems to have wandered off.
          </h1>

          <p 
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto 2rem',
            }}
          >
            We couldn't find the requested page. The link may have changed, or the article might have moved. Explore our main sections or jump back to the front page below.
          </p>

          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              onClick={onBackToHome}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.6rem',
                fontSize: '0.925rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Home size={16} />
              <span>Back to Magazine Homepage</span>
            </button>

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.75rem 1.4rem',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Search size={16} />
                <span>Search Stories</span>
              </button>
            )}
          </div>
        </div>

        {/* Explore Main Sections */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <BookOpen size={18} color="var(--accent-terracotta, #c2593f)" />
            <h2 
              style={{
                fontFamily: 'var(--font-serif, "Newsreader", Georgia, serif)',
                fontSize: '1.5rem',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              Explore Main Pages & Categories
            </h2>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {mainCategories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                style={{
                  padding: '1.15rem 1.25rem',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md, 8px)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-terracotta, #c2593f)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div 
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {cat.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {cat.desc}
                  </div>
                </div>
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    color: 'var(--accent-terracotta, #c2593f)',
                    marginTop: '0.75rem',
                  }}
                >
                  <span>Browse stories</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}

            {/* About & Contact Quick Links */}
            <div
              onClick={() => onSelectCategory('About')}
              style={{
                padding: '1.15rem 1.25rem',
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md, 8px)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-terracotta, #c2593f)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  About & Manifesto
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  Discover VERVE's independent mission for the next generation.
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.775rem', fontWeight: 600, color: 'var(--accent-terracotta, #c2593f)', marginTop: '0.75rem' }}>
                <span>Read manifesto</span>
                <ArrowRight size={13} />
              </div>
            </div>

            <div
              onClick={() => onSelectCategory('Contact')}
              style={{
                padding: '1.15rem 1.25rem',
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md, 8px)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-terracotta, #c2593f)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Pitch & Contact Desk
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  Submit story pitches, essays, or reach out to our editorial desk.
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.775rem', fontWeight: 600, color: 'var(--accent-terracotta, #c2593f)', marginTop: '0.75rem' }}>
                <span>Pitch a story</span>
                <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Top Reads */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <Sparkles size={18} color="var(--accent-terracotta, #c2593f)" />
            <h2 
              style={{
                fontFamily: 'var(--font-serif, "Newsreader", Georgia, serif)',
                fontSize: '1.5rem',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              Recommended Top Reads
            </h2>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {recommendedArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md, 8px)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={article.heroImage}
                    alt={article.imageAlt || `${article.title} cover image`}
                    width={400}
                    height={225}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(20, 19, 18, 0.75)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(3px)',
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif, "Newsreader", Georgia, serif)',
                      fontSize: '1.1rem',
                      lineHeight: 1.3,
                      margin: '0 0 0.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      margin: '0 0 1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.deck}
                  </p>
                  <div
                    style={{
                      marginTop: 'auto',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{article.author.name}</span>
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
