// Stackofy - Articles Loader
// Reads articles.json and populates article cards on any page

const COLORS = {
  'c-nmn':   'background:linear-gradient(135deg,#1B4332,#2D6A4F)',
  'c-omega':  'background:linear-gradient(135deg,#0a3d6b,#185FA5)',
  'c-vitd':   'background:linear-gradient(135deg,#7A5C10,#D4A853)',
  'c-mag':    'background:linear-gradient(135deg,#3d1b6b,#7B2FBE)',
  'c-zinc':   'background:linear-gradient(135deg,#1a3a2a,#2D6A4F)',
  'c-sel':    'background:linear-gradient(135deg,#2C1A0E,#5C3A1E)',
  'c-coq':    'background:linear-gradient(135deg,#1a0a00,#5C3A00)',
  'c-vitc':   'background:linear-gradient(135deg,#7A1A00,#C0392B)',
  'c-pqq':    'background:linear-gradient(135deg,#2C1A0E,#5C3A00)',
  'c-resv':   'background:linear-gradient(135deg,#3d0a0a,#7A1A1A)',
  'c-quer':   'background:linear-gradient(135deg,#3d4a10,#6B7A2A)',
  'c-pter':   'background:linear-gradient(135deg,#1a2a4a,#2D4A6B)',
  'c-nr':     'background:linear-gradient(135deg,#1B3A2A,#2D6A4F)',
  'c-audit':  'background:linear-gradient(135deg,#1a1a1a,#2D3A2A)',
  'c-sperm':  'background:linear-gradient(135deg,#2A3A10,#4A6A20)',
  'c-ala':    'background:linear-gradient(135deg,#1a1a00,#3A3A10)',
  'c-gly':    'background:linear-gradient(135deg,#1a2a1a,#2D6A4F)',
  'c-alcar':  'background:linear-gradient(135deg,#0a1a0a,#1B4332)',
  'c-creatine':'background:linear-gradient(135deg,#1a1a1a,#2A2A10)',
  'c-collagen':'background:linear-gradient(135deg,#1a2a10,#2D5A1B)',
  'c-sulfo':  'background:linear-gradient(135deg,#0a1a0a,#1B4332)',
  'c-coffee': 'background:linear-gradient(135deg,#1a0a00,#3E1F00)',
  'c-sleep': 'background:linear-gradient(135deg,#0a0a1a,#1a2a4a)',
  'c-brain': 'background:linear-gradient(135deg,#0a1a0a,#2D4A6B)',
'c-antiaging': 'background:linear-gradient(135deg,#1a0a00,#3E1F00)',
'c-ashwa': 'background:linear-gradient(135deg,#1a0a00,#3E2010)',
'c-lthea': 'background:linear-gradient(135deg,#0a1a0a,#1B4332)',
'c-lions': 'background:linear-gradient(135deg,#1a2a10,#1B4332)',
'c-cdp': 'background:linear-gradient(135deg,#1a2a4a,#2D4A6B)',
'c-reishi': 'background:linear-gradient(135deg,#2A1040,#6B2D6B)',
'c-cordyceps': 'background:linear-gradient(135deg,#3D1A00,#B85C00)',
'c-chaga': 'background:linear-gradient(135deg,#0a0a0a,#3D2B1F)',
'c-maitake': 'background:linear-gradient(135deg,#1a1208,#6B5530)',
'c-turkeytail': 'background:linear-gradient(135deg,#0a1a1a,#2D6A6A)',
'c-curcumin': 'background:linear-gradient(135deg,#3D2400,#D4A853)',
'c-shilajit': 'background:linear-gradient(135deg,#1a0f00,#5C3A1E)',
'c-toxic': 'background:linear-gradient(135deg,#2A0A0A,#7A1A1A)',
'c-fisetin': 'background:linear-gradient(135deg,#4D1020,#C0392B)',
'c-tmg': 'background:linear-gradient(135deg,#3D0A1A,#6B1A2A)',
'c-skeptic': 'background:linear-gradient(135deg,#1A1A1A,#3D3D2A)',
'c-berberine': 'background:linear-gradient(135deg,#3D2E00,#B8860B)',
'c-astax': 'background:linear-gradient(135deg,#1a0a00,#7A4A10)',
'c-papain': 'background:linear-gradient(135deg,#1a2400,#6B8E23)',
'c-bromelain': 'background:linear-gradient(135deg,#1a2e00,#D4A017)',
'c-interactions': 'background:linear-gradient(135deg,#1B4332,#D4A853)',
'c-vitk2': 'background:linear-gradient(135deg,#3D2400,#D4A853)',
'c-taurine': 'background:linear-gradient(135deg,#1a2a3a,#4A7A9D)',
'c-akker': 'background:linear-gradient(135deg,#0a1a1a,#2D6A6A)',
'c-research': 'background:linear-gradient(135deg,#1A1A1A,#D4A853)',
'c-glutathione': 'background:linear-gradient(135deg,#0a1a1a,#4A8A8A)',
'c-urolithin': 'background:linear-gradient(135deg,#3D0A1A,#C0392B)',
'c-natto': 'background:linear-gradient(135deg,#1a1208,#6B5530)',
'c-saffron': 'background:linear-gradient(135deg,#3D0A1A,#C0392B)',
'c-peptides': 'background:linear-gradient(135deg,#1A1A1A,#4A6A6A)',
'c-glp1': 'background:linear-gradient(135deg,#1a2a3a,#4A7A9D)',
};

