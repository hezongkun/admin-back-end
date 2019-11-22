module.exports = action => {
  
  return async function (ctx, next) {
    const noAccess = () => {
      ctx.body = {
        code: '403',
        msg: '权限不足',
      }
      ctx.status = 403
    }
    try {
      let menuID = await ctx.service.sys.auth.getAuthMenuByPermisson(action)
      let hasRole = await ctx.service.sys.auth.checkRole(ctx.locals.roleId,menuID)

      let isAdmin = ctx.locals.isAdmin

      if(isAdmin || hasRole){
        await next()
      }
      else{
        noAccess()
      }
    } catch (err) {
      noAccess()
    }
  }
}
