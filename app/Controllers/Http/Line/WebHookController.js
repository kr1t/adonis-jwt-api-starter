'use strict'
const LineBot = use('App/Helpers/Line/Bot')
const LineEvent = use('App/Helpers/Line/Event')
const LineRichMenu = use('App/Helpers/Line/RichMenu')

class WebHookController {
  constructor() {
    this.bot = new LineBot()
  }
  async index({ request, response }) {
    const $event = (this.event = new LineEvent(request.all()))
    const $richmenu = (this.richmenu = new LineRichMenu($event.token().userId))

    this.bot.set($event.token())

    if ($event.hasText('normal')) {
      return await $richmenu.link('default')
    }
    if ($event.hasText('registered')) {
      return await $richmenu.link('registered')
    }
  }
}

module.exports = WebHookController
