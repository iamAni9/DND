import React from 'react';

const HeroSection = () => {
  return (
    <section style={styles.section} aria-labelledby="hero-heading">
      <div style={styles.overlay} />
      <div style={styles.container}>
        <h1 id="hero-heading" style={styles.title}>Welcome to DevNextDoor DnD</h1>
        <p style={styles.subtitle}>
          Join adventures, create characters, and explore worlds — whether you're a
          newcomer or a veteran Dungeon Master.
        </p>

        <div style={styles.actions}>
          <a href="/campaigns" style={{ ...styles.button, ...styles.primary }}>Browse Campaigns</a>
          <a href="/create" style={{ ...styles.button, ...styles.ghost }}>Create a Character</a>
        </div>

        <p style={styles.note}>Free resources • Homebrew tools • Community events</p>
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: '#fff',
    background: 'linear-gradient(135deg,#0f172a 0%,#0b1220 60%)',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 10% 20%, rgba(99,102,241,0.12), transparent 15%), radial-gradient(circle at 90% 80%, rgba(236,72,153,0.08), transparent 20%)',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: 960,
    padding: '4rem 1.5rem',
    textAlign: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
    margin: '0 0 1rem',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: '1.05rem',
    margin: '0 0 1.5rem',
    color: 'rgba(255,255,255,0.85)',
  },
  actions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  button: {
    display: 'inline-block',
    padding: '0.6rem 1.1rem',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'transform 120ms ease',
  },
  primary: {
    background: 'linear-gradient(90deg,#7c3aed,#06b6d4)',
    color: '#fff',
  },
  ghost: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.95)',
  },
  note: {
    marginTop: 8,
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
  },
};

export default HeroSection;
