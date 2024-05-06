import { createLinkElement, appendLinkAfterLast } from '../utils/util.js';
import { renderStarRating, updateElementsClasses } from './starRatingUtil.js';

// do something!
appendLinkAfterLast(createLinkElement('star-rating/theme.css', 'stylesheet'));

const StarRating = ($container) => {
  renderStarRating($container);

  const $starList = $container.querySelectorAll('.bxs-star');

  $container.addEventListener('click', (e) => {
    if (!e.target.matches('.bxs-star')) return;
    const { rating } = e.target.dataset;
    updateElementsClasses($starList, 'selected', rating);
    const event = new CustomEvent('rating-change', {
      detail: +rating + 1,
    });
    $container.dispatchEvent(event);
  });

  $container.addEventListener('mouseleave', (e) => {
    if (!e.target.matches('.bxs-star')) return;
    const { rating } = e.target.dataset;
    updateElementsClasses($starList, 'hovered', rating);
  });

  $container.addEventListener('mouseout', () => {
    $starList.forEach((starBox) => starBox.classList.remove('hovered'));
  });
};

export default StarRating;
