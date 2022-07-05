<template>
  <div class="appraise">
    <div class="main">
      <!-- 左边导航栏模块 -->
      <side-nav :currTab="2" />
      <div class="right">
        <div class="title_wrap">
          <div class="title">
            评价系统
            <span class="sub_title">Appraise System</span>
          </div>
          <status-bar />
        </div>

        <div class="tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="学生评价" name="first">
              <div class="select_wrap">
                <el-select v-model="week" placeholder="请选择周次">
                  <el-option
                    v-for="item in weeks"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="gradeId" placeholder="请选择年级">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="classId" placeholder="请选择班级">
                  <el-option
                    v-for="item in classes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input placeholder="搜索" v-model="search" clearable>
                </el-input>
              </div>
              <div class="appraise_body">
                <!-- 评价内容 -->
                <div class="left">
                  <div class="tab_bar">
                    <div
                      class="bar_item"
                      :class="{ active: currTab == 0 }"
                      @click="switchTab(0)"
                    >
                      课堂表现
                    </div>
                    <div
                      class="bar_item"
                      :class="{ active: currTab == 1 }"
                      @click="switchTab(1)"
                    >
                      品德
                    </div>
                    <div
                      class="bar_item"
                      :class="{ active: currTab == 2 }"
                      @click="switchTab(2)"
                    >
                      体育
                    </div>
                  </div>
                  <div class="tab_pane">
                    <el-table
                      ref="appraiseTable"
                      :data="appraiseContent"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleAppraiseListChange"
                    >
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <el-table-column label="评价内容" width="750">
                        <template slot-scope="scope">{{
                          scope.row.content
                        }}</template>
                      </el-table-column>
                      <el-table-column prop="score" label="分数">
                        <template slot-scope="scope">{{
                          scope.row.score
                        }}</template>
                      </el-table-column>
                    </el-table>
                    <div class="checked_wrap">
                      <div class="tags">
                        您选择了【{{ checkedList.length }}】位学生：
                        <el-tag
                          v-for="stu in checkedList"
                          :key="stu.id"
                          :closable="closable"
                          @close="onTagClose(stu)"
                          type=""
                          effect="plain"
                        >
                          {{ stu.name }}
                        </el-tag>
                      </div>
                    </div>
                    <div class="btn_wrap">
                      <el-button type="primary" @click="commit">提交</el-button>
                    </div>
                  </div>
                </div>
                <!-- 右侧学生列表 -->
                <div class="right">
                  <el-table
                    ref="studentTable"
                    :data="studentList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleCheckedListChange"
                  >
                    <el-table-column type="selection"> </el-table-column>
                    <el-table-column label="学号">
                      <template slot-scope="scope">{{ scope.row.no }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名">
                      <template slot-scope="scope">{{
                        scope.row.name
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="address" label="本周">
                      <template slot-scope="scope">{{
                        scope.row.score || 0
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="address" label="总分">
                      <template slot-scope="scope">{{
                        scope.row.total || 0
                      }}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="查看评价" name="second">
              <div class="select_wrap">
                <el-select v-model="week" placeholder="请选择周次">
                  <el-option
                    v-for="item in weeks"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="gradeId" placeholder="请选择年级">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="classId" placeholder="请选择班级">
                  <el-option
                    v-for="item in classes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input placeholder="搜索" v-model="search" clearable>
                </el-input>
              </div>
              <div class="appraise_body">
                <!-- 评价内容 -->
                <div class="left">
                  <div class="tab_bar">
                    <div
                      class="bar_item"
                      :class="{ active: currTab == 0 }"
                      @click="switchTab(0)"
                    >
                      课堂表现
                    </div>
                    <div
                      class="bar_item"
                      :class="{ active: currTab == 1 }"
                      @click="switchTab(1)"
                    >
                      品德
                    </div>
                    <div
                      class="bar_item"
                      :class="{ active: currTab == 2 }"
                      @click="switchTab(2)"
                    >
                      体育
                    </div>
                  </div>
                  <div class="tab_pane">
                    <el-table
                      :data="appraiseListTable"
                      tooltip-effect="dark"
                      style="width: 100%"
                    >
                      <el-table-column label="评价内容" width="750">
                        <template slot-scope="scope">{{
                          scope.row.content
                        }}</template>
                      </el-table-column>
                      <el-table-column prop="score" label="分数">
                        <template slot-scope="scope">{{
                          scope.row.score
                        }}</template>
                      </el-table-column>
                    </el-table>
                    <div class="btn_wrap">
                      <el-button type="primary" @click="commit">提交</el-button>
                    </div>
                  </div>
                </div>
                <!-- 右侧学生列表 -->
                <div class="right">
                  <el-table
                    ref="singleTable"
                    :data="studentList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                  >
                    <el-table-column label="学号">
                      <template slot-scope="scope">{{ scope.row.no }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名">
                      <template slot-scope="scope">{{
                        scope.row.name
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="address" label="本周">
                      <template slot-scope="scope">{{
                        scope.row.score || 0
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="address" label="总分">
                      <template slot-scope="scope">{{
                        scope.row.total || 0
                      }}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import StatusBar from "../components/StatusBar.vue";
import { get, post } from "../utils/request";

export default {
  name: "Appraise",
  components: {
    SideNav,
    StatusBar,
  },
  data() {
    return {
      grades: [
        {
          value: 1,
          label: "一年级",
        },
        {
          value: 2,
          label: "二年级",
        },
        {
          value: 3,
          label: "三年级",
        },
        {
          value: 4,
          label: "四年级",
        },
        {
          value: 5,
          label: "五年级",
        },
        {
          value: 6,
          label: "六年级",
        },
      ],
      classes: [
        {
          value: 1,
          label: "一班",
        },
        {
          value: 2,
          label: "二班",
        },
        {
          value: 3,
          label: "三班",
        },
        {
          value: 4,
          label: "四班",
        },
      ],
      weeks: [
        {
          value: 1,
          label: "第一周",
        },
        {
          value: 2,
          label: "第二周",
        },
        {
          value: 3,
          label: "第三周",
        },
        {
          value: 4,
          label: "第四周",
        },
        {
          value: 5,
          label: "第五周",
        },
        {
          value: 6,
          label: "第六周",
        },
        {
          value: 7,
          label: "第七周",
        },
        {
          value: 8,
          label: "第八周",
        },
        {
          value: 9,
          label: "第九周",
        },
        {
          value: 10,
          label: "第十周",
        },
        {
          value: 11,
          label: "第十一周",
        },
        {
          value: 12,
          label: "第十二周",
        },
        {
          value: 13,
          label: "第十三周",
        },
        {
          value: 14,
          label: "第十四周",
        },
        {
          value: 15,
          label: "第十五周",
        },
        {
          value: 16,
          label: "第十六周",
        },
        {
          value: 17,
          label: "第十七周",
        },
      ],
      appraiseContent: [],
      week: 1,
      gradeId: 1,
      classId: 1,
      search: "",
      currTab: 0, // 当前的tabBar
      activeName: "first",
      closable: true,
      studentList: [], // 学生列表
      checkedList: [], // 选中的学生列表
      appraiseList: [], // 选中的评价列表
      appraiseListTable: [],
      currentRow: null,
    };
  },
  created() {
    this.getAppraiseContent(this.currTab);
    this.getStudentList();
    this.getAppraise();
  },
  methods: {
    /* 切换TabBar */
    switchTab(tab) {
      this.currTab = tab;
      this.getAppraiseContent(tab);
      this.getAppraise();
    },
    /* 获取评价内容 */
    async getAppraiseContent(parent) {
      const res = await get(`/appraise/content?parent=${parent + 1}`);
      this.appraiseContent = res.data;
    },
    /* 提交评价 */
    async commit() {
      if (this.checkedList.length == 0) {
        this.$message.error("请勾选要选择的学生！");
        return;
      }

      try {
        this.checkedList.forEach(async (item) => {
          var res = await post({
            url: `/appraise/mset`,
            data: {
              stuId: item.id,
              week: this.week,
              ids: this.appraiseList.map((item) => item.id),
            },
          });
          this.studentList = res.data;
        });
        // this.getStudentList();
        // 清空选中评价内容
        this.appraiseList.forEach((item) => {
          this.$refs.appraiseTable.toggleRowSelection(item);
        });

        this.$message({
          message: "提交成功！",
          type: "success",
        });
      } catch (err) {
        console.log(err);
        this.$message.error("发生错误了，请重新尝试！");
      }
    },
    /* 获取学生列表 */
    async getStudentList() {
      const res_score = await get(`/appraise/score?week=${this.week}`);
      this.studentList = res_score.data;
    },
    /* 改变选中的学生 */
    handleCheckedListChange(val) {
      this.checkedList = val;
    },
    /* 移除已选择的学生 */
    onTagClose(stu) {
      const index = this.checkedList.indexOf(stu);
      this.checkedList.splice(index, 1);
      this.$refs.studentTable.toggleRowSelection(stu);
    },
    /* 获取学生评价 */
    async getAppraise() {
      if (this.currentRow) {
        const res = await get(
          `appraise?stuId=${this.currentRow.id}&week=${this.week}&parent=${
            this.currTab + 1
          }`
        );
        console.log(res.data);
        this.appraiseListTable = res.data;
      }
    },
    /* 选择评价内容 */
    handleAppraiseListChange(val) {
      this.appraiseList = val;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.getAppraise();
      console.log(this.currentRow);
    },
  },
  watch: {
    week(val, newVal) {
      this.getStudentList(newVal);
      this.getAppraise();
    },
  },
};
</script>

<style lang="less">
body {
  .appraise {
    .main {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 30px auto 0;
      /* 中间内容模块 */
      .center {
        width: 1000px;
        height: 1000px;
        margin: 20px 40px 0;
        background-color: #fff;
        border-radius: 20;
        .title_wrap {
          text-align: center;
          font-size: 38px;
          font-weight: 700;
          color: #3e3e3e;
          .sub_title {
            font-size: 30px;
          }
          .el-table {
            margin-top: 20px;
            margin-bottom: 100px;
            .has-gutter {
              .el-table_1_column_2,
              .el-table_1_column_3 {
                text-align: center;

                .cell {
                  font-size: 20px;
                  color: #000;
                  font-weight: 900;
                }
              }
            }
            .el-table_1_column_2 {
              text-align: center;
            }
            .el-table_1_column_3 {
              text-align: center;
            }
            .el-table_1_column_1 {
              text-align: center;
              .cell {
                .el-checkbox {
                  font-size: 20px;
                  margin-left: 20px;
                  .el-checkbox__input {
                    .el-checkbox__inner {
                      height: 25px;
                      width: 25px;
                    }
                    .el-checkbox__inner::after {
                      height: 15px;
                      width: 11px;
                    }
                  }
                }
              }
            }
          }
          .cell {
            font-size: 17px;
          }
          .el-table__row {
            height: 60px;
          }
          .el-input__inner {
            height: 200px;
            font-weight: 800;
            font-size: 18px;
          }
        }
      }
    }

    .right {
      flex: 1;
      max-width: 1500px;
      margin-left: 40px;
      .tab {
        margin-top: 20px;
        padding-right: 40px;
        .el-tabs {
          .el-tabs__header {
            .el-tabs__item {
              font-size: 20px;
              margin: 10px 0px;
            }
            .el-tabs__content {
              .select_wrap {
                display: flex;
                margin-top: 20px;
                div {
                  margin-right: 30px;
                  width: 200px;
                }
              }
            }
          }
        }
      }
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
      .table_wrap {
        margin-top: 20px;
        padding-right: 30px;
      }
      .appraise_body {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        margin-top: 20px;
        .left {
          flex: 2;
          height: auto;
          background-color: #fff;
          border-radius: 20px;
          overflow: hidden;
          .tab_bar {
            display: flex;
            align-items: center;
            margin: 20px 20px 0;
            font-size: 18px;
            cursor: pointer;
            .bar_item {
              padding: 20px 10px;
              margin: 0 10px;
              border-bottom: 2px solid transparent;
              background-color: #fff;
            }
            .bar_item.active {
              color: #199cd5;
              font-weight: 700;
              border-bottom: 2px solid #199cd5;
            }
          }
          .tab_pane {
            padding: 20px;
          }
          .checked_wrap {
            margin-top: 20px;
            .tags {
              .el-tag {
                margin-right: 10px;
              }
            }
          }
          .btn_wrap {
            margin-top: 20px;
          }
        }
        .right {
          flex: 1;
          padding: 20px;
          border-radius: 20px;
          overflow: hidden;
          background-color: #fff;
        }
      }
    }
    .container {
      padding: 20px 0;
      background-color: #fff;
      border-radius: 20px;
    }
  }
}
</style>
