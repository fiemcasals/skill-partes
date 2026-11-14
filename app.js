// Navegación de la presentación: teclado, clic, swipe y #hash
(function () {
  const deck = document.querySelector(".deck");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const bar = document.querySelector(".progress");
  const count = document.querySelector(".count");
  let i = 0;

  function fit() {
    const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720) * 0.96;
    deck.style.transform = `translate(-50%, -50%) scale(${s})`;
  }

  function go(n, push = true) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((el, k) => el.classList.toggle("active", k === i));
    bar.style.width = ((i + 1) / slides.length) * 100 + "%";
    count.textContent = `${i + 1} / ${slides.length}`;
    if (push) history.replaceState(null, "", "#" + (i + 1));
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    go(Number.isFinite(n) ? n - 1 : 0, false);
  }

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) { e.preventDefault(); go(i + 1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); go(i - 1); }
    else if (k === "Home") go(0);
    else if (k === "End") go(slides.length - 1);
    else if (k === "f" || k === "F") toggleFull();
    else if (k === "t" || k === "T") toggleTheme();
  });

  // Clic en la mitad derecha avanza, izquierda retrocede (ignora links y botones)
  deck.addEventListener("click", (e) => {
    if (e.target.closest("a, button, pre, table")) return;
    const r = deck.getBoundingClientRect();
    go(e.clientX > r.left + r.width / 2 ? i + 1 : i - 1);
  });

  // Swipe en celular
  let x0 = null;
  document.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });

  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  function toggleTheme() {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
  }

  document.getElementById("prev").onclick = () => go(i - 1);
  document.getElementById("next").onclick = () => go(i + 1);
  document.getElementById("full").onclick = toggleFull;
  document.getElementById("theme").onclick = toggleTheme;

  window.addEventListener("resize", fit);
  window.addEventListener("hashchange", fromHash);
  fit();
  fromHash();
})();
