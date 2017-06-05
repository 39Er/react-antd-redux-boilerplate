'use strict';

export default function fetchJson(url, options) {
  let defaultOptions = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (!options) {
    options = defaultOptions;
  } else {
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }
    options = Object.assign(defaultOptions, options);
  }
  let request = new Request(url, options);
  return fetch(request)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
        });
      }
      let contentType = res.headers.get('Content-Type');
      if (contentType.includes('application/json')) {
        return res.json();
      } else if (contentType.includes('text/html')) {
        return res.text();
      }
      return Promise.reject({
        status: '500',
        statusText: 'Cannot parse response',
      });
    });
}
