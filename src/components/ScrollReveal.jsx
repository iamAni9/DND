import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 800,
  display = 'block',
}) => {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of element is in viewport
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(15px)',
    transition: `opacity ${duration}ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
    willChange: 'transform, opacity',
    display: display,
    width: display === 'block' ? '100%' : 'auto',
  };

  return (
    <div ref={elementRef} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
