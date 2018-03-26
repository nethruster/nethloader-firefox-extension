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
let copyText
export function sendToClipBoard(text) {
  copyText = text
  document.addEventListener('copy', handleCopy)
  document.execCommand('copy')
  document.removeEventListener('copy', handleCopy)
}

function handleCopy(event) {
  event.clipboardData.setData('text/plain', copyText)
  event.preventDefault()
}

export function spawnNotification(title, body, type, imageUrl, onClickHandler, tiemout) {
  let options = {
    type: type,
    title: title,
    message: body,
    iconUrl: "/img/logo_alt_margin.png"
  }
  if(type === 'image') { options.imageUrl = imageUrl }

  chrome.notifications.create(options, notifactionId => {
    if (onClickHandler) {
      chrome.notifications.onClicked.addListener(onClickHandler(notifactionId))
    }
    if (tiemout) {
      setTimeout(() => {chrome.notifications.clear(notifactionId)}, tiemout)
    }
  })
  
}
export function generateNotificationClickHandler(url) {
  return (notifactionId) => (
    firedNotifactionId => {
      if(notifactionId !== firedNotifactionId) {return}
      let win = window.open(url, '_blank')
      win.focus()
      chrome.notifications.clear(notifactionId)
    }
  )
}
