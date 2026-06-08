import React, { useState, useEffect, useRef } from 'react';

const InteractiveNimbu = () => {
  const containerRef = useRef(null);
  const mascotRef = useRef(null);

  // Current offset from rest position (0, 0)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Ref to store physics variables to avoid React state delay in mouse handlers
  const stateRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartMouseX: 0,
    dragStartMouseY: 0,
  });

  useEffect(() => {
    stateRef.current.isDragging = isDragging;
  }, [isDragging]);

  // requestAnimationFrame physics loop
  useEffect(() => {
    let animFrameId;
    const k = 0.08; // spring coefficient
    const damping = 0.82; // resistance/damping
    let time = 0;

    const updatePhysics = () => {
      const state = stateRef.current;
      time += 0.03;

      if (!state.isDragging) {
        // Ambient wind/swing when at rest
        const ambientSwing = Math.sin(time) * 3;
        const restX = ambientSwing;
        const restY = 0;

        // Hooke's law spring force calculation: F = -k * x
        const fx = -k * (state.x - restX);
        const fy = -k * (state.y - restY);

        state.vx = (state.vx + fx) * damping;
        state.vy = (state.vy + fy) * damping;

        state.x += state.vx;
        state.y += state.vy;

        setPosition({ x: state.x, y: state.y });
      }

      animFrameId = requestAnimationFrame(updatePhysics);
    };

    animFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  const handleMouseDown = (e) => {
    // Only drag on left click
    if (e.button !== 0) return;
    
    e.preventDefault();
    const state = stateRef.current;
    
    state.isDragging = true;
    setIsDragging(true);

    state.dragStartMouseX = e.clientX;
    state.dragStartMouseY = e.clientY;
    state.dragStartX = state.x;
    state.dragStartY = state.y;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - state.dragStartMouseX;
      const dy = moveEvent.clientY - state.dragStartMouseY;

      let newX = state.dragStartX + dx;
      let newY = state.dragStartY + dy;

      // Elastic limit constraint so user can't pull it completely off-screen
      const distance = Math.sqrt(newX * newX + newY * newY);
      const maxDistance = 260;
      if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        newX *= ratio;
        newY *= ratio;
      }

      state.x = newX;
      state.y = newY;
      state.vx = 0;
      state.vy = 0;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      state.isDragging = false;
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Draw the elastic string
  const anchorX = 100;
  const anchorY = 0;
  const targetX = 100 + position.x;
  // Offset connection point slightly down to start behind the chilies
  const targetY = position.y + 12;

  const distance = Math.sqrt(position.x * position.x + position.y * position.y);
  // Stretchy line thickness: gets thinner as pulled
  const strokeWidth = Math.max(1.2, 3.2 - (distance / 100));

  // Slightly wobbly control points for sketchy hand-drawn double lines
  const wobbleFreq = position.y > 10 ? Math.sin(position.y * 0.04) : 0;
  const ctrl1X = anchorX + position.x * 0.42 + wobbleFreq * 1.5;
  const ctrl1Y = anchorY + position.y * 0.48;
  const pathD1 = `M ${anchorX} ${anchorY} Q ${ctrl1X} ${ctrl1Y} ${targetX} ${targetY}`;

  const ctrl2X = anchorX + position.x * 0.46 - wobbleFreq * 1.0;
  const ctrl2Y = anchorY + position.y * 0.52;
  const pathD2 = `M ${anchorX} ${anchorY} Q ${ctrl2X} ${ctrl2Y} ${targetX} ${targetY}`;

  return (
    <div
      ref={containerRef}
      className="interactive-nimbu-container"
      style={{
        position: 'absolute',
        top: '-6px',
        right: '3rem',
        width: '200px',
        height: '400px',
        zIndex: 100,
        pointerEvents: 'none', // Click through container, interact with mascot only
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {/* Shadow/Outline line */}
        <path
          d={pathD1}
          stroke="rgba(15, 23, 42, 0.1)"
          strokeWidth={strokeWidth + 2.5}
          fill="none"
          strokeLinecap="round"
        />
        {/* Main string line 1 (sketch line 1) */}
        <path
          d={pathD1}
          stroke="var(--text-h)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Main string line 2 (overlapping sketch line 2) */}
        <path
          d={pathD2}
          stroke="var(--text-h)"
          strokeWidth={strokeWidth * 0.85}
          fill="none"
          strokeLinecap="round"
          opacity={0.8}
        />
        {/* Hand-drawn hook bracket loop */}
        <path
          d="M 95 -6 Q 100 4 105 -6"
          stroke="var(--text-h)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Hanger pin dot */}
        <circle cx={anchorX} cy={anchorY} r="3" fill="var(--text-h)" />
      </svg>

      <div
        ref={mascotRef}
        className="interactive-nimbu-mascot"
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: '38px', // Shifted left to center the printed png string under the hook
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.08}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div className="nimbu-bubble font-sketch">
          {isDragging ? 'Wheee! 🍋' : 'Pull me! 🍋'}
        </div>
        <img
          src="/nimbu.png"
          alt="Nimbu-Mirchi Mascot Charm"
          className="interactive-nimbu-img"
          draggable="false"
          style={{
            height: '170px',
            width: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

export default InteractiveNimbu;
