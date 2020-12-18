'use strict'
const LineRichMenu = use('App/Helpers/Line/RichMenu')

class RichMenuController {
  async setDefault() {
    let richmenu = new LineRichMenu()
    return await richmenu.default()
  }
  async setManual({ request, response }) {
    const req = request.all()

    let richmenu = new LineRichMenu()

    return richmenu.all()
    return await richmenu.upload(req, req.imgUrl)
  }
}

module.exports = RichMenuController
