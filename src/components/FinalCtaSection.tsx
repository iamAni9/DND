import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";

interface LaunchButtonProps {
  onClick?: () => void;
}

export const LaunchButton: React.FC<LaunchButtonProps> = ({ onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const btn = buttonRef.current;
    const canvas = canvasRef.current;
    if (!container || !btn || !canvas) return;

    // Initial GSAP Animation
    gsap.to(container, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      onUpdate: function () {
        const progress = this.progress();
        const blurAmount = Math.max(0, 10 * (1 - progress * 1.2));
        container.style.filter = `blur(${blurAmount}px)`;
      },
    });

    // Mouse Parallax on the button container
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      gsap.to(container, { x, y, duration: 2, ease: "power2.out" });
    };
    document.addEventListener("mousemove", handleMouseMove);

    // WebGL Setup
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const FS = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform float u_warp;
      uniform float u_flash;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        vec2 u=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
      }
      float fbm(vec2 p){
        float v=0.0; float a=0.5;
        for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.07+vec2(13.1,5.7); a*=0.5; }
        return v;
      }
      void main(){
        vec2 sc = gl_FragCoord.xy / u_res;
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
        float r = length(uv), rr = max(r, 0.08), a = atan(uv.y, uv.x), t = u_time;
        vec3 col = vec3(0.012, 0.011, 0.014);
        float hz = fbm(uv * 2.6 + vec2(t * 0.35, 1.7));
        col += vec3(0.13, 0.06, 0.032) * hz * (0.7 + 0.6 * u_warp);
        for (int i = 0; i < 3; i++) {
          float fi = float(i), ringN = 26.0 + fi * 9.0;
          vec2 sp = vec2((a / 6.28318 + 0.5) * ringN, (0.3 + fi * 0.22) / rr + t * (2.0 + fi * 1.2));
          vec2 cell = floor(sp), f = fract(sp);
          float h = hash(cell + fi * 17.31), on = step(0.68, h);
          vec2 c = vec2(0.2 + 0.6 * hash(cell + 4.7), 0.5), dlt = f - c;
          float sy = mix(130.0, 8.0, u_warp), star = on * exp(-(dlt.x * dlt.x * 150.0 + dlt.y * dlt.y * sy));
          float tw = (0.7 + 0.3 * sin(h * 81.0 + t * 9.0));
          vec3 sCol = mix(vec3(1.0, 0.94, 0.85), vec3(1.0, 0.6, 0.33), step(0.9, h));
          col += sCol * star * mix(tw, 1.0, u_warp) * smoothstep(0.02, 0.25, r) * (1.1 + 0.7 * u_warp);
        }
        col += vec3(1.0, 0.8, 0.58) * u_warp * 0.32 * exp(-r * 4.0);
        col = mix(col, vec3(1.0, 0.97, 0.92), clamp(u_flash, 0.0, 1.0));
        gl_FragColor = vec4(col, 1.0);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vsShader = compile(gl.VERTEX_SHADER, VS);
    const fsShader = compile(gl.FRAGMENT_SHADER, FS);
    if (!vsShader || !fsShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vsShader);
    gl.attachShader(prog, fsShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const locP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uWarp = gl.getUniformLocation(prog, "u_warp");
    const uFlash = gl.getUniformLocation(prog, "u_flash");

    let warp = 0;
    let warpTarget = 0;
    let flash = 0;
    let z = 0;
    let last = performance.now();
    let animId: number;

    const handleMouseEnter = () => {
      warpTarget = 1;
    };
    const handleMouseLeave = () => {
      warpTarget = 0;
    };
    const handleBtnClick = () => {
      flash = 1;
      warp = 0;
      z = 0;
      if (onClick) {
        setTimeout(onClick, 400);
      }
    };

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);
    btn.addEventListener("click", handleBtnClick);

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      warp += (warpTarget - warp) * Math.min(1, dt * 2.6);
      flash *= Math.exp(-4.5 * dt);
      z += dt * (0.05 + warp * 1.35);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }

      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, z);
      gl.uniform1f(uWarp, warp);
      gl.uniform1f(uFlash, flash);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", handleMouseMove);
      if (btn) {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
        btn.removeEventListener("click", handleBtnClick);
      }
      if (gl) {
        gl.deleteBuffer(buf);
        gl.deleteProgram(prog);
        gl.deleteShader(vsShader);
        gl.deleteShader(fsShader);
      }
    };
  }, [onClick]);

  return (
    <div
      ref={containerRef}
      className="opacity-0 scale-[0.6] blur-[10px] select-none text-center"
    >
      <button
        ref={buttonRef}
        type="button"
        className="group relative block w-[264px] h-[78px] border-0 p-[7px] rounded-[24px] cursor-pointer outline-none transition-all duration-300 ease-[cubic-bezier(.34,1.4,.5,1)] hover:-translate-y-[2px] active:translate-y-[1px] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-[#d43d17] focus-visible:outline-offset-[5px] bg-[linear-gradient(180deg,#3c3f46_0%,#15171b_55%,#2a2d33_100%)] shadow-[0_26px_52px_rgba(15,12,10,.35),0_3px_10px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.14)] hover:shadow-[0_32px_64px_rgba(160,60,12,.3),0_4px_12px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.16)]"
      >
        <span className="relative block w-full h-full rounded-[17px] overflow-hidden bg-[#06050a] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,.9)]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            aria-hidden="true"
          />
          <span
            className="relative z-10 pointer-events-none font-medium text-xs sm:text-sm tracking-[0.2em] indent-[0.2em] text-[#fdf6ee] uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              textShadow:
                "0 0 14px rgba(255, 170, 100, .55), 0 1px 6px rgba(0, 0, 0, .9)",
            }}
          >
            GET STARTED
          </span>
        </span>
      </button>
    </div>
  );
};

export const FinalCtaSection: React.FC = () => {
  const handleLaunchClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto py-12 px-4 md:px-6 z-10 flex flex-col items-center justify-center">
      <div className="w-full relative overflow-hidden rounded-[32px] md:rounded-[40px] border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] px-5 py-8 sm:p-8 md:p-12">
        {/* Radial Background Gradients (Light-themed cosmic style) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(99,102,241,0.06),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(6,182,212,0.06),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#0f172a05_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/60 px-3 py-1 text-xs font-bold text-indigo-700 mb-5 font-sans">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
              Final Call to Action
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a1b33] font-display leading-[1.15]">
              Let’s Build <span className="text-slate-500 font-bold">Something</span>{" "}
              <span className="bg-gradient-to-r from-[#9f1239] via-[#312e81] to-[#701a75] bg-clip-text text-transparent font-extrabold">
                Extraordinary
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
              Whether you’re building your first startup, scaling an enterprise platform, or exploring AI-powered innovation, Dev Next Door has the expertise to bring your vision to life.
            </p>

            <p className="mt-3 text-sm sm:text-base font-bold text-rose-600 font-sans">
              Book your free strategy consultation today.
            </p>
          </div>

          {/* Action Button */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end items-center w-full">
            <LaunchButton onClick={handleLaunchClick} />
          </div>
        </div>
      </div>
    </section>
  );
};
