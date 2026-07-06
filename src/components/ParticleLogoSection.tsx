import React, { useEffect, useRef } from "react";

const PARTICLE_STEP = 2;   // Distance between particles (pixel sampling step)
const PARTICLE_SIZE = 1.5; // Visual size of each particle dot

// Particle class for physics simulation
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  origX: number;
  origY: number;
  colorStr: string;
  size: number;
  ttl: number | null;

  constructor(x: number, y: number, targetX: number, targetY: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
    this.targetX = targetX;
    this.targetY = targetY;
    this.origX = targetX;
    this.origY = targetY;
    this.colorStr = "#000000";
    this.size = PARTICLE_SIZE;
    this.ttl = null;
  }

  update(
    mouseX: number,
    mouseY: number,
    isMouseIn: boolean,
    mouseForce: number
  ) {
    if (this.ttl !== null && this.ttl-- <= 0) {
      // Particle was removed/disposed, randomize and reset
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * 600;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = (Math.random() - 0.5) * 8;
      this.ttl = null;
    }

    // Gravity pull towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // If mouse is not in canvas, snap to target when very close to ensure 100% crisp readability
    if (!isMouseIn && dist < 1.0) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.vx = 0;
      this.vy = 0;
      return;
    }

    let forceScale = dist * 0.015;
    // Restless jitter only active when mouse is interacting (hovering)
    let jitter = 0;
    if (isMouseIn) {
      jitter = Math.min(1, dist / 20) * 0.15;
    }
    forceScale += Math.random() * jitter - (jitter / 2);

    const angle = Math.atan2(dy, dx);
    this.vx += forceScale * Math.cos(angle);
    this.vy += forceScale * Math.sin(angle);

    // Mouse repulsion
    if (isMouseIn && mouseX >= 0 && mouseY >= 0) {
      const mxDiff = this.x - mouseX;
      const myDiff = this.y - mouseY;
      const distSq = mxDiff * mxDiff + myDiff * myDiff;

      if (distSq < mouseForce) {
        const repulsionForce = Math.min(mouseForce / distSq, mouseForce * 0.15);
        const repulsionAngle = Math.atan2(myDiff, mxDiff);
        this.vx += repulsionForce * Math.cos(repulsionAngle);
        this.vy += repulsionForce * Math.sin(repulsionAngle);
      }
    }

    // Apply friction and move (slightly higher damping to settle tightly)
    this.vx *= 0.88;
    this.vy *= 0.88;
    this.x += this.vx;
    this.y += this.vy;
  }
}

