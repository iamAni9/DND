interface LogoItem {
  name: string;
  src: string;
  gradient: string;
}

const LOGOS: LogoItem[] = [
  {
    name: "React",
    src: "https://svgl.app/library/react_dark.svg",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
  },
  {
    name: "OpenAI",
    src: "https://svgl.app/library/openai.svg",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  },
  {
    name: "AWS",
    src: "https://svgl.app/library/aws_light.svg",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  },
  {
    name: "TypeScript",
    src: "https://svgl.app/library/typescript.svg",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  },
  {
    name: "Node.js",
    src: "https://svgl.app/library/nodejs.svg",
    gradient: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
  },
  {
    name: "Docker",
    src: "https://svgl.app/library/docker.svg",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
  },
  {
    name: "Kubernetes",
    src: "https://svgl.app/library/kubernetes.svg",
    gradient: "linear-gradient(135deg, #326ce5 0%, #1e40af 100%)",
  },
  {
    name: "Python",
    src: "https://svgl.app/library/python.svg",
    gradient: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
  },
];

// Duplicate the list to ensure infinite seamless loop
const SEAMLESS_LOGOS = [...LOGOS, ...LOGOS];

export const MarqueeScroller: React.FC = () => {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto mt-10 overflow-hidden mask-edges py-6">
      <div className="animate-marquee flex gap-6 w-max">
        {SEAMLESS_LOGOS.map((logo, idx) => (
          <div
            key={`${logo.name}-${idx}`}
            className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden"
          >
            {/* Hover Background Gradient */}
            <div
              style={{ backgroundImage: logo.gradient }}
              className="absolute inset-0 scale-[1.5] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out z-0 pointer-events-none"
            />

            {/* Logo Image */}
            <img
              src={logo.src}
              alt={logo.name}
              className="relative z-10 w-20 h-10 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
