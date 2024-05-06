export const renderStarRating = ($container) => {
  const $div = document.createElement('div');
  $div.classList.add('star-rating-container');

  $div.innerHTML = Array.from({ length: $container.dataset.maxRating })
    .map((_, i) => `<i class='bx bxs-star' data-rating='${i}'></i>`)
    .join('');
  $container.appendChild($div);
};
export const updateElementsClasses = ($elements, className, targetNumber) => {
  [...$elements].forEach((starBox, idx) =>
    starBox.classList.toggle(className, idx <= targetNumber)
  );
};
