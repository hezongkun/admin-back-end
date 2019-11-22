const jwt = require('jsonwebtoken')

module.exports = (options, app) => {
  
  return async function (ctx, next) {
    const needLogin = () => {
      ctx.body = {
        code: '401',
        msg: '登录状态已过期',
      }
      ctx.status = 401
    }
    let authToken = ctx.header.authorization // 获取header里的authorization
    if (authToken) {
      authToken = authToken.substring(7)
      const res = verifyToken(ctx,authToken) // 解密获取的Token
      if (res.id) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        const redis_token = await app.redis.get('auth').get('TOKEN:' + res.id+':'+res.dt) // 获取保存的token
        if (authToken === redis_token) {
          ctx.locals.isAdmin = res.isAdmin
          ctx.locals.roleId = res.rid
          ctx.locals.userId = res.id
          ctx.locals.username = res.name
          await next()
        } else {
          needLogin()
        }
      } else {
        needLogin()
      }
    } else {
      needLogin()
    }
  }

}

// 解密，验证
function verifyToken(ctx,token) {
  let res = ''
  try {
    const result = jwt.verify(token, ctx.app.config.jwtSecret) || {}
    const { exp } = result,
      current = Math.floor(Date.now() / 1000)
    if (current <= exp) res = result.data || {}
  } catch (e) {
    console.log(e)
  }
  return res
}
