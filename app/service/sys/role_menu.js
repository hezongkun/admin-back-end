const Service = require('egg').Service

class RoleMenuService extends Service {
  constructor(ctx) {
    super(ctx)
    this.Op = this.app.Sequelize.Op
  }

  async create(payload) {
    const { ctx, service } = this
    const role = await service.sys.role.find(payload.role_id)
    if (!role) {
      ctx.throw(404, 'role is not found')
    }
    await service.sys.roleMenu.delete(payload.role_id)
    let createArr = []
    payload.menuIds.forEach((menuId)=>{
      createArr.push({
        role_id:payload.role_id,
        menu_id:menuId
      })
    })
    let result = await ctx.model.Sys.RoleMenu.bulkCreate(createArr)
    if(result && role.state ==1){
      // redis
      let redisSaveResult = await service.sys.auth.saveRoleMenu(payload.role_id,payload.menuIds)
    }
   
    return result
  }

  async delete(_role_id) {
    const { ctx,service } = this

    const query = {
      where:{
        role_id:_role_id
      }
    }
    let result = await ctx.model.Sys.RoleMenu.destroy(query)
    
    // redis
    let redisDeleteResult = await service.sys.auth.delRoleMenu(_role_id)
    
    return result
  }

  async find(_role_id) {

    const query = {
      where:{
        role_id:_role_id
      }
    } 
   
    const list = await this.ctx.model.Sys.RoleMenu.findAll(query)
   
    return list
  }

  async getUserMenu(roleId,isAdmin=false){
    const { ctx,service} = this
    isAdmin = true
    if(isAdmin){
      return await service.sys.menu.selectAdminMenuList()
    }
    const include = {
      attributes: {
        include:['menuInfo.name','menuInfo.path','menuInfo.permisson','menuInfo.icon',
          'menuInfo.type','menuInfo.sort','menuInfo.hidden','menuInfo.url','menuInfo.parent_id']
      },
      include: [
        {
          model: this.ctx.model.Sys.Menu,
          as:'menuInfo',
          where:{
            del_flag:0,
            state:1
          },
          attributes:[]
        }
      ],
      where:{
        role_id:roleId,
      },
      // order:[['menuInfo.sort', 'asc']],
      raw:true
    }
   
    let list = await this.ctx.model.Sys.RoleMenu.findAll(include)
    // list = this.formatTreeData(0,list)
    return list
  }

  async initRole(_role_id='') {
    const { ctx,service} = this

    const include = {
      include: [{
        model: this.ctx.model.Sys.Role,
        as:'roleInfo',
        attributes:[],
        where:{
          del_flag:0,
          state:1
        },
      }],
      order:[['role_id', 'asc']],
      raw:true
    }
    if(_role_id){
      include.where = {
        role_id:_role_id
      }
    }
   
    const list = await this.ctx.model.Sys.RoleMenu.findAll(include)
    const roleMenuObj = {}
    list.forEach((_role_menu)=>{
      if(Object.prototype.hasOwnProperty.call(roleMenuObj, _role_menu.role_id)){
        roleMenuObj[_role_menu.role_id].push(_role_menu.menu_id)
      }
      else{
        roleMenuObj[_role_menu.role_id] = [_role_menu.menu_id]
      }
    })
    for (let key in roleMenuObj) {
      let redisDeleteResult = await service.sys.auth.delRoleMenu(key)

      let redisSaveResult = await service.sys.auth.saveRoleMenu(key,roleMenuObj[key])
    }
    return true
  }
 
}

module.exports = RoleMenuService
