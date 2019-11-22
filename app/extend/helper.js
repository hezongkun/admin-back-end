const moment = require('moment')
const jwt = require('jsonwebtoken')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  }
  ctx.status = 200
}
exports.loginToken = function(data, expires = 7200) {
  const exp = Math.floor(Date.now() / 1000) + expires
  const token = jwt.sign({ data, exp }, this.config.jwtSecret)
  return token
}
exports.validateRule = {
  username: { type: 'string',max:16,min:4,trim:true, required: true, allowEmpty: false },
  password: { type: 'password', max:16,min:6,trim:true,required: true, allowEmpty: false },
  repassword: { type: 'password', max:16,min:6,trim:true,required: false, allowEmpty: false },
  phone: { type: 'string', required: true, allowEmpty: false,format: /^1[3456789]\d{9}$/ },
  nickname: { type: 'string', required: true,max:32, allowEmpty: false },
  state: { type: 'int', required: true, allowEmpty: false },
  role_id: { type: 'int', required: true, allowEmpty: false },
  id: { type: 'id', required: true, allowEmpty: false },

  pageNo: { type: 'int',min:0, required: true, allowEmpty: false },
  pageSize: { type: 'int',min:1,max:100, required: true, allowEmpty: false },
  orderBy: { type: 'string', required: false, allowEmpty: true },
  sort: { type: 'enum', required: false, values: ['asc','desc'],allowEmpty: true },
  search_nickname: { type: 'string', required: false,max:32, allowEmpty: true },
  search_state: { type: 'int', required: false, allowEmpty: true },

}
