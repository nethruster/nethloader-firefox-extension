import {$, getTestImage} from '/js/utils.js'
import sendImage from '/js/send-image.js'

const form = $('form')
const urlInput = $('#url')
const apiKeyInput = $('#api-key')
const typeInput = $('#type') 
const testBtn = $('#test')
const saveBtn = $('#save')

testBtn.addEventListener('click', event => typeInput.value = "test")
saveBtn.addEventListener('click', event => typeInput.value = "save")

chrome.storage.sync.get('options', data => {
  let {options} = data
  urlInput.value = options.nethPublicEndpoint.replace("/api", "")
  apiKeyInput.value = options.nethApikey
})

form.addEventListener('submit', event => {
  event.preventDefault()
  if(type.value === "save") {
    handleSave()
  } else {
    handleTest()
  }
})

function handleSave() {
  chrome.storage.sync.set({
    options: {
      "nethPublicEndpoint": new URL('/api', urlInput.value),
      "nethApikey": apiKeyInput.value
    }
  }, () => {})
}

async function handleTest() {
  let testImage = await getTestImage()

  let url = new URL('/api', urlInput.value)

  sendImage(url, apiKeyInput.value, testImage)
    .then(result => {})
}
