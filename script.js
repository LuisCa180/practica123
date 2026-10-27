/* MADC · Educación — interacciones básicas */
(function () {
  'use strict';

  /* ---------- Menú móvil ---------- */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');

  if (btn && nav) {
    var mq = window.matchMedia('(max-width: 960px)');

    function abrir(estado) {
      nav.classList.toggle('abierto', estado);
      btn.setAttribute('aria-expanded', String(estado));
      btn.textContent = estado ? 'Cerrar' : 'Menú';
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      abrir(!nav.classList.contains('abierto'));
    });

    // Se cierra al tocar un enlace del menú
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) abrir(false);
    });

    // Se cierra con Escape y devuelve el foco al botón
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('abierto')) {
        abrir(false);
        btn.focus();
      }
    });

    // Se cierra al tocar fuera
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('abierto') && !e.target.closest('header')) abrir(false);
    });

    // Si la pantalla crece a escritorio, se restablece
    var alCambiar = function () { if (!mq.matches) abrir(false); };
    if (mq.addEventListener) mq.addEventListener('change', alCambiar);
    else mq.addListener(alCambiar);
  }

  /* ---------- Formulario del boletín ---------- */
  var form = document.getElementById('form-boletin');
  var correo = document.getElementById('correo');
  var msg = document.getElementById('ok');

  if (form && correo && msg) {
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function mostrar(texto, tipo) {
      msg.textContent = texto;
      msg.className = tipo || '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valor = correo.value.trim();

      if (!valor) {
        correo.setAttribute('aria-invalid', 'true');
        mostrar('Escriba su correo electrónico para suscribirse.', 'error');
        correo.focus();
        return;
      }
      if (!patron.test(valor)) {
        correo.setAttribute('aria-invalid', 'true');
        mostrar('El correo no parece válido. Revise que tenga el formato nombre@dominio.com.', 'error');
        correo.focus();
        return;
      }

      correo.removeAttribute('aria-invalid');
      mostrar('Listo, se suscribió con ' + valor + '.', 'exito');
      form.reset();
    });

    correo.addEventListener('input', function () {
      if (correo.getAttribute('aria-invalid')) {
        correo.removeAttribute('aria-invalid');
        mostrar('');
      }
    });
  }
})();
