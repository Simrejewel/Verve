import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, Mail, MapPin, MessageSquare } from 'lucide-react';

interface ContactViewProps {
  onBack: () => void;
  onSuccessToast: (msg: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBack, onSuccessToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Personal Growth',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    onSuccessToast('Your pitch has been transmitted to our editorial desk.');
  };

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <div style={{ paddingTop: '2.5rem' }}>
        <button onClick={onBack} className="back-link">
          <ArrowLeft size={16} /> Back to Magazine
        </button>
      </div>

      <header className="static-page-header">
        <span className="editorial-kicker" style={{ justifyContent: 'center' }}>
          Get in Touch
        </span>
        <h1 className="static-page-title">Pitch a Story or Say Hello</h1>
        <p className="static-page-deck">
          We welcome original pitches from students, independent thinkers, and young writers across the globe.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-info-card">
          <div className="contact-detail-block">
            <h4>Pitching Guidelines</h4>
            <p>
              Send us a 2–3 paragraph outline of your proposed essay, why it matters right now to Gen Z readers, and links to any previous work. We respond to all serious pitches within 3 business days.
            </p>
          </div>

          <div className="contact-detail-block">
            <h4>Editorial Inquiries</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <Mail size={16} color="var(--accent-terracotta)" />
              <span>editorial@verve-magazine.com</span>
            </p>
          </div>

          <div className="contact-detail-block">
            <h4>Student Campus Correspondents</h4>
            <p>
              Are you covering student life, campus trends, or university policy at your campus? We are actively building student correspondent cohorts for Fall 2026.
            </p>
          </div>

          <div className="contact-detail-block">
            <h4>Masthead Bureau</h4>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <MapPin size={16} color="var(--accent-terracotta)" />
              <span>Brooklyn, New York & London (Remote Bureau)</span>
            </p>
          </div>
        </div>

        <div>
          {submitted ? (
            <div style={{
              padding: '2.5rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={48} color="var(--accent-terracotta)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pitch Received!</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Thank you, {formData.name}. Our editorial team reviews incoming submissions every Tuesday and Thursday morning.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', category: 'Personal Growth', subject: '', message: '' });
                }}
                className="btn-outline"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" style={{
              padding: '2rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-cat">Topic Category</label>
                <select
                  id="contact-cat"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Personal Growth">Personal Growth</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Career">Career & Side Hustle</option>
                  <option value="Technology">Technology & AI</option>
                  <option value="Culture">Culture & Society</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Working Headline / Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. The Reality of Remote Work for First-Time Interns"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Pitch Synopsis or Note</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you'd like to explore, the central thesis, and your angle..."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                <Send size={15} /> Submit Editorial Pitch
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
