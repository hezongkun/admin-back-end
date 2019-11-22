module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const RoleMenu = app.model.define('sys_role_menu', {
    id: {
      type: INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: INTEGER(6),
      allowNull: false,
      references: {
        model: 'sys_role',
        key: 'id'
      }
    },
    menu_id: {
      type: INTEGER(6),
      allowNull: false,
      references: {
        model: 'sys_menu',
        key: 'id'
      }
    },
    created_at: {
      type: DATE,
      allowNull: true,
      defaultValue: app.Sequelize.fn('current_timestamp')
    },
    updated_at: {
      type: DATE,
      allowNull: true
    }
  }, {
    tableName: 'sys_role_menu'
  })
  RoleMenu.associate = function() {
    app.model.Sys.RoleMenu.belongsTo(app.model.Sys.Menu, { foreignKey: 'menu_id', targetKey: 'id', as: 'menuInfo' })
    app.model.Sys.RoleMenu.belongsTo(app.model.Sys.Role, { foreignKey: 'role_id', targetKey: 'id', as: 'roleInfo' })
  }
  return RoleMenu
}
