import { $, getTestImage, getOptions, sendImage } from '../js/utils.js'
import Notifications from '../js/notifications.js'

class Options {
  constructor(form, urlInput, apikeyInput, testBtn, saveBtn, notificationsHandler) {
    this.form = form
    this.urlInput = urlInput
    this.apiKeyInput = apikeyInput
    this.testBtn = testBtn
    this.saveBtn = saveBtn
    this.notificationsHandler = notificationsHandler

    this.handleEventListners()
    this.getStoredConfig()
  }

  getStoredConfig() {
    getOptions()
      .then(options => {
        this.urlInput.value = options.nethPublicEndpoint
        this.apiKeyInput.value = options.nethApikey
      })
      .catch(err => console.error(err))
  }

  saveStoredConfig() {
    if (!this.urlInput.checkValidity() || !this.apiKeyInput.checkValidity()) {
      return null
    }

    chrome.storage.sync.set({
      options: {
        "nethPublicEndpoint": this.urlInput.value,
        "nethApikey": this.apiKeyInput.value
      }
    }, () => {
      this.notificationsHandler.updateResponseText('Saved', true)
      this.notificationsHandler.addNotification()
    })
  }

  handleEventListners() {
    this.testBtn.addEventListener('click', this.handleTest.bind(this))
    this.saveBtn.addEventListener('click', this.saveStoredConfig.bind(this))

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }

  async handleTest() {
    if (!this.urlInput.checkValidity() || !this.apiKeyInput.checkValidity()) {
      return null
    }

    let testImage = await getTestImage()
    let url = new URL(this.urlInput.value)

    sendImage(url, this.apiKeyInput.value, testImage)
      .then(response => {
        if (!response.ok) {
          throw new Error("The response was not ok")
        }
        return response
      })
      .then(() => {
        this.notificationsHandler.updateResponseText('Test succesful', true)
        this.notificationsHandler.addNotification()
      })
      .catch(err => {
        this.notificationsHandler.updateResponseText('Test failed', false)
        this.notificationsHandler.addNotification()
        console.error(err)
      })
  }
}

let notificationsHandler = new Notifications($('#notification'), $('#notification-response-text'), $('#notification-close'))
new Options($('form'), $('#url'), $('#apikey'), $('#test'), $('#save'), notificationsHandler)

