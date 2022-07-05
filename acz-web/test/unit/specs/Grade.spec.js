import Vue from 'vue'
import axios from 'axios'
import Grade from '@/views/Grade'

describe('成绩系统相关测试', () => {
  const Constructor = Vue.extend(Grade)
  const vm = new Constructor().$mount()

    /* 测试正常渲染标题 */
    it('Should render correct contents', () => {
      expect(vm.$el.querySelector('.sub_title').textContent)
        .toEqual('Grade')
    })

  // test('获取成绩总览', async () => {
  //   vm.subjectId = 2
  //   const res = await getExamList(vm.subjectId)
  //   expect(res.data.toString()).toEqual([
  //     {
  //       "id": 3,
  //       "subjectId": 2,
  //       "name": "数学期末考",
  //       "time": "2020-12-11T08:32:50.000Z"
  //     }
  //   ])
  // })
})

function getExamList(subject) {
  console.log(`http://47.96.7.9:3000/exam/list?subject=${subject}`)
  return axios.get(`http://47.96.7.9:3000/exam/list?subject=${subject}`)
}
