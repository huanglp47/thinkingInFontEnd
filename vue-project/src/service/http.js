import { mixcAlert, mixcLoading, mixcCloseLoading } from '../assets/js/utils';
import HTTP from './axiosConfig'
import router from '../router'
import {ROUTER_BASE} from '../config/apiEnv'

function myAlert(text) {
  mixcAlert( text , '出错啦！', {
    confirmButtonText: '确定',
  });
}

/**
 *  @param {String} url  request api url
 *  @param {Object} obj  request params
 *  @param {Function} successFn  respone success callback function
 *  @param {Boolean} needLoading  whether need mask when fetch data,prevent repeated clicks
 *  @param {Function} failFn  respone fali callback function
 */
export const getAjax = function(url, obj, successFn, needLoading, failFn){
    needLoading && mixcLoading('加载中...');
    HTTP.get(url, {params:obj}).then(res=>{
    // HTTP.get(url, JSON.stringify(obj)).then(res=>{
        needLoading && mixcCloseLoading();
        if(res.data.code=='0'){
            typeof successFn ==='function' && successFn(res.data);
        }else if(res.data.code=='401') {
            //登录
            router.push({
                path: '/login'
            })
        }else{
            if(failFn){
                typeof failFn ==='function' && failFn(res.data);
            }else{
                myAlert(res.data.message)
            }
        }
    }).catch( (err)=>{
        needLoading && mixcCloseLoading();
        myAlert('数据请求错误！')
  })
}

/**
 *  @param {String} url  request api url
 *  @param {Object} obj  request params
 *  @param {Function} successFn  respone success callback function
 *  @param {Boolean} needLoading  whether need mask when fetch data,prevent repeated clicks
 *  @param {Function} failFn  respone fali callback function
 */
export const postAjax = function(url, obj, successFn, needLoading, failFn){
    needLoading && mixcLoading('加载中...');
    HTTP.post(url, JSON.stringify(obj) ).then(res=>{
        needLoading && mixcCloseLoading();
        if(res.data.code=='0'){
            typeof successFn ==='function' && successFn(res.data);
        }else if(res.data.code=='401') {
            router.push({
                path: '/login'
            })
        }else{
            if(failFn){
                typeof failFn ==='function' && failFn(res.data);
            }else{
                myAlert(res.data.message)
            }
        }
    }).catch( (err)=>{
        needLoading && mixcCloseLoading();
        myAlert('数据请求错误！')
    })
}
