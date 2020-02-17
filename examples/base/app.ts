import axios from '../../src/index'

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: { a: 1, b: 2 }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: { 'content-type': 'application/json;charset=UTF-8'},
//   data: { a: 11, b: 22 }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {a: 1, b: [1,2,3]}
// }).then((res) => {
//   console.log(res)
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {a: 11, b: 22}
// }).then((res) => console.log(res, 'res2'))

axios({ method: 'get', url: '/error/get1'})
  .then((res) => console.log(res))
  .catch((e) => console.log(e))

  axios({ method: 'get', url: '/error/get'})
  .then((res) => console.log(res))
  .catch((e) => console.log(e))

  setTimeout(() => {
    axios({ method: 'get', url: '/error/get'})
    .then((res) => console.log(res))
    .catch((e) => console.log(e))
  }, 5000)

  axios({ method: 'get', url: '/error/timeout', timeout: 2000})
  .then((res) => console.log(res))
  .catch((e) => console.log(e))