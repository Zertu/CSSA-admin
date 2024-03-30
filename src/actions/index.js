import axios from 'axios'

const baseURL = 'http://localhost:4000/'

export async function get(url, params = null) {
  return sendRequest('GET', url, null, params)
}

export async function post(url, data, params = null) {
  return sendRequest('POST', url, data, params)
}

export async function put(url, data, params = null) {
  return sendRequest('PUT', url, data, params)
}

export async function deleteReq(url, params = null) {
  return sendRequest('DELETE', url, null, params)
}

async function sendRequest(method, url, data = null, params = null) {
  try {
    console.log(baseURL + url)
    const response = await axios({
      method: method,
      url: baseURL + url,
      params: params,
      data: data,
    })

    return response.data
  } catch (error) {
    if (error.response) {
      console.log('错误响应：', error.response.data)
    } else if (error.request) {
      console.log('无响应：', error.request)
    } else {
      console.log('请求失败：', error.message)
    }

    throw error
  }
}
