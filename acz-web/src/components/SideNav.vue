<!--
 * @Author: your name
 * @Date: 2020-11-13 08:26:40
 * @LastEditTime: 2020-12-15 00:16:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /acz-vue/acz/src/components/SideNav.vue
-->

<template>
  <div class="side_nav--left">
    <div class="side_nav--container">
      <div class="title">爱成长</div>
      <div class="nav_list">
        <ul>
          <li class="nav_item" :class="{ active: currTab == 1}" @click="jumpTo('stuInfo')">学生信息</li>
          <li class="nav_item" :class="{ active: currTab == 2}" @click="jumpTo('appraise')">评价系统</li>
          <li class="nav_item" :class="{ active: currTab == 3}" @click="jumpTo('notify')">通知系统</li>
          <li class="nav_item" :class="{ active: currTab == 4}" @click="jumpTo('rank')">排行榜</li>
          <li class="nav_item" :class="{ active: currTab == 5}" @click="jumpTo('grade')">成绩系统</li>
          <li class="nav_item" :class="{ active: currTab == 6}" @click="jumpTo('attendance')">考勤管理</li>
        </ul>
      </div>
      <div class="user" :class="{ active: currTab == 7}" @click="jumpTo('center')">个人中心</div>
      <img src="../assets/小日常.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  props: ['currTab'],
  data() {
    return {};
  },
  methods: {
    jumpTo(path) {
      this.$router.push(`./${path}`)
    }
  },
};
</script>

<style lang="less">
/* 左边导航栏模块 */
ul, li {
  list-style: none;
  padding-inline-start: 0;
}

.side_nav--left {
  max-width: 250px;
  min-width: 150px;
  height: 0;
.side_nav--container {
    padding: 20px 0;
    background-color: #fff;
    border-radius: 20px;
  .title {
    font-size: 26px;
    font-weight: 700;
    color: #3e3e3e;
    text-align: center;
  }
  .nav_list {
    width: 100%;
    margin-top: 50px;
    font-size: 20px;
    color: #666;
    text-align: center;
    .nav_item {
      padding: 10px 0;
      margin: 20px 0;
      cursor: pointer;
    }
    .nav_item:hover {
      color: #199cd5;
    }
    .nav_item.active {
      color: #199cd5;
    }
  }
  .user {
    margin: 30px 30px 10px;
    padding: 25px 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 20px;
    color: #666;
    cursor: pointer;
  }
  .user:hover {
    color: rgb(25, 156, 213);
  }
  .user.active {
    color: #199cd5;
  }
  img {
    width: 100%;
    margin: 20px 0;
  }
}
}
</style>
