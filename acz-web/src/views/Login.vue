<template>
  <div class="login">
    <div class="main">
      <div class="title_wrap">
        <div class="big_title">爱成长-学校评价系统</div>
        <div class="sub_title">Multi-dimensional Student Accessment System</div>
      </div>
      <div class="login_wrap">
        <form>
          <div class="select_wrap">
            <el-cascader
              placeholder="试试搜索：广东"
              :options="place_options"
              :props="{ expandTrigger: 'hover' }"
              filterable
              clearable
              v-model="province"
            >
            </el-cascader>
          </div>
          <div class="select_wrap">
            <el-select v-model="school" placeholder="请选择学校">
              <el-option
                v-for="school in school_options"
                :key="school.value"
                :label="school.label"
                :value="school.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="account_wrap">
            <div class="select_wrap">
              <el-input
                id="account"
                placeholder="请输入账号"
                v-model="account"
                clearable
              >
              </el-input>
            </div>
            <div class="select_wrap">
              <el-input
                id="password"
                placeholder="请输入密码"
                v-model="password"
                show-password
                @keypress.native.enter="login"
              ></el-input>
            </div>
          </div>
          <div class="button_wrap">
            <el-button type="primary" @click="login" id="login">登录</el-button>
            <el-button plain>忘记密码？</el-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { get } from "../utils/request";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      place_options: [
        {
          value: "gd",
          label: "广东",
          children: [
            {
              value: "gz",
              label: "广州",
            },
            {
              value: "zh",
              label: "珠海",
            },
          ],
        },
      ],
      school_options: [
        {
          value: "珠海市第一实验中学",
          label: "珠海市第一实验中学",
        },
      ],
      school: "",
      account: "",
      password: "",
      province: 'gd'
    };
  },
  methods: {
    async login() {
      const res = await get(
        `/login?account=${this.account}&pwd=${this.password}`
      );
      const result = res.data;
      if (result.account == this.account) {
        window.sessionStorage.setItem("accountInfo", JSON.stringify(result))
        this.$router.push("./appraise");
      } else if (result === 0) {
        this.$message.error("并没有该账号！")
      } else if (!result) {
        this.$message.error("密码错误，请重新输入！");
        this.password = "";
      }
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

body {
  // min-width: 1200px;
  .login {
    background: url(../assets/login-bg.png) no-repeat top left;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 1200px;
    .main {
      float: right;
      width: 50%;
      text-align: center;
      .title_wrap {
        margin-top: 17%;
        .big_title {
          font-size: 40px;
          font-weight: 700;
        }
        .sub_title {
          font-size: 20px;
        }
      }
      .login_wrap {
        margin-top: 30px;
        .select_wrap {
          margin-bottom: 25px;
        }
        .el-input {
          font-size: 18px;
          .el-input__inner {
            width: 400px;
            height: 60px;
          }
        }
        .el-button {
          font-size: 17px;
        }
      }
    }
    .el-cascader__dropdown {
      .el-cascader-panel {
        font-size: 17px;
      }
    }

    .el-select-dropdown__wrap {
      .el-select-dropdown__item {
        font-size: 17px;
      }
    }
  }
}
</style>
