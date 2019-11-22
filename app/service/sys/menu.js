const Service = require('egg').Service

class MenuService extends Service {
  constructor(ctx) {
    super(ctx)
    this.Op = this.app.Sequelize.Op
  }

  async create(payload) {
    const { ctx, service } = this
   
    const result = await ctx.model.Sys.Menu.create(payload)
    if(result.id){

      let redisSaveResult = await service.sys.auth.saveMenuList(result.permisson,result.id)
    }
    return result
  }

  async delete(_id) {
    const { ctx, service } = this
    const menu = await service.sys.menu.find(_id)
    if (!menu) {
      ctx.throw(404, 'menu not found')
    }
    // if (menu.menuname === 'admin') {
    //   ctx.throw(404, 'can\'t delete super admin')
    // }
    const query = {
      where:{id:_id}
    } 

    let result =  ctx.model.Sys.Menu.destroy(query)
   
    let redisDeleteResult = await service.sys.auth.delAuthMenuByPermisson(menu.permisson)
    await this.initMenuList()
    return result
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const menu = await service.sys.menu.find(_id)
    if (!menu) {
      ctx.throw(404, 'menu not found')
    }
    const { name, path, icon, type, permisson, sort,hidden,url,parent_id } = payload
    const updatePayload = {
      name:name,
      path:path,
      icon:icon,
      type:type,
      sort:sort,
      permisson:permisson,
      hidden:hidden,
      url:url,
      parent_id:parent_id,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      'where':{id:_id}
    } 
    let result = ctx.model.Sys.Menu.update(updatePayload,query)
    if(result){
      let redisDeleteResult = await service.sys.auth.delAuthMenuList(menu.permisson)
      let redisSaveResult = await service.sys.auth.saveMenuList(permisson,_id)
    }
    return result
  }

  async updateState(_id, payload) {
    const { ctx, service } = this
    const menu = await service.sys.menu.find(_id)
    if (!menu) {
      ctx.throw(404, 'menu not found')
    }
    const { state } = payload
    const updatePayload = {
      state:state,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      where:{id:_id}
    } 
    let result = await ctx.model.Sys.Menu.update(updatePayload,query)
    if(result && state == 0){
      let redisDeleteResult = await service.sys.auth.delAuthMenuByPermisson(menu.permisson)
    }
    return 
  }


  async find(_id) {
    const menu = await this.ctx.model.Sys.Menu.findByPk(_id)
    if (!menu) {
      this.ctx.throw(404, 'menu not found')
    }
    return menu
  }

  async list(payload) {
    const { pageNo, pageSize, name,state, orderBy, sort } = payload
    let res = []
    let count = 0
    let offset = ((Number(pageNo || 1)) - 1) * Number(pageSize || 10)

    const searchQuery = {
      where:{
        [this.Op.or]:[
          {
            name:{
              [this.Op.like]:`%${name || ''}%`
            },
          },
          {
            path:{
              [this.Op.like]:`%${name || ''}%`
            }
          }
        ],
        del_flag:0,
        state:state
      }
    }
    if(!state){
      delete(searchQuery.where.state)
    }

    const query = {
      order:[[orderBy || 'id', sort || 'asc']],
    }
   
    res = await this.ctx.model.Sys.Menu.findAndCountAll(Object.assign(query,searchQuery))
    let formatData = this.formatTreeData(0,res.rows)
    if(formatData.length>0){
      formatData= formatData[0].children
      res.rows = formatData
    }
    await this.service.sys.roleMenu.initRole()
    return res
  }  

  async selectAdminMenuList(){
    let res = []
    const searchQuery = {
      where:{
        del_flag:0,
      },
      order:[[ 'sort', 'asc']],
      attributes:{include:[
        ['id','menu_id']
      ]}
    }
 
    res = await this.ctx.model.Sys.Menu.findAll(searchQuery)
    return res
  }

  async selectList() {

    let res = []
    const searchQuery = {
      where:{
        del_flag:0,
      },
      order:[[ 'sort', 'asc']],
    }
 
    res = await this.ctx.model.Sys.Menu.findAll(searchQuery)
    return this.formatTreeData(0,res)
  }  

  async originalList(payload) {
    const { type } = payload

    let res = []
    const searchQuery = {
      where:{
        del_flag:0
      }
    }
    if(type){
      Object.assign(searchQuery.where,{type:type})
    }
   
    return await this.ctx.model.Sys.Menu.findAll(searchQuery)
  }  

  // 根据父级id遍历子集
  formatTreeData (parentId,menuList) {
    const arr = []
    const _this = this
    // 查询该id下的所有子集
    menuList.forEach(function (obj) {
      if (obj.parent_id === parentId) {
        let childObj = {
          id: obj.id,
          key: obj.id,
          title: obj.name,
          children: _this.formatTreeData(obj.id,menuList)
        }
        if(childObj.children.length==0){
          delete(childObj.children)
        }
        arr.push(Object.assign(obj.toJSON(), childObj))
      }
    })

    // 如果没有子集 直接退出
    if (arr.length === 0) {
      return []
    }

    // 对子集进行排序
    arr.sort(function (val1, val2) {
      if (val1.sort < val2.sort) {
        return -1
      } else if (val1.sort > val2.sort) {
        return 1
      }
      return 0
    })
    return arr
  }
  // redis  初始化所有菜单
  async initMenuList() {
    const { ctx,service } = this

    let res = []
    const searchQuery = {
      where:{
        del_flag:0,
        state:1
      }
    }
 
    res = await this.ctx.model.Sys.Menu.findAll(searchQuery)
    const menuArr = {}
    res.forEach((_menu)=>{
      menuArr[_menu.permisson]=_menu.id
    })
    let redisSaveResult = await service.sys.auth.saveAllMenuList(menuArr)
    return redisSaveResult
  }  

}

module.exports = MenuService
