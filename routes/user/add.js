/*
 * url: /user/add
 * 新增用户
 */
 const DB   = require(SYS_CONF.path + '/model/db_user');
 const Logs   = require(SYS_CONF.path + '/model/db_logs');
 const SQL  = require(SYS_CONF.path + '/lib/sql');
 const Func = require(SYS_CONF.path + '/lib/func');
 const Plus = require(SYS_CONF.path + '/lib/plus');

 //新增
 async function add(d){
       let ret = Plus.ret();
       let role_id = null;
       if(!d){
         ret.msg = '参数提交错误!';
       } else if(!d.user_name){
         ret.msg = '请输入登陆名!';
       } else if(!d.password){
         ret.msg = '请输入密码!';
       } else if(!d.role_id){
         ret.msg = '请输选择用户角色!';
       } else {
          role_id = d.role_id.toString().replace(/[^0-9]/g, '');
          if(!role_id){
            ret.msg = '角色选择错误!';
          } else {
            ret.status = 1;
          }
       }

       if(!ret.status) return ret;

       ret.status = 0;

       let data = {
         "role_id":role_id,
         "user_name":d.user_name,
         "password":d.password,
         "real_name":d.real_name ? d.real_name : '',
         "avatar":d.avatar ? d.avatar : '',
         "telephone":d.telephone ? d.telephone : '',
         "note": d.note ? d.note : '',
         "status":d.status
       };


       let dats = await DB.add(data);

       //console.log(dats);

       if(dats){
         ret.status = 1;
         ret.msg = 'success';
       } else{
         ret.msg = '新增用户出错!';
       }

       return ret;
};

module.exports = async (ctx, next) => {
     let d = await Plus.query(ctx);
     let ret = await add(d);
     Logs.save({action:"新增用户",val:JSON.stringify(d) + ' ==> ' + JSON.stringify(ret)}, ctx);
     //console.log(d);
     ctx.body = ret;
 };
