let http = require('http')
let url = require('url')
let fs = require('fs')
let qs = require('querystring')

let server = http.createServer()

server.listen(3000, '0.0.0.0', function () {
  console.log('listening')
})

// server.on('error', function () {
//   console.log('err')
// })

// 监听 request事件，对客户端请求作出响应
// server.on('request', function (req, res) {
//   res.writeHead(200, 'OK', {
//     // 'content-type':'text/plain;charset=utf-8' //纯文本
//     'content-type': 'text/html;charset=utf-8',
//   })
//   res.write('<h1>你好，欢迎学习node</h1>')
//   res.end()
// })


// 使用url模块对req对象中的url进行处理，对于不同请求，返回不同的数据
// server.on('request', function (req, res) {
//   var urlObj = url.parse(req.url)
//   switch (urlObj.pathname) {
//     case '/':
//       //首页
//       res.writeHead(200, {
//         'content-type': 'text/html;charset=utf-8',
//       })
//       res.end('<h1>这是首页</h1>')
//       break
//     case '/user':
//       //个人中心
//       res.writeHead(200, {
//         'content-type': 'text/html;charset=utf-8',
//       })
//       res.end('<h1>这是个人中心</h1>')
//       break
//     default:
//      //处理其他情况
//       res.writeHead(404, {
//         'content-type': 'text/html;charset=utf-8',
//       })
//       res.end('<h1>页面不见了</h1>')
//       break
//   } 
// })


// 处理请求数据，使用fs模块实现node和html代码分离

var HtmlDir = `${__dirname}/html`

server.on('request', function (req, res) {
  var urlObj = url.parse(req.url)

  switch (urlObj.pathname) {
    case '/':
      // 首页
      sendData(HtmlDir + '/index.html', req, res)
      break
    case '/user':
      // 个人中心
      sendData(HtmlDir + '/user.html', req, res)
      break
    case '/login':
      // 登录页面
      sendData(HtmlDir + '/login.html', req, res)
      break
    case '/login/check': // 登录验证

      // get请求
      if (req.method.toUpperCase() == 'GET') {
        console.log('get', qs.parse(urlObj.query) )
        res.writeHead(302, {'Location': '/'})
        res.end()
      }
        
      // post请求 nodejs用req.on(data)接收客户端的post请求数据
      if (req.method.toUpperCase() == 'POST') {
        var str = ''

        req.on('data', function (chunk) {
          str += chunk // 用 + 进行字符串拼接时，会自动对chunk进行字符串转换，等同于 chunk.toString()
        })
        req.on('end', function () {
          console.log('post', qs.parse(str))
        })
        res.writeHead(302, {'Location': '/'})
        res.end()
      }
      break
    default:
      //处理其他情况
      break
  }
})

function sendData(file, req, res) {
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, {
        'content-type': 'text/html;charset=utf-8',
      })
      res.end('<h1>页面不见了......</h1>')
    } else {
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8',
      })
      res.end(data)
    }
  })
}