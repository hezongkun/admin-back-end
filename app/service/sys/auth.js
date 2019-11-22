const Service = require('egg').Service

class AuthService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  async delAuthMenuByPermisson(permisson){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').hdel('AUTH:MENU:LIST',permisson)
  }

  async getAuthMenuByPermisson(permisson){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').hget('AUTH:MENU:LIST',permisson)
  }

  async delAllAuthMenu(){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').del('AUTH:MENU:LIST')
  }

  async saveMenuList(permisson,menuId){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').hmset('AUTH:MENU:LIST',permisson,menuId)
  }
  async saveAllMenuList(menuArr){
    const { ctx, service } = this
    await this.delAllAuthMenu()
    return await ctx.app.redis.get('auth').hmset('AUTH:MENU:LIST',menuArr)
  }

  async checkRole(roleId,menuId){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').sismember('AUTH:ROLE:MENU:'+roleId,menuId)
  }

  async saveRoleMenu(roleId,menuIds){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').sadd('AUTH:ROLE:MENU:'+roleId,menuIds)
  }

  async delRoleMenu(roleId){
    const { ctx, service } = this
    return await ctx.app.redis.get('auth').del('AUTH:ROLE:MENU:'+roleId)
  }

}

module.exports = AuthService
