import { getOptions, sendImage, sendToClipBoard, spawnNotification, generateNotificationHandler } from '/js/utils.js'

const supportedExtensions = ["png", "jpg", "jpeg", "svg", "webp", "mp4", "ogg", "webm", "gif"]

chrome.contextMenus.onClicked.addListener(async data => {
  if (data.menuItemId !== 'sendToNethloader') { return }
  let ext = data.srcUrl.split('.').pop().split(/\#|\?/)[0]
  if (!supportedExtensions.includes(ext)) {
    spawnNotification("Invalid media format", `Nethloader doesn't support ".${ext}" files.`, null, null, 5000)
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
    .then(resp => {
      if (!resp.ok) { throw new Error("The response was not ok") }
      return resp
    })
    .then(resp => resp.json())
    .then(result => {
      sendToClipBoard(result.data.link)
      return result
    })
    .then(result => {
      spawnNotification("Media uploaded", "The link has been copied to your clipboard.", result.data.thumb, generateNotificationHandler(result.data.link), 5000)
    })
    .catch(err => {
      spawnNotification("Error while uploding", "The image cloud not be uplouded.", null, null, 5000)
      console.error(err)
    })
})


