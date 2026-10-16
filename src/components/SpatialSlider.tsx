import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { initSpatialSlider, SpatialSliderInstance } from '../utils/spatialSlider';

interface SpatialSliderProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SpatialSlider: React.FC<SpatialSliderProps> = ({ articles, onSelectArticle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderInstanceRef = useRef<SpatialSliderInstance | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // We highlight the top 6 standout articles for the 3D spatial curation
  const showcaseArticles = articles.slice(0, 6);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = initSpatialSlider(containerRef.current, {
      onActiveChange: (index) => {
        setActiveIdx(index);
      },
      onCardClick: (index) => {
        const art = showcaseArticles[index];
        if (art) onSelectArticle(art);
      },
    });

    sliderInstanceRef.current = instance;

    return () => {
      instance.destroy();
    };
  }, [showcaseArticles, onSelectArticle]);

  return (
    <section className="demo-section spatial-slider-section" aria-label="Curated Spatial Highlights">
      <div className="container">
        {/* Section Header */}
        <div className="spatial-header">
          <div className="spatial-header-left">
            <span className="kicker-tag">
              <Compass size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
              Spatial Issue Curation
            </span>
            <h2 className="spatial-title">Curated Stories in 3D Perspective</h2>
            <p className="spatial-subtitle">
              Drag, swipe, or flick horizontally to navigate VERVE’s standout cultural perspectives.
            </p>
          </div>

          <div className="spatial-controls">
            <span className="spatial-counter">
              <span className="spatial-counter-current">0{activeIdx + 1}</span>
              <span className="spatial-counter-divider">/</span>
              <span className="spatial-counter-total">0{showcaseArticles.length}</span>
            </span>
            <div className="spatial-nav-buttons">
              <button
                type="button"
                className="spatial-nav-btn"
                onClick={() => sliderInstanceRef.current?.prev()}
                disabled={activeIdx === 0}
                aria-label="Previous story in 3D view"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                className="spatial-nav-btn"
                onClick={() => sliderInstanceRef.current?.next()}
                disabled={activeIdx === showcaseArticles.length - 1}
                aria-label="Next story in 3D view"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Spatial GSAP Slider markup matching user specification */}
        <div
          ref={containerRef}
          data-spatial-slider-init=""
          data-spatial-slider-drag-status="grab"
          className="spatial-gsap-slider"
        >
          <div data-spatial-slider-collection="" className="spatial-gsap-slider__collection">
            <div data-spatial-slider-list="" className="spatial-gsap-slider__list">
              {showcaseArticles.map((article, index) => {
                const isActive = index === activeIdx;
                return (
                  <div
                    key={article.id}
                    data-spatial-slider-item-status={isActive ? 'active' : 'inview'}
                    data-spatial-slider-item=""
                    className="spatial-gsap-slider__item"
                  >
                    <div className="demo-card">
                      <div className="demo-card__media">
                        <img
                          src={article.heroImage}
                          loading="lazy"
                          alt={article.imageAlt || article.title}
                          className="cover-image"
                        />
                        <div className="demo-card__overlay-gradient" />
                        <div className="demo-card__badge-row">
                          <span className="demo-card__cat">{article.category}</span>
                          <span className="demo-card__number">{article.number}</span>
                        </div>
                      </div>
                      <div className="demo-card__info">
                        <div className="demo-card__meta">
                          <span>{article.readingTime}</span>
                          <span>•</span>
                          <span>{article.author.name}</span>
                        </div>
                        <h3 className="demo-card__h">{article.title}</h3>
                        <p className="demo-card__deck">{article.deck}</p>
                        <div className="demo-card__cta">
                          <span>{isActive ? 'Click to Read Full Story' : 'Tap to Center'}</span>
                          <ArrowRight size={14} className="demo-card__arrow" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Spatial Drag Hint Footer */}
        <div className="spatial-footer-hint">
          <span className="spatial-drag-badge">
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            Interactive 3D Stage · Drag with mouse or swipe on touch
          </span>
        </div>
      </div>
    </section>
  );
};
