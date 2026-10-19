/* IDs vazios = nenhum script de terceiros é carregado e o aviso de cookies não aparece. */
var CONFIG = {
  ga4Id: "G-JT2LZ0N7EG",
};

var CHAVE_CONSENTIMENTO = "ul-consentimento";

// data-track → evento do GA4
var EVENTOS = {
  whatsapp: { nome: "generate_lead", params: { method: "whatsapp" } },
  agendar: { nome: "click_agendar_trinks" },
  instagram: { nome: "click_instagram" },
  "como-chegar": { nome: "click_como_chegar" },
};

var analyticsCarregado = false;

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

function carregarAnalytics() {
  if (analyticsCarregado || !CONFIG.ga4Id) return;
  analyticsCarregado = true;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.ga4Id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  // Só chega aqui com a escolha "aceito" salva ou recém-feita
  window.gtag("consent", "default", sinaisConsentimento(true));
  window.gtag("js", new Date());
  window.gtag("config", CONFIG.ga4Id);
}

(function () {
  var banner = document.getElementById("consentimento");
  var botoesAbrir = document.querySelectorAll("[data-abrir-consentimento]");

  if (!CONFIG.ga4Id || !banner) {
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

  var escolha = lerConsentimento();
  if (escolha === "aceito") carregarAnalytics();
  else if (!escolha) abrir();

  banner.querySelector('[data-consentimento="aceitar"]').addEventListener("click", function () {
    salvarConsentimento("aceito");
    fechar();
    carregarAnalytics();
  });

  banner.querySelector('[data-consentimento="recusar"]').addEventListener("click", function () {
    salvarConsentimento("recusado");
    fechar();
    // Scripts já carregados só saem da página com um recarregamento.
    if (analyticsCarregado) location.reload();
  });

  botoesAbrir.forEach(function (b) {
    b.addEventListener("click", abrir);
  });
})();

document.addEventListener("click", function (e) {
  var link = e.target.closest("[data-track]");
  if (!link || !analyticsCarregado || !window.gtag) return;
  var evento = EVENTOS[link.dataset.track];
  if (!evento) return;
  var params = Object.assign({}, evento.params, { origem: link.dataset.origem || "" });
  window.gtag("event", evento.nome, params);
});