function makeCard(article, size) {
  const bg = COLORS[article.color] || 'background:#1B4332';
  const isProtocol = article.type === 'protocol';

  if (size === 'featured') {
    return `
      <a href="${article.url}" class="article-card featured-simple mb3"
         data-tags="${article.tags}"
         data-title="${article.title}">
        <div class="card-img featured-simple-img" style="${bg}">
          <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="article-tag">${article.tag}</span>
            <span class="read-time">${article.readTime}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </div>
      </a>`;
  }

  if (size === 'horizontal') {
    return `
      <a href="${article.url}" class="h-article">
        <div class="h-article-img" style="${bg}">
          <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
        </div>
        <div class="h-article-body">
          <span class="article-tag">${article.tag}</span>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <span class="read-time">${article.readTime}</span>
        </div>
      </a>`;
  }

  if (size === 'articles-page') {
    if (isProtocol) {
      return `
        <a href="${article.url}" class="article-card protocol-card"
           data-tags="${article.tags}"
           data-title="${article.title}">
          <div class="card-img protocol-img" style="${bg}">
            <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
            <span class="protocol-badge">${article.badgeType === 'book' ? '★ Book' : article.badgeType === 'featured' ? '★ Featured' : '★ Protocol'}</span>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="article-tag protocol-tag">${article.tag}</span>
              <span class="read-time">${article.readTime}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
          </div>
        </a>`;
    }
    return `
      <a href="${article.url}" class="article-card"
         data-tags="${article.tags}"
         data-title="${article.title}">
        <div class="card-img" style="${bg}">
          <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="article-tag">${article.tag}</span>
            <span class="read-time">${article.readTime}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </div>
      </a>`;
  }

  // Homepage small card - protocol gets double-wide card
  if (isProtocol) {
    return `
      <a href="${article.url}" class="article-card protocol-card protocol-wide">
        <div class="protocol-wide-img" style="${bg}">
          <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
          <span class="protocol-badge">${article.badgeType === 'book' ? '★ Book' : article.badgeType === 'featured' ? '★ Featured' : '★ Protocol'}</span>
        </div>
        <div class="protocol-wide-body">
          <span class="article-tag protocol-tag">${article.tag}</span>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <span class="protocol-read-link">Read the full guide →</span>
        </div>
      </a>`;
  }

  // Default small card
  return `
    <a href="${article.url}" class="article-card">
      <div class="card-img" style="${bg}">
        <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
      </div>
      <div class="card-body">
        <span class="article-tag">${article.tag}</span>
        <h3>${article.title}</h3>
        <p>${article.description}</p>
      </div>
    </a>`;
}

