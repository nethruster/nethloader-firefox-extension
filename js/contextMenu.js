import { getOptions, sendImage } from '/js/utils.js'

const supportedExtensions = ["png", "jpg", "jpeg", "svg", "webp", "mp4", "ogg", "webm", "gif"]

chrome.contextMenus.onClicked.addListener(async data => {
  console.log("Wadup!")
  if (data.menuItemId !== 'sendToNethloader') { return }
  if (!supportedExtensions.includes(data.srcUrl.split('.').pop().split(/\#|\?/)[0])) {
    return
  }
  let { nethPublicEndpoint, nethApikey } = await getOptions()

  fetch(data.srcUrl)
    .then(resp => {
      if (!resp.ok) { throw new Error("The response was not ok") }
      return resp
    })
    .then(resp => resp.blob())
    .then(image => sendImage(nethPublicEndpoint, nethApikey, image))
    .catch(err => console.error(err))
})


