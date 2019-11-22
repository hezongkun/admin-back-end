const Service = require('egg').Service
const crypto = require('crypto')

class UserService extends Service {
  constructor(ctx) {
    super(ctx)
    this.Op = this.app.Sequelize.Op
  }
 
  cryptPwd(password) {
    // 密码“加盐”
    var saltPassword = password + ':' + this.config.salt
    console.log('原始密码：%s', password)
    console.log('加盐后的密码：%s', saltPassword)
 
    // 加盐密码的md5值
    const md5 = crypto.createHash('md5')

    let result = md5.update(saltPassword).digest('hex')
    console.log('加盐密码的md5值：%s', result)
    return result
  }
  async login(payload) {
    const { ctx, service } = this
    const user = await service.sys.user.findWithPassword(payload.username)
    if (!user) {
      ctx.throw(405, '用户名或密码错误')
    }
    payload.password = this.cryptPwd(payload.password)
    console.log(payload.password)
    console.log(user.password)

    if(user.password !== payload.password){
      ctx.throw(406, '用户名或密码错误') 
    }
    if(user.state !== 1){
      ctx.throw(407, '用户已被禁用，请联系管理员') 
    }
    let timeStamp = Date.now()
    const token = ctx.helper.loginToken({isAdmin:user.is_admin, dt:timeStamp, rid: user.role_id, id: user.id, name:user.username }, this.config.jwtExpires)
    await ctx.app.redis.get('auth').set('TOKEN:' + user.id +':'+timeStamp, token, 'ex', this.config.jwtExpires) // 保存到redis

    return token
  }

  async create(payload) {
    const { ctx, service } = this
    const role = await service.sys.role.find(payload.role_id)
    if (!role) {
      ctx.throw(404, 'role is not found')
    }
    payload.password = await ctx.genHash(payload.password)
      
    const uniqueResult = await service.sys.user.checkUnique(payload.phone,payload.username)
  
    const result = await ctx.model.Sys.User.create(payload)
      
    return result
  }

  async delete(_id) {
    const { ctx, service } = this
    const user = await service.sys.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    if (user.username === 'admin') {
      ctx.throw(404, 'can\'t delete super admin')
    }
    const query = {
      'where':{id:_id}
    } 
    const deletePayload = {
      del_flag: 1,
      delete_time: ctx.helper.formatTime(),
      updated_at: ctx.helper.formatTime()
    }
 
    return ctx.model.Sys.User.update(deletePayload,query)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const user = await service.sys.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    const { username, phone, nickname, headpic, role_id } = payload
    const updatePayload = {
      username:username,
      phone:phone,
      nickname:nickname,
      headpic:headpic,
      role_id:role_id,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      'where':{id:_id}
    } 
    return ctx.model.Sys.User.update(updatePayload,query)
  }

  async updateState(_id, payload) {
    const { ctx, service } = this
    const user = await service.sys.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    const { state } = payload
    const updatePayload = {
      state:state,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      'where':{id:_id}
    } 
    return await ctx.model.Sys.User.update(updatePayload,query)
  }

  async updatePassword(_id, payload) {
    const { ctx, service } = this
    const user = await service.sys.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    const { password } = payload
    payload.password = await this.ctx.genHash(payload.password)

    const updatePayload = {
      password:password,
      updated_at: ctx.helper.formatTime()
    }
    const query = {
      'where':{id:_id}
    } 
    return ctx.model.Sys.User.update(updatePayload,query)
  }

  async find(_id) {
    const user = await this.ctx.model.Sys.User.findByPk(_id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
  }

  async findWithPassword(username) {
    const query = {
      where: {username: username,del_flag:0},
      attributes: {
        include:['id','password','role_id','username','phone','state','headpic','last_login_time','roleInfo.is_admin']
      },
      include: [{
        model: this.ctx.model.Sys.Role,
        as:'roleInfo',
        attributes:[]
      }],
      raw:true
    }
    const user = await this.ctx.model.Sys.User.findOne(query)
    if (!user) {
      this.ctx.throw(405, '用户名或密码错误')
    }
    return user
  }

  async checkUnique(phone,username) {
    const query = {
      where:{
        [this.Op.or]:[
          {
            phone:phone,
          },
          {
            username:username
          }
        ],
      }
    }
    const user = await this.ctx.model.Sys.User.findOne(query)
    if (user) {
      this.ctx.throw(500, '用户名/手机已存在')
    }
    return user
  }

  async list(payload) {
    const { pageNo, pageSize, nickname,state, orderBy, sort } = payload
    let res = []
    let count = 0
    let offset = ((Number(pageNo || 1)) - 1) * Number(pageSize || 10)

    const searchQuery = {
      where:{
        [this.Op.or]:[
          {
            nickname:{
              [this.Op.like]:`%${nickname || ''}%`
            },
          },
          {
            username:{
              [this.Op.like]:`%${nickname || ''}%`
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
      limit: Number(pageSize || 10), 
      offset: offset,
      order:[[orderBy || 'id', sort || 'asc']],
    }
    const include = {
      attributes: {
        include:['roleInfo.role_name']
      },
      include: [{
        model: this.ctx.model.Sys.Role,
        as:'roleInfo',
        attributes:[]
      }],
      raw:true
    }
   
    return await this.ctx.model.Sys.User.findAndCountAll(Object.assign(query,searchQuery,include))
  }  
}

module.exports = UserService
