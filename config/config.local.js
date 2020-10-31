/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/

  // sequelize-auto -o "./mysqltest" -d dbname -h host -u root -p 3306 -x "yourpwd" -t sys_user
  
  const config = exports = {}
  config.redis = {
    clients: {
      auth:{
        port: 6379,
        host: 'yourhost',
        password: 'yourpwd',
        db: 3,
      },
      admin:{
        port: 6379,
        host: 'yourhost',
        password: 'yourpwd',
        db: 1,
      }
    },
  },
  config.sequelize = {
    dialect: 'mysql',
    host: 'yourhost',
    port: 3306,
    username: 'root',
    // 密码
    password: 'yourpwd',
    database: 'dbname',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps:false
    },
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    }
  }
  // sequelize-auto -o "./mysqltest" -d dbname -h host -u root -p 3306 -x "yourpwd" -t sys_user


  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      admin: {
        // host
        host: 'yourhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'yourpwd',
        // 数据库名
        database: 'dbname',
      },
      // ...
    },
    // 所有数据库配置的默认值
    default: {
      timezone: '08:00',
      charset: 'utf8mb4',
    },
  
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }
  config.salt = 'diaoyou' // your salt

  return config
}
