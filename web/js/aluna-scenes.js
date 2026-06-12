/* ============================================================
   ALUNA LUXE — Scenes
   1) Hero scroll blur/fade (nihi-style)
   2) Photo frames: auto-rotating slides w/ blur crossfade + click-to-zoom
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. HERO SCROLL ---------- */
  (function heroScroll() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var bg = hero.querySelector(".hero-bg");
    var inner = hero.querySelector(".hero-inner");
    var foot = hero.querySelector(".hero-foot");
    var ticking = false;

    function update() {
      ticking = false;
      var vh = window.innerHeight || 800;
      var y = window.scrollY || window.pageYOffset || 0;
      var p = Math.min(y / (vh * 0.9), 1);       // 0 → 1 across ~first viewport
      var ease = p * p;                           // bias toward later blur
      if (bg) {
        bg.style.transform = "scale(" + (1 + p * 0.12).toFixed(4) + ")";
        bg.style.filter = "blur(" + (ease * 16).toFixed(2) + "px) brightness(" + (1 - p * 0.25).toFixed(3) + ")";
      }
      if (inner) {
        inner.style.opacity = Math.max(0, 1 - p * 1.25).toFixed(3);
        inner.style.transform = "translateY(" + (p * -56).toFixed(1) + "px)";
        inner.style.filter = "blur(" + (ease * 7).toFixed(2) + "px)";
      }
      if (foot) foot.style.opacity = Math.max(0, 1 - p * 2).toFixed(3);
    }

    if (reduce) return;
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();

  /* ---------- 2. PHOTO FRAMES ---------- */
  var frames = Array.prototype.slice.call(document.querySelectorAll(".photo-frame"));
  if (!frames.length) return;

  /* shared lightbox */
  var lb = document.createElement("div");
  lb.className = "pf-lightbox";
  lb.innerHTML =
    '<button class="pf-lb-close" aria-label="Close">&times;</button>' +
    '<button class="pf-lb-arrow pf-lb-prev" aria-label="Previous">&#8249;</button>' +
    '<div class="pf-lb-stage" id="pf-lb-stage"></div>' +
    '<button class="pf-lb-arrow pf-lb-next" aria-label="Next">&#8250;</button>' +
    '<div class="pf-lb-cap" id="pf-lb-cap"></div>' +
    '<div class="pf-lb-dots" id="pf-lb-dots"></div>';
  document.body.appendChild(lb);
  var lbStage = lb.querySelector("#pf-lb-stage");
  var lbCap = lb.querySelector("#pf-lb-cap");
  var lbDots = lb.querySelector("#pf-lb-dots");
  var lbFrame = null, lbIndex = 0;

  function cleanLabel(s) {
    return (s || "").replace(/^\[\s*|\s*\]$/g, "").replace(/^photo\s*—\s*/i, "").trim();
  }

  function renderLB() {
    if (!lbFrame) return;
    var slides = lbFrame._slides;
    var s = slides[lbIndex];
    lbStage.innerHTML = "";
    var node;
    if (s.src) {
      if (s.video) { node = document.createElement("video"); node.controls = true; node.src = s.src; if (s.poster) node.poster = s.poster; }
      else { node = document.createElement("img"); node.src = s.src; node.alt = cleanLabel(s.label); }
    } else {
      node = document.createElement("div");
      node.className = "pf-lb-ph ph";
      node.setAttribute("data-label", s.label);
    }
    node.className = (node.className || "") + " pf-lb-media";
    lbStage.appendChild(node);
    lbCap.textContent = cleanLabel(s.label);
    Array.prototype.forEach.call(lbDots.children, function (d, i) { d.classList.toggle("active", i === lbIndex); });
  }
  function buildLBDots() {
    lbDots.innerHTML = "";
    lbFrame._slides.forEach(function (_, i) {
      var d = document.createElement("button");
      d.className = "pf-lb-dot";
      d.addEventListener("click", function () { lbIndex = i; renderLB(); });
      lbDots.appendChild(d);
    });
  }
  function openLB(frame, idx) {
    lbFrame = frame; lbIndex = idx;
    buildLBDots(); renderLB();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLB() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    var v = lbStage.querySelector("video"); if (v) v.pause();
  }
  function stepLB(dir) {
    if (!lbFrame) return;
    var n = lbFrame._slides.length;
    lbIndex = (lbIndex + dir + n) % n;
    renderLB();
  }
  lb.querySelector(".pf-lb-close").addEventListener("click", closeLB);
  lb.querySelector(".pf-lb-prev").addEventListener("click", function () { stepLB(-1); });
  lb.querySelector(".pf-lb-next").addEventListener("click", function () { stepLB(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") stepLB(-1);
    if (e.key === "ArrowRight") stepLB(1);
  });

  /* init each frame */
  frames.forEach(function (frame, fi) {
    var slideEls = Array.prototype.slice.call(frame.querySelectorAll(".pf-slide"));
    if (!slideEls.length) return;
    frame._slides = slideEls.map(function (el) {
      return { label: el.getAttribute("data-label") || "", src: el.getAttribute("data-src") || "", video: el.hasAttribute("data-video"), poster: el.getAttribute("data-poster") || "" };
    });
    // apply real src to slide bg if present
    slideEls.forEach(function (el) {
      var src = el.getAttribute("data-src");
      if (src) { el.style.backgroundImage = "url('" + src.replace(/'/g, "%27") + "')"; el.classList.add("has-img"); }
    });

    var idx = 0, n = slideEls.length;
    var dotsWrap = document.createElement("div");
    dotsWrap.className = "pf-dots";
    slideEls.forEach(function (_, i) {
      var d = document.createElement("button");
      d.className = "pf-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Show image " + (i + 1));
      d.addEventListener("click", function (e) { e.stopPropagation(); go(i); restart(); });
      dotsWrap.appendChild(d);
    });
    frame.appendChild(dotsWrap);

    /* prev / next arrows (flanking the dots, at the bottom of each image) */
    var prevBtn = document.createElement("button");
    prevBtn.className = "pf-arrow pf-prev";
    prevBtn.type = "button";
    prevBtn.setAttribute("aria-label", "Previous image");
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17"><path d="M15 4l-8 8 8 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    prevBtn.addEventListener("click", function (e) { e.stopPropagation(); go(idx - 1); restart(); });
    var nextBtn = document.createElement("button");
    nextBtn.className = "pf-arrow pf-next";
    nextBtn.type = "button";
    nextBtn.setAttribute("aria-label", "Next image");
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    nextBtn.addEventListener("click", function (e) { e.stopPropagation(); go(idx + 1); restart(); });
    dotsWrap.insertBefore(prevBtn, dotsWrap.firstChild);
    dotsWrap.appendChild(nextBtn);

    var expand = document.createElement("button");
    expand.className = "pf-expand";
    expand.setAttribute("aria-label", "Enlarge");
    expand.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
    frame.appendChild(expand);

    var counter = document.createElement("div");
    counter.className = "pf-count";
    counter.textContent = "01 / " + String(n).padStart(2, "0");
    frame.appendChild(counter);

    function go(i) {
      idx = (i + n) % n;
      slideEls.forEach(function (el, k) { el.classList.toggle("is-active", k === idx); });
      Array.prototype.forEach.call(dotsWrap.children, function (d, k) { d.classList.toggle("active", k === idx); });
      counter.textContent = String(idx + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
    }

    var timer = null;
    function start() { if (reduce || n < 2) return; timer = setInterval(function () { go(idx + 1); }, 5200 + fi * 500); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    frame.addEventListener("mouseenter", stop);
    frame.addEventListener("mouseleave", start);
    frame.addEventListener("click", function () { openLB(frame, idx); });
    expand.addEventListener("click", function (e) { e.stopPropagation(); openLB(frame, idx); });

    go(0);
    start();
  });
})();
