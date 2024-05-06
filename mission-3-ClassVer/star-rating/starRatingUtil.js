const updateElementsClasses = (
  $elements,
  className,
  targetNumber = $elements.length
) => {
  $elements.forEach((starBox, idx) =>
    starBox.classList.toggle(className, idx <= targetNumber)
  );
};

export default updateElementsClasses;
