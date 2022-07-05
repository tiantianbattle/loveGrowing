import Vue from 'vue'
import { mount } from 'vue-jest'
import Appraise from '@/views/Appraise'

describe('学生评价模块相关测试', () => {
  const Constructor = Vue.extend(Appraise)
  const vm = new Constructor().$mount()

    /* 测试正常渲染标题 */
    it('Should render correct contents', () => {
      expect(vm.$el.querySelector('.sub_title').textContent)
        .toEqual('Appraise System')
    })
})
