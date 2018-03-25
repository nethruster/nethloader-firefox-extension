export function $(query) {
  return document.querySelector(query)
}

export function getTestImage() {
  const imageReq = new Request("/img/icons/favicon-128x128.png")
  return fetch(imageReq).then(response => {
    return response.blob()
  }).catch(err => {
    console.error(err)
  })
}

export function getOptions() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get('options', data => {
        let { options } = data

        resolve(options)
      })
    } catch (err) {
      reject(err)
    }
  })
}

export function sendImage(url, apiKey, image) {
  let data = new FormData();
  data.append('file', image)

  let options = {
    method: 'POST',
    headers: new Headers({ 'api-key': apiKey }),
    mode: 'cors',
    body: data
  };

  return fetch(url, options)
}
