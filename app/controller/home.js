const Controller = require('egg').Controller

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      access: { type: 'string', required: true, allowEmpty: false }
    }
  }

  async index() {
    const ctx = this.ctx

    const res = ''
    ctx.helper.success({ctx, res})
  }
}

module.exports = HomeController