export const ParticleLogoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep ref-based physics state to avoid rebuilding particles on state updates
  const stateRef = useRef({
    particles: [] as Particle[],
    mouseX: -1,
    mouseY: -1,
    isMouseIn: false,
    imageLoaded: false,
    imageObj: null as HTMLImageElement | null
  });

  // Initial load
  useEffect(() => {
    const img = new Image();
    img.src = "/logom.png";
    img.onload = () => {
      stateRef.current.imageLoaded = true;
      stateRef.current.imageObj = img;
      initParticles(img);
    };

    // Set up window mouse events (to allow pointer-events-none canvas)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Allow interaction if mouse is within canvas bounds plus some buffer
      const buffer = 100;
      if (
        x >= -buffer &&
        x <= rect.width + buffer &&
        y >= -buffer &&
        y <= rect.height + buffer
      ) {
        stateRef.current.mouseX = x;
        stateRef.current.mouseY = y;
        stateRef.current.isMouseIn = true;
      } else {
        stateRef.current.mouseX = -1;
        stateRef.current.mouseY = -1;
        stateRef.current.isMouseIn = false;
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.mouseX = -1;
      stateRef.current.mouseY = -1;
      stateRef.current.isMouseIn = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        const buffer = 100;
        if (
          x >= -buffer &&
          x <= rect.width + buffer &&
          y >= -buffer &&
          y <= rect.height + buffer
        ) {
          stateRef.current.mouseX = x;
          stateRef.current.mouseY = y;
          stateRef.current.isMouseIn = true;
        } else {
          stateRef.current.mouseX = -1;
          stateRef.current.mouseY = -1;
          stateRef.current.isMouseIn = false;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);

    // Animation Loop
    let animId: number;
    let isIntersecting = false;

    const render = () => {
      if (!isIntersecting) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        // Clear canvas to be completely transparent so page background shows through
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        const particles = stateRef.current.particles;

        // Repulsion strength config: 12000 is default (around 110px radius)
        const mouseForce = 12000;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.update(
            stateRef.current.mouseX,
            stateRef.current.mouseY,
            stateRef.current.isMouseIn,
            mouseForce
          );

          ctx.fillStyle = p.colorStr;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }
      animId = requestAnimationFrame(render);
    };

    // Resize handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;

        if (canvas) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.scale(dpr, dpr);
          }

          // Re-center existing particles on screen resize, or initialize if empty
          if (stateRef.current.imageLoaded && stateRef.current.imageObj) {
            if (stateRef.current.particles.length === 0 && width > 0 && height > 0) {
              initParticles(stateRef.current.imageObj);
            } else {
              recenterParticles(width, height);
            }
          }
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const observer = new IntersectionObserver(([entry]) => {
      const wasIntersecting = isIntersecting;
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && !wasIntersecting) {
        render();
      }
    }, { threshold: 0.01 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  // Initialize and distribute particles based on logo pixels
  const initParticles = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    if (cw <= 0 || ch <= 0 || img.naturalWidth <= 0 || img.naturalHeight <= 0) return;

    // Create virtual canvas to read logo pixels
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Constrain logo size to fit nicely in the viewport and leave margins
    const isMobile = cw < 600;
    const maxW = isMobile ? Math.min(150, cw * 0.5) : Math.min(800, cw * 0.85);
    const maxH = isMobile ? ch * 0.5 : ch * 0.7;
    let sampledW = img.naturalWidth;
    let sampledH = img.naturalHeight;

    let scale = 1;
    if (sampledW > maxW) {
      scale = Math.min(scale, maxW / sampledW);
    }
    if (sampledH > maxH) {
      scale = Math.min(scale, maxH / sampledH);
    }

    sampledW = sampledW * scale;
    sampledH = sampledH * scale;

    tempCanvas.width = sampledW;
    tempCanvas.height = sampledH;
    tempCtx.drawImage(img, 0, 0, sampledW, sampledH);

    const imgData = tempCtx.getImageData(0, 0, sampledW, sampledH);
    const data = imgData.data;

    // Left-align the logo on the canvas next to the brand mark
    const offsetX = cw < 600 ? 10 : 20;
    const offsetY = (ch - sampledH) / 2;

    const newParticles: Particle[] = [];
    const step = isMobile ? 3 : PARTICLE_STEP;
    const particleSize = isMobile ? 1.8 : PARTICLE_SIZE;

    for (let y = 0; y < sampledH; y += step) {
      for (let x = 0; x < sampledW; x += step) {
        const idx = (y * sampledW + x) * 4;
        const alpha = data[idx + 3];

        // If pixel is visible
        if (alpha > 80) {
          const targetX = offsetX + x;
          const targetY = offsetY + y;

          // Start particles flying in from random outer edges
          const randomAngle = Math.random() * Math.PI * 2;
          const startRadius = Math.max(cw, ch) * 0.8;
          const startX = cw / 2 + Math.cos(randomAngle) * startRadius;
          const startY = ch / 2 + Math.sin(randomAngle) * startRadius;

          const particle = new Particle(startX, startY, targetX, targetY);
          particle.size = particleSize;

          // Save original relative offset in logo for resizing
          particle.origX = x / scale;
          particle.origY = y / scale;

          newParticles.push(particle);
        }
      }
    }

    // Shuffle array for cool dispersion order
    for (let i = newParticles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newParticles[i], newParticles[j]] = [newParticles[j], newParticles[i]];
    }

    stateRef.current.particles = newParticles;
  };

  // Recenter existing particle targets when screen dimension changes
  const recenterParticles = (newWidth: number, newHeight: number) => {
    const img = stateRef.current.imageObj;
    if (!img) return;

    const maxW = Math.min(800, newWidth * 0.85);
    const maxH = newHeight * 0.7;
    let sampledW = img.naturalWidth;
    let sampledH = img.naturalHeight;

    let scale = 1;
    if (sampledW > maxW) {
      scale = Math.min(scale, maxW / sampledW);
    }
    if (sampledH > maxH) {
      scale = Math.min(scale, maxH / sampledH);
    }

    sampledW = sampledW * scale;
    sampledH = sampledH * scale;

    const offsetX = newWidth < 600 ? 10 : 20;
    const offsetY = (newHeight - sampledH) / 2;

    const particles = stateRef.current.particles;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.targetX = offsetX + p.origX * scale;
      p.targetY = offsetY + p.origY * scale;
    }
  };

  return (
    <section
      ref={containerRef}
      className="absolute -inset-x-0 -top-20 -bottom-20 bg-transparent flex flex-col items-center justify-center select-none pointer-events-none"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
    </section>
  );
};
