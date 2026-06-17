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
  'c-resv': 'background:linear-gradient(135deg,#3d0a0a,#7A1A1A)',
  'c-quer': 'background:linear-gradient(135deg,#3d4a10,#6B7A2A)',
  'c-pter': 'background:linear-gradient(135deg,#1a2a4a,#2D4A6B)',
  'c-nr': 'background:linear-gradient(135deg,#1B3A2A,#2D6A4F)',
  'c-audit': 'background:linear-gradient(135deg,#1a1a1a,#2D3A2A)',
  'c-sperm': 'background:linear-gradient(135deg,#2A3A10,#4A6A20)',
  'c-ala': 'background:linear-gradient(135deg,#1a1a00,#3A3A10)',
  'c-gly': 'background:linear-gradient(135deg,#1a2a1a,#2D6A4F)',
  'c-alcar': 'background:linear-gradient(135deg,#0a1a0a,#1B4332)',
  'c-creatine': 'background:linear-gradient(135deg,#1a1a1a,#2A2A10)',
  'c-collagen': 'background:linear-gradient(135deg,#1a2a10,#2D5A1B)',
  'c-sulfo': 'background:linear-gradient(135deg,#0a1a0a,#1B4332)',
};

function makeCard(article, size) {
  const bg = COLORS[article.color] || 'background:#1B4332';

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

    // FEATURED ARTICLE (homepage) - the one marked featured:true
    const featuredEl = document.getElementById('featured-article');
    if (featuredEl) {
      const featured = articles.find(a => a.featured) || articles[0];
      featuredEl.innerHTML = makeCard(featured, 'featured');
    }

    // LATEST ARTICLES (homepage) - all non-featured articles
    const latestEl = document.getElementById('latest-articles');
    if (latestEl) {
      const latest = articles.filter(a => !a.featured);
      latestEl.innerHTML = latest.map(a => makeCard(a, 'small')).join('');
    }

    // LONGEVITY SECTION (homepage) - top 3 longevity articles
    const longevityEl = document.getElementById('longevity-articles');
    if (longevityEl) {
      const longevity = articles.filter(a => a.tags.includes('longevity')).slice(0, 3);
      longevityEl.innerHTML = longevity.map(a => makeCard(a, 'horizontal')).join('');
    }

    // ENERGY & PERFORMANCE (homepage) - CoQ10 and PQQ
    const energyEl = document.getElementById('energy-articles');
    if (energyEl) {
      const energy = articles.filter(a =>
        ['CoQ10', 'PQQ'].includes(a.tag)
      );
      energyEl.innerHTML = energy.map(a => makeCard(a, 'horizontal')).join('');
    }

    // FOUNDATION SECTION (homepage) - D3, Magnesium, Omega-3
    const foundationEl = document.getElementById('foundation-articles');
    if (foundationEl) {
      const foundation = articles.filter(a =>
        ['Magnesium', 'Omega-3', 'Vitamin D3'].includes(a.tag)
      );
      foundationEl.innerHTML = foundation.map(a => makeCard(a, 'horizontal')).join('');
    }

    // IMMUNE SECTION (homepage) - Vitamin C and Selenium
    const immuneEl = document.getElementById('immune-articles');
    if (immuneEl) {
      const immune = articles.filter(a =>
        ['Vitamin C', 'Selenium'].includes(a.tag)
      );
      immuneEl.innerHTML = immune.map(a => makeCard(a, 'horizontal')).join('');
    }

    // ARTICLES PAGE - full grid
    const articlesGridEl = document.getElementById('articles-grid');
    if (articlesGridEl) {
      articlesGridEl.innerHTML = articles.map(a => makeCard(a, 'articles-page')).join('');
      const countEl = document.getElementById('article-count');
      if (countEl) countEl.textContent = articles.length;
    }

  } catch (e) {
    console.error('Stackofy: Could not load articles.json', e);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadArticles);
} else {
  setTimeout(loadArticles, 50);
}
