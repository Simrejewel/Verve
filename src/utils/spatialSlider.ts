// Spatial GSAP Slider using Draggable, InertiaPlugin, and CustomEase
declare global {
  interface Window {
    gsap?: any;
    Draggable?: any;
    InertiaPlugin?: any;
    CustomEase?: any;
  }
}

export interface SpatialSliderInstance {
  destroy: () => void;
  next: () => void;
  prev: () => void;
  goToIndex: (index: number) => void;
  getActiveIndex: () => number;
}

export function initSpatialSlider(
  containerElement: HTMLElement,
  options?: {
    onActiveChange?: (index: number) => void;
    onCardClick?: (index: number) => void;
  }
): SpatialSliderInstance {
  if (!containerElement || typeof window === 'undefined') {
    return {
      destroy: () => {},
      next: () => {},
      prev: () => {},
      goToIndex: () => {},
      getActiveIndex: () => 0,
    };
  }

  const gsap = window.gsap;
  const Draggable = window.Draggable;
  const InertiaPlugin = window.InertiaPlugin;
  const CustomEase = window.CustomEase;

  if (gsap && Draggable) {
    try {
      if (InertiaPlugin) gsap.registerPlugin(InertiaPlugin);
      if (CustomEase) gsap.registerPlugin(CustomEase);
      gsap.registerPlugin(Draggable);
    } catch {
      // Safe ignore if already registered
    }
  }

  const collection = containerElement.querySelector<HTMLElement>('[data-spatial-slider-collection]') || containerElement;
  const list = containerElement.querySelector<HTMLElement>('[data-spatial-slider-list]') || collection;
  const items = Array.from(containerElement.querySelectorAll<HTMLElement>('[data-spatial-slider-item]'));

  if (!items.length) {
    return {
      destroy: () => {},
      next: () => {},
      prev: () => {},
      goToIndex: () => {},
      getActiveIndex: () => 0,
    };
  }

  let activeIndex = 0;
  let isDragging = false;
  let dragDistance = 0;
  let startX = 0;
  let currentOffset = 0;
  let targetOffset = 0;
  let animTween: any = null;
  let isDestroyed = false;

  const cardWidth = items[0].offsetWidth || 340;
  const gap = 24;
  const slideStep = cardWidth + gap;

  // Set initial drag status
  containerElement.setAttribute('data-spatial-slider-drag-status', 'grab');

  const updateTransforms = (offset: number) => {
    if (isDestroyed) return;

    const collectionRect = collection.getBoundingClientRect();
    const centerX = collectionRect.left + collectionRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      // Calculate item position relative to collection center
      const basePos = index * slideStep;
      const currentPos = basePos + offset;
      const itemCenter = collectionRect.left + collectionRect.width / 2 + currentPos;
      const distanceFromCenter = (itemCenter - centerX) / slideStep;
      const absDist = Math.abs(distanceFromCenter);

      if (absDist < minDistance) {
        minDistance = absDist;
        closestIndex = index;
      }

      // Determine status
      let status = 'outview';
      if (absDist < 0.55) {
        status = 'active';
      } else if (absDist < 3.2) {
        status = 'inview';
      }
      item.setAttribute('data-spatial-slider-item-status', status);

      // 3D Spatial Curvature & Depth Transform
      const rotateY = -distanceFromCenter * 18; // 3D yaw rotation angle
      const translateZ = Math.max(-280, (1 - Math.min(1.5, absDist)) * 80 - absDist * 45); // depth extrusion
      const scale = Math.max(0.78, 1 - Math.min(1.2, absDist) * 0.1); // subtle scale decay
      const opacity = Math.max(0.35, 1 - Math.min(2.5, absDist) * 0.24);
      const zIndex = 100 - Math.round(absDist * 10);

      if (gsap) {
        gsap.set(item, {
          x: currentPos,
          rotationY: rotateY,
          z: translateZ,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          transformPerspective: 1200,
          transformOrigin: '50% 50%',
        });
      } else {
        item.style.transform = `perspective(1200px) translateX(${currentPos}px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
        item.style.opacity = `${opacity}`;
        item.style.zIndex = `${zIndex}`;
      }
    });

    if (closestIndex !== activeIndex) {
      activeIndex = closestIndex;
      if (options?.onActiveChange) {
        options.onActiveChange(activeIndex);
      }
    }
  };

  const snapToIndex = (index: number, duration = 0.65) => {
    if (isDestroyed) return;
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    targetOffset = -clampedIndex * slideStep;

    if (animTween) animTween.kill();

    if (gsap) {
      animTween = gsap.to({ val: currentOffset }, {
        val: targetOffset,
        duration: duration,
        ease: 'power3.out',
        onUpdate: function () {
          currentOffset = this.targets()[0].val;
          updateTransforms(currentOffset);
        },
        onComplete: () => {
          currentOffset = targetOffset;
          updateTransforms(currentOffset);
        }
      });
    } else {
      currentOffset = targetOffset;
      updateTransforms(currentOffset);
    }
  };

  // Click on cards
  const handleItemClick = (index: number) => {
    if (Math.abs(dragDistance) > 8) return; // Ignore if user was dragging
    if (index === activeIndex) {
      if (options?.onCardClick) options.onCardClick(index);
    } else {
      snapToIndex(index, 0.55);
    }
  };

  // Setup click listeners on items
  items.forEach((item, i) => {
    item.addEventListener('click', () => handleItemClick(i));
  });

  // Touch and pointer interaction
  const onPointerDown = (e: PointerEvent | MouseEvent) => {
    if (isDestroyed) return;
    isDragging = true;
    dragDistance = 0;
    startX = 'clientX' in e ? e.clientX : (e as any).touches[0].clientX;
    containerElement.setAttribute('data-spatial-slider-drag-status', 'grabbing');
    if (animTween) animTween.kill();
  };

  const onPointerMove = (e: PointerEvent | MouseEvent) => {
    if (!isDragging || isDestroyed) return;
    const x = 'clientX' in e ? e.clientX : (e as any).touches[0].clientX;
    const delta = x - startX;
    startX = x;
    dragDistance += Math.abs(delta);
    currentOffset += delta * 1.15;
    
    // Resistance at edges
    const minBound = -(items.length - 1) * slideStep - 60;
    const maxBound = 60;
    if (currentOffset < minBound) currentOffset = minBound;
    if (currentOffset > maxBound) currentOffset = maxBound;

    updateTransforms(currentOffset);
  };

  const onPointerUp = () => {
    if (!isDragging || isDestroyed) return;
    isDragging = false;
    containerElement.setAttribute('data-spatial-slider-drag-status', 'grab');

    // Snap to nearest slide
    const nearestIndex = Math.round(-currentOffset / slideStep);
    snapToIndex(nearestIndex, 0.6);
  };

  containerElement.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Resize handler
  const handleResize = () => {
    if (isDestroyed) return;
    snapToIndex(activeIndex, 0.2);
  };
  window.addEventListener('resize', handleResize);

  // Initial positioning
  updateTransforms(0);

  return {
    destroy: () => {
      isDestroyed = true;
      if (animTween) animTween.kill();
      containerElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', handleResize);
    },
    next: () => {
      if (activeIndex < items.length - 1) {
        snapToIndex(activeIndex + 1, 0.6);
      }
    },
    prev: () => {
      if (activeIndex > 0) {
        snapToIndex(activeIndex - 1, 0.6);
      }
    },
    goToIndex: (idx: number) => {
      snapToIndex(idx, 0.6);
    },
    getActiveIndex: () => activeIndex,
  };
}
