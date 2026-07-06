import React, { useEffect, useRef } from "react";
import { animate, createTimeline, createTimer, utils } from "animejs";

export const Creature: React.FC = () => {
  const creatureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const creatureEl = creatureRef.current;
    if (!creatureEl) return;

    const rows = 13;
    const center = 6;

    const getDistanceFromCenter = (index: number) => {
      const r = Math.floor(index / rows);
      const c = index % rows;
      return Math.sqrt((r - center) ** 2 + (c - center) ** 2);
    };

    const particuleEls = creatureEl.querySelectorAll(".creature-particle");

    // Initialize particle properties with customized math for exact neon color theme
    utils.set(particuleEls, {
      x: 0,
      y: 0,
      scale: ((_el: any, i: number) => {
        const dist = getDistanceFromCenter(i);
        return 2 + (dist / 8.48) ** 2 * 3;
      }) as any,
      opacity: ((_el: any, i: number) => {
        const dist = getDistanceFromCenter(i);
        return 1 - (dist / 8.48) * 0.95;
      }) as any,
      background: ((_el: any, i: number) => {
        const dist = getDistanceFromCenter(i);
        // Stagger hue from cyan (190) in the center to hot pink/magenta (330) on edges
        const hue = 190 + (dist / 8.48) * 140;
        return `hsl(${hue}, 85%, 55%)`;
      }) as any,
      boxShadow: ((_el: any, i: number) => {
        const dist = getDistanceFromCenter(i);
        const hue = 190 + (dist / 8.48) * 140;
        const glow = 8 - (dist / 8.48) * 7.2;
        return `0px 0px ${utils.round(glow, 1)}em 0px hsl(${hue}, 90%, 60%)`;
      }) as any,
      zIndex: ((_el: any, i: number) => {
        const dist = getDistanceFromCenter(i);
        return Math.round(100 - dist * 10);
      }) as any
    });

    const cursor = { x: 0, y: 0 };
    const bounds = { w: 80, h: 80 };

    const pulse = () => {
      animate(particuleEls, {
        keyframes: [
          {
            scale: 5,
            opacity: 1,
            delay: ((_el: any, i: number) => {
              const dist = getDistanceFromCenter(i);
              return 1500 + dist * 100;
            }) as any,
            duration: 150,
          },
          {
            scale: ((_el: any, i: number) => {
              const dist = getDistanceFromCenter(i);
              return 2 + (dist / 8.48) ** 2 * 3;
            }) as any,
            opacity: ((_el: any, i: number) => {
              const dist = getDistanceFromCenter(i);
              return 1 - (dist / 8.48) * 0.95;
            }) as any,
            ease: "inOutQuad",
            duration: 600
          }
        ]
      });
    };

    let isIntersecting = false;

    const mainLoop = createTimer({
      frameRate: 20,
      onUpdate: () => {
        if (!isIntersecting) return;
        animate(particuleEls, {
          x: cursor.x,
          y: cursor.y,
          delay: ((_el: any, i: number) => {
            const dist = getDistanceFromCenter(i);
            return dist * 35;
          }) as any,
          duration: ((_el: any, i: number) => {
            const dist = getDistanceFromCenter(i);
            return 700 + (dist / 8.48) ** 2 * 150;
          }) as any,
          ease: "inOut",
          composition: "blend"
        });
      }
    });
    mainLoop.pause();

    const autoMove = createTimeline()
      .add(cursor, {
        x: [-bounds.w * 0.5, bounds.w * 0.5],
        modifier: ((x: number) => x + Math.sin(mainLoop.currentTime * 0.0007) * bounds.w * 0.6) as any,
        duration: 3000,
        ease: "inOutExpo",
        alternate: true,
        loop: true,
        onBegin: pulse,
        onLoop: pulse
      }, 0)
      .add(cursor, {
        y: [-bounds.h * 0.5, bounds.h * 0.5],
        modifier: ((y: number) => y + Math.cos(mainLoop.currentTime * 0.00012) * bounds.h * 0.6) as any,
        duration: 1000,
        ease: "inOutQuad",
        alternate: true,
        loop: true
      }, 0);
    autoMove.pause();

    const manualMovementTimeout = createTimer({
      duration: 1500,
      onComplete: () => {
        if (isIntersecting) autoMove.play();
      }
    });
    manualMovementTimeout.pause();

    const followPointer = (e: MouseEvent | TouchEvent) => {
      if (!isIntersecting) return;
      const event = e instanceof TouchEvent ? e.touches[0] : e;
      const rect = creatureEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 + window.scrollX;
      const centerY = rect.top + rect.height / 2 + window.scrollY;

      let targetX = event.pageX - centerX;
      let targetY = event.pageY - centerY;

      const dist = Math.sqrt(targetX * targetX + targetY * targetY);
      const minRadius = 45; // radius to prevent particles from entering the mini neon box (in pixels)

      if (dist < minRadius) {
        if (dist === 0) {
          targetX = minRadius;
          targetY = 0;
        } else {
          targetX = (targetX / dist) * minRadius;
          targetY = (targetY / dist) * minRadius;
        }
      }

      cursor.x = targetX;
      cursor.y = targetY;

      autoMove.pause();
      manualMovementTimeout.restart();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        mainLoop.play();
        autoMove.play();
      } else {
        mainLoop.pause();
        autoMove.pause();
        manualMovementTimeout.pause();
      }
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("mousemove", followPointer);
    window.addEventListener("touchmove", followPointer, { passive: true } as any);

    return () => {
      window.removeEventListener("mousemove", followPointer);
      window.removeEventListener("touchmove", followPointer);
      observer.disconnect();
      mainLoop.pause();
      autoMove.pause();
      manualMovementTimeout.pause();
    };
  }, []);

  const rows = 13;
  const total = rows * rows;
  const particles = Array.from({ length: total });

  const isCenter = (idx: number) => {
    const r = Math.floor(idx / rows);
    const c = idx % rows;
    return r >= 4 && r <= 8 && c >= 4 && c <= 8;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[240px] flex items-center justify-center overflow-visible select-none mt-4">
      {/* Soft color-matching glow behind the creature */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-cyan-500/5 blur-[50px] pointer-events-none" />

      {/* Grid Container */}
      <div
        ref={creatureRef}
        id="creature"
        className="relative flex flex-wrap justify-center items-center pointer-events-none"
        style={{
          fontSize: "1.6px",
          width: `${rows * 10}em`,
          height: `${rows * 10}em`
        }}
      >
        {/* Central Mini Neon Box */}
        <div
          className="absolute w-[44em] h-[44em] rounded-[16px] overflow-hidden flex items-center justify-center p-[2px] z-20 pointer-events-auto"
          style={{
            background:
              "linear-gradient(#0A0A0B, #0A0A0B) padding-box, conic-gradient(from var(--border-angle), #FF3D77 0%, #7DD3FC 33%, #F72585 66%, #FF3D77 100%) border-box"
          }}
        >
          <div className="w-full h-full rounded-[14px] bg-[#121214] flex items-center justify-center shadow-inner">
            <span className="text-[15px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D77] to-[#7DD3FC] font-extrabold select-none animate-pulse">
              ✦
            </span>
          </div>
        </div>

        {/* Swarm Particles */}
        {particles.map((_, idx) => (
          <div
            key={idx}
            className={`creature-particle relative w-[4em] h-[4em] m-[3em] rounded-[2em] will-change-transform ${
              isCenter(idx) ? "center-hole" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              mixBlendMode: "plus-lighter"
            }}
          />
        ))}
      </div>
    </div>
  );
};
