export const navigateTo = (url, params) => {
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const targetURL = `${url}?${queryString}`;
  window.location.assign(targetURL);
};