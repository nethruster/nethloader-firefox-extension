'strict mode'

import { $, getTestImage } from '/js/utils.js'
import sendImage from '/js/send-image.js'

class Options {
  constructor(form, urlInput, apikeyInput, testBtn, saveBtn) {
    this.form = form
    this.urlInput = urlInput
    this.apiKeyInput = apikeyInput
    this.testBtn = testBtn
    this.saveBtn = saveBtn

    this.handleEventListners()
    this.getStoredConfig()
  }

  getStoredConfig () {
    chrome.storage.sync.get('options', data => {
      let { options } = data

      // Set input values
      this.urlInput.value = options.nethPublicEndpoint
      this.apiKeyInput.value = options.nethApikey
    })
  }

  saveStoredConfig() {
    console.log(this)
    chrome.storage.sync.set({
      options: {
        "nethPublicEndpoint": this.urlInput.value,
        "nethApikey": this.apiKeyInput.value
      }
    }, () => { })
  }

  handleEventListners () {
    this.testBtn.addEventListener('click', this.handleTest.bind(this))
    this.saveBtn.addEventListener('click', this.saveStoredConfig.bind(this))

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }

  async handleTest () {
    let testImage = await getTestImage()
    let url = new URL('/api', this.urlInput.value)

    sendImage(url, this.apiKeyInput.value, testImage)
      .catch(err => {
        console.error(err)
      })
  }
}

new Options($('form'), $('#url'), $('#apikey'), $('#test'), $('#save'))
