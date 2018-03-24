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
