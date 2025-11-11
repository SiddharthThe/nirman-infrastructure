

import React, { useEffect, useState } from 'react';
import { parseReviews, Review } from '../lib/parseReviews';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useFadeInOnView } from '../hooks/useFadeInOnView';
// ReviewCard component to render each review safely with hooks
const ReviewCard = ({ review, idx, expanded, setExpanded, MAX_LENGTH, avatarGradient }) => {
  const marathi = /[\u0900-\u097F]/.test(review.content);
  const isLong = review.content.length > MAX_LENGTH;
  const showAll = expanded[idx];
  const displayText = isLong && !showAll ? review.content.slice(0, MAX_LENGTH) + '...' : review.content;
  const lang = marathi ? 'mr' : 'en';
  const isFeatured = idx === 0 || idx === 1;
  const offset = (idx % 3 === 1) ? 'md:translate-y-8' : '';
  const [ref, visible] = useFadeInOnView();
  // Helper to get initials for avatar
  function getInitials(name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  return (
    <div
      key={idx}
      ref={ref}
      className={`relative card-glow px-8 py-8 flex flex-col gap-4 transition-all duration-300 ${marathi ? 'font-sans' : ''} ${isFeatured ? 'ring-2 ring-[hsl(var(--primary))] bg-[hsl(var(--card)/0.98)] scale-[1.04] z-10 shadow-xl' : ''} ${offset} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)' }}
    >
      <div className="flex items-center gap-3 mb-1">
        <div className={`w-12 h-12 rounded-full ${avatarGradient} flex items-center justify-center text-white text-xl font-bold shadow-md`}>
          {getInitials(review.author)}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[hsl(var(--foreground))] text-base leading-tight">{review.author}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium mt-0.5">{review.date}</span>
        </div>
        {/* Language indicator */}
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] font-semibold uppercase tracking-wider">{lang === 'mr' ? 'मराठी' : 'EN'}</span>
      </div>
  );
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .font-marathi {
          font-family: 'Noto Sans Devanagari', 'Mukta', 'Baloo 2', 'sans-serif';
          font-size: 1.08rem;
        }
      `}</style>
      <blockquote className={`text-[1.13rem] text-[hsl(var(--foreground))] whitespace-pre-line leading-relaxed ${marathi ? 'font-marathi' : ''}`}>{displayText}</blockquote>
      {isLong && (
        <button
          className="mt-1 text-sm text-[hsl(var(--primary))] font-semibold inline-flex items-center gap-1 hover:underline hover:text-[hsl(var(--secondary))] transition-colors self-end"
          style={{padding: 0, background: 'none'}}
          onClick={() => setExpanded(e => ({ ...e, [idx]: !showAll }))}
        >
          {showAll ? 'View Less' : 'View More'}
          <ArrowRightIcon className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/Reviews-data.json')
      .then(res => res.text())
      .then(raw => {
        setReviews(parseReviews(raw));
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load reviews.');
        setLoading(false);
      });
  }, []);

  // For 'View More' toggle
  const [expanded, setExpanded] = useState<{[key:number]: boolean}>({});
  const MAX_LENGTH = 260;

  // Helper to get initials for avatar
  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  // Brand blue avatar gradient
  const avatarGradient = 'bg-gradient-to-br from-[#4f9cff] to-[#7aa8ff]';

  return (
    <main className="pt-16 pb-20 min-h-screen relative bg-[hsl(var(--background))] overflow-x-clip">
      {/* Brand watermark/gradient background */}
      <div className="pointer-events-none select-none absolute inset-0 z-0 opacity-80" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] rounded-full bg-gradient-to-br from-[#eaf3ff] via-[#f8faff] to-[#dbeafe] blur-2xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tr from-[#4f9cff22] to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <span className="px-3 py-1 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xs font-medium text-[hsl(var(--primary))] mb-3 tracking-wide">Testimonials</span>
          <h1 className="text-4xl font-extrabold text-[hsl(var(--foreground))] mb-2 text-center tracking-tight">Client Reviews</h1>
          <p className="text-center text-lg text-[hsl(var(--muted-foreground))] max-w-2xl leading-relaxed">Find out how our clients are spreading the word! We value every testimonial and strive to deliver excellence in every project.</p>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-500 animate-pulse">Loading reviews...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          Array.isArray(reviews) && reviews.length > 0 ? (
            <>
              {/* Responsive offset grid with featured cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {reviews.map((review, idx) => (
                  <ReviewCard
                    key={idx}
                    review={review}
                    idx={idx}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    MAX_LENGTH={MAX_LENGTH}
                    avatarGradient={avatarGradient}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">No reviews found.</div>
          )
        )}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .font-marathi {
          font-family: 'Noto Sans Devanagari', 'Mukta', 'Baloo 2', 'sans-serif';
          font-size: 1.08rem;
        }
      `}</style>
    </main>
  );
};

export default Reviews;
