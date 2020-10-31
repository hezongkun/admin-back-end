/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  }
  config.logger = {
    // level: 'ERROR',
    // consoleLevel: 'ERROR',
    // allowDebugAtProd: true, //生产环境默认禁止打印 DEBUG 级别的日志
  }
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
    ignore: [ '/swagger*','/favicon*','/auth/login', '/register','/verifyCode','/auth/logout' ], // 哪些请求不需要认证
  }

  // egg-swagger-doc 配置信息。
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'egg-swagger', // 接口文档的标题。
      description: 'swagger-ui for egg', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: [ 'http' ], // 配置支持的协议。
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: {
      // 配置接口安全授权方式。
      Authorization: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    enableSecurity: true, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: false, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  }
 
  return config
}
