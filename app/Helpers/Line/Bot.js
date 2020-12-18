'use strict'
// LineBot Helper
const Env = use('Env')
const User = use('App/Models/User')
const axios = require('axios')

class LineBot {
  // Var

  constructor() {
    this.secretToken = Env.get('LINE_ACCESS_TOKEN', false)
    this.#chanelId = Env.get('LINE_CHANNEL_ID', false)
    this.messages = []
  }

  // Setter
  set({ replyToken = false, userId = false }) {
    this.replyToken = replyToken
    this.userId = userId
    return this
  }
  setReplyToken(replyToken) {
    this.replyToken = replyToken
  }
  setUserID(userId) {
    this.userId = userId
  }

  // Adding
  addCarousel({ altText, contents }) {
    this.messages.push({
      type: 'flex',
      altText,
      contents: {
        type: 'carousel',
        contents,
      },
    })

    return this
  }

  addText(text) {
    this.messages.push({
      type: 'text',
      text,
    })

    return this
  }

  addTexts(texts) {
    for (let text of texts) {
      this.messages.push({
        type: 'text',
        text,
      })
    }

    return this
  }

  addImage(image_url) {
    this.messages.push({
      type: 'image',
      originalContentUrl: image_url,
      previewImageUrl: image_url,
    })

    return this
  }

  addImageURI({ altText, baseUrl, linkUri, width = 1040, height = 1040 }) {
    this.messages.push({
      type: 'imagemap',
      baseUrl,
      altText,
      baseSize: {
        width,
        height,
      },
      actions: [
        {
          type: 'uri',
          area: {
            x: 0,
            y: 0,
            width,
            height,
            linkUri,
          },
        },
      ],
    })

    return this
  }
  addImageText({ altText, baseUrl, text, width = 1040, height = 1040 }) {
    this.messages.push({
      type: 'imagemap',
      baseUrl,
      altText,
      baseSize: {
        width,
        height,
      },
      actions: [
        {
          type: 'message',
          area: {
            x: 0,
            y: 0,
            width,
            height,
            text,
          },
        },
      ],
    })

    return this
  }
  // Getter
  get() {
    return {
      replyToken: this.replyToken,
      userId: this.userId,
      message: this.messages,
    }
  }

  // HTTP
  baseUrl = 'https://api.line.me/v2/bot/message'

  async reply() {
    return await this.callHttp('reply')
  }
  async push() {
    return await this.callHttp('push')
  }

  async callHttp(name) {
    if (this.messages.length > 5) {
      return { message: 'maximum 5 items' }
    }

    var message = {
      replyToken: this.replyToken,
      to: this.userId,
      messages: this.messages,
    }

    var config = {
      method: 'POST',
      url: `${this.baseUrl}/${name}`,
      headers: {
        Authorization: `Bearer ${this.secretToken}`,
        'Content-Type': 'application/json',
      },
      data: message,
    }

    try {
      var res = await axios(config)
    } catch (error) {
      console.log(error)
      return { error: 'please console check' }
    }

    const { data, status } = res
    return { data, status }
  }
}

module.exports = LineBot
