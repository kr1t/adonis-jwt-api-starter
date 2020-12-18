'use strict'

const Route = use('Route')

module.exports = () => {
  Route.post('/webhook', 'Line/WebHookController.index')
  Route.post('/richmenu/set/default', 'Line/RichMenuController.setDefault')
  Route.post('/richmenu/set/manual', 'Line/RichMenuController.setManual')
}
