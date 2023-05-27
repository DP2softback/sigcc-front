export const navigateTo = (url: string, params?: any) => {
  if (params && Object.keys(params).length > 0) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const targetURL = `${url}?${queryString}`;
    window.location.assign(targetURL);
  } else {
    window.location.assign(url);
  }
};