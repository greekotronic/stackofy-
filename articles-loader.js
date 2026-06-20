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
};

function makeCard(article, size) {
  const bg = COLORS[article.color] || 'background:#1B4332';
  const isProtocol = article.type === 'protocol';

  if (size === 'featured') {
    return `
      <a href="${article.url}" class="featured-xl mb3">
        <div class="featured-xl-img" style="${bg}">
          <img src="${article.image}" alt="${article.tag}" onerror="this.style.display='none'" />
        </div>
        <div class="featured-xl-body">
          <div class="featured-label">Most Read - ${article.readTime}</div>
          <span class="article-tag">${article.tag}</span>
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <span class="read-link">Read the full article →</span>
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
            <span class="protocol-badge">${article.tag === 'ARI Book' ? '★ Featured' : '★ Protocol'}</span>
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
          <span class="protocol-badge">${article.tag === 'ARI Book' ? '★ Featured' : '★ Protocol'}</span>
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

    // FEATURED ARTICLE (homepage)
    const featuredEl = document.getElementById('featured-article');
    if (featuredEl) {
      const featured = articles.find(a => a.featured) || articles[0];
      featuredEl.innerHTML = makeCard(featured, 'featured');
    }

    // LATEST ARTICLES (homepage) - non-featured, non-protocol articles, limited to 8 newest
    const latestEl = document.getElementById('latest-articles');
    if (latestEl) {
      const latest = articles.filter(a => !a.featured && a.type !== 'protocol');
      latestEl.innerHTML = latest.slice(-8).reverse().map(a => makeCard(a, 'small')).join('');
    }

    // PROTOCOL ARTICLES (homepage) - only protocol type, limited to 4 newest
    const protocolEl = document.getElementById('protocol-articles');
    if (protocolEl) {
      const protocols = articles.filter(a => a.type === 'protocol');
      protocolEl.innerHTML = protocols.slice(-4).reverse().map(a => makeCard(a, 'small')).join('');
    }

    // LATEST PROTOCOL SPOTLIGHT (homepage) - newest protocol only
    const spotlightEl = document.getElementById('latest-protocol-spotlight');
    if (spotlightEl) {
      const protocols = articles.filter(a => a.type === 'protocol');
      const newest = protocols[protocols.length - 1];
      if (newest) {
        spotlightEl.href = newest.url;
        spotlightEl.innerHTML = `
          <div class="lp-img"><img src="${newest.image}" alt="${newest.tag}" onerror="this.style.display='none'" /></div>
          <div class="lp-content">
            <span class="lp-tag">${newest.tag}</span>
            <h3>${newest.title}</h3>
          </div>
        `;
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

    // ARTICLES PAGE - protocols section (top, gold cards)
    const articlesProtocolsEl = document.getElementById('articles-protocols');
    if (articlesProtocolsEl) {
      const protocols = articles.filter(a => a.type === 'protocol');
      articlesProtocolsEl.innerHTML = protocols.map(a => {
        const bg = COLORS[a.color] || 'background:#1B4332';
        return `
          <a href="${a.url}" class="protocol-card-page">
            <div class="protocol-card-img" style="${bg}">
              <img src="${a.image}" alt="${a.tag}" onerror="this.style.display='none'" />
              <span class="protocol-badge">${a.tag === 'ARI Book' ? '★ Featured' : '★ Protocol'}</span>
            </div>
            <div class="protocol-card-body">
              <span class="protocol-card-tag">${a.tag}</span>
              <h3>${a.title}</h3>
              <p>${a.description}</p>
              <span class="protocol-card-meta">${a.readTime} read</span>
            </div>
          </a>`;
      }).join('');
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadArticles);
} else {
  setTimeout(loadArticles, 50);
}
