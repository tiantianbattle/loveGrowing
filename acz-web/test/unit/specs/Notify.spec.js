import Vue from 'vue'
import { mount } from 'vue-jest'
import Notify from '@/views/Notify'

describe('通知系统模块相关测试', () => {
  const Constructor = Vue.extend(Notify)
  const vm = new Constructor().$mount()

    /* 测试正常渲染标题 */
    it('Should render correct contents', () => {
      expect(vm.$el.querySelector('.sub_title').textContent)
        .toEqual('Announcement')
    })
})
