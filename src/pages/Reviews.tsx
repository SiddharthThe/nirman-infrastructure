

import React, { useEffect, useState } from 'react';
// import { parseReviews, Review } from '../lib/parseReviews';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useFadeInOnView } from '../hooks/useFadeInOnView';
// ReviewCard component to render each review safely with hooks
const ReviewCard = ({ review, expanded, onToggle }: { review: any; expanded: boolean; onToggle: () => void }) => {
  const marathi = /[\u0900-\u097F]/.test(review.review);
  const maxLength = 250;
  
  // Check if the review text is longer than the max length
  const isLong = review.review && review.review.length > maxLength;
  
  // Display text based on expanded state
  const displayText = expanded || !isLong 
    ? review.review 
    : review.review.slice(0, maxLength) + '...';
  
  // Handle button click
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
  <div className={`bg-white dark:bg-neutral-900 border border-blue-100 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-7 flex flex-col gap-4 font-sans ${marathi ? 'font-marathi' : ''}`}>
      <div className="flex items-center mb-3">
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center mr-4 shadow-sm ring-1 ring-blue-200">
          {/* Slightly dark, modern person icon */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="url(#person-gradient)" />
            <defs>
              <linearGradient id="person-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="13" r="5" fill="#f1f5f9" fillOpacity="0.95" />
            <ellipse cx="16" cy="23" rx="7" ry="4" fill="#e0e7ef" fillOpacity="0.8" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-base md:text-lg text-gray-900 dark:text-white leading-tight">{review.name}</span>
          <span className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-2">
            {review.date ? new Date(review.date).toLocaleDateString() : ''}
            {marathi && (
              <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">मराठी</span>
            )}
            {!marathi && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">EN</span>
            )}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col">
        <p className="text-gray-800 dark:text-gray-100 whitespace-pre-line text-[15px] leading-7">
          {displayText}
        </p>
        
        {isLong && (
          <button
            type="button"
            onClick={handleToggle}
            className="self-start mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors duration-200 cursor-pointer bg-transparent border-none relative z-10 pointer-events-auto"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {expanded ? (
              <>
                Show Less <span className="text-xs">↑</span>
              </>
            ) : (
              <>
                View More <span className="text-xs">→</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}


export default function Reviews() {
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  React.useEffect(() => {
    fetch('/Reviews-data.json')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => setReviews([]));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Gradient header section - match site hero/section style */}
      <div className="w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white to-purple-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 pt-24 pb-16 px-2 md:px-0 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight drop-shadow-lg">
          <span className="text-black dark:text-white">Our </span>
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Client Reviews</span>
        </h1>
        <p className="text-lg md:text-xl text-center mb-2 text-gray-600 dark:text-gray-300 max-w-2xl">Find out how our clients are spreading the word! We value every testimonial and strive to deliver excellence in every project.</p>
      </div>
      {/* Reviews grid section */}
      <div className="max-w-6xl mx-auto w-full px-2 md:px-0 -mt-14 pb-20">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, idx) => (
            <ReviewCard
              key={idx}
              review={review}
              expanded={expandedIndex === idx}
              onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
