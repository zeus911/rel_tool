/*
 * 数据库配置
 */
const Router = require('koa-router');
const R      = new Router();
const Plus   = require(SYS_CONF.path + '/lib/plus');
const Search = require('./search');

const Obj = {
    "/":           Search,
    "/search":   Search,
    "/add":        require('./add'),
    "/update":     require('./update'),
    "/del":        require('./del')
};

//输出接口路由, 同时支持 GET,POST
Plus.R(R, Obj);
module.exports = R;
