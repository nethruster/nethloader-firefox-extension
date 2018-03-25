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

export function spawnNotification(title, body, icon, onClick, tiemout) {
  if (!icon) {
    icon = "/img/logo_alt_margin.png"
  }

  var options = {
    body: body,
    icon: icon
  }

  let notifaction = new Notification(title, options)
  if (onClick) {
    notifaction.addEventListener('click', onClick)
  }
  if (tiemout) {
    setTimeout(notifaction.close.bind(notifaction), tiemout)
  }
}
export function generateNotificationHandler(url) {
  return event => {
    let notifaction = event.currentTarget
    let win = window.open(url, '_blank')
    win.focus()
    notifaction.close()
  }
}
