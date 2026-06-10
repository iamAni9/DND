import React, { useEffect, useRef } from 'react';

// Canvas-based Rain Effect & Articulated Walking Man
const RainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Raindrop settings (black/slate ink drops visible on white background)
    const maxDrops = 75;
    const drops = [];
    const colors = ['rgba(15, 23, 42, ', 'rgba(30, 41, 59, ']; // Slate-900 & Slate-800

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        vy: 240 + Math.random() * 160,
        length: 12 + Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.25,
        angle: -0.15 - Math.random() * 0.08,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Splashes (flat ellipse ripples)
    const splashes = [];
    const spawnSplash = (x, y) => {
      splashes.push({
        x,
        y,
        radius: 1,
        maxRadius: 8 + Math.random() * 8,
        alpha: 0.5,
      });
    };

    // Walker Refs for smooth 60fps render loop
    const xProgressRef = { current: 15 }; // start progress percentage along the rope
    const directionRef = { current: 1 }; // 1 = right, -1 = left
    const walkTRef = { current: 0 }; // walk phase accumulator

    // Draw Man canvas function adapted from minimalist line-art illustration style
    const drawMan = (cx, mx, baseY, walk, right, tFrame) => {
      cx.save();
      cx.translate(mx, baseY);

      // Proportional scale down (45% of original size) to make it cute and small
      const scale = 0.45;
      cx.scale(scale, scale);

      // Body bobbing
      const bob = Math.sin(walk * 2) * 2.0;
      cx.translate(0, bob);

      const f = right ? 1 : -1;
      const leg = Math.sin(walk * 2) * 22;
      const pants = '#06b6d4'; // Cyan trousers
      const sk2 = '#1d1b4b'; // Dark outline

      // --- LEGS (Y = 0 is the rope line) ---
      [-1, 1].forEach((side) => {
        const ang = (side * f > 0 ? leg : -leg) * Math.PI / 180;
        cx.save();
        cx.translate(f * 3, -36); // hip joint relative to rope
        cx.rotate(ang);

        // Upper leg (Thigh) - outline + fill
        cx.beginPath();
        cx.moveTo(0, 0);
        cx.lineTo(f * 2, 20);
        cx.strokeStyle = sk2;
        cx.lineWidth = 11.0;
        cx.lineCap = 'round';
        cx.stroke();
        
        cx.beginPath();
        cx.moveTo(0, 0);
        cx.lineTo(f * 2, 20);
        cx.strokeStyle = pants;
        cx.lineWidth = 7.5;
        cx.lineCap = 'round';
        cx.stroke();

        // Lower leg (Shin) - outline + fill
        cx.save();
        cx.translate(f * 2, 20);
        cx.rotate(ang * 0.6);
        cx.beginPath();
        cx.moveTo(0, 0);
        cx.lineTo(f * 1, 16);
        cx.strokeStyle = sk2;
        cx.lineWidth = 10.0;
        cx.lineCap = 'round';
        cx.stroke();
        
        cx.beginPath();
        cx.moveTo(0, 0);
        cx.lineTo(f * 1, 16);
        cx.strokeStyle = pants;
        cx.lineWidth = 6.5;
        cx.lineCap = 'round';
        cx.stroke();

        // Shoe - outline + fill (white shoe)
        cx.save();
        cx.translate(f * 1, 16);
        cx.rotate(-ang * 0.3); // level shoe

        // Shoe body outline
        cx.beginPath();
        cx.ellipse(f * 3, 2, 8, 4.5, 0, 0, Math.PI * 2);
        cx.fillStyle = sk2;
        cx.fill();

        // Shoe body fill
        cx.beginPath();
        cx.ellipse(f * 3, 2, 6.5, 3.5, 0, 0, Math.PI * 2);
        cx.fillStyle = '#ffffff'; // white shoe
        cx.fill();

        // Sole outline
        cx.beginPath();
        cx.ellipse(f * 3, 3.8, 6.5, 1.2, 0, 0, Math.PI * 2);
        cx.fillStyle = '#ffffff';
        cx.fill();
        cx.strokeStyle = sk2;
        cx.lineWidth = 1.2;
        cx.stroke();

        cx.restore();
        cx.restore();
        cx.restore();
      });

      // --- TORSO (White Shirt) ---
      cx.save();
      // Torso outline
      cx.beginPath();
      cx.moveTo(-11, -36);
      cx.bezierCurveTo(-15, -48, -14, -64, -10, -68);
      cx.lineTo(10, -68);
      cx.bezierCurveTo(14, -64, 15, -48, 11, -36);
      cx.closePath();
      cx.fillStyle = sk2;
      cx.fill();

      // Torso fill (white shirt)
      cx.beginPath();
      cx.moveTo(-9, -36);
      cx.bezierCurveTo(-13, -48, -12, -62, -8, -66);
      cx.lineTo(8, -66);
      cx.bezierCurveTo(12, -62, 13, -48, 9, -36);
      cx.closePath();
      cx.fillStyle = '#ffffff';
      cx.fill();
      cx.restore();

      // --- SHIRT COLLAR (Yellow) ---
      cx.beginPath();
      cx.moveTo(-5.5, -68);
      cx.lineTo(0, -62);
      cx.lineTo(5.5, -68);
      cx.lineTo(3.5, -71);
      cx.lineTo(-3.5, -71);
      cx.closePath();
      cx.fillStyle = '#fbbf24'; // Yellow collar
      cx.fill();
      cx.strokeStyle = sk2;
      cx.lineWidth = 1.8;
      cx.stroke();

      // --- HEAD & PROFILE FACE (White) ---
      cx.save();
      // Neck outline & fill
      cx.beginPath();
      cx.moveTo(f * 2, -68);
      cx.lineTo(f * 2, -78);
      cx.strokeStyle = sk2;
      cx.lineWidth = 5.5;
      cx.lineCap = 'round';
      cx.stroke();

      cx.beginPath();
      cx.moveTo(f * 2, -68);
      cx.lineTo(f * 2, -78);
      cx.strokeStyle = '#ffffff';
      cx.lineWidth = 3.5;
      cx.lineCap = 'round';
      cx.stroke();

      // Tilted head looking up
      cx.translate(f * 2, -84);
      cx.rotate(-f * 0.16); // tilt head up slightly

      // Head outline
      cx.beginPath();
      cx.arc(0, 0, 10, 0, Math.PI * 2);
      cx.fillStyle = sk2;
      cx.fill();

      // Head fill (white face)
      cx.beginPath();
      cx.arc(0, 0, 8.5, 0, Math.PI * 2);
      cx.fillStyle = '#ffffff';
      cx.fill();

      // Profile Nose (pointing up/forward)
      cx.beginPath();
      cx.moveTo(f * 7, -2);
      cx.quadraticCurveTo(f * 11.5, -2, f * 8, 2);
      cx.lineTo(f * 6, 2);
      cx.fillStyle = '#ffffff';
      cx.fill();
      cx.strokeStyle = sk2;
      cx.lineWidth = 2.2;
      cx.lineCap = 'round';
      cx.stroke();

      // Hair (clean combed-back vector shape)
      cx.beginPath();
      if (f > 0) {
        cx.arc(0, 0, 8.5, -Math.PI * 1.1, -Math.PI * 0.15);
        cx.bezierCurveTo(4, -4, -6, 6, -10, 4);
      } else {
        cx.arc(0, 0, 8.5, -Math.PI * 0.85, 0.1 * Math.PI);
        cx.bezierCurveTo(-4, -4, 6, 6, 10, 4);
      }
      cx.closePath();
      cx.fillStyle = sk2;
      cx.fill();

      // Combed-back details
      cx.fillStyle = sk2;
      cx.beginPath();
      cx.arc(-f * 2, -9, 3.5, 0, Math.PI * 2);
      cx.arc(-f * 5, -6, 3, 0, Math.PI * 2);
      cx.fill();

      // Eye looking up
      cx.fillStyle = sk2;
      cx.beginPath();
      cx.arc(f * 4.0, -2.5, 1.4, 0, Math.PI * 2);
      cx.fill();

      // Smile
      cx.beginPath();
      cx.arc(f * 1.5, 3.5, 3.5, 0.15, Math.PI - 0.15);
      cx.strokeStyle = sk2;
      cx.lineWidth = 1.6;
      cx.stroke();

      cx.restore();

      // --- LEFT ARM (Hand on Hip) ---
      cx.save();
      // Upper arm
      cx.beginPath();
      cx.moveTo(-f * 4, -62);
      cx.lineTo(-f * 11, -52);
      cx.strokeStyle = sk2;
      cx.lineWidth = 7.5;
      cx.lineCap = 'round';
      cx.stroke();
      cx.strokeStyle = '#ffffff';
      cx.lineWidth = 4.5;
      cx.stroke();

      // Forearm
      cx.beginPath();
      cx.moveTo(-f * 11, -52);
      cx.lineTo(-f * 3, -42);
      cx.strokeStyle = sk2;
      cx.lineWidth = 7.0;
      cx.lineCap = 'round';
      cx.stroke();
      cx.strokeStyle = '#ffffff';
      cx.lineWidth = 4.0;
      cx.stroke();

      // Hand resting on hip
      cx.beginPath();
      cx.arc(-f * 3, -42, 3, 0, Math.PI * 2);
      cx.fillStyle = '#ffffff';
      cx.fill();
      cx.strokeStyle = sk2;
      cx.lineWidth = 1.5;
      cx.stroke();
      cx.restore();

      // --- RIGHT ARM (Holding umbrella stick in front) ---
      cx.save();
      cx.beginPath();
      cx.moveTo(f * 4, -62);
      cx.lineTo(f * 9, -68);
      cx.strokeStyle = sk2;
      cx.lineWidth = 8.0;
      cx.lineCap = 'round';
      cx.stroke();
      cx.strokeStyle = '#ffffff';
      cx.lineWidth = 5.0;
      cx.stroke();

      // Hand holding stick
      cx.beginPath();
      cx.arc(f * 9, -68, 3.5, 0, Math.PI * 2);
      cx.fillStyle = '#ffffff';
      cx.fill();
      cx.strokeStyle = sk2;
      cx.lineWidth = 1.8;
      cx.stroke();
      cx.restore();

      // --- UMBRELLA ---
      cx.save();
      // Stick handle passing through hand
      cx.beginPath();
      cx.moveTo(f * 9, -58);
      cx.lineTo(f * 9, -102);
      cx.strokeStyle = sk2;
      cx.lineWidth = 2.5;
      cx.lineCap = 'round';
      cx.stroke();

      // Handle bottom hook
      cx.beginPath();
      cx.arc(f * 7.5, -56.5, 3.0, 0, Math.PI * (f > 0 ? 1 : -1));
      cx.strokeStyle = sk2;
      cx.lineWidth = 2.0;
      cx.stroke();

      // Canopy translated to the top of the stick
      cx.translate(f * 9, -102);
      cx.rotate(Math.sin(tFrame * 0.04) * 0.02); // slight wind bobbing

      // Main canopy outline
      cx.beginPath();
      cx.moveTo(-45, 0);
      cx.bezierCurveTo(-47, -20, -32, -38, -20, -44);
      cx.bezierCurveTo(-10, -48, 0, -50, 0, -50); // top tip
      cx.bezierCurveTo(0, -50, 10, -48, 20, -44);
      cx.bezierCurveTo(32, -38, 47, -20, 45, 0);
      cx.quadraticCurveTo(33, -6, 22, 0);
      cx.quadraticCurveTo(11, -8, 0, 0);
      cx.quadraticCurveTo(-11, -8, -22, 0);
      cx.quadraticCurveTo(-33, -6, -45, 0);
      cx.closePath();
      cx.fillStyle = sk2;
      cx.fill();

      // Canopy fill (Cyan/Teal)
      cx.beginPath();
      cx.moveTo(-43, 0);
      cx.bezierCurveTo(-45, -18, -30, -36, -19, -42);
      cx.bezierCurveTo(-9, -46, 0, -48, 0, -48);
      cx.bezierCurveTo(0, -48, 9, -46, 19, -42);
      cx.bezierCurveTo(30, -36, 45, -18, 43, 0);
      cx.quadraticCurveTo(33, -5, 22, 0);
      cx.quadraticCurveTo(11, -7, 0, 0);
      cx.quadraticCurveTo(-11, -7, -22, 0);
      cx.quadraticCurveTo(-33, -5, -43, 0);
      cx.closePath();
      cx.fillStyle = '#06b6d4'; // Teal fill
      cx.fill();

      // Rib lines (converging at top tip (0, -48))
      cx.strokeStyle = sk2;
      cx.lineWidth = 1.8;
      [[-22, 0], [0, 0], [22, 0]].forEach(([rx, ry2]) => {
        cx.beginPath();
        cx.moveTo(0, -48);
        cx.quadraticCurveTo(rx * 0.5, ry2 * 0.5 - 20, rx, ry2);
        cx.stroke();
      });

      // Hanging points (scallop tips)
      [[-45, 0], [-22, 0], [0, 0], [22, 0], [45, 0]].forEach(([px, py]) => {
        cx.beginPath();
        cx.arc(px, py + 1.2, 1.8, 0, Math.PI * 2);
        cx.fillStyle = sk2;
        cx.fill();
      });

      // Tip
      cx.beginPath();
      cx.arc(0, -50, 3.5, 0, Math.PI * 2);
      cx.fillStyle = sk2;
      cx.fill();

      // Rain drops hitting umbrella and sliding off
      [[-36, -2], [-28, 1], [-18, 2], [20, 1], [30, -1], [38, -3]].forEach(([dx, dy]) => {
        const slideT = (tFrame * 0.05 + dx * 0.08) % 1;
        const slideX = dx + slideT * 10 * Math.sign(dx);
        const slideY = dy + slideT * 12;
        if (slideT < 0.7) {
          cx.beginPath();
          cx.arc(slideX, slideY, 1.5, 0, Math.PI * 2);
          cx.fillStyle = 'rgba(15, 23, 42, 0.55)';
          cx.fill();
        }
      });

      cx.restore();

      // Splash particles at feet when foot hits the rope
      const splashAmt = Math.abs(Math.sin(walk * 2));
      if (splashAmt > 0.85) {
        cx.save();
        cx.globalAlpha = (splashAmt - 0.85) * 4;
        [-10, 10].forEach((sx) => {
          for (let sp = 0; sp < 4; sp++) {
            const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.7;
            const len = 4 + Math.random() * 6;
            cx.beginPath();
            cx.moveTo(sx, 0);
            cx.lineTo(sx + Math.cos(ang) * len, Math.sin(ang) * len);
            cx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
            cx.lineWidth = 1.1;
            cx.stroke();
          }
        });
        cx.restore();
      }

      cx.restore();
    };

    let lastTime = performance.now();
    let globalT = 0;

    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      globalT++;

      ctx.clearRect(0, 0, width, height);

      const ropeElement = document.querySelector('.stardust-rope');
      let ropeRect = null;
      let canvasRect = null;

      if (ropeElement) {
        ropeRect = ropeElement.getBoundingClientRect();
        canvasRect = canvas.getBoundingClientRect();
      }

      // Update and draw drops
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const vx = d.vy * Math.tan(d.angle);

        d.y += d.vy * dt;
        d.x += vx * dt;

        // Check collision against the stardust rope dynamically
        let ropeYPixel = height; // default to bottom of canvas

        if (ropeElement && ropeRect && canvasRect) {
          const xInRope = d.x - (ropeRect.left - canvasRect.left);
          const ropeWidth = ropeRect.width;

          // If drop is horizontally within the rope bounds
          if (xInRope >= 0 && xInRope <= ropeWidth) {
            const t = xInRope / ropeWidth;
            // Solve Y using the bezier curve formula mapped onto client bounds
            const ropeY_svg = 25 + 160 * t * (1 - t);
            const scaleY = ropeRect.height / 40; // 40 is Y height of path (65 - 25)
            ropeYPixel = (ropeRect.top - canvasRect.top) + (ropeY_svg - 25) * scaleY;
          }
        }

        // Randomly collide with the rope or the bottom of the section
        let collisionY = height;
        const isRopeCollision = Math.random() < 0.25 && d.y >= ropeYPixel && d.y <= ropeYPixel + 8;

        if (isRopeCollision) {
          collisionY = ropeYPixel;
        }

        if (d.y >= collisionY || d.x < -20 || d.x > width + 20) {
          if (isRopeCollision || d.y >= height) {
            spawnSplash(d.x, Math.min(d.y, collisionY));
          }
          // Reset drop
          d.y = -20;
          d.x = Math.random() * width;
          d.vy = 240 + Math.random() * 160;
          d.opacity = 0.25 + Math.random() * 0.25;
        }

        // Draw drop
        ctx.strokeStyle = `${d.colorPrefix}${d.opacity})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + vx * 0.035, d.y + d.vy * 0.035);
        ctx.stroke();
      }

      // Update and draw splashes (flat ripple ellipses)
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.radius += 24 * dt; // expand radius
        s.alpha = Math.max(0, 0.5 * (1 - s.radius / s.maxRadius));

        if (s.radius >= s.maxRadius) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(15, 23, 42, ${s.alpha})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.radius, s.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw the Walking Man Mascot (Only on desktop width > 1024px)
      if (width > 1024 && ropeElement && ropeRect && canvasRect) {
        // 1. Update walker progress position (smooth, continuous)
        const speed = 4.2; // percent per second
        xProgressRef.current += speed * dt * directionRef.current;
        if (directionRef.current === 1 && xProgressRef.current >= 80) {
          directionRef.current = -1;
          xProgressRef.current = 80;
        } else if (directionRef.current === -1 && xProgressRef.current <= 15) {
          directionRef.current = 1;
          xProgressRef.current = 15;
        }

        // 2. Accumulate walk phase smoothly
        walkTRef.current += dt * 5.4;

        // 3. Compute screen and canvas coordinates of the walker on the rope
        const ropeLeft = ropeRect.left - canvasRect.left;
        const ropeWidth = ropeRect.width;
        const mx = ropeLeft + (xProgressRef.current / 100) * ropeWidth;

        const xVal = xProgressRef.current * 10;
        const t = (xVal - 50) / 840;
        const ySvg = 25 + 160 * t * (1 - t);
        const scaleY = ropeRect.height / 40; // 40 is Y height of path (65 - 25)
        const baseY = (ropeRect.top - canvasRect.top) + (ySvg - 25) * scaleY;

        // 4. Draw the cute flat-illustration style man on the rope (feet touch baseY exactly)
        drawMan(ctx, mx, baseY, walkTRef.current, directionRef.current > 0, globalT);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rain-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

export default RainEffect;
