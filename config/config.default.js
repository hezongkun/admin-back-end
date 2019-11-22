/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}
  config.validate = {   // 配置参数校验器，基于parameter
    convert: true,    // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  }
  config.security = {
    csrf: {
      enable: false,
    },
  },
  config.redis = {
    clients: {
      auth:{
        port: 6379,
        host: '',
        password: '',
        db: 3,
      },
      admin:{
        port: 6379,
        host: '',
        password: '',
        db: 1,
      }
    },
  },
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571996837852_6952'
  config.jwtSecret = 'WE78poir87UrvVEkfh3FUBBmpFyWHtHK'
  config.salt = '123'
  config.jwtExpires = 60 * 60 * 24  // 秒 
  // add your middleware config here
  config.middleware = [ 'errorHandler','jwt' ]
  config.jwt = {
    enable: true,
    ignore: [ '/auth/login', '/register','/verifyCode','/auth/logout' ], // 哪些请求不需要认证
  }
  return config
}
