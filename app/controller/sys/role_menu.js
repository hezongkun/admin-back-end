const Controller = require('egg').Controller



class SysRoleMenuController extends Controller {

  constructor(ctx) {
    super(ctx)
    // 定义创建接口的请求参数规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
    }
  }


  async save() {
    const { ctx, service } = this

    // ctx.validate(this.createRule)

    const payload = ctx.request.body || {}
    const res = await service.sys.roleMenu.create(payload)

    ctx.helper.success({ctx, res})
  }

  async find() {
    const { ctx, service } = this
    const { id } = ctx.query || {}
    const res = await service.sys.roleMenu.find(id)
    ctx.helper.success({ctx, res})
  }

}

module.exports = SysRoleMenuController
