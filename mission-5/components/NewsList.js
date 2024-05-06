import { subject, categoryProxy } from '../state/categoryState.js';
import API_KEY from '../constants/apiKey.js';
import CONFIG from '../constants/config.js';

// do something!
class NewsList {
  #page = 1;

  #$newsList;

  #IO;

  #totalResults = Infinity;

  #currentNewsCount = 0;

  #$scrollObserver;

  constructor($container) {
    subject.subscribe(this);
    this.#$newsList = $container.querySelector('.news-list');
    this.#$scrollObserver = document.querySelector('.scroll-observer');
    this.#IO = this.createIO();
    this.#IO.observe(this.#$scrollObserver);
  }

  async getNewsListData() {
    try {
      const data = await axios(
        `https://newsapi.org/v2/top-headlines?country=kr&category=${
          categoryProxy.category === 'all' ? '' : categoryProxy.category
        }&page=${this.#page}&pageSize=${CONFIG.pageSize}&apiKey=${API_KEY}`
      );
      return data.data;
    } catch (e) {
      console.log(`[ERROR]:${e.response.data.message}`);
      return e;
    }
  }

  update(data) {
    if (data.actions === 'changeCategory') {
      this.renderNewsList(true);
    }
  }

  async renderNewsList(isCategoryChange = false) {
    const fragment = document.createDocumentFragment();
    if (isCategoryChange) {
      this.#page = 1;
      this.#currentNewsCount = 0;
    }
    const { articles, totalResults } = await this.getNewsListData();

    articles.forEach((news) =>
      fragment.appendChild(this.createNewsElements(news))
    );

    this.#currentNewsCount += CONFIG.pageSize;
    this.#totalResults = totalResults;

    if (isCategoryChange) {
      this.#$newsList.replaceChildren(fragment);
      this.#page += 1;
      return;
    }

    this.#$newsList.appendChild(fragment);
    this.#page += 1;
  }

  createIO() {
    const IO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (this.#currentNewsCount >= this.#totalResults) {
          this.#$scrollObserver.style.visibility = 'hidden';
          return;
        }
        if (entry.isIntersecting) {
          this.renderNewsList();
          this.#$scrollObserver.style.visibility = 'visible';
        }
      });
    });
    return IO;
  }

  createNewsElements(news) {
    const section = document.createElement('section');
    section.classList.add('news-item');

    section.innerHTML = `
    <div class="thumbnail">
      <a href=${news.url} target="_blank" rel="noopener noreferrer">
        <img
          src=${news.urlToImage ? news.urlToImage : CONFIG.baseImg}
          alt="thumbnail" />
      </a>
    </div>
    <div class="contents">
      <h2>
        <a href=${news.url} target="_blank" rel="noopener noreferrer">
        ${news.title}
        </a>
      </h2>
      <p>
        ${news.description ? news.description : ''}
      </p>
    </div>
  `;

    return section;
  }
}

export default NewsList;
