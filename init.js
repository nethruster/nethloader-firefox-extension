chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    options: {
      "nethPublicEndpoint": "",
      "nethApikey": ""
    }
  }, () => {
    console.log('options')
  })
})
