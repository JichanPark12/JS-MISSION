// do something!
import { Nav, NewsList } from './components/index.js';

class App {
  #$root = document.querySelector('#root');

  #Nav;

  #NewsList;

  constructor() {
    this.initRender();
    this.#Nav = new Nav(this.#$root.querySelector('.category-list'));
    this.#NewsList = new NewsList(
      this.#$root.querySelector('.news-list-container')
    );
  }

  initRender() {
    const template = document.createElement('template');
    template.innerHTML = `
    <nav class="category-list"></nav>
    <div class="news-list-container">
      <article class="news-list">
      </article>
      <div class="scroll-observer">
        <img src="img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div>`;
    this.#$root.appendChild(template.content);
  }
}

const app = new App();
