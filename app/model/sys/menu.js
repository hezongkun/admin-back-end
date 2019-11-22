module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  return app.model.define('sys_menu', {
    id: {
      type: INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING(32),
      allowNull: false
    },
    path: {
      type: STRING(255),
      allowNull: true
    },
    permisson: {
      type: STRING(255),
      allowNull: false
    },
    state: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    icon: {
      type: STRING(255),
      allowNull: true
    },
    type: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    sort: {
      type: INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    hidden: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    url: {
      type: STRING(255),
      allowNull: true
    },
    parent_id: {
      type: INTEGER(6),
      allowNull: true,
      defaultValue: '1'
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
    updated_at: {
      type: DATE,
      allowNull: true,
      defaultValue: app.Sequelize.fn('current_timestamp')
    },
    created_at: {
      type: DATE,
      allowNull: true,
      defaultValue: app.Sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'sys_menu'
  })
}
