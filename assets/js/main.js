/* O gtag é carregado no <head> do index.html com consentimento negado;
   aqui o aviso de cookies só atualiza o Consent Mode. */
var CHAVE_CONSENTIMENTO = "ul-consentimento";

// data-track → evento do GA4
var EVENTOS = {
  whatsapp: { nome: "generate_lead", params: { method: "whatsapp" } },
  agendar: { nome: "click_agendar_trinks" },
  instagram: { nome: "click_instagram" },
  "como-chegar": { nome: "click_como_chegar" },
};

(function () {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu-mobile");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    var isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// Consent Mode v2: os 4 sinais seguem juntos a escolha do aviso
function sinaisConsentimento(aceito) {
  var valor = aceito ? "granted" : "denied";
  return { analytics_storage: valor, ad_storage: valor, ad_user_data: valor, ad_personalization: valor };
}

function lerConsentimento() {
  try {
    return localStorage.getItem(CHAVE_CONSENTIMENTO);
  } catch (e) {
    return null;
  }
}

function salvarConsentimento(valor) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, valor);
  } catch (e) {
    // Sem armazenamento (aba anônima restrita): vale só para esta visita.
  }
  if (window.gtag) window.gtag("consent", "update", sinaisConsentimento(valor === "aceito"));
}

// Ao recusar depois de ter aceitado, os cookies _ga já gravados ficariam para trás
function apagarCookiesGa() {
  document.cookie.split(";").forEach(function (c) {
    var nome = c.split("=")[0].trim();
    if (nome.indexOf("_ga") !== 0) return;
    ["", "; domain=." + location.hostname.replace(/^www\./, "")].forEach(function (dominio) {
      document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + dominio;
    });
  });
}

(function () {
  var banner = document.getElementById("consentimento");
  var botoesAbrir = document.querySelectorAll("[data-abrir-consentimento]");

  if (!window.gtag || !banner) {
    botoesAbrir.forEach(function (b) {
      b.hidden = true;
    });
    return;
  }

  function abrir() {
    banner.hidden = false;
    document.body.classList.add("consentimento-aberto");
  }
  function fechar() {
    banner.hidden = true;
    document.body.classList.remove("consentimento-aberto");
  }

  if (!lerConsentimento()) abrir();

  banner.querySelector('[data-consentimento="aceitar"]').addEventListener("click", function () {
    salvarConsentimento("aceito");
    fechar();
  });

  banner.querySelector('[data-consentimento="recusar"]').addEventListener("click", function () {
    salvarConsentimento("recusado");
    apagarCookiesGa();
    fechar();
  });

  botoesAbrir.forEach(function (b) {
    b.addEventListener("click", abrir);
  });
})();

document.addEventListener("click", function (e) {
  var link = e.target.closest("[data-track]");
  // Sem consentimento o GA recebe o evento como ping anônimo, sem cookies
  if (!link || !window.gtag) return;
  var evento = EVENTOS[link.dataset.track];
  if (!evento) return;
  var params = Object.assign({}, evento.params, { origem: link.dataset.origem || "" });
  window.gtag("event", evento.nome, params);
});
