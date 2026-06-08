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

  /* ---- shared WhatsApp helpers (friendly, localized) ---- */
  var WA_NUMBER = "573152693434";
  var WA_INTRO = {
    es: "¡Hola! 👋 Vengo por parte de Living Home Colombia. Vi la página sobre la casa de campo centenaria en Ginebra (Finca San Antonio) y me encantaría recibir más información.",
    en: "Hi there! 👋 I'm reaching out through Living Home Colombia. I saw your page about the century-old country home in Ginebra (Finca San Antonio) and I'd love to get more information.",
    de: "Hallo! 👋 Ich melde mich über Living Home Colombia. Ich habe die Seite über das hundertjährige Landhaus in Ginebra (Finca San Antonio) gesehen und würde gern mehr erfahren.",
    fr: "Bonjour ! 👋 Je vous contacte de la part de Living Home Colombia. J'ai vu la page sur la maison de campagne centenaire à Ginebra (Finca San Antonio) et j'aimerais beaucoup en savoir plus."
  };
  function waLang() { return (window.alunaI18n && window.alunaI18n.current()) || "es"; }
  function waURL(text) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text); }

  /* floating button — builds a friendly message in the active language at click time */
  var waFloat = document.getElementById("wa-float");
  if (waFloat) {
    waFloat.addEventListener("click", function (ev) {
      ev.preventDefault();
      var intro = WA_INTRO[waLang()] || WA_INTRO.es;
      window.open(waURL(intro), "_blank");
    });
  }

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
      sendLeadToWhatsApp();
      steps.forEach(function (s) { s.classList.remove("active"); });
      headEl.style.display = "none";
      form.querySelector(".form-actions").style.display = "none";
      doneEl.classList.add("show");
      dots.forEach(function (d) { d.classList.add("done"); d.classList.remove("active"); });
    }
  });
  backBtn.addEventListener("click", function () { if (current > 0) { current--; render(); } });

  /* ---- build a WhatsApp message from the filled-in lead and open chat ---- */
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function selText(id) {
    var el = document.getElementById(id);
    if (!el || el.selectedIndex < 0) return "";
    var o = el.options[el.selectedIndex];
    return (o && o.value !== "") ? o.textContent.trim() : "";
  }
  function chosen(scope) {
    var c = scope && scope.querySelector(".choice.sel span:first-child");
    return c ? c.textContent.trim() : "";
  }
  function sendLeadToWhatsApp() {
    var L = {
      es: { name:"Nombre", country:"País", email:"Email", phone:"Tel/WhatsApp", data:"Mis datos", reason:"Lo que busco", interest:"Interés", when:"Plazo" },
      en: { name:"Name", country:"Country", email:"Email", phone:"Phone/WhatsApp", data:"My details", reason:"What I'm looking for", interest:"Interest", when:"Timeframe" },
      de: { name:"Name", country:"Land", email:"E-Mail", phone:"Tel./WhatsApp", data:"Meine Daten", reason:"Wonach ich suche", interest:"Interesse", when:"Zeitrahmen" },
      fr: { name:"Nom", country:"Pays", email:"E-mail", phone:"Tél./WhatsApp", data:"Mes coordonnées", reason:"Ce que je recherche", interest:"Intérêt", when:"Échéance" }
    };
    var lang = waLang();
    var t = L[lang] || L.es;

    var name = (val("fname-input") + " " + val("lname-input")).trim();
    var country = selText("country-select");
    var email = val("email-input");
    var phone = (val("dial-input") + " " + val("phone-input")).trim();
    var interest = chosen(steps[2]);
    var when = selText("when-select");

    var lines = [];
    lines.push(WA_INTRO[lang] || WA_INTRO.es);
    lines.push("");
    lines.push(t.data + ":");
    if (name) lines.push("• " + t.name + ": " + name);
    if (country) lines.push("• " + t.country + ": " + country);
    if (email) lines.push("• " + t.email + ": " + email);
    if (phone) lines.push("• " + t.phone + ": " + phone);
    if (interest || when) {
      lines.push("");
      lines.push(t.reason + ":");
      if (interest) lines.push("• " + t.interest + ": " + interest);
      if (when) lines.push("• " + t.when + ": " + when);
    }

    window.open(waURL(lines.join("\n")), "_blank");
  }

  /* auto-fill dial prefix from the selected country */
  var dialInput = document.getElementById("dial-input");
  var countrySel = document.getElementById("country-select");
  if (countrySel && dialInput) {
    countrySel.addEventListener("change", function () {
      var o = countrySel.options[countrySel.selectedIndex];
      var dial = o ? o.getAttribute("data-dial") : "";
      if (dial) dialInput.value = dial;
    });
  }

  render();
})();
