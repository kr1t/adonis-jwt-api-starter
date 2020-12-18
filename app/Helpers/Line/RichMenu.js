const line = require('@line/bot-sdk')
const Env = use('Env')
const fs = require('fs')
const client = new line.Client({
  channelAccessToken: Env.get('LINE_ACCESS_TOKEN'),
})
const Helpers = use('Helpers')

class LineRichMenu {
  constructor(userId = false) {
    this.userId = userId
  }
  async upload(richmenu, imgUrl = 'normal.png') {
    let richMenuId = await client.createRichMenu(richmenu)
    let file = Helpers.publicPath(`/images/richmenu/${imgUrl}`)

    await client.setRichMenuImage(richMenuId, fs.createReadStream(file))

    client.getRichMenuList().then((richmenus) => {
      let oldRichmenu = richmenus.filter(
        (rich) => rich.richMenuId != richMenuId && rich.name == richmenu.name
      )
      oldRichmenu.map(async (rich) => {
        await client.deleteRichMenu(rich.richMenuId)
      })
    })

    return richMenuId
  }

  async default() {
    let richMenuId = await this.upload({
      size: {
        width: 2500,
        height: 1686,
      },
      selected: true,
      name: 'default',
      chatBarText: 'Bulletin',
      areas: [
        {
          bounds: {
            x: 58,
            y: 837,
            width: 1613,
            height: 813,
          },
          action: {
            type: 'uri',
            uri: 'https://google.co.th',
          },
        },
      ],
    })
    await client.setDefaultRichMenu(richMenuId)
    return richMenuId
  }

  async all() {
    return await client.getRichMenuList()
  }

  async link(name) {
    let richmenus = await this.all()
    let richmenu = richmenus.find((rich) => rich.name == name)

    return await client.linkRichMenuToUser(this.userId, richmenu.richMenuId)
  }
}

module.exports = LineRichMenu
