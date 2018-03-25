import { getOptions } from '/js/utils.js'

chrome.runtime.onInstalled.addListener(() => {
  const contextMenuItem = {
    "id": "sendToNethloader",
    "title": "Send to Nethloader",
    "contexts": ["image", "video"]
  }
  chrome.contextMenus.create(contextMenuItem)


  getOptions()
    .then(options => {
      if (!options) {
        chrome.storage.sync.set({
          options: {
            "nethPublicEndpoint": "",
            "nethApikey": ""
          }
        }, () => {
          console.log('Installed!')
        })
      }
    })
})
