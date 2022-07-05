import Vue from 'vue'
import { mount } from 'vue-jest'
import Rank from '@/views/Rank'

describe('排行榜模块相关测试', () => {
  const Constructor = Vue.extend(Rank)
  const vm = new Constructor().$mount()

    /* 测试正常渲染标题 */
    it('Should render correct contents', () => {
      expect(vm.$el.querySelector('.sub_title').textContent)
        .toEqual('Rank')
    })
})
