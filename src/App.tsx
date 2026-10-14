import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, CheckCircle, ArrowRight } from 'lucide-react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Article, Category } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrendingStrip } from './components/TrendingStrip';
import { StoryCard } from './components/StoryCard';
import { ArticleView } from './components/ArticleView';
import { NewsletterBox } from './components/NewsletterBox';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SEOModal } from './components/SEOModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Page State
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | 'About' | 'Contact'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('verve_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  // Bookmarking State
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('verve_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSEOModalOpen, setIsSEOModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('verve_theme', theme);
  }, [theme]);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    localStorage.setItem('verve_saved_articles', JSON.stringify(savedIds));
  }, [savedIds]);

  // Helper to dynamically update meta tags in document head
  const updateHeadMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
    let tag = document.querySelector(selector) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      if (isProperty) {
        tag.setAttribute('property', nameOrProperty);
      } else {
        tag.setAttribute('name', nameOrProperty);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Helper to parse location without any hashtags
  const parseLocation = () => {
    // If incoming URL has a hashtag, clean it up immediately
    if (window.location.hash) {
      const cleanSlug = window.location.hash.replace(/^#\/?/, '').replace(/^article\//, '');
      const cleanPath = cleanSlug ? `/${cleanSlug}` : '/';
      window.history.replaceState(null, '', cleanPath);
    }

    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (!path) {
      return { article: null, category: 'All' as const };
    }

    if (path === 'about') {
      return { article: null, category: 'About' as const };
    }

    if (path === 'contact') {
      return { article: null, category: 'Contact' as const };
    }

    // Check if path is a category (e.g. /lifestyle, /student-life, etc.)
    const catSegment = path.startsWith('category/') ? path.replace('category/', '') : path;
    const matchedCategory = CATEGORIES.find(
      (c) => c.toLowerCase().replace(/\s+/g, '-') === catSegment.toLowerCase()
    );
    if (matchedCategory) {
      return { article: null, category: matchedCategory };
    }

    // Check if path is an article slug (e.g. /things-i-wish-i-knew-at-18)
    const articleSlug = path.startsWith('article/') ? path.replace('article/', '') : path;
    const matchedArticle = ARTICLES.find((a) => a.slug === articleSlug);
    if (matchedArticle) {
      return { article: matchedArticle, category: matchedArticle.category };
    }

    return { article: null, category: 'All' as const };
  };

  // Sync clean, simple, hashtag-free URLs
  useEffect(() => {
    const handleUrlChange = () => {
      const { article, category } = parseLocation();
      setActiveArticle(article);
      setSelectedCategory(category);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Update document title and OpenGraph metadata dynamically
  useEffect(() => {
    let title = 'VERVE — Gen Z Lifestyle & Culture Magazine';
    let description = 'VERVE is the premier Gen Z lifestyle and culture magazine. Read bold essays on student life, career growth, tech, and wellbeing. Discover latest stories now.';

    if (activeArticle) {
      title = activeArticle.seo.metaTitle;
      description = activeArticle.seo.metaDescription;
    } else if (selectedCategory === 'About') {
      title = 'About & Manifesto: Independent Gen Z Magazine | VERVE';
      description = 'Read the VERVE manifesto for Gen Z. Discover our independent mission covering student life, careers, culture, and tech. Explore our editorial team now.';
    } else if (selectedCategory === 'Contact') {
      title = 'Pitch a Story & Contact the Editorial Desk | VERVE';
      description = 'Pitch a story to VERVE Magazine. We welcome original essays from students, creators, and young writers across the globe. Submit your story proposal now.';
    } else if (selectedCategory !== 'All') {
      title = `${selectedCategory}: Essays, Guides & Culture for Gen Z | VERVE`;
      description = `Explore ${selectedCategory} essays and guides on VERVE. Candid advice on student survival, careers, modern culture, and tech. Start reading the collection now.`;
    }

    document.title = title;
    updateHeadMeta('description', description);
    updateHeadMeta('og:title', title, true);
    updateHeadMeta('og:description', description, true);
    updateHeadMeta('twitter:title', title);
    updateHeadMeta('twitter:description', description);
  }, [activeArticle, selectedCategory]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const toggleBookmark = (article: Article) => {
    setSavedIds((prev) => {
      const exists = prev.includes(article.id);
      if (exists) {
        showToast(`Removed "${article.title}" from reading list`);
        return prev.filter((id) => id !== article.id);
      } else {
        showToast(`Saved "${article.title}" to reading list`);
        return [...prev, article.id];
      }
    });
  };

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  const handleSelectArticle = (article: Article) => {
    const cleanUrl = `/${article.slug}`;
    navigateTo(cleanUrl);
    setActiveArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMagazine = () => {
    navigateTo('/');
    setActiveArticle(null);
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: Category | 'All' | 'About' | 'Contact') => {
    setSelectedCategory(cat);
    setActiveArticle(null);
    if (cat === 'About') {
      navigateTo('/about');
    } else if (cat === 'Contact') {
      navigateTo('/contact');
    } else if (cat === 'All') {
      navigateTo('/');
    } else {
      navigateTo(`/${cat.toLowerCase().replace(/\s+/g, '-')}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticlesList = useMemo(() => {
    return ARTICLES.filter((a) => savedIds.includes(a.id));
  }, [savedIds]);

  // Featured article for hero
  const heroArticle = ARTICLES[0];

  // Filtered stories for grid
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchCat =
        selectedCategory === 'All' ||
        selectedCategory === 'About' ||
        selectedCategory === 'Contact'
          ? true
          : art.category === selectedCategory;

      if (!matchCat) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchDeck = art.deck.toLowerCase().includes(q);
        const matchAuthor = art.author.name.toLowerCase().includes(q);
        const matchTag = art.tags.some((t) => t.toLowerCase().includes(q));
        const matchCategory = art.category.toLowerCase().includes(q);
        return matchTitle || matchDeck || matchAuthor || matchTag || matchCategory;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="magazine-app">
      {/* Primary Navigation & Masthead */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        bookmarksCount={savedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSearch={() => {
          const el = document.getElementById('search-input-field');
          if (el) {
            el.focus();
          } else {
            handleBackToMagazine();
            setTimeout(() => document.getElementById('search-input-field')?.focus(), 150);
          }
        }}
        onOpenSEO={() => setIsSEOModalOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        onSubscribeClick={() => {
          const el = document.getElementById('newsletter-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            handleBackToMagazine();
            setTimeout(() => document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
          }
        }}
      />

      <main>
        {/* VIEW 1: Individual Blog Article Page */}
        {activeArticle ? (
          <ArticleView
            article={activeArticle}
            allArticles={ARTICLES}
            onBack={handleBackToMagazine}
            onSelectArticle={handleSelectArticle}
            isBookmarked={savedIds.includes(activeArticle.id)}
            onToggleBookmark={toggleBookmark}
            onOpenSEO={() => setIsSEOModalOpen(true)}
            onShowToast={showToast}
          />
        ) : selectedCategory === 'About' ? (
          /* VIEW 2: About / Manifesto Page */
          <AboutView onBack={handleBackToMagazine} />
        ) : selectedCategory === 'Contact' ? (
          /* VIEW 3: Pitch & Contact Page */
          <ContactView onBack={handleBackToMagazine} onSuccessToast={showToast} />
        ) : (
          /* VIEW 4: Homepage & Magazine Index */
          <>
            {/* Hero Section: Featured Article (Only when on 'All' and no search query) */}
            {selectedCategory === 'All' && !searchQuery.trim() && (
              <Hero
                article={heroArticle}
                onReadArticle={handleSelectArticle}
                isBookmarked={savedIds.includes(heroArticle.id)}
                onToggleBookmark={toggleBookmark}
              />
            )}

            {/* Trending Section: Top 4 articles */}
            {selectedCategory === 'All' && !searchQuery.trim() && (
              <TrendingStrip
                articles={ARTICLES}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {/* Stories Grid & Category Exploration */}
            <div className="container">
              <section className="filter-bar-section" aria-label="Browse Stories">
                <div className="controls-row">
                  {/* Category Filter Tabs */}
                  <div className="filter-tabs" role="tablist">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        role="tab"
                        aria-selected={selectedCategory === cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Real-time Search Field */}
                  <div className="search-input-wrapper">
                    <Search className="search-icon-inside" size={16} />
                    <input
                      id="search-input-field"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles, topics, skills..."
                      aria-label="Search articles"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                        aria-label="Clear search"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {searchQuery && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)', paddingTop: '0.5rem' }}>
                    <span>Showing results for “{searchQuery}” ({filteredArticles.length} found)</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ color: 'var(--accent-terracotta)', fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      Reset filter
                    </button>
                  </div>
                )}
              </section>

              {/* Grid of Stories */}
              {filteredArticles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-secondary)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No articles matched your search</h3>
                  <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>Try searching for "productivity", "AI", "money", or "college".</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="btn-primary">
                    View All Stories
                  </button>
                </div>
              ) : (
                <div className="stories-grid">
                  {filteredArticles.map((article) => (
                    <StoryCard
                      key={article.id}
                      article={article}
                      onSelectArticle={handleSelectArticle}
                      isBookmarked={savedIds.includes(article.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Editorial Quote Breakout (Keeps rhythm engaging) */}
            {selectedCategory === 'All' && !searchQuery.trim() && (
              <section className="quote-breakout-section">
                <div className="container">
                  <blockquote className="editorial-quote">
                    “Adulthood does not arrive with an operating manual. You build your own by paying attention, staying curious, and making the next sensible move.”
                  </blockquote>
                  <cite className="quote-attribution">
                    — From “Things I Wish I Knew at 18” · VERVE Issue 28
                  </cite>
                </div>
              </section>
            )}

            {/* Newsletter Subscription Component */}
            <div id="newsletter-section">
              <NewsletterBox onSuccessToast={showToast} />
            </div>
          </>
        )}
      </main>

      {/* Bookmarks / Saved Reading List Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={(id) => {
          setSavedIds((prev) => prev.filter((item) => item !== id));
          showToast('Removed from reading list');
        }}
        onClearAll={() => {
          setSavedIds([]);
          showToast('Reading list cleared');
        }}
      />

      {/* SEO & Metadata Spec Modal */}
      {isSEOModalOpen && (
        <SEOModal
          article={activeArticle}
          onClose={() => setIsSEOModalOpen(false)}
          onCopyNotice={showToast}
        />
      )}

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <aside className="toast-banner" role="status" aria-live="polite">
          <CheckCircle size={18} color="var(--accent-terracotta)" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Site Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenSEO={() => setIsSEOModalOpen(true)}
        onOpenNewsletter={() => {
          const el = document.getElementById('newsletter-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            handleBackToMagazine();
            setTimeout(() => document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' }), 200);
          }
        }}
      />
    </div>
  );
}
