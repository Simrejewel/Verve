import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterBoxProps {
  onSuccessToast: (msg: string) => void;
}

export const NewsletterBox: React.FC<NewsletterBoxProps> = ({ onSuccessToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    onSuccessToast('You are now subscribed to the VERVE Weekly Dispatch!');
  };

  return (
    <section className="container" aria-label="Newsletter Signup">
      <div className="newsletter-section">
        <div className="newsletter-content">
          <span className="newsletter-tag">The Sunday Dispatch</span>
          <h2 className="newsletter-title">Intel for Your 20s. Zero Fluff.</h2>
          <p className="newsletter-description">
            Every Sunday morning, we curate five ideas on intentional living, creative careers, student survival, and technology culture. Designed to be read in under 4 minutes.
          </p>

          {subscribed ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.85rem 1.5rem',
              backgroundColor: 'var(--accent-warm-tint)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-terracotta)',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              <CheckCircle2 size={18} />
              Welcome to VERVE. Check your inbox this Sunday at 8 AM.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@university.edu"
                required
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary btn-terracotta">
                Join 42,000+ Readers <ArrowRight size={15} />
              </button>
            </form>
          )}

          <p className="newsletter-disclaimer">
            Free forever. One-click unsubscribe anytime. We respect your attention.
          </p>
        </div>
      </div>
    </section>
  );
};
