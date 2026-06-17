// Stackofy - Shared Header & Footer
// Include this script in every page: <script src="/header.js"></script>

(function() {
  const SVG_LOGO = `<svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(1.5,0)">
      <path d="M21,8.5 h11 v11 h-11 a5.5,5.5 0 0 1 0,-11 z" fill="#D4A853"/>
      <path d="M32,9.5 h9 a4.5,4.5 0 0 1 0,9 h-9 z" fill="#D4A853"/>
      <g transform="rotate(37 32 33.6)">
        <path d="M21,28.1 h11 v11 h-11 a5.5,5.5 0 0 1 0,-11 z" fill="#95D5B2"/>
        <path d="M32,29.1 h9 a4.5,4.5 0 0 1 0,9 h-9 z" fill="#95D5B2"/>
      </g>
      <path d="M21,44.5 h11 v11 h-11 a5.5,5.5 0 0 1 0,-11 z" fill="#D4A853"/>
      <path d="M32,45.5 h9 a4.5,4.5 0 0 1 0,9 h-9 z" fill="#D4A853"/>
    </g>
  </svg>`;

  const HEADER_CSS = `
    #site-header { background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 55%, #7A5C10 100%); padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
    #site-header .s-logo { display: flex; align-items: center; gap: 10px; color: #FAF8F4; font-size: 19px; font-weight: 600; text-decoration: none; }
    #site-header .s-right { display: flex; align-items: center; gap: 1.5rem; }
    #site-header .s-nav { display: flex; gap: 1.5rem; align-items: center; }
    #site-header .s-nav a { color: #95D5B2; font-size: 14px; text-decoration: none; transition: color 0.2s; }
    #site-header .s-nav a:hover { color: #FAF8F4; }
    #site-header .s-dark { background: rgba(255,255,255,0.15); border: 0.5px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 5px 12px; cursor: pointer; color: #FAF8F4; font-size: 13px; }
    #site-header .s-burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
    #site-header .s-burger span { display: block; width: 22px; height: 2px; background: #FAF8F4; border-radius: 2px; }
    #site-mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: #1B4332; z-index: 99; flex-direction: column; padding: 1rem; }
    #site-mobile-menu.open { display: flex !important; }
    #site-mobile-menu a { color: #FAF8F4; font-size: 15px; padding: 0.875rem 1rem; border-bottom: 0.5px solid rgba(255,255,255,0.1); text-decoration: none; }
    #site-mobile-menu a:last-child { border-bottom: none; }
    #site-mobile-menu .s-mobile-dark { background: rgba(255,255,255,0.1); border: 0.5px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 10px 1rem; cursor: pointer; color: #FAF8F4; font-size: 14px; text-align: left; width: 100%; margin-top: 0.5rem; }
    #site-footer { background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 55%, #7A5C10 100%); color: #95D5B2; text-align: center; padding: 2rem; font-size: 13px; line-height: 2; margin-top: 3rem; }
    #site-footer .sf-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
    #site-footer .sf-links a { color: #95D5B2; font-size: 13px; text-decoration: none; }
    #site-footer .sf-links a:hover { color: #FAF8F4; }
    @media (max-width: 600px) {
      #site-header { padding: 0 1rem !important; height: 56px !important; }
      #site-header .s-nav { display: none !important; }
      #site-header .s-dark { display: none !important; }
      #site-header .s-burger { display: flex !important; }
      #site-mobile-menu { top: 56px !important; }
    }
  `;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = HEADER_CSS;
  document.head.appendChild(style);

  // Build header HTML
  const header = document.createElement('header');
  header.id = 'site-header';
  header.innerHTML = `
    <a class="s-logo" href="/">
      ${SVG_LOGO}
      Stackofy
    </a>
    <div class="s-right">
      <nav class="s-nav">
        <a href="/">Home</a>
        <a href="/articles.html">Articles</a>
        <a href="/books.html">Books</a>
        <a href="/your-stack.html">Stack Builder</a>
        <a href="/about.html">About</a>
        <a href="/how-we-work.html">How We Work</a>
        <button class="s-dark" onclick="stackofyToggleDark()">☀️ Light</button>
      </nav>
      <button class="s-burger" onclick="stackofyToggleMenu()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  // Build mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'site-mobile-menu';
  mobileMenu.innerHTML = `
    <a href="/" onclick="stackofyToggleMenu()">Home</a>
    <a href="/articles.html" onclick="stackofyToggleMenu()">Articles</a>
    <a href="/books.html" onclick="stackofyToggleMenu()">Books</a>
    <a href="/your-stack.html" onclick="stackofyToggleMenu()">Stack Builder</a>
    <a href="/about.html" onclick="stackofyToggleMenu()">About</a>
    <a href="/how-we-work.html" onclick="stackofyToggleMenu()">How We Work</a>
    <button class="s-mobile-dark" onclick="stackofyToggleDark()">☀️ Light Mode</button>
  `;

  // Build footer
  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.innerHTML = `
    <div class="sf-links">
      <a href="/">Home</a>
      <a href="/articles.html">Articles</a>
      <a href="/books.html">Books</a>
      <a href="/your-stack.html">Stack Builder</a>
      <a href="/about.html">About</a>
      <a href="/how-we-work.html">How We Work</a>
      <a href="https://alethiaresearch.gumroad.com">Shop</a>
    </div>
    <div>Stackofy &nbsp;|&nbsp; Alethia Research Institute &nbsp;|&nbsp; © 2026</div>
    <div style="margin-top: 4px; font-size: 12px; color: #6B8A78;">Evidence-based. No pharma ties. No fluff.</div>
  `;

  function applyTheme(isDark) {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
    document.querySelectorAll('.s-dark, .s-mobile-dark').forEach(btn => {
      btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
  }

  function init() {
    if (!document.body) return;

    // DUPLICATE PREVENTION
    if (document.getElementById('site-header')) return;

    // Remove any hardcoded headers already in the page
    const existingHeaders = document.querySelectorAll('header:not(#site-header)');
    existingHeaders.forEach(h => h.remove());

    // Insert into page
    document.body.insertBefore(mobileMenu, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
    document.body.appendChild(footer);

    // Apply theme: dark is default unless user explicitly chose light
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme !== 'light';
    applyTheme(isDark);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global functions
  window.stackofyToggleMenu = function() {
    document.getElementById('site-mobile-menu').classList.toggle('open');
  };

  window.stackofyToggleDark = function() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newDark = !isDark;
    applyTheme(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    const menu = document.getElementById('site-mobile-menu');
    if (menu) menu.classList.remove('open');
  };

})();
