import updateElementsClasses from './starRatingUtil.js';
import {
  createLinkElement,
  appendLinkAfterLast,
  checkNumberType,
} from '../utils/util.js';

appendLinkAfterLast(createLinkElement('star-rating/theme.css', 'stylesheet'));

class StarRating {
  #$container;

  #$starList;

  #$maxRating = 5;

  constructor($container) {
    this.#$container = $container;
    this.#$maxRating = $container.dataset.maxRating;
    try {
      this.validate();
    } catch (e) {
      console.log(`${e}`);
      this.#$maxRating = 5;
    }

    this.init();
  }

  validate() {
    if (this.#$maxRating === '0') {
      throw new Error(
        `Star-rating 컴포넌트의 max-rating 어트리뷰트 값은 1 이상 이어야 합니다.`
      );
    }
    if (!checkNumberType(this.#$maxRating)) {
      throw new Error(
        `Star-rating 컴포넌트의 max-rating 어트리뷰트 값은 숫자 이어야 합니다.`
      );
    }
  }

  init() {
    this.renderStarRating();
    this.allAddEventListener();

    this.#$starList = this.#$container.querySelectorAll('.bxs-star');
  }

  renderStarRating() {
    const $div = document.createElement('div');
    $div.classList.add('star-rating-container');

    $div.innerHTML = Array.from({ length: this.#$maxRating })
      .map((_, i) => `<i class='bx bxs-star' data-rating='${i}'></i>`)
      .join('');
    this.#$container.appendChild($div);
  }

  triggerRatingChangeEvent(rating) {
    const event = new CustomEvent('rating-change', {
      detail: rating,
      bubbles: true,
    });
    this.#$container.dispatchEvent(event);
  }

  allAddEventListener() {
    this.onClickStar();
    this.onMouseoverStar();
    this.onMouseleaveStar();
  }

  onClickStar() {
    this.#$container.addEventListener('click', (e) => {
      if (!e.target.matches('.bxs-star')) return;

      // prettier-ignore
      const { rating } = e.target.dataset;
      updateElementsClasses(this.#$starList, 'selected', rating);
      this.triggerRatingChangeEvent(+rating + 1);
    });
  }

  onMouseoverStar() {
    this.#$container.addEventListener('mouseover', (e) => {
      if (!e.target.matches('.bxs-star')) return;

      const { rating } = e.target.dataset;
      updateElementsClasses(this.#$starList, 'hovered', rating);
    });
  }

  onMouseleaveStar() {
    this.#$container.addEventListener('mouseleave', () => {
      this.#$starList.forEach((starBox) => starBox.classList.remove('hovered'));
    });
  }
}

export default StarRating;
