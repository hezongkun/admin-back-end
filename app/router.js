'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  const can = app.middleware.auth

  // router.get('/', controller.home.index)
  app.router.redirect('/swagger', '/swagger-ui.html', 302)

  // auth
  router.get('/auth/info',controller.sys.user.info)
  router.post('/auth/login', controller.sys.user.login)
  router.post('/auth/logout', controller.sys.user.logout)

  // sys_user   系统用户
  // router.resources('sys/user', '/sys/user', controller.sys.user);

  router.get('/sys/user/list',can('sys.user.view'),controller.sys.user.list)
  router.get('/sys/user/find', can('sys.user.view'),controller.sys.user.find)
  router.post('/sys/user/save', can('sys.user.add'),controller.sys.user.create)
  router.post('/sys/user/update', can('sys.user.update'),controller.sys.user.update)
  router.post('/sys/user/updateState', can('sys.user.update'),controller.sys.user.updateState)
  router.post('/sys/user/updatePassword', can('sys.user.update'),controller.sys.user.updatePassword)
  router.delete('/sys/user/delete', can('sys.user.delete'),controller.sys.user.delete)

  // sys_role

  router.get('/sys/role/list', can('sys.role.view'), controller.sys.role.list)
  router.get('/sys/role/selectList',  can('sys.role.view'),controller.sys.role.selectList)
  router.get('/sys/role/find', can('sys.role.view'), controller.sys.role.find)
  router.post('/sys/role/save',  can('sys.role.add'),controller.sys.role.create)
  router.post('/sys/role/update',  can('sys.role.update'),controller.sys.role.update)
  router.post('/sys/role/updateState', can('sys.role.update'), controller.sys.role.updateState)
  router.delete('/sys/role/delete', can('sys.role.delete'), controller.sys.role.delete)

  // sys_menu

  router.get('/sys/menu/list', can('sys.menu.view'), controller.sys.menu.list)
  router.get('/sys/menu/originalList',can('sys.menu.view'), controller.sys.menu.originalList)
  router.get('/sys/menu/selectList',can('sys.menu.view'), controller.sys.menu.selectList)
  router.get('/sys/menu/find',can('sys.menu.view'), controller.sys.menu.find)
  router.post('/sys/menu/save',can('sys.menu.add'), controller.sys.menu.create)
  router.post('/sys/menu/update', can('sys.menu.update'),controller.sys.menu.update)
  router.post('/sys/menu/updateState',can('sys.menu.update'), controller.sys.menu.updateState)
  router.delete('/sys/menu/delete', can('sys.menu.delete'),controller.sys.menu.delete)

  // sys_role_menu
  router.post('/sys/rolemenu/save', can('sys.role.save'),controller.sys.roleMenu.save)
  router.get('/sys/rolemenu/find',can('sys.role.view'), controller.sys.roleMenu.find)

  // router.get('/sys/user', controller.sys.user.index)
  // router.get('/sys/user/:id', controller.sys.user.show)
  // router.post('/sys/user', controller.sys.user.create)
  // router.post('/sys/user/:id', controller.sys.user.update)
  // router.delete('/sys/user/:id', controller.sys.user.destroy)

  
}
