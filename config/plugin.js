'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
 
  bcrypt : {
    enable: true,
    package: 'egg-bcrypt'
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  }
}
