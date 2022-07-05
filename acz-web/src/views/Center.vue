<template>
  <div class="center">
    <div class="main">
      <side-nav :currTab="7" />
      <div class="left">
        <div class="title_wrap">
          <div class="title">你好，{{accountInfo.name}}老师</div>
          <div class="tool_wrap">
            <div class="btn"><img src="../assets/icons/message.png" /></div>
            <div class="btn"><img src="../assets/icons/setting.png" /></div>
          </div>
        </div>
        <div class="wrap">
          <div class="title">
            <div class="text">我的消息</div>
            <div class="more">
              更多消息
              <i class="el-icon-d-arrow-right"></i>
            </div>
          </div>
          <div class="list_wrap">
            <div class="message_item">
              <div class="message">
                <div class="content">
                  二年级 一班<span>陆君扬</span>发送请假申请。
                </div>
                <div class="detail">
                  查看详情<i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
              <div class="time">5分钟前</div>
            </div>
            <div class="message_item">
              <div class="message">
                <div class="content">
                  二年级 一班<span>陆君扬</span>发送请假申请。
                </div>
                <div class="detail">
                  查看详情<i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
              <div class="time">5分钟前</div>
            </div>
            <div class="message_item">
              <div class="message">
                <div class="content">
                  二年级 一班<span>陆君扬</span>发送请假申请。
                </div>
                <div class="detail">
                  查看详情<i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
              <div class="time">5分钟前</div>
            </div>
            <div class="message_item">
              <div class="message">
                <div class="content">
                  二年级 一班<span>陆君扬</span>发送请假申请。
                </div>
                <div class="detail">
                  查看详情<i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
              <div class="time">5分钟前</div>
            </div>
            <div class="message_item">
              <div class="message">
                <div class="content">
                  二年级 一班<span>陆君扬</span>发送请假申请。
                </div>
                <div class="detail">
                  查看详情<i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
              <div class="time">5分钟前</div>
            </div>
          </div>
        </div>
        <div class="horizon_wrap">
          <div class="wrap">
            <div class="title">我的班级</div>
            <div class="class_wrap">
              <div class="class">一年级 一班</div>
              <div class="class">一年级 二班</div>
              <div class="class">二年级 二班</div>
              <div class="class">二年级 三班</div>
            </div>
          </div>
          <div class="wrap">
            <div class="title">
              <div class="text">班级消息</div>
              <div class="more">
                更多消息
                <i class="el-icon-d-arrow-right"></i>
              </div>
            </div>
            <div class="list_wrap">
              <div class="message_item">
                <div class="message">
                  <div class="content">
                    二年级 一班<span>陆君扬</span>发送请假申请。
                  </div>
                  <div class="detail">
                    查看详情<i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="time">5分钟前</div>
              </div>
              <div class="message_item">
                <div class="message">
                  <div class="content">
                    二年级 一班<span>陆君扬</span>发送请假申请。
                  </div>
                  <div class="detail">
                    查看详情<i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="time">5分钟前</div>
              </div>
              <div class="message_item">
                <div class="message">
                  <div class="content">
                    二年级 一班<span>陆君扬</span>发送请假申请。
                  </div>
                  <div class="detail">
                    查看详情<i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="time">5分钟前</div>
              </div>
              <div class="message_item">
                <div class="message">
                  <div class="content">
                    二年级 一班<span>陆君扬</span>发送请假申请。
                  </div>
                  <div class="detail">
                    查看详情<i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="time">5分钟前</div>
              </div>
              <div class="message_item">
                <div class="message">
                  <div class="content">
                    二年级 一班<span>陆君扬</span>发送请假申请。
                  </div>
                  <div class="detail">
                    查看详情<i class="el-icon-d-arrow-right"></i>
                  </div>
                </div>
                <div class="time">5分钟前</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">个人中心</div>
        <div class="user_wrap">
          <div class="user">
            <div class="avator"><img src="../assets/icons/avator.png" /></div>
            <div class="name">{{accountInfo.name}}</div>
            <div class="subject">任教科目：{{ subject }}</div>
          </div>
          <div class="credit">
            <div class="text">
              <img src="../assets/credit.png" />
              我的积分:
              <span>100</span>
            </div>
          </div>
        </div>
        <div class="btn_wrap">
          <div class="btn">修改个人信息</div>
          <div class="btn">修改密码</div>
          <div class="btn logout" @click="logout">退出登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import StatusBar from "../components/StatusBar.vue";
