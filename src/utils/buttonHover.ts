// Directional Circle Hover Button Animation using GSAP
export function initButtonHover(container?: HTMLElement | Document): () => void {
  if (typeof window === 'undefined') return () => {};

  const root = container || document;
  const buttons = Array.from(root.querySelectorAll<HTMLElement>('[data-btn-hover]'));
  const gsap = window.gsap;

  const cleanupFns: (() => void)[] = [];

  buttons.forEach((btn) => {
    if (btn.dataset.hoverInitialized === 'true') return;
    btn.dataset.hoverInitialized = 'true';

    let circle = btn.querySelector<HTMLElement>('.btn__circle');
    let circleWrap = btn.querySelector<HTMLElement>('.btn__circle-wrap');

    // Automatically inject circle markup if not already present
    if (!circleWrap) {
      circleWrap = document.createElement('div');
      circleWrap.className = 'btn__circle-wrap';
      circle = document.createElement('div');
      circle.className = 'btn__circle';
      const before100 = document.createElement('div');
      before100.className = 'before__100';
      circle.appendChild(before100);
      circleWrap.appendChild(circle);
      btn.insertBefore(circleWrap, btn.firstChild);
    } else if (!circle) {
      circle = document.createElement('div');
      circle.className = 'btn__circle';
      circleWrap.appendChild(circle);
    }

    if (!circle) return;

    let tween: any = null;

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.6;

      circle!.style.width = `${size}px`;
      circle!.style.height = `${size}px`;
      circle!.style.left = `${x}px`;
      circle!.style.top = `${y}px`;

      if (gsap) {
        if (tween) tween.kill();
        gsap.set(circle, { scale: 0, opacity: 1 });
        tween = gsap.to(circle, {
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
        });
      } else {
        circle!.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (gsap) {
        if (tween) tween.kill();
        tween = gsap.to(circle, {
          left: x,
          top: y,
          scale: 0,
          duration: 0.45,
          ease: 'power2.in',
        });
      } else {
        circle!.style.transform = 'translate(-50%, -50%) scale(0)';
      }
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    cleanupFns.push(() => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      btn.removeAttribute('data-hover-initialized');
    });
  });

  return () => {
    cleanupFns.forEach((fn) => fn());
  };
}
