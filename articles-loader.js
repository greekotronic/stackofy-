// Stackofy - Articles Loader
// Reads articles.json and populates article cards on any page
// Add <div id="articles-grid"></div> or <div id="featured-article"></div> to use

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

    // FEATURED ARTICLE (homepage)
    const featuredEl = document.getElementById('featured-article');
    if (featuredEl) {
      const featured = articles.find(a => a.featured) || articles[0];
      featuredEl.innerHTML = makeCard(featured, 'featured');
    }

    // LATEST 4 CARDS (homepage)
    const latestEl = document.getElementById('latest-articles');
    if (latestEl) {
      const latest = articles.filter(a => !a.featured).slice(0, 4);
      latestEl.innerHTML = latest.map(a => makeCard(a, 'small')).join('');
    }

    // LONGEVITY SECTION (homepage)
    const longevityEl = document.getElementById('longevity-articles');
    if (longevityEl) {
      const longevity = articles.filter(a => a.tags.includes('longevity')).slice(0, 3);
      longevityEl.innerHTML = longevity.map(a => makeCard(a, 'horizontal')).join('');
    }

    // FOUNDATION SECTION (homepage)
    const foundationEl = document.getElementById('foundation-articles');
    if (foundationEl) {
      const foundation = articles.filter(a =>
        ['Magnesium','Omega-3','Vitamin D3'].includes(a.tag)
      );
      foundationEl.innerHTML = foundation.map(a => makeCard(a, 'horizontal')).join('');
    }

    // IMMUNE SECTION (homepage)
    const immuneEl = document.getElementById('immune-articles');
    if (immuneEl) {
      const immune = articles.filter(a =>
        a.tags.includes('immune') && !['Magnesium','Omega-3','Vitamin D3'].includes(a.tag)
      ).slice(0, 2);
      immuneEl.innerHTML = immune.map(a => makeCard(a, 'horizontal')).join('');
    }

    // ARTICLES PAGE - full grid
    const articlesGridEl = document.getElementById('articles-grid');
    if (articlesGridEl) {
      articlesGridEl.innerHTML = articles.map(a => makeCard(a, 'articles-page')).join('');
      // Update count
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
  // DOM already ready but wait for header.js to finish inserting elements
  setTimeout(loadArticles, 50);
}
