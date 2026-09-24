/**
 * Terapia Quântica e Espiritual — scripts da landing page
 * ----------------------------------------------------------------------------
 * JavaScript puro (sem dependências). O site funciona sem JS; este arquivo
 * apenas adiciona melhorias progressivas:
 *   1. Marca o <html> com a classe "js" (habilita animações de revelação)
 *   2. Header com fundo sólido após rolar a página
 *   3. Menu mobile (abrir/fechar, fechar ao clicar em link ou pressionar Esc)
 *   4. Revelação suave das seções ao entrar na tela (IntersectionObserver)
 *   5. Ano atual no rodapé
 *   6. Rastreamento de cliques nos contatos (GA4 / Meta Pixel, se instalados)
 */
(function () {
  'use strict';

  /* 1. Progressive enhancement ------------------------------------------- */
  document.documentElement.classList.add('js');

  /* 2. Header ao rolar ----------------------------------------------------- */
  var header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* 3. Menu mobile --------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    // Mantém o header escuro enquanto o menu estiver aberto no topo da página
    if (open) header.classList.add('is-scrolled'); else updateHeader();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* 4. Revelação ao rolar -------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // anima apenas uma vez
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Navegadores antigos: mostra tudo imediatamente
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* 5. Ano no rodapé ------------------------------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* 6. Rastreamento de conversões ------------------------------------------
   * Todo link com atributo data-track="nome" dispara um evento ao ser
   * clicado. Só tem efeito se o GA4 (gtag) ou o Meta Pixel (fbq) estiverem
   * ativos no <head>; caso contrário, é ignorado silenciosamente.
   * Use esses eventos como "conversão" nas campanhas de tráfego pago.
   */
  document.querySelectorAll('[data-track]').forEach(function (link) {
    link.addEventListener('click', function () {
      var canal = link.getAttribute('data-track');
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contato_click', { canal: canal });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', { content_name: canal });
      }
    });
  });
})();
