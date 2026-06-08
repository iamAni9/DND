import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { annotate } from 'rough-notation';

const RoughAnnotation = forwardRef(({
  children,
  type = 'box',
  color = 'var(--accent)',
  strokeWidth = 2,
  padding = 8,
  showOnHover = true,
  show = null,
  animationDuration = 300,
  iterations = 2,
}, ref) => {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      annotationRef.current = annotate(elementRef.current, {
        type,
        color,
        strokeWidth,
        padding,
        animate: true,
        animationDuration,
        iterations,
      });
    }

    return () => {
      if (annotationRef.current) {
        annotationRef.current.remove();
      }
    };
  }, [type, color, strokeWidth, padding, animationDuration, iterations]);

  // Sync external show prop state if provided
  useEffect(() => {
    if (annotationRef.current && show !== null) {
      if (show) {
        annotationRef.current.show();
      } else {
        annotationRef.current.hide();
      }
    }
  }, [show]);

  // Expose instant drawing API to parent elements
  useImperativeHandle(ref, () => ({
    show: () => {
      if (annotationRef.current) {
        annotationRef.current.show();
      }
    },
    hide: () => {
      if (annotationRef.current) {
        annotationRef.current.hide();
      }
    }
  }));

  const handleMouseEnter = () => {
    if (showOnHover && show === null && annotationRef.current) {
      annotationRef.current.show();
    }
  };

  const handleMouseLeave = () => {
    if (showOnHover && show === null && annotationRef.current) {
      annotationRef.current.hide();
    }
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.wrapper}
    >
      {children}
    </span>
  );
});

const styles = {
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
};

export default RoughAnnotation;
