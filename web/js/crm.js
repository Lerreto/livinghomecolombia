/* ============================================================
   Living Home Colombia — envío de leads (reCAPTCHA v3 + Worker)
   1) Honeypot (campo trampa).
   2) Genera un token de reCAPTCHA v3.
   3) Hace POST al Cloudflare Worker, que valida el token y reenvía
      el lead a EspoCRM. La key de EspoCRM NO está aquí.
   Expone window.sendLeadToEspo().
   ============================================================ */
(function () {
  "use strict";

  /* ---- Configuración pública (puede ir en el navegador) ---- */
  var RECAPTCHA_SITE_KEY = "6LfLrhotAAAAAM3MDokpIQUV0nYD14KCkCQcr0pD";   // clave de SITIO de reCAPTCHA v3

  var ENDPOINTS = {
    local: "http://localhost:8787",                      // 'wrangler dev'
    prod:  "https://livinghome-lead.livinghomecolombia.workers.dev"  // URL del Worker desplegado
  };
  var isLocal = ["localhost", "127.0.0.1"].indexOf(location.hostname) !== -1;
  var WORKER_URL = isLocal ? ENDPOINTS.local : ENDPOINTS.prod;

  /* ---- Cargar el script de reCAPTCHA v3 una sola vez ---- */
  (function loadRecaptcha() {
    if (/PEGA_TU_SITE_KEY/.test(RECAPTCHA_SITE_KEY)) return;
    if (document.getElementById("recaptcha-v3")) return;
    var s = document.createElement("script");
    s.id = "recaptcha-v3";
    s.src = "https://www.google.com/recaptcha/api.js?render=" + RECAPTCHA_SITE_KEY;
    document.head.appendChild(s);
  })();

  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function selText(id) {
    var el = document.getElementById(id);
    if (!el || el.selectedIndex < 0) return "";
    var o = el.options[el.selectedIndex];
    return (o && o.value !== "") ? o.textContent.trim() : "";
  }
  function chosen(stepIndex) {
    var steps = document.querySelectorAll("#lead-form .fstep");
    var step = steps[stepIndex];
    var c = step && step.querySelector(".choice.sel span:first-child");
    return c ? c.textContent.trim() : "";
  }

  function buildPayload(token) {
    return {
      token: token,
      firstName: val("fname-input"),
      lastName: val("lname-input"),
      emailAddress: val("email-input"),
      phoneNumber: (val("dial-input") + " " + val("phone-input")).trim(),
      addressCountry: selText("country-select"),
      interest: chosen(2),       // paso 3
      when: selText("when-select")
    };
  }

  function postLead(token) {
    return fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(token))
    }).then(function (r) {
      if (!r.ok) console.error("Worker respondió", r.status);
    }).catch(function (err) {
      // No bloqueamos al usuario: el lead ya viajó por WhatsApp.
      console.error("Error enviando lead:", err);
    });
  }

  window.sendLeadToEspo = function () {
    // 1) Honeypot: si el campo trampa viene lleno, es un bot. Descartamos.
    var hp = document.getElementById("hp-website");
    if (hp && hp.value.trim() !== "") {
      console.warn("Honeypot activado: envío descartado.");
      return;
    }

    // 2) Si falta configurar reCAPTCHA, no enviamos (WhatsApp ya cubrió el lead).
    if (/PEGA_TU_SITE_KEY/.test(RECAPTCHA_SITE_KEY) || /TU-SUBDOMINIO/.test(WORKER_URL)) {
      console.warn("Falta configurar el SITE_KEY de reCAPTCHA o la URL del Worker en crm.js");
      return;
    }
    if (!window.grecaptcha || !window.grecaptcha.execute) {
      console.warn("reCAPTCHA aún no está listo.");
      return;
    }

    // 3) Generar token y enviar al Worker
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "lead" })
        .then(postLead)
        .catch(function (err) { console.error("reCAPTCHA error:", err); });
    });
  };
})();