(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'netstudy-theme';

  const stored = (() => {
    try { return localStorage.getItem(THEME_KEY); } catch { return null; }
  })();

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const urlTheme = new URLSearchParams(location.search).get('theme');
  setTheme(urlTheme || stored || (prefersLight ? 'light' : 'dark'), false);

  function setTheme(theme, persist = true) {
    root.dataset.theme = theme === 'light' ? 'light' : 'dark';
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#FAF6ED' : '#120D18');
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch {}
    }
  }

  toggle?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  });

  /* sticky nav shading */
  const nav = document.getElementById('nav');
  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* copy buttons */
  document.querySelectorAll('.copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch {}
        ta.remove();
      }
      const original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('is-done');
      clearTimeout(btn._t);
      btn._t = setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('is-done');
      }, 1600);
    });
  });

  /* reveal on scroll */
  const items = document.querySelectorAll('.reveal');
  const staticMode = new URLSearchParams(location.search).has('static');
  if (staticMode || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );
  items.forEach((el) => io.observe(el));
})();
