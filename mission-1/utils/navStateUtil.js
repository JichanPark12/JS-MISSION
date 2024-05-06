import { CHECK_NAV_ACTIVE_LOCAL_STORAGE_KEY } from '../constants/config.js';

export const setState = (state) => {
  if (typeof state !== 'boolean') {
    throw new TypeError(`state는 boolean 이여야 합니다`);
  }
  localStorage.setItem(CHECK_NAV_ACTIVE_LOCAL_STORAGE_KEY, state);
};

export const getState = () =>
  JSON.parse(localStorage.getItem(CHECK_NAV_ACTIVE_LOCAL_STORAGE_KEY));
