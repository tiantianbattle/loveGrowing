import Vue from 'vue'
import { mount } from 'vue-jest'
import axios from 'axios'
import Login from '@/views/Login'

describe('登录相关测试', () => {
  const Constructor = Vue.extend(Login)
  const vm = new Constructor().$mount()

  /* 测试正常渲染标题 */
  it('Should render correct contents', () => {
    expect(vm.$el.querySelector('.big_title').textContent)
      .toEqual('爱成长-学校评价系统')
  })

  /* 测试正常登录 */
  test('Success login', async () => {
    const res = await login('20001', '12345')
    expect(res.data).toEqual({
      "id": 1,
      "name": "李晓红",
      "subjectId": "1",
      "account": "20001",
      "password": "12345",
      "sex": "女"
    })
  })

  /* 测试错误密码 */
  test('Wrong password', async () => {
    await login('20001', '00000').then(res => {
      expect(res.data).toEqual(false)
    })
  })

  /* 测试不存在账号 */
  test('Nonexistent account', async () => {
    await login('20003', '00000').then(res => {
      expect(res.data).toEqual(0)
    })
  })

  /* 测试不存在页面 */
  test('Nonexistent page', async () => {
    expect.assertions(1) // 断言，必须执行一次expect
    await fetch404().catch(e => {
      expect(e.toString()).toEqual('Error: Request failed with status code 404')
    })
  })

})


/* 请求登录 */
function login(account, pwd) {
  return axios.get(`http://47.96.7.9:3000/login?account=${account}&pwd=${pwd}`)
}

/* 请求无效 */
function fetch404() {
  return axios.get('http://47.96.7.9:3000/404')
}
