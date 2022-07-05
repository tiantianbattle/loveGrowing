<template>
  <div class="rank">
    <div class="main">
      <side-nav :currTab="4" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            排行榜
            <span class="sub_title">Rank</span>
          </div>
          <status-bar />
        </div>
        <div class="list_wrap">
          <div class="r" @click="navigateTo(1)">
            <img src="../assets/rankWeek.png" />
            每周之星
          </div>
          <div class="r" @click="navigateTo(2)">
            <img src="../assets/rankBeyond.png" />
            超越之星
          </div>
          <div class="r" @click="navigateTo(3)">
            <img src="../assets/rankMonth.png" />
            每月之星
          </div>
          <div class="r" @click="navigateTo(4)">
            <img src="../assets/rankSchool.png" />
            校园之星
          </div>
          <div class="r" @click="navigateTo(5)">
            <img src="../assets/rankEntirety.png" />
            全面发展好少年
          </div>
          <div class="r" @click="navigateTo(6)">
            <img src="../assets/rankObey.png" />
            公约少年
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import StatusBar from "../components/StatusBar.vue";

export default {
  name: "StuInfo",
  components: {
    SideNav,
    StatusBar,
  },
  data() {
    return {
    };
  },
  methods: {
    navigateTo(id) {
      this.$router.push('./ranklist?type=' + id)
    }
  }
};
</script>

<style lang="less" scoped>
body {
  .rank {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;

      .right {
        flex: 1;
        max-width: 1500px;
        margin-left: 40px;
        .title_wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          .title {
            flex: 1;
            padding-top: 20px;
            color: #7a7a7a;
            font-size: 40px;
            .sub_title {
              font-size: 24px;
            }
          }
        }
        .select_wrap {
          display: flex;
          margin-top: 20px;
          div {
            margin-right: 30px;
            width: 200px;
          }
        }
        .list_wrap {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
          .r {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin: 20px 50px;
            padding: 20px 50px;
            border-radius: 20px;
            background-color: #fff;
            font-size: 24px;
            img {
              width: 250px;
              height: auto;
              overflow: hidden;
            }
            .name {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 20px 0;
              img {
                margin-left: 10px;
                width: 400px;
                height: 400px;
              }
            }
            .btn_wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 20px;
              .btn {
                padding: 10px 20px;
                color: #fff;
                background-color: rgba(25, 156, 213, 1);
                border-radius: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
