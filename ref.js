(function () {
  try {
    var url = new URL(window.location.href);
    var token = url.searchParams.get("ref") || url.searchParams.get("code");
    if (!token) return; // nada a fazer

    // evita chamada repetida se usuário recarregar a mesma página
    if (sessionStorage.getItem("qc_ref_sent") === token) return;

    fetch("https://auth.quanticocap.com/ref?code=" + encodeURIComponent(token), {
      method: "GET",
      credentials: "include", // necessário p/ Set-Cookie da sua API
      cache: "no-store",
      mode: "cors"
    })
      .then(function (res) {
        if (res.ok) {
          console.log("[Affiliate] Ref enviado:", token);
          sessionStorage.setItem("qc_ref_sent", token);
        } else {
          console.warn("[Affiliate] Falha no envio do ref:", res.status);
        }
      })
      .catch(function (err) {
        console.error("[Affiliate] Erro de rede:", err);
      });
  } catch (e) {
    console.error("[Affiliate] Erro no script:", e);
  }
})();
