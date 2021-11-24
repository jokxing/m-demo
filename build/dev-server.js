require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser');
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

const Mock = require('mockjs')
// 拦截所有请求
// extended:false 方法内部使用querystring模块处理请求参数的格式
// extended：true 方法内部使用第三方模块qs模块请求参数的格式
app.use(bodyParser.urlencoded({extend:false}))
// 解析提交的json参数
let jsonParser = bodyParser.json()
// 本地json-server服务器搭建代码
// 引入数据库文件
var pic = require('../mock/test/pic.json')
var init = require('../mock/test/init.json')
var announcement = require('../mock/test/announcement.json')
var announcementGetstat = require('../mock/test/announcementGetstat.json')
var announcementList = require('../mock/test/announcementList.json')
var authorizations = require('../mock/test/authorizations.json')
var forgotPassword = require('../mock/test/forgot_password.json')
var user = require('../mock/test/user.json')
var listen = require('../mock/test/listen.json')
var ActGiftDetail = require('../mock/test/ActGiftDetail.json')
var ActGiftDetailChessRank = require('../mock/test/ActGiftDetailChessRank.json')
var ActGiftDetailDptGift = require('../mock/test/ActGiftDetailDptGift.json')
var ActGiftDetailUsdtRefund = require('../mock/test/ActGiftDetailUsdtRefund.json')
var ActGiftDetailSignBonus = require('../mock/test/ActGiftDetailSignBonus.json')
var KingMealInfo = require('../mock/test/KingMealInfo.json')
var depositInit = require('../mock/test/depositInit.json')
var account = require('../mock/test/account.json')
var withdrawInit = require('../mock/test/withdrawInit.json')
var walletsLinkDptInit = require('../mock/test/walletsLinkDptInit.json')
var getWallets = require('../mock/test/getWallets.json')
var uservipinfo = require('../mock/test/uservipinfo.json')
var tradeRec = require('../mock/test/tradeRec.json')
var message = require('../mock/test/message.json')

// 引入数据库
var getPic = Mock.mock(pic)
var getInit = Mock.mock(init)
var getAnnouncement = Mock.mock(announcement)
var getAnnouncementGetstat = Mock.mock(announcementGetstat)
var getAnnouncementList = Mock.mock(announcementList)
var getAuthorizations = Mock.mock(authorizations)
var getForgotPassword = Mock.mock(forgotPassword)
var getUser = Mock.mock(user)
var getListen = Mock.mock(listen)
var getActGiftDetail = Mock.mock(ActGiftDetail)
var getActGiftDetailChessRank = Mock.mock(ActGiftDetailChessRank)
var getActGiftDetailDptGift = Mock.mock(ActGiftDetailDptGift)
var getActGiftDetailUsdtRefund = Mock.mock(ActGiftDetailUsdtRefund)
var getActGiftDetailSignBonus = Mock.mock(ActGiftDetailSignBonus)
var getKingMealInfo = Mock.mock(KingMealInfo)
var getDepositInit = Mock.mock(depositInit)
var getAccount = Mock.mock(account)
var getWithdrawInit = Mock.mock(withdrawInit)
var getWalletsLinkDptInitt = Mock.mock(walletsLinkDptInit)
var getGetWallets = Mock.mock(getWallets)
var getUservipinfo = Mock.mock(uservipinfo)
var getTradeRec = Mock.mock(tradeRec)
var getMessagec = Mock.mock(message)

var apiRoutes = express.Router()
// 使用api的方法来创建连接时候的请求
apiRoutes.get('/pic', function (req, res) {
  res.json(getPic);
})
apiRoutes.get('/init', function (req, res) {
  res.json(getInit);
})
apiRoutes.get('/announcement', function (req, res) {
  if(req.query.type == "跑马灯1"){
    res.json(getAnnouncement);
  }else if(req.query.type == 'getstat'){
    res.json(getAnnouncementGetstat)
  }else{
    res.json(getAnnouncementList)
  }
})
apiRoutes.post('/authorizations', jsonParser, function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if(username == "1111113" && password == '123456789'){
    res.json(getAuthorizations.success);
  }else{
    res.status(412).send(getAuthorizations.error);
  }
})
apiRoutes.post('/forgot_password', function (req, res) {
  res.json(getForgotPassword);
})
apiRoutes.get('/user', function (req, res) {
  res.json(getUser);
})
apiRoutes.get('/listen', function (req, res) {
  res.json(getListen);
})
apiRoutes.get('/ActGiftDetail', function (req, res) {
  if(req.query.type == "ChessRank"){
    res.json(getActGiftDetailChessRank);
  }else if(req.query.type == "DptGift"){
    res.json(getActGiftDetailDptGift)
  }else if (req.query.type == 'UsdtRefund') {
    res.json(getActGiftDetailUsdtRefund)
  }else if(req.query.type == 'SignBonus'){
    res.json(getActGiftDetailSignBonus)
  }else{
    res.json(getActGiftDetail);
  }
})
apiRoutes.get('/KingMealInfo', function (req, res) {
  res.json(getKingMealInfo);
})
apiRoutes.post('/depositInit', function (req, res) {
  res.json(getDepositInit);
})
apiRoutes.post('/account', function (req, res) {
  res.json(getAccount);
})
apiRoutes.get('/withdrawInit', function (req, res) {
  res.json(getWithdrawInit);
})
apiRoutes.post('/walletsLinkDptInit', function (req, res) {
  res.json(getWalletsLinkDptInitt);
})
apiRoutes.post('/getWallets', function (req, res) {
  res.json(getGetWallets);
})
apiRoutes.get('/uservipinfo', function (req, res) {
  res.json(getUservipinfo);
})
apiRoutes.post('/tradeRec', function (req, res) {
  res.json(getTradeRec);
})
apiRoutes.get('/message', function (req, res) {
  res.json(getMessagec);
})
// 调用api
app.use('/api', apiRoutes)




var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// serve vonic static assets
var vonicPath = path.posix.join(config.dev.assetsPublicPath, 'vonic')
app.use(vonicPath, express.static('./node_modules/vonic/dist'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
})
