import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLS_SRC = 'https://stream.mux.com/bnYL6x5cAX6WiJv2pOKpITehZd3NVdXpj3ylJFpX5Lk.m3u8';

const CROSS_ICON = 'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc0f520a992816d8b15dc_bullet-list-cross.svg';
const CHECK_ICON = 'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc068490683bbb3377d04_bullet-list.svg';

const negatives = [
  'Outdated software limits business growth',
  'Fragmented systems reduce team productivity',
  'Long development cycles delay market opportunities',
  'Infrastructure struggles to scale with demand',
  'Lack of technical direction increases project risk',
];

const positives = [
  'Business-first technology strategy',
  'Scalable, secure, and modern software solutions',
  'Faster product development with agile delivery',
  'Cloud-native infrastructure built for reliability',
  'Intelligent automation powered by AI',
];

function HlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: false,
        maxMaxBufferLength: 60,
        enableWorker: true,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.currentLevel = hls.levels.length - 1;
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        width: '160%',
        height: '160%',
        objectFit: 'cover',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export function FreedomSection() {
  return (
    <section
      className="w-full flex flex-col items-center"
      style={{
        backgroundColor: '#ffffff',
        padding: 'clamp(48px, 6vw, 80px) clamp(16px, 3vw, 40px)',
        gap: '36px',
      }}
    >
      {/* Block 1 — Header */}
      <div className="flex flex-col items-center gap-9 text-center">
        <div className="flex flex-col gap-3">
          <h2
            className="font-medium px-4"
            style={{
              fontSize: 'clamp(26px, 4vw, 56px)',
              color: 'rgb(26, 11, 84)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Stop letting technology hold your business back.
            <br />
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(43,167,255), rgb(202,69,255) 50%, rgb(254,136,27))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                paddingBottom: '0.3vw',
                display: 'inline-block',
              }}
            >
              Build with confidence.
            </span>
          </h2>
        </div>
      </div>

      {/* Block 2 — Three-column grid */}
      <div
        className="w-full flex flex-col lg:grid"
        style={{
          gridTemplateColumns: '26vw 1fr 26vw',
          columnGap: '36px',
          rowGap: '24px',
          alignItems: 'start',
          padding: '0 clamp(0px, 2.92vw, 40px)',
          gap: '24px',
        }}
      >
        {/* Left column — Negatives */}
        <div
          className="flex flex-col"
          style={{
            gap: '12px',
            fontSize: 'clamp(13px, 1.15vw, 17px)',
            color: 'rgb(131, 121, 158)',
          }}
        >
          <h3 className="font-bold tracking-tight text-lg text-[rgb(26,11,84)] px-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-red-400"></span>
            Challenges
          </h3>
          {negatives.map((text, idx) => (
            <div
              key={idx}
              className="flex flex-row items-start"
              style={{
                gap: '12px',
                padding: 'clamp(12px, 0.97vw, 16px) clamp(14px, 1.25vw, 20px)',
                borderRadius: '18px',
                backgroundColor: 'rgb(255, 255, 255)',
                boxShadow: '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a',
              }}
            >
              <img
                src={CROSS_ICON}
                alt=""
                aria-hidden
                style={{ width: 'clamp(16px, 1.25vw, 20px)', flexShrink: 0, marginTop: '2px' }}
              />
              <div>{text}</div>
            </div>
          ))}
        </div>

        {/* Center column — Video circle */}
        <div
          className="flex flex-col items-center justify-center gap-6"
          style={{ alignSelf: 'center' }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              width: 'clamp(200px, 22vw, 400px)',
              height: 'clamp(200px, 22vw, 400px)',
              flexShrink: 0,
              boxShadow: '0 10px 30px -10px rgba(10, 5, 45, 0.15), 0 1px 3px rgba(10, 5, 45, 0.05)',
            }}
          >
            <HlsVideo />
          </div>

          {/* Text block below the circle */}
          <div
            className="flex flex-col items-center text-center p-5 rounded-2xl w-full max-w-[280px] md:max-w-[320px]"
            style={{
              backgroundColor: 'rgb(249, 249, 249)',
              boxShadow: '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a',
              border: '1px solid rgb(240, 240, 245)',
            }}
          >
            <span className="text-indigo-600 text-lg md:text-xl font-bold mb-1">✦</span>
            <h4 className="font-bold text-base md:text-lg text-[rgb(26,11,84)] tracking-tight">
              Dev Next Door
            </h4>
            <p className="text-[12px] md:text-[13.5px] text-[#83799e] font-medium leading-relaxed mt-1">
              Building Future-Ready Digital Solutions
            </p>
            <div className="w-8 h-[1px] bg-slate-200 my-2" />
            <span className="text-[9px] md:text-[10px] text-[#2ba7ff] font-bold tracking-wider uppercase">
              Strategy • Design • Engineering • AI
            </span>
          </div>
        </div>

        {/* Right column — Positives */}
        <div
          className="flex flex-col"
          style={{
            gap: '12px',
            fontSize: 'clamp(13px, 1.15vw, 17px)',
          }}
        >
          <h3 className="font-bold tracking-tight text-lg text-[rgb(26,11,84)] px-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-green-400"></span>
            What You Gain
          </h3>
          {positives.map((text, idx) => (
            <div
              key={idx}
              className="flex flex-row items-start"
              style={{
                gap: '12px',
                padding: 'clamp(12px, 0.97vw, 16px) clamp(14px, 1.25vw, 20px)',
                borderRadius: '18px',
                backgroundColor: 'rgb(255, 255, 255)',
                boxShadow: '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a',
              }}
            >
              <img
                src={CHECK_ICON}
                alt=""
                aria-hidden
                style={{ width: 'clamp(16px, 1.25vw, 20px)', flexShrink: 0, marginTop: '2px' }}
              />
              <div style={{ color: 'rgb(26, 11, 84)' }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
