var express = require('express')
var app = express()
const Mock = require('mockjs')
// 本地json-server服务器搭建代码
// 引入数据库文件
var appData = require('./test/pic.json')
// 引入数据库
var getBoardList = Mock.mock(appData.getBoardList)
var apiRoutes = express.Router()
// 使用api的方法来创建连接时候的请求
apiRoutes.get('/pic', function (req, res) {
  res.json({
    status_code: 200 ,
    message: getBoardList
  });
})

// 调用api
app.use('/api', apiRoutes)