const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll(".reveal");
const staggerItems = document.querySelectorAll(".reveal-stagger");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
);

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  staggerItems.forEach((item) => item.classList.add("is-visible"));
} else {
  revealItems.forEach((item) => revealObserver.observe(item));
  staggerItems.forEach((item) => revealObserver.observe(item));

  const story = document.querySelector(".story");
  const storyBg = document.querySelector(".story__bg");
  const pollenRoot = document.getElementById("hero-pollen");

  let parallaxFrame = 0;

  function createPollen() {
    if (!pollenRoot) return;

    const count = window.innerWidth < 768 ? 10 : 14;

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "pollen";
      particle.style.left = `${8 + Math.random() * 84}%`;
      particle.style.top = `${18 + Math.random() * 62}%`;
      particle.style.setProperty("--pollen-duration", `${12 + Math.random() * 10}s`);
      particle.style.setProperty("--pollen-delay", `${Math.random() * 8}s`);
      particle.style.setProperty("--pollen-x", `${-30 + Math.random() * 60}px`);
      particle.style.setProperty("--pollen-y", `${-90 - Math.random() * 80}px`);
      pollenRoot.appendChild(particle);
    }
  }

  function updateParallax() {
    parallaxFrame = 0;

    if (story && storyBg) {
      const rect = story.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height * 0.35)));
      const y = (1 - progress) * 18;
      const scale = 1 + progress * 0.03;
      storyBg.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
    }
  }

  function onScroll() {
    if (parallaxFrame) return;
    parallaxFrame = window.requestAnimationFrame(updateParallax);
  }

  createPollen();
  updateParallax();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax, { passive: true });
}
