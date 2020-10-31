/*
 * @Description:
 * @Author: hezongkun@qq.com
 * @Date: 2019-11-29 17:20:43
 * @LastEditors: hezongkun@qq.com
 * @LastEditTime: 2020-10-13 11:35:36
 */
'use strict'

module.exports = {
  CreateAdminDto: {
    Name: { type: 'string', required: true }, // 账号
    Password: { type: 'string', required: true, min: 6, max: 16 }, // 密码
    PasswordConfirm: { type: 'string', required: true, min: 6, max: 16 }, // 密码确认
  },
  EditAdminDto: {
    Id: { type: 'integer', required: true }, // ID
    Name: { type: 'string', required: true }, // 账号
    Password: { type: 'string', required: false, min: 6, max: 16 }, // 密码
    PasswordConfirm: { type: 'string', required: false, min: 6, max: 16 }, // 密码确认
  },
  DeleteAdminDto: {
    Id: { type: 'integer', required: true }, // ID
  },
}
