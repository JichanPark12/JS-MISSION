import { STYLE_CLASS_NAME } from './constants/config.js';
import { getState, setState } from './utils/navStateUtil.js';

const $BODY = document.querySelector('body');
const $TOGGLE_BTN = document.querySelector('.toggle');
const $NAV = document.querySelector('nav');

const { preventLoadingNavAnimation, navActive } = STYLE_CLASS_NAME;

let isNavActive = getState();
isNavActive && $NAV.classList.add(navActive);

const addAllEventListener = () => {
  window.addEventListener('DOMContentLoaded', () => {
    $BODY.style.visibility = 'visible';
  });

  window.addEventListener('beforeunload', () => {
    setState(isNavActive);
  });

  $TOGGLE_BTN.addEventListener('click', () => {
    $BODY.classList.remove(preventLoadingNavAnimation);
    $NAV.classList.toggle(navActive);
    isNavActive = !isNavActive;
  });
};

addAllEventListener();
