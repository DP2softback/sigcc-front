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

export const formatDate = (dateString: string) => {
  const dateParts = dateString.split('T')[0].split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year}`;
};