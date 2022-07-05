<template>
  <div class="status_wrap">
    <div class="btn"><img src="../assets/icons/message.png" /></div>
    <div class="btn"><img src="../assets/icons/setting.png" /></div>
    <div class="avator"><img src="../assets/icons/avator.png" /></div>
    <div class="name_wrap">
      <div class="name">{{accountInfo.name}} 老师</div>
      <div class="dorpdown">
        <div class="item">修改个人资料</div>
        <div class="item">修改密码</div>
        <div class="item" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusBar",
  props: [],
  data() {
    return {
      accountInfo: {}
    }
  },
  created() {
    const accountInfo = window.sessionStorage.getItem("accountInfo")
    this.accountInfo = JSON.parse(accountInfo)
  },
  methods: {
    logout() {
      this.$router.push(`./`)
    }
  },
};
</script>

<style lang="less">
.status_wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 500px;
  .btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .avator {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    img {
      width: 100%;
    }
    cursor: pointer;
  }
  .name_wrap {
    position: relative;
    width: 150px;
    font-size: 18px;
    cursor: pointer;
    .dorpdown {
      display: none;
      position: absolute;
      top: 100%;
      left: -10%;
      width: 100%;
      padding: 10px;
      border-radius: 20px;
      background-color: #fff;
      z-index: 99;
      box-shadow: 0 0 10px 0px #ccc;
      .item {
        margin: 10px;
        padding: 10px;
        border-bottom: 1px solid #eee;
        text-align: center;
      }
      .item:hover {
        color: #199cd5;
      }
    }
  }
  .name_wrap:hover {
    .dorpdown {
      display: block;
    }
  }
  .name_wrap::after {
    content: "\e65e";
    font-family: "iconfont";
    color: #199cd5;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
