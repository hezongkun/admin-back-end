const Controller = require('egg').Controller

class SysUserController extends Controller {

  constructor(ctx) {
    super(ctx)
    const validateRule = ctx.helper.validateRule
    // 定义创建接口的请求参数规则
    this.loginRule = {
      username: validateRule.username,
      password: validateRule.password,
    }
    this.createRule = {
      username: validateRule.username,
      password: validateRule.password,
      phone: validateRule.phone,
      nickname: validateRule.nickname,
      role_id: validateRule.role_id,
    }

    this.updateRule = {
      username: validateRule.username,
      password: validateRule.repassword,
      phone: validateRule.phone,
      nickname: validateRule.nickname,
      role_id: validateRule.role_id,
    }

    this.updateStateRule = {
      state: validateRule.state,
      id: validateRule.id,
    }

    this.updatePasswordRule = {
      old_password: validateRule.password,
      new_password: validateRule.password,
      id: validateRule.id,
    }

    this.findRule = {
      id: validateRule.id,
    }

    this.listRule = {
      pageNo: validateRule.pageNo,
      pageSize: validateRule.pageSize,
      nickname: validateRule.search_nickname,
      state: validateRule.search_state,
      orderBy: validateRule.orderBy,
      sort: validateRule.sort,
    }
    
  }
  
  async info(){
    const { ctx, service } = this
    const payload = ctx.request.query || {}
    const menus = await service.sys.roleMenu.getUserMenu(ctx.locals.roleId,ctx.locals.isAdmin)
    const userInfo = await service.sys.user.find(ctx.locals.userId)
    let res = {
      menus:menus,
      userInfo:userInfo
    }
    ctx.helper.success({ctx, res})

  }
  async login(){
    const { ctx, service } = this
    ctx.validate(this.loginRule)
    const payload = ctx.request.body || {}
    const res = await service.sys.user.login(payload)
    ctx.helper.success({ctx, res})

  }

  async logout(){
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    // const res = await service.sys.user.logout(payload)
    const res = 'success'
    ctx.helper.success({ctx, res})

  }

  async create() {
    const { ctx, service } = this

    ctx.validate(this.createRule)

    const payload = ctx.request.body || {}
    const res = await service.sys.user.create(payload)

    ctx.helper.success({ctx, res})
  }
  
  async delete() {
    const { ctx, service } = this
    const payload = ctx.request.query || {}
    const { id } = payload
    
    ctx.validate(this.findRule,ctx.request.query)

    await service.sys.user.delete(id)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.updateRule)
    const payload = ctx.request.body || {}
    const { id } = payload
    await service.sys.user.update(id, payload)
    ctx.helper.success({ctx})
  }

  async updateState() {
    const { ctx, service } = this
    ctx.validate(this.updateStateRule)
    const payload = ctx.request.body || {}
    const { id } = payload
    await service.sys.user.updateState(id, payload)
    ctx.helper.success({ctx})
  }

  async updatePassword() {
    const { ctx, service } = this
    ctx.validate(this.updatePasswordRule)
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    await service.sys.user.updatePassword(id, payload)
    ctx.helper.success({ctx})
  }

  async find() {
    const { ctx, service } = this
    ctx.validate(this.findRule,ctx.query)

    const { id } = ctx.query
    const res = await service.sys.user.find(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  async list() {
    const { ctx, service } = this
    ctx.query.pageNo = parseInt(ctx.query.pageNo)
    ctx.query.pageSize = parseInt(ctx.query.pageSize)
    ctx.validate(this.listRule,ctx.query)

    const payload = ctx.query
    const res = await service.sys.user.list(payload)
    ctx.helper.success({ctx, res})
  }


}

module.exports = SysUserController
