class LineEvent {
  events = []

  constructor(req) {
    this.events = req.events[0]
  }

  // Getter
  text() {
    try {
      return this.events.message.text
    } catch (error) {
      return error
    }
  }

  get() {
    try {
      return this.events
    } catch (error) {
      return error
    }
  }

  token() {
    let event = this.events
    try {
      return { replyToken: event.replyToken, userId: event.source.userId }
    } catch (error) {
      return error
    }
  }

  // Condition
  hasAnyText(texts = []) {
    let status = false
    for (let text of texts) {
      if (this.text() == text) {
        status = true
      }
    }
    return status
  }

  hasText(text = false) {
    return text ? this.text() == text : false
  }

  // 3rd
  async forword(url) {
    let event = this.events

    var config = {
      method: 'POST',
      url: `${url}`,
      data: event,
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

module.exports = LineEvent