import { get } from "../utils/request";

export default {
  name: "Center",
  components: {
    SideNav,
    StatusBar,
  },
  data() {
    return {
      subject: "",
      accountInfo: {}
    };
  },
  created() {
    const accountInfo = window.sessionStorage.getItem("accountInfo");
    this.accountInfo = JSON.parse(accountInfo);
    this.getSubject();
  },
  methods: {
    async getSubject() {
      const res = await get("/subject?subjectId=" + this.accountInfo.subjectId);
      this.subject = res.data[0].name;
    },
    logout() {
      this.$router.push(`./`)
    }
  },
};
</script>

<style lang="less" scoped>
.center {
  .main {
    display: flex;
    align-items: start;
    justify-content: center;
    width: 100%;
    margin: 30px auto 0;
    .left {
      flex: 1;
      min-width: 700px;
      max-width: 1060px;
      margin: 0 40px;
      border-radius: 20px;
      // background-color: pink;
      .title_wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          font-size: 30px;
          font-weight: 700;
          color: #333;
        }
        .tool_wrap {
          width: 180px;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        }
      }
      .wrap {
        margin: 20px 0;
        padding: 20px;
        border-radius: 20px;
        background-color: #fff;
        .title {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 22px;
          font-weight: 700;
          .more {
            font-size: 16px;
            font-weight: 400;
            color: #199cd5;
          }
        }
        .list_wrap {
          .message_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0;
            padding: 15px 10px;
            border-bottom: 1px solid #eee;
            .message {
              display: flex;
              align-items: flex-end;
              justify-content: center;
              font-size: 16px;
              span {
                margin: 0 10px;
                color: #199cd5;
              }
              .detail {
                font-size: 14px;
                color: #199cd5;
                cursor: pointer;
              }
            }
            .time {
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
      .horizon_wrap {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        .wrap {
          flex: 1;
        }
        .wrap:first-child {
          margin-right: 20px;
        }
      }
      .class_wrap {
        display: flex;
        flex-flow: row wrap;
        margin-top: 20px;
        .class {
          padding: 10px 15px;
          margin: 10px;
          border-radius: 20px;
          background-color: #e2e8f8;
          cursor: pointer;
        }
      }
    }
    .right {
      flex: 2;
      min-width: 250px;
      max-width: 400px;
      padding: 20px;
      border-radius: 20px;
      background: #fff;
      box-sizing: border-box;
      .title {
        margin-top: 20px;
        font-size: 26px;
        font-weight: 700;
        text-align: center;
      }
      .user_wrap {
        margin-top: 20px;
        border-radius: 20px;
        background-color: #f5f7fd;
        .user {
          padding: 20px;
          border-radius: 20px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          background-color: #4b9cd1;
          .avator {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .name {
            margin: 20px 0;
          }
        }
        .credit {
          padding: 20px 0;
          text-align: center;
          .text {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #199cd5;
            img {
              width: 40px;
              height: 40px;
            }
            span {
              margin-left: 20px;
              font-size: 30px;
              color: #333;
            }
          }
        }
      }
      .btn_wrap {
        .btn {
          margin: 40px 80px;
          padding: 20px;
          border-radius: 20px;
          color: #1a92d0;
          font-weight: 700;
          font-size: 20px;
          background-color: #f2f6fe;
          text-align: center;
          cursor: pointer;
        }
        .btn.logout {
          color: #fff;
          background-color: #1a92d0;
        }
      }
    }
  }
}
</style>
