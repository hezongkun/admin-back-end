module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const Role =  app.model.define('sys_role', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: STRING(32),
      allowNull: false
    },
    state: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '0'
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
    is_admin: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '0'
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
  }, {
    tableName: 'sys_role'
  })

  // Role.associate = function() {
  //   app.model.Sys.Role.belongsTo(app.model.Sys.User, { foreignKey: 'id', targetKey: 'role_id' })
  // }
  return Role
}
