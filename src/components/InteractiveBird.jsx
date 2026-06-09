import React, { useState, useEffect, useRef } from 'react';
import '@/styles/bird.css';

const SCARE_THRESHOLD = 90; // px
const IDLE_BEHAVIORS = ['wiggle-tail', 'tilt-left', 'tilt-right', 'peck'];
const EDGE_PADDING = 15; // px from screen edge

const InteractiveBird = () => {
  const birdRef = useRef(null);
  
  // Position and movement state (handled in ref for physics loop performance)
  const stateRef = useRef({
    x: window.innerWidth - 65, // Start on the right edge
    y: window.innerHeight * 0.3,
    vx: 0,
    vy: 0,
    targetX: window.innerWidth - 65,
    targetY: window.innerHeight * 0.3,
    state: 'SITTING', // FLYING, SITTING, SCARED, DRAGGING
    side: 'RIGHT', // LEFT or RIGHT
    facingRight: false, // Look inwards (left) when sitting on the right edge
    scaredTimer: 0,
    idleTimer: 3600 + Math.random() * 600, // Rest for ~1 minute (60-70 seconds at 60fps)
    behaviorTimer: 100 + Math.random() * 200,
    dragStartMouseX: 0,
    dragStartMouseY: 0,
    dragStartX: 0,
    dragStartY: 0,
  });

  // React state for rendering UI properties
  const [birdState, setBirdState] = useState('SITTING'); // For CSS classes
  const [facingRight, setFacingRight] = useState(false);
  const [microClass, setMicroClass] = useState(''); // e.g. wiggle-tail, tilt-head-left
  const [isDragging, setIsDragging] = useState(false);

  // Global mouse coordinates
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Update target coordinates to screen edges
  const chooseEdgeTarget = () => {
    const state = stateRef.current;
    
    // Toggle side
    state.side = state.side === 'RIGHT' ? 'LEFT' : 'RIGHT';
    
    // Set target X based on side
    if (state.side === 'LEFT') {
      state.targetX = window.scrollX + EDGE_PADDING;
    } else {
      state.targetX = window.scrollX + window.innerWidth - (EDGE_PADDING + 50);
    }
    
    // Set random target Y within visible viewport (excluding margins top and bottom)
    state.targetY = window.scrollY + 120 + Math.random() * (window.innerHeight - 240);
  };

  // Physics & Animation Loop
  useEffect(() => {
    let animFrameId;
    let time = 0;

    const update = () => {
      const state = stateRef.current;
      time += 0.05;

      // 1. Mouse coordinates relative to page
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // 2. Proximity check (scare away if mouse is close, unless dragging)
      if (state.state !== 'DRAGGING') {
        const dxToMouse = state.x - mouseX;
        const dyToMouse = state.y - mouseY;
        const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);

        if (distToMouse < SCARE_THRESHOLD) {
          // Trigger SCARED state: immediately take off to the opposite side
          state.state = 'SCARED';
          setBirdState('SCARED');
          state.scaredTimer = 120; // Scared status lasts ~2 seconds
          
          chooseEdgeTarget();
          
          // Reset the idle timer since we took off
          state.idleTimer = 3600 + Math.random() * 600;
        }
      }

      // 3. State-based position updating
      if (state.state === 'DRAGGING') {
        const targetX = state.targetX;
        const targetY = state.targetY;
        
        state.vx = (targetX - state.x) * 0.3;
        state.vy = (targetY - state.y) * 0.3;
        state.x = targetX;
        state.y = targetY;
        
        if (Math.abs(state.vx) > 0.5) {
          const isRight = state.vx > 0;
          if (isRight !== state.facingRight) {
            state.facingRight = isRight;
            setFacingRight(isRight);
          }
        }
      } 
      else if (state.state === 'SITTING') {
        // Sitting behavior: lock to viewport edges even as scroll changes
        if (state.side === 'LEFT') {
          state.x = window.scrollX + EDGE_PADDING;
          state.facingRight = true; // Look inwards
          if (facingRight !== true) setFacingRight(true);
        } else {
          state.x = window.scrollX + window.innerWidth - (EDGE_PADDING + 50);
          state.facingRight = false; // Look inwards
          if (facingRight !== false) setFacingRight(false);
        }

        // If the user scrolls, slide vertically to keep the bird in the visible screen
        const viewY = state.y - window.scrollY;
        const isOutOfView = viewY < 60 || viewY > window.innerHeight - 110;
        if (isOutOfView) {
          // Adjust target Y and slide to it
          state.targetY = window.scrollY + 120 + Math.random() * (window.innerHeight - 240);
          state.targetX = state.x; // Stay on the same edge
          state.state = 'FLYING';
          setBirdState('FLYING');
        } else {
          state.vx = 0;
          state.vy = 0;
        }

        // Sitting countdowns
        state.idleTimer--;
        state.behaviorTimer--;

        if (state.idleTimer <= 0) {
          // Time to fly across to the opposite edge!
          state.state = 'FLYING';
          setBirdState('FLYING');
          chooseEdgeTarget();
          state.idleTimer = 3600 + Math.random() * 600; // Reset (1 minute wait)
        } else if (state.behaviorTimer <= 0) {
          const behavior = IDLE_BEHAVIORS[Math.floor(Math.random() * IDLE_BEHAVIORS.length)];
          
          if (behavior === 'wiggle-tail') {
            setMicroClass('wiggle-tail');
            setTimeout(() => setMicroClass(''), 600);
          } else if (behavior === 'tilt-left') {
            setMicroClass('tilt-head-left');
            setTimeout(() => setMicroClass(''), 1500);
          } else if (behavior === 'tilt-right') {
            setMicroClass('tilt-head-right');
            setTimeout(() => setMicroClass(''), 1500);
          } else if (behavior === 'peck') {
            setMicroClass('tilt-head-right');
            setTimeout(() => {
              setMicroClass('wiggle-tail');
              setTimeout(() => setMicroClass(''), 400);
            }, 300);
          }
          
          state.behaviorTimer = 120 + Math.random() * 200; // micro-interactions every 6-12s
        }
      } 
      else {
        // FLYING or SCARED flight physics
        const tx = state.targetX;
        const ty = state.targetY;
        
        const dx = tx - state.x;
        const dy = ty - state.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Physics parameters tuned for extremely slow, lazy gliding
        const k = state.state === 'SCARED' ? 0.022 : 0.0035; // Pull force
        let damping = state.state === 'SCARED' ? 0.88 : 0.94; // Air resistance / glide damping
        
        if (dist < 80 && state.state !== 'SCARED') {
          damping = 0.82; // Stronger friction near edge to settle in slowly
        }

        const maxSpeed = state.state === 'SCARED' ? 6.5 : 1.4; // Extremely slow flight (1.4px/frame)

        state.vx = (state.vx + dx * k) * damping;
        state.vy = (state.vy + dy * k) * damping;

        // Subtle flight bobbing
        const bobAmount = state.state === 'SCARED' ? 0.4 : 0.12;
        state.vy += Math.sin(time * 4) * bobAmount;

        // Clamp speed
        const speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
        if (speed > maxSpeed) {
          state.vx = (state.vx / speed) * maxSpeed;
          state.vy = (state.vy / speed) * maxSpeed;
        }

        // Update position
        state.x += state.vx;
        state.y += state.vy;

        // Update direction facing based on velocity (overridden when sitting)
        if (Math.abs(state.vx) > 0.1) {
          const isRight = state.vx > 0;
          if (isRight !== state.facingRight) {
            state.facingRight = isRight;
            setFacingRight(isRight);
          }
        }

        // Scared state timer countdown
        if (state.state === 'SCARED') {
          state.scaredTimer--;
          if (state.scaredTimer <= 0) {
            state.state = 'FLYING';
            setBirdState('FLYING');
          }
        }

        // Arrive and sit condition
        if (dist < 10 && speed < 1.0) {
          state.state = 'SITTING';
          setBirdState('SITTING');
          state.idleTimer = 3600 + Math.random() * 600;
          state.behaviorTimer = 60 + Math.random() * 120;
        }
      }

      // 4. Directly update DOM style matrix for ultra performance
      if (birdRef.current) {
        let angle = 0;
        if (state.state === 'FLYING' || state.state === 'SCARED') {
          angle = Math.min(Math.max(state.vx * 3.5, -20), 20);
        } else if (state.state === 'DRAGGING') {
          angle = Math.min(Math.max(state.vx * 4.5, -30), 30);
        }
        
        birdRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scaleX(${state.facingRight ? 1 : -1}) rotate(${state.facingRight ? angle : -angle}deg)`;
      }

      animFrameId = requestAnimationFrame(update);
    };

    animFrameId = requestAnimationFrame(update);

    // Track cursor coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.pageX;
      mouseRef.current.y = e.pageY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Drag and Drop
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    e.preventDefault();
    e.stopPropagation();

    const state = stateRef.current;
    state.state = 'DRAGGING';
    setBirdState('DRAGGING');
    setIsDragging(true);

    state.dragStartMouseX = e.pageX;
    state.dragStartMouseY = e.pageY;
    state.dragStartX = state.x;
    state.dragStartY = state.y;
    state.targetX = state.x;
    state.targetY = state.y;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.pageX - state.dragStartMouseX;
      const dy = moveEvent.pageY - state.dragStartMouseY;
      state.targetX = state.dragStartX + dx;
      state.targetY = state.dragStartY + dy;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      state.state = 'FLYING';
      setBirdState('FLYING');
      
      // Determine side closer to release point
      const isLeft = state.x < window.scrollX + window.innerWidth / 2;
      state.side = isLeft ? 'LEFT' : 'RIGHT';
      
      if (state.side === 'LEFT') {
        state.targetX = window.scrollX + EDGE_PADDING;
      } else {
        state.targetX = window.scrollX + window.innerWidth - (EDGE_PADDING + 50);
      }
      state.targetY = state.y; // Return to the edge at the dropped altitude

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const isFlapping = birdState !== 'SITTING';

  return (
    <div
      ref={birdRef}
      className={`interactive-bird-wrapper ${birdState} ${isFlapping ? 'flapping' : ''} ${microClass} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate3d(${stateRef.current.x}px, ${stateRef.current.y}px, 0)`,
        pointerEvents: 'auto',
      }}
    >
      {/* SVG Sketch Bird Character */}
      <svg
        viewBox="0 0 64 64"
        className="interactive-bird-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow sketch overlay for a textured hand-drawn look */}
        <g opacity="0.1" transform="translate(1.5, 1.5)">
          <path d="M 30 30 C 28 25, 18 20, 16 12 C 15 9, 20 10, 25 17 C 28 20, 31 25, 31 29 Z" fill="none" stroke="#000" strokeWidth="2.5" />
          <path d="M 30 26 C 24 28, 18 32, 20 44 C 21 47, 25 47, 30 46 C 38 44, 45 38, 43 30 C 42 27, 34 25, 30 26 Z" fill="none" stroke="#000" strokeWidth="2.5" />
          <path d="M 26 33 C 24 28, 12 24, 10 16 C 9 12, 14 13, 20 20 C 23 23, 27 28, 27 32 Z" fill="none" stroke="#000" strokeWidth="2.5" />
        </g>

        {/* 1. Far Wing (behind body) */}
        <path
          className="bird-wing-far"
          d="M 30 29 C 28 24, 18 19, 15 11 C 14 8, 19 9, 24 16 C 27 19, 31 24, 31 28 Z"
        />

        {/* 2. Matchstick Legs */}
        {/* Leg 1 */}
        <path d="M 27 45 L 25 52 M 25 52 L 22 52 M 25 52 L 28 52" fill="none" />
        {/* Leg 2 */}
        <path d="M 31 45 L 29 52 M 29 52 L 26 52 M 29 52 L 32 52" fill="none" />

        {/* 3. Double-forked tail */}
        <path
          className="bird-tail"
          d="M 20 42 L 7 47 C 5 48, 5 44, 8 42 L 18 37 L 7 39 C 5 39, 5 36, 8 35 L 20 35 Z"
        />

        {/* 4. Main Body */}
        <path
          className="bird-body"
          d="M 30 26 C 24 28, 17 33, 19 44 C 21 47, 25 47, 30 46 C 37 44, 44 38, 42 30 C 41 27, 34 25, 30 26 Z"
        />

        {/* 5. Head Group (supports tilt animation) */}
        <g className="bird-head-group">
          {/* Head circle */}
          <circle cx="36" cy="22" r="9.5" />
          
          {/* Eye with eyelashes */}
          <circle cx="39.5" cy="20.5" r="2.2" className="bird-eye" />
          <path d="M 38 18 L 39 16.5" fill="none" />
          <path d="M 40.5 18 L 42.2 17" fill="none" />
          
          {/* Beak */}
          <path
            className="bird-beak"
            d="M 45 20 L 51 22.5 L 45 25 Z"
          />
          
          {/* Tiny Crest hair */}
          <path d="M 34 13 Q 32 8 27 9 Q 31 12 34 13.5" fill="none" />
        </g>

        {/* 6. Near Wing (overlaps body) */}
        <path
          className="bird-wing-near"
          d="M 26 32 C 24 27, 12 23, 9 15 C 8 11, 13 12, 19 19 C 22 22, 26 27, 26 31 Z"
        />
      </svg>
    </div>
  );
};

export default InteractiveBird;
