export default class Notifications {
  constructor(notificationNode, responseTextNode, closeButtonNode) {
    this.notification = notificationNode
    this.closeButton = closeButtonNode
    this.responseText = responseTextNode
    this.notificationCount = 0
    this.activeClassName = 'active'
    this.timeOut = null

    this.closeButton.addEventListener('click', this.removeNotification.bind(this))
  }

  addNotification() {
    if (this.notificationCount === 0) {
      this.notification.classList.add(this.activeClassName)
      this.increaseNotificationCountValue()
      this.updateNotificationCount()
    } else {
      this.increaseNotificationCountValue()
      this.updateNotificationCount()
    }

    this.updateNotificationCount()

    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    this.timeOut = setTimeout(this.removeNotification.bind(this), 5000);
  }

  removeNotification() {
    this.notification.classList.remove(this.activeClassName)
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    this.resetNotificationCountValue()
    this.updateNotificationCount()

    this.timeOut = null
  }

  increaseNotificationCountValue() {
    this.notificationCount = this.notificationCount + 1
  }

  resetNotificationCountValue() {
    this.notificationCount = 0
  }

  updateNotificationCount() {
    this.notification.dataset.count = this.notificationCount
  }

  toggleNotificationMode(mode) {
    if (mode) {
      this.responseText.previousElementSibling.classList.remove('failure')
      this.responseText.previousElementSibling.classList.add('success')
      this.responseText.classList.remove('failure')
      this.responseText.classList.add('success')
    } else {
      this.responseText.previousElementSibling.classList.remove('success')
      this.responseText.previousElementSibling.classList.add('failure')
      this.responseText.classList.remove('success')
      this.responseText.classList.add('failure')
    }
  }

  updateResponseText(text, mode) {
    if (text !== this.responseText.innerHTML) {
      this.resetNotificationCountValue()
      this.updateNotificationCount()
    }

    this.toggleNotificationMode(mode)

    this.responseText.innerHTML = text
  }
}
