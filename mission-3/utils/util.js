export const createLinkElement = (href, rel) => {
  const $newLink = document.createElement('link');
  $newLink.href = href;
  $newLink.rel = rel;
  return $newLink;
};

export const appendLinkAfterLast = ($newLink) => {
  const $linkElements = document.querySelectorAll('link');
  $linkElements[$linkElements.length - 1].insertAdjacentElement(
    'afterend',
    $newLink
  );
};
