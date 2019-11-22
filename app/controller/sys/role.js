const Controller = require('egg').Controller



class SysRoleController extends Controller {

  constructor(ctx) {
    super(ctx)
    // 定义创建接口的请求参数规则
    this.createRule = {
      role_name: { type: 'string', required: true, allowEmpty: false },
    }
  }


  async create() {
    const { ctx, service } = this

    ctx.validate(this.createRule)

    const payload = ctx.request.body || {}
    const res = await service.sys.role.create(payload)

    ctx.helper.success({ctx, res})
  }
  
  async delete() {
    const { ctx, service } = this
    const payload = ctx.request.query || {}
    const { id } = payload
    await service.sys.role.delete(id)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const { id } = payload
    await service.sys.role.update(id, payload)
    ctx.helper.success({ctx})
  }

  async updateState() {
    const { ctx, service } = this
    // ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const { id } = payload
    await service.sys.role.updateState(id, payload)
    ctx.helper.success({ctx})
  }

  async find() {
    const { ctx, service } = this
    const payload = ctx.query || {}
    const { id } = payload
    const res = await service.sys.role.find(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  async list() {
    const { ctx, service } = this
    const payload = ctx.query || {}
    const res = await service.sys.role.list(payload)
    ctx.helper.success({ctx, res})
  }

  async selectList() {
    const { ctx, service } = this
    const res = await service.sys.role.selectList()
    ctx.helper.success({ctx, res})
  }

}

module.exports = SysRoleController
