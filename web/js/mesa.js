/* ============================================================
   MESA — interacciones
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Nav: solidificar al hacer scroll ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("solid");
    else nav.classList.remove("solid");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Smooth anchor scroll ---------- */
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

  /* ============================================================
     FORMULARIO 3 PASOS
     ============================================================ */
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll(".fstep"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".step-dot"));
  var nextBtn = form.querySelector("#next-btn");
  var backBtn = form.querySelector("#back-btn");
  var doneEl = document.getElementById("form-done");
  var headEl = document.getElementById("steps-head");
  var current = 0;

  function render() {
    steps.forEach(function (s, i) { s.classList.toggle("active", i === current); });
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
      d.classList.toggle("done", i < current);
    });
    backBtn.classList.toggle("hidden", current === 0);
    nextBtn.querySelector(".t").textContent = current === steps.length - 1 ? "Send enquiry" : "Continue";
  }

  function validate(stepEl) {
    var ok = true;
    stepEl.querySelectorAll("[data-required]").forEach(function (f) {
      var field = f.closest(".field");
      var valid = f.value && f.value.trim().length > 0;
      if (f.type === "email") valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
      if (field) field.classList.toggle("err", !valid);
      if (!valid) ok = false;
    });
    // grupos de elección (data-choice-group)
    stepEl.querySelectorAll("[data-choice-required]").forEach(function (g) {
      var sel = g.querySelector(".choice.sel");
      var note = g.parentNode.querySelector(".msg");
      if (!sel) { ok = false; if (note) note.style.display = "block"; }
      else if (note) note.style.display = "none";
    });
    return ok;
  }

  nextBtn.addEventListener("click", function () {
    if (!validate(steps[current])) return;
    if (current < steps.length - 1) {
      current++; render();
    } else {
      // completar
      steps.forEach(function (s) { s.classList.remove("active"); });
      headEl.style.display = "none";
      form.querySelector(".form-actions").style.display = "none";
      doneEl.classList.add("show");
      dots.forEach(function (d) { d.classList.add("done"); d.classList.remove("active"); });
    }
  });

  backBtn.addEventListener("click", function () {
    if (current > 0) { current--; render(); }
  });

  // limpiar error al escribir
  form.querySelectorAll("input, select").forEach(function (f) {
    f.addEventListener("input", function () {
      var field = f.closest(".field");
      if (field) field.classList.remove("err");
    });
  });

  // grupos de elección (botones tipo radio)
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

  /* ---------- método de contacto + prefijo internacional (Variante A) ---------- */
  var methodGroup = document.getElementById("contact-method");
  if (methodGroup) {
    var blocks = form.querySelectorAll("[data-block]");
    var emailInput = document.getElementById("email-input");
    var phoneInput = document.getElementById("phone-input");
    var dialInput = document.getElementById("dial-input");
    var countrySel = document.getElementById("country-select");

    function setMethod(method) {
      blocks.forEach(function (b) {
        b.classList.toggle("hidden", b.getAttribute("data-block") !== method);
      });
      if (method === "email") {
        emailInput.setAttribute("data-required", "");
        phoneInput.removeAttribute("data-required");
        if (phoneInput.closest(".field")) phoneInput.closest(".field").classList.remove("err");
      } else {
        phoneInput.setAttribute("data-required", "");
        emailInput.removeAttribute("data-required");
        if (emailInput.closest(".field")) emailInput.closest(".field").classList.remove("err");
        // autocompletar prefijo si está vacío al cambiar a teléfono
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

    // prefijo automático según país (editable)
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
