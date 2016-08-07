# 视频后台管理系统
一个简易的后台管理系统，核心功能已实现。包括对视频的增删改查、视频播放、登陆注册等功能

# 如何使用
1. npm install 安装依赖包
2. <code>npm run dev</code> 在开发环境中运行 端口是7777
   <code>npm run dist</code> 在生产环境中运行 端口是8888

# 整天架构技术说明
服务端技术 ： Node.js + Express + Mongodb

前端技术 ： Bootstrap

# 涉及的技术点
1. MVC三层开发 m--models v--views c--controllers
2. gulp 自动化开发
3. crosss-env 这个包可以兼容各种开发平台的命令行
4. body-parser 用来获取post请求的请求体
5. express 路由设置
6. mongoose 操纵mongodb数据库
7. expres 设置模板渲染引擎
8. expressSession 记录用户的登录情况
9. ueditor 富文本编辑器的第三方包使用
10. fluent-ffmepg 使用它来进行视频格式转换
11. formidable 使用formidable获取post发送过来的多媒体数据
12. crypto 使用crypto加密API对密码进行MD5加密
13. express.static() 配置静态资源，使网站自动寻找对应的静态资源



