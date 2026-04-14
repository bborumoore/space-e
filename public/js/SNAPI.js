const container = document.getElementById('snapi-container');
const refreshButton = document.getElementById('refresh-news');

const requestArticles = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10';
const fallbackImage = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80';

const renderStatus = (message, isError = false) => {
  container.innerHTML = '';
  const status = document.createElement('p');
  status.textContent = message;
  status.className = isError ? 'text-warning' : 'text-light';
  container.appendChild(status);
};

const createSafeLink = (url, text) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer external';
  link.textContent = text;
  return link;
};

const renderArticles = (articles) => {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  articles.forEach((article) => {
    const card = document.createElement('article');
    card.classList.add('small-div', 'mb-4', 'p-3', 'bg-dark', 'text-white', 'rounded');

    const image = document.createElement('img');
    image.src = article.image_url || fallbackImage;
    image.alt = article.title || 'Space news image';
    image.style.maxWidth = '100%';
    image.style.maxHeight = '400px';
    image.classList.add('mb-3');
    image.loading = 'lazy';
    card.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = article.title || 'Untitled article';
    card.appendChild(title);

    const summary = document.createElement('p');
    summary.textContent = article.summary || 'No summary available.';
    card.appendChild(summary);

    const link = createSafeLink(article.url, 'Read the full story');
    card.appendChild(link);

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
};

const getArticles = async () => {
  renderStatus('Loading the latest space news...');

  try {
    const response = await fetch(requestArticles);
    if (!response.ok) {
      throw new Error(`Space news request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const articles = payload.results || [];

    if (!articles.length) {
      renderStatus('No recent space articles found right now. Please refresh in a moment.');
      return;
    }

    renderArticles(articles);
  } catch (error) {
    console.error(error);
    renderStatus('Unable to load space news right now. Please try again shortly.', true);
  }
};

refreshButton?.addEventListener('click', getArticles);
getArticles();
