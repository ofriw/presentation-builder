import { useEffect, useRef } from 'react';
import amatLogo from '../../logo.svg?url';
import amatLogoInverted from '../../logo-inverted.svg?url';
import chunkHoundLogo from '../../wordmark-centered.svg?url';
import chunkHoundLogoLight from '../../wordmark-centered-light.svg?url';
import type { Slide } from '../deck/types';
import { SlidePrimitive } from '../primitives/SlidePrimitive';

interface Props {
  slides: Slide[];
}

export function SlideFrame({ slides }: Props) {
  const deckRef = useRef<HTMLElement>(null);

  // Broadcast current slide index to presenter window
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;

    // Use a single BroadcastChannel for slide sync
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('ch-slide-sync');
    } catch {
      return; // BroadcastChannel not supported — presenter mode unavailable
    }

    const visible = new Map<number, number>();
    let lastBroadcast = -1;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute('data-slide-index'));
          visible.set(idx, entry.intersectionRatio);
        }
        let best = 0;
        let bestIdx = 0;
        for (const [idx, ratio] of visible) {
          if (ratio > best) {
            best = ratio;
            bestIdx = idx;
          }
        }
        // Only broadcast if the active slide changed
        if (bestIdx !== lastBroadcast) {
          lastBroadcast = bestIdx;
          channel!.postMessage({ type: 'slide-change', index: bestIdx });
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );

    const children = el.querySelectorAll('[data-slide-index]');
    for (const child of children) observer.observe(child);

    // Keyboard shortcut: P opens presenter window
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'p' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}?presenter`;
        window.open(url, 'ch-presenter', 'width=640,height=800,scrollbars=yes');
      }
    }
    window.addEventListener('keydown', handleKey);

    return () => {
      observer.disconnect();
      channel?.close();
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <main className="deck-shell" ref={deckRef}>
      {slides.map((slide, index) => (
        <article
          className={`slide ${slide.tone === 'dark' ? 'dark' : ''}`}
          aria-label={`${index + 1}. ${slide.title}`}
          key={slide.title}
          data-slide-index={index}
        >
          <BrandLockup dark={slide.tone === 'dark'} />
          <SlidePrimitive slide={slide} fragmentStep={getFragmentCount(slide)} />
          <footer className="slide-count">{index + 1} / {slides.length}</footer>
        </article>
      ))}
    </main>
  );
}

function BrandLockup({ dark }: { dark: boolean }) {
  return (
    <div className="brand-lockup corner" aria-label="Applied Materials and ChunkHound">
      <span className="brand-logo-wrap">
        <img className="brand-logo amat" src={dark ? amatLogoInverted : amatLogo} alt="Applied Materials" />
      </span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-logo-wrap">
        <img className="brand-logo chunkhound" src={dark ? chunkHoundLogoLight : chunkHoundLogo} alt="ChunkHound" />
      </span>
    </div>
  );
}

function getFragmentCount(slide: Slide) {
  if (slide.fragments) return slide.fragments.length;

  switch (slide.kind) {
    case 'fragmentedQuote':
      return (slide.content as { fragments?: unknown[] }).fragments?.length ?? 0;
    case 'decisionFunnel':
      return (slide.content as { filters?: unknown[] }).filters?.length ?? 0;
    case 'pipelineFailure':
      return 1;
    case 'iterativeLoop': {
      const content = slide.content as { trail?: unknown[] };
      return (content.trail?.length ?? 0) + 2;
    }
    case 'parallelResearch':
      return (slide.content as { spokes?: unknown[] }).spokes?.length ?? 0;
    default:
      return 0;
  }
}
