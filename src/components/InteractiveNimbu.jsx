import React, { useState, useEffect, useRef } from 'react';

const InteractiveNimbu = () => {
  const containerRef = useRef(null);
  const mascotRef = useRef(null);

  // Current offset from rest position (0, 0)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const containerWidth = isMobile ? 120 : 200;
  const containerHeight = isMobile ? 280 : 400;
  const imgHeight = isMobile ? 100 : 170;
  const imgLeft = isMobile ? '20px' : '38px';
  const anchorX = containerWidth / 2;
  const anchorY = 0;
  const sparkleCenterY = isMobile ? 65 : 120;

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
    sparkles: [],
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
      }

      // Spawn sparkles on velocity bounce
      const speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
      if (speed > 1.2 && Math.random() < 0.35) {
        state.sparkles.push({
          id: Math.random(),
          x: anchorX + state.x + (Math.random() - 0.5) * 16,
          y: sparkleCenterY + state.y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 3 + state.vx * 0.25,
          vy: (Math.random() - 0.5) * 3 - 1.5 + state.vy * 0.25,
          color: ['#ffd700', '#ebdcae', '#aa3bff', '#4deeea', '#ff8c00', '#ff007f'][Math.floor(Math.random() * 6)],
          size: 4 + Math.random() * 5,
          life: 0.95,
        });
      }

      // Update sparkles physics
      state.sparkles = state.sparkles
        .map((s) => ({
          ...s,
          x: s.x + s.vx,
          y: s.y + s.vy,
          vy: s.vy + 0.14, // gravity
          vx: s.vx * 0.95, // friction
          life: s.life - 0.022,
        }))
        .filter((s) => s.life > 0);

      setPosition({ x: state.x, y: state.y });
      setSparkles([...state.sparkles]);

      animFrameId = requestAnimationFrame(updatePhysics);
    };

    animFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrameId);
  }, [anchorX, sparkleCenterY]);

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

      // Spawn sparkles on drag movement
      if (Math.random() < 0.45) {
        state.sparkles.push({
          id: Math.random(),
          x: anchorX + newX + (Math.random() - 0.5) * 20,
          y: sparkleCenterY + newY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2, // shoot up slightly
          color: ['#ffd700', '#ff8c00', '#aa3bff', '#00f6ff', '#ffffff', '#ff007f'][Math.floor(Math.random() * 6)],
          size: 4 + Math.random() * 6,
          life: 1.0,
        });
      }

      setPosition({ x: newX, y: newY });
      setSparkles([...state.sparkles]);
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

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const state = stateRef.current;
    
    state.isDragging = true;
    setIsDragging(true);

    state.dragStartMouseX = touch.clientX;
    state.dragStartMouseY = touch.clientY;
    state.dragStartX = state.x;
    state.dragStartY = state.y;

    const handleTouchMove = (moveEvent) => {
      if (moveEvent.touches.length !== 1) return;
      const t = moveEvent.touches[0];
      const dx = t.clientX - state.dragStartMouseX;
      const dy = t.clientY - state.dragStartMouseY;

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

      // Spawn sparkles on drag movement
      if (Math.random() < 0.45) {
        state.sparkles.push({
          id: Math.random(),
          x: anchorX + newX + (Math.random() - 0.5) * 20,
          y: sparkleCenterY + newY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2, // shoot up slightly
          color: ['#ffd700', '#ff8c00', '#aa3bff', '#00f6ff', '#ffffff', '#ff007f'][Math.floor(Math.random() * 6)],
          size: 4 + Math.random() * 6,
          life: 1.0,
        });
      }

      setPosition({ x: newX, y: newY });
      setSparkles([...state.sparkles]);
    };

    const handleTouchEnd = () => {
      state.isDragging = false;
      setIsDragging(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
  };

  // Draw the elastic string
  const targetX = anchorX + position.x;
  // Offset connection point slightly down to start behind the chilies
  const targetY = position.y + (isMobile ? 7 : 12);

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
        right: isMobile ? '1.25rem' : '3rem',
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
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
          d={`M ${anchorX - 5} -6 Q ${anchorX} 4 ${anchorX + 5} -6`}
          stroke="var(--text-h)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Hanger pin dot */}
        <circle cx={anchorX} cy={anchorY} r="3" fill="var(--text-h)" />

        {/* Render magical sparkles */}
        {sparkles.map((s) => (
          <g key={s.id} opacity={s.life}>
            {/* Outer blur glow */}
            <circle
              cx={s.x}
              cy={s.y}
              r={s.size * 1.6}
              fill={s.color}
              filter="blur(1.8px)"
              opacity={0.45}
            />
            {/* White core */}
            <circle
              cx={s.x}
              cy={s.y}
              r={s.size * 0.75}
              fill="#ffffff"
            />
            {/* Core color */}
            <circle
              cx={s.x}
              cy={s.y}
              r={s.size * 0.5}
              fill={s.color}
            />
            {/* Twinkle cross shapes for larger sparkles */}
            {s.size > 7.5 && (
              <path
                d={`M ${s.x - s.size} ${s.y} L ${s.x + s.size} ${s.y} M ${s.x} ${s.y - s.size} L ${s.x} ${s.y + s.size}`}
                stroke="#ffffff"
                strokeWidth="1.2"
                opacity="0.8"
              />
            )}
          </g>
        ))}
      </svg>

      <div
        ref={mascotRef}
        className="interactive-nimbu-mascot"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: 'absolute',
          left: imgLeft, // Shifted left to center the printed png string under the hook
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.08}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        <div className="nimbu-bubble font-sketch">
          {isDragging ? 'Magic Sparkles! ✨' : 'Pull me! 🍋'}
        </div>
        <img
          src="/nimbu.png"
          alt="Nimbu-Mirchi Mascot Charm"
          className="interactive-nimbu-img"
          draggable="false"
          style={{
            height: `${imgHeight}px`,
            width: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

export default InteractiveNimbu;
