module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const User = app.model.define('sys_user', {
    id: {
      type: INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING(255),
      allowNull: false
    },
    phone: {
      type: STRING(11),
      allowNull: true,
      unique: true
    },
    nickname: {
      type: STRING(32),
      allowNull: true
    },
    headpic: {
      type: STRING(255),
      allowNull: true
    },
    role_id: {
      type: INTEGER(3),
      allowNull: true,
      references: {
        model: 'sys_role',
        key: 'id'
      }
    },
    state: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    last_login_time: {
      type: DATE,
      allowNull: true
    },
    last_logout_time: {
      type: DATE,
      allowNull: true
    },
    del_flag: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    delete_time: {
      type: DATE,
      allowNull: true
    },
    created_at: {
      type: DATE,
      allowNull: true,
      defaultValue: app.Sequelize.fn('current_timestamp')
    },
    updated_at: {
      type: DATE,
      allowNull: true,
      defaultValue: app.Sequelize.fn('current_timestamp')
    }
  }, 
  {
    tableName: 'sys_user',
    defaultScope: {
      attributes: {
        // 排除密码，不返回密码
        exclude: ['password']
      }
    }
  })

  User.associate = function() {
    app.model.Sys.User.belongsTo(app.model.Sys.Role, { foreignKey: 'role_id', targetKey: 'id', as: 'roleInfo' })
    // app.model.Sys.User.hasOne(app.model.Sys.Role, { foreignKey: 'id', targetKey: 'user_role_id' })
    // app.model.Sys.Role.hasOne(User, {foreignKey: 'role_name', sourceKey: 'role_name'})
  }

  return User
}
