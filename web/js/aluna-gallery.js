/* ============================================================
   ALUNA LUXE — Property Gallery (luxury mosaic + lightbox)
   Featured image + grid, opens fullscreen carousel.
   ============================================================ */
(function () {
  "use strict";

  var gallery = document.getElementById("finca-gallery");
  if (!gallery) return;

  var FB = "img/finca/";
  var slides = [
    { type: "photo", label: "Aerial — the hacienda among the sugarcane fields", src: FB + "Copia%20de%20DJI_0740.png" },
    { type: "photo", label: "The white-and-green colonial façade at golden hour", src: FB + "Copia%20de%20Casa%205.png" },
    { type: "photo", label: "The wrap-around corredor and tiled courtyard", src: FB + "Copia%20de%20DSC00470.webp" },
    { type: "photo", label: "Inner courtyard with hammock & period floor tiles", src: FB + "Copia%20de%20DSC00461.webp" },
    { type: "video", label: "Property walkthrough", src: FB + "cositas_web05.webm", poster: FB + "Copia%20de%20Casa%208.png" },
    { type: "photo", label: "The grand salon, hung with regional paintings", src: FB + "Copia%20de%20DSC00457.webp" },
    { type: "photo", label: "Library sitting room with antique furniture", src: FB + "Copia%20de%20DSC00455.webp" },
    { type: "photo", label: "Formal dining room beneath a chandelier", src: FB + "Copia%20de%20DSC00466.webp" },
    { type: "photo", label: "Country kitchen with beamed ceiling", src: FB + "Copia%20de%20Casa%204.png" },
    { type: "photo", label: "Bathroom with twin basins & garden view", src: FB + "Copia%20de%20Casa%203.png" },
    { type: "photo", label: "Shaded corredor with hammock & palms", src: FB + "Copia%20de%20DSC00468.webp" },
    { type: "photo", label: "Stone fountain in the flowering garden", src: FB + "Copia%20de%20Casa%202.png" },
    { type: "photo", label: "Gardens & mango trees toward the mountains", src: FB + "Copia%20de%20DSC00465.webp" },
    { type: "photo", label: "Corner façade framed by bougainvillea", src: FB + "Copia%20de%20Casa%208.png" },
    { type: "photo", label: "The tree-lined approach to the house", src: FB + "Copia%20de%20Casa%207.png" },
    { type: "photo", label: "Aerial — the estate beside its lagoon", src: FB + "Copia%20de%20DJI_0753.png" }
  ];

  var GAL_LABELS = {
    en: { viewAll: "View all", photos: "photos & video", of: "of", play: "Play walkthrough" },
    es: { viewAll: "Ver las", photos: "fotos y video", of: "de", play: "Reproducir recorrido" },
    de: { viewAll: "Alle", photos: "Fotos & Video", of: "von", play: "Rundgang abspielen" },
    fr: { viewAll: "Voir les", photos: "photos & vidéo", of: "sur", play: "Lancer la visite" }
  };
  function L() {
    var lang = (window.alunaI18n && window.alunaI18n.current && window.alunaI18n.current()) || "en";
    return GAL_LABELS[lang] || GAL_LABELS.en;
  }

  var current = 0;

  function slideInner(s, opts) {
    opts = opts || {};
    if (s.src && s.type === "video") {
      return ""; // handled by element creation
    }
    var play = s.type === "video" ? '<span class="g-play"><svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="11" fill="rgba(20,17,13,0.55)" stroke="#B8935A" stroke-width="0.8"/><path d="M10 8.5l6 3.5-6 3.5z" fill="#D8C9AD"/></svg></span>' : "";
    var label = opts.hideLabel ? "" : '<span class="g-label">' + (s.type === "video" ? "▶ " : "") + s.label + "</span>";
    return play + label;
  }

  function fillCell(cell, index, opts) {
    opts = opts || {};
    var s = slides[index];
    var base = opts.baseClass || "g-cell";
    cell.innerHTML = "";
    cell.className = base + (s.type === "video" ? " is-video" : "");
    cell.setAttribute("data-index", index);
    if (s.src && s.src.length) {
      cell.style.backgroundImage = "url(" + (s.poster || s.src) + ")";
      cell.innerHTML = slideInner(s, opts);
    } else {
      cell.innerHTML = slideInner(s, opts);
    }
  }

  /* ---- build mosaic ---- */
  function buildMosaic() {
    var mosaic = document.createElement("div");
    mosaic.className = "g-mosaic";

    // featured (index 0)
    var feat = document.createElement("button");
    feat.className = "g-feat";
    fillCell(feat, 0, { baseClass: "g-feat" });
    mosaic.appendChild(feat);

    // grid of next 4 (indices 1-4)
    var grid = document.createElement("div");
    grid.className = "g-grid";
    for (var i = 1; i <= 4; i++) {
      var cell = document.createElement("button");
      fillCell(cell, i, { hideLabel: true });
      // overlay "+N" on the last visible cell
      if (i === 4 && slides.length > 5) {
        var more = document.createElement("span");
        more.className = "g-more";
        more.innerHTML = "+" + (slides.length - 5);
        cell.appendChild(more);
      }
      grid.appendChild(cell);
    }
    mosaic.appendChild(grid);
    gallery.appendChild(mosaic);

    // "view all" bar
    var bar = document.createElement("div");
    bar.className = "g-bar";
    var l = L();
    bar.innerHTML = '<button class="g-viewall"><svg viewBox="0 0 24 24" width="16" height="16"><rect x="2" y="3" width="9" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="3" width="9" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="13" width="9" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="9" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span class="g-viewall-t">' + l.viewAll + " " + slides.length + " " + l.photos + "</span></button>";
    gallery.appendChild(bar);

    // lightbox
    var lb = document.createElement("div");
    lb.className = "gal-lightbox";
    lb.id = "gal-lightbox";
    lb.innerHTML =
      '<div class="gal-lb-top"><span class="gal-lb-counter" id="gal-lb-counter"></span><button class="gal-lb-close" aria-label="Close">&times;</button></div>' +
      '<div class="gal-lb-stage"><button class="gal-lb-arrow gal-lb-prev" aria-label="Previous">&#8249;</button><div class="gal-lb-slide" id="gal-lb-slide"></div><button class="gal-lb-arrow gal-lb-next" aria-label="Next">&#8250;</button></div>' +
      '<div class="gal-lb-caption" id="gal-lb-caption"></div>' +
      '<div class="gal-lb-strip" id="gal-lb-strip"></div>';
    document.body.appendChild(lb);

    // build strip thumbs
    var strip = lb.querySelector("#gal-lb-strip");
    slides.forEach(function (s, i) {
      var th = document.createElement("button");
      th.className = "gal-lb-thumb" + (s.type === "video" ? " is-video" : "");
      th.setAttribute("data-index", i);
      if (s.src && s.src.length) th.style.backgroundImage = "url(" + (s.poster || s.src) + ")";
      else th.innerHTML = '<span>' + (s.type === "video" ? "▶" : (i + 1)) + "</span>";
      strip.appendChild(th);
    });

    /* events — open lightbox from any cell */
    mosaic.addEventListener("click", function (ev) {
      var c = ev.target.closest("[data-index]");
      if (c) openLightbox(parseInt(c.getAttribute("data-index"), 10));
    });
    bar.querySelector(".g-viewall").addEventListener("click", function () { openLightbox(0); });

    lb.querySelector(".gal-lb-close").addEventListener("click", closeLightbox);
    lb.querySelector(".gal-lb-prev").addEventListener("click", function () { goLB(current - 1); });
    lb.querySelector(".gal-lb-next").addEventListener("click", function () { goLB(current + 1); });
    strip.addEventListener("click", function (ev) {
      var t = ev.target.closest(".gal-lb-thumb");
      if (t) goLB(parseInt(t.getAttribute("data-index"), 10));
    });
    lb.addEventListener("click", function (ev) { if (ev.target === lb || ev.target.classList.contains("gal-lb-stage")) closeLightbox(); });
    document.addEventListener("keydown", function (ev) {
      if (!lb.classList.contains("open")) return;
      if (ev.key === "Escape") closeLightbox();
      if (ev.key === "ArrowLeft") goLB(current - 1);
      if (ev.key === "ArrowRight") goLB(current + 1);
    });
  }

  function renderSlide(container, index) {
    var s = slides[index];
    container.innerHTML = "";
    if (s.type === "video" && s.src) {
      var vid = document.createElement("video");
      vid.controls = true; vid.src = s.src;
      if (s.poster) vid.poster = s.poster;
      container.appendChild(vid);
    } else if (s.src) {
      var img = document.createElement("img");
      img.src = s.src; img.alt = s.label;
      container.appendChild(img);
    } else {
      var ph = document.createElement("div");
      ph.className = "gal-ph" + (s.type === "video" ? " is-video" : "");
      ph.innerHTML = (s.type === "video" ? '<div class="gal-play">▶</div>' : "") + '<div class="gal-ph-label">' + s.label + "</div>";
      container.appendChild(ph);
    }
  }

  function openLightbox(i) {
    var lb = document.getElementById("gal-lightbox");
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    goLB(i);
  }
  function closeLightbox() {
    var lb = document.getElementById("gal-lightbox");
    lb.classList.remove("open");
    document.body.style.overflow = "";
    var vid = lb.querySelector("video");
    if (vid) vid.pause();
  }
  function goLB(i) {
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    current = i;
    renderSlide(document.getElementById("gal-lb-slide"), i);
    var l = L();
    document.getElementById("gal-lb-counter").textContent = (i + 1) + " " + l.of + " " + slides.length;
    document.getElementById("gal-lb-caption").textContent = slides[i].label;
    document.querySelectorAll(".gal-lb-thumb").forEach(function (th, idx) {
      th.classList.toggle("active", idx === i);
    });
    var strip = document.getElementById("gal-lb-strip");
    var active = strip.children[i];
    if (active) strip.scrollTo({ left: active.offsetLeft - strip.offsetWidth / 2 + active.offsetWidth / 2, behavior: "smooth" });
  }

  buildMosaic();

  // re-render labels when language changes
  window.alunaGalleryRefresh = function () {
    var bar = gallery.querySelector(".g-viewall-t");
    if (bar) { var l = L(); bar.textContent = l.viewAll + " " + slides.length + " " + l.photos; }
  };
})();
