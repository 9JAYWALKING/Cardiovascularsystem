/* Small startup layer, independent of question data and study records. */
(() => {
  'use strict';
  const root = document.documentElement;
  const screen = document.getElementById('site-loading-screen');
  if (!screen || !root.classList.contains('site-is-loading')) return;
  // Saved HTML may contain the previously dismissed screen.
  screen.hidden = false;
  screen.classList.remove('is-leaving', 'is-entering');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let started = performance.now(), closing = false, done = false, reloading = false;
  let finishTimer, cleanupTimer, safetyTimer;
  let shell, wasInert;
  const previousBusy = document.body.getAttribute('aria-busy');
  document.body.setAttribute('aria-busy', 'true');

  function lockShell() {
    if (shell) return;
    shell = document.querySelector('.site-shell');
    if (shell) { wasInert = shell.inert; shell.inert = true; }
  }
  function cleanup() {
    clearTimeout(finishTimer); clearTimeout(cleanupTimer); clearTimeout(safetyTimer);
    screen.hidden = true;
    screen.classList.remove('is-leaving', 'is-entering');
    root.classList.remove('site-is-loading');
    if (shell) { shell.inert = wasInert; shell = null; }
    if (previousBusy === null) document.body.removeAttribute('aria-busy');
    else document.body.setAttribute('aria-busy', previousBusy);
    done = true; closing = false; reloading = false;
  }
  function dismiss() {
    if (closing || done) return;
    closing = true;
    screen.classList.remove('is-entering');
    screen.classList.add('is-leaving');
    cleanupTimer = setTimeout(cleanup, reduced.matches ? 0 : 440);
  }
  function ready() {
    if (closing || done || reloading) return;
    lockShell();
    // Wait for the current route and toolbars, not every lazy lecture image.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      finishTimer = setTimeout(dismiss, Math.max(0, (reduced.matches ? 0 : 520) - (performance.now() - started)));
    }));
  }
  function reload() {
    if (reloading) return;
    clearTimeout(finishTimer); clearTimeout(cleanupTimer); clearTimeout(safetyTimer);
    done = false; closing = false; reloading = true; started = performance.now();
    root.classList.add('site-is-loading');
    screen.hidden = false;
    screen.classList.remove('is-leaving');
    screen.classList.add('is-entering');
    document.body.setAttribute('aria-busy', 'true');
    lockShell();
    // Native reload preserves the URL and the existing unsaved-edit prompt.
    // If that prompt is cancelled, reveal the original page again.
    safetyTimer = setTimeout(cleanup, 1800);
    setTimeout(() => location.reload(), reduced.matches ? 0 : 180);
  }
  window.SiteLoading = { ready, reload };
  screen.addEventListener('transitionend', event => {
    if (event.target === screen && event.propertyName === 'opacity' && closing) cleanup();
  });
  window.addEventListener('pageshow', event => { if (event.persisted) cleanup(); });
  document.addEventListener('DOMContentLoaded', ready, { once: true });
  safetyTimer = setTimeout(dismiss, 6500);
})();
