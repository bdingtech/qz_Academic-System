import service from './request'
import {baseURL} from './baseUrl.js'
const parseFormDataParams = (data) => {
  const formData = new FormData()
  for (const name in data) {
    if (data.hasOwnProperty(name)) {
      if (data[name]) {
        formData.append(name, data[name])
      }
    }
  }
  return formData
}
export const aApi = {
  dotNetCasLogin : (query) => {
    return service({
      url: 'api/xgh5.ashx?method=getXgtToken',
      headers:query,
      method: 'post',
      baseURL,
      params: query
    })
  },
  AKSCasLogin : (query) => {
    return service({
      url: 'getXgtToken',
      headers:query,
      method: 'post',
      baseURL,
      params: query
    })
  },
}


// WEBPACK FOOTER //
// ./src/utils/auth.js