const Controller = require('egg').Controller


/**
* @controller 菜单
*/
class SysMenuController extends Controller {

  constructor(ctx) {
    super(ctx)
    // 定义创建接口的请求参数规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
    }
  }
  /**
    * @Authorization
    * @summary test swagger--根据ID查询信息。
    * @description 根据ID查询信息。
    * @router post /sys/menu/save
    * @request id  interget 需要去查新的ID
    * @response 200 JsonBody 返回结果。
    */
  async create() {
    const { ctx, service } = this

    ctx.validate(this.createRule)

    const payload = ctx.request.body || {}
    const res = await service.sys.menu.create(payload)

    ctx.helper.success({ctx, res})
  }
  
  async delete() {
    const { ctx, service } = this
    const { id } = ctx.request.query || {}
    await service.sys.menu.delete(id)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const { id } = payload
    await service.sys.menu.update(id, payload)
    ctx.helper.success({ctx})
  }

  async updateState() {
    const { ctx, service } = this
    // ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const { id } = payload
    await service.sys.menu.updateState(id, payload)
    ctx.helper.success({ctx})
  }

  async find() {
    const { ctx, service } = this
    const { id } = ctx.query || {}
    const res = await service.sys.menu.find(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  async list() {
    const { ctx, service } = this
    const payload = ctx.query || {}
    const res = await service.sys.menu.list(payload)
    ctx.helper.success({ctx, res})
  }

  async selectList() {
    const { ctx, service } = this
    const res = await service.sys.menu.selectList()
    ctx.helper.success({ctx, res})
  }

  async originalList() {
    const { ctx, service } = this
    const payload = ctx.query || {}
    const res = await service.sys.menu.originalList(payload)
    ctx.helper.success({ctx, res})
  }

}

module.exports = SysMenuController
