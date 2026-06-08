/* ============================================================
   ALUNA LUXE — interacciones
   ============================================================ */
(function () {
  "use strict";

  /* nav solidify */
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* reveal */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* smooth anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      ev.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 4, behavior: "smooth" });
    });
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq");
      var ans = item.querySelector(".faq-a");
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!open) { item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; }
    });
  });

  /* lead form — supports BOTH single-step (#send-btn) and 3-step (#next-btn) */
  var form = document.getElementById("lead-form");
  if (!form) return;
  var doneEl = document.getElementById("form-done");

  function validate(scope) {
    var ok = true;
    scope.querySelectorAll("[data-required]").forEach(function (f) {
      if (f.closest(".method-block.hidden")) return;
      var field = f.closest(".field");
      var v = f.value && f.value.trim().length > 0;
      if (f.type === "email") v = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
      if (field) field.classList.toggle("err", !v);
      if (!v) ok = false;
    });
    scope.querySelectorAll("[data-choice-required]").forEach(function (g) {
      var sel = g.querySelector(".choice.sel");
      var note = g.parentNode.querySelector(".msg");
      if (!sel) { ok = false; if (note) note.style.display = "block"; }
      else if (note) note.style.display = "none";
    });
    return ok;
  }

  form.querySelectorAll("input, select").forEach(function (f) {
    f.addEventListener("input", function () { var fl = f.closest(".field"); if (fl) fl.classList.remove("err"); });
  });
  form.querySelectorAll("[data-choice-group]").forEach(function (g) {
    g.addEventListener("click", function (ev) {
      var c = ev.target.closest(".choice");
      if (!c) return;
      g.querySelectorAll(".choice").forEach(function (x) { x.classList.remove("sel"); });
      c.classList.add("sel");
      var note = g.parentNode.querySelector(".msg");
      if (note) note.style.display = "none";
    });
  });

  var nextBtn = form.querySelector("#next-btn");

  /* ---- single-step variant ---- */
  if (!nextBtn) {
    var sendBtn = form.querySelector("#send-btn");
    if (sendBtn) sendBtn.addEventListener("click", function () {
      if (!validate(form)) return;
      form.style.display = "none";
      doneEl.classList.add("show");
    });
    return;
  }

  /* ---- 3-step variant (parity with MESA A) ---- */
  var steps = Array.prototype.slice.call(form.querySelectorAll(".fstep"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".step-dot"));
  var backBtn = form.querySelector("#back-btn");
  var headEl = document.getElementById("steps-head");
  var current = 0;

  function render() {
    steps.forEach(function (s, i) { s.classList.toggle("active", i === current); });
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
      d.classList.toggle("done", i < current);
    });
    backBtn.classList.toggle("hidden", current === 0);
    var last = current === steps.length - 1;
    var key = last ? "form.send" : "form.continue";
    var txt = (window.alunaI18n && window.alunaI18n.t) ? window.alunaI18n.t(key, window.alunaI18n.current()) : null;
    nextBtn.querySelector(".t").textContent = txt || (last ? "Send me the guide" : "Continue");
  }
  window.alunaFormRefresh = render;

  nextBtn.addEventListener("click", function () {
    if (!validate(steps[current])) return;
    if (current < steps.length - 1) { current++; render(); }
    else {
      steps.forEach(function (s) { s.classList.remove("active"); });
      headEl.style.display = "none";
      form.querySelector(".form-actions").style.display = "none";
      doneEl.classList.add("show");
      dots.forEach(function (d) { d.classList.add("done"); d.classList.remove("active"); });
    }
  });
  backBtn.addEventListener("click", function () { if (current > 0) { current--; render(); } });

  /* contact method toggle + auto dial prefix */
  var methodGroup = document.getElementById("contact-method");
  if (methodGroup) {
    var blocks = form.querySelectorAll("[data-block]");
    var emailInput = document.getElementById("email-input");
    var phoneInput = document.getElementById("phone-input");
    var dialInput = document.getElementById("dial-input");
    var countrySel = document.getElementById("country-select");

    function setMethod(method) {
      blocks.forEach(function (b) { b.classList.toggle("hidden", b.getAttribute("data-block") !== method); });
      if (method === "email") {
        emailInput.setAttribute("data-required", "");
        phoneInput.removeAttribute("data-required");
        if (phoneInput.closest(".field")) phoneInput.closest(".field").classList.remove("err");
      } else {
        phoneInput.setAttribute("data-required", "");
        emailInput.removeAttribute("data-required");
        if (emailInput.closest(".field")) emailInput.closest(".field").classList.remove("err");
        if (dialInput && !dialInput.value && countrySel) {
          var o = countrySel.options[countrySel.selectedIndex];
          if (o && o.getAttribute("data-dial")) dialInput.value = o.getAttribute("data-dial");
        }
      }
    }
    methodGroup.addEventListener("click", function (ev) {
      var c = ev.target.closest(".choice");
      if (!c) return;
      setMethod(c.getAttribute("data-method"));
    });
    if (countrySel && dialInput) {
      countrySel.addEventListener("change", function () {
        var o = countrySel.options[countrySel.selectedIndex];
        var dial = o ? o.getAttribute("data-dial") : "";
        if (dial) dialInput.value = dial;
      });
    }
    setMethod("email");
  }

  render();
})();
