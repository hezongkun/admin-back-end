module.exports = (action) => {
  return async function (ctx, next) {
    const noAccess = () => {
      ctx.body = {
        code: '403',
        msg: '权限不足',
      }
      ctx.status = 403
    }
    let isAdmin = ctx.locals.isAdmin
    if (isAdmin) {
      await next()
    } else {
      let menuID = await ctx.service.sys.auth.getAuthMenuByPermisson(action)
      let hasRole = await ctx.service.sys.auth.checkRole(
        ctx.locals.roleId,
        menuID
      )

      if (hasRole) {
        await next()
      } else {
        noAccess()
      }
    }
  }
}
