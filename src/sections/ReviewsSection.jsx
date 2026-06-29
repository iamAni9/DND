import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/reviews.css';

const ReviewCard = ({ quote, author }) => {
  return (
    <div className="review-card">
      <div className="review-card__accent" />
      <p className="review-quote">"{quote}"</p>
      <p className="review-author">— {author}</p>
    </div>
  );
};

const ReviewsSection = () => {
  const reviewsData = [
    {
      quote: "DevNextDoor built our SaaS platform in record time. No dev drama, zero overhead, and the code was exceptionally clean!",
      author: "Eldon, Founder of MageFlow",
    },
    {
      quote: "The AI agent integrations they built saved our support guild over 30 hours of manual labor per week. Highly recommended!",
      author: "Lyra, Director at QuestLabs",
    },
  ];

  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews-header">
        <ScrollReveal delay={50}>
          <h2 id="reviews-title" className="reviews-title font-solid">
            Testimonials
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="reviews-subtitle">
            What our clients say about working with our engineering team.
          </p>
        </ScrollReveal>
      </div>

      <div className="reviews-grid">
        {reviewsData.map((item, idx) => (
          <ScrollReveal key={idx} delay={300 + idx * 150}>
            <ReviewCard quote={item.quote} author={item.author} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