async function loadArticles() {
  try {
    const res = await fetch('/articles.json');
    const articles = await res.json();

    // LATEST ARTICLES (homepage) - non-featured, non-protocol articles, limited to 8 newest
    const latestEl = document.getElementById('latest-articles');
    if (latestEl) {
      const latest = articles.filter(a => !a.featured && a.type !== 'protocol');
      latestEl.innerHTML = latest.slice(-8).reverse().map(a => makeCard(a, 'small')).join('');
    }

    // PROTOCOL ARTICLES (homepage) - only real protocols, limited to 4 newest
    const protocolEl = document.getElementById('protocol-articles');
    if (protocolEl) {
      const protocols = articles.filter(a => a.badgeType === 'protocol');
      protocolEl.innerHTML = protocols.slice(-4).reverse().map(a => makeCard(a, 'small')).join('');
    }
    // MORE PROTOCOLS (homepage) - remaining protocols after first 4
    const protocolMoreEl = document.getElementById('protocol-articles-more');
    if (protocolMoreEl) {
      const protocols = articles.filter(a => a.badgeType === 'protocol');
      const remaining = protocols.slice(0, -4).reverse().slice(0, 4);
      protocolMoreEl.innerHTML = remaining.map(a => makeCard(a, 'small')).join('');
    }

    // EDITORIAL ARTICLES (homepage) - featured/editorial badgeType
    const editorialEl = document.getElementById('editorial-articles');
    if (editorialEl) {
      const editorial = articles.filter(a => a.badgeType === 'featured');
      editorialEl.innerHTML = editorial.reverse().map(a => makeCard(a, 'small')).join('');
    }

    // BOOKS (homepage) - book badgeType
    const booksEl = document.getElementById('books-articles');
    if (booksEl) {
      const books = articles.filter(a => a.badgeType === 'book');
      booksEl.innerHTML = books.reverse().map(a => makeCard(a, 'small')).join('');
    }

    // MORE ARTICLES (homepage) - remaining articles after first 8, limited to 8
    const latestMoreEl = document.getElementById('latest-articles-more');
    if (latestMoreEl) {
      const latest = articles.filter(a => !a.featured && a.type !== 'protocol');
      const remaining = latest.slice(0, -8).reverse();
      latestMoreEl.innerHTML = remaining.slice(0, 8).map(a => makeCard(a, 'small')).join('');
    }

    // MORE ARTICLES SECOND BATCH (homepage) - next 8 after that
    const latestMore2El = document.getElementById('latest-articles-more2');
    if (latestMore2El) {
      const latest = articles.filter(a => !a.featured && a.type !== 'protocol');
      const remaining = latest.slice(0, -8).reverse();
      latestMore2El.innerHTML = remaining.slice(8, 16).map(a => makeCard(a, 'small')).join('');
    }
// MORE ARTICLES THIRD BATCH (homepage) - next 8 after that
    const latestMore3El = document.getElementById('latest-articles-more3');
    if (latestMore3El) {
      const latest = articles.filter(a => !a.featured && a.type !== 'protocol');
      const remaining = latest.slice(0, -8).reverse();
      latestMore3El.innerHTML = remaining.slice(16, 24).map(a => makeCard(a, 'small')).join('');
    }
    // LATEST PROTOCOL SPOTLIGHT (homepage) - fixed to the skeptic article
    const spotlightEl = document.getElementById('latest-protocol-spotlight');
    if (spotlightEl) {
      const newest = articles.find(a => a.url === '/articles/do-supplements-work-guide.html');
      if (newest) {
        const bg = COLORS[newest.color] || 'background:#1B4332';
        spotlightEl.href = newest.url;
        spotlightEl.innerHTML = `
          <div class="h-article-img" style="${bg}">
            <img src="${newest.image}" alt="${newest.tag}" onerror="this.style.display='none'" />
          </div>
          <div class="h-article-body">
            <span class="article-tag">${newest.tag}</span>
            <h3>${newest.title}</h3>
            <p>${newest.description}</p>
            <span class="read-time">${newest.readTime}</span>
          </div>
        `;
        spotlightEl.className = 'h-article mb3';
        spotlightEl.style.display = 'flex';
      }
    }

    // LONGEVITY SECTION (homepage)
    const longevityEl = document.getElementById('longevity-articles');
    if (longevityEl) {
      const longevity = articles.filter(a => a.tags.includes('longevity') && a.type !== 'protocol').slice(0, 3);
      longevityEl.innerHTML = longevity.map(a => makeCard(a, 'horizontal')).join('');
    }

    // ENERGY & PERFORMANCE (homepage)
    const energyEl = document.getElementById('energy-articles');
    if (energyEl) {
      const energy = articles.filter(a => ['CoQ10', 'PQQ'].includes(a.tag));
      energyEl.innerHTML = energy.map(a => makeCard(a, 'horizontal')).join('');
    }

    // FOUNDATION SECTION (homepage)
    const foundationEl = document.getElementById('foundation-articles');
    if (foundationEl) {
      const foundation = articles.filter(a => ['Magnesium', 'Omega-3', 'Vitamin D3'].includes(a.tag));
      foundationEl.innerHTML = foundation.map(a => makeCard(a, 'horizontal')).join('');
    }

    // IMMUNE SECTION (homepage)
    const immuneEl = document.getElementById('immune-articles');
    if (immuneEl) {
      const immune = articles.filter(a => ['Vitamin C', 'Selenium'].includes(a.tag));
      immuneEl.innerHTML = immune.map(a => makeCard(a, 'horizontal')).join('');
    }

    // Shared card renderer for protocols-page-style cards (used on articles.html)
    function makeProtocolPageCard(a) {
      const bg = COLORS[a.color] || 'background:#1B4332';
      const badgeText = a.badgeType === 'book' ? '★ Book' : a.badgeType === 'featured' ? '★ Featured' : '★ Protocol';
      return `
        <a href="${a.url}" class="protocol-card-page">
          <div class="protocol-card-img" style="${bg}">
            <img src="${a.image}" alt="${a.tag}" onerror="this.style.display='none'" />
            <span class="protocol-badge">${badgeText}</span>
          </div>
          <div class="protocol-card-body">
            <span class="protocol-card-tag">${a.tag}</span>
            <h3>${a.title}</h3>
            <p>${a.description}</p>
            <span class="protocol-card-meta">${a.readTime} read</span>
          </div>
        </a>`;
    }

    // ARTICLES PAGE - protocols section (top, gold cards)
    const articlesProtocolsEl = document.getElementById('articles-protocols');
    if (articlesProtocolsEl) {
      const protocols = articles.filter(a => a.badgeType === 'protocol');
      articlesProtocolsEl.innerHTML = protocols.map(makeProtocolPageCard).join('');
    }

    // ARTICLES PAGE - editorial section
    const articlesEditorialEl = document.getElementById('articles-editorial');
    if (articlesEditorialEl) {
      const editorial = articles.filter(a => a.badgeType === 'featured');
      articlesEditorialEl.innerHTML = editorial.map(makeProtocolPageCard).join('');
    }

    // ARTICLES PAGE - books section
    const articlesBooksEl = document.getElementById('articles-books');
    if (articlesBooksEl) {
      const books = articles.filter(a => a.badgeType === 'book');
      articlesBooksEl.innerHTML = books.map(makeProtocolPageCard).join('');
    }

    // ARTICLES PAGE - supplement guides only (no protocols)
    const articlesGridEl = document.getElementById('articles-grid');
    if (articlesGridEl) {
      const guides = articles.filter(a => a.type !== 'protocol');
      articlesGridEl.innerHTML = guides.map(a => makeCard(a, 'articles-page')).join('');
      const countEl = document.getElementById('article-count');
      if (countEl) countEl.textContent = guides.length;
    }

  } catch (e) {
    console.error('Stackofy: Could not load articles.json', e);
  }
}

// Automatically inject Article schema markup for SEO on individual article pages
async function injectArticleSchema() {
  const path = window.location.pathname;
  if (!path.startsWith('/articles/') || path === '/articles.html') return;

  try {
    const res = await fetch('/articles.json');
    const articles = await res.json();
    const current = articles.find(a => a.url === path);
    if (!current) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": current.title,
      "description": current.description,
      "image": `https://stackofy.com${current.image}`,
      "author": { "@type": "Organization", "name": "Alethia Research Institute", "url": "https://stackofy.com/about.html" },
      "publisher": { "@type": "Organization", "name": "Alethia Research Institute", "logo": { "@type": "ImageObject", "url": "https://stackofy.com/favicon.svg" } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://stackofy.com${current.url}` }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  } catch (e) {
    console.error('Stackofy: Could not inject article schema', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadArticles);
  document.addEventListener('DOMContentLoaded', injectArticleSchema);
} else {
  setTimeout(loadArticles, 50);
  setTimeout(injectArticleSchema, 50);
}
