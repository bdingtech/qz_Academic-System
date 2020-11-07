import { Toast } from 'vant';

let requeryToast = {}

// // 请求拦截
export function reqInterceptors(config) {
  requeryToast = Toast.loading({
      message: '加载中...',
      forbidClick: true, 
      duration: 0
  });

  // if (AuthInfo && AuthInfo.access_token) {
  //   config.headers['Authorization'] = 'bearer ' + AuthInfo.access_token
  // }

  // if (config.url.includes('authentication/form') || config.url.includes('authentication/refresh')) { 
  //   config.headers['Authorization'] = 'Basic bGV2aWFfY2xpZW50OmxldmlhX3NlY3JldA=='
  // }

  return config
}

/*
* HTTP响应拦截
* */
export function resInterceptors(response) { 
  requeryToast.clear()  
  return response.data
}


/*
* HTTP响应拦截  error
* */
export function resErrInterceptors(error) {
  requeryToast.clear()  
  console.log(error);
  
  if(error.response.status == 502){
    Toast.fail('请求失败')
    setTimeout(() => {
      window.location.href='../../index.html#/homeIndex'
    }, 1000);
  }
return error;
}




// WEBPACK FOOTER //
// ./src/utils/interceptors.js