import { useCallback, useEffect, useRef, useState } from 'react';
import type { Slide } from '../deck/types';

interface Props {
  slides: Slide[];
}

export function PresenterConsole({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const notesRef = useRef<HTMLDivElement>(null);

  // Listen for slide changes from the main window via BroadcastChannel
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('ch-slide-sync');
    } catch {
      return;
    }

    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'slide-change') {
        setActiveIndex(event.data.index);
      }
    };

    channel.addEventListener('message', handler);
    return () => {
      channel?.removeEventListener('message', handler);
      channel?.close();
    };
  }, []);

  // Auto-scroll notes to top when slide changes
  useEffect(() => {
    notesRef.current?.scrollTo(0, 0);
  }, [activeIndex]);

  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActiveIndex((i) => Math.min(slides.length - 1, i + 1)), [slides.length]);

  // Keyboard nav
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // Detect if notes are Hebrew (Unicode Hebrew block)
  const isRtl = (s: Slide | undefined) =>
    /[\u0590-\u05FF\uFB1D-\uFB4F]/.test(s?.notes ?? '');

  const slide = slides[activeIndex];

  return (
    <div className="presenter-shell">
      {/* Header */}
      <header className="presenter-header">
        <div className="presenter-nav">
          <button onClick={prev} disabled={activeIndex === 0} aria-label="Previous slide">◀</button>
          <strong>Slide {activeIndex + 1} / {slides.length}</strong>
          <button onClick={next} disabled={activeIndex === slides.length - 1} aria-label="Next slide">▶</button>
        </div>
        <small className="presenter-title">{slide?.title}</small>
      </header>

      {/* Two-column layout: slide preview + notes */}
      <div className="presenter-body">
        {/* Slide preview */}
        <section className="presenter-preview">
          <div className={`preview-card ${slide?.tone === 'dark' ? 'dark' : ''}`}>
            <p className="preview-title">{slide?.title}</p>
            {slide?.subtitle && <p className="preview-subtitle">{slide.subtitle}</p>}
          </div>
          <div className="preview-meta">
            <span>{slide?.kind}</span>
            {slide?.tone === 'dark' && <span className="preview-badge">dark</span>}
          </div>
        </section>

        {/* Speaker notes */}
        <section className={`presenter-notes${isRtl(slide) ? ' rtl' : ''}`} ref={notesRef} dir={isRtl(slide) ? 'rtl' : 'ltr'}>
          {slide?.notes ? (
            slide.notes.split('\n').map((line, i) => (
              <p key={i}>{line || '\u00A0'}</p>
            ))
          ) : (
            <p className="notes-empty">No speaker notes for this slide.</p>
          )}
        </section>
      </div>

      {/* All-slides list at bottom */}
      <footer className="presenter-footer">
        {slides.map((s, i) => (
          <button
            key={i}
            className={`presenter-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
          >
            {i + 1}
          </button>
        ))}
      </footer>
    </div>
  );
}
