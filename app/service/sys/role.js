const Service = require('egg').Service

class RoleService extends Service {
  constructor(ctx) {
    super(ctx)
    this.Op = this.app.Sequelize.Op
  }

  async create(payload) {
    const { ctx, service } = this
   
    const result = await ctx.model.Sys.Role.create(payload)
    
    return result
  }

  async delete(_id) {
    const { ctx, service } = this
    const role = await service.sys.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    // if (role.rolename === 'admin') {
    //   ctx.throw(404, 'can\'t delete super admin')
    // }
    const query = {
      where:{id:_id}
    } 
    const deletePayload = {
      del_flag: 1,
      delete_time: ctx.helper.formatTime(),
      updated_at: ctx.helper.formatTime()
    }
    let result = ctx.model.Sys.Role.update(deletePayload,query)
    if(result){
      let redisDeleteResult = await service.sys.auth.delRoleMenu(_id)
    }
 
    return result
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const role = await service.sys.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    const { role_name} = payload
    const updatePayload = {
      role_name:role_name,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      where:{id:_id}
    } 
    return ctx.model.Sys.Role.update(updatePayload,query)
  }

  async updateState(_id, payload) {
    const { ctx, service } = this
    const role = await service.sys.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    const { state } = payload
    const updatePayload = {
      state:state,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      where:{id:_id}
    } 
    let result = await ctx.model.Sys.Role.update(updatePayload,query)
    if(result){
      if(state==0){
        let redisDeleteResult = await await service.sys.auth.delRoleMenu(_id)
      }
      else{
        let resetRoleResult = await service.sys.roleMenu.initRole(_id)
      }
    }
    return result
  }


  async find(_id) {
    const role = await this.ctx.model.Sys.Role.findByPk(_id)
    if (!role) {
      this.ctx.throw(404, 'role not found')
    }
    return role
  }

  async list(payload) {
    const { pageNo, pageSize, role_name,state, orderBy, sort } = payload
    let res = []
    let count = 0
    let offset = ((Number(pageNo || 1)) - 1) * Number(pageSize || 10)

    const searchQuery = {
      where:{
        role_name:{
          [this.Op.like]:`%${role_name || ''}%`
        },
        del_flag:0,
        state:state
      }
    }
    if(!state){
      delete(searchQuery.where.state)
    }

    const query = {
      limit: Number(pageSize || 10), 
      offset: offset,
      order:[[orderBy || 'id', sort || 'asc']],
    }
   
   
    return await this.ctx.model.Sys.Role.findAndCountAll(Object.assign(query,searchQuery))
  }  

  async selectList() {
    let res = []

    const searchQuery = {
      where:{
        del_flag:0,
        state:1
      }
    }
    res = await this.ctx.model.Sys.Role.findAll(searchQuery)

    return res
  }  

}

module.exports = RoleService
