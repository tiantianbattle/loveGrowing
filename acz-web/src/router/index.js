/*
 * @Author: your name
 * @Date: 2020-12-10 09:28:20
 * @LastEditTime: 2020-12-14 19:39:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /acz/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login.vue'
import Appraise from '../views/Appraise.vue'
import Attendance from '../views/Attendance.vue';
import Notify from '../views/Notify.vue'
import Releasenotify from '../views/Releasenotify.vue'
import StuInfo from '../views/StuInfo.vue'
import Grade from '../views/Grade.vue'
import Rank from '../views/Rank.vue'
import RankList from '../views/RankList.vue'
import Center from '../views/Center.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/appraise',
      name: 'Appraise',
      component: Appraise
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: Attendance
    },
    {
      path: '/notify',
      name: 'Notify',
      component: Notify
    },
    {
      path: '/releasenotify',
      name: 'Releasenotify',
      component: Releasenotify
    },
    {
      path: '/stuInfo',
      name: 'StuInfo',
      component: StuInfo
    },
    {
      path: '/Grade',
      name: 'Grade',
      component: Grade
    },
    {
      path: '/Rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/RankList',
      name: 'RankList',
      component: RankList
    },
    {
      path: '/Center',
      name: 'Center',
      component: Center
    }
  ]
})
