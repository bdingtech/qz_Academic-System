import { Toast } from 'vant';
import { resInterceptors, reqInterceptors, resErrInterceptors} from './interceptors';
import axios from 'axios';
const service = axios.create({
    timeout: 50000,
    withCredentials:true
});
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
service.interceptors.request.use(
    config => {
        Toast.loading({
            message: '加载中...',
            forbidClick: true, 
            duration: 3000
        });
        if(!config.url.includes('getXgtToken')){
            config.headers.token = sessionStorage.getItem('Token')
        }
        if(sessionStorage.getItem('ifSelect') == 1 && process.env.NODE_ENV === 'production'){
            config.baseURL = sessionStorage.getItem('SelectUrl')
        }
        return reqInterceptors(config) ;
    },
    error => {
        Toast.loading({
            message: '请求出错',
            forbidClick: true, 
            duration: 2500
        });
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            Toast.clear()
            if(response.data.code === '0'){
                setTimeout(() => {
                    Toast({
                        message: response.data.Msg || response.data.msg,
                        forbidClick: true, 
                        duration: 1500
                    });
                },500)
                if(response.data.Msg.includes('未授权访问')){
                    
                }
            }
            return resInterceptors(response)
        }else {
            return Promise.reject(resErrInterceptors(error))
        }
    },
    error => {
        Toast.loading({
            message: '服务器错误',
            forbidClick: true, 
            duration: 3000
        });
        // console.log(error);
        return Promise.reject();
    }
);

export default service;



// WEBPACK FOOTER //
// ./src/utils/request.js