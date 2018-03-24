export default function(url, apiKey, image) {
  let data = new FormData();
  data.append('file', image)

  let options = {
    method: 'POST',
    headers: new Headers({'api-key': apiKey}),
    mode: 'cors',
    body: data
  };

  return fetch(url, options)
}
