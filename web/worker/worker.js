/* ============================================================
   Living Home Colombia — Lead Worker
   Recibe el formulario, valida reCAPTCHA v3 contra Google y,
   si el token es válido, reenvía el lead a EspoCRM (Lead Capture).
   La URL/key de EspoCRM y el secret de reCAPTCHA viven aquí
   (en variables del Worker), NUNCA en el navegador.
   ============================================================ */

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);

    // Preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ ok: false, error: "method_not_allowed" }, 405, cors);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: "bad_json" }, 400, cors);
    }

    // 1) Validar el token de reCAPTCHA v3 con Google
    const token = data.token;
    if (!token) return json({ ok: false, error: "missing_token" }, 400, cors);

    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.RECAPTCHA_SECRET,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") || ""
      })
    }).then(r => r.json()).catch(() => null);

    const minScore = parseFloat(env.MIN_SCORE || "0.5");
    const okScore = verify && typeof verify.score === "number" ? verify.score >= minScore : false;

    if (!verify || !verify.success || !okScore) {
      // No pasó el captcha: lo tratamos como spam.
      return json({ ok: false, error: "recaptcha_failed", score: verify && verify.score }, 403, cors);
    }

    // 2) Construir el lead y reenviarlo a EspoCRM
    const payload = {
      firstName: (data.firstName || "").trim(),
      lastName: (data.lastName || data.firstName || "Lead web").trim(),
      emailAddress: (data.emailAddress || "").trim(),
      phoneNumber: (data.phoneNumber || "").trim(),
      addressCountry: (data.addressCountry || "").trim(),
      source: "Web Site",
      description:
        "Interés: " + (data.interest || "—") +
        "\nPlazo: " + (data.when || "—") +
        "\nOrigen: livinghomecolombia.com (Finca San Antonio)"
    };

    const espoRes = await fetch(env.ESPO_LEAD_CAPTURE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);

    if (!espoRes || !espoRes.ok) {
      return json({ ok: false, error: "espo_failed", status: espoRes ? espoRes.status : 0 }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  }
};

/* ---- helpers ---- */
function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGIN || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  const allow = allowed.length === 0
    ? "*"
    : (allowed.includes(origin) ? origin : allowed[0]);
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...headers }
  });
}