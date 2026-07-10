import { animate, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector('[data-motion="site-hero"]');
const video = document.querySelector('[data-motion="hero-video"]');
const frame = document.querySelector('[data-motion="hero-frame"]');
const items = document.querySelectorAll('[data-motion="hero-item"]');
const overlay = document.querySelector('[data-motion="hero-overlay"]');
const scrollCue = document.querySelector('[data-motion="hero-cue"]');

// La portada siempre es legible: Motion solo agrega profundidad y ritmo al entrar.
if (!prefersReducedMotion && hero && frame) {
  frame.dataset.motionReady = "true";

  animate(frame, { opacity: [.82, 1], y: [30, 0], scale: [.975, 1] }, {
    duration: .86,
    easing: [0.16, 1, 0.3, 1]
  });

  if (items.length) {
    animate(items, { opacity: [.7, 1], y: [16, 0] }, {
      delay: stagger(.1),
      duration: .62,
      easing: [0.16, 1, 0.3, 1]
    });
  }

  if (video) {
    animate(video, { opacity: [.84, 1] }, {
      duration: 1.15,
      easing: "ease-out"
    });
  }

  // Al bajar, la capa de texto entrega el protagonismo al video antes de entrar al menu.
  window.setTimeout(() => {
    frame.dataset.motionScroll = "true";

    const frameExit = animate(frame, {
      opacity: [1, .72, 0],
      y: [0, -54, -150],
      scale: [1, .985, .96]
    }, { duration: 1, easing: "linear", times: [0, .16, 1] });

    scroll(frameExit, { target: hero, offset: ["start start", "end start"] });

    if (overlay) {
      const overlayReveal = animate(overlay, { opacity: [1, .74, .32] }, {
        duration: 1,
        easing: "linear",
        times: [0, .42, 1]
      });

      scroll(overlayReveal, { target: hero, offset: ["start start", "end start"] });
    }

    if (video) {
      const videoReveal = animate(video, {
        transform: [
          "translate(-50%, -50%) scale(1.06)",
          "translate(-50%, calc(-50% + 24px)) scale(1.12)",
          "translate(-50%, calc(-50% + 86px)) scale(1.2)"
        ]
      }, { duration: 1, easing: "linear", times: [0, .42, 1] });

      scroll(videoReveal, { target: hero, offset: ["start start", "end start"] });
    }

    if (scrollCue) {
      const cueExit = animate(scrollCue, { opacity: [1, .58, 0], y: [0, -10, -34] }, {
        duration: 1,
        easing: "linear",
        times: [0, .16, 1]
      });

      scroll(cueExit, { target: hero, offset: ["start start", "end start"] });
    }
  }, 900);
}
