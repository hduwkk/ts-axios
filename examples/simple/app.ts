import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     a: 1,
//     b: 2,
//     c: [1,2,3]
//   }
// })


axios.get('/simple/get', {
  params: {
    a: 11,
    b: 22,
    c: [11,22,33]
  }
})
