// Gradient Wave Text on Scroll using GSAP, ScrollTrigger & SplitText
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    SplitText?: any;
  }
}

export function initGradientWaveText(targetElement?: HTMLElement | null): () => void {
  if (typeof window === 'undefined') return () => {};

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitText = window.SplitText;

  if (!gsap || !ScrollTrigger || !SplitText) {
    const timer = setTimeout(() => {
      initGradientWaveText(targetElement);
    }, 120);
    return () => clearTimeout(timer);
  }

  try {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  } catch (e) {
    // Already registered or safe ignore
  }

  const elements: HTMLElement[] = targetElement 
    ? [targetElement] 
    : Array.from(document.querySelectorAll<HTMLElement>('[data-gradient-wave-text]'));

  const cleanupFns: (() => void)[] = [];

  elements.forEach((heading) => {
    if (heading.dataset.splitInitialized === 'true') {
      return;
    }
    heading.dataset.splitInitialized = 'true';

    const scrollStart = heading.getAttribute('data-gradient-wave-scroll-start') || 'top 90%';
    const scrollEnd = heading.getAttribute('data-gradient-wave-scroll-end') || 'center 40%';
    const startColor = heading.getAttribute('data-gradient-wave-color-start') || 'rgba(140, 136, 128, 0.28)';
    const waveColor = heading.getAttribute('data-gradient-wave-color-wave') || '#c44d34';
    const waveDuration = parseFloat(heading.getAttribute('data-gradient-wave-duration') || '0.4');
    const scrubValue = parseFloat(heading.getAttribute('data-gradient-wave-scrub') || '0.1');
    const endColor = getComputedStyle(heading).color || '#141312';

    let splitInstance: any = null;
    let ctxInstance: any = null;

    try {
      splitInstance = new SplitText(heading, {
        type: 'words, chars',
        autoSplit: true,
        onSplit(self: any) {
          const chars = self.chars;
          const activeChars = new Set();
          const progress = { value: 0 };
          let isReady = false;

          const syncChars = () => {
            const activeCount = Math.round(progress.value * chars.length);

            chars.forEach((char: HTMLElement, index: number) => {
              const isActive = index < activeCount;
              gsap.killTweensOf(char);
              gsap.set(char, { color: isActive ? endColor : startColor });
              if (isActive) activeChars.add(char);
              else activeChars.delete(char);
            });
          };

          const ctx = gsap.context(() => {
            gsap.set(chars, { color: startColor });

            gsap.to(progress, {
              value: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: heading,
                start: scrollStart,
                end: scrollEnd,
                scrub: scrubValue,
                onRefresh: () => {
                  isReady = false;
                  syncChars();
                  requestAnimationFrame(() => {
                    isReady = true;
                  });
                }
              },
              onUpdate: () => {
                if (!isReady) return;

                const activeCount = Math.round(progress.value * chars.length);
                chars.forEach((char: HTMLElement, index: number) => {
                  const isActive = index < activeCount;

                  if (isActive && !activeChars.has(char)) {
                    activeChars.add(char);
                    gsap.killTweensOf(char);

                    gsap.timeline()
                      .to(char, {
                        color: waveColor,
                        duration: waveDuration * 0.3,
                        ease: 'power2.out'
                      })
                      .to(char, {
                        color: endColor,
                        duration: waveDuration * 0.7,
                        ease: 'power2.in'
                      });
                  }

                  if (!isActive && activeChars.has(char)) {
                    activeChars.delete(char);
                    gsap.killTweensOf(char);

                    gsap.to(char, {
                      color: startColor,
                      duration: waveDuration * 0.5,
                      ease: 'none'
                    });
                  }
                });
              }
            });
          }, heading);

          ctxInstance = ctx;
          return ctx;
        }
      });
    } catch (err) {
      console.warn('GradientWaveText init notice:', err);
    }

    cleanupFns.push(() => {
      heading.removeAttribute('data-split-initialized');
      if (ctxInstance && typeof ctxInstance.revert === 'function') {
        ctxInstance.revert();
      }
      if (splitInstance && typeof splitInstance.revert === 'function') {
        splitInstance.revert();
      }
    });
  });

  return () => {
    cleanupFns.forEach((fn) => fn());
  };
}
